import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/jobs', authenticateToken, (req, res) => {
  const user = req.user;
  res.json({ message: 'You have accessed the job' });
});

export default router;
