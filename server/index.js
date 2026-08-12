import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import appRoutes from './routes/appRoutes.js';
import releaseRoutes from './routes/releaseRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import userRoutes from './routes/userRoutes.js';
import activityRoutes from './routes/activityRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/applications', appRoutes);
app.use('/api/releases', releaseRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), database: 'MySQL' });
});

// Serve frontend static build files in live production
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // Single-Page Application (SPA) catch-all fallback
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
} else {
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Enterprise Group PM Suite API</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background: #0B0F19; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
          .card { background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; padding: 40px; border-radius: 24px; max-width: 480px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
          h1 { color: #818cf8; margin-top: 0; font-size: 24px; }
          code { background: #0f172a; color: #38bdf8; padding: 4px 8px; border-radius: 6px; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>⚡ Enterprise Group PM Suite API</h1>
          <p>Backend API server is live and running with MySQL connectivity.</p>
          <p>Base API URL: <code>/api</code></p>
          <p style="font-size: 13px; color: #94a3b8;">Run <code>npm run build</code> to serve the React UI at root <code>/</code>.</p>
        </div>
      </body>
      </html>
    `);
  });
}

// Start Express Server & initialize MySQL schema
const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Enterprise Group PM Suite Backend API running on http://0.0.0.0:${PORT}`);
    console.log(`🔗 API Base Endpoint: http://localhost:${PORT}/api`);
  });
};

startServer();
