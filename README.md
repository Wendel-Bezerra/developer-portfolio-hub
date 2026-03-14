# Especificacoes do Projeto

## Visao Geral

- Tipo: portfolio web com formulario de contato
- Arquitetura: frontend SPA + API Node.js/Express para envio de email
- Linguagens principais: TypeScript (frontend) e JavaScript ESM (backend)
- Gerenciador de pacotes: npm

## Requisitos de Ambiente

- Node.js `20.x`
- npm (versao compativel com Node 20)

## Stack Tecnologica

- Frontend: React `18`, Vite `5`, React Router `6`
- UI: Tailwind CSS `3`, shadcn/ui (Radix UI), Lucide Icons
- Formularios/validacao: React Hook Form, Zod
- Backend/API: Express `5`, Nodemailer
- Seguranca anti-spam: Honeypot, rate limit por IP, janela de tempo de envio e Cloudflare Turnstile
- Qualidade de codigo: ESLint `9`, TypeScript `5`

## Scripts Disponiveis

- `npm run dev`: inicia o frontend (Vite)
- `npm run dev:api`: inicia a API local (`server/index.mjs`)
- `npm run dev:all`: sobe frontend + API em paralelo
- `npm run build`: build de producao do frontend
- `npm run build:dev`: build em modo development
- `npm run preview`: preview da build
- `npm run lint`: analise de lint

## Rotas Principais

- Pagina inicial:
  - `/`
  - `/en`
  - `/es`
- Pagina de contato:
  - `/contato`
  - `/en/contact`
  - `/es/contact`
- Endpoint da API:
  - `POST /api/contact`
  - `GET /api/health`

## Variaveis de Ambiente

### SMTP

- `PORT`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_TO`
- `MAIL_FROM` (opcional)

### Protecao anti-spam

- `CONTACT_RATE_WINDOW_MS`
- `CONTACT_RATE_MAX`
- `CONTACT_MIN_FILL_MS`
- `CONTACT_MAX_FILL_MS`

### Cloudflare Turnstile

- `VITE_TURNSTILE_ENABLED`
- `TURNSTILE_ENABLED`
- `VITE_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

## Estrutura Tecnica (alto nivel)

- `src/`: aplicacao frontend
- `src/pages/Contact.tsx`: formulario de contato
- `api/contact.js`: handler serverless da rota de contato
- `server/index.mjs`: API Express para execucao local
- `.env.example`: referencia oficial de configuracao de ambiente
