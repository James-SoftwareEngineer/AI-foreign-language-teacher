import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.1); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 200%;
  gap: 30px;
  background: rgba(23, 27, 33, 0.85);
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    background: radial-gradient(
      circle at center,
      rgba(74, 144, 226, 0.1) 0%,
      transparent 70%
    );
    animation: ${rotate} 15s linear infinite;
  }
`;

const LoadingContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  animation: ${float} 3s ease-in-out infinite;
`;

const Circle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: #4A90E2;
  animation: ${rotate} 2s linear infinite;

  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: #4A90E2;
  }

  &::before {
    top: 10px;
    left: 10px;
    width: 15px;
    height: 15px;
    opacity: 0.8;
  }

  &::after {
    bottom: 15px;
    right: 15px;
    width: 10px;
    height: 10px;
    opacity: 0.6;
  }
`;

const InnerCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  border: 3px solid transparent;
  border-radius: 50%;
  border-bottom-color: #4A90E2;
  animation: ${rotate} 3s linear infinite reverse;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #4A90E2;
  text-align: center;
  animation: ${pulse} 2s ease-in-out infinite;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 10px rgba(74, 144, 226, 0.2);
  position: relative;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 2px;
    background: #4A90E2;
    border-radius: 2px;
    opacity: 0.6;
  }
`;

const GenerateText: React.FC = () => {
  return (
    <Container>
      <LoadingContainer>
        <Circle />
        <InnerCircle />
      </LoadingContainer>
      <Text>Generating response...</Text>
    </Container>
  );
};

export default GenerateText;
