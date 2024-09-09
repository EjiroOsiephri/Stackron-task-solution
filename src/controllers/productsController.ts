import { Request, Response } from "express";
import { AppDataSource } from "../models/database";
import { Product } from "../entities/product";
import { Cart } from "../entities/cart";

export class ProductController {
  async createProduct(req: Request, res: Response) {
    const { name, description, price, imageUrl, category } = req.body;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.imageUrl = imageUrl;
    product.category = category;

    const savedProduct = await AppDataSource.manager.save(product);
    res.json(savedProduct);
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price, imageUrl, category } = req.body;

    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.imageUrl = imageUrl;
    product.category = category;

    const updatedProduct = await AppDataSource.manager.save(product);
    res.json(updatedProduct);
  }

  async listProducts(req: Request, res: Response) {
    const products = await AppDataSource.manager.find(Product);
    res.json(products);
  }

  async getProductDetails(req: Request, res: Response) {
    const { id } = req.params;
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  }

  async addToCart(req: Request, res: Response) {
    const { productId, quantity } = req.body;

    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await AppDataSource.manager.findOne(Cart, {
      where: { product: { id: productId } },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart();
      cartItem.product = product;
      cartItem.quantity = quantity;
    }

    const savedCartItem = await AppDataSource.manager.save(cartItem);
    res.json(savedCartItem);
  }

  async listCart(req: Request, res: Response) {
    const cartItems = await AppDataSource.manager.find(Cart, {
      relations: ["product"],
    });
    res.json(cartItems);
  }
}
