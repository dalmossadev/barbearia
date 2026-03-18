// src/server.ts

import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()

import express, { Application } from 'express'
import cors from 'cors'
import router from './routes/index'
import { ErrorMiddleware } from './middlewares/error.middleware'
import { env } from './config/env'

export class Server {
  private readonly app: Application
  private readonly port: number

  constructor() {
    this.app = express()
    this.port = env.PORT
    this.setupMiddlewares()
    this.setupRoutes()
    this.setupErrorHandling()
  }

  private setupMiddlewares(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      }),
    )
  }

  private setupRoutes(): void {
    this.app.use('/api', router)
  }

  private setupErrorHandling(): void {
    this.app.use(ErrorMiddleware.handle)
  }

  public getApp(): Application {
    return this.app
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor rodando na porta ${this.port}`)
      console.log(`📡 Ambiente: ${env.NODE_ENV}`)
      console.log(`🔗 Health check: http://localhost:${this.port}/api/health`)
    })
  }
}
