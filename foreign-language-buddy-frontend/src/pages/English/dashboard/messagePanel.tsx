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

interface ChatMessage {
    role: string;
    content: string;
    timestamp?: string;
}

const gradientAnimation = `
    @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
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

const MessageContent = styled.div<MessageBubbleProps>`
    position: relative;
    max-width: 70%;
    padding: 14px 20px;
    border-radius: 20px;
    background: ${props => props.isUser ? 
        'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)' : 
        'linear-gradient(to bottom, rgba(40, 44, 52, 0.8), rgba(33, 37, 43, 0.8))'};
    backdrop-filter: blur(10px);
    border: 1px solid ${props => props.isUser ? 
        'rgba(255, 255, 255, 0.1)' : 
        'rgba(255, 255, 255, 0.05)'};
    color: ${props => props.isUser ? '#fff' : '#e1e1e1'};
    box-shadow: ${props => props.isUser ?
        '0 4px 15px rgba(74, 144, 226, 0.3)' :
        '0 4px 15px rgba(0, 0, 0, 0.2)'};
    white-space: pre-wrap;
    word-break: break-word;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    letter-spacing: 0.2px;
    
    &:hover {
        transform: translateY(-1px);
        box-shadow: ${props => props.isUser ?
            '0 6px 20px rgba(74, 144, 226, 0.4)' :
            '0 6px 20px rgba(0, 0, 0, 0.3)'};
    }
`;

const TimeStamp = styled.div<MessageBubbleProps>`
    font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 6px;
    opacity: 0.7;
    text-align: ${props => props.isUser ? 'right' : 'left'};
    font-weight: 500;
    letter-spacing: 0.5px;
`;

const StatusIndicator = styled.div<{ status: 'sent' | 'delivered' | 'read' }>`
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 2px;
    opacity: 0.8;
`;

const MessageBubble = styled.div<MessageBubbleProps>`
    display: flex;
    flex-direction: column;
    align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
    margin: 15px 0;
    gap: 4px;
    animation: fadeIn 0.3s ease;
    max-width: 100%;
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const TypingIndicator = styled.div`
    display: flex;
    gap: 4px;
    padding: 12px 16px;
    background: rgba(45, 45, 45, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    margin: 10px 0;
    
    span {
        width: 6px;
        height: 6px;
        background: #4A90E2;
        border-radius: 50%;
        animation: typing 1.4s infinite;
        opacity: 0.7;
        
        &:nth-child(1) { animation-delay: -0.32s; }
        &:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typing {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
        }
    }
`;

const MessageArea = styled.div`
    position: relative;
    width: 100%;
    height: 59vh;
    padding: 15px;
    margin-bottom: 20px;
    border: none;
    border-radius: 16px;
    background: linear-gradient(
        to bottom right,
        #171B21 0%,
        #1E2228 100%
    );
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    scroll-behavior: smooth;
    border: 1px solid rgba(255, 255, 255, 0.05);
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: linear-gradient(transparent, #1E2228);
        pointer-events: none;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
    }
`;

const ChatHistory = styled.div`
    overflow-y: auto;
    height: 97%;
    padding: 10px;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(74, 144, 226, 0.3);
        border-radius: 3px;
        
        &:hover {
            background: rgba(74, 144, 226, 0.5);
        }
    }
`;

const Avatar = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 14px;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
        transform: scale(1.05) rotate(3deg);
        border-color: rgba(74, 144, 226, 0.5);
    }
`;


const DeleteIcon = styled.button<MessageBubbleProps>`
    background: ${props => !props.isUser ? 'transparent' : 'rgba(45, 45, 45, 0.5)'};
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #9ca3af;
    font-size: 12px;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease;
    padding: 4px;
    width: ${props => !props.isUser ? 'auto' : '24px'};
    height: ${props => !props.isUser ? 'auto' : '24px'};
    
    &:hover {
        opacity: 1;
        transform: translateY(-2px);
        color: #E53E3E;
        border-color: rgba(229, 62, 62, 0.4);
        box-shadow: 0 4px 12px rgba(229, 62, 62, 0.2);
    }
