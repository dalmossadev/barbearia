// src/entities/booking.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity'
import { Barbershop } from './barbershop.entity'
import { BarbershopService } from './barbershop-service.entity'

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'barbershop_id' })
  barbershopId: string

  @Column({ name: 'service_id' })
  serviceId: string

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Barbershop, (barbershop) => barbershop.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'barbershop_id' })
  barbershop: Barbershop

  @ManyToOne(() => BarbershopService, (service) => service.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: BarbershopService

  @Column({ type: 'timestamptz' })
  date: Date

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus

  @Column({ type: 'varchar', name: 'payment_intent_id', nullable: true, length: 255 })
  paymentIntentId: string | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
