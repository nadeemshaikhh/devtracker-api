const validateTopic = (req, res, next) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: 'Name is required' })
  }

  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Name must be a string' })
  }

  if (name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters' })
  }

  next()
}

module.exports = validateTopic