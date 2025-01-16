import { model, Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  userLevel: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userLevel: { type: String, required: true },

});

const userDB = model<IUser>("User", userSchema);

export default userDB;
    

