# 🌦️ Dash.Weather — Full-Stack Observability + AI Insights

Uma plataforma completa para coleta, processamento, armazenamento e visualização de dados climáticos, construída com múltiplas linguagens e arquitetura moderna baseada em microsserviços, mensageria e IA.

## 📌 Arquitetura Geral

```
Python (Producer)
      ↓ envia JSON
RabbitMQ (Fila)
      ↓ mensagem
Go Worker (Consumer)
      ↓ HTTP POST
NestJS API
      ↓ persiste
MongoDB
      ↓ consumo
React Dashboard (Vite + Tailwind + shadcn/ui)
      ↓
Geração de Insights via IA (Gemini / Groq / OpenAI)
```

## 🧩 Tecnologias Utilizadas

### Frontend
- React + Vite  
- TailwindCSS  
- shadcn/ui  
- React Query  
- JWT Auth  

### Backend (API)
- NestJS (TypeScript)
- MongoDB + Mongoose
- Swagger
- Autenticação JWT
- Exportação CSV/XLSX

### Mensageria e Processamento
- Python (Data producer + scheduler)
- Open-Meteo API
- RabbitMQ
- Go Worker (consumer + retry + delivery)

### IA
- Gemini 

### Infra
- Docker & Docker Compose
- Containers modularizados
- Configuração via `.env`

## 🌦️ Funcionalidades Principais

### 1. Coleta Climática Automática (Python)
- Execução periódica (cron/scheduler)
- Coleta dados reais na Open-Meteo
- Normalização e envio para RabbitMQ
- Logging estruturado + resiliência

### 2. Pipeline de Mensageria (RabbitMQ + Go)
- Go worker escutando fila `weather`
- ACK/NACK + retry automático
- Envio dos dados para API NestJS

### 3. API NestJS (Core do Sistema)
- Recebe dados do worker Go
- Salva no MongoDB
- Endpoints REST:
  - `/weather/logs`
  - `/weather/export.csv`
  - `/weather/export.xlsx`
  - `/weather/insights`
- CRUD de usuários
- Login com JWT
- Usuário padrão criado automaticamente

### 4. Dashboard React (Vite + shadcn/ui)
- Login/Logout
- Gráficos (temperatura, umidade)
- Tabela com histórico
- Cards com métricas atuais
- Exportação de CSV/XLSX
- Insights de IA

### 5. IA de Insights
- Resumos inteligentes
- Tendências climáticas
- Alertas (chuva, calor extremo, resfriamento)
- Pontuação de conforto climático

## 📁 Estrutura do Projeto

```
/
├── python-app/
├── worker-go/
├── nest-api/
├── frontend/
└── docker-compose.yml
```

## ⚙️ Como Rodar (Docker Compose)

### 1. Configurar `.env`

## python-api

```
WEATHER_PROVIDER=open-meteo
LATITUDE=-21.7611
LONGITUDE=-43.3496
WEATHER_INTERVAL_SECONDS=3600

RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672/
RABBITMQ_EXCHANGE=weather_exchange
RABBITMQ_QUEUE=weather_queue
RABBITMQ_ROUTING_KEY=weather.logs

APP_HOST=0.0.0.0
APP_PORT=8000
LOG_LEVEL=INFO
```

## nest-api

```
NODE_ENV=development
PORT=3001
MONGO_URI=mongodb://mongo:27017/weather_db

JWT_SECRET=supersecret
JWT_EXPIRES_IN=1d

REFRESH_TOKEN_SECRET=algumoutrosecret
REFRESH_TOKEN_EXPIRES_IN=7d

GEMINI_API_KEY=

CORS_ORIGIN=*
```
## worker go
```
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672/
RABBITMQ_QUEUE=weather_queue

# NestJS API
NEST_API_URL=http://nest-api:3000/api/weather/logs

# Logging level
LOG_LEVEL=debug
```

### 2. Subir todos os serviços

```bash
docker compose up --build
```

### 3. Acessar os serviços

| Serviço | URL |
|--------|-----|
| NestJS API | http://localhost:3001/api |
| Dashboard Frontend dev| http://localhost:5173 |
| Dashboard Frontend prod| http://localhost:3333 |
| RabbitMQ UI | http://localhost:15672 |
| Mongo Express | http://localhost:27017 |

## 📚 Endpoints Principais

### Weather
```
POST /api/weather/logs
GET  /api/weather/logs
GET  /api/weather/last
GET  /api/weather/export.csv
GET  /api/weather/export.xlsx
POST /api/weather/insights
```

### Usuários
```
GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

### Auth
```
POST /api/auth/login
```

## 🧠 Decisões Técnicas
- Arquitetura orientada a eventos com RabbitMQ  
- Worker Go pela performance  
- NestJS como API central  
- MongoDB para histórico temporal  
- Dashboard moderno com React  

### Video do Projeto

https://youtu.be/5lfgakZJGAs

## 🏁 Como Contribuir
Pull Requests são bem-vindos.

## 📄 Licença
MIT
