import express from "express";
import cors from "cors";
import mongoose, { Document, Schema } from "mongoose";

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface Card {
  id: string;
  title: string;
  content: string;
  titleColor: string;
  contentColor: string;
  createdAt: string;
  updatedAt: string;
  estimateOfTime: number; // Estimated hour time the work should be completed
  logTime: number; // manually logged tim in hours
  completedAt?: string;
  doneTime?: number; // Time (hr) between start and finish
  comments: Comment[];
}

interface IColumn extends Document {
  id: string;
  title: string;
  cards: Card[];
}

const ColumnSchema: Schema = new Schema({
  id: String,
  title: String,
  cards: [
    {
      title: String,
      content: String,
      estimateOfTime: Number,
      logTime: Number,
      createdAt: String,
      updatedAt: String,
      completedAt: String,
      comments: [{ text: String, createdAt: String, updatedAt: String }],
    },
  ],
});
//const Column = mongoose.model("Column", ColumnSchema);
const Column: mongoose.Model<IColumn> = mongoose.model<IColumn>(
  "Column",
  ColumnSchema
);
export { Column, IColumn };
