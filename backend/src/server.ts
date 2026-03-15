
import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()
// console.log('🔧 Variáveis de ambiente carregadas:', {
//   DATABASE_URL: process.env.DATABASE_URL ? '****' : undefined,
//   NODE_ENV: process.env.NODE_ENV,
//   PORT: process.env.PORT,

// })
import { AppDataSource } from './database/data-source'


AppDataSource.initialize()
  .then(() => console.log('✅ Banco conectado com sucesso'))
  .catch((err) => console.error('❌ Erro ao conectar no banco:', err))