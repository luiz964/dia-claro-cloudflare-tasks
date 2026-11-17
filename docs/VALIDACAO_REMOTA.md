# Validação da publicação

- Aplicação: https://painel-tarefas-cloudflare.painel-tarefas-cloudflare.workers.dev
- Interface: `GET /` respondeu HTTP 200 e contém a agenda Vértice e a chave oficial no rodapé.
- Disponibilidade: `GET /api/availability?date=2026-11-17` respondeu HTTP 200 e retornou seis espaços cadastrados; nenhuma reserva de teste foi criada.
- Autorização: `POST /api/reservations` sem sessão respondeu HTTP 401.
- Banco: migração `0002_reservation_scheduler.sql` aplicada ao D1 remoto `painel-tarefas-db`.
- Sintaxe: `node --check src/index.js` e `node --check public/app.js` concluídos; migrações local e remota aplicadas.
- OAuth: `/api/auth/status` confirma que a configuração ainda está pendente; a interface apresenta esse estado sem deixar um botão de login inoperante. A URI de callback de produção está em `wrangler.toml`.
- Repositório público: https://github.com/luiz964/dia-claro-cloudflare-tasks

A tela e a consulta pública estão online. Para habilitar login, é necessário registrar a aplicação OAuth no Discord, gravar o Client ID como variável e o Client Secret como segredo no Cloudflare e fazer novo deploy.
