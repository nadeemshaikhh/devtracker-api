const Topic = require('../models/Topic')
const fetch = require('node-fetch')

exports.getAllTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find()
    res.json(topics)
  } catch (err) {
    next(err)
  }
}

exports.getSummary = async (req, res, next) => {
  try {
    const total = await Topic.countDocuments()
    const done = await Topic.countDocuments({ done: true })
    const pending = total - done
    res.json({ total, done, pending })
  } catch (err) {
    next(err)
  }
}

exports.getTopicById = async (req, res, next) => {
  try {
    const topic = await Topic.findById(req.params.id)
    if (!topic) return res.status(404).json({ error: 'Topic not found' })
    res.json(topic)
  } catch (err) {
    next(err)
  }
}

exports.createTopic = async (req, res, next) => {
  try {
    const topic = new Topic(req.body)
    await topic.save()
    res.status(201).json(topic)
  } catch (err) {
    next(err)
  }
}

exports.updateTopic = async (req, res, next) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!topic) return res.status(404).json({ error: 'Topic not found' })
    res.json(topic)
  } catch (err) {
    next(err)
  }
}

exports.deleteTopic = async (req, res, next) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id)
    if (!topic) return res.status(404).json({ error: 'Topic not found' })
    res.json({ message: 'Topic deleted' })
  } catch (err) {
    next(err)
  }
}

exports.getStudyTip = async (req, res, next) => {
  try {
    const topic = await Topic.findById(req.params.id)
    if (!topic) return res.status(404).json({ error: 'Topic not found' })

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: `Give me 3 practical tips to learn "${topic.name}" as a beginner developer. Keep it under 100 words.`,
        stream: false
      })
    })

    const data = await response.json()
    res.json({ topic: topic.name, tips: data.response })

  } catch (err) {
    next(err)
  }
}