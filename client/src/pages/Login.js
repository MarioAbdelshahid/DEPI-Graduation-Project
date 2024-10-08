import React, { useState } from 'react';
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import './styles/Login.css';

const Login = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signUpName, setSignUpName] = useState(''); // Added Name state
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const { login, error, isLoading } = useLogin();
    const { signup, errorTwo, isLoadingTwo } = useSignup();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        await login(loginEmail, loginPassword);
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        await signup(signUpName, signUpEmail, signUpPassword); // Pass Name to signup
    };

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    return (
        <div className="login-container">
            <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUpSubmit}>
                        <h1>Create Account</h1>
                        <br />
                        <input
                            type="text"
                            placeholder="Name"
                            value={signUpName}
                            onChange={(e) => setSignUpName(e.target.value)} // Set Name state
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            value={signUpEmail}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            value={signUpPassword}
                        />
                        <div>
                            <button disabled={isLoadingTwo}>Sign Upp</button>
                            {errorTwo && <div className="error">{errorTwo}</div>}
                        </div>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLoginSubmit}>
                        <h1>Sign in</h1>
                        <br />
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setLoginPassword(e.target.value)}
                            value={loginPassword}
                        />
                        <a href="#">Forgot your password?</a>
                        <div className="signInUpButton">
                            <button disabled={isLoading}>Sign In</button>
                            {error && <div className="error">{error}</div>}
                        </div>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={handleSignInClick} id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start exploring the waters with us.</p>
                            <button className="ghost" onClick={handleSignUpClick} id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
