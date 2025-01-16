import { historyDA } from "../data-access";
import user from "../models/user";
import { gemini } from "../utils";
import botService from "./bot";

const chatService = {
    sendMessage: async (data: any) => {
        const { courseName, message, userName } = data;
        console.log("sendMessage", courseName, message, userName);
        const tempChatHistory = {
            role: "user",
            content: message
        }
        console.log("tempChatHistory", tempChatHistory);
        await chatService._addHistory({ courseName, userName, tempChatHistory });
        const history = await chatService._findHistory(courseName, userName);
        console.log("history", history);
        const answer = await gemini.generateText({ contents: history.chatHistory });
        tempChatHistory['role'] = "assistant";
        tempChatHistory['content'] = answer;
        console.log("tempChatHistory", tempChatHistory);
        await chatService._addHistory({ courseName, userName, tempChatHistory });
        return tempChatHistory;
    },

    getHistory: async (courseName: string, userName: string) => {
        console.log("service", courseName, userName);
        await botService.getInintalBot(courseName, userName);
        const history = await historyDA.findOne({ courseName: courseName, userName: userName });
        console.log("history", history);
        return history;
    },
    
    createHistory: async (data: any) => {
        const { courseName, userName, chatHistory } = data;
        const history = await historyDA.findOne({ courseName: courseName, userName: userName });
        if (!history) {
            console.log("history not exist!!!");
            await historyDA.create({ courseName, userName, chatHistory });
        } else {
            console.log("history exist!!!");
        }
    },

    deleteHistory: async (data: any) => {
        const { courseName, userName, index } = data;
        const history = await historyDA.findOne({ courseName: courseName, userName: userName });
        history.chatHistory.splice(index, 1);
        await historyDA.updateOne({ filter: { courseName: courseName, userName: userName }, data: { chatHistory: history.chatHistory } });
    },

    _addHistory: async (data: any) => {
        const { courseName, userName, tempChatHistory } = data;

        const history = await chatService._findHistory(courseName, userName);
        history.chatHistory.push(tempChatHistory);
        await historyDA.updateOne({ filter: { courseName: courseName, userName: userName }, data: { chatHistory: history.chatHistory } });
    },

    _findHistory: async (courseName: string, userName: string) => {
        const history = await historyDA.findOne({ courseName: courseName, userName: userName });
        return history;
    },


}

export default chatService;