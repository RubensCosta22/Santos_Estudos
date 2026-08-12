# Transpetro V10 — 210 questões reais

## Arquivos para subir na raiz do repositório

Suba estes dois arquivos para a raiz de `RubensCosta22/Santos_Estudos`, branch `Rcosta22`:

- `transpetro-question-pack.js`
- `transpetro-questions-addon.js`

O arquivo `transpetro-questions-source.js` é apenas backup/auditoria do dataset descompactado; não é necessário para o app em produção.

## Alteração no index.html

No final do `index.html`, hoje existe:

```html
<script type="module" src="./app.js"></script>
<script type="module" src="./transpetro-module.js"></script>
```

Adicione imediatamente depois:

```html
<script type="module" src="./transpetro-questions-addon.js"></script>
```

O final deve ficar:

```html
<script type="module" src="./app.js"></script>
<script type="module" src="./transpetro-module.js"></script>
<script type="module" src="./transpetro-questions-addon.js"></script>
</body>
</html>
```

## Não subir os arquivos tpq-chunk-*.js

Eles eram uma tentativa intermediária de contornar o limite do conector do GitHub e não são necessários com este pacote final.

## Supabase

A tabela `public.transpetro_question_state` já foi criada em produção com RLS e políticas por `auth.uid()`. Nenhuma ação manual é necessária no Supabase.

## Dataset validado

- 210 questões reais
- 2011: 70
- 2012: 70
- 2023: 70
- 5 alternativas A–E em 210/210
- gabarito A–E válido em 210/210
- 150 questões específicas de Administração
- separação entre aderência direta ao edital 2026 e conteúdo apenas histórico
- questões com elementos visuais reconstruídas no módulo quando necessário

## Após o upload

O Render está com auto-deploy na branch `Rcosta22`. O commit dispara a publicação automaticamente.
