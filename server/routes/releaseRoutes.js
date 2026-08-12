import express from 'express';
import { getPool } from '../config/db.js';

const router = express.Router();

// GET /api/releases
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM releases ORDER BY created_at DESC');
    const releases = rows.map(r => ({
      id: r.id,
      appName: r.app_name,
      companyId: r.company_id,
      version: r.version,
      buildNumber: r.build_number,
      platform: r.platform,
      releaseNotes: r.release_notes,
      productionUrl: r.production_url,
      uploadedBy: r.uploaded_by,
      status: r.status,
      releaseDate: r.release_date
    }));
    res.json({ success: true, data: releases });
  } catch (err) {
    console.error('Fetch releases error:', err);
    res.status(500).json({ success: false, error: 'Database query error' });
  }
});

// POST /api/releases
router.post('/', async (req, res) => {
  try {
    const r = req.body;
    const pool = getPool();
    const id = `rel-${Date.now()}`;
    const releaseDate = r.releaseDate || new Date().toISOString().split('T')[0];

    await pool.query(
      `INSERT INTO releases 
      (id, app_name, company_id, version, build_number, platform, release_notes, production_url, uploaded_by, status, release_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        r.appName || 'Enterprise App',
        r.companyId || 'comp-1',
        r.version || 'v1.0.0',
        parseInt(r.buildNumber || 100),
        r.platform || 'Web Application',
        r.releaseNotes || 'Production build deployment',
        r.productionUrl || '',
        r.uploadedBy || 'Super Admin',
        r.status || 'Published',
        releaseDate
      ]
    );

    const newRelease = {
      id,
      ...r,
      releaseDate
    };

    res.json({ success: true, data: newRelease });
  } catch (err) {
    console.error('Create release error:', err);
    res.status(500).json({ success: false, error: 'Failed to create release entry' });
  }
});

// DELETE /api/releases/:id
router.delete('/:id', async (req, res) => {
  try {
    const pool = getPool();
    await pool.query('DELETE FROM releases WHERE id = ?', [req.params.id]);
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    console.error('Delete release error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete release' });
  }
});

export default router;
