#!/bin/bash

echo "🔍 Iniciando varredura e correção do projeto..."
echo ""

# ─── 1. CRIAR DTOs ─────────────────────────────────────
echo "📁 Criando pastas dto/ nos módulos..."

MODULES=(
  "auth"
  "users"
  "barbershops"
  "barbershop-services"
  "bookings"
  "admin"
  "payments"
)

for MODULE in "${MODULES[@]}"; do
  mkdir -p src/modules/$MODULE/dto
  echo "  ✅ src/modules/$MODULE/dto/"
done

# ─── 2. CRIAR .env.example ────────────────────────────
echo ""
echo "📄 Criando .env.example..."

cat > .env.example << 'EOF'
DATABASE_URL="postgresql://usuario:senha@host.rds.amazonaws.com:5432/nomedobanco"
NODE_ENV="development"
PORT=3000
JWT_SECRET="seu-secret-aqui"
JWT_EXPIRES_IN="7d"
EOF

echo "  ✅ .env.example criado"

# ─── 3. REMOVER SCRIPTS DA RAIZ ───────────────────────
echo ""
echo "🗑️  Removendo scripts temporários da raiz..."

rm -f create-config.sh
rm -f create-modules.sh
rm -f create-structure.sh

echo "  ✅ Scripts removidos"

# ─── 4. INSTALAR DEPENDÊNCIAS ─────────────────────────
echo ""
echo "📦 Instalando dependências necessárias..."

npm install express cors
npm install -D @types/express @types/cors

npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken

echo "  ✅ Dependências instaladas"

# ─── 5. RESULTADO FINAL ───────────────────────────────
echo ""
echo "✅ Varredura e correção concluídas!"
echo ""
echo "📁 Estrutura final:"
find src/ -type f | sort
echo ""
echo "📦 Dependências:"
cat package.json