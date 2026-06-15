// src/app.ts
//
// Configures the Express application: middleware, routes, and error handling.

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes';

const app: Application = express();

// --- Security & parsing middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '5mb' })); // 5mb to accommodate base64 photo payloads if needed
app.use(express.urlencoded({ extended: true }));

// --- Health check ---
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Scrap Market API is running.' });
});

// --- Routes ---
app.use('/api/auth', authRoutes);

// --- 404 handler ---
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// --- Global error handler ---
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

export default app;
