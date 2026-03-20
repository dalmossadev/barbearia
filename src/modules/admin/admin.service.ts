// src/modules/admin/admin.service.ts

import { Barbershop } from '../../entities/barbershop.entity'
import { BarbershopService } from '../../entities/barbershop-service.entity'
import { Booking } from '../../entities/booking.entity'
import { AppError } from '../../shared/errors/AppError'
import { BarbershopsRepository } from '../barbershops/barbershops.repository'
import { BarbershopServicesRepository } from '../barbershop-services/barbershop-services.repository'
import { BookingsRepository } from '../bookings/bookings.repository'
import { AdminCreateBarbershopDTO } from './dto/create-barbershop.dto'
import { AdminCreateServiceDTO } from './dto/create-service.dto'

export class AdminService {
  private readonly barbershopsRepository: BarbershopsRepository
  private readonly barbershopServicesRepository: BarbershopServicesRepository
  private readonly bookingsRepository: BookingsRepository

  constructor() {
    this.barbershopsRepository = new BarbershopsRepository()
    this.barbershopServicesRepository = new BarbershopServicesRepository()
    this.bookingsRepository = new BookingsRepository()
  }

  // ─── Barbearias ─────────────────────────────────────

  public async createBarbershop(
    data: AdminCreateBarbershopDTO,
  ): Promise<Barbershop> {
    return this.barbershopsRepository.create(data)
  }

  public async updateBarbershop(
    id: string,
    data: Partial<AdminCreateBarbershopDTO>,
  ): Promise<Barbershop> {
    const barbershop = await this.barbershopsRepository.findById(id)

    if (!barbershop) {
      throw new AppError('Barbearia não encontrada', 404)
    }

    const updated = await this.barbershopsRepository.update(id, data)
    return updated!
  }

  public async deleteBarbershop(id: string): Promise<void> {
    const barbershop = await this.barbershopsRepository.findById(id)

    if (!barbershop) {
      throw new AppError('Barbearia não encontrada', 404)
    }

    await this.barbershopsRepository.delete(id)
  }

  // ─── Serviços ────────────────────────────────────────

  public async createService(
    barbershopId: string,
    data: AdminCreateServiceDTO,
  ): Promise<BarbershopService> {
    const barbershop = await this.barbershopsRepository.findById(barbershopId)

    if (!barbershop) {
      throw new AppError('Barbearia não encontrada', 404)
    }

    return this.barbershopServicesRepository.create({
      ...data,
      barbershopId,
    })
  }

  public async deleteService(id: string): Promise<void> {
    const service = await this.barbershopServicesRepository.findById(id)

    if (!service) {
      throw new AppError('Serviço não encontrado', 404)
    }

    await this.barbershopServicesRepository.delete(id)
  }

  // ─── Agendamentos ────────────────────────────────────

  public async findAllBookings(): Promise<Booking[]> {
    return this.bookingsRepository.findAll()
  }

  // ─── Dashboard ───────────────────────────────────────

  public async getDashboard(): Promise<object> {
    const [barbershops, bookings] = await Promise.all([
      this.barbershopsRepository.findAll(),
      this.bookingsRepository.findAll(),
    ])

    const now = new Date()
    const upcoming = bookings.filter((b) => new Date(b.date) >= now)
    const past = bookings.filter((b) => new Date(b.date) < now)

    return {
      totalBarbershops: barbershops.length,
      totalBookings: bookings.length,
      upcomingBookings: upcoming.length,
      pastBookings: past.length,
    }
  }
}
