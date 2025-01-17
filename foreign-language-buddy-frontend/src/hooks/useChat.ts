import { useContext } from "react";
import { GlobalContext } from "../context";

import service from "../service";

const useChat = () => {
    const { state, update, stateRef } = useContext(GlobalContext);

    const getChatHistory = async (data: any) => {
        const chatHistory = await service.getChatHistory(data);
        update({ chatHistory: chatHistory});
        return chatHistory;
    }

    const sendMessage = async (data: any) => {
        update({ isGenerateLoading: true });
        const userRequest = {
            role: "user",
            content: data.message
        }
        let prevState = stateRef.current;
        update({ chatHistory: [...prevState.chatHistory, userRequest] });
        const botReply = await service.sendMessage(data);
        prevState = stateRef.current;
        update({ chatHistory: [...prevState.chatHistory, botReply.data] });
        update({ isGenerateLoading: false });
    }

    const deleteChatHistory = async (data: any) => {
        const { courseName, userName, index } = data;
        await service.deleteChatHistory({ courseName, userName, index });
        const tempChatHistory = [...stateRef.current.chatHistory];
        tempChatHistory.splice(index, 1);
        update({ chatHistory: tempChatHistory });
    }

    return {
        getChatHistory,
        sendMessage,
        deleteChatHistory,

        isGenerateLoading: state.isGenerateLoading,
        chatHistory: state.chatHistory
    };

}

export default useChat;
