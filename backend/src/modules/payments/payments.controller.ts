// src/modules/payments/payments.controller.ts

import { Request, Response, NextFunction } from 'express'
import { PaymentsService } from './payments.service'

export class PaymentsController {
  private readonly paymentsService: PaymentsService

  constructor() {
    this.paymentsService = new PaymentsService()
  }

  public createPaymentIntent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { bookingId } = req.body

      if (!bookingId) {
        res.status(400).json({
          status: 'error',
          message: 'bookingId é obrigatório',
        })
        return
      }

      const result = await this.paymentsService.createPaymentIntent(
        bookingId,
        req.userId,
      )

      res.status(201).json({
        status: 'success',
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  public webhook = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const signature = req.headers['stripe-signature'] as string

      if (!signature) {
        res.status(400).json({ status: 'error', message: 'Assinatura ausente' })
        return
      }

      await this.paymentsService.handleWebhook(req.body as Buffer, signature)

      res.status(200).json({ received: true })
    } catch (error) {
      next(error)
    }
  }
}
