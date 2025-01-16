import { useContext } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import { server } from "typescript";
import service from "../service";

const useChat = () => {
    const { state, update, stateRef } = useContext(GlobalContext);

    const getChatHistory = async (data: any) => {
        const chatHistory = await service.getChatHistory(data);
        update({ chatHistory: chatHistory });
        return chatHistory;
    }

    const sendMessage = async (data: any) => {
        const userRequest = {
            role: "user",
            content: data.message
        }
        let prevState = stateRef.current;
        update({ chatHistory: [...prevState.chatHistory, userRequest] });
        const botReply = await service.sendMessage(data);
        prevState = stateRef.current;
        update({ chatHistory: [...prevState.chatHistory, botReply] });
    }

    const deleteChatHistory = async (data: any) => {
        const { courseName, userName, index } = data;
        const chatHistory = await service.deleteChatHistory({ courseName, userName, index });
        const tempChatHistory = [...stateRef.current.chatHistory];
        tempChatHistory.splice(index, 1);
        update({ chatHistory: tempChatHistory });
        return chatHistory;
    }

    return {
        getChatHistory,
        sendMessage,
        deleteChatHistory,

        chatHistory: state.chatHistory
    };

}

export default useChat;
