import mongoose from "mongoose";
import app from "./app";

const PORT = 8080;

const DB_URI = "mongodb://localhost:27017/my-library";

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
