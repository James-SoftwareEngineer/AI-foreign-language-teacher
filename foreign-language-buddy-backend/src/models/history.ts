import { model, Schema } from "mongoose";

interface IHistory {
  userName: string;
  chatHistory: Array<Object>;
  createdAt?: Date;
  courseName: string;
}

const messageSchema = new Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
});

const historySchema = new Schema<IHistory>({
  userName: { type: String, required: true },
  courseName: { type: String, required: true },
  chatHistory: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

const historyDB = model<IHistory>("History", historySchema);

export default historyDB;

