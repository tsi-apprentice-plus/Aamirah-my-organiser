import { model } from "mongoose";
import wantToReadSchema from "../schemas/WantToReadSchema";

const wantToRead = model("wantToRead", wantToReadSchema, "WantToRead");

export default wantToRead;
