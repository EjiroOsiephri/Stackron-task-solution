module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.ts"], // Ensure this points to your setup file
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/?(*.)+(spec|test).ts"],
};
