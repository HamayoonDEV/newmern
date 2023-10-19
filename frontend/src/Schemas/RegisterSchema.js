import * as yup from "yup";
const passwordPattren =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
const registerSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("username is Required"),
  name: yup.string().max(30).required("name is requried"),
  email: yup
    .string()
    .email("Insert a valid email")
    .required("email is required"),
  password: yup
    .string()
    .matches(passwordPattren, {
      message: "Atleast one upperCase,one lowerCase and one Digit&symbol",
    })
    .required("Password is required!"),
});
export default registerSchema;
