import { DataSource } from "typeorm";
import { Product } from "../entities/product";
import { Cart } from "../entities/cart";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./ecommerce.sqlite",
  synchronize: true,
  logging: false,
  entities: [Product, Cart],
});
