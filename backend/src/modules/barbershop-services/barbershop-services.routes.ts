// src/modules/barbershop-services/barbershop-services.routes.ts

import { Router } from 'express'
import { BarbershopServicesController } from './barbershop-services.controller'

const barbershopServicesRoutes = Router()
const barbershopServicesController = new BarbershopServicesController()

// Rotas públicas
barbershopServicesRoutes.get('/:id', barbershopServicesController.findById)

export default barbershopServicesRoutes
