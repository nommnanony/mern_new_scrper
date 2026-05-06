import React, { useEffect, useState } from 'react';
import { storyService, scraperService } from '../services/api';
import StoryCard from '../components/StoryCard';
import './HomePage.css';

const HomePage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await storyService.getAllStories();
      setStories(response.stories || []);
    } catch (err) {
      console.error('Error fetching stories:', err);
      setError('Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setScraping(true);
    setError(null);

    try {
      await scraperService.scrapeNews();
      await fetchStories();
      alert('Stories updated successfully!');
    } catch (err) {
      console.error('Error scraping news:', err);
      setError('Failed to scrape stories');
    } finally {
      setScraping(false);
    }
  };

  return (
    <div className="home-page">
      <div className="page-container">
        <div className="header">
          <h1>📰 Latest Stories from Hacker News</h1>
          <button
            className="scrape-btn"
            onClick={handleScrape}
            disabled={scraping}
          >
            {scraping ? 'Updating...' : 'Update Stories'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading stories...</div>
        ) : stories.length > 0 ? (
          <div className="stories-list">
            {stories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                onBookmarkChange={fetchStories}
              />
            ))}
          </div>
        ) : (
          <div className="no-stories">
            <p>No stories found. Click "Update Stories" to fetch the latest.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
