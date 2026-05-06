const express = require('express');
const {
  getAllStories,
  getStoryById,
  toggleBookmark,
  getBookmarkedStories,
} = require('../controllers/storyController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllStories);
router.get('/bookmarks', authenticate, getBookmarkedStories);
router.get('/:id', getStoryById);
router.post('/:id/bookmark', authenticate, toggleBookmark);

module.exports = router;
