import express from "express";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  singleProduct,
} from "../controllers/productControllers.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProducts);
productRouter.post("/addProduct", addProduct);
productRouter.delete("/deleteProduct/:id", deleteProduct);
productRouter.get("/singleProduct/:id", singleProduct);

export default productRouter;
