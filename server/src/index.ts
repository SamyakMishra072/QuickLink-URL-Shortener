import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { UrlDatabase } from './database.js';
import { validateUrl, generateShortCode } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Initialize database
const db = new UrlDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));

// API Routes
app.post('/api/shorten', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!validateUrl(url)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Check if URL already exists
    const existing = await db.getByOriginalUrl(url);
    if (existing) {
      return res.json({
        shortUrl: `${BASE_URL}/${existing.shortCode}`,
        originalUrl: url,
      });
    }

    // Generate unique short code
    let shortCode: string;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      shortCode = generateShortCode();
      attempts++;
    } while (await db.getByShortCode(shortCode) && attempts < maxAttempts);

    if (attempts >= maxAttempts) {
      return res.status(500).json({ error: 'Failed to generate unique short code' });
    }

    // Save to database
    await db.create(shortCode, url);

    res.json({
      shortUrl: `${BASE_URL}/${shortCode}`,
      originalUrl: url,
    });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Redirect route
app.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;

    if (!code || code.length !== 6) {
      return res.status(404).json({ error: 'Short code not found' });
    }

    const urlData = await db.getByShortCode(code);

    if (!urlData) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Update click count
    await db.incrementClicks(code);

    // Redirect with 301 (permanent redirect)
    res.redirect(301, urlData.originalUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Catch-all handler for SPA
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }

  // Skip short code routes (they should be handled above)
  if (req.path.length === 7 && req.path.startsWith('/')) {
    return res.status(404).json({ error: 'Short code not found' });
  }

  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database initialized`);
});
