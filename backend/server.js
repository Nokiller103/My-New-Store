import express from "express";
dotenv.config();
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import productRoutes from "./routes/product.route.js"
import path from "path";

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes)

const __dirname = path.resolve();
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/dist")));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:" + PORT)
})