`;


const GenerateTextOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(23, 27, 33, 0.95);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    border-radius: 16px;
    transition: all 0.3s ease;
    opacity: 0.5;
     
    &::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: 16px;
        padding: 1px;
        background: linear-gradient(
            135deg,
            rgba(74, 144, 226, 0.2),
            transparent 50%,
            rgba(74, 144, 226, 0.2)
        );
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }
`;

const CopyButton = styled.button`
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #9ca3af;
    font-size: 14px;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease;
    padding: 4px 8px;
    
    &:hover {
        opacity: 1;
        transform: translateY(-2px);
        color: #4A90E2;
        border-color: rgba(74, 144, 226, 0.4);
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
    }
`;

const AvatarOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
    cursor: pointer;
`;

const ZoomedAvatar = styled.img`
    max-width: 500px;
    max-height: 500px;
    border-radius: 30px;
    object-fit: cover;
    border: 4px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    transform: scale(1);
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        max-width: 90vw;
        max-height: 90vw;
    }
`;

const MessagePanel = () => {
    const { courseName } = useParams();
    const { userData } = useUser();
    const { chatHistory, deleteChatHistory } = useChat();
    const { isGenerateLoading } = useLoading();
    const messageAreaRef = useRef<HTMLDivElement>(null);
    const [copiedMessageIds, setCopiedMessageIds] = useState<number[]>([]);
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    useEffect(() => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [chatHistory, isGenerateLoading]);

    const deleteMessage = (index: number) => {
        console.log("delete message", index);
        deleteChatHistory({ courseName, userName: userData.name, index });
    }

    const handleCopyMessage = async (content: string, index: number) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedMessageIds(prev => [...prev, index]);
            setTimeout(() => {
                setCopiedMessageIds(prev => prev.filter(id => id !== index));
            }, 2000);
        } catch (error) {
            console.error('Failed to copy text:', error);
        }
    };

    const handleAvatarClick = (avatarSrc: string) => {
        setSelectedAvatar(avatarSrc);
    };

    return (
        <>
            <MessageArea>
                {isGenerateLoading && (
                    <GenerateTextOverlay>
                        <GenerateText />
                    </GenerateTextOverlay>
                )}
                <ChatHistory ref={messageAreaRef}>
                    {chatHistory.map((message: ChatMessage, index: number) => {
                        if (index === 0) return null;
                        const isUser = message.role === "user";
                        const messageTime = message.timestamp 
                            ? new Date(message.timestamp).toLocaleTimeString()
                            : new Date().toLocaleTimeString();

                        return (
                            <MessageBubble key={index} isUser={isUser}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    {!isUser && (
                                        <Avatar
                                            src="/assets/bot-avatar.webp"
                                            alt="Bot Avatar"
                                            onClick={() => handleAvatarClick("/assets/bot-avatar.webp")}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    <MessageContent isUser={isUser}>
                                        <div dangerouslySetInnerHTML={{ __html: formatText(message.content) }} />
                                        <ButtonContainer isUser={isUser}>
                                            {!isUser ? (
                                                <>
                                                    <CopyButton 
                                                        onClick={() => handleCopyMessage(message.content, index)}
                                                        title="Copy message"
                                                    >
                                                        {copiedMessageIds.includes(index) ? '✓' : '📋'}
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
                                            onClick={() => handleAvatarClick("/assets/user-avatar.webp")}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                </div>
                                <TimeStamp isUser={isUser}>{messageTime}</TimeStamp>
                                {isUser && <StatusIndicator status="read" />}
                            </MessageBubble>
                        );
                    })}
                    {isGenerateLoading && (
                        <TypingIndicator>
                            <span></span>
                            <span></span>
                            <span></span>
                        </TypingIndicator>
                    )}
                </ChatHistory>
            </MessageArea>
            
            {selectedAvatar && (
                <AvatarOverlay onClick={() => setSelectedAvatar(null)}>
                    <ZoomedAvatar 
                        src={selectedAvatar} 
                        alt="Zoomed Avatar" 
                        onClick={(e) => e.stopPropagation()}
                    />
                </AvatarOverlay>
            )}
        </>
    );
};

export default MessagePanel;