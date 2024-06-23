import { Schema } from "mongoose";
import commonSchema from "./commonSchema";

const currentlyReadingSchema = new Schema({
    ...commonSchema,
  progress: { type: Number, min: 0, max: 100 },
  startDate: { type: Date, default: Date.now } 
});

export default currentlyReadingSchema;
