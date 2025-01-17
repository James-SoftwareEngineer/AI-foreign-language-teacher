import React, { useState } from 'react';
import useUser from '../../../hooks/useUser';
import useChat from '../../../hooks/useChat';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


const InputContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
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


const InputPanel = () => {

    const [messages, setMessages] = useState("");
    const { courseName } = useParams();
    const { userData } = useUser();
    const { sendMessage } = useChat();

    
    const handleSend = () => {
        if (messages) {
            sendMessage({ courseName, userName: userData.name, message: messages });
            setMessages("");
        }
    }

    return (
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
    );
};

export default InputPanel;