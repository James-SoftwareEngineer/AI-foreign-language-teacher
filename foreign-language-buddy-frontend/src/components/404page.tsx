import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  background: linear-gradient(to bottom, #1a1b1e, #2d2e32);
  color: #ffffff;
  padding: 40px 20px;
`;

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  color: #ffffff;
  margin-bottom: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const NotFoundMessage = styled.p`
  font-size: 1.3rem;
  color: #a0aec0;
  margin-bottom: 32px;
  text-align: center;
  line-height: 1.6;
  max-width: 600px;
`;

const GoHomeButton = styled.button`
  background: linear-gradient(135deg, #64ffda, #48bb78);
  color: #1a1b1e;
  padding: 16px 32px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(100, 255, 218, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(100, 255, 218, 0.4);
    background: linear-gradient(135deg, #48bb78, #38a169);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <NotFoundContainer>
            <NotFoundTitle>404</NotFoundTitle>
            <NotFoundMessage>Oops! The page you're looking for doesn't exist.</NotFoundMessage>
            <NotFoundMessage>Please login to continue your learning journey.</NotFoundMessage>
            <GoHomeButton onClick={() => navigate('/')}>Return Home</GoHomeButton>
        </NotFoundContainer>
    )
}

export default NotFound;