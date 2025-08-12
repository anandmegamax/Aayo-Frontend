import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login Successful");
      navigate("/admin/dashboard");
    }
    if (error) {
      toast.error(error?.data?.message || "Login failed");
    }
  }, [error, navigate, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-12 col-sm-10 col-md-6 col-lg-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <div className="text-center mb-3">
              <img
                src="../assets/img/logo.png" // replace with your logo path
                alt="Logo"
                style={{
                  width: "300px",
                  height: "80px",
                  objectFit: "contain",
                }}
              />
            </div>
            <h3 className="text-center mb-">Welcome Back 👋</h3>

            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="email_field" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password_field" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Link
                  to="/password/forgot"
                  className="text-decoration-none small"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login"}
              </button>
            </form>

            {/* <div className="text-center mt-3">
              <span className="text-muted small">New here? </span>
              <Link to="/register" className="text-decoration-none">
                Create an account
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
