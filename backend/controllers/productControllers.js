import { productModel } from "../Models/productModels.js";

export async function addProduct(req, res) {
  try {
    let {
      name,
      brand,
      category,
      price,
      description,
      inStock,
      inventory,
      addedBy,
    } = req.body;

    // Validate required fields
    if (!name || !brand || !category || !price || !inventory) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const productDoccument = new productModel({
      name,
      brand,
      category,
      price,
      description,
      inStock,
      inventory,
      //   addedBy,
    });

    await productDoccument.save();

    if (!productDoccument) {
      return res.status(400).json({ message: "Error while adding a product" });
    }

    return res.status(201).json({
      message: "Product added successfully",
      product: productDoccument,
    });
  } catch (err) {
    console.log("There is some error", err);
    return res.status(400).json({
      message: "Product failed to add, there is some issue in addProduct API",
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    // console.log(req.params);
    const { id } = req.body;
    // console.log(id);
    const productToDelete = await productModel.findByIdAndDelete(id);

    if (!productToDelete) {
      return res
        .status(400)
        .json({ message: "There is some error in deleting Product" });
    }

    res.status(200).json({
      message: `Product with the id ${id} Deleted Successfully!!`,
      deletedProduct: productToDelete,
    });
  } catch (err) {
    console.log("There is some error in Deleting product, CATCH BLOCK", err);
    return res.status(500).json({ message: "Error in Deleting the product" });
  }
}

export async function singleProduct(req, res) {
  try {
    const id = req.params.id;
    const singleProduct = await productModel.findById(id);

    if (!singleProduct) {
      return res.status(400).json({ message: "No product found!" });
    }

    return res.status(200).json({
      message: "Single Product fetched Successfully!",
      product: singleProduct,
    });
  } catch (err) {
    console.log("There is some error in Fetching Single Product", err);
    return res.status(500).json({ message: "Error fetching single Product" });
  }
}

export async function getAllProducts(req, res) {
  try {
    let query = {};
    let sortArg = {};

    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
      // i means case insensitive
    }

    if (req.query.brand) {
      query.brand = { $regex: req.query.brand, $options: "i" };
    }

    if (req.query.category) {
      query.category = { $regex: req.query.category, $options: "i" };
    }

    if (req.query.sortBy && req.query.sort) {
      let findSortBy = req.query.sortBy;
      let sorted = req.query.sort.toLowerCase() == "asc" ? 1 : -1;

      sortArg[findSortBy] = sorted;
    }

    // for front end the query of price should be
    // between a price list : minPrice = x & maxPrice= y, min se max tak ki product dikhao.
    // and a fixed price like = 10000; bas 10000 ki product dikhao.

    if (req.query.minprice || req.query.maxprice) {
      query.price = {};
      if (req.query.minprice) {
        query.price["$gte"] = Number(req.query.minprice);
      }
      if (req.query.maxprice) {
        query.price["$lte"] = Number(req.query.maxprice);
      }
    }

    const productsFetched = await productModel.find(query).sort(sortArg);

    if (!productsFetched) {
      return res.status(400).json({ message: "No Products Fetched" });
    }

    if (productsFetched.length == 0) {
      return res
        .status(400)
        .json({ message: "The Filter You applied results No Products" });
    }

    return res.status(200).json({
      message: "products Fetched Successfully!",
      products: productsFetched,
    });
  } catch (err) {
    console.log("there is an error in Catch block", err);
    return res
      .status(500)
      .json({ message: "error in fetching products, CATCH block" });
  }
}
