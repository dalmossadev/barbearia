// src/database/data-source.ts
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../entities/user.entity'
import { Barbershop } from '../entities/barbershop.entity'
import { BarbershopService } from '../entities/barbershop-service.entity'
import { Booking } from '../entities/booking.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Barbershop, BarbershopService, Booking],
  migrations: ['src/database/migrations/**/*.ts'],
  migrationsTableName: 'migrations',
  ssl: {
    rejectUnauthorized: false,
  },
})