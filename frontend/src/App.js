import styles from "./App.module.css";
import Navbar from "./component/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";
import Register from "./component/Register/Register";
import Post from "./component/Post/Post";
import DetailedPost from "./component/DetailPost/DetailedPost";
import UpdatePost from "./component/updatePost/UpdatePost";

function App() {
  return (
    <div className={styles.appmain}>
      <Navbar />
      <Routes>
        <Route path="login" exact element={<Login />} />
        <Route path="signup" exact element={<Register />} />
        <Route path="/" exact element={<Home />} />
        <Route path="post" exact element={<Post />} />
        <Route path="post/:id" exact element={<DetailedPost />} />
        <Route path="update/:id" exact element={<UpdatePost />} />
      </Routes>
    </div>
  );
}

export default App;
