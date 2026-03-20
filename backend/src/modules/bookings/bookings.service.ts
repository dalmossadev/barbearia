// src/modules/bookings/bookings.service.ts

import { Booking } from '../../entities/booking.entity'
import { AppError } from '../../shared/errors/AppError'
import { CreateBookingDTO } from './dto/create-booking.dto'
import { BookingsRepository } from './bookings.repository'

export class BookingsService {
  private readonly bookingsRepository: BookingsRepository

  constructor() {
    this.bookingsRepository = new BookingsRepository()
  }

  public async findById(id: string): Promise<Booking> {
    const booking = await this.bookingsRepository.findById(id)

    if (!booking) {
      throw new AppError('Agendamento não encontrado', 404)
    }

    return booking
  }

  public async findByUserId(userId: string): Promise<Booking[]> {
    return this.bookingsRepository.findByUserId(userId)
  }

  public async create(userId: string, data: CreateBookingDTO): Promise<Booking> {
    const bookingDate = new Date(data.date)

    // Validar se a data não é no passado
    if (bookingDate < new Date()) {
      throw new AppError('Não é possível agendar para uma data no passado', 400)
    }

    // Validar conflito de horário
    const conflict = await this.bookingsRepository.findConflict(
      data.barbershopId,
      data.serviceId,
      bookingDate,
    )

    if (conflict) {
      throw new AppError('Horário já reservado para este serviço', 409)
    }

    return this.bookingsRepository.create(userId, {
      ...data,
      date: bookingDate,
    })
  }

  public async cancel(id: string, userId: string): Promise<void> {
    const booking = await this.findById(id)

    // Validar se o agendamento pertence ao usuário
    if (booking.userId !== userId) {
      throw new AppError('Não autorizado a cancelar este agendamento', 403)
    }

    // Validar se o agendamento não é no passado
    if (booking.date < new Date()) {
      throw new AppError('Não é possível cancelar um agendamento passado', 400)
    }

    await this.bookingsRepository.delete(id)
  }
}
