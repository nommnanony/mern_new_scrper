import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Services
export const authService = {
  register: async (username, email, password) => {
    const response = await apiClient.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};

// Story Services
export const storyService = {
  getAllStories: async () => {
    const response = await apiClient.get('/stories');
    return response.data;
  },

  getStoryById: async (id) => {
    const response = await apiClient.get(`/stories/${id}`);
    return response.data;
  },

  toggleBookmark: async (id) => {
    const response = await apiClient.post(`/stories/${id}/bookmark`);
    return response.data;
  },

  getBookmarkedStories: async () => {
    const response = await apiClient.get('/stories/bookmarks');
    return response.data;
  },
};

// Scraper Services
export const scraperService = {
  scrapeNews: async () => {
    const response = await apiClient.post('/scrape');
    return response.data;
  },
};

export default apiClient;
