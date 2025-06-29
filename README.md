# QuickLink - URL Shortener

A beautiful, modern URL shortener with a clean interface and powerful backend. Transform long URLs into short, shareable links instantly.

## ✨ Features

- **Simple & Fast**: Paste a URL, get a short link instantly
- **No Authentication**: No signups or logins required
- **Beautiful UI**: Modern design with smooth animations
- **Dark Mode**: Toggle between light and dark themes
- **Mobile Responsive**: Works perfectly on all devices
- **Click Tracking**: Automatic click counting for analytics
- **SQLite Storage**: Reliable database with persistence
- **TypeScript**: Full type safety throughout the application

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd url-shortener
   npm run install:all
   ```

2. **Set up environment (optional):**
   ```bash
   cp .env.example .env
   # Edit .env if you want to change default settings
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

   This starts both the frontend (http://localhost:3000) and backend (http://localhost:3001) concurrently.

### Production Build

```bash
# Build both client and server
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
url-shortener/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── index.html
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── database.ts    # SQLite database logic
│   │   ├── utils.ts       # Utility functions
│   │   └── index.ts       # Express server
│   └── package.json
├── data/                   # SQLite database storage
├── package.json           # Root package with workspaces
└── README.md
```

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **SQLite3** - Lightweight database
- **nanoid** - URL-safe ID generation
- **CORS** - Cross-origin resource sharing

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001
BASE_URL=http://localhost:3001

# Database
DB_PATH=./data/urls.db

# Development
NODE_ENV=development
```

### Database

The application uses SQLite for data persistence. The database file is automatically created in the `data/` directory when you first run the server.

**Database Schema:**
```sql
CREATE TABLE urls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shortCode TEXT UNIQUE NOT NULL,
  originalUrl TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 📚 API Documentation

### POST /api/shorten
Shorten a URL

**Request:**
```json
{
  "url": "https://example.com/very-long-url"
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:3001/abc123",
  "originalUrl": "https://example.com/very-long-url"
}
```

### GET /:code
Redirect to original URL

**Response:** 301 redirect to the original URL

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-09T12:34:56.789Z"
}
```

## 🎨 Design Features

- **Gradient backgrounds** with subtle animations
- **Glass morphism** effects for modern UI
- **Smooth transitions** powered by Framer Motion
- **Responsive design** from mobile to desktop
- **Dark mode support** with system preference detection
- **Toast notifications** for user feedback
- **Micro-interactions** on buttons and inputs

## 🚢 Deployment

### Netlify (Frontend + Serverless Functions)
1. Build the client: `npm run build:client`
2. Deploy the `client/dist` folder to Netlify
3. Use Netlify Functions for the API

### Vercel
1. Deploy the entire project to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `client/dist`

### Traditional Hosting
1. Build the project: `npm run build`
2. Upload to your server
3. Run: `npm start`
4. Configure reverse proxy (nginx/Apache) if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔮 Future Enhancements

- [ ] Custom short codes
- [ ] URL expiration dates
- [ ] Analytics dashboard
- [ ] QR code generation
- [ ] Bulk URL shortening
- [ ] API rate limiting
- [ ] User accounts (optional)

---

**QuickLink** - Simple, fast, beautiful URL shortening ⚡# QuickLink-URL-Shortener # QuickLink-URL-Shortener
