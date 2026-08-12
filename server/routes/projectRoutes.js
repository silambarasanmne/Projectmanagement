import express from 'express';
import { getPool } from '../config/db.js';

const router = express.Router();

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    const projects = rows.map(p => ({
      id: p.id,
      name: p.name,
      companyId: p.company_id,
      companyName: p.company_name,
      description: p.description,
      status: p.status,
      progress: p.progress,
      manager: p.manager,
      assignedTesterId: p.assigned_tester_id,
      assignedTesterName: p.assigned_tester_name,
      platform: p.platform,
      testingUrl: p.testing_url,
      releaseUrl: p.release_url,
      version: p.version,
      dueDate: p.due_date,
      lastUpdated: p.last_updated,
      failedReason: p.failed_reason
    }));
    res.json({ success: true, data: projects });
  } catch (err) {
    console.error('Fetch projects error:', err);
    res.status(500).json({ success: false, error: 'Database query error' });
  }
});

// POST /api/projects
router.post('/', async (req, res) => {
  try {
    const p = req.body;
    const pool = getPool();
    const id = `proj-${Date.now()}`;
    const status = p.status || 'Development';
    const progress = parseInt(p.progress || 0);

    await pool.query(
      `INSERT INTO projects 
      (id, name, company_id, company_name, description, status, progress, manager, assigned_tester_id, assigned_tester_name, platform, testing_url, release_url, version, due_date, last_updated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        p.name,
        p.companyId || 'comp-1',
        p.companyName || 'Apex Tech Solutions',
        p.description || '',
        status,
        progress,
        p.manager || 'Super Admin',
        p.assignedTesterId || '',
        p.assignedTesterName || '',
        p.platform || 'Web Application',
        p.testingUrl || '',
        p.releaseUrl || '',
        p.version || 'v1.0.0',
        p.dueDate || null,
        new Date().toISOString().replace('T', ' ').substring(0, 16)
      ]
    );

    const newProject = {
      id,
      ...p,
      status,
      progress
    };

    res.json({ success: true, data: newProject });
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const pool = getPool();

    const setClauses = [];
    const values = [];

    if (updates.name !== undefined) { setClauses.push('name = ?'); values.push(updates.name); }
    if (updates.status !== undefined) { setClauses.push('status = ?'); values.push(updates.status); }
    if (updates.progress !== undefined) { setClauses.push('progress = ?'); values.push(updates.progress); }
    if (updates.assignedTesterId !== undefined) { setClauses.push('assigned_tester_id = ?'); values.push(updates.assignedTesterId); }
    if (updates.assignedTesterName !== undefined) { setClauses.push('assigned_tester_name = ?'); values.push(updates.assignedTesterName); }
    if (updates.testingUrl !== undefined) { setClauses.push('testing_url = ?'); values.push(updates.testingUrl); }
    if (updates.releaseUrl !== undefined) { setClauses.push('release_url = ?'); values.push(updates.releaseUrl); }
    if (updates.version !== undefined) { setClauses.push('version = ?'); values.push(updates.version); }
    if (updates.failedReason !== undefined) { setClauses.push('failed_reason = ?'); values.push(updates.failedReason); }

    setClauses.push('last_updated = ?');
    values.push(new Date().toISOString().replace('T', ' ').substring(0, 16));

    values.push(id);

    await pool.query(`UPDATE projects SET ${setClauses.join(', ')} WHERE id = ?`, values);
    res.json({ success: true, id, updates });
  } catch (err) {
    console.error('Update project error:', err);
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    const pool = getPool();
    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    console.error('Delete project error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
});

export default router;
