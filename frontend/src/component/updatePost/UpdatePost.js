import React from "react";
import styles from "./UpdatePost.module.css";
import { useState, useEffect } from "react";
import TextInput from "../TextInput/TextInput";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getBlogById } from "../../api/internal";
import { updatePost } from "../../api/internal";

const UpdatePost = () => {
  const [author, setAuthor] = useState("");
  const params = useParams();
  const blogId = params.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photopath, setPhoto] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //using useEffect to getBlog data
  useEffect(() => {
    (async function fetchBlog() {
      try {
        const postGet = await getBlogById(blogId);
        if (postGet.status === 200) {
          setTitle(postGet.data.blog.title);
          setContent(postGet.data.blog.content);
          setPhoto(postGet.data.blog.photopath);
          setAuthor(postGet.data.blog.authorId);
        }
      } catch (error) {
        return error;
      }
    })();
  }, []);

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const read = new FileReader();
    read.readAsDataURL(file);
    read.onloadend = () => {
      setPhoto(read.result);
    };
  };
  const handleUpdatePost = async () => {
    let data;
    if (photopath.includes("http")) {
      data = {
        content,
        title,
        blogId,
        author,
      };
    } else {
      data = {
        content,
        title,
        blogId,
        author,
        photopath,
      };
    }
    try {
      const response = await updatePost(data);
      if (response.status === 200) {
        //navigate home page
        navigate("/");
      } else if (response.code === "ERR_BAD_REQUREST") {
        setError(response.response.data.message);
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <div className={styles.postmain}>
      <div className={styles.postcard}>
        <h1>Update Post</h1>
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
        <button className={styles.post} onClick={handleUpdatePost}>
          Post
        </button>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default UpdatePost;
