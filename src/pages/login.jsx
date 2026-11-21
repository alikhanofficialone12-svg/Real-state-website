import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../firebase";
import Header from "../components/header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginUser(email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate(result.role === "admin" ? "/add-product" : "/");
    } else {
      console.error("Login result:", result);
      const codeText = result.code ? `${result.code}: ` : "";
      setError(`${codeText}${result.error || "Login failed. Please try again."}`);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <div className="shadow p-4 rounded">
          <h2 className="text-center mb-4">Admin Login</h2>
          <p className="text-center text-muted mb-3">Use the admin account to access the property upload area.</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
          <p className="text-center mt-3 text-muted">
            Admin email: admin@estate.com<br />
            Admin password: Admin@123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
