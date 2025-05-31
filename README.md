🌾 Brain Agriculture API
API RESTful para gerenciamento de produtores, fazendas e culturas agrícolas, desenvolvida com NestJS, Prisma e PostgreSQL, seguindo princípios de Clean Architecture, SOLID e práticas modernas de engenharia de software.

🧠 Arquitetura
🧱 Estrutura Clean Architecture
O projeto é baseado na Clean Architecture, separando responsabilidades entre:

application: lógica de negócio (use cases, services)

domain: entidades e interfaces

infra: interfaces com o mundo externo (HTTP, banco de dados)

💡 Princípios SOLID e Clean Code

🔁 Inversão de Dependência

🧬 Testes Unitários
Escrito com Jest, cobrindo use cases e services.

🧪 Testes de Integração / E2E
Testes E2E com Supertest e TestingModule do NestJS.

🔐 Segurança
Rate Limiting: Protege a API contra abuso de requisições com @nestjs/throttler.

Helmet.js: Headers HTTP de segurança configurados para mitigar vulnerabilidades conhecidas.

📈 Logs e Monitoramento
Pino: Logs estruturados, rápidos e compatíveis com ferramentas de observabilidade.

Healthcheck: Endpoint GET /health para validação de status da aplicação.

Dotenv: Gerenciamento de variáveis de ambiente para diferentes contextos (dev, prod, test).

📚 Documentação
Swagger: Documentação automática acessível em /docs, descrevendo todos os endpoints, parâmetros e respostas.

README: Este arquivo serve como guia de uso, setup e boas práticas.

🐳 Docker e Containerização
📦 Dockerfile
Imagem baseada em Node lts-version.

Scripts de build e start definidos para ambiente de produção.

🔧 docker-compose.yml
Inclui:

API NestJS

PostgreSQL

Prisma migrations

▶️ Como rodar o projeto com Docker

# Clone o projeto
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

# Copie as variáveis de exemplo
cp .env.example .env

# Suba os containers
docker-compose up --build
A API estará disponível em: http://localhost:3333

# Instalar dependências
yarn install

# Build de produção
yarn build

# Rodar testes
yarn test
⚙️ CI/CD
Integração contínua com GitHub Actions.

Rodando testes e lint a cada push.

# Rodar Prisma Studio (visualizar db)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/brain_agriculture_db" npx prisma studio

✅ Requisitos
Node.js 18+

Docker + Docker Compose

Yarn (npm install -g yarn)
