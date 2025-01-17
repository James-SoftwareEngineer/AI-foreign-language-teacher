import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import useUser from "../../../hooks/useUser";
import useChat from "../../../hooks/useChat";
import Loading from "../../../components/pageLoading";
import { formatText } from "../../../utils";
import GenerateText from "../../../components/generateText";
import useLoading from "../../../hooks/useLoding";
import MessagePanel from "./messagePanel";
import InputPanel from "./inputPanel";

interface MessageBubbleProps {
    isUser: boolean;
}


const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 12%;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 100%;
`;

const CourseTitle = styled.h1`
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
`;




const Dashboard = () => {
    const navigate = useNavigate();

    const { isLoading, isLodingTrue, isLodingFalse, isInitializeLoding } = useLoading();
    const { courseName } = useParams();
    const { userData } = useUser();
    const { chatHistory, getChatHistory } = useChat();

    const initializeDashboard = async () => {
        isLodingTrue();
        if (!userData) {
            navigate("/404");
            return;
        }
        await getChatHistory({ courseName, userName: userData.name });
        isLodingFalse();
    };

    useEffect(() => {
        if(!isInitializeLoding){
            initializeDashboard();
        }
    }, [isInitializeLoding]);

    if (isLoading) {
        return <Loading />;
    }

    
    return (
        <DashboardContainer>
            <CourseTitle>{courseName}</CourseTitle>
            <MessagePanel />
            <InputPanel />
        </DashboardContainer>
    );
};

export default Dashboard;