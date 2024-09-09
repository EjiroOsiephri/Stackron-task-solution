import { Router } from "express";
import { ProductController } from "../controllers/productsController";

const router = Router();
const productController = new ProductController();

router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.get("/products", productController.listProducts);
router.get("/products/:id", productController.getProductDetails);
router.post("/cart", productController.addToCart);
router.get("/cart", productController.listCart);

export default router;
