import express from "express";
import authController from "../controller/authController.js";
import auth from "../middleWare/auth.js";
import blogController from "../controller/blogController.js";
import commentController from "../controller/commentController.js";

const router = express.Router();
//authController endPoints

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);
router.get("/refresh", authController.refresh);

//blogController endPoint
router.post("/blog", auth, blogController.createBlog);
router.get("/blog/all", blogController.getAll);
router.get("/blog/:id", auth, blogController.getBlogById);
router.put("/blog/update", auth, blogController.update);
router.delete("/blog/:id", auth, blogController.deleteBlog);

//commentController endPoints

router.post("/comment", auth, commentController.createComment);
router.get("/comment/:id", auth, commentController.getComment);
export default router;
