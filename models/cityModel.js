import { Schema, model, models } from "mongoose";

const citySchema = new Schema(
  {
    name: String,
    lat: String,
    lng: String,
    country: String,
    admin1: String,
    admin2: String,
  },
  { timestamps: true }
);

export default models.City || model("City", citySchema);