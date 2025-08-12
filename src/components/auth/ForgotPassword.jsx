import React, { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Email Sent. Please check your inbox");
    }
  }, [error, isAuthenticated, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="col-11 col-md-7 col-lg-5">
        <form
          className="shadow-lg rounded bg-white p-4 p-sm-5"
          onSubmit={submitHandler}
        >
          <div className="text-center mb-4">
            <img
              src="../assets/img/logo.png" // Replace with your actual logo path
              alt="Logo"
              style={{ width: "200px", height: "60px", objectFit: "contain" }}
            />
            <h3 className="mt-2 mb-1">Forgot Password</h3>
            <p className="text-muted">We’ll send a reset link to your email</p>
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-primary w-100 py-2 mt-3"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4">
            <a href="/admin/login" className="text-decoration-none">
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
