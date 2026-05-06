const Story = require('../models/Story');
const User = require('../models/User');

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ points: -1 });

    res.json({
      message: 'Stories retrieved successfully',
      stories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json({
      message: 'Story retrieved successfully',
      story,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if story exists
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // Get user and toggle bookmark
    const user = await User.findById(userId);

    const isBookmarked = user.bookmarkedStories.includes(id);

    if (isBookmarked) {
      user.bookmarkedStories = user.bookmarkedStories.filter(
        (storyId) => storyId.toString() !== id
      );
    } else {
      user.bookmarkedStories.push(id);
    }

    await user.save();

    res.json({
      message: isBookmarked ? 'Bookmark removed' : 'Story bookmarked',
      bookmarked: !isBookmarked,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookmarkedStories = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('bookmarkedStories');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Bookmarked stories retrieved successfully',
      stories: user.bookmarkedStories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStories,
  getStoryById,
  toggleBookmark,
  getBookmarkedStories,
};
