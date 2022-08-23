const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Hi",
    author: "Nuno",
    url: "http..",
    likes: 0,
  },
  {
    title: "There",
    author: "Afonso",
    url: "https..",
    likes: 4,
  }
]

const nonExistingId = async () => {
  const blog = new Blog( {
    title: "Temp",
    author: "Nuno",
    url: "http..",
    likes: 0,
  })
  await blog.save()
  await blog.remove()

  return blog.id
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}