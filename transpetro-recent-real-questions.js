const BNDES_PDF='https://www.bndes.gov.br/wps/wcm/connect/site/de93088a-3c6b-4f2e-b9ec-d53f365715b8/Objetiva%2B-%2BADMINISTRA%C3%87%C3%83O.pdf?CVID=pahmv9B&MOD=AJPERES'
const CNU_PDF='https://www.gov.br/gestao/pt-br/concursonacional/caderno-de-provas/tarde/prova-15-gabarito-1-gestao-governamental-e-administracao-publica-tarde.pdf'

const b=(number,answer,page,area,topic,extra={})=>({
 id:`EXT:BNDES2024:${number}`,kind:'official-pdf',sourceExam:'BNDES 2024 — Analista: Administração',source:'BNDES 2024',year:2024,priority:2,
 number,questionNumber:number,answer,page,pdfUrl:BNDES_PDF,area,topic,alignment:'direta',bank:'real',...extra
})
const c=(number,answer,page,area,topic,extra={})=>({
 id:`EXT:CNU2024:${number}`,kind:'official-pdf',sourceExam:'CNU 2024 — Bloco 7: Gestão Governamental e Administração Pública',source:'CNU 2024 — Bloco 7',year:2024,priority:3,
 number,questionNumber:number,answer,page,pdfUrl:CNU_PDF,area,topic,alignment:'direta',bank:'real',...extra
})

// Filtro deliberadamente restritivo: só entram itens cujo assunto tenha correspondência direta
// com o conteúdo programático da Transpetro 2026 — Administração. Questões anuladas são excluídas.
export const recentRealQuestions=[
 // BNDES 2024 — Português (10/10 úteis para o núcleo atual da Cesgranrio)
 b(21,'D',8,'Português','Compreensão de textos',{contextPage:7,contextGroup:'BNDES24-PT'}),
 b(22,'D',8,'Português','Compreensão de textos',{contextPage:7,contextGroup:'BNDES24-PT'}),
 b(23,'A',8,'Português','Emprego de tempos e modos verbais',{contextPage:7,contextGroup:'BNDES24-PT'}),
 b(24,'B',8,'Português','Compreensão de textos',{contextPage:7,contextGroup:'BNDES24-PT'}),
 b(25,'C',8,'Português','Pontuação',{contextPage:7,contextGroup:'BNDES24-PT'}),
 b(26,'D',9,'Português','Concordância verbal e nominal',{contextPage:7,contextGroup:'BNDES24-PT'}),
 b(27,'C',9,'Português','Compreensão de textos',{contextPage:7,contextGroup:'BNDES24-PT'}),
 b(28,'D',9,'Português','Significação das palavras',{contextPage:7,contextGroup:'BNDES24-PT'}),
 b(29,'E',9,'Português','Pontuação',{contextPage:7,contextGroup:'BNDES24-PT'}),
 b(30,'E',9,'Português','Mecanismos de coesão textual',{contextPage:7,contextGroup:'BNDES24-PT'}),

 // BNDES 2024 — Inglês (5 questões da prova)
 b(31,'C',11,'Inglês','Compreensão de texto escrito em língua inglesa',{contextPage:10,contextGroup:'BNDES24-EN'}),
 b(32,'D',11,'Inglês','Itens gramaticais relevantes para a compreensão dos conteúdos semânticos',{contextPage:10,contextGroup:'BNDES24-EN'}),
 b(33,'A',11,'Inglês','Compreensão de texto escrito em língua inglesa',{contextPage:10,contextGroup:'BNDES24-EN'}),
 b(34,'D',11,'Inglês','Itens gramaticais relevantes para a compreensão dos conteúdos semânticos',{contextPage:10,contextGroup:'BNDES24-EN'}),
 b(35,'B',11,'Inglês','Itens gramaticais relevantes para a compreensão dos conteúdos semânticos',{contextPage:10,contextGroup:'BNDES24-EN'}),

 // BNDES 2024 — Específicas diretamente aderentes ao edital Transpetro 2026
 b(39,'E',12,'Estratégia Empresarial','Ambiente Externo e Capacidades da Empresa'),
 b(40,'D',12,'Estratégia Empresarial','Ferramentas da Análise Estratégica'),
 b(42,'A',13,'Estratégia Empresarial','Ferramentas da Análise Estratégica'),
 b(43,'A',13,'Recursos Humanos','Liderança e Equipe'),
 b(44,'D',13,'Recursos Humanos','Desempenho'),
 b(45,'B',13,'Administração Mercadológica','Estratégias de Marketing'),
 b(47,'B',13,'Administração Mercadológica','Comportamento do Consumidor'),
 b(50,'D',14,'Administração Financeira e Orçamentária','Matemática Financeira'),
 b(51,'C',14,'Administração Financeira e Orçamentária','Valor do Dinheiro no Tempo'),
 b(52,'D',14,'Administração Financeira e Orçamentária','Matemática Financeira'),
 b(53,'A',15,'Administração Financeira e Orçamentária','Matemática Financeira'),
 b(54,'D',15,'Contabilidade','Contabilidade Geral'),
 b(56,'B',15,'Administração Financeira e Orçamentária','Administração do Capital de Giro'),
 b(57,'E',15,'Estatística','Estatística Descritiva'),
 b(58,'A',16,'Administração Financeira e Orçamentária','Risco x Retorno'),
 b(59,'C',16,'Administração Financeira e Orçamentária','Análise de Investimentos'),
 b(60,'C',16,'Sustentabilidade e Responsabilidade Socioambiental','Indicadores de Gestão Ambiental e ESG'),
 b(69,'D',18,'Administração da Produção e Compras','Gestão da Cadeia de Suprimentos'),

 // CNU 2024 — Bloco 7. Só itens que treinam diretamente tópico previsto no edital Transpetro.
 c(1,'E',2,'Conflitos e Negociação','Conflitos e negociação'),
 c(4,'A',2,'Recursos Humanos','Liderança e Equipe'),
 c(5,'B',2,'Recursos Humanos','Desenvolvimento de RH'),
 c(6,'C',3,'Estratégia Empresarial','Estratégia Organizacional'),
 c(9,'A',3,'Estratégia Empresarial','Estruturas Organizacionais'),
 c(10,'C',4,'Gerenciamento de Projetos','Ciclo de Vida'),
 c(17,'E',5,'Administração da Produção e Compras','Gestão de Estoques'),
 c(20,'B',5,'Gerenciamento de Projetos','Ciclo de Vida'),
 c(25,'B',6,'Processo Decisório','O Modelo Racional da Tomada de Decisão'),
 c(30,'A',7,'Estatística','Estatística Descritiva')
]

export const recentRealStats={
 total:recentRealQuestions.length,
 bndes:recentRealQuestions.filter(q=>q.source==='BNDES 2024').length,
 cnu:recentRealQuestions.filter(q=>q.source.startsWith('CNU 2024')).length
}
