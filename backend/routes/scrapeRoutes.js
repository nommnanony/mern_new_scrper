const express = require('express');
const { scrapeHackerNews } = require('../scrapers/hackerNews');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const stories = await scrapeHackerNews();
    res.json({
      message: 'Scraping completed successfully',
      count: stories.length,
      stories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
