import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Headers from "./Headers";
import { UserContext } from "./App";
import { Link } from "react-router-dom";

function Home() {
  // Products fetched from DB
  const [products, setProducts] = useState([]);

  // Form states for adding product
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true); // Default to true
  const [inventory, setInventory] = useState("");
  const [img, setImg] = useState("");

  // delete product
  const [deleteProduct, setDeleteProduct] = useState("");

  // Filter states
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sort, setSort] = useState("");

  // Login context
  const { login } = useContext(UserContext);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8282/api/product/products"
        );
        setProducts(response.data.products);
        console.log(response.data); // Update products state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  function handleDeleteProduct(e, productIdToDelete) {
    e.preventDefault();
    console.log(productIdToDelete);

    const response = await axios.post("http://localhost:8282/api/product/")


  }

  const handlePasteEvent = (e) => {
    e.preventDefault(); // Prevent the default paste behavior
    const pastedData = e.clipboardData.getData("text"); // Get the pasted content as text
    setImg(pastedData); // Update the state with the pasted value
  };

  async function handleAddProduct(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8282/api/product/addProduct",
        {
          price,
          category,
          brand,
          name,
          inventory,
          description,
          inStock,
          img,
        },
        { withCredentials: true }
      );

      console.log(response.data);

      if (response.status !== 201) {
        console.log("There is an error adding product, Message from frontend");
        return;
      }

      console.log("Product Added Successfully, FROM FRONTEND");
      alert("Product Added Successfully");
    } catch (error) {
      console.error("Error while adding product:", error);
      alert("Error while adding product");
    }
  }

  return (
    <>
      <div>
        <Headers />

        <div className="w-full flex flex-col lg:flex-row bg-gray-100">
          {/* Sidebar Filter */}
          <div className="lg:w-1/4 w-full p-6 bg-white shadow-lg rounded-lg">
            <form className="text-center">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Add Product into Product List
              </h2>
              <input
                type="text"
                placeholder="Name"
                className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Brand"
                className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <input
                type="text"
                placeholder="Category"
                className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                type="text"
                placeholder="Price"
                className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label className="block mt-2 text-gray-500">Image URL</label>
              <input
                type="text"
                placeholder="Image URL"
                className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                onPaste={(e) => handlePasteEvent(e)} // Handling the paste event
              />

              <input
                type="number"
                placeholder="Inventory"
                className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
              />
              <label className="block mt-4 text-gray-500 font-semibold">
                In Stock:
              </label>
              <select
                value={inStock}
                onChange={(e) => setInStock(e.target.value === "true")}
                className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              <label className="block mt-4 text-gray-500 font-semibold">
                Description:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
              ></textarea>
              <button
                type="submit"
                className="bg-amber-500 text-white px-6 py-2 mt-4 rounded-lg shadow-lg hover:bg-amber-600 transition duration-300 w-full"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
              {/** Delete product */}
              <label className="block mt-5   text-gray-500">
                Delete Product
              </label>
              <input
                type="text"
                placeholder="Id to delete product"
                className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                value={deleteProduct}
                onChange={(e) => setDeleteProduct(e.target.value)}
              />
              <button
                type="submit"
                className="bg-amber-500 text-white px-6 py-2 mt-4 rounded-lg shadow-lg hover:bg-amber-600 transition duration-300 w-full"
                onClick={() => {
                  handleDeleteProduct(deleteProduct);
                }}
              >
                Delete Product
              </button>
              <br />
            </form>
          </div>

          {/* Product Section */}
          <div className="lg:w-3/4 w-full p-6 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">
              Product List
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-lg rounded-lg p-4"
                >
                  <img
                    src={product.img || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="rounded-lg w-full h-40 object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    {product.name}
                  </h3>
                  <p className="text-amber-500 font-bold">${product.price}</p>
                  <button className="bg-amber-500 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-amber-600 transition duration-300">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
