import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/actions/authActions";
import 'bootstrap/dist/css/bootstrap.min.css';
import pic from '../assetse/pic.png';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [errors, setErrors] = useState({});

  function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (!userCaptcha) newErrors.userCaptcha = "Captcha is required";
    else if (userCaptcha !== captcha) newErrors.userCaptcha = "Captcha is incorrect";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      dispatch(loginRequest({ username, password }));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <img src={pic} alt="login" />
      <form className="bg-white p-5 shadow rounded" style={{ width: "350px" }} onSubmit={handleSubmit}>
        <h4 className="text-center mb-4 text-primary">Welcome! Log In</h4>

        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors(prev => ({ ...prev, username: "" }));
            }}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
            }}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong className="text-danger">{captcha}</strong>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                setCaptcha(generateCaptcha());
                setUserCaptcha("");
                setErrors(prev => ({ ...prev, userCaptcha: "" }));
              }}
            >
              Refresh
            </button>
          </div>
          <input
            type="text"
            className={`form-control ${errors.userCaptcha ? "is-invalid" : ""}`}
            placeholder="Enter Captcha"
            value={userCaptcha}
            onChange={(e) => {
              setUserCaptcha(e.target.value);
              if (errors.userCaptcha) setErrors(prev => ({ ...prev, userCaptcha: "" }));
            }}
          />
          {errors.userCaptcha && <div className="invalid-feedback">{errors.userCaptcha}</div>}
        </div>

        {error && <div className="text-danger mb-2">{error}</div>}

        <button className="btn btn-danger w-100 mb-2" type="submit">Login</button>

        <div className="text-center">
          <button type="button" className="btn btn-link text-decoration-none p-0">
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;