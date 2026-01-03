import express from "express";
import dotenv from "dotenv";
import questionRoutes from "./routes/question.routes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api", questionRoutes);

// Swagger
setupSwagger(app);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
