# MERN News App - Full Stack Application

A complete MERN stack application that scrapes top stories from Hacker News, stores them in MongoDB, and provides a React frontend with user authentication and bookmark functionality.

## 🚀 Features

### Backend Features
- **Web Scraper**: Automatically scrapes top 10 stories from Hacker News on server start
- **JWT Authentication**: Secure user registration and login
- **RESTful API**: Complete story management endpoints
- **Bookmark System**: Save and manage favorite stories
- **MongoDB Integration**: Persistent data storage

### Frontend Features
- **User Authentication**: Register and login system with Context API
- **Story Display**: Browse all scraped stories sorted by points
- **Bookmark Management**: Toggle bookmarks on stories
- **Protected Routes**: Bookmarks page accessible only to logged-in users
- **Responsive Design**: Mobile-friendly interface with Hacker News-inspired styling

## 📋 Project Structure

```
mern-news-app/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema with bookmarks
│   │   └── Story.js         # Story schema
│   ├── controllers/
│   │   ├── authController.js   # Register & login logic
│   │   └── storyController.js  # Story and bookmark logic
│   ├── routes/
│   │   ├── authRoutes.js    # Auth endpoints
│   │   ├── storyRoutes.js   # Story endpoints
│   │   └── scrapeRoutes.js  # Scraper trigger endpoint
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── scrapers/
│   │   └── hackerNews.js    # Web scraper for Hacker News
│   ├── server.js            # Express server entry point
│   ├── package.json
│   ├── .env                 # Environment variables
│   └── .env.example         # Example env file
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   └── BookmarksPage.js
│   │   ├── components/
│   │   │   ├── Navigation.js
│   │   │   ├── StoryCard.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js       # API client
│   │   ├── App.js           # Main app component
│   │   └── index.js         # React entry point
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── .env
│   └── .env.example
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your settings:
   ```
   MONGODB_URI=mongodb://localhost:27017/mern-news-app
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   HACKER_NEWS_URL=https://news.ycombinator.com
   ```

4. **Start the backend server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   The server will start on `http://localhost:5000` and automatically scrape Hacker News.

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   The `.env` file should contain:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the React development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## 🔗 API Endpoints

### Authentication Endpoints
- **POST** `/api/auth/register`
  - Register a new user
  - Body: `{ username, email, password }`
  - Returns: `{ token, user }`

- **POST** `/api/auth/login`
  - Login user
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

### Story Endpoints
- **GET** `/api/stories`
  - Get all stories (sorted by points)
  - Returns: `{ stories }`

- **GET** `/api/stories/:id`
  - Get a single story by ID
  - Returns: `{ story }`

- **POST** `/api/stories/:id/bookmark`
  - Toggle bookmark (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ bookmarked, message }`

- **GET** `/api/stories/bookmarks`
  - Get user's bookmarked stories (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ stories }`

### Scraper Endpoint
- **POST** `/api/scrape`
  - Trigger manual scraping of Hacker News
  - Returns: `{ message, count, stories }`

### Health Check
- **GET** `/api/health`
  - Check server status
  - Returns: `{ status }`

## 🧪 Testing the Application

### 1. Start MongoDB
```bash
# Make sure MongoDB is running locally
mongod
```

### 2. Start Backend
```bash
cd backend
npm install
npm start
```

### 3. Start Frontend (in another terminal)
```bash
cd frontend
npm install
npm start
```

### 4. Test Workflow
1. Open `http://localhost:3000`
2. Click **Register** and create an account
3. Login with your credentials
4. View stories on the homepage (automatically scraped on start)
5. Click **Update Stories** to manually trigger a new scrape
6. Bookmark stories by clicking the star (⭐) icon
7. Visit **Bookmarks** page to see your saved stories
8. Click story titles or **Visit Story** button to view on Hacker News

## 📦 Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **axios**: HTTP client for scraping
- **cheerio**: HTML parsing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

### Frontend
- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **react-scripts**: Build tools

## 🔐 Security Features
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes on frontend
- Environment variables for secrets
- CORS configuration

## 📱 Responsive Design
- Mobile-friendly navigation
- Responsive story cards
- Mobile-optimized forms
- Touch-friendly buttons

## 🎨 Styling
- Hacker News-inspired color scheme (orange #ff6600)
- Clean, minimal UI
- CSS modules for component styling
- Hover effects and transitions

## 🚀 Deployment Considerations

### Backend (Vercel/Heroku)
1. Update `MONGODB_URI` to MongoDB Atlas
2. Set secure `JWT_SECRET`
3. Update CORS origins
4. Deploy with `npm start`

### Frontend (Vercel/Netlify)
1. Update `REACT_APP_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy from `build` directory

## 📝 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Stories
```bash
curl http://localhost:5000/api/stories
```

### Bookmark a Story
```bash
curl -X POST http://localhost:5000/api/stories/:id/bookmark \
  -H "Authorization: Bearer <token>"
```

## 📚 Learning Resources

This project demonstrates:
- Full-stack MERN development
- RESTful API design
- JWT authentication
- MongoDB data modeling
- React Context API
- React Router
- Web scraping
- Error handling
- Clean code practices

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For Atlas: verify IP whitelist and credentials

### CORS Issues
- Backend CORS is configured for `*` (localhost)
- Update in production for security

### Scraper Timeout
- Check internet connection
- Verify Hacker News is accessible
- Increase timeout in `hackerNews.js`

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: `PORT=3001 npm start`

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Assignment Completion Checklist

✅ Web Scraper
- Scrapes top 10 stories from Hacker News
- Extracts: Title, URL, Points, Author, Posted Time
- Saves to MongoDB
- Runs on server start
- Triggerable via POST /api/scrape

✅ Backend (Node.js + Express)
- JWT authentication (register/login)
- Story APIs (GET all, GET by ID)
- Bookmark toggle endpoint
- Clean folder structure
- Environment variables configured

✅ Frontend (React)
- Story list display with metadata
- Authentication pages (login/register)
- Bookmark functionality
- Protected bookmarks page
- Context API for state management
- Responsive design

✅ Code Quality
- No hardcoded values
- No unused code
- Clean, readable code
- Scalable structure
- Proper error handling
