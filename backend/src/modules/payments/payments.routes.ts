// src/modules/payments/payments.routes.ts

import { Router } from 'express'
import { PaymentsController } from './payments.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'

const paymentsRoutes = Router()
const paymentsController = new PaymentsController()

// Webhook — raw body necessário para verificação da assinatura Stripe
paymentsRoutes.post(
  '/webhook',
  paymentsController.webhook,
)

// Rotas protegidas
paymentsRoutes.post(
  '/payment-intent',
  AuthMiddleware.handle,
  paymentsController.createPaymentIntent,
)

export default paymentsRoutes
