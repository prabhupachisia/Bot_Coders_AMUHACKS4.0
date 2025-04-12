import React from "react";
import "./login.css"; // Contains padding for login content
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  return (
    <div className="login-page">
      <div className="row mt-3">
        <h1 className="col-6 offset-3 text-center">Login</h1>
        <div className="col-10 offset-1">
          <form
            action="/users/login"
            method="post"
            noValidate
            className="needs-validation"
          >
            {/* Email Field with Icon */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  required
                />
                <span className="input-group-text">
                  <MdEmail />
                </span>
              </div>
              <div className="valid-feedback">Looks Good</div>
            </div>

            {/* Password Field with Icon */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  required
                />
                <span className="input-group-text">
                  <RiLockPasswordFill />
                </span>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <button className="btn btn-success">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
