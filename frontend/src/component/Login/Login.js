import React from "react";
import styles from "./Login.module.css";
import TextInput from "../TextInput/TextInput";
import { useFormik } from "formik";
import loginSchema from "../../Schemas/LoginSchema";
import { login } from "../../api/internal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/userSlice";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  const handleLogin = async () => {
    const data = {
      username: values.username,
      password: values.password,
    };
    try {
      const response = await login(data);
      if (response.status === 200) {
        const user = {
          _id: response.data.user._id,
          username: response.data.user.username,
          email: response.data.user.email,
          password: response.data.user.password,
          auth: response.data.auth,
        };
        //update the store
        dispatch(setUser(user));
        //navigate to the home page
        navigate("/");
      } else if (response.code === "ERR_BAD_REQUEST") {
        setError(response.response.data.message);
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <div className={styles.loginmain}>
      <div className={styles.card}>
        <h1>Login page</h1>
        <TextInput
          type="text"
          name="username"
          placeholder="username"
          value={values.username}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.username && touched.username ? 1 : undefined}
          errormessage={errors.username}
        />
        <TextInput
          type="password"
          name="password"
          placeholder="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.password && touched.password ? 1 : undefined}
          errormessage={errors.password}
        />
        <button className={styles.login} onClick={handleLogin}>
          Login
        </button>
        <span>
          Don't have account?
          <button className={styles.signup} onClick={() => navigate("/signup")}>
            SignUp
          </button>
        </span>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Login;
