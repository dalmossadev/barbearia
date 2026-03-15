#!/bin/bash

echo "🚀 Criando estrutura de config..."

# Criar pasta config
mkdir -p src/config

# Criar arquivos de configuração
touch src/config/env.ts        # Variáveis de ambiente tipadas
touch src/config/database.ts   # Configurações do banco
touch src/config/jwt.ts        # Configurações do JWT
touch src/config/cors.ts       # Configurações do CORS
touch src/config/swagger.ts    # Configurações da documentação

echo "✅ Arquivos de config criados"
echo ""
echo "📁 Estrutura criada com sucesso!"
echo ""

# Mostrar resultado
find src/config -type f | sort