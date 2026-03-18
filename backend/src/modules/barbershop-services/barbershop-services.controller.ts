// src/modules/barbershop-services/barbershop-services.controller.ts

import { Request, Response, NextFunction } from 'express'
import { BarbershopServicesService } from './barbershop-services.service'

export class BarbershopServicesController {
  private readonly barbershopServicesService: BarbershopServicesService

  constructor() {
    this.barbershopServicesService = new BarbershopServicesService()
  }

  public findById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id as string
      const service = await this.barbershopServicesService.findById(id)

      res.status(200).json({
        status: 'success',
        data: { service },
      })
    } catch (error) {
      next(error)
    }
  }
}
