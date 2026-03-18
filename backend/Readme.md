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
| ts-node | latest | Execução TypeScript |
| dotenv | ^17 | Variáveis de ambiente |
| pg | ^8 | Driver PostgreSQL |

---

## 📁 Estrutura de Diretórios

```
backend/
├── src/
│   ├── config/                  # Configurações globais (env, constants)
│   ├── database/
│   │   ├── data-source.ts       # Configuração do TypeORM DataSource
│   │   └── migrations/          # Migrations versionadas
│   ├── entities/                # Entidades do banco de dados
│   │   ├── user.entity.ts
│   │   ├── barbershop.entity.ts
│   │   ├── barbershop-service.entity.ts
│   │   └── booking.entity.ts
│   ├── modules/                 # Módulos da aplicação (feature-based)
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── dto/
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   └── dto/
│   │   ├── barbershops/
│   │   │   ├── barbershops.controller.ts
│   │   │   ├── barbershops.service.ts
│   │   │   ├── barbershops.repository.ts
│   │   │   └── dto/
│   │   ├── services/
│   │   │   ├── services.controller.ts
│   │   │   ├── services.service.ts
│   │   │   ├── services.repository.ts
│   │   │   └── dto/
│   │   └── bookings/
│   │       ├── bookings.controller.ts
│   │       ├── bookings.service.ts
│   │       ├── bookings.repository.ts
│   │       └── dto/
│   ├── middlewares/             # Middlewares globais
│   │   ├── auth.middleware.ts   # Verificação JWT
│   │   └── error.middleware.ts  # Tratamento de erros
│   ├── shared/                  # Utilitários compartilhados
│   │   ├── errors/
│   │   │   └── AppError.ts
│   │   └── utils/
│   │       └── hash.ts
│   ├── routes/
│   │   └── index.ts             # Roteador principal
│   ├── index.ts                 # Entry point da aplicação
│   └── server.ts                # Inicialização do servidor
├── .env                         # Variáveis de ambiente (não versionado)
├── .env.example                 # Exemplo de variáveis
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone <url-do-repo>
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
DATABASE_URL="postgresql://usuario:senha@host.rds.amazonaws.com:5432/nomedobanco"
NODE_ENV="development"
PORT=3000
JWT_SECRET="seu-secret-aqui"
JWT_EXPIRES_IN="7d"
```

### 4. Rode as migrations

```bash
npm run migration:run
```

### 5. Inicie o servidor

```bash
npm run dev
```

---

## 📜 Scripts Disponíveis

```bash
npm run dev                   # Inicia em desenvolvimento (ts-node)
npm run build                 # Compila TypeScript → dist/
npm run start                 # Inicia a versão compilada

npm run migration:generate -- src/database/migrations/NomeDaMigration
                              # Gera nova migration baseada nas entidades
npm run migration:run         # Aplica todas as migrations pendentes
npm run migration:revert      # Desfaz a última migration
```

---

## 🗃️ Banco de Dados

### Entidades e Relacionamentos

```
User (1) ──────────── (N) Booking
Barbershop (1) ─────── (N) BarbershopService
Barbershop (1) ─────── (N) Booking
BarbershopService (1) ─ (N) Booking
```

### Tabelas criadas

| Tabela | Descrição |
|---|---|
| `users` | Usuários da plataforma |
| `barbershops` | Barbearias cadastradas |
| `barbershop_services` | Serviços oferecidos por cada barbearia |
| `bookings` | Agendamentos realizados |
| `migrations` | Controle de versão do banco |

---

## 🗺️ Plano de Sprints

### ✅ Sprint 0 — Infraestrutura (Concluída)
- [x] Configuração do TypeScript
- [x] Configuração do TypeORM
- [x] Conexão com AWS RDS (PostgreSQL)
- [x] Criação das entidades
- [x] Migration inicial executada
- [x] Estrutura de diretórios definida

---

### 🔄 Sprint 1 — Fundação da API
**Objetivo:** Servidor rodando com rotas básicas e tratamento de erros

- [ ] Instalar e configurar Express
- [ ] Criar middleware de tratamento de erros global (`AppError`)
- [ ] Criar roteador principal (`src/routes/index.ts`)
- [ ] Criar endpoint `GET /health` para verificação do servidor
- [ ] Criar `.env.example`
- [ ] Configurar CORS

---

### 🔄 Sprint 2 — Autenticação
**Objetivo:** Sistema completo de registro e login com JWT

- [ ] Instalar `bcryptjs` e `jsonwebtoken`
- [ ] Criar `UserRepository`
- [ ] Criar `UserService` (criar usuário, buscar por email)
- [ ] Criar `AuthService` (register, login, validar token)
- [ ] Criar `AuthController` (POST /auth/register, POST /auth/login)
- [ ] Criar middleware JWT (`auth.middleware.ts`)
- [ ] Criar `GET /users/me` (rota autenticada)

---

### 🔄 Sprint 3 — Barbearias e Serviços
**Objetivo:** CRUD completo de barbearias e serviços

- [ ] Criar `BarbershopRepository`
- [ ] Criar `BarbershopService`
- [ ] Criar `BarbershopController`
  - `GET /barbershops` — listar todas
  - `GET /barbershops/:id` — buscar por id
  - `GET /barbershops/:id/services` — serviços da barbearia
- [ ] Criar `BarbershopServiceRepository`
- [ ] Criar `BarbershopServiceService`
- [ ] Criar rotas de serviços
- [ ] Criar script de seed para popular o banco com dados de exemplo

---

### 🔄 Sprint 4 — Agendamentos
**Objetivo:** Sistema de agendamento com validações de conflito

- [ ] Criar `BookingRepository`
- [ ] Criar `BookingService`
  - Validar disponibilidade de horário
  - Validar conflito de agendamentos
- [ ] Criar `BookingController`
  - `POST /bookings` — criar agendamento
  - `GET /bookings` — listar agendamentos do usuário
  - `GET /bookings/:id` — detalhe do agendamento
  - `DELETE /bookings/:id` — cancelar agendamento
- [ ] Todas as rotas de booking protegidas por JWT

---

### 🔄 Sprint 5 — Painel Administrativo
**Objetivo:** Rotas administrativas para gerenciar barbearias

- [ ] Criar role `ADMIN` no usuário
- [ ] Criar middleware de autorização por role
- [ ] Criar rotas admin:
  - `POST /admin/barbershops` — cadastrar barbearia
  - `PUT /admin/barbershops/:id` — editar barbearia
  - `DELETE /admin/barbershops/:id` — remover barbearia
  - `POST /admin/barbershops/:id/services` — adicionar serviço
  - `GET /admin/bookings` — listar todos os agendamentos
- [ ] Dashboard com estatísticas básicas

---

### 🔄 Sprint 6 — Pagamentos (Stripe)
**Objetivo:** Integração de pagamentos no fluxo de agendamento

- [ ] Instalar e configurar Stripe SDK
- [ ] Criar `PaymentService`
- [ ] Criar Payment Intent no momento do agendamento
- [ ] Webhook Stripe para confirmação de pagamento
- [ ] Atualizar status do booking após pagamento

---

## 🔒 Segurança

- Senhas hasheadas com `bcryptjs`
- Autenticação via JWT (Bearer Token)
- Variáveis sensíveis em `.env` (nunca versionadas)
- SSL obrigatório na conexão com AWS RDS

---

## 👨‍💻 Autor

Desenvolvido por **Dalmo** — 2026