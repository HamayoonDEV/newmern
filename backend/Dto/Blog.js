class BlogDto {
  constructor(blog) {
    this._id = blog._id;
    this.content = blog.content;
    this.title = blog.title;
    this.photopath = blog.photopath;
    this.createdAt = blog.createdAt;
    this.authorId = blog.author._id;
    this.AuthorUsername = blog.author.username;
    this.AuthorName = blog.author.name;
  }
}

export default BlogDto;
