import express from 'express';
import { getPool } from '../config/db.js';

const router = express.Router();

// GET /api/issues
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM issues ORDER BY created_at DESC');
    const issues = rows.map(i => ({
      id: i.id,
      title: i.title,
      description: i.description,
      severity: i.severity,
      status: i.status,
      projectId: i.project_id,
      projectName: i.project_name,
      reportedBy: i.reported_by,
      assignedTo: i.assigned_to,
      createdDate: i.created_date
    }));
    res.json({ success: true, data: issues });
  } catch (err) {
    console.error('Fetch issues error:', err);
    res.status(500).json({ success: false, error: 'Database query error' });
  }
});

// POST /api/issues
router.post('/', async (req, res) => {
  try {
    const issue = req.body;
    const pool = getPool();
    const id = `ISS-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdDate = new Date().toISOString().split('T')[0];

    await pool.query(
      `INSERT INTO issues 
      (id, title, description, severity, status, project_id, project_name, reported_by, assigned_to, created_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        issue.title,
        issue.description || '',
        issue.severity || 'Medium',
        issue.status || 'Open',
        issue.projectId || '',
        issue.projectName || '',
        issue.reportedBy || 'Super Admin',
        issue.assignedTo || 'Lead QA Engineer',
        createdDate
      ]
    );

    const newIssue = {
      id,
      ...issue,
      createdDate
    };

    res.json({ success: true, data: newIssue });
  } catch (err) {
    console.error('Create issue error:', err);
    res.status(500).json({ success: false, error: 'Failed to create issue' });
  }
});

// PUT /api/issues/:id
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const pool = getPool();
    await pool.query('UPDATE issues SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, id: req.params.id, status });
  } catch (err) {
    console.error('Update issue error:', err);
    res.status(500).json({ success: false, error: 'Failed to update issue' });
  }
});

// DELETE /api/issues/:id
router.delete('/:id', async (req, res) => {
  try {
    const pool = getPool();
    await pool.query('DELETE FROM issues WHERE id = ?', [req.params.id]);
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    console.error('Delete issue error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete issue' });
  }
});

export default router;
