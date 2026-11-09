import express from 'express';
import { body } from 'express-validator';
import { getBudget, upsertBudget } from '../controllers/budgetController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.route('/')
  .get(getBudget)
  .put(
    [
      body('month').matches(/^\d{4}-\d{2}$/).withMessage('Valid month required (YYYY-MM)'),
      body('amount').isFloat({ min: 0 }).withMessage('Amount must be at least 0')
    ],
    upsertBudget
  );

export default router;
