# Dia Claro — painel de tarefas

Aplicação web em português para organizar tarefas. A interface estática é servida por Cloudflare Workers Assets; uma API no Worker grava os dados no Cloudflare D1.

> **Estado provisório:** o vídeo do sorteio mostra que o projeto específico fica oculto até a confirmação do e-mail. Este painel de tarefas é uma primeira versão técnica; as funcionalidades do projeto sorteado e a autenticação Discord ainda precisam ser alinhadas às instruções completas.

## O que já está implementado

- Criar, listar, concluir e excluir tarefas.
- Descrição opcional e filtros para todas, pendentes e concluídas.
- API JSON com validação, respostas de erro e consultas preparadas.
- Migração SQL com restrições e índice.
- Interface responsiva e acessível por teclado/leitor de tela em pontos principais.
- Licença MIT em `LICENSE`.
- Registros do harness/agentes em `docs/agents/` e skills em `skills/`.

## Rodar localmente

1. Instale as dependências com `npm install`.
2. Para desenvolvimento local, aplique a migração com `npm run db:migrate:local`.
3. Inicie o Worker com `npm run dev`.

## Publicação

Aplicação publicada em [painel-tarefas-cloudflare.painel-tarefas-cloudflare.workers.dev](https://painel-tarefas-cloudflare.painel-tarefas-cloudflare.workers.dev). O Worker usa Cloudflare Workers Assets e o banco remoto D1 `painel-tarefas-db`.

Para reproduzir em outra conta Cloudflare, faça login com `npx wrangler login`, crie um banco usando `npx wrangler d1 create painel-tarefas-db`, copie o `database_id` retornado para `wrangler.toml`, aplique `npm run db:migrate:remote` e execute `npm run deploy`.

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

Aplicação publicada e verificada com o D1 remoto. Evidências estão em `docs/VALIDACAO_REMOTA.md`. O código está em [github.com/luiz964/dia-claro-cloudflare-tasks](https://github.com/luiz964/dia-claro-cloudflare-tasks). A entrega ainda não está final: faltam o projeto sorteado, OAuth2 Discord, publicação do hash oficial (aguardando confirmação) e envio dos links no AVA.
