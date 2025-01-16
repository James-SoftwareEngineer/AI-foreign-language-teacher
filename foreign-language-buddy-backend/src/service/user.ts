import { userDA } from "../data-access";

const userService = {

    signUp: async(data: any) => {
        const { name, password, email, userLevel } = data;
        const user = await userDA.findOne({ name: name });
        if (user) {
            throw new Error("User already exists");
        }
        const newUser = {
            name: name,
            email: email,
            password: password,
            userLevel: userLevel
        }

        const result = await userDA.create(newUser);
        return result;
    },

    login: async(name: string, password: string) => {
        const user = await userDA.findOne({ name: name });
        if (!user) {
            throw new Error("User does not exist");
        }
        if (user.password !== password) {
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