import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'http://localhost:30080';
  
    const handleSignUp = async (event: React.FormEvent) => {
      event.preventDefault();
  
      try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          navigate("/login");
        } else {
          setErrorMessage(data.message || "Error signing up");
        }
      } catch (error) {
        console.error("Error during sign up:", error);
        setErrorMessage("Something went wrong. Please try again.");
      }
    };
  
    return (
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    );
  };
  
  export default SignUp;