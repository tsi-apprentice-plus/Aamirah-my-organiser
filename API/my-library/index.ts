import mongoose from "mongoose";
import app from "./app";
import 'dotenv/config';

console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);  
const PORT = 8080;

const DB_URI = process.env.MONGODB_URI;

if (!DB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
