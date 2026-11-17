# Plano do trabalho

Os itens abaixo resumem a rubrica mostrada no vídeo do enunciado. Ela é material de referência do trabalho; as decisões de implementação deste projeto são uma proposta inicial.

## Lista de tarefas

- [x] Definir um produto simples que permita demonstrar interface, API e persistência.
- [x] Criar interface em HTML, CSS e JavaScript.
- [x] Implementar API serverless no Cloudflare Worker.
- [x] Definir schema e migração para Cloudflare D1.
- [x] Documentar arquitetura, endpoints e publicação.
- [x] Fazer revisão de produto, backend e interface com três agentes e registrar as contribuições.
- [x] Criar três skills de apoio para os papéis especializados.
- [x] Conferir sintaxe, aplicar migração local e fazer verificação rápida dos fluxos principais.
- [ ] Criar banco D1 e preencher o `database_id` no `wrangler.toml`.
- [x] Rodar localmente e corrigir problemas encontrados.
- [ ] Publicar na Cloudflare e confirmar a URL e a persistência.
- [ ] Criar repositório público no GitHub e enviar os arquivos.
- [ ] Capturar evidências de aplicação, API, banco e documentação.
- [ ] Conferir o texto completo da rubrica e adaptar se houver requisito que não aparece legível no vídeo.

## Mapeamento da rubrica (100 pontos)

| Critério lido no vídeo | Peso | Evidência planejada |
| --- | ---: | --- |
| Aplicação online na Cloudflare Pages/Workers | 25 | URL pública e captura da aplicação |
| Arquitetura serverless com Cloudflare D1 | 25 | Worker, binding D1, migração e dados persistentes |
| Interface web HTML, CSS e JavaScript | 15 | Interface responsiva e captura de uso |
| Engenharia de agentes, documentação e skills; mínimo de 3 agentes | 25 | Papéis/registros em `docs/agents/` e skills em `skills/` |
| Repositório público no GitHub | 10 | URL pública e histórico de commits |

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

Isso não valida uma instância remota nem substitui a publicação final.
