import { courseService, userService } from "../service";
import botService from "../service/bot";
import chatService from "../service/chat";

const controller = {

    signUp : async (req: any, res: any) => {
        try {
            const user = await userService.signUp(req.body);
            res.send({
                data: user,
                message: "SignUp Successfully"
            });
        } catch (error) {
            console.log(error.message);
            res.send({
                message: error.message
            });
        }
    },

    login : async (req: any, res: any) => {
        try {
            const { name, password } = req.body;
            const user = await userService.login(name, password);
            res.send({
                data: user,
                message: "Login Successfully"
            });
        } catch (error) {
            console.log(error.message);
            res.send({
                message: error.message
            });
        }
    },

    getCourses : async (req: any, res: any) => {
        try {
            const courses = await courseService.getCourses();
            res.send({
                data: courses,
                message: "Get courses successfully"
            });
        } catch (error) {
            console.log(error.message);
            res.send({
                message: error.message
            });
        }
    },

    // addCourse : async (req: any, res: any) => {
    //     try {
    //         const { courseName, courseDescription } = req.body;
    //         const course = await courseService.addCourse(courseName, courseDescription);
    //         res.send(course);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // },

    initalBot : async (req: any, res: any) => {
        try {
            const { courseName, userName } = req.body;
            const botReply = await botService.getInintalBot(courseName, userName);
            res.send({
                data: botReply,
                message: "Inital bot successfully"
            });
        } catch (error) {
            console.log(error.message);
            res.send({
                message: error.message
            });
        }
    },

    sendMessage : async (req: any, res: any) => {
        try {
            const { courseName, userName, message } = req.body;
            const answer = await chatService.sendMessage({ courseName, userName, message });
            res.send({
                data: answer,
                message: "Send message successfully"
            });
        } catch (error) {
            console.log(error.message);
            res.send({
                message: error.message
            });
        }
    },

    getHistory : async (req: any, res: any) => {
        try {
            const { courseName, userName } = req.body;
            console.log(courseName, userName);
            const history = await chatService.getHistory(courseName, userName);
            res.send({
                data: history,
                message: "Get history successfully"
            });
        } catch (error) {
            console.log(error.message);
            res.send({
                message: error.message
            });
        }
    },

    deleteHistory : async (req: any, res: any) => {
        try {
            const { courseName, userName, index } = req.body;
            const history = await chatService.deleteHistory({ courseName, userName, index });
            res.send({
                data: history,
                message: "Delete history successfully"
            });
        } catch (error) {
            console.log(error.message);
            res.send({
                message: error.message
            });
        }
    }
}

export default controller;