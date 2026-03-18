// src/modules/barbershops/barbershops.routes.ts

import { Router } from 'express'
import { BarbershopsController } from './barbershops.controller'

const barbershopsRoutes = Router()
const barbershopsController = new BarbershopsController()

// Rotas públicas
barbershopsRoutes.get('/', barbershopsController.findAll)
barbershopsRoutes.get('/:id', barbershopsController.findById)
barbershopsRoutes.get('/:id/services', barbershopsController.findServices)

export default barbershopsRoutes
