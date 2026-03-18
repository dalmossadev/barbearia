// src/modules/barbershop-services/barbershop-services.service.ts

import { BarbershopService } from '../../entities/barbershop-service.entity'
import { AppError } from '../../shared/errors/AppError'
import { CreateBarbershopServiceDTO } from './dto/create-barbershop-service.dto'
import { BarbershopServicesRepository } from './barbershop-services.repository'

export class BarbershopServicesService {
  private readonly barbershopServicesRepository: BarbershopServicesRepository

  constructor() {
    this.barbershopServicesRepository = new BarbershopServicesRepository()
  }

  public async findById(id: string): Promise<BarbershopService> {
    const service = await this.barbershopServicesRepository.findById(id)

    if (!service) {
      throw new AppError('Serviço não encontrado', 404)
    }

    return service
  }

  public async findByBarbershopId(
    barbershopId: string,
  ): Promise<BarbershopService[]> {
    return this.barbershopServicesRepository.findByBarbershopId(barbershopId)
  }

  public async create(
    data: CreateBarbershopServiceDTO,
  ): Promise<BarbershopService> {
    return this.barbershopServicesRepository.create(data)
  }

  public async delete(id: string): Promise<void> {
    await this.findById(id)
    await this.barbershopServicesRepository.delete(id)
  }
}
