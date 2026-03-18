// src/modules/barbershops/barbershops.repository.ts

import { Repository } from 'typeorm'
import { AppDataSource } from '../../database/data-source'
import { Barbershop } from '../../entities/barbershop.entity'
import { CreateBarbershopDTO } from './dto/create-barbershop.dto'

export class BarbershopsRepository {
  private readonly repository: Repository<Barbershop>

  constructor() {
    this.repository = AppDataSource.getRepository(Barbershop)
  }

  public async findAll(): Promise<Barbershop[]> {
    return this.repository.find({
      order: { createdAt: 'DESC' },
    })
  }

  public async findById(id: string): Promise<Barbershop | null> {
    return this.repository.findOne({ where: { id } })
  }

  public async findByIdWithServices(id: string): Promise<Barbershop | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['services'],
    })
  }

  public async create(data: CreateBarbershopDTO): Promise<Barbershop> {
    const barbershop = this.repository.create(data)
    return this.repository.save(barbershop)
  }

  public async update(
    id: string,
    data: Partial<CreateBarbershopDTO>,
  ): Promise<Barbershop | null> {
    await this.repository.update(id, data)
    return this.findById(id)
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
