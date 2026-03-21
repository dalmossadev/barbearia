// src/routes/index.ts

import { Router, Request, Response } from 'express'
import { AppDataSource } from '../database/data-source'
import authRoutes from '../modules/auth/auth.routes'
import usersRoutes from '../modules/users/users.routes'
import barbershopsRoutes from '../modules/barbershops/barbershops.routes'
import barbershopServicesRoutes from '../modules/barbershop-services/barbershop-services.routes'
import bookingsRoutes from '../modules/bookings/bookings.routes'

const router = Router()

// ─── Health Check ──────────────────────────────────────────────────────────────
router.get('/health', (_req: Request, res: Response) => {
  const isDbConnected = AppDataSource.isInitialized

  res.status(isDbConnected ? 200 : 503).json({
    status: isDbConnected ? 'ok' : 'unavailable',
    timestamp: new Date().toISOString(),
    database: isDbConnected ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV ?? 'development',
  })
})

// ─── Módulos ───────────────────────────────────────────────────────────────────
router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/barbershops', barbershopsRoutes)
router.use('/services', barbershopServicesRoutes)
router.use('/bookings', bookingsRoutes)

export default router
