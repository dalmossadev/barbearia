import 'reflect-metadata'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Booking } from './booking.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, length: 255 })
  email: string

  @Column({ length: 255 })
  name: string

  @Column({ length: 255 })
  password: string

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}