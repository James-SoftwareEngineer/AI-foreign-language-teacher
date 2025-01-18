import React from "react";
import styled from 'styled-components';

const HeaderContainer = styled.div`
    background: #1a1b1e;
    color: white;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
            90deg,
            rgba(100, 255, 218, 0),
            rgba(100, 255, 218, 0.3),
            rgba(100, 255, 218, 0)
        );
    }
`;

const HeaderTitle = styled.h1`
    font-size: 2.8em;
    font-weight: 800;
    color: white;
    margin: 0;
    letter-spacing: 1px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(
            90deg,
            rgba(100, 255, 218, 0),
            rgba(100, 255, 218, 0.5),
            rgba(100, 255, 218, 0)
        );
    }
    
    span {
        background: linear-gradient(135deg, #64ffda, #48bb78);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-left: 8px;
        position: relative;
        
        &::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, rgba(100, 255, 218, 0.1), rgba(72, 187, 120, 0.1));
            border-radius: 4px;
            z-index: -1;
        }
    }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderTitle>English<span>Buddy</span></HeaderTitle>
        </HeaderContainer>
    )
}

export default Header
