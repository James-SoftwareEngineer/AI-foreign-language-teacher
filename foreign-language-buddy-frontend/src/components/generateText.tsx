import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  opacity: 0.5
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 8px;
  
  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #007bff;
    animation: bounce 1.4s infinite ease-in-out both;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`;

const Text = styled.p`
  font-size: 18px;
  color: #333;
  margin-top: 20px;
`;

const GenerateText: React.FC = () => {
  return (
    <Container>
      <LoadingDots>
        <span></span>
        <span></span>
        <span></span>
      </LoadingDots>
      <Text>Generating response...</Text>
    </Container>
  );
};

export default GenerateText;
