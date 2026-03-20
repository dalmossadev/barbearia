// src/modules/admin/admin.controller.ts

import { Request, Response, NextFunction } from 'express'
import { AdminService } from './admin.service'
import { AdminCreateBarbershopDTO } from './dto/create-barbershop.dto'
import { AdminCreateServiceDTO } from './dto/create-service.dto'

export class AdminController {
  private readonly adminService: AdminService

  constructor() {
    this.adminService = new AdminService()
  }

  // ─── Dashboard ───────────────────────────────────────

  public getDashboard = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const stats = await this.adminService.getDashboard()

      res.status(200).json({
        status: 'success',
        data: { stats },
      })
    } catch (error) {
      next(error)
    }
  }

  // ─── Barbearias ──────────────────────────────────────

  public createBarbershop = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = req.body as AdminCreateBarbershopDTO

      const { name, address, phones, description, imageUrl } = data

      if (!name || !address || !phones || !description || !imageUrl) {
        res.status(400).json({
          status: 'error',
          message: 'Todos os campos são obrigatórios',
        })
        return
      }

      const barbershop = await this.adminService.createBarbershop(data)

      res.status(201).json({
        status: 'success',
        data: { barbershop },
      })
    } catch (error) {
      next(error)
    }
  }

  public updateBarbershop = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id as string
      const data = req.body as Partial<AdminCreateBarbershopDTO>

      const barbershop = await this.adminService.updateBarbershop(id, data)

      res.status(200).json({
        status: 'success',
        data: { barbershop },
      })
    } catch (error) {
      next(error)
    }
  }

  public deleteBarbershop = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id as string
      await this.adminService.deleteBarbershop(id)

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  // ─── Serviços ────────────────────────────────────────

  public createService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const barbershopId = req.params.barbershopId as string
      const data = req.body as AdminCreateServiceDTO

      const service = await this.adminService.createService(barbershopId, data)

      res.status(201).json({
        status: 'success',
        data: { service },
      })
    } catch (error) {
      next(error)
    }
  }

  public deleteService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id as string
      await this.adminService.deleteService(id)

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  // ─── Agendamentos ────────────────────────────────────

  public findAllBookings = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const bookings = await this.adminService.findAllBookings()

      res.status(200).json({
        status: 'success',
        data: { bookings },
      })
    } catch (error) {
      next(error)
    }
  }
}
