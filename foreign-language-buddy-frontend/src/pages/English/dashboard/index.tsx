import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import useUser from "../../../hooks/useUser";
import useChat from "../../../hooks/useChat";
import Loading from "../../../components/pageLoading";
import { formatText } from "../../../utils";
import GenerateText from "../../../components/generateText";
import useLoading from "../../../hooks/useLoading";
import MessagePanel from "./messagePanel";
import InputPanel from "./inputPanel";

interface MessageBubbleProps {
    isUser: boolean;
}


const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 12%;
    background: linear-gradient(
        135deg,
        #0A0C0F 0%,
        #111419 100%
    );
    min-height: calc(100vh - 157px);
`;

const CourseTitle = styled.h1`
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 2.5em;
    color: #ffffff;
    margin: 0;
    font-weight: 600;
    text-align: center;
    position: relative;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.5px;
`;




const Dashboard = () => {
    const navigate = useNavigate();

    const { isLoading, isLodingTrue, isLodingFalse, isInitializeLoding } = useLoading();
    const { courseName } = useParams();
    const { userData } = useUser();
    const { getChatHistory } = useChat();

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
        if (!isInitializeLoding) {
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