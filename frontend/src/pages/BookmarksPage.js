import React, { useEffect, useState } from 'react';
import { storyService } from '../services/api';
import StoryCard from '../components/StoryCard';
import './BookmarksPage.css';

const BookmarksPage = () => {
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookmarkedStories();
  }, []);

  const fetchBookmarkedStories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await storyService.getBookmarkedStories();
      setBookmarkedStories(response.stories || []);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError('Failed to fetch bookmarked stories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bookmarks-page">
      <div className="page-container">
        <h1>⭐ My Bookmarked Stories</h1>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading bookmarks...</div>
        ) : bookmarkedStories.length > 0 ? (
          <div className="stories-list">
            {bookmarkedStories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                onBookmarkChange={fetchBookmarkedStories}
              />
            ))}
          </div>
        ) : (
          <div className="no-stories">
            <p>You haven't bookmarked any stories yet.</p>
            <p>Start exploring and bookmark your favorite stories!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
