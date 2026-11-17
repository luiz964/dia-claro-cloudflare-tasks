# Plano do trabalho

Os itens abaixo resumem a rubrica mostrada no vídeo do enunciado. Ela é material de referência do trabalho; as decisões de implementação deste projeto são uma proposta inicial.

## Lista de tarefas

- [x] Definir um produto simples que permita demonstrar interface, API e persistência.
- [x] Criar interface em HTML, CSS e JavaScript.
- [x] Implementar API serverless no Cloudflare Worker.
- [x] Definir schema e migração para Cloudflare D1.
- [x] Documentar arquitetura, endpoints e publicação.
- [x] Fazer revisão de backend, interface e teste/validação com três agentes independentes e registrar o harness.
- [x] Criar skills para os três agentes especializados.
- [x] Conferir sintaxe, aplicar migração local e fazer verificação rápida dos fluxos principais.
- [x] Autorizar o Wrangler, criar banco D1 e preencher o `database_id` no `wrangler.toml`.
- [x] Rodar localmente e corrigir problemas encontrados.
- [x] Publicar na Cloudflare e confirmar a URL e a persistência.
- [x] Criar repositório público no GitHub e enviar os arquivos.
- [x] Incluir licença MIT.
- [x] Registrar evidências de aplicação, API, banco e documentação em `docs/VALIDACAO_REMOTA.md`.
- [ ] Receber o título e as instruções completas do projeto sorteado, ocultas até confirmar o e-mail.
- [ ] Implementar o projeto sorteado e login Discord OAuth2 (user_id, nome, avatar) com validação de regras no Worker.
- [x] Incluir o hash oficial no README e no rodapé (autorizado pelo aluno).
- [ ] Enviar as URLs do app e do GitHub ao AVA depois de autorização para submeter.

## Mapeamento da rubrica (100 pontos)

| Critério lido no vídeo | Peso | Evidência planejada |
| --- | ---: | --- |
| Aplicação online na Cloudflare Pages/Workers | 25 | URL pública e captura da aplicação |
| Arquitetura serverless, D1 e OAuth2 Discord | 25 | Worker, D1, OAuth2 (a implementar) e validação server-side |
| Interface web HTML, CSS e JavaScript | 15 | Interface responsiva e captura de uso |
| Engenharia de agentes, harness e skills; mínimo de 3 agentes (um para teste/validação) | 25 | Harness e registros em `docs/agents/`, skills em `skills/` |
| Repositório público, licença MIT, hash no README/rodapé e entrega no AVA | 10 | GitHub público e licença feitos; hash/AVA pendentes de autorização |

## Agentes planejados

1. Produto e requisitos — transforma critérios em escopo demonstrável.
2. Backend e dados — revisa Worker, API, validação e persistência D1.
3. Interface e acessibilidade — revisa experiência, responsividade e estados da UI.

Os registros descrevem as três contribuições reais feitas nesta etapa: um agente de produto (principal), um revisor de backend/D1 e um revisor de interface/acessibilidade.

## Verificação local

- `npm install`: concluído sem vulnerabilidades reportadas.
- `node --check src/index.js` e `node --check public/app.js`: concluídos.
- Migração `0001_create_tasks.sql`: aplicada ao D1 local.
- Verificação rápida local: página e health check retornaram 200; criação, conclusão e exclusão funcionaram; `done` inválido foi rejeitado com 400.

## Verificação remota

- A página publicada e `/api/health` retornaram HTTP 200.
- A API criou uma tarefa no D1 remoto, listou o registro, marcou como concluído e o removeu após a verificação.
- Veja `docs/VALIDACAO_REMOTA.md` para a URL e o resumo da publicação.

## Repositório

Código publicado em [github.com/luiz964/dia-claro-cloudflare-tasks](https://github.com/luiz964/dia-claro-cloudflare-tasks).
