import { model } from "mongoose";
import readSchema from "../schemas/readSchema";

const Read = model("Read", readSchema, "Read");

export default Read;
