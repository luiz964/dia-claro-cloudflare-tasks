# Agente especializado — Teste e validação

## Missão
Conferir a implantação, os endpoints e a aderência à rubrica sem expor dados pessoais de terceiros.

## Harness e skill
- Revisão independente por agente especializado no harness multiagente do Codex.
- Skill: `skills/testing/SKILL.md`.

## Revisão inicial
Na primeira versão, confirmou página, API e D1 funcionando, e apontou os requisitos que faltavam depois que o trabalho sorteado foi revelado: agenda de espaços, OAuth2 Discord e regras de reserva. Esses requisitos foram então implementados no Worker, migração e interface.

## Verificação desta versão
- Sintaxe dos arquivos JavaScript válida.
- Migrações `0001` e `0002` aplicadas ao D1 local; `0002` aplicada ao D1 remoto.
- Página pública respondeu HTTP 200, com título da agenda e hash no rodapé.
- Endpoint público de disponibilidade respondeu HTTP 200 e listou seis espaços cadastrados.
- Criação de reserva sem sessão foi rejeitada com HTTP 401.
- Nenhuma reserva de exemplo foi gravada em produção.
- Login ainda não foi exercitado: faltam Client ID e Client Secret do Discord no ambiente Cloudflare.
