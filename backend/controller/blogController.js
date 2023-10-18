import Joi from "joi";
import fs from "fs";
import Blog from "../models/blog.js";
import { BACKEND_SERVER_PATH } from "../config/index.js";
import BlogDto from "../Dto/Blog.js";
import Comment from "../models/comment.js";

const mongoIdPattern = /^[0-9a-fA-F]{24}$/;
const blogController = {
  //create blog method
  async createBlog(req, res, next) {
    const createBlogSchema = Joi.object({
      content: Joi.string().required(),
      title: Joi.string().required(),
      photopath: Joi.string().required(),
      author: Joi.string().regex(mongoIdPattern).required(),
    });
    const { error } = createBlogSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { content, title, photopath, author } = req.body;

    //read image in buffer
    const buffer = Buffer.from(
      photopath.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    //alocat random name
    const imagePath = `${Date.now()}-${author}.png`;
    //save image locally
    fs.writeFileSync(`storage/${imagePath}`, buffer);
    //save to database
    let blog;
    try {
      const newBlog = new Blog({
        content,
        title,
        author,
        photopath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
      });
      blog = await newBlog.save();
    } catch (error) {
      return next(error);
    }
    //sending response
    res.status(201).json({ blog, auth: true });
  },
  //getAll blogs method
  async getAll(req, res, next) {
    try {
      const blogs = await Blog.find({}).populate("author");
      const blogArr = [];
      for (let i = 0; i < blogs.length; i++) {
        const blog = new BlogDto(blogs[i]);
        blogArr.push(blog);
      }
      return res.status(200).json({ blogs: blogArr, auth: true });
    } catch (error) {
      return next(error);
    }
  },
  //getblogById
  async getBlogById(req, res, next) {
    const getBlogByIdSchema = Joi.object({
      id: Joi.string().regex(mongoIdPattern).required(),
    });
    const { error } = getBlogByIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    const { id } = req.params;
    let blog;
    try {
      blog = await Blog.findOne({ _id: id }).populate("author");
      if (!blog) {
        const error = {
          status: 404,
          message: "Blog Not Found!",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    const blogDto = new BlogDto(blog);
    //sending response
    res.status(200).json({ blogDto, auth: true });
  },
  //update blog
  async update(req, res, next) {
    const updateBlogSchema = Joi.object({
      content: Joi.string(),
      title: Joi.string(),
      photopath: Joi.string(),
      blogId: Joi.string().regex(mongoIdPattern).required(),
      author: Joi.string().regex(mongoIdPattern).required(),
    });
    const { error } = updateBlogSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { content, title, photopath, blogId, author } = req.body;

    try {
      const blog = await Blog.findOne({ _id: blogId, authorId: author });
      if (photopath) {
        let previous = blog.photopath;
        previous = previous.split("/").at(-1);
        fs.unlinkSync(`storage/${previous}`);

        //read image in buffer
        const buffer = Buffer.from(
          photopath.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
          "base64"
        );
        //alocat random name
        const imagePath = `${Date.now()}-${author}.png`;
        //save image locally
        fs.writeFileSync(`storage/${imagePath}`, buffer);

        //update database
        try {
          await Blog.updateOne({
            content,
            title,
            photopath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
          });
        } catch (error) {
          return next(error);
        }
      } else {
        await Blog.updateOne({ content, title });
      }
    } catch (error) {
      return next(error);
    }
    //sending response
    res.status(200).json({ message: "blog has been updated!" });
  },
  //delete Blog
  async deleteBlog(req, res, next) {
    const deleteBlogSchema = Joi.object({
      id: Joi.string().regex(mongoIdPattern).required(),
    });
    const { error } = deleteBlogSchema.validate(req.params);

    if (error) {
      return next(error);
    }
    const { id } = req.params;

    try {
      await Blog.deleteOne({ _id: id });
      await Comment.deleteMany({});
    } catch (error) {
      return next(error);
    }
    //sending response
    res.status(200).json({ message: "blog has been delete!" });
  },
};

export default blogController;
