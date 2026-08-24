# Auditoria do banco de questões Transpetro — 2023

Data da auditoria: 24/08/2026

## Resultado

O banco real já contém as **70 questões originais da prova CESGRANRIO Transpetro 2023.2 — Administração**.

A distribuição validada é:

- Língua Portuguesa: 10 questões (1–10)
- Língua Inglesa: 10 questões (11–20)
- Conhecimentos Específicos de Administração: 50 questões (21–70)
- Total: 70 questões
- Todas as questões possuem cinco alternativas A–E
- Todas possuem gabarito A–E válido

O dataset histórico completo contém:

- 2011: 70 questões
- 2012: 70 questões
- 2023: 70 questões
- Total: 210 questões reais
- Conhecimentos Específicos de Administração: 150 questões

## Conferência independente da prova de 2023

A prova de Administração 2023 enviada pelo usuário foi lida diretamente do PDF. Foram localizados e separados os 70 enunciados, incluindo as cinco alternativas de cada questão.

O gabarito oficial enviado pelo usuário também foi lido diretamente do PDF e contém resposta para as 70 questões. A distribuição da prova confere com o dataset: 10 Português + 10 Inglês + 50 Específicas.

## Diagnóstico do problema das “38 bloqueadas”

As 38 questões não estavam ausentes do banco. O problema estava no simulador criado posteriormente.

O pack oficial possui uma coleção separada de contextos (`dataset.contexts`) e as questões que dependem desses textos usam `contextId`. O simulador anterior verificava apenas um campo `context` dentro da própria questão e, por isso, classificava falsamente questões reais como “contexto ausente”.

Os textos-base já existentes no dataset incluem:

- `2011-pt` — Um pouco de silêncio
- `2011-en` — Model copes with chaos to deliver relief
- `2012-pt` — Science fiction
- `2012-en` — Safety Meeting Presentation
- `2023-pt` — À moda brasileira
- `2023-en` — How space technology is bringing green wins for transport

Também existem elementos visuais reconstruídos para questões históricas que dependem de figura/gráfico.

Portanto, **não devem ser criadas 38 questões substitutas autorais** e **não devem ser removidas as questões reais** por esse motivo.

## Correção aplicada

O simulador V4 passa a usar diretamente:

```js
q.contextId -> dataset.contexts[q.contextId]
```

Com isso, o texto-base é exibido dentro do simulado antes do primeiro item que o utiliza e pode ser reaberto nas questões seguintes, sem abrir uma prova externa.

O simulador também valida em tempo de execução as 70 questões de 2023 verificando:

- enunciado presente;
- cinco alternativas A–E;
- gabarito válido;
- contexto existente quando houver `contextId`.

A tela inicial mostra a contagem `2023 auditadas` para tornar qualquer regressão imediatamente visível.

## Prioridade em relação ao edital 2026

A prova de 2023 é a fonte prioritária por ser a mais recente e por ser especificamente de Administração.

Depois de esgotadas as questões inéditas de 2023, devem ser priorizadas questões reais de 2012 e 2011 classificadas no dataset como aderentes ao conteúdo programático de Administração de 2026.

O edital 2026 contém, entre outros, os seguintes eixos usados nessa classificação:

- Administração Financeira e Orçamentária
- Administração da Produção e Compras
- Contratação — Lei 13.303/2016 e LC 123/2006
- Gerenciamento de Projetos
- Conflitos e Negociação
- Administração de Sistemas de Informação
- Estratégia Empresarial
- Administração Mercadológica
- Contabilidade
- Processo Decisório
- Administração de Recursos Humanos
- Lógica
- Estatística
- Sustentabilidade e Responsabilidade Socioambiental

## Regra de integridade daqui em diante

Uma questão real só deve ser considerada utilizável quando possuir enunciado, alternativas, gabarito e todo texto/figura/tabela indispensável à resolução. O material compartilhado deve permanecer dentro da interface do simulado.
