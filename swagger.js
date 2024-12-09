import swaggerAutogen from "swagger-autogen";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = {
  info: {
    title: "Orai API",
    version: "1.0.0",
    description: "Usereket kezel",
  },
  host: "localhost:3000",
  basePath: "/",
};

const outputFile = path.join(__dirname, "./swagger_output.json");
const routes = [path.join(__dirname, "./routes/studentRoutes.js")];

swaggerAutogen()(outputFile, routes, doc).then(() => {
  console.log("Swagger generálva");
});