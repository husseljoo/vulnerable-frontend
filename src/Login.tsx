import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Authorization {
    token: string;
    type: string;
}

interface LoginResponse {
    status: string;
    authorization?: Authorization;
}


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const credentials = { email, password };

        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '', // CSRF token from Laravel
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data: LoginResponse = await response.json();
                if (data.status === 'success') {
                    setSuccessMessage('Login successful!');
                    setErrorMessage('');
                     if (data.authorization?.token) {
                        localStorage.setItem('jwt_token', data.authorization.token);
                    } else {
                        console.error("Authorization token is missing");
                    }
                    // Redirect to the dashboard
                    navigate('/dashboard');
                }
            } else {
                setErrorMessage('Login failed');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    minLength={5}
                                    maxLength={20}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={6}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align="center">
                                <input type="submit" value="Login" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            <button onClick={() => navigate('/')}>Back to Homepage</button> {/* Using navigate for redirection */}
        </div>
    );
};

export default Login;
