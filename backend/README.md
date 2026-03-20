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
| pg | ^8 | Driver PostgreSQL |

---

## 📁 Estrutura de Diretórios

```
backend/
├── src/
│   ├── config/                        # Configurações globais
│   │   ├── env.ts                     # Variáveis de ambiente tipadas
│   │   ├── cors.ts
│   │   ├── jwt.ts
│   │   └── swagger.ts
│   ├── database/
│   │   ├── data-source.ts             # Configuração do TypeORM DataSource
│   │   ├── seed.ts                    # Script de dados de exemplo
│   │   └── migrations/                # Migrations versionadas
│   ├── entities/                      # Entidades do banco de dados
│   │   ├── user.entity.ts
│   │   ├── barbershop.entity.ts
│   │   ├── barbershop-service.entity.ts
│   │   └── booking.entity.ts
│   ├── modules/                       # Módulos da aplicação
│   │   ├── auth/                      # Autenticação JWT
│   │   ├── users/                     # Usuários
│   │   ├── barbershops/               # Barbearias
│   │   ├── barbershop-services/       # Serviços das barbearias
│   │   ├── bookings/                  # Agendamentos
│   │   ├── admin/                     # Painel administrativo
│   │   └── payments/                  # Pagamentos (Sprint 6)
│   ├── middlewares/
│   │   ├── auth.middleware.ts         # Verificação JWT
│   │   ├── admin.middleware.ts        # Verificação de role ADMIN
│   │   └── error.middleware.ts        # Tratamento global de erros
│   ├── shared/
│   │   ├── errors/AppError.ts         # Classe de erro personalizada
│   │   └── utils/
│   │       ├── hash.ts                # Funções bcrypt
│   │       └── date.ts                # Funções de data
│   ├── routes/
│   │   └── index.ts                   # Roteador principal
│   ├── index.ts                       # Entry point da aplicação
│   └── server.ts                      # Inicialização do servidor
├── .env                               # Variáveis de ambiente (não versionado)
├── .env.example                       # Exemplo de variáveis
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório
```bash
git clone https://github.com/dalmossadev/barbearia.git
cd barbearia/backend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o `.env`:
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

### 5. Popule o banco com dados de exemplo
```bash
npm run seed
```

### 6. Inicie o servidor
```bash
npm run dev
```

---

## 📜 Scripts Disponíveis

```bash
npm run dev                    # Inicia em desenvolvimento
npm run build                  # Compila TypeScript → dist/
npm run start                  # Inicia versão compilada
npm run seed                   # Popula o banco com dados de exemplo

npm run migration:generate -- src/database/migrations/NomeDaMigration
npm run migration:run          # Aplica migrations pendentes
npm run migration:revert       # Desfaz última migration
```

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

---

## 📋 Relatório de Sprints

---

### ✅ Sprint 0 — Infraestrutura
**Concluída em:** 15 de março de 2026

- [x] Configuração do TypeScript com CommonJS
- [x] Configuração do TypeORM
- [x] Conexão com AWS RDS (PostgreSQL) funcionando
- [x] Criação das entidades: User, Barbershop, BarbershopService, Booking
- [x] Migration inicial executada com todas as tabelas
- [x] Estrutura de diretórios completa definida
- [x] README com plano de sprints
- [x] Repositório no GitHub configurado

---

### ✅ Sprint 1 — Fundação da API
**Concluída em:** 18 de março de 2026

- [x] Express instalado e configurado
- [x] Classe `Server` implementada com padrão SOLID
- [x] Classe `AppError` para tratamento de erros centralizado
- [x] Configuração tipada de variáveis de ambiente (`env.ts`)
- [x] Middleware global de tratamento de erros (`ErrorMiddleware`)
- [x] Roteador principal com endpoint `GET /api/health`
- [x] CORS configurado
- [x] Entry point da aplicação (`index.ts`) com bootstrap assíncrono

---

### ✅ Sprint 2 — Autenticação JWT
**Concluída em:** 18 de março de 2026

