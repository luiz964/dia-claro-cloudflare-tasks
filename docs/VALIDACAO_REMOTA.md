# Validação da publicação

- Aplicação: https://painel-tarefas-cloudflare.painel-tarefas-cloudflare.workers.dev
- Health check: `GET /api/health` respondeu HTTP 200.
- Interface: `GET /` respondeu HTTP 200 e serviu a página “Painel de tarefas”.
- Persistência: uma tarefa temporária foi criada via API, apareceu em `GET /api/tasks`, foi atualizada para concluída e depois removida.
- Resultado: o Worker conectou ao binding D1 remoto `DB` e completou o ciclo de gravação/leitura/atualização/exclusão.
- Migração: `0001_create_tasks.sql` aplicada ao banco remoto `painel-tarefas-db`.

O registro temporário foi excluído após a validação; nenhum dado de exemplo ficou no banco.
