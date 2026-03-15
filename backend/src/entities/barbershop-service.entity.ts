import 'reflect-metadata'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Barbershop } from './barbershop.entity'
import { Booking } from './booking.entity'

@Entity('barbershop_services')
export class BarbershopService {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 255 })
  name: string

  @Column({ type: 'text' })
  description: string

  @Column({ name: 'image_url', length: 500 })
  imageUrl: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column({ name: 'barbershop_id' })
  barbershopId: string

  @ManyToOne(() => Barbershop, (barbershop) => barbershop.services, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'barbershop_id' })
  barbershop: Barbershop

  @OneToMany(() => Booking, (booking) => booking.service)
  bookings: Booking[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}