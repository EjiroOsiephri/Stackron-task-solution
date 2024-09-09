import express, { Express } from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import swaggerUi from "swagger-ui-express";
import productRoutes from "./routes/productRoutes";
import { AppDataSource } from "./models/database";
import YAML from "yamljs";
import path from "path";

dotenv.config();

const PORT = process.env.PORT ?? 8000;

export const app: Express = express();

app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Welcome to stackron ecommerce!");
});

app.use("/api", productRoutes);

const swaggerDocument = YAML.load(path.join(__dirname, "/docs/swagger.yaml"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.synchronize();
    console.log("Database synchronized successfully!");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
