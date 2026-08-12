import express from 'express';
import { getPool } from '../config/db.js';

const router = express.Router();

// GET /api/companies
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM companies ORDER BY created_at ASC');
    const companies = rows.map(c => ({
      id: c.id,
      name: c.name,
      code: c.code,
      tagline: c.tagline,
      logo: c.logo,
      teamSize: c.team_size,
      activeApps: c.active_apps,
      projectsCount: c.projects_count,
      departments: typeof c.departments === 'string' ? JSON.parse(c.departments) : (c.departments || [])
    }));
    res.json({ success: true, data: companies });
  } catch (err) {
    console.error('Fetch companies error:', err);
    res.status(500).json({ success: false, error: 'Database query error' });
  }
});

// POST /api/companies
router.post('/', async (req, res) => {
  try {
    const { name, code, tagline, logo, departments } = req.body;
    const pool = getPool();
    const id = `comp-${Date.now()}`;
    const deptJson = JSON.stringify(departments || ['Engineering']);

    await pool.query(
      `INSERT INTO companies (id, name, code, tagline, logo, departments) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, code, tagline || '', logo || '🏢', deptJson]
    );

    const newCompany = {
      id,
      name,
      code,
      tagline: tagline || '',
      logo: logo || '🏢',
      teamSize: 0,
      activeApps: 0,
      projectsCount: 0,
      departments: departments || ['Engineering']
    };

    res.json({ success: true, data: newCompany });
  } catch (err) {
    console.error('Create company error:', err);
    res.status(500).json({ success: false, error: 'Failed to create company' });
  }
});

// DELETE /api/companies/:id
router.delete('/:id', async (req, res) => {
  try {
    const pool = getPool();
    await pool.query('DELETE FROM companies WHERE id = ?', [req.params.id]);
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    console.error('Delete company error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete company' });
  }
});

export default router;
