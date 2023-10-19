import React from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { signOut } from "../../api/internal";
import { useDispatch } from "react-redux";
import { reSetUser } from "../../store/userSlice";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.auth);
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    await signOut();
    //update the state
    dispatch(reSetUser());
    //navigate to the home page
    navigate("/");
  };
  return (
    <div className={styles.navbarmain}>
      <div className={styles.username}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h2>{username}</h2>
        </NavLink>
      </div>
      <div className={styles.post}>
        {isAuth ? <button onClick={() => navigate("/post")}>Post</button> : ""}
      </div>
      <div className={styles.actionbuttons}>
        {isAuth ? (
          <button className={styles.signout} onClick={handleSignOut}>
            SignOut
          </button>
        ) : (
          <div>
            {" "}
            <button className={styles.login} onClick={() => navigate("/login")}>
              LogIn
            </button>
            <button
              className={styles.signin}
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
