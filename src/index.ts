import express, { Express } from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import productRoutes from "./routes/productRoutes";
import { AppDataSource } from "./models/database";

dotenv.config();

const PORT = process.env.PORT ?? 8000;

const app: Express = express();

app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Welcome to stackron ecommerce!");
});

app.use("/api", productRoutes);

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.synchronize();
    console.log("Database synchronized successfully!");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
