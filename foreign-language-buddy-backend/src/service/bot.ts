import prompt from "../config";
import { gemini } from "../utils";
import chatService from "./chat";
import userService from "./user";

const botService = {
    getInintalBot: async (courseName: string, userName: string) => {
        const user = await userService.getUserData(userName);
        const initialPrompt = `You are an AI English language tutor named ${process.env.BOT_NAME}. The user's current learning focus is ${courseName} English, and their estimated level is ${user.userLevel}. Provide helpful, encouraging responses to help them improve their English. Correct any mistakes gently and explain the corrections. If they ask for explanations of grammar or vocabulary, provide clear, simple explanations. Occasionally, offer relevant idioms or phrases related to the conversation topic.`
        await gemini.generateText({
            contents: [
                {
                    role: "user",
                    content: initialPrompt
                }
            ]
        });
        const initalAnswer = `Hello! <b>${userName}!</b> I am EnglishBuddy, here to help you practice and improve your English. Feel free to talk about anything you like, or ask questions about English grammar, vocabulary, or pronunciation. I'll adjust our conversation to focus on ${courseName} English. How can I help you with that?`;
        const contents = [
            {
                role: "user",
                content: initialPrompt
            },
            {
                role: "assistant",
                content: initalAnswer
            }
        ]
        await chatService.createHistory({ courseName, userName, chatHistory: contents });
    }
}

export default botService;