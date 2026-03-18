// src/routes/index.ts

import { Router, Request, Response } from 'express'
import { AppDataSource } from '../database/data-source'

const router = Router()

// ─── Health Check ─────────────────────────────────────────────────────────────
router.get('/health', (_req: Request, res: Response) => {
  const isDbConnected = AppDataSource.isInitialized

  res.status(isDbConnected ? 200 : 503).json({
    status: isDbConnected ? 'ok' : 'unavailable',
    timestamp: new Date().toISOString(),
    database: isDbConnected ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV ?? 'development',
  })
})

export default router
