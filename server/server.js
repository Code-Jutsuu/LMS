import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';

import dotenv from "dotenv";
import { clerkWebhook } from './controllers/webbooks.js';
dotenv.config();

//Initialize express
const app = express();

// connect to database
await connectDB();

//middleware
app.use(cors());
app.use(express.json());
 
//Routes
app.get('/', (req, res) => {
    res.send('API Working...');
});

app.post('/clerk', express.json(), clerkWebhook);

//Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;