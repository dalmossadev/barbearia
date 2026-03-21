# 💈 Barbearia App — Backend

API REST completa para sistema de agendamento de barbearias, desenvolvida com **Node.js**, **TypeScript**, **TypeORM** e **PostgreSQL (AWS RDS)**.

---

## 🚀 Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Node.js | v22+ | Runtime |
| TypeScript | ^5.9 | Linguagem |
| TypeORM | ^0.3 | ORM / Migrations |
| PostgreSQL | 15+ | Banco de dados (AWS RDS) |
| Express | ^5.2 | Framework HTTP |
| ts-node | ^10.9 | Execução TypeScript |
| dotenv | ^17 | Variáveis de ambiente |
| bcryptjs | ^3.0 | Hash de senhas |
| jsonwebtoken | ^9.0 | Autenticação JWT |
| stripe | latest | Pagamentos |
| pg | ^8 | Driver PostgreSQL |

---

## 📁 Estrutura de Diretórios

\`\`\`
backend/
├── src/
│   ├── config/
│   │   ├── env.ts                     # Variáveis de ambiente tipadas
│   │   ├── cors.ts
│   │   ├── jwt.ts
│   │   └── swagger.ts
│   ├── database/
│   │   ├── data-source.ts
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── entities/
│   │   ├── user.entity.ts
│   │   ├── barbershop.entity.ts
│   │   ├── barbershop-service.entity.ts
│   │   └── booking.entity.ts
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── barbershops/
│   │   ├── barbershop-services/
│   │   ├── bookings/
│   │   ├── admin/
│   │   └── payments/
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── admin.middleware.ts
│   │   └── error.middleware.ts
│   ├── shared/
│   │   ├── errors/AppError.ts
│   │   └── utils/
│   │       ├── hash.ts
│   │       └── date.ts
│   ├── routes/index.ts
│   ├── index.ts
│   └── server.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
\`\`\`

---

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório
\`\`\`bash
git clone https://github.com/dalmossadev/barbearia.git
cd barbearia/backend
\`\`\`

### 2. Instale as dependências
\`\`\`bash
npm install
\`\`\`

### 3. Configure as variáveis de ambiente
\`\`\`bash
cp .env.example .env
\`\`\`

Edite o \`.env\`:
\`\`\`env
DATABASE_URL="postgresql://usuario:senha@host.rds.amazonaws.com:5432/nomedobanco"
NODE_ENV="development"
PORT=3000
JWT_SECRET="seu-secret-aqui"
JWT_EXPIRES_IN="7d"
STRIPE_SECRET_KEY="sk_test_sua_chave_aqui"
STRIPE_WEBHOOK_SECRET="whsec_sua_chave_aqui"
\`\`\`

### 4. Rode as migrations
\`\`\`bash
npm run migration:run
\`\`\`

### 5. Popule o banco com dados de exemplo
\`\`\`bash
npm run seed
\`\`\`

### 6. Inicie o servidor
\`\`\`bash
npm run dev
\`\`\`

---

## 📜 Scripts Disponíveis

\`\`\`bash
npm run dev                    # Inicia em desenvolvimento
npm run build                  # Compila TypeScript → dist/
npm run start                  # Inicia versão compilada
npm run seed                   # Popula o banco com dados de exemplo
npm run migration:generate -- src/database/migrations/NomeDaMigration
npm run migration:run          # Aplica migrations pendentes
npm run migration:revert       # Desfaz última migration
\`\`\`

---

## 🗺️ Rotas da API

### Públicas
| Método | Rota | Descrição |
|---|---|---|
| GET | /api/health | Health check |
| POST | /api/auth/register | Registro de usuário |
| POST | /api/auth/login | Login |
| GET | /api/barbershops | Listar barbearias |
| GET | /api/barbershops/:id | Detalhes da barbearia |
| GET | /api/barbershops/:id/services | Serviços da barbearia |

### Autenticadas (JWT)
| Método | Rota | Descrição |
|---|---|---|
| GET | /api/auth/me | Dados do usuário logado |
| GET | /api/users/me | Perfil do usuário |
| POST | /api/bookings | Criar agendamento |
| GET | /api/bookings | Listar agendamentos do usuário |
| GET | /api/bookings/:id | Detalhe do agendamento |
| DELETE | /api/bookings/:id | Cancelar agendamento |
| POST | /api/payments/payment-intent | Criar Payment Intent Stripe |

### Admin (JWT + role ADMIN)
| Método | Rota | Descrição |
|---|---|---|
| GET | /api/admin/dashboard | Estatísticas gerais |
| GET | /api/admin/bookings | Todos os agendamentos |
| POST | /api/admin/barbershops | Cadastrar barbearia |
| PUT | /api/admin/barbershops/:id | Editar barbearia |
| DELETE | /api/admin/barbershops/:id | Remover barbearia |
| POST | /api/admin/barbershops/:id/services | Adicionar serviço |
| DELETE | /api/admin/services/:id | Remover serviço |

### Webhook
| Método | Rota | Descrição |
|---|---|---|
| POST | /api/payments/webhook | Webhook Stripe |

---

## 📋 Relatório de Sprints

### ✅ Sprint 0 — Infraestrutura
**Concluída em:** 15 de março de 2026
- [x] TypeScript + TypeORM configurados
- [x] Conexão com AWS RDS (PostgreSQL)
- [x] Entidades: User, Barbershop, BarbershopService, Booking
- [x] Migration inicial executada
- [x] Estrutura de diretórios completa
- [x] Repositório no GitHub configurado

### ✅ Sprint 1 — Fundação da API
**Concluída em:** 18 de março de 2026
- [x] Classe Server com padrão SOLID
- [x] AppError para erros centralizados
- [x] Variáveis de ambiente tipadas (env.ts)
- [x] Middleware global de erros
- [x] GET /api/health funcionando
- [x] CORS configurado

### ✅ Sprint 2 — Autenticação JWT
**Concluída em:** 18 de março de 2026
- [x] HashUtil com bcryptjs
- [x] UsersRepository e UsersService
- [x] AuthService com register e login
- [x] AuthMiddleware para verificação JWT
- [x] POST /auth/register, POST /auth/login, GET /auth/me

### ✅ Sprint 3 — Barbearias e Serviços
**Concluída em:** 19 de março de 2026
- [x] BarbershopsRepository e BarbershopsService
- [x] BarbershopServicesRepository e Service
- [x] GET /barbershops, /barbershops/:id, /barbershops/:id/services
- [x] Script de seed com 3 barbearias e 10 serviços

### ✅ Sprint 4 — Agendamentos
**Concluída em:** 20 de março de 2026
- [x] BookingsRepository com detecção de conflito
- [x] BookingsService com validações de negócio
- [x] Validação de ownership e cancelamento
- [x] POST, GET, DELETE /bookings protegidos por JWT

### ✅ Sprint 5 — Painel Administrativo
**Concluída em:** 20 de março de 2026
- [x] Enum UserRole (USER, ADMIN)
- [x] AdminMiddleware para autorização por role
- [x] Dashboard com estatísticas
- [x] CRUD completo de barbearias e serviços via /admin

### ✅ Sprint 6 — Pagamentos Stripe
**Concluída em:** 21 de março de 2026
- [x] Stripe SDK configurado
- [x] Enum BookingStatus (pending, confirmed, cancelled)
- [x] Campo paymentIntentId na entidade Booking
- [x] Migration AddBookingStatusAndPayment
- [x] PaymentsService com Payment Intent
- [x] Webhook handler para confirmar/cancelar bookings
- [x] Raw body middleware para assinatura Stripe

---

## 🗃️ Banco de Dados

### Relacionamentos
\`\`\`
User (1) ──────────────── (N) Booking
Barbershop (1) ─────────── (N) BarbershopService
Barbershop (1) ─────────── (N) Booking
BarbershopService (1) ───── (N) Booking
\`\`\`

### Tabelas
| Tabela | Descrição |
|---|---|
| users | Usuários com roles USER e ADMIN |
| barbershops | Barbearias cadastradas |
| barbershop_services | Serviços de cada barbearia |
| bookings | Agendamentos com status e paymentIntentId |
| migrations | Controle de versão do banco |

---

## 🔒 Segurança

- Senhas hasheadas com bcryptjs (10 rounds)
- Autenticação via JWT (Bearer Token)
- Autorização por roles (USER / ADMIN)
- Webhook Stripe verificado por assinatura HMAC
- Variáveis sensíveis em .env (nunca versionadas)
- SSL obrigatório na conexão com AWS RDS

---

## 👨‍💻 Autor

Desenvolvido por **Dalmo** — 2026
