import React from "react";
import styles from "./DetailedPost.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBlogById } from "../../api/internal";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../api/internal";
import { createComment } from "../../api/internal";
import { getComments } from "../../api/internal";

const DetailedPost = () => {
  const [newCommets, setNewComments] = useState([]);
  const [post, setPost] = useState([]);
  const [reload, setReload] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const userId = useSelector((state) => state.user._id);
  const params = useParams();
  const blogId = params.id;

  useEffect(() => {
    (async function fetchBlogById() {
      try {
        const response = await getBlogById(blogId);
        if (response.status === 200) {
          setPost(response.data.blog);
        } else if ("ERR_BAD_REQUEST") {
          setError(response.response.data.message);
        }

        const newComments = await getComments(blogId);
        if (response.status === 200) {
          setNewComments(newComments.data.comments);
        }
      } catch (error) {
        return error;
      }
    })();
  }, [reload]);

  //delete post method
  const handleDelete = async () => {
    try {
      const response = await deletePost(blogId);
      if (response.status === 200) {
        //navigate to the home page
        navigate("/");
      }
    } catch (error) {
      return error;
    }
  };

  //create comments by blogID
  const handleComments = async () => {
    const data = {
      content: comment,
      author: userId,
      blogId,
    };
    try {
      const response = await createComment(data);
      if (response.status === 201) {
        setComment("");
        setReload(!reload);
      }
    } catch (error) {}
  };
  return (
    <div className={styles.detailmain}>
      <div className={styles.left}>
        <h1>Title:{post.title}</h1>
        <h3>Creator:{post.AuthorUsername}</h3>
        <h4>Created At:{new Date(post.createdAt).toString()}</h4>
        <img src={post.photopath} />
        <p>Description:{post.content}</p>
        {userId === post.authorId ? (
          <div className={styles.buttons}>
            <button className={styles.delete} onClick={handleDelete}>
              Delete
            </button>
            <button
              className={styles.edit}
              onClick={() => navigate(`/update/${blogId}`)}
            >
              Edit
            </button>
          </div>
        ) : (
          ""
        )}
        <div className={styles.comment}>
          <button className={styles.commentbutton} onClick={handleComments}>
            AddComment
          </button>
          <input
            type="text"
            placeholder="Add Comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <p>{error}</p>
      </div>
      <div className={styles.right}>
        <h1>Comments</h1>
        {newCommets.map((newComment) => (
          <div className={styles.commentCard} key={newComment._id}>
            <h1>@{newComment.author.username}</h1>
            <p>{newComment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedPost;
