import { model } from "mongoose";
import currentlyReadingSchema from "../schemas/currentlyReadingSchema";

const currentlyReading = model(
  "currentlyReading",
  currentlyReadingSchema,
  "CurrentlyReading"
);

export default currentlyReading;
