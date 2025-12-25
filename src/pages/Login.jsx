// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api"; // your axios instance
import { useUser } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data); // save user in context & localStorage
      navigate("/"); // go to home
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "block",
            marginBottom: 12,
            padding: 10,
            width: "100%",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            marginBottom: 12,
            padding: 10,
            width: "100%",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
