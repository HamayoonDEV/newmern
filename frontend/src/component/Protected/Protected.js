import { Navigate } from "react-router-dom";

const Protected = ({ auth, children }) => {
  if (auth) {
    return children;
  } else {
    return <Navigate to="login" />;
  }
};

export default Protected;
