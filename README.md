# Santos Estudos V9 — Cloud

Plataforma de preparação para o Concurso da Prefeitura de Santos, com foco em Fiscal de Posturas e Operador Social.

## V9

- 395 questões autorais em padrão inspirado na IBAM.
- 230/230 tópicos do edital cobertos.
- Modo simulado de prova com 3h30, cartão-resposta e relatório pós-prova.
- Login por e-mail e senha com Supabase Auth.
- Dados de cada usuário sincronizados no Supabase.
- Row Level Security (RLS): cada usuário só acessa o próprio estado.
- Cache local como contingência.
- Deploy estático preparado para Render.

## Supabase

Aplique a migration:

`supabase/migrations/20260810_user_state.sql`

Variáveis necessárias no Render:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

Nunca coloque `service_role` no frontend.

## Render

Crie um Static Site apontando para este repositório.

- Build command: `bash scripts/render-build.sh`
- Publish directory: `.`

O build gera `config.js` usando as variáveis de ambiente.

## Desenvolvimento local

Copie `config.example.js` para `config.js` e preencha com a URL e a publishable key do seu projeto Supabase. Depois execute:

```bash
python -m http.server 8080
```

Abra `http://localhost:8080`.

## Validação

```bash
npm run validate
```
