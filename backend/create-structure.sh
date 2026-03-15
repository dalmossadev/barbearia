#!/bin/bash

echo "🚀 Criando estrutura completa do projeto..."

# ─── MIDDLEWARES ───────────────────────────────────────
mkdir -p src/middlewares

touch src/middlewares/auth.middleware.ts     # Verificação JWT
touch src/middlewares/error.middleware.ts    # Tratamento de erros global
touch src/middlewares/admin.middleware.ts    # Verificação de role admin

echo "✅ Middlewares criados"

# ─── SHARED ───────────────────────────────────────────
mkdir -p src/shared/errors
mkdir -p src/shared/utils

touch src/shared/errors/AppError.ts         # Classe de erro personalizada
touch src/shared/utils/hash.ts              # Funções de hash (bcrypt)
touch src/shared/utils/date.ts              # Funções utilitárias de data

echo "✅ Shared criado"

# ─── ROUTES ───────────────────────────────────────────
mkdir -p src/routes

touch src/routes/index.ts                   # Roteador principal

echo "✅ Routes criado"

echo ""
echo "📁 Estrutura completa criada com sucesso!"
echo ""

# Mostrar resultado final de todo o src/
find src/ -type f | sort