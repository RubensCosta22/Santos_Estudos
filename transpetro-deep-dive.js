export const transpetroDeepDive = {
  "Gestão de Estoques: MRP": {
    "concept": "MRP (Material Requirements Planning) transforma a demanda do produto final em necessidades de componentes, usando lista de materiais (BOM), posição de estoque, lead times e plano mestre de produção (MPS). É planejamento de demanda dependente: a necessidade de uma peça decorre do volume de produtos que a utilizam.",
    "steps": [
      "Identifique a necessidade bruta a partir do MPS e da estrutura do produto.",
      "Desconte estoques disponíveis e recebimentos programados para obter a necessidade líquida.",
      "Desloque a liberação das ordens pelo lead time para que o material chegue quando necessário."
    ],
    "example": "Para montar 100 equipamentos, cada um com 2 sensores, são necessários 200 sensores. Se existem 45 disponíveis e 25 já encomendados para chegar a tempo, a necessidade líquida é 130. Se o prazo é de 2 semanas, a ordem deve ser liberada com essa antecedência.",
    "pitfall": "MRP não é o mesmo que ponto de ressuprimento: MRP calcula necessidades dependentes no tempo; ressuprimento tradicional aciona reposição por posição de estoque."
  },
  "Ponto de Ressuprimento": {
    "concept": "O ponto de ressuprimento é a posição de estoque que dispara uma nova compra para evitar ruptura durante o prazo de entrega. Com demanda constante, PR = demanda média por período × lead time + estoque de segurança. É importante usar unidades de tempo compatíveis.",
    "steps": [
      "Calcule a demanda média por dia ou semana.",
      "Converta o lead time para a mesma unidade.",
      "Acrescente o estoque de segurança quando houver incerteza."
    ],
    "example": "Demanda de 20 unidades/dia, entrega em 6 dias e segurança de 30 unidades: PR = 20 × 6 + 30 = 150 unidades. Ao atingir essa posição, é hora de pedir.",
    "pitfall": "Não confunda ponto de pedido com quantidade a comprar: o primeiro é o gatilho; o segundo pode ser definido pelo LEC ou outra política."
  },
  "Lote Econômico de Compra": {
    "concept": "O LEC equilibra custo de emitir pedidos e custo de manter estoque. No modelo básico, Q* = √(2DS/H), com D = demanda anual, S = custo por pedido e H = custo anual de manutenção por unidade.",
    "steps": [
      "Padronize demanda e custo de manutenção para o mesmo horizonte anual.",
      "Calcule a raiz quadrada e arredonde conforme restrições operacionais.",
      "Verifique se as premissas de demanda estável e reposição previsível são plausíveis."
    ],
    "example": "D = 10.000 unidades/ano, S = R$ 50/pedido e H = R$ 2/unidade/ano: Q* = √(500.000) ≈ 707 unidades por pedido.",
    "pitfall": "LEC minimiza custos relevantes do modelo, não significa estoque mínimo nem compra obrigatória desse lote quando há descontos, restrições ou demanda variável."
  },
  "Just in Time": {
    "concept": "Just in Time busca produzir e abastecer na quantidade necessária, no momento necessário, reduzindo estoques e desperdícios. Na produção puxada, o consumo real do processo seguinte sinaliza reposição ao anterior; kanban pode ser usado para esse controle.",
    "steps": [
      "Diferencie sistema puxado de produção empurrada por previsão.",
      "Relacione lotes menores com tempos de preparação, qualidade e confiabilidade de fornecedores.",
      "Entenda que menor estoque reduz amortecimento contra falhas."
    ],
    "example": "Uma célula consome 40 peças por hora. Em vez de receber 800 peças no começo do dia, recebe pequenos lotes frequentes conforme o consumo sinalizado.",
    "pitfall": "JIT não significa estoque literalmente zero nem elimina necessidade de planejamento."
  },
  "Strategic Sourcing": {
    "concept": "Strategic Sourcing é a gestão estratégica das categorias de compra, considerando custo total de propriedade (TCO), risco de suprimento, mercado fornecedor e objetivos do negócio. Vai além de escolher o menor preço unitário.",
    "steps": [
      "Consolide gastos por categoria e avalie criticidade e riscos.",
      "Pesquise o mercado e compare fornecedores por preço, qualidade, prazo, capacidade e risco.",
      "Negocie e acompanhe contratos com indicadores de desempenho."
    ],
    "example": "Fornecedor A cobra R$ 95 por item mas tem frete alto e atraso frequente; B cobra R$ 101 e entrega com previsibilidade. O TCO pode tornar B mais vantajoso.",
    "pitfall": "Compras operacionais executam pedidos; Strategic Sourcing desenha estratégia de abastecimento e relacionamento."
  },
  "Rastreamento: RFID, Código de Barras e UID": {
    "concept": "Código de barras usa identificação óptica e normalmente exige linha de visada; RFID utiliza radiofrequência e pode permitir leitura sem contato visual direto; UID é a identificação única de um item, não uma tecnologia de leitura específica.",
    "steps": [
      "Separe identificador (qual item?) de tecnologia de captura (como ler?).",
      "Compare alcance, custo, interferências, leitura simultânea e rastreabilidade.",
      "Relacione captura de dados ao WMS/ERP e à qualidade do cadastro."
    ],
    "example": "Um pallet com etiqueta RFID pode ser identificado ao atravessar um portal; uma caixa com código de barras normalmente precisa ter a etiqueta posicionada para leitura.",
    "pitfall": "RFID não é sinônimo de GPS nem garante localização em tempo real sem infraestrutura."
  },
  "Planejamento e Controle da Produção": {
    "concept": "PCP articula previsão, capacidade, materiais, sequenciamento e acompanhamento da execução. Programação para frente inicia operações tão cedo quanto possível; programação para trás parte da data de entrega e calcula quando começar.",
    "steps": [
      "Identifique a restrição de capacidade e os tempos de processamento.",
      "Compare programações para frente e para trás.",
      "Diferencie plano agregado, plano mestre e programação detalhada."
    ],
    "example": "Pedido deve sair sexta e requer 2 dias de montagem e 1 de teste. Na programação para trás, a montagem deve começar até terça, admitindo dias úteis e ausência de folgas.",
    "pitfall": "Programar para trás não garante viabilidade se capacidade ou materiais estiverem indisponíveis."
  },
  "Supply Chain Management": {
    "concept": "SCM coordena fluxos de materiais, informações e recursos financeiros entre fornecedores, empresa, distribuidores e clientes. Busca desempenho da cadeia inteira, não apenas otimização isolada do armazém.",
    "steps": [
      "Diferencie logística interna, logística integrada e gestão da cadeia.",
      "Reconheça o efeito chicote: pequenas variações no consumo podem gerar grandes oscilações de pedidos a montante.",
      "Analise indicadores como OTIF, lead time, nível de serviço e giro de estoque."
    ],
    "example": "Compartilhar dados de venda com fornecedores reduz pedidos inflados por previsões independentes e pode diminuir o efeito chicote.",
    "pitfall": "Reduzir custo de um elo pode elevar custo total da cadeia se provocar atrasos ou rupturas."
  },
  "Matemática Financeira": {
    "concept": "Juros simples: M = C(1+in). Juros compostos: M = C(1+i)^n. A taxa e o prazo devem usar a mesma unidade temporal. Taxas efetivas equivalentes obedecem (1+i_a)=(1+i_m)^12.",
    "steps": [
      "Identifique capital, taxa, prazo e regime.",
      "Converta taxa ou prazo antes de calcular.",
      "Use desconto de fluxos para comparar valores em datas diferentes."
    ],
    "example": "R$ 1.000 a 2% ao mês por 3 meses em juros compostos: M = 1000 × 1,02³ = R$ 1.061,21.",
    "pitfall": "Não multiplique taxa mensal por 12 para obter taxa anual efetiva em juros compostos."
  },
  "Análise de Investimentos": {
    "concept": "VPL soma fluxos futuros descontados pela taxa mínima de atratividade e subtrai investimento inicial. VPL positivo indica criação de valor segundo premissas e taxa escolhidas. TIR é a taxa que zera o VPL.",
    "steps": [
      "Monte fluxos incrementais por período.",
      "Desconte cada fluxo pela taxa compatível com seu risco e prazo.",
      "Em projetos mutuamente exclusivos, examine VPL e possíveis conflitos com TIR."
    ],
    "example": "Investimento inicial de R$ 1.000 e recebimento de R$ 1.210 em 1 ano com taxa de 10%: VPL = 1210/1,10 − 1000 = R$ 100.",
    "pitfall": "Payback simples ignora valor do dinheiro no tempo e fluxos posteriores ao retorno."
  },
  "Risco x Retorno": {
    "concept": "Risco financeiro envolve variabilidade de resultados. Diversificação pode reduzir risco não sistemático; risco sistemático de mercado permanece. No CAPM, retorno exigido = taxa livre de risco + beta × prêmio de risco de mercado.",
    "steps": [
      "Diferencie risco sistemático de não sistemático.",
      "Interprete beta: maior que 1 indica sensibilidade maior que a do mercado no modelo.",
      "Relacione retorno exigido ao custo de capital e à avaliação de investimentos."
    ],
    "example": "Livre de risco 5%, beta 1,2 e prêmio de mercado 6%: retorno exigido = 5% + 1,2 × 6% = 12,2%.",
    "pitfall": "Beta não mede todo o risco de um ativo nem garante retorno realizado."
  },
  "Marketing": {
    "concept": "Marketing identifica necessidades e cria, comunica e entrega valor. A gestão conecta segmentação, público-alvo, posicionamento e composto de marketing (produto, preço, praça e promoção).",
    "steps": [
      "Diferencie necessidade, desejo e demanda.",
      "Separe segmentação, escolha do alvo e posicionamento.",
      "Associe decisões de produto e marca à proposta de valor."
    ],
    "example": "Uma empresa segmenta por uso profissional, escolhe pequenas transportadoras e se posiciona como solução confiável de baixo custo operacional.",
    "pitfall": "Marketing não é sinônimo de propaganda ou apenas venda."
  },
  "Pesquisa de Mercado": {
    "concept": "Pesquisa de mercado transforma um problema gerencial em dados para decisão. O desenho envolve objetivo, método, amostra, instrumento, coleta, análise e limites da inferência.",
    "steps": [
      "Diferencie pesquisa exploratória, descritiva e causal.",
      "Reconheça amostragem probabilística e não probabilística.",
      "Avalie viés de seleção, formulação de perguntas e validade das conclusões."
    ],
    "example": "Entrevistar apenas clientes satisfeitos na saída da loja tende a superestimar a satisfação da base inteira.",
    "pitfall": "Amostra grande não elimina viés de seleção."
  },
  "Marca": {
    "concept": "Brand equity é o valor adicional associado à marca, refletido em reconhecimento, associações, qualidade percebida e lealdade. Indicadores como BDI comparam desempenho de uma marca numa região com seu desempenho médio de mercado.",
    "steps": [
      "Diferencie identidade, imagem, posicionamento e valor de marca.",
      "Calcule BDI = (% vendas da marca na área / % população da área) × 100, conforme definição operacional usada.",
      "Interprete índice acima de 100 como desempenho relativo superior à média no recorte adotado."
    ],
    "example": "Uma região tem 15% das vendas da marca e 10% da população: BDI = 150.",
    "pitfall": "BDI não é participação de mercado nem mede sozinho a força total da marca."
  },
  "Estratégia Organizacional": {
    "concept": "Estratégia define escolhas sobre onde competir e como criar vantagem. A análise cruza ambiente externo (oportunidades/ameaças) e recursos/capacidades internos (forças/fraquezas).",
    "steps": [
      "Use SWOT para organizar diagnóstico, não como estratégia pronta.",
      "Diferencie liderança em custos, diferenciação e enfoque.",
      "Conecte objetivos a indicadores e iniciativas executáveis."
    ],
    "example": "Empresa com logística superior pode buscar diferenciação por confiabilidade, desde que clientes valorizem e remunerem essa característica.",
    "pitfall": "Meta e indicador não substituem escolha estratégica."
  },
  "Implementação, gestão e mensuração das estratégias": {
    "concept": "Implementar estratégia requer desdobrar objetivos em iniciativas, responsáveis, recursos e indicadores. BSC relaciona perspectivas financeira, clientes, processos internos e aprendizado/crescimento; indicadores de resultado e direcionadores devem ser combinados.",
    "steps": [
      "Converta objetivos em metas mensuráveis e prazos.",
      "Atribua responsáveis e acompanhe desvios.",
      "Revise hipóteses e ações quando indicadores mostrarem problemas."
    ],
    "example": "Objetivo de melhorar atendimento pode ser acompanhado por satisfação, prazo de resposta e retrabalho, sem depender de uma métrica isolada.",
    "pitfall": "Cumprir indicadores locais não significa necessariamente alcançar o objetivo estratégico."
  },
  "Vieses comuns e mitigação": {
    "concept": "Vieses cognitivos são padrões sistemáticos de julgamento. Ancoragem supervaloriza informação inicial; confirmação privilegia evidências favoráveis; disponibilidade superestima eventos fáceis de lembrar. Racionalidade limitada descreve decisões sob informação e capacidade cognitiva restritas.",
    "steps": [
      "Nomeie o viés a partir de uma situação concreta.",
      "Busque alternativas, dados contrários e critérios prévios.",
      "Use premortem, revisão independente e registro das premissas."
    ],
    "example": "Gestor decide pelo primeiro orçamento recebido e compara os demais apenas a ele: risco de ancoragem. Definir critérios antes de abrir propostas reduz o efeito.",
    "pitfall": "Ter muitos dados não elimina automaticamente vieses."
  },
  "Metodologias Ágeis": {
    "concept": "Métodos ágeis usam entregas incrementais, feedback frequente e adaptação. Scrum organiza trabalho em sprints, backlog, papéis e eventos; Kanban visualiza fluxo e limita trabalho em progresso (WIP).",
    "steps": [
      "Diferencie abordagem preditiva, ágil e híbrida.",
      "Reconheça backlog, sprint, incremento e retrospectiva.",
      "Entenda limites de WIP e melhoria contínua no Kanban."
    ],
    "example": "Uma equipe entrega funcionalidade testável a cada sprint e ajusta prioridades após feedback do usuário.",
    "pitfall": "Ágil não significa ausência de planejamento, governança ou documentação."
  },
  "Aquisições do Projeto — PMBOK 7ª ed.": {
    "concept": "O PMBOK 7 organiza princípios e domínios de desempenho, com foco em entrega de valor e adaptação ao contexto, diferentemente da estrutura prescritiva de processos da 6ª edição. Aquisições continuam exigindo análise fazer ou comprar, seleção de fornecedores, riscos e gestão contratual.",
    "steps": [
      "Identifique necessidade de aquisição e critérios de seleção.",
      "Avalie riscos contratuais e responsabilidades.",
      "Acompanhe entrega, aceitação e mudanças contratuais."
    ],
    "example": "Comprar serviço especializado pode acelerar projeto, mas cria dependência externa e requer critérios de aceite e gestão de riscos.",
    "pitfall": "Não trate os 49 processos da 6ª edição como a estrutura central da 7ª."
  },
  "Plataformização": {
    "concept": "Plataformização é a crescente organização de interações e trocas por plataformas digitais que conectam diferentes grupos de usuários. Efeitos de rede podem aumentar valor à medida que cresce a base, mas também podem criar dependência e concentração.",
    "steps": [
      "Diferencie loja digital simples de plataforma multilateral.",
      "Reconheça efeitos de rede diretos e cruzados.",
      "Analise custos de troca, governança de dados e regras de participação."
    ],
    "example": "Marketplace conecta vendedores e compradores; mais vendedores podem atrair compradores, e vice-versa.",
    "pitfall": "Plataformização não é apenas publicidade nas redes sociais."
  }
}
