import React from "react";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { getBlog } from "../../api/internal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async function blogs() {
      try {
        const response = await getBlog();
        if (response.status === 200) {
          setBlog(response.data.blogs);
        }
      } catch (error) {
        return error;
      }
    })();
  }, []);
  return (
    <div className={styles.homemain}>
      <div className={styles.maincard}>
        {blogs.map((blog) => (
          <div
            className={styles.card}
            key={blog._id}
            onClick={() => navigate(`/post/${blog._id}`)}
          >
            <h1>Title:{blog.title}</h1>
            <h3>Creator:{blog.AuthorUsername}</h3>
            <h4>Created At:{blog.createdAt}</h4>
            <img src={blog.photopath} />
            <p>Description:{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
