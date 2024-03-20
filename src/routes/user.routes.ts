import express from 'express';
import { Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/jobs', authenticateToken, (req: Request, res: Response) => {
  const user = req.user;
  res.json({ message: 'You have accessed the job' });
});

export default router;
