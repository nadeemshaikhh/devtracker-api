const express = require('express')
const router = express.Router()
const {
  getAllTopics,
  getSummary,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
  getStudyTip
} = require('../controllers/topicController')
const validateTopic = require('../middleware/validateTopic')

router.get('/', getAllTopics)
router.get('/summary', getSummary)
router.get('/:id/study-tip', getStudyTip)
router.get('/:id', getTopicById)
router.post('/', validateTopic, createTopic)
router.put('/:id', updateTopic)
router.delete('/:id', deleteTopic)

module.exports = router