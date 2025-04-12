import React from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const primaryColor = "#17a2b8"; // Bootstrap info color (teal)

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(to right, #e0f7fa, #ffffff)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "1rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="card-body">
          <h2
            className="text-center mb-4 fw-bold"
            style={{ color: primaryColor }}
          >
            Welcome Back!
          </h2>

          <form action="/users/login" method="post" noValidate>
            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label fw-semibold"
                style={{ color: "#333" }}
              >
                Email address
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <MdEmail style={{ color: primaryColor }} />
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label fw-semibold"
                style={{ color: "#333" }}
              >
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <RiLockPasswordFill style={{ color: primaryColor }} />
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

        {/* Remember me */}
<div className="d-flex align-items-center gap-2 mb-3">
  <input
    className="form-check-input m-0"
    type="checkbox"
    id="rememberMe"
    name="rememberMe"
    style={{ transform: "scale(1.1)" }} // optional: makes switch slightly bigger
  />
  <label
    className="form-check-label mb-0"
    htmlFor="rememberMe"
    style={{ color: "#555", fontSize: "0.95rem" }}
  >
    Remember Me
  </label>
</div>

            {/* Submit Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: primaryColor,
                  color: "#fff",
                  fontWeight: "600",
                  transition: "0.3s ease",
                }}
              >
                Log In
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-3">
              <a
                href="/register"
                className="text-decoration-none"
                style={{ color: primaryColor }}
              >
                Don't have an account? Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
