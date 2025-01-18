import styled from "styled-components";

export const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 64px);
    background: linear-gradient(to bottom, #1a1b1e, #2d2e32);
    padding: 40px 20px;
    
    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    padding: 40px;
    border-radius: 24px;
    background-color: #2d2e32;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
        transform: translateY(-4px);
    }
`;

export const AuthTitle = styled.h1`
    color: #ffffff;
    margin-bottom: 32px;
    font-size: 2.5rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const AuthInput = styled.input`
    width: 100%;
    padding: 14px;
    margin: 8px 0;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    font-size: 1.1rem;
    background-color: #34353a;
    color: #ffffff;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #64ffda;
        box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.2);
    }

    &::placeholder {
        color: #718096;
    }
`;

export const AuthButton = styled.button`
    width: 100%;
    padding: 16px;
    margin-top: 24px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #64ffda, #48bb78);
    color: #1a1b1e;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #48bb78, #38a169);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(100, 255, 218, 0.3);
    }

    &:disabled {
        background: #4a4b50;
        color: #718096;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

export const AuthLink = styled.p`
    margin-top: 24px;
    color: #a0aec0;
    font-size: 1rem;

    a {
        color: #64ffda;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;

        &:hover {
            color: #48bb78;
            text-decoration: none;
        }
    }
`;

export const ErrorMessage = styled.div`
    color: #ff6b6b;
    font-size: 0.9rem;
    margin-top: 6px;
    width: 100%;
    text-align: left;
`;

export const UserLevelTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: 600;
    color: #ffffff;
    margin: 24px 0 12px;
    width: 100%;
`;

export const UserLevelSelect = styled.select`
    width: 100%;
    padding: 14px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    font-size: 1.1rem;
    background-color: #34353a;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #64ffda;
        box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.2);
    }

    option {
        background-color: #2d2e32;
        color: #ffffff;
    }
`; 