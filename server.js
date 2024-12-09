import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes.js";
import { DbInit } from "./database.js";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";

const app = express();
const PORT = 3000;

async function startServer() {
  try {
    const swaggerFile = await readFile(new URL("./swagger_output.json", import.meta.url));
    let swaggerDocument;
    try {
      swaggerDocument = JSON.parse(swaggerFile);
    } catch (jsonError) {
      throw new Error("Invalid JSON in swagger_output.json");
    }

    app.use(bodyParser.json());
    app.use(cors());
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/api/users", studentRoutes);

    await DbInit();
    console.log("Adatbázis inicializálva");
    app.listen(PORT, () => {
      console.log(`A szerver fut a http://localhost:${PORT} címen`);
    });
  } catch (err) {
    console.error("Hiba az adatbázis inicializálásakor", err);
  }
}

startServer();