// src/modules/bookings/bookings.repository.ts

import { Repository } from 'typeorm'
import { AppDataSource } from '../../database/data-source'
import { Booking } from '../../entities/booking.entity'
import { CreateBookingDTO } from './dto/create-booking.dto'

export class BookingsRepository {
  private readonly repository: Repository<Booking>

  constructor() {
    this.repository = AppDataSource.getRepository(Booking)
  }

  public async findById(id: string): Promise<Booking | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['user', 'barbershop', 'service'],
    })
  }

  public async findByUserId(userId: string): Promise<Booking[]> {
    return this.repository.find({
      where: { userId },
      relations: ['barbershop', 'service'],
      order: { date: 'DESC' },
    })
  }

  public async findAll(): Promise<Booking[]> {
    return this.repository.find({
      relations: ['user', 'barbershop', 'service'],
      order: { date: 'DESC' },
    })
  }

  public async findConflict(
    barbershopId: string,
    serviceId: string,
    date: Date,
  ): Promise<Booking | null> {
    return this.repository.findOne({
      where: { barbershopId, serviceId, date },
    })
  }

  public async create(
    userId: string,
    data: CreateBookingDTO,
  ): Promise<Booking> {
    const booking = this.repository.create({
      userId,
      barbershopId: data.barbershopId,
      serviceId: data.serviceId,
      date: data.date,
    })
    return this.repository.save(booking)
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
