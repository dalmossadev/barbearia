// src/modules/users/users.repository.ts

import { Repository } from 'typeorm'
import { AppDataSource } from '../../database/data-source'
import { User } from '../../entities/user.entity'
import { CreateUserDTO } from './dto/create-user.dto'

export class UsersRepository {
  private readonly repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  public async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } })
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } })
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.repository.create(data)
    return this.repository.save(user)
  }

  public async findAll(): Promise<User[]> {
    return this.repository.find({
      select: ['id', 'name', 'email', 'createdAt'],
    })
  }
}