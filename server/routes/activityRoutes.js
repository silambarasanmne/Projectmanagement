import express from 'express';
import { getPool } from '../config/db.js';

const router = express.Router();

// GET /api/activities
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM activities ORDER BY created_at DESC LIMIT 50');
    const activities = rows.map(a => ({
      id: a.id,
      user: a.user,
      userAvatar: a.user_avatar,
      action: a.action,
      module: a.module,
      time: a.time,
      company: a.company
    }));
    res.json({ success: true, data: activities });
  } catch (err) {
    console.error('Fetch activities error:', err);
    res.status(500).json({ success: false, error: 'Database query error' });
  }
});

// POST /api/activities
router.post('/', async (req, res) => {
  try {
    const { user, userAvatar, action, module, company } = req.body;
    const pool = getPool();
    const id = `act-${Date.now()}`;

    await pool.query(
      `INSERT INTO activities (id, user, user_avatar, action, module, time, company) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        user || 'System Admin',
        userAvatar || '',
        action,
        module || 'Governance Audit',
        'Just now',
        company || 'Apex Tech Solutions'
      ]
    );

    res.json({ success: true, id });
  } catch (err) {
    console.error('Create activity error:', err);
    res.status(500).json({ success: false, error: 'Failed to record activity' });
  }
});

export default router;
