# Validação V8 — Modo Simulado de Prova

Data da validação: 10/08/2026.

## Banco de questões

- Total: **395**
- Fiscal de Posturas: **203**
- Operador Social: **192**
- Cobertura do edital no banco: **230/230 tópicos**
- IDs únicos: **395/395**
- Distribuição dos gabaritos: **A 99 / B 99 / C 99 / D 98**
- Todas as disciplinas continuam com quantidade suficiente para três simulados iniciais completos sem repetição obrigatória.

## Composição do simulado

- Fiscal de Posturas: **50 questões / 100 pontos ponderados**
- Operador Social: **40 questões / 100 pontos ponderados**
- Duração configurada: **210 minutos (3h30)**

A duração corresponde ao item 8.7.1 do Edital 73/2026. O item 8.7.2 prevê 4 opções de resposta por questão.

## Recursos V8 verificados estaticamente

- persistência do simulado ativo via `santos:activeQuiz`;
- cronômetro contínuo;
- finalização automática ao zerar;
- cartão-resposta;
- navegação livre por número;
- Anterior/Próxima;
- marcação de questão para revisar;
- alteração de resposta antes da finalização;
- confirmação de questões em branco;
- relatório por disciplina;
- relatório de assuntos fracos;
- gabarito comentado pós-prova;
- envio ao Caderno de Erros.

## Regra crítica: nenhuma correção durante a prova

O validador extrai a função `renderSimulationQuestion` e falha caso ela passe a acessar:

- `q.answer`;
- `q.explanation`;
- `sourceLink(q)`.

Resultado atual: **BLOQUEADO DURANTE A PROVA**.

A função de resultado final, por outro lado, é obrigada pelo validador a conter o gabarito e o comentário.

Resultado atual: **GABARITO COMENTADO PÓS-PROVA OK**.

## Testes executados

```text
node --check standalone/app.js       OK
node VALIDACAO_V7.js                 OK
node VALIDACAO_V8.js                 OK
```

Arquivos estáticos foram servidos por HTTP local e `index.html` respondeu HTTP 200.

A tentativa de renderização automatizada via Chromium headless não concluiu dentro do limite do ambiente. Por isso, essa etapa não é marcada como aprovada; a validação registrada acima é estrutural, de sintaxe, dados e HTTP.

## Resultado

**OK**
