// src/index.ts

import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()

import { AppDataSource } from './database/data-source'
import { Server } from './server'

const bootstrap = async (): Promise<void> => {
  try {
    // 1. Conectar ao banco
    await AppDataSource.initialize()
    console.log('✅ Banco de dados conectado com sucesso')

    // 2. Iniciar o servidor
    const server = new Server()
    server.listen()
  } catch (error) {
    console.error('❌ Erro ao inicializar a aplicação:', error)
    process.exit(1)
  }
}

bootstrap()
