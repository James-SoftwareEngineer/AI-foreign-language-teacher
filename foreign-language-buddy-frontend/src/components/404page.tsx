import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 82vh;
  background-color: #f0f0f0;
`;

const NotFoundTitle = styled.h1`
  font-size: 4rem;
  color: #333;
  margin-bottom: 20px;
`;

const NotFoundMessage = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 40px;
`;

const GoHomeButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <NotFoundContainer>
            <NotFoundTitle>404</NotFoundTitle>
            <NotFoundMessage>Oops! The page you're looking for doesn't exist.</NotFoundMessage>
            <NotFoundMessage>Please login to continue.</NotFoundMessage>
            <GoHomeButton onClick={() => navigate('/')}>Go Home</GoHomeButton>
        </NotFoundContainer>
    )
}

export default NotFound;