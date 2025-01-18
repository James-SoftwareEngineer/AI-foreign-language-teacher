import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import {
    AuthContainer,
    AuthForm,
    AuthInput,
    AuthButton,
    AuthTitle,
    UserLevelTitle,
    UserLevelSelect,
    AuthLink,
    ErrorMessage
} from "./auth.elements";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        level: "beginner"
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { signUp } = useUser();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ""
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
            await signUp({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                userLevel: formData.level
            });
            navigate('/login');
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: "Failed to create account. Please try again."
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthContainer>
            <AuthForm onSubmit={handleSubmit}>
                <AuthTitle>Sign Up</AuthTitle>
                
                <AuthInput
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    disabled={isSubmitting}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                
                <AuthInput
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    disabled={isSubmitting}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                
                <AuthInput
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    disabled={isSubmitting}
                />
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                
                <AuthInput
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    disabled={isSubmitting}
                />
                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                
                <UserLevelTitle>User Level</UserLevelTitle>
                <UserLevelSelect
                    id="level"
                    value={formData.level}
                    onChange={handleChange}
                    disabled={isSubmitting}
                >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </UserLevelSelect>
                
                {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
                
                <AuthButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                </AuthButton>
                
                <AuthLink>
                    Already have an account? <Link to="/login">Login here</Link>
                </AuthLink>
            </AuthForm>
        </AuthContainer>
    );
};

export default SignUp; 