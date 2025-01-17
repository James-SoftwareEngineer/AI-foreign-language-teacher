import React, { useState, useEffect, useRef } from 'react';
import useChat from '../../../hooks/useChat';
import { useParams } from 'react-router-dom';
import useUser from '../../../hooks/useUser';
import useLoading from '../../../hooks/useLoading';
import styled from 'styled-components';
import { formatText, generateChartCode } from '../../../utils';
import GenerateText from '../../../components/generateText';


interface MessageBubbleProps {
    isUser: boolean;
}


const MessageArea = styled.div`
    position: relative;
    width: 100%;
    height: 59vh;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
`;

const ChatHistory = styled.div`
    overflow-y: auto;
    height: 100%;
`;

const MessageBubble = styled.div<MessageBubbleProps>`
    display: flex;
    align-items: flex-start;
    justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
    margin: 10px 0;
    gap: 10px;
`;


const MessageContent = styled.div<MessageBubbleProps>`
    position: relative;
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


const DeleteIcon = styled.button<MessageBubbleProps>`
    background: ${props => !props.isUser ? 'none' : '#fff'};
    border: ${props => !props.isUser ? 'none' : '1px solid #ccc'};
    border-radius: ${props => !props.isUser ? '0' : '50%'};
    color: #666;
    font-size: 12px;
    cursor: pointer;
    opacity: ${props => !props.isUser ? 0.5 : 1};
    transition: opacity 0.2s ease;
    padding: 2px;
    width: ${props => !props.isUser ? 'auto' : '20px'};
    height: ${props => !props.isUser ? 'auto' : '20px'};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        opacity: 1;
    }
`;


const GenerateTextOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const CopyButton = styled.button`
    background: none;
    border: none;
    color: #666;
    font-size: 12px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s ease;
    padding: 2px;
    margin-left: 5px;
    display: flex;
    align-items: center;

    &:hover {
        opacity: 1;
    }
`;

const ButtonContainer = styled.div<MessageBubbleProps>`
    display: flex;
    gap: 5px;
    position: absolute;
    ${props => !props.isUser ? `
        bottom: 5px;
        right: 5px;
    ` : `
        top: 0px;
        left: -20px;
        opacity: 0;
        transition: opacity 0.2s ease;
        &:hover {
            opacity: 1;
        }
    `}
`;

const MessagePanel = () => {
    const { courseName } = useParams();
    const { userData } = useUser();
    const { chatHistory, deleteChatHistory } = useChat();
    const { isGenerateLoading } = useLoading();
    const messageAreaRef = useRef<HTMLDivElement>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [chatHistory, isGenerateLoading]);

    const deleteMessage = (index: number) => {
        console.log("delete message", index);
        deleteChatHistory({ courseName, userName: userData.name, index });
    }

    const handleCopyMessage = async (content: string) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    };

    return (
        <MessageArea>
            {isGenerateLoading && (
                <GenerateTextOverlay>
                    <GenerateText />
                </GenerateTextOverlay>
            )}
            <ChatHistory ref={messageAreaRef}>
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
                                <ButtonContainer isUser={isUser}>
                                    {!isUser ? (
                                        <>
                                            <CopyButton 
                                                onClick={() => handleCopyMessage(message.content)}
                                                title="Copy message"
                                            >
                                                {copySuccess ? '✓' : '📋'}
                                            </CopyButton>
                                            <DeleteIcon isUser={isUser} onClick={() => deleteMessage(index)}>
                                                ✕
                                            </DeleteIcon>
                                        </>
                                    ) : (
                                        <DeleteIcon isUser={isUser} onClick={() => deleteMessage(index)}>
                                            ✕
                                        </DeleteIcon>
                                    )}
                                </ButtonContainer>
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
            </ChatHistory>
        </MessageArea>
    );
};

export default MessagePanel;