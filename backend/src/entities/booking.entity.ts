import 'reflect-metadata';
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}