# Validação da publicação

- Aplicação: https://painel-tarefas-cloudflare.painel-tarefas-cloudflare.workers.dev
- Interface e agenda: a página responde HTTP 200 e lista os seis espaços cadastrados.
- Regras: a suíte `npm test` passou em 10 verificações com Worker e D1 locais, incluindo autenticação, conflito, limite de 120 minutos, privacidade e cancelamento.
- Sintaxe: `node --check src/index.js`, `node --check public/app.js` e `node --check tests/integration.mjs` concluídos.
- D1 remoto: sem migrações pendentes.
- OAuth de produção: o Discord retornou “Formato de formulário inválido”. A inspeção do redirect mostrou que `DISCORD_CLIENT_ID` contém texto de comando em vez do ID numérico da aplicação. O Worker agora detecta ID malformado e desativa o botão de login até o secret ser corrigido.
- Para corrigir: no PowerShell, rode `npx.cmd wrangler secret put DISCORD_CLIENT_ID` e, somente no prompt `Enter a secret value`, cole o **Application ID numérico** em Discord Developer Portal → General Information. Não envie esse valor nem o Client Secret pelo chat.

O endereço público está no topo do README e o código/documentação está no repositório público: https://github.com/luiz964/dia-claro-cloudflare-tasks.
Nenhuma reserva de teste foi gravada na produção.
