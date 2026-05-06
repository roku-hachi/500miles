import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import api from "../../utils/api";
import { validateEmail } from "../../utils/validate";
const Login = () => {
  const navigate = useNavigate();
  const { values, errors, setErrors, handleChange } = useForm({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const errSubmit = {};
    let flag = true;

    if (values.email === "") {
      errSubmit.email = "Please enter your email";
      flag = false;
    } else if (!validateEmail(values.email)) {
      errSubmit.email = "Invalid email";
      flag = false;
    }

    if (values.password === "") {
      errSubmit.password = "Please enter your email";
      flag = false;
    }

    if (!flag) {
      setErrors(errSubmit);
    } else {
      const data = {
        email: values.email,
        password: values.password,
      };
      api
        .post("/login", data)
        .then((res) => {
          console.log("check res:", res);
          const userData = res.data.data;
          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          const user = {
            id: userData.id,
            user_name: userData.user_name,
            email: userData.email,
            avatar: userData.avatar,
            address: userData.address,
            phone: userData.phone,
          };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="login-main">
      <div className="login-box">
        <div className="logo">
          <img
            src="https://img.icons8.com/color/96/000000/admin-settings-male.png"
            alt="Logo"
          />
          <h3 className="text-success">Admin Panel</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>
          <button className="btn btn-success w-100">Login</button>
          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-success">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
