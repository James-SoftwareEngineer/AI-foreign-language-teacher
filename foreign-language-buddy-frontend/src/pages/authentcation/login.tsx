import { useState } from "react";
import styled from 'styled-components';
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 82vh;
    background-color: #f5f5f5;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LoginInput = styled.input`
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const LoginButton = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
`;

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); 

    const { login, userData } = useUser();
    const { isLoading, isLodingTrue, isLodingFalse } = useLoading();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your login logic here
        const userInfo = {
            name: name,
            password: password
        }
        isLodingTrue();
        await login(userInfo);
        if(userData){
            isLodingFalse();
        }
        if (!isLoading) {
            console.log("userData", userData);
            navigate('/');
        }
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <h1>Login</h1>
                <LoginInput type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <LoginInput type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <LoginButton type="submit">Login</LoginButton>
            </LoginForm>
        </LoginContainer>
    )
}

export default Login;