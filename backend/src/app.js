import express from "express"
import cors from "cors";
import morgan  from "morgan";
import authRoutes from "./routes/authRoutes.js"
import errorHandler from './middleware/errorHandler.js'

const app = express();

app.use(cors({origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use(errorHandler);


export default app;