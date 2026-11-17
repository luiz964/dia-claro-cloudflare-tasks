# Dia Claro — painel de tarefas

Aplicação web em português para organizar tarefas. A interface estática é servida por Cloudflare Workers Assets; uma API no Worker grava os dados no Cloudflare D1.

## O que já está implementado

- Criar, listar, concluir e excluir tarefas.
- Descrição opcional e filtros para todas, pendentes e concluídas.
- API JSON com validação, respostas de erro e consultas preparadas.
- Migração SQL com restrições e índice.
- Interface responsiva e acessível por teclado/leitor de tela em pontos principais.

## Rodar localmente

1. Instale as dependências com `npm install`.
2. Para desenvolvimento local, aplique a migração com `npm run db:migrate:local`.
3. Inicie o Worker com `npm run dev`.

Para publicar diretamente com Wrangler, faça login com `npx wrangler login`, crie o banco usando `npx wrangler d1 create painel-tarefas-db`, copie o `database_id` retornado para `wrangler.toml`, aplique `npm run db:migrate:remote` e execute `npm run deploy`.

## Endpoints

| Método | Caminho | Ação |
| --- | --- | --- |
| GET | `/api/health` | Verifica o Worker |
| GET | `/api/tasks` | Lista tarefas |
| POST | `/api/tasks` | Cria tarefa (`title`, `description?`) |
| PATCH | `/api/tasks/:id` | Atualiza título, descrição ou estado concluído |
| DELETE | `/api/tasks/:id` | Exclui tarefa |

## Evidências para entregar

- URL pública funcionando na Cloudflare.
- Repositório GitHub público com código e histórico.
- Capturas da aplicação e dos endpoints/API.
- Este README, migração SQL e registros dos agentes em `docs/agents/`.
- Três registros de agentes e três skills em `skills/`, usados como papéis especializados na construção/revisão.

## Estado

Aplicação e migração conferidas localmente. O código está em [github.com/luiz964/dia-claro-cloudflare-tasks](https://github.com/luiz964/dia-claro-cloudflare-tasks). A publicação remota ainda depende da autorização Cloudflare e da criação do banco D1 remoto.
