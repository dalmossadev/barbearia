// src/modules/bookings/bookings.controller.ts

import { Request, Response, NextFunction } from 'express'
import { BookingsService } from './bookings.service'
import { CreateBookingDTO } from './dto/create-booking.dto'

export class BookingsController {
  private readonly bookingsService: BookingsService

  constructor() {
    this.bookingsService = new BookingsService()
  }

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { barbershopId, serviceId, date } = req.body as CreateBookingDTO
      const { userId } = req

      if (!barbershopId || !serviceId || !date) {
        res.status(400).json({
          status: 'error',
          message: 'barbershopId, serviceId e date são obrigatórios',
        })
        return
      }

      const booking = await this.bookingsService.create(userId, {
        barbershopId,
        serviceId,
        date,
      })

      res.status(201).json({
        status: 'success',
        data: { booking },
      })
    } catch (error) {
      next(error)
    }
  }

  public findAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { userId } = req
      const bookings = await this.bookingsService.findByUserId(userId)

      res.status(200).json({
        status: 'success',
        data: { bookings },
      })
    } catch (error) {
      next(error)
    }
  }

  public findById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id as string
      const booking = await this.bookingsService.findById(id)

      // Verificar se o agendamento pertence ao usuário
      if (booking.userId !== req.userId) {
        res.status(403).json({
          status: 'error',
          message: 'Não autorizado',
        })
        return
      }

      res.status(200).json({
        status: 'success',
        data: { booking },
      })
    } catch (error) {
      next(error)
    }
  }

  public cancel = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id as string
      const { userId } = req

      await this.bookingsService.cancel(id, userId)

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
