import express from 'express';
import { getPool } from '../config/db.js';

const router = express.Router();

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    const users = rows.map(u => ({
      id: u.id,
      username: u.username,
      passwordHash: u.password_hash,
      password: u.password,
      name: u.name,
      email: u.email,
      role: u.role,
      roleKey: u.role_key,
      companyId: u.company_id,
      department: u.department,
      designation: u.designation,
      avatar: u.avatar,
      activeProjectsCount: u.active_projects_count,
      pendingTasksCount: u.pending_tasks_count,
      completedTasksCount: u.completed_tasks_count,
      status: u.status
    }));
    res.json({ success: true, data: users });
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).json({ success: false, error: 'Database query error' });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const u = req.body;
    const pool = getPool();
    const id = `usr-${Date.now()}`;
    const cleanUser = (u.username || u.email?.split('@')[0] || 'user').trim();
    const cleanPass = (u.password || u.passwordHash || 'Emp@123').trim();

    await pool.query(
      `INSERT INTO users 
      (id, username, password_hash, password, name, email, role, role_key, company_id, department, designation, avatar, active_projects_count, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        cleanUser,
        cleanPass,
        cleanPass,
        u.name || cleanUser,
        u.email || `${cleanUser}@apexgroup.com`,
        u.role || 'Developer',
        u.roleKey || 'developer',
        u.companyId || 'comp-1',
        u.department || 'Engineering',
        u.designation || 'Software Engineer',
        u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        parseInt(u.activeProjectsCount || 0),
        u.status || 'Active'
      ]
    );

    const newUser = {
      id,
      username: cleanUser,
      passwordHash: cleanPass,
      password: cleanPass,
      ...u
    };

    res.json({ success: true, data: newUser });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ success: false, error: 'Failed to create employee account' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const pool = getPool();
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
});

export default router;
