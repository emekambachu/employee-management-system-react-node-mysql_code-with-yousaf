import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN || 'http://localhost:5173';
const APP_API = process.env.APP_API || 'http://localhost:5000/api';

app.use(cors({
    origin: [ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));

// Routes
app.use('/api', adminRoutes);

const server = app.listen(PORT, () => {
    console.log(
        `Server running on PORT: ${PORT}, Origin: ${ORIGIN}, APP_API_URL: ${APP_API}`
    );
});

server.on('error', (err) => {
    console.error('Server failed to start:', err.message);
});
