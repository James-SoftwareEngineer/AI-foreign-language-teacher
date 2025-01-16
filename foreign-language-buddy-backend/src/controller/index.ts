import { courseService, userService } from "../service";
import botService from "../service/bot";
import chatService from "../service/chat";

const controller = {

    signUp : async (req: any, res: any) => {
        try {
            const user = await userService.signUp(req.body);
            res.send(user);
        } catch (error) {
            console.log(error.message);
        }
    },

    login : async (req: any, res: any) => {
        try {
            const { name, password } = req.body;
            const user = await userService.login(name, password);
            res.send(user);
        } catch (error) {
            console.log(error.message);
        }
    },

    getCourses : async (req: any, res: any) => {
        try {
            const courses = await courseService.getCourses();
            res.send(courses);
        } catch (error) {
            console.log(error.message);
        }
    },

    initalBot : async (req: any, res: any) => {
        try {
            const { courseName, userName } = req.body;
            const botReply = await botService.getInintalBot(courseName, userName);
            res.send(botReply);
        } catch (error) {
            console.log(error.message);
        }
    },

    sendMessage : async (req: any, res: any) => {
        try {
            const { courseName, userName, message } = req.body;
            const answer = await chatService.sendMessage({ courseName, userName, message });
            res.send(answer);
        } catch (error) {
            console.log(error.message);
        }
    },

    getHistory : async (req: any, res: any) => {
        try {
            const { courseName, userName } = req.body;
            console.log(courseName, userName);
            const history = await chatService.getHistory(courseName, userName);
            res.send(history);
        } catch (error) {
            console.log(error.message);
        }
    },

    deleteHistory : async (req: any, res: any) => {
        try {
            const { courseName, userName, index } = req.body;
            const history = await chatService.deleteHistory({ courseName, userName, index });
            res.send(history);
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default controller;