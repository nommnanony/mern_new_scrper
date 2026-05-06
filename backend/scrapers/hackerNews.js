const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const HACKER_NEWS_URL = process.env.HACKER_NEWS_URL || 'https://news.ycombinator.com';

const scrapeHackerNews = async () => {
  try {
    console.log('Starting Hacker News scrape...');
    
    const response = await axios.get(HACKER_NEWS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    const stories = [];
    let storyCount = 0;

    // Parse story rows
    const rows = $('tr.athing');
    
    rows.each((index, element) => {
      if (storyCount >= 10) return;

      try {
        const titleElement = $(element).find('span.titleline > a').first();
        const title = titleElement.text().trim();
        const url = titleElement.attr('href') || '';

        if (!title || !url) return;

        // Get story ID from data-id attribute for Hacker News integration
        const hackerNewsId = $(element).attr('data-id');

        // Get metadata (points, author, posted time) from next row
        const metaRow = $(element).next('tr');
        const metaText = metaRow.find('span.subtext').text().trim();

        // Parse metadata string
        const pointsMatch = metaText.match(/(\d+)\s+points?/);
        const points = pointsMatch ? parseInt(pointsMatch[1]) : 0;

        const byMatch = metaText.match(/\bby\s+(\w+)/);
        const author = byMatch ? byMatch[1] : 'Unknown';

        const timeMatch = metaText.match(/(\d+\s+\w+\s+ago)/);
        const postedAt = timeMatch ? timeMatch[1] : 'Unknown time';

        stories.push({
          title,
          url,
          points,
          author,
          postedAt,
          hackerNewsId,
        });

        storyCount++;
      } catch (err) {
        console.error('Error parsing story:', err.message);
      }
    });

    // Save stories to database
    if (stories.length > 0) {
      // Clear existing stories
      await Story.deleteMany({});

      // Insert new stories
      const savedStories = await Story.insertMany(stories);
      console.log(`Successfully scraped and saved ${savedStories.length} stories`);
    }

    return stories;
  } catch (error) {
    console.error('Error scraping Hacker News:', error.message);
    throw error;
  }
};

module.exports = {
  scrapeHackerNews,
};
