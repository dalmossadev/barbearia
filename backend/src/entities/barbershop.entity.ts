import 'reflect-metadata'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { BarbershopService } from './barbershop-service.entity'
import { Booking } from './booking.entity'

@Entity('barbershops')
export class Barbershop {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 255 })
  name: string

  @Column({ length: 500 })
  address: string

  @Column({ length: 255 })
  phones: string

  @Column({ type: 'text' })
  description: string

  @Column({ name: 'image_url', length: 500 })
  imageUrl: string

  @OneToMany(() => BarbershopService, (service) => service.barbershop)
  services: BarbershopService[]

  @OneToMany(() => Booking, (booking) => booking.barbershop)
  bookings: Booking[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}