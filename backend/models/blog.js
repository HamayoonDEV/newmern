import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchame = new Schema(
  {
    content: { type: String, required: true },
    title: { type: String, required: true },
    photopath: { type: String, required: true },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchame, "blogs");
