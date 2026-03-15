#!/bin/bash

echo "🚀 Criando estrutura de módulos..."

# Módulos do projeto
MODULES=(
  "auth"
  "users"
  "barbershops"
  "barbershop-services"
  "bookings"
  "admin"
  "payments"
)

# Criar pasta modules
mkdir -p src/modules

for MODULE in "${MODULES[@]}"; do
  # Criar pasta do módulo e subpasta dto
  mkdir -p src/modules/$MODULE/dto

  # Criar arquivos base (vazios por enquanto)
  touch src/modules/$MODULE/$MODULE.routes.ts
  touch src/modules/$MODULE/$MODULE.controller.ts
  touch src/modules/$MODULE/$MODULE.service.ts
  touch src/modules/$MODULE/$MODULE.repository.ts

  echo "✅ Módulo '$MODULE' criado"
done

echo ""
echo "📁 Estrutura criada com sucesso!"
echo ""

# Mostrar resultado
find src/modules -type f | sort