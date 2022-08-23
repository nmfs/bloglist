const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  /*Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })*/
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(e) {
    response.status(400).end()
  }
  /*await blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(err => response.status(400).end())*/

  /*blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })*/
})

blogsRouter.delete('/:id', async (req, res) => {
 await Blog.findByIdAndRemove(req.params.id)
 res.status(204).end()
})

module.exports = blogsRouter