- [x] `HashUtil` com bcryptjs para hash de senhas
- [x] `UsersRepository` com TypeORM
- [x] `UsersService` com regras de negócio
- [x] `AuthService` com register e login
- [x] `AuthMiddleware` para verificação de JWT
- [x] `AuthController` com endpoints register, login e me
- [x] Rotas públicas: `POST /api/auth/register`, `POST /api/auth/login`
- [x] Rota protegida: `GET /api/auth/me`
- [x] DTOs: `CreateUserDTO`, `RegisterDTO`, `LoginDTO`

---

### ✅ Sprint 3 — Barbearias e Serviços
**Concluída em:** 19 de março de 2026

- [x] `BarbershopsRepository` com TypeORM
- [x] `BarbershopsService` com regras de negócio
- [x] `BarbershopsController` com findAll, findById, findServices
- [x] `BarbershopServicesRepository` e `BarbershopServicesService`
- [x] Rotas públicas: `GET /barbershops`, `/barbershops/:id`, `/barbershops/:id/services`
- [x] Script de seed com 3 barbearias e 10 serviços
- [x] DTOs: `CreateBarbershopDTO`, `CreateBarbershopServiceDTO`

---

### ✅ Sprint 4 — Agendamentos
**Concluída em:** 20 de março de 2026

- [x] `BookingsRepository` com detecção de conflito de horário
- [x] `BookingsService` com regras de negócio
- [x] Validação de data no passado
- [x] Validação de conflito de horário no mesmo serviço
- [x] Validação de ownership (usuário só cancela seu próprio agendamento)
- [x] `BookingsController` com create, findAll, findById, cancel
- [x] Todas as rotas protegidas por JWT
- [x] DTO: `CreateBookingDTO`

---

### ✅ Sprint 5 — Painel Administrativo
**Concluída em:** 20 de março de 2026

- [x] Enum `UserRole` (USER, ADMIN) adicionado à entidade User
- [x] Migration `AddRoleToUser` gerada e executada
- [x] `AdminMiddleware` para autorização por role
- [x] `AdminService` com gerenciamento completo
- [x] `AdminController` com dashboard e CRUD
- [x] Dashboard com estatísticas: total de barbearias, agendamentos, próximos e passados
- [x] Rotas admin protegidas por JWT + role ADMIN
- [x] CRUD completo de barbearias e serviços via admin
- [x] Listagem de todos os agendamentos via admin

---

### 🔄 Sprint 6 — Pagamentos (Stripe)
**Prevista para:** próxima sessão

- [ ] Instalar e configurar Stripe SDK
- [ ] Adicionar campos `status` e `paymentId` na entidade Booking
- [ ] Migration para novos campos
- [ ] Criar `PaymentService`
- [ ] Criar Payment Intent no momento do agendamento
- [ ] Webhook Stripe para confirmação de pagamento
- [ ] Atualizar status do booking após pagamento confirmado

---

## 🗃️ Banco de Dados

### Relacionamentos
```
User (1) ──────────────── (N) Booking
Barbershop (1) ─────────── (N) BarbershopService
Barbershop (1) ─────────── (N) Booking
BarbershopService (1) ───── (N) Booking
```

### Tabelas
| Tabela | Descrição |
|---|---|
| `users` | Usuários com roles USER e ADMIN |
| `barbershops` | Barbearias cadastradas |
| `barbershop_services` | Serviços de cada barbearia |
| `bookings` | Agendamentos realizados |
| `migrations` | Controle de versão do banco |

---

## 🔒 Segurança

- Senhas hasheadas com `bcryptjs` (10 rounds)
- Autenticação via JWT (Bearer Token)
- Autorização por roles (USER / ADMIN)
- Variáveis sensíveis em `.env` (nunca versionadas)
- SSL obrigatório na conexão com AWS RDS

---

## 👨‍💻 Autor

Desenvolvido por **Dalmo** — 2026
