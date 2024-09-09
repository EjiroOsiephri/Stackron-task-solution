import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  entities: ["./src/entities/**/*.ts"],
});

async function resetDatabase() {
  try {
    await AppDataSource.initialize();
    await AppDataSource.dropDatabase();
    await AppDataSource.synchronize();
    console.log("Database has been reset.");
  } catch (error) {
    console.error("Error resetting the database:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

resetDatabase();
