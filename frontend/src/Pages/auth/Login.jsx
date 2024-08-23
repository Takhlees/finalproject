import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Login with email: ${email}, role: ${role}`);

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);

        document.cookie = `token=${data.token}; path=/; domain=localhost;`;
        document.cookie = `userID=${data.id}; path=/; domain=localhost;`;

        setNotification("You have successfully logged in!");

        setTimeout(() => {
          if (data.role === "admin") {
            window.location.href = "http://localhost:3001";
          } else {
            navigate("/");
          }
        }, 2000);
      } else {
        console.error("Login failed:", data.message);
        setNotification("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="authpage">
      <div className="authContainer">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputField">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Login</button>
        </form>
        {notification && <div className="notification">{notification}</div>}
        <p className="terms">
          By logging in or creating an account, you agree with our{" "}
          <a href="/terms">Terms & Conditions</a> and{" "}
          <a href="/privacy">Privacy Statement</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
