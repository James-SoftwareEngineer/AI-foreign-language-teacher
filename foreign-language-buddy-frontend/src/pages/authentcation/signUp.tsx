import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useUser from "../../hooks/useUser";

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 82vh;
    background-color: #f5f5f5;
`;

const SignUpForm = styled.form`
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

const SignUpInput = styled.input`
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SignUpButton = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
`;

const UserLevelTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const UserLevelSelect = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState("beginner");

    const navigate = useNavigate();
    const { signUp } = useUser();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your sign up logic here
        const userData = {
            name: name,
            email: email,
            password: password,
            userLevel: level
        }
        console.log(userData);
        signUp(userData);
        navigate('/login');

    };

    return (
        <SignUpContainer>
            <SignUpForm onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <SignUpInput type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <SignUpInput type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <SignUpInput type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <UserLevelTitle>User Level</UserLevelTitle>
                <UserLevelSelect id="userLevel" value={level} onChange={(e) => setLevel(e.target.value)} required>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </UserLevelSelect>
                <SignUpButton type="submit">Sign Up</SignUpButton>
            </SignUpForm>
        </SignUpContainer>
    )
}

export default SignUp;