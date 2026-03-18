// src/modules/barbershops/barbershops.controller.ts

import { Request, Response, NextFunction } from 'express'
import { BarbershopsService } from './barbershops.service'

export class BarbershopsController {
  private readonly barbershopsService: BarbershopsService

  constructor() {
    this.barbershopsService = new BarbershopsService()
  }

  public findAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const barbershops = await this.barbershopsService.findAll()

      res.status(200).json({
        status: 'success',
        data: { barbershops },
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
      const barbershop = await this.barbershopsService.findById(id)

      res.status(200).json({
        status: 'success',
        data: { barbershop },
      })
    } catch (error) {
      next(error)
    }
  }

  public findServices = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id as string
      const barbershop = await this.barbershopsService.findByIdWithServices(id)

      res.status(200).json({
        status: 'success',
        data: { services: barbershop.services },
      })
    } catch (error) {
      next(error)
    }
  }
}
