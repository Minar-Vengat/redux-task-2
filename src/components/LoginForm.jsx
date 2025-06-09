import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/actions/authActions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [formError, setFormError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setFormError("All fields are required.");
      return;
    }

    if (!captchaChecked) {
      setFormError("Please verify that you are human.");
      return;
    }

    setFormError("");
    dispatch(loginRequest({ username, password }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white shadow p-4 rounded" style={{ width: "350px" }}>
        {/* Top error alert */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <span className="me-2">❌</span>
            {error || "Invalid Username."}
          </div>
        )}

        <h4 className="text-center mb-4">Welcome! Log In</h4>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label fw-semibold">User Name</label>
          <input
            className={`form-control ${!username && formError ? "is-invalid" : ""}`}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {!username && formError && <div className="text-danger small">Required</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className={`form-control ${!password && formError ? "is-invalid" : ""}`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!password && formError && <div className="text-danger small">Required</div>}
        </div>

        {/* Captcha checkbox */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={captchaChecked}
            onChange={() => setCaptchaChecked(!captchaChecked)}
            id="captcha"
          />
          <label className="form-check-label" htmlFor="captcha">
            I am human
          </label>
        </div>

        {/* Forgot Password */}
        <div className="text-end mb-3">
          <a href="#" className="text-decoration-none">
            <span role="img" aria-label="lock">🔒</span> Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button
          className="btn btn-danger w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Success */}
        {user && (
          <p className="text-success text-center mt-3">Login Success ✅</p>
        )}

        {/* Manual Form Error */}
        {formError && !error && (
          <div className="text-danger text-center mt-2">{formError}</div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;