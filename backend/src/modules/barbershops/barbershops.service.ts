// src/modules/barbershops/barbershops.service.ts

import { Barbershop } from '../../entities/barbershop.entity'
import { AppError } from '../../shared/errors/AppError'
import { CreateBarbershopDTO } from './dto/create-barbershop.dto'
import { BarbershopsRepository } from './barbershops.repository'

export class BarbershopsService {
  private readonly barbershopsRepository: BarbershopsRepository

  constructor() {
    this.barbershopsRepository = new BarbershopsRepository()
  }

  public async findAll(): Promise<Barbershop[]> {
    return this.barbershopsRepository.findAll()
  }

  public async findById(id: string): Promise<Barbershop> {
    const barbershop = await this.barbershopsRepository.findById(id)

    if (!barbershop) {
      throw new AppError('Barbearia não encontrada', 404)
    }

    return barbershop
  }

  public async findByIdWithServices(id: string): Promise<Barbershop> {
    const barbershop = await this.barbershopsRepository.findByIdWithServices(id)

    if (!barbershop) {
      throw new AppError('Barbearia não encontrada', 404)
    }

    return barbershop
  }

  public async create(data: CreateBarbershopDTO): Promise<Barbershop> {
    return this.barbershopsRepository.create(data)
  }

  public async update(
    id: string,
    data: Partial<CreateBarbershopDTO>,
  ): Promise<Barbershop> {
    await this.findById(id)
    const updated = await this.barbershopsRepository.update(id, data)
    return updated!
  }

  public async delete(id: string): Promise<void> {
    await this.findById(id)
    await this.barbershopsRepository.delete(id)
  }
}
