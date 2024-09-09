import { DataSource } from "typeorm";
import { Product } from "../entities/product";

let AppDataSource: DataSource;

beforeAll(async () => {
  AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: [Product],
  });
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Product Entity", () => {
  it("should create a new product", async () => {
    const productRepository = AppDataSource.getRepository(Product);
    const product = productRepository.create({
      name: "Test Product",
      description: "A test product description",
      price: 19.99,
      imageUrl: "http://example.com/image.png",
      category: "Test Category",
    });
    await productRepository.save(product);
    const savedProduct = await productRepository.findOneBy({ id: product.id });
    expect(savedProduct).toBeDefined();
    expect(savedProduct?.name).toBe("Test Product");
  });
});
