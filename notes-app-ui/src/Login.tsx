import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./assets/logo.png";

const Login: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");

	const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';



	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const response = await fetch(`${API_BASE_URL}/api/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (response.ok) {
				// Store JWT in localStorage
				localStorage.setItem("token", data.token);
				localStorage.setItem("isAuthenticated", "true");

				// Navigate to the main app
				navigate("/mainapp");
			}
			else {
				// Show error message if login fails
				setErrorMessage(data.message || "Invalid username or password");
			}
		}
		catch (error) {
			console.error("Error during login:", error);
			setErrorMessage("Something went wrong. Please try again.");
		}
	};

	return (
		<div className="login-container">
			<img src={logo} alt="Monso-notes Logo" className="login-logo" />
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
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
				<button type="submit">Login</button>
			</form>
			{errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message */}
			<p> Don't have an account?<a href="/signup">Sign Up</a></p>
		</div>
	);
}
export default Login;