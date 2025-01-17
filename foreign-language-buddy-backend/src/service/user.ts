import { userDA } from "../data-access";
import bcrypt from "bcryptjs";
const userService = {

    signUp: async(data: any) => {
        const { name, password, email, userLevel } = data;
        const user = await userDA.findOne({ name: name });
        if (user) {
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
            name: name,
            email: email,
            password: hashedPassword,
            userLevel: userLevel
        }

        const result = await userDA.create(newUser);
        console.log("sign up result", result);
        return result;
    },

    login: async(name: string, password: string) => {
        const user = await userDA.findOne({ name: name });
        if (!user) {
            throw new Error("User does not exist");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Password is incorrect");
        }
        return user;
    },

    getUserData: async (name: string) => {
        const user = await userDA.findOne({ name: name });
        return user;
    }

}

export default userService;