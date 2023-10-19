import Joi from "joi";
import Comment from "../models/comment.js";

const mongoIdPattern = /^[0-9a-fA-F]{24}$/;
const commentController = {
  //create Comment method;
  async createComment(req, res, next) {
    const commentSchema = Joi.object({
      content: Joi.string().required(),
      blogId: Joi.string().regex(mongoIdPattern).required(),
      author: Joi.string().regex(mongoIdPattern).required(),
    });
    const { error } = commentSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { content, blogId, author } = req.body;

    try {
      const newComment = new Comment({
        content,
        blogId,
        author,
      });
      await newComment.save();
    } catch (error) {
      return next(error);
    }
    //sending response
    res.status(201).json({ message: "comment Created!" });
  },
  //get comment by blog Id
  async getComment(req, res, next) {
    const getCommentSchema = Joi.object({
      id: Joi.string().regex(mongoIdPattern).required(),
    });
    const { error } = getCommentSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;

    try {
      const comments = await Comment.find({ blogId: id }).populate("author");
      const commentArr = [];
      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        commentArr.push(comment);
      }
      return res.status(200).json({ comments: commentArr });
    } catch (error) {
      return next(error);
    }
  },
};

export default commentController;
