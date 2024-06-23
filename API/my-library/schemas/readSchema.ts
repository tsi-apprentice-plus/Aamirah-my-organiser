import { Schema } from "mongoose";
import commonSchema from "./commonSchema";

const readSchema = new Schema({
  ...commonSchema,
  rating: { type: Number, min: 0, max: 5 },
  dateFinished: { type: Date, default: Date.now },
});

export default readSchema;
