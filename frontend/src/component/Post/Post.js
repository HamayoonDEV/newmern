import React from "react";
import styles from "./Post.module.css";
import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import { createPost } from "../../api/internal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Post = () => {
  const author = useSelector((state) => state.user._id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photopath, setPhoto] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const getPhoto = (e) => {
    const file = e.target.files[0];
    const read = new FileReader();
    read.readAsDataURL(file);
    read.onloadend = () => {
      setPhoto(read.result);
    };
  };
  const handlePost = async () => {
    const data = {
      title,
      content,
      photopath,
      author,
    };
    try {
      const response = await createPost(data);

      if (response.status === 201) {
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
    <div className={styles.postmain}>
      <div className={styles.postcard}>
        <h1>Create Post</h1>
        <TextInput
          type="text"
          placeholder="Title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          maxLength={300}
          className={styles.textarea}
          type="text"
          placeholder="write Description here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          id="file"
          accept="image/jpg,image/png,image/jpeg"
          onChange={getPhoto}
        />
        <button className={styles.post} onClick={handlePost}>
          Post
        </button>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Post;
