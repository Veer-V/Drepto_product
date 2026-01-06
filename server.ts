import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fs from 'fs';

// Import handlers from Consolidated API files
import authHandler from './api/auth';
import shopHandler from './api/shop';
import clinicHandler from './api/clinic';
import debugHandler from './api/debug';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  if (req.method === 'POST') {
    // console.log('Body:', JSON.stringify(req.body).substring(0, 500));
  }
  next();
});

// Adapter to make Vercel serverless functions compatible with Express
const adapter = (handler: any) => async (req: Request, res: Response) => {
  try {
    await handler(req, res);
  } catch (e: any) {
    console.error('SERVER ERROR:', e);
    const log = `[${new Date().toISOString()}] ERROR: ${e.message}\nSTACK: ${e.stack}\nREQ_BODY: ${JSON.stringify(req.body)}\n\n`;
    fs.appendFileSync('server_error.log', log);

    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal Server Error', error: e.message });
    }
  }
};

// ==========================================
// ROUTES
// ==========================================

// Auth Group
app.use('/api/auth', adapter(authHandler));
// Note: Frontend calls /api/auth?action=login, etc.
// Express handles query params automatically.

// Shop Group
app.use('/api/shop', adapter(shopHandler));
// Frontend calls /api/shop?action=products, /api/shop?action=place-order, etc.

// Clinic Group
app.use('/api/clinic', adapter(clinicHandler));
// Frontend calls /api/clinic?action=doctors, etc.

// Debug
app.get('/api/debug', adapter(debugHandler));

// Legacy Mappings (Optional: if any old frontend code remains, we can map old paths to new logic)
// For example, if something still calls /api/products, we can reroute it:
app.all('/api/products', (req, res) => {
  req.query.action = 'products';
  adapter(shopHandler)(req, res);
});
app.all('/api/orders/place', (req, res) => {
  req.query.action = 'place-order';
  adapter(shopHandler)(req, res);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints ready at /api/auth, /api/shop, /api/clinic`);
});
