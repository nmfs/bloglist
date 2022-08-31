const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!body.title)
    response.status(400).end()
  if(!body.likes)
    body.likes = 0

  const blog = new Blog(body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)


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

blogsRouter.put('/:id', async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true})
  res.json(updatedBlog)
})

module.exports = blogsRouter