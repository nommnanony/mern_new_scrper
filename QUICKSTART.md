# 🚀 Quick Start Guide

Get the MERN News App up and running in 5 minutes!

## Prerequisites
- Node.js installed (https://nodejs.org/)
- MongoDB running locally (https://docs.mongodb.com/manual/installation/)
- Git (optional)

## Step 1: Clone or Extract Project
```bash
# Navigate to the project directory
cd mern-news-app
```

## Step 2: Backend Setup (Terminal 1)
```bash
cd backend
npm install
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
Starting Hacker News scrape...
Successfully scraped and saved 10 stories
```

## Step 3: Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
npm start
```

The browser will automatically open to `http://localhost:3000`

## Step 4: Test the Application

### Register a new account
1. Click **Register** in the top right
2. Fill in username, email, and password
3. Click **Register** button

### Login
1. Use your credentials to login
2. You'll be redirected to the home page

### Browse Stories
1. See top 10 stories from Hacker News
2. Each story shows: Title, Points, Author, Posted Time
3. Click **Visit Story →** to open on Hacker News

### Bookmark Stories
1. Click the star (⭐) icon on any story
2. Bookmarks are saved to your profile

### View Bookmarks
1. Click **Bookmarks** link in navigation (appears when logged in)
2. See all your saved stories

### Update Stories
1. Click **Update Stories** button to manually scrape latest news
2. Stories are automatically sorted by points (highest first)

## 🎯 Default Credentials
**Feel free to create your own account!**

## 📁 Project Layout
```
backend/
  ├── server.js              # Main server file
  ├── package.json           # Backend dependencies
  ├── .env                   # Configuration (pre-filled)
  ├── models/                # Database schemas
  ├── controllers/           # Business logic
  ├── routes/                # API endpoints
  ├── middleware/            # Auth middleware
  └── scrapers/              # Hacker News scraper

frontend/
  ├── public/
  │   └── index.html         # HTML template
  ├── src/
  │   ├── index.js           # React entry point
  │   ├── App.js             # Main component
  │   ├── pages/             # Page components
  │   ├── components/        # Reusable components
  │   ├── context/           # Auth context
  │   └── services/          # API client
  ├── package.json           # Frontend dependencies
  └── .env                   # Configuration
```

## 🆘 Troubleshooting

### Backend won't start
**Problem:** "Error: connect ECONNREFUSED 127.0.0.1:27017"
- **Solution:** Start MongoDB: `mongod` (in another terminal)

### Port 5000 already in use
- **Solution:** Change PORT in `backend/.env`

### Port 3000 already in use
- **Solution:** `PORT=3001 npm start` in frontend directory

### Can't fetch stories
- **Solution:** Check that backend is running on `http://localhost:5000`
- **Solution:** Check `.env` files are configured correctly

### MongoDB authentication error
- **Solution:** Ensure MongoDB is running without authentication or update credentials

## 📝 API Testing (Optional)

### Using curl to test API
```bash
# Get all stories
curl http://localhost:5000/api/stories

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

## 🎓 What You'll Learn

- **Backend Development**: Express.js, MongoDB, JWT Authentication
- **Frontend Development**: React, React Router, Context API
- **Web Scraping**: Cheerio, Axios for data collection
- **Full-Stack Integration**: API consumption and state management
- **Database Design**: MongoDB schemas and relationships
- **Security**: Password hashing, token-based authentication

## 📚 Next Steps

1. Explore the code in `/backend/server.js`
2. Check API responses in browser console (F12)
3. Try modifying the UI in `/frontend/src/components/`
4. Add new features (filters, sorting, comments, etc.)

## 💡 Tips

- Use browser DevTools (F12) to debug frontend
- Check terminal console for backend logs
- Bookmarks persist in database between sessions
- Stories are cleared and rescraped on each manual scrape

## 🎉 You're All Set!

Enjoy exploring Hacker News stories with your MERN app!

For more details, see [README.md](./README.md)
