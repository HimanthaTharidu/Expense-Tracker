import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';
import Expense from '../src/models/Expense.js';
import Budget from '../src/models/Budget.js';

const DEMO_USER = {
  name: 'test user',
  email: 'test@gmail.com',
  password: 'pwd456',
};
const MONTHS = 6;          // how many months of history, including the current one
const PER_MONTH = [18, 30]; // min/max expenses per month

// Must match the category values allowed by your Expense schema
const CATEGORIES = {
  Food:          { min: 5,   max: 60,   notes: ['Lunch', 'Groceries', 'Dinner out', 'Coffee', 'Snacks'] },
  Transport:     { min: 3,   max: 40,   notes: ['Bus fare', 'Fuel', 'Taxi', 'Train ticket'] },
  Bills:         { min: 20,  max: 150,  notes: ['Electricity', 'Water', 'Internet', 'Phone bill'] },
  Shopping:      { min: 15,  max: 200,  notes: ['Clothes', 'Shoes', 'Online order', 'Gift'] },
  Entertainment: { min: 8,   max: 80,   notes: ['Movie', 'Games', 'Concert', 'Streaming'] },
  Health:        { min: 10,  max: 120,  notes: ['Pharmacy', 'Doctor visit', 'Vitamins'] },
  Education:     { min: 10,  max: 150,  notes: ['Books', 'Course fee', 'Stationery'] },
};

// ---- Helpers ----
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const round2 = (n) => Math.round(n * 100) / 100;

const monthKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

function buildExpenses(userId) {
  const now = new Date();
  const expenses = [];
  const totals = {}; // month -> total, used to set realistic budgets

  for (let i = MONTHS - 1; i >= 0; i--) {
    const first = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = monthKey(first);
    const isCurrent = i === 0;
    // Current month: only generate up to today
    const lastDay = isCurrent
      ? now.getDate()
      : new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();

    const count = randInt(PER_MONTH[0], PER_MONTH[1]);
    totals[key] = 0;

    for (let n = 0; n < count; n++) {
      const category = pick(Object.keys(CATEGORIES));
      const cfg = CATEGORIES[category];
      const amount = round2(rand(cfg.min, cfg.max));
      const date = new Date(
        first.getFullYear(),
        first.getMonth(),
        randInt(1, lastDay),
        randInt(8, 21),
        randInt(0, 59)
      );

      expenses.push({ userId, amount, category, date, note: pick(cfg.notes) });
      totals[key] += amount;
    }
  }
  return { expenses, totals };
}

// ---- Main ----
async function seed() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set in .env');
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // 1. Find or create the demo user
  let user = await User.findOne({ email: DEMO_USER.email });
  if (!user) {
    const hashPassword = await bcrypt.hash(DEMO_USER.password, 10);
    user = await User.create({
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      hashPassword,
    });
    console.log(`Created user ${DEMO_USER.email} (password: ${DEMO_USER.password})`);
  } else {
    console.log(`Using existing user ${DEMO_USER.email}`);
  }

  // 2. Clear this user's old expenses and budgets only (other users untouched)
  const delExp = await Expense.deleteMany({ userId: user._id });
  const delBud = await Budget.deleteMany({ userId: user._id });
  console.log(`Removed ${delExp.deletedCount} expenses, ${delBud.deletedCount} budgets`);

  // 3. Insert expenses
  const { expenses, totals } = buildExpenses(user._id);
  await Expense.insertMany(expenses);
  console.log(`Inserted ${expenses.length} expenses`);

  // 4. Insert a budget per month, a bit above or below actual spending
  const budgets = Object.entries(totals).map(([month, total]) => ({
    userId: user._id,
    month,
    amount: Math.round(total * rand(0.85, 1.25) / 50) * 50, // rounded to nearest 50
  }));
  await Budget.insertMany(budgets);
  console.log(`Inserted ${budgets.length} budgets`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch(async (err) => {
  console.error('Seed failed:', err.message);
  await mongoose.disconnect();
  process.exit(1);
});