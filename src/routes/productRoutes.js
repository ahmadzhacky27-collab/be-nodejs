import { Router } from "express";
import { getAllProducts } from "../controllers/ProductController.js";
// , getProductById, createProduct, updateProduct, deleteProduct

const router = Router();

router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.post("/", createProduct);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

export default router;