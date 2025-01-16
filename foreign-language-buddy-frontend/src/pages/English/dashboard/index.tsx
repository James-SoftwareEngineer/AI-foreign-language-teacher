import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';
import useUser from "../../../hooks/useUser";
import useChat from "../../../hooks/useChat";
import Loading from "../../../components/loading";
import { formatText } from "../../../utils";

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

const MessageArea = styled.div`
    width: 100%;
    height: 59vh;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow-y: auto;
    background-color: #fff;
`;

const MessageInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SendButton = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;

const MessageBubble = styled.div<MessageBubbleProps>`
    display: flex;
    align-items: flex-start;
    justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
    margin: 10px 0;
    gap: 10px;
`;

const MessageContent = styled.div<MessageBubbleProps>`
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 15px;
    background-color: ${props => props.isUser ? '#007bff' : '#e9ecef'};
    color: ${props => props.isUser ? '#fff' : '#000'};
    white-space: pre-wrap;
    word-break: break-phrase;
    
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
`;

const DeleteIcon = styled.button`
    position: relative;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    color: #666;
    font-size: 12px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s ease;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        opacity: 1;
    }
`;


const Dashboard = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { courseName } = useParams();
    const { userData } = useUser();
    const { chatHistory, getChatHistory, sendMessage, deleteChatHistory } = useChat();

    const handleSend = () => {
        if (messages.trim()) {
            sendMessage({ courseName, userName: userData.name, message: messages });
            setMessages("");
        }
    }

    const deleteMessage = (index: number) => {
        console.log("delete message", index);
        deleteChatHistory({ courseName, userName: userData.name, index });
    }

    useEffect(() => {
        const initializeDashboard = async () => {
            setIsLoading(true);
            if (!userData.name) {
                navigate("/404");
                return;
            }
            await getChatHistory({ courseName, userName: userData.name });
            setIsLoading(false);
        };

        initializeDashboard();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <DashboardContainer>
            <CourseTitle>{courseName}</CourseTitle>
            <MessageArea>
                {chatHistory.map((message: any, index: number) => {
                    if (index === 0) return null;
                    const isUser = message.role === "user";
                    return (
                        <MessageBubble key={index} isUser={isUser}>
                            {!isUser && (
                                <Avatar
                                    src="/assets/bot-avatar.webp"
                                    alt="bot Avatar"
                                />
                            )}
                            <MessageContent isUser={isUser}>
                                <div dangerouslySetInnerHTML={{ __html: formatText(message.content) }} />
                                <DeleteIcon onClick={() => deleteMessage(index)}>
                                    ✕
                                </DeleteIcon>
                            </MessageContent>
                            {isUser && (
                                <Avatar
                                    src="/assets/user-avatar.webp"
                                    alt="User Avatar"
                                />
                            )}
                        </MessageBubble>
                    );
                })}
            </MessageArea>
            <InputContainer>
                <MessageInput
                    placeholder="Type your message..."
                    value={messages}
                    onChange={(e) => setMessages(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                />
                <SendButton onClick={handleSend}>Send</SendButton>
            </InputContainer>
        </DashboardContainer>
    );
};

export default Dashboard;