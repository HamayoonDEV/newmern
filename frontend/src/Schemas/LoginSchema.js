import * as yup from "yup";
const passwordPattren =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
const loginSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("username is Required"),
  password: yup
    .string()
    .matches(passwordPattren, {
      message: "Atleast one upperCase,one lowerCase and one Digit&symbol",
    })
    .required("Password is required!"),
});
export default loginSchema;
