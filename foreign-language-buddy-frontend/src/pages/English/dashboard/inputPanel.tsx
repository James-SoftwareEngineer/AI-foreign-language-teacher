import React, { useState } from 'react';
import useUser from '../../../hooks/useUser';
import useChat from '../../../hooks/useChat';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useLoading from '../../../hooks/useLoading';
import { IoSendSharp } from 'react-icons/io5';


const InputContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    padding: 15px;
    background: linear-gradient(
        to bottom right,
        #171B21 0%,
        #1E2228 100%
    );
    border-radius: 16px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
`;


const MessageInput = styled.textarea`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    resize: none;
    min-height: 50px;
    max-height: 150px;
    overflow-y: auto;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 0.95rem;
    line-height: 1.5;
    background: rgba(30, 34, 40, 0.5);
    color: #e1e1e1;
    transition: all 0.3s ease;
    
    &:focus {
        outline: none;
        border-color: rgba(74, 144, 226, 0.5);
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }
    
    &::placeholder {
        color: #9ca3af;
    }
    
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
    
    &:disabled {
        background-color: rgba(30, 34, 40, 0.3);
        cursor: not-allowed;
        color: #6b7280;
    }
`;


const SendButton = styled.button`
    background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
    color: white;
    padding: 12px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    
    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
    }
    
    &:active:not(:disabled) {
        transform: translateY(0);
    }
    
    &:disabled {
        background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%);
        cursor: not-allowed;
        opacity: 0.7;
    }

    svg {
        font-size: 1.4em;
        transition: transform 0.3s ease;
    }
    
    &:hover:not(:disabled) svg {
        transform: translateX(2px);
    }
`;


interface InputPanelProps {
    disabled?: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ disabled }) => {

    const [messages, setMessages] = useState("");
    const { courseName } = useParams();
    const { userData } = useUser();
    const { sendMessage } = useChat();
    const { isGenerateLoading } = useLoading();

    
    const handleSend = () => {
        if (messages) {
            sendMessage({ courseName, userName: userData.name, message: messages });
            setMessages("");
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        setMessages(textarea.value);
        
        textarea.scrollTop = textarea.scrollHeight;
    };

    return (
            <InputContainer>
                <MessageInput
                    placeholder="Type your message..."
                    value={messages}
                    onChange={handleInput}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    disabled={isGenerateLoading}
                />
                <SendButton 
                    disabled={isGenerateLoading}
                    onClick={handleSend}
                    title={isGenerateLoading ? "Sending..." : "Send message"}
                >
                    <IoSendSharp />
                </SendButton>
            </InputContainer>
    );
};

export default InputPanel;