import express from "express";
import dotenv from "dotenv";
// console.log(process.env); 
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";

// dotenv.config()
dotenv.config({ path: './path/to/.env' });

// console.log(process.env); 
 const Cloud_Name = "dhahovyfc"
 const Cloud_Api = 277817157464178
 const Cloud_Secret = "Iw4tdFebDrQmfZXkcK3opVzFKaw"

cloudinary.v2.config({
  cloud_name: Cloud_Name,
  api_key: Cloud_Api,
  api_secret: Cloud_Secret,
});

const app = express();
const port1 = process.env.PORT
console.log(port1)

const port = process.env.PORT || 5000
// console.log(port)

//using middlewares
app.use(express.json());
app.use(cookieParser());

// importing routes
import userRoutes from "./routes/userRoutes.js";
import pinRoutes from "./routes/pinRoutes.js";

// using routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
