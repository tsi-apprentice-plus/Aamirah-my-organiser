import mongoose from "mongoose";
import app from "./app";

const PORT = 8080;

const DB_URI =
  "mongodb+srv://mongo_db_service_user:5xDpmCoC0rsDceXf@cluster0.knsb4bc.mongodb.net/my-library?retryWrites=true&w=majority&appName=Cluster0";

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
