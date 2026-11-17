# Vértice — agenda de espaços

Aplicação para consultar e reservar salas de reunião, cabines de estudo e bancadas de laboratório. A interface diária diferencia horários livres, reservas da pessoa autenticada e reservas feitas por terceiros. O frontend usa HTML, CSS e JavaScript sem framework; o backend roda em Cloudflare Workers e persiste dados no D1.

## Funcionalidades

- Grade diária de 08:00 a 20:00 em intervalos de 30 minutos, com navegação de datas e recursos agrupados por tipo.
- Cores distintas para horários livres, reservas próprias e reservas de outras pessoas.
- Login e logout via OAuth2 Discord (`identify`); perfil com ID, nome de usuário, nome de exibição e avatar armazenado no D1.
- Reservas com duração de 30, 60, 90 ou 120 minutos.
- Validação server-side para impedir horários passados, sobreposições no mesmo espaço e mais de 120 minutos ativos por pessoa/dia.
- Cancelamento pelo titular antes do início do horário.
- Layout responsivo e chave oficial do trabalho no README e rodapé.

## Rodar localmente

1. Instale dependências: `npm install`.
2. Aplique as migrações locais: `npm run db:migrate:local`.
3. No [Discord Developer Portal](https://discord.com/developers/applications), crie uma aplicação, abra **OAuth2 → Redirects** e adicione `https://painel-tarefas-cloudflare.painel-tarefas-cloudflare.workers.dev/api/auth/discord/callback`.
4. No terminal, na pasta do projeto, grave Client ID e Client Secret como secrets com `npx wrangler secret put DISCORD_CLIENT_ID` e `npx wrangler secret put DISCORD_CLIENT_SECRET`. Digite os valores no prompt do Wrangler; não os coloque no código nem no repositório.
5. Publique de novo com `npm run deploy`.
6. Para desenvolvimento local, configure as variáveis locais equivalentes e o redirect URI do endereço local antes de executar `npm run dev`.

## Publicação

Aplicação: [painel-tarefas-cloudflare.painel-tarefas-cloudflare.workers.dev](https://painel-tarefas-cloudflare.painel-tarefas-cloudflare.workers.dev). O Worker usa Workers Assets e o D1 remoto `painel-tarefas-db`.

Para publicar: aplique `npm run db:migrate:remote` e rode `npm run deploy`. A URI de callback de produção fica em `wrangler.toml`. Configure `DISCORD_CLIENT_ID` e `DISCORD_CLIENT_SECRET` como secrets. O Client Secret nunca deve entrar no repositório.

## Chave única oficial

`P26-2A-5665-AB35-3EB7-E9EB`

## API

| Método | Caminho | Acesso | Ação |
| --- | --- | --- | --- |
| GET | `/api/availability?date=AAAA-MM-DD` | Público | Lista espaços e reservas do dia sem expor identidade de terceiros |
| GET | `/api/me` | Discord | Perfil da pessoa autenticada |
| GET | `/api/auth/discord/start` | Público | Inicia OAuth2 Discord |
| GET | `/api/auth/discord/callback` | OAuth2 | Valida estado e grava/atualiza perfil no D1 |
| GET | `/api/auth/status` | Público | Informa se OAuth2 está configurado sem expor credenciais |
| POST | `/api/reservations` | Discord | Cria reserva com regras de negócio no Worker |
| DELETE | `/api/reservations/:id` | Discord/titular | Cancela reserva futura própria |
| POST | `/api/auth/logout` | Sessão | Encerra sessão |

## Repositório e entrega

Código-fonte: [github.com/luiz964/dia-claro-cloudflare-tasks](https://github.com/luiz964/dia-claro-cloudflare-tasks). Licença MIT em `LICENSE`; documentos do harness em `docs/agents/` e skills em `skills/`.

## Chave oficial

`P26-2A-5665-AB35-3EB7-E9EB`
