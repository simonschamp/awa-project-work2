import mongoose, { Document, Schema } from "mongoose";
//import { IImage, Image } from '..';

interface IImage extends Document {
  filename: string;
  description: string;
  path: string;
  createdAt: Date;
  id?: string;
}

const imageSchema = new Schema({
  filename: { type: String, required: true },
  description: { type: String, required: true },
  path: { type: String, required: true },
  createdAT: { type: Date, default: Date.now },
});

const Image: mongoose.Model<IImage> = mongoose.model<IImage>(
  "Image",
  imageSchema
);
export { Image, IImage };
