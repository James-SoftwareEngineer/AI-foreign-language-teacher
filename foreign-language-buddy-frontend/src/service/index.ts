import axios from "axios";
import React from "react";
const serverProvider = {

    serverUrl : "http://localhost:5050/api",

    signUp : async (userData: any) => {
        const result = await axios.post(`${serverProvider.serverUrl}/sign-up`, userData);
        return result.data
    },

    login : async (userData: any) => {
        const result = await axios.post(`${serverProvider.serverUrl}/login`, userData);
        return result.data
    },

    getCourses : async () => {
        const result = await axios.get(`${serverProvider.serverUrl}/get-courses`);
        return result.data
    },

    // selectCourse : async (data: string) => {
    //     const result = await axios.post(`${serverProvider.serverUrl}/select-course`, data);
    //     return result.data
    // },

    // addCourse : async (data: any) => {
    //     const result = await axios.post(`${serverProvider.serverUrl}/add-course`, data);
    //     return result.data
    // },

    initBot : async (data: any) => {
        const result = await axios.post(`${serverProvider.serverUrl}/chat/init`, data);
        return result.data
    },

    getChatHistory : async (data: any) => {
        const result = await axios.post(`${serverProvider.serverUrl}/chat/get-history`, data);
        return result.data.data.chatHistory
    },

    sendMessage : async (data: any) => {
        const result = await axios.post(`${serverProvider.serverUrl}/chat/send-message`, data);
        return result.data
    },

    deleteChatHistory : async (data: any) => {
        const result = await axios.post(`${serverProvider.serverUrl}/chat/delete-history`, data);
        return result.data
    }
}

export default serverProvider;