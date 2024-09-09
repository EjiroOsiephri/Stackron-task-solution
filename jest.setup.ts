import { DataSource } from "typeorm";
import { Product } from "./src/entities/product";
import { Cart } from "./src/entities/cart";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  entities: [Product, Cart],
});

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});
