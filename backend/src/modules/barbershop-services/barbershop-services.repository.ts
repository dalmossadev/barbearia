// src/modules/barbershop-services/barbershop-services.repository.ts

import { Repository } from 'typeorm'
import { AppDataSource } from '../../database/data-source'
import { BarbershopService } from '../../entities/barbershop-service.entity'
import { CreateBarbershopServiceDTO } from './dto/create-barbershop-service.dto'

export class BarbershopServicesRepository {
  private readonly repository: Repository<BarbershopService>

  constructor() {
    this.repository = AppDataSource.getRepository(BarbershopService)
  }

  public async findById(id: string): Promise<BarbershopService | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['barbershop'],
    })
  }

  public async findByBarbershopId(
    barbershopId: string,
  ): Promise<BarbershopService[]> {
    return this.repository.find({
      where: { barbershopId },
      order: { name: 'ASC' },
    })
  }

  public async create(
    data: CreateBarbershopServiceDTO,
  ): Promise<BarbershopService> {
    const service = this.repository.create(data)
    return this.repository.save(service)
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
