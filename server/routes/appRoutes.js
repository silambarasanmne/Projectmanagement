import express from 'express';
import { getPool } from '../config/db.js';

const router = express.Router();

// GET /api/applications
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
    const apps = rows.map(a => ({
      id: a.id,
      name: a.name,
      type: a.type,
      companyId: a.company_id,
      companyName: a.company_name,
      version: a.version,
      platform: a.platform,
      technology: a.technology,
      productionUrl: a.production_url,
      developer: a.developer,
      status: a.status
    }));
    res.json({ success: true, data: apps });
  } catch (err) {
    console.error('Fetch applications error:', err);
    res.status(500).json({ success: false, error: 'Database query error' });
  }
});

// POST /api/applications
router.post('/', async (req, res) => {
  try {
    const a = req.body;
    const pool = getPool();
    const id = `app-${Date.now()}`;

    await pool.query(
      `INSERT INTO applications 
      (id, name, type, company_id, company_name, version, platform, technology, production_url, developer, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        a.name,
        a.type || 'Web Portal',
        a.companyId || 'comp-1',
        a.companyName || 'Apex Tech Solutions',
        a.version || 'v1.0.0',
        a.platform || 'Web Application',
        a.technology || 'React 19 + Node.js',
        a.productionUrl || '',
        a.developer || 'Super Admin',
        a.status || 'Active'
      ]
    );

    const newApp = {
      id,
      ...a
    };

    res.json({ success: true, data: newApp });
  } catch (err) {
    console.error('Create app error:', err);
    res.status(500).json({ success: false, error: 'Failed to create application entry' });
  }
});

export default router;
