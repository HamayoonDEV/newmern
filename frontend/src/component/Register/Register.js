import React from "react";
import styles from "./Register.module.css";
import TextInput from "../TextInput/TextInput";
import { useFormik } from "formik";
import registerSchema from "../../Schemas/RegisterSchema";
import { register } from "../../api/internal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/userSlice";
import { useState } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
  });

  const handleRegister = async () => {
    const data = {
      username: values.username,
      password: values.password,
      name: values.name,
      email: values.email,
    };
    try {
      const response = await register(data);
      if (response.status === 201) {
        const user = {
          _id: response.data.user._id,
          username: response.data.user.username,
          name: response.data.user.name,
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
    <div className={styles.signupmain}>
      <div className={styles.card}>
        <h1>SignUp page</h1>
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
          type="text"
          name="name"
          placeholder="name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.name && touched.name ? 1 : undefined}
          errormessage={errors.name}
        />

        <TextInput
          type="email"
          name="email"
          placeholder="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.email && touched.email ? 1 : undefined}
          errormessage={errors.email}
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
        <button className={styles.signup} onClick={handleRegister}>
          SignUp
        </button>
        <span>
          Already have account?
          <button className={styles.login} onClick={() => navigate("/login")}>
            Login
          </button>
        </span>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Register;
