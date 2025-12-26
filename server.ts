import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Import handlers
import registerHandler from './api/auth/register';
import loginHandler from './api/auth/login';
import productHandler from './api/products/index';
import cartHandler from './api/cart/calculate';
import subscriptionHandler from './api/subscription/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    if (req.method === 'POST') {
        console.log('Body:', JSON.stringify(req.body).substring(0, 500));
    }
    next();
});

app.use(cookieParser());

// Mock Vercel Request/Response compatibility
import fs from 'fs';
const adapter = (handler: any) => async (req: Request, res: Response) => {
    // Vercel functions expect (req, res). Express does too.
    try {
        await handler(req, res);
    } catch (e: any) {
        console.error('SERVER ERROR:', e);
        const log = `[${new Date().toISOString()}] ERROR: ${e.message}\nSTACK: ${e.stack}\nREQ_BODY: ${JSON.stringify(req.body)}\n\n`;
        fs.appendFileSync('server_error.log', log);

        if (!res.headersSent) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

import placeOrderHandler from './api/orders/place';
import syncCartHandler from './api/cart/sync';
import doctorsHandler from './api/doctors/index';
import appointmentsHandler from './api/appointments/index';

// ... (existing imports)

// Routes
app.post('/api/auth/register', adapter(registerHandler));
app.post('/api/auth/login', adapter(loginHandler));

app.get('/api/products', adapter(productHandler));
app.post('/api/products', adapter(productHandler));

app.post('/api/cart/calculate', adapter(cartHandler));
app.post('/api/cart/sync', adapter(syncCartHandler));

app.post('/api/subscription', adapter(subscriptionHandler));
app.post('/api/orders/place', adapter(placeOrderHandler));

app.get('/api/doctors', adapter(doctorsHandler));
app.get('/api/appointments', adapter(appointmentsHandler));
app.post('/api/appointments', adapter(appointmentsHandler));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API endpoints ready at /api/...`);
});
