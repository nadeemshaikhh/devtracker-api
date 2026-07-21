require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const topicRoutes = require('./routes/topicRoutes')
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(express.json())
app.use(logger)

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection error:', err))

app.use('/topics', topicRoutes)

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})