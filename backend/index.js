import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser
import {adminRouter} from './routes/admin-route.js';
// For .env environmental variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(bodyParser.json()); // Use body-parser for JSON parsing
app.use("/api", adminRouter);

const server = app.listen(5000, () => {
    console.log('Server running on port 5000');
});

server.on('error', (err) => {
    console.error('Server failed to start:', err.message);
});