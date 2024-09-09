import { DataSource } from "typeorm";
import request from "supertest";
import { Product } from "../entities/product";
import { Cart } from "../entities/cart";
import { app } from "../index";

let AppDataSource: DataSource;

beforeAll(async () => {
  AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: [Product, Cart],
  });
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Cart Endpoints", () => {
  let productId: number;

  beforeAll(async () => {
    const productRepository = AppDataSource.getRepository(Product);

    const product = productRepository.create({
      name: "Test Product",
      description: "A test product description",
      price: 19.99,
      imageUrl: "http://example.com/image.png",
      category: "Test Category",
    });
    await productRepository.save(product);
    productId = product.id;
  });

  it("should list all cart items", async () => {
    const res = await request(app).get("/api/cart");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
