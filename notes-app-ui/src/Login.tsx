import React, { useState } from "react";
		import { useNavigate } from "react-router-dom";
		import "./Login.css";
		
		const Login: React.FC = () => {
		const [username, setUsername] = useState("");
		const [password, setPassword] = useState("");
		const navigate = useNavigate();
		
		const handleLogin = (event: React.FormEvent) => {
			event.preventDefault();
		


			if (username === "admin" && password === "uniquePassword") {
			localStorage.setItem("isAuthenticated", "true");
			navigate("/mainapp");
			} else {
			alert("Invalid username or password");
			}
		};
		
		return (
			<div className="login-container">
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
			</div>
		);
		};
		
export default Login;