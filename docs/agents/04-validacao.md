# Agente especializado — Teste e validação

## Missão
Conferir a implantação, os endpoints e a aderência à rubrica sem expor dados pessoais de terceiros.

## Harness e skill
- Revisão independente por agente especializado no harness multiagente do Codex.
- Skill: `skills/testing/SKILL.md`.

## Revisão inicial
Na primeira versão, a revisão apontou requisitos que faltavam depois que o trabalho sorteado foi revelado: agenda de espaços, OAuth2 Discord e regras de reserva. Esses requisitos foram então implementados no Worker, migração e interface.

## Verificação desta versão
- Suíte `npm test`: 10 verificações passaram com Worker e D1 locais.
- Exercitados login exigido, configuração/redirect OAuth, datas e durações inválidas, horários passados, criação, sobreposição, limite de 120 minutos, privacidade, cancelamento e logout.
- Fixtures locais fictícias foram removidas; nenhuma reserva de teste foi gravada na produção.
- Página pública HTTP 200, agenda pública HTTP 200, escrita sem sessão HTTP 401 e data inválida HTTP 400.
- D1 remoto sem migrações pendentes.
- OAuth real encontrou Client ID inválido: a aplicação Discord retornou formulário inválido. O Worker agora desativa o login quando o ID não tem formato de snowflake numérico; o Client ID correto ainda deve ser gravado pelo usuário.
