// src/modules/payments/payments.service.ts

import Stripe from 'stripe'
import { env } from '../../config/env'
import { AppError } from '../../shared/errors/AppError'
import { AppDataSource } from '../../database/data-source'
import { Booking, BookingStatus } from '../../entities/booking.entity'
import { BarbershopService } from '../../entities/barbershop-service.entity'

export class PaymentsService {
  private readonly stripe: Stripe
  private readonly bookingRepo = AppDataSource.getRepository(Booking)
  private readonly serviceRepo = AppDataSource.getRepository(BarbershopService)

  constructor() {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY)
  }

  public async createPaymentIntent(
    bookingId: string,
    userId: string,
  ): Promise<{ clientSecret: string; paymentIntentId: string }> {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['service'],
    })

    if (!booking) {
      throw new AppError('Agendamento não encontrado', 404)
    }

    if (booking.userId !== userId) {
      throw new AppError('Acesso não autorizado', 403)
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new AppError('Este agendamento não está pendente de pagamento', 400)
    }

    const service = await this.serviceRepo.findOne({
      where: { id: booking.serviceId },
    })

    if (!service) {
      throw new AppError('Serviço não encontrado', 404)
    }

    // Converter preço para centavos (Stripe usa centavos)
    const amount = Math.round(Number(service.price) * 100)

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      metadata: {
        bookingId: booking.id,
        userId,
        serviceId: booking.serviceId,
      },
    })

    // Salvar o paymentIntentId no booking
    await this.bookingRepo.update(bookingId, {
      paymentIntentId: paymentIntent.id,
    })

    return {
      clientSecret: paymentIntent.client_secret!,
      paymentIntentId: paymentIntent.id,
    }
  }

  public async handleWebhook(
    payload: Buffer,
    signature: string,
  ): Promise<void> {
    let event: Stripe.Event

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        env.STRIPE_WEBHOOK_SECRET,
      )
    } catch {
      throw new AppError('Assinatura do webhook inválida', 400)
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await this.confirmBooking(paymentIntent.id)
        break
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await this.cancelBooking(paymentIntent.id)
        break
      }
    }
  }

  private async confirmBooking(paymentIntentId: string): Promise<void> {
    await this.bookingRepo.update(
      { paymentIntentId },
      { status: BookingStatus.CONFIRMED },
    )
    console.log(`✅ Booking confirmado para paymentIntent: ${paymentIntentId}`)
  }

  private async cancelBooking(paymentIntentId: string): Promise<void> {
    await this.bookingRepo.update(
      { paymentIntentId },
      { status: BookingStatus.CANCELLED },
    )
    console.log(`❌ Booking cancelado para paymentIntent: ${paymentIntentId}`)
  }
}
