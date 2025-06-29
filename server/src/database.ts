import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

export interface UrlRecord {
  id: number;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
}

export class UrlDatabase {
  private db: sqlite3.Database;

  constructor() {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dbPath = path.join(dataDir, 'urls.db');
    this.db = new sqlite3.Database(dbPath);
    this.init();
  }

  private init(): void {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS urls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        shortCode TEXT UNIQUE NOT NULL,
        originalUrl TEXT NOT NULL,
        clicks INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Database table initialized');
      }
    });

    // Create index for better performance
    const createIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_shortCode ON urls(shortCode)
    `;

    this.db.run(createIndexQuery);
  }

  async create(shortCode: string, originalUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO urls (shortCode, originalUrl) VALUES (?, ?)';
      this.db.run(query, [shortCode, originalUrl], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async getByShortCode(shortCode: string): Promise<UrlRecord | null> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM urls WHERE shortCode = ?';
      this.db.get(query, [shortCode], (err, row: UrlRecord) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
      });
    });
  }

  async getByOriginalUrl(originalUrl: string): Promise<UrlRecord | null> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM urls WHERE originalUrl = ?';
      this.db.get(query, [originalUrl], (err, row: UrlRecord) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
      });
    });
  }

  async incrementClicks(shortCode: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE urls SET clicks = clicks + 1 WHERE shortCode = ?';
      this.db.run(query, [shortCode], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async getAllUrls(): Promise<UrlRecord[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM urls ORDER BY createdAt DESC';
      this.db.all(query, [], (err, rows: UrlRecord[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  close(): void {
    this.db.close();
  }
}