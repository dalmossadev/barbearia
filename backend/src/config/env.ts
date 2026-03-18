// src/config/env.ts

import { AppError } from '../shared/errors/AppError'

interface EnvConfig {
  DATABASE_URL: string
  NODE_ENV: string
  PORT: number
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
}

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback
  if (!value) {
    throw new AppError(
      `Variável de ambiente obrigatória não definida: ${key}`,
      500,
      false,
    )
  }
  return value
}

export const env: EnvConfig = {
  DATABASE_URL: getEnv('DATABASE_URL'),
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: parseInt(getEnv('PORT', '3000'), 10),
  JWT_SECRET: getEnv('JWT_SECRET', 'changeme_secret'),
  JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '7d'),
}
