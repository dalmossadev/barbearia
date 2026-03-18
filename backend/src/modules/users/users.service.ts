// src/modules/users/users.service.ts

import { User } from '../../entities/user.entity'
import { AppError } from '../../shared/errors/AppError'
import { HashUtil } from '../../shared/utils/hash'
import { CreateUserDTO } from './dto/create-user.dto'
import { UsersRepository } from './users.repository'

export class UsersService {
  private readonly usersRepository: UsersRepository

  constructor() {
    this.usersRepository = new UsersRepository()
  }

  public async create(data: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersRepository.findByEmail(data.email)

    if (existingUser) {
      throw new AppError('E-mail já cadastrado', 409)
    }

    const hashedPassword = await HashUtil.hash(data.password)

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    })

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  public async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email)
  }
}