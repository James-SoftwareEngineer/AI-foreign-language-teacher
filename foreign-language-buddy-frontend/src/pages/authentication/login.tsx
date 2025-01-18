import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useLoading from "../../hooks/useLoading";
import {
    AuthContainer,
    AuthForm,
    AuthInput,
    AuthButton,
    AuthTitle,
    AuthLink,
    ErrorMessage
} from "./auth.elements";

const Login = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: ""
    });
    const [error, setError] = useState("");
    
    const navigate = useNavigate();
    const { login, userData } = useUser();
    const { isLoading, isLodingTrue, isLodingFalse, isInitializeLoding } = useLoading();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name.trim() || !formData.password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            isLodingTrue();
            await login(formData);
            
            if (!isInitializeLoding) {
                navigate('/');
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            isLodingFalse();
        }
    };

    return (
        <AuthContainer>
            <AuthForm onSubmit={handleSubmit}>
                <AuthTitle>Login</AuthTitle>
                
                <AuthInput
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                
                <AuthInput
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                
                {error && <ErrorMessage>{error}</ErrorMessage>}
                
                <AuthButton type="submit" onClick={handleSubmit}>
                    Login
                </AuthButton>
                
                <AuthLink>
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </AuthLink>
            </AuthForm>
        </AuthContainer>
    );
};

export default Login; 