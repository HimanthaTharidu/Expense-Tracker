import express from 'express'
import { getExpenses, getExpenseSummary, getExpenseTrend, createExpense, deleteExpense, updateExpense  } from '../controllers/expenseController.js'
import { body } from 'express-validator'
import auth from '../middleware/auth.js'
const router = express.Router();

router.use(auth);

router.get('/summary', getExpenseSummary);
router.get('/trend', getExpenseTrend);

router.route('/')
  .get(getExpenses)
  .post(
    [
      body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
      body('category').isIn(['Food', 'Transport', 'Bills', 'Shopping', 'Health', 'Other']).withMessage('Invalid category'),
      body('date').optional().isISO8601().withMessage('Valid date required'),
      body('note').optional().isString().isLength({ max: 200 }).withMessage('Note must be less than 200 characters')
    ],
    createExpense
  );

router.route('/:id')
  .put(
    [
      body('amount').optional().isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
      body('category').optional().isIn(['Food', 'Transport', 'Bills', 'Shopping', 'Health', 'Other']).withMessage('Invalid category'),
      body('date').optional().isISO8601().withMessage('Valid date required'),
      body('note').optional().isString().isLength({ max: 200 }).withMessage('Note must be less than 200 characters')
    ],
    updateExpense
  )
  .delete(deleteExpense);


export default router
