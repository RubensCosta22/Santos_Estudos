# Metodologia do banco de questões — padrão IBAM

A V7 usa **questões originais**, sem copiar enunciados de provas anteriores. O objetivo é reproduzir características recorrentes observadas em provas oficiais do IBAM, especialmente para cargos municipais de nível médio e áreas próximas a Fiscalização e Assistência Social.

## Padrões observados

- questões objetivas com **4 alternativas (A, B, C e D)**;
- uma alternativa correta;
- enunciados diretos do tipo “de acordo com”, “nos termos de” e “é correta a seguinte afirmativa”;
- cobrança de literalidade e compreensão da norma, sem abandonar aplicação prática;
- situações-problema com nomes e contexto cotidiano para exigir enquadramento jurídico ou técnico;
- alternativas incorretas próximas do conteúdo correto, frequentemente com generalizações, inversões ou absolutizações;
- em Português, texto-base seguido por interpretação, inferência, sentido contextual e gramática aplicada;
- em áreas socioassistenciais, situações envolvendo atribuições, proteção de direitos, ECA/SUAS e atendimento;
- em fiscalização, situações envolvendo constatação, documentos, poder de polícia, medidas administrativas e legislação municipal.

## Fontes usadas para calibrar o estilo

1. IBAM — prova oficial de Fiscal de Posturas, Município de Arraial do Cabo/RJ, Edital 02/2025:
   https://www.ibam-concursos.org.br/documento/Fis_Pos.pdf
2. IBAM — prova oficial de Educador Social, Município de Arraial do Cabo/RJ, Edital 02/2025:
   https://www.ibam-concursos.org.br/documento/Edu_soc.pdf
3. IBAM — prova oficial de Auxiliar Administrativo, Município de Arraial do Cabo/RJ, Edital 02/2025:
   https://www.ibam-concursos.org.br/documento/Aux_adm.pdf
4. IBAM-SP — Concurso Público de Santos 73/2026, que inclui Fiscal de Posturas e Operador Social:
   https://www.ibamsp-concursos.org.br/informacoes/178/

## Regras do banco

- Não são “questões IBAM” oficiais; são **questões autorais inspiradas no padrão da banca**.
- Toda questão possui quatro alternativas e gabarito comentado.
- Questões jurídicas/técnicas podem apontar para a fonte oficial já cadastrada na biblioteca.
- O gabarito foi distribuído de forma equilibrada entre A, B, C e D para não criar padrão artificial.
- O desempenho é salvo no LocalStorage e alimenta o cálculo de prioridade do cronograma.
- Simulados completos usam a distribuição real de questões e pesos do edital cadastrado na plataforma.


## Evolução na V7

- banco ampliado para 395 questões;
- 230/230 tópicos do edital possuem ao menos uma questão;
- cada disciplina possui volume para pelo menos três simulados completos diferentes a partir de um histórico vazio;
- blocos e simulados priorizam questões nunca respondidas ou menos recentes;
- auditoria de consistência semântica de gabaritos adicionada ao validador;
- as posições A–D são balanceadas sem alterar qual texto é semanticamente correto.
