import { Schema } from "mongoose";
import commonSchema from "./commonSchema";

const wantToReadSchema = new Schema({
    ...commonSchema,
    addedDate: { type: Date, default: Date.now }
});

export default wantToReadSchema;