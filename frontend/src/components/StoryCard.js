import React, { useState } from 'react';
import { storyService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './StoryCard.css';

const StoryCard = ({ story, onBookmarkChange }) => {
  const { isAuthenticated } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBookmarkToggle = async () => {
    if (!isAuthenticated) {
      alert('Please log in to bookmark stories');
      return;
    }

    setLoading(true);
    try {
      const result = await storyService.toggleBookmark(story._id);
      setIsBookmarked(result.bookmarked);
      if (onBookmarkChange) {
        onBookmarkChange();
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      alert('Failed to toggle bookmark');
    } finally {
      setLoading(false);
    }
  };

  const openStory = () => {
    if (story.url) {
      window.open(story.url, '_blank');
    }
  };

  return (
    <div className="story-card">
      <div className="story-header">
        <h3 className="story-title">{story.title}</h3>
        <button
          className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={handleBookmarkToggle}
          disabled={loading}
          title={isAuthenticated ? 'Toggle bookmark' : 'Please log in'}
        >
          {isBookmarked ? '★' : '☆'}
        </button>
      </div>

      <div className="story-meta">
        <span className="points">⬆ {story.points} points</span>
        <span className="author">by {story.author}</span>
        <span className="time">{story.postedAt}</span>
      </div>

      <button className="visit-btn" onClick={openStory}>
        Visit Story →
      </button>
    </div>
  );
};

export default StoryCard;
