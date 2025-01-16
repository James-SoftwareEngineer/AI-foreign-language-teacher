import { model, Schema } from "mongoose";

interface ICourse {
  name: string;
  description: string;
}

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const courseDB = model<ICourse>("Course", courseSchema);

export default courseDB;

