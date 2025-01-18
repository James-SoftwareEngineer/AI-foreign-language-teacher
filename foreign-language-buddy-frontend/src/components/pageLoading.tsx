import React from "react";
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
    0% { transform: scale(0.95); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(0.95); opacity: 0.7; }
`;

const float = keyframes`
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-15px) rotate(-5deg); }
    75% { transform: translateY(15px) rotate(5deg); }
`;

const glow = keyframes`
    0%, 100% { filter: brightness(1) blur(3px); }
    50% { filter: brightness(1.2) blur(6px); }
`;

const fadeInOut = keyframes`
    0% { opacity: 0.5; transform: translateY(0px); }
    50% { opacity: 1; transform: translateY(-3px); }
    100% { opacity: 0.5; transform: translateY(0px); }
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 82vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 70%);
        animation: ${pulse} 4s ease-in-out infinite;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(79, 70, 229, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }
`;

const FloatingParticle = styled.div`
    position: absolute;
    width: 6px;
    height: 6px;
    background: rgba(99, 102, 241, 0.3);
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;
    filter: blur(1px);

    &:nth-child(1) { top: 20%; left: 20%; animation-delay: -2s; }
    &:nth-child(2) { top: 60%; left: 80%; animation-delay: -1s; }
    &:nth-child(3) { top: 40%; left: 40%; animation-delay: -3s; }
    &:nth-child(4) { top: 80%; left: 60%; animation-delay: -4s; }
`;

const SpinnerWrapper = styled.div`
    position: relative;
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${pulse} 2.5s ease-in-out infinite;

    &::before {
        content: '';
        position: absolute;
        width: 140%;
        height: 140%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
        animation: ${glow} 2s ease-in-out infinite;
    }
`;

const Spinner = styled.div`
    position: absolute;
    width: 130px;
    height: 130px;
    border: 3px solid rgba(99, 102, 241, 0.1);
    border-top: 3px solid #6366f1;
    border-right: 3px solid #6366f1;
    border-radius: 50%;
    animation: ${spin} 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    box-shadow: 
        0 0 15px rgba(99, 102, 241, 0.3),
        0 0 30px rgba(99, 102, 241, 0.1);
    
    &::before {
        content: '';
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        border: 3px solid rgba(99, 102, 241, 0.1);
        border-top: 3px solid #818cf8;
        border-radius: 50%;
        animation: ${spin} 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite reverse;
    }

    &::after {
        content: '';
        position: absolute;
        top: 30px;
        left: 30px;
        right: 30px;
        bottom: 30px;
        border: 3px solid rgba(99, 102, 241, 0.1);
        border-top: 3px solid #a5b4fc;
        border-radius: 50%;
        animation: ${spin} 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    }
`;

const LoadingText = styled.div`
    margin-top: 50px;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    color: #e2e8f0;
    letter-spacing: 8px;
    text-transform: uppercase;
    animation: ${fadeInOut} 2s ease-in-out infinite;
    text-shadow: 
        0 0 20px rgba(99, 102, 241, 0.5),
        0 0 40px rgba(99, 102, 241, 0.3);
    position: relative;
    
    &::after {
        content: '...';
        animation: ${fadeInOut} 2s steps(4, end) infinite;
    }

    &::before {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #6366f1, transparent);
    }
`;

const Loading = () => {
    return (
        <LoadingContainer>
            <FloatingParticle />
            <FloatingParticle />
            <FloatingParticle />
            <FloatingParticle />
            <SpinnerWrapper>
                <Spinner />
            </SpinnerWrapper>
            <LoadingText>Loading</LoadingText>
        </LoadingContainer>
    );
}

export default Loading; 