import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import { clerkWebhook } from './controllers/webbooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './config/cloudinary.js';


//Initialize express
const app = express();

// connect to database
await connectDB();
await connectCloudinary();
 
//Routes
app.get('/', (req, res) => {
    res.send('API Working...');
});

app.post('/clerk', express.json(), clerkWebhook);
app.use('/api/educator', express.json(), educatorRouter)

//middleware
app.use(cors());
app.use(clerkMiddleware());

//Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;