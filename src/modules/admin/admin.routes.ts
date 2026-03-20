// src/modules/admin/admin.routes.ts

import { Router } from 'express'
import { AdminController } from './admin.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'
import { AdminMiddleware } from '../../middlewares/admin.middleware'

const adminRoutes = Router()
const adminController = new AdminController()

// Todas as rotas admin exigem JWT + role ADMIN
adminRoutes.use(AuthMiddleware.handle)
adminRoutes.use(AdminMiddleware.handle)

// Dashboard
adminRoutes.get('/dashboard', adminController.getDashboard)

// Barbearias
adminRoutes.post('/barbershops', adminController.createBarbershop)
adminRoutes.put('/barbershops/:id', adminController.updateBarbershop)
adminRoutes.delete('/barbershops/:id', adminController.deleteBarbershop)

// Serviços
adminRoutes.post('/barbershops/:barbershopId/services', adminController.createService)
adminRoutes.delete('/services/:id', adminController.deleteService)

// Agendamentos
adminRoutes.get('/bookings', adminController.findAllBookings)

export default adminRoutes
