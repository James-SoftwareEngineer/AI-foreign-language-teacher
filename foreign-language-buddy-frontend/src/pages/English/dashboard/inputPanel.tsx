import React, { useState } from 'react';
import useUser from '../../../hooks/useUser';
import useChat from '../../../hooks/useChat';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useLoading from '../../../hooks/useLoading';


const InputContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
`;


const MessageInput = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    // height: 10px;
    overflow-y: auto;
    font-family: 'Arial', sans-serif;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
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
                >
                    Send
                </SendButton>
            </InputContainer>
    );
};

export default InputPanel;