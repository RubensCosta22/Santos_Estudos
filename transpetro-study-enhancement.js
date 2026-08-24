const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))

const refs={
 'Administração Financeira e Orçamentária':[
  ['Gitman, Zutter & Smart — Principles of Managerial Finance','Finanças corporativas, valor do dinheiro no tempo, risco-retorno, capital de giro e orçamento.'],
  ['Ross, Westerfield & Jordan — Fundamentals of Corporate Finance','VPL, TIR, estrutura de capital, alavancagem e decisões financeiras.']
 ],
 'Administração da Produção e Compras':[['Slack, Brandon-Jones & Burgess — Operations Management','Estoques, capacidade, operações, cadeia de suprimentos e melhoria.']],
 'Gerenciamento de Projetos':[['Project Management Institute — PMBOK® Guide, 7ª edição','Princípios, domínios de desempenho, tailoring, entrega de valor e abordagens adaptativas.']],
 'Estratégia Empresarial':[['Hitt, Ireland & Hoskisson — Strategic Management','Ambiente externo, recursos, estratégia competitiva e corporativa.']],
 'Administração Mercadológica':[['Kotler, Keller & Chernev — Marketing Management','Segmentação, posicionamento, comportamento do consumidor, serviços, B2B e estratégia de marketing.']],
 'Recursos Humanos':[['Robbins & Judge — Organizational Behavior','Motivação, liderança, equipes, cultura e comportamento organizacional.']],
 'Contabilidade':[['IBGC — Código das Melhores Práticas de Governança Corporativa, 6ª ed.','Governança, prestação de contas, integridade, sustentabilidade e controles.']],
 'Sustentabilidade e Responsabilidade Socioambiental':[['IBGC — Código das Melhores Práticas de Governança Corporativa, 6ª ed.','Integração entre governança, riscos, sustentabilidade e criação de valor.']]
}

const extras={
 'Matemática Financeira':{
  formula:['Juros simples: M = C(1 + i·n)','Juros compostos: M = C(1+i)^n','Valor presente: VP = VF/(1+i)^n','Taxa efetiva equivalente: (1+i_a) = (1+i_p)^m'],
  example:`<b>Exemplo — taxa mensal para anual.</b><br>Aplicação rende 2% ao mês. Não multiplique simplesmente por 12.<br><b>1.</b> Fator mensal = 1,02.<br><b>2.</b> Fator anual = 1,02¹² ≈ 1,2682.<br><b>3.</b> Taxa anual efetiva ≈ 26,82%.<br><b>Pegadinha:</b> 24% seria apenas a taxa proporcional, não a efetiva composta.`
 },
 'Análise de Investimentos':{
  formula:['VPL = −I₀ + Σ FCₜ/(1+k)^t','TIR: taxa r que torna VPL = 0','Payback simples: tempo até recuperar o investimento nominal'],
  example:`<b>Exemplo — VPL passo a passo.</b><br>Investimento inicial: R$ 1.000. Entradas: R$ 600 ao fim do ano 1 e R$ 600 ao fim do ano 2. TMA = 10%.<br><b>1.</b> VP₁ = 600/1,10 = R$ 545,45.<br><b>2.</b> VP₂ = 600/1,10² = R$ 495,87.<br><b>3.</b> VPL = −1.000 + 545,45 + 495,87 = <b>R$ 41,32</b>.<br><b>Conclusão:</b> VPL positivo → o projeto cria valor à TMA de 10%.<br><br><b>Exemplo — TIR simples.</b><br>Invista R$ 1.000 hoje e receba R$ 1.100 em um ano.<br>0 = −1.000 + 1.100/(1+r) → 1+r = 1,10 → <b>TIR = 10%</b>.<br><b>Pegadinha Cesgranrio:</b> TIR maior que a TMA favorece o projeto, mas em projetos mutuamente exclusivos o VPL é o critério mais seguro.`
 },
 'Alavancagem e Endividamento':{
  formula:['Margem de contribuição = Receita − Custos/Despesas variáveis','GAO = Margem de contribuição / EBIT','GAF = EBIT / (EBIT − juros), em modelo simplificado'],
  example:`<b>Exemplo — grau de alavancagem operacional.</b><br>Vendas = R$ 100 mil; custos variáveis = R$ 60 mil; custos fixos = R$ 20 mil.<br><b>1.</b> Margem de contribuição = 100 − 60 = R$ 40 mil.<br><b>2.</b> EBIT = 40 − 20 = R$ 20 mil.<br><b>3.</b> GAO = 40/20 = <b>2</b>.<br><b>Leitura:</b> perto desse nível de operação, variação de 1% nas vendas tende a produzir aproximadamente 2% no EBIT.<br><b>Pegadinha:</b> alavancagem amplifica perdas também; não significa lucro garantido.`
 },
 'Administração do Capital de Giro':{
  formula:['Capital circulante líquido = Ativo Circulante − Passivo Circulante','Ciclo de caixa = prazo médio de estoques + prazo médio de recebimento − prazo médio de pagamento'],
  example:`<b>Exemplo.</b><br>Ativo circulante = R$ 180 mil e passivo circulante = R$ 120 mil.<br>CCL = 180 − 120 = <b>R$ 60 mil</b>.<br>Se a empresa aumenta o prazo concedido aos clientes sem alterar os demais fatores, tende a aumentar sua necessidade de capital de giro.`
 },
 'Estrutura Analítica de Projeto — EAP':{
  map:['Escopo total','→ entregas principais','→ componentes menores','→ pacotes de trabalho','→ estimar / atribuir / controlar'],
  trap:'EAP organiza <b>escopo</b>; cronograma organiza <b>tempo</b>. EAP não é organograma.'
 },
 'Ciclo de Vida':{
  map:['Entrega de valor','→ abordagem: preditiva / iterativa / incremental / ágil / híbrida','→ tailoring ao contexto','→ planejamento e execução','→ medição + incerteza + stakeholders','→ aprendizado e adaptação'],
  trap:'PMBOK 7 não aboliu processos nem planejamento. O foco passou a princípios, domínios de desempenho e adaptação.'
 },
 'Metodologias Ágeis':{
  map:['Scrum: Product Owner → valor/backlog','Scrum Master → efetividade do Scrum','Developers → incremento','Sprint → ciclo fixo','Kanban → fluxo + limite de WIP + melhoria contínua'],
  trap:'Ágil ≠ ausência de documentação ou governança. A lógica é adaptar e produzir apenas o necessário para gerar valor e controle.'
 },
 'Estruturas Organizacionais':{
  map:['Funcional → especialização ↑ | integração entre áreas ↓','Divisional → foco em produto/cliente/região ↑ | duplicação de recursos ↑','Matricial → integração/flexibilidade ↑ | dupla autoridade/conflitos ↑','Orgânica → adaptação ↑ em ambientes dinâmicos'],
  trap:'Não existe uma estrutura universalmente superior: a resposta depende de estratégia, ambiente, tamanho e necessidade de coordenação.'
 },
 'Lei 13.303/2016 — artigos 28 a 91':{
  map:['Necessidade da contratação','→ planejamento/instrução','→ licitação como regra','→ ou contratação direta quando houver hipótese legal','→ julgamento/negociação/habilitação','→ adjudicação/homologação','→ contrato + fiscalização + gestão de riscos'],
  trap:'Dispensa: competição é possível, mas a lei autoriza contratação direta. Inexigibilidade: competição é inviável. Contratação direta não elimina motivação nem instrução do processo.'
 },
 'Ferramentas da Análise Estratégica':{
  map:['SWOT: Forças/Fraquezas = internas','SWOT: Oportunidades/Ameaças = externas','Porter = estrutura competitiva do setor','Cadeia de valor = atividades que geram custo/valor','BCG = portfólio por crescimento e participação'],
  trap:'A banca troca frequentemente ameaça por fraqueza. Pergunte: o fator está dentro ou fora da organização?'
 },
 'Indicadores de Gestão Ambiental e ESG':{
  map:['E → emissões, energia, água, resíduos, biodiversidade','S → pessoas, segurança, diversidade, comunidades','G → ética, controles, conselho, riscos, transparência','Materialidade → o que realmente importa para impacto/risco/decisão'],
  trap:'ESG não significa apenas meio ambiente. Governança e dimensão social também são cobradas.'
 }
}

const genericTraps={
 'Português':'A Cesgranrio costuma trocar uma relação semântica por outra próxima, alterar o alcance de um termo ou oferecer reescrita gramaticalmente possível, mas com mudança de sentido.',
 'Inglês':'A alternativa correta costuma ser paráfrase. Evite escolher por uma palavra isolada; confirme a ideia no período e no parágrafo.',
 'Contratação':'Leia exatamente a hipótese legal e diferencie regra, exceção, dispensa e inexigibilidade.',
 'Processo Decisório':'Diferencie modelo normativo/racional de comportamento real sujeito a limites cognitivos e vieses.',
 'Estatística':'Antes de calcular, identifique população/amostra, tipo de medida e se a questão pede posição, tendência central ou dispersão.'
}

function readErrors(){try{return JSON.parse(localStorage.getItem('transpetro:last-errors')||'[]')}catch{return[]}}
function errorsFor(area,topic){return readErrors().filter(e=>e.area===area&&(e.topic===topic||!topic))}
function refHtml(area){const list=refs[area];if(!list)return'';return `<div class="tpse-box tpse-ref"><b>📚 Literatura para aprofundar</b>${list.map(([n,d])=>`<p><b>${esc(n)}</b><br><span>${esc(d)}</span></p>`).join('')}</div>`}
function extraHtml(area,topic){const x=extras[topic],err=errorsFor(area,topic);let h='';if(x?.formula)h+=`<div class="tpse-box"><b>🧮 Fórmulas essenciais</b><ul>${x.formula.map(v=>`<li><code>${esc(v)}</code></li>`).join('')}</ul></div>`;if(x?.example)h+=`<div class="tpse-box tpse-example"><b>✍️ Exemplo resolvido passo a passo</b><p>${x.example}</p></div>`;if(x?.map)h+=`<div class="tpse-box tpse-map"><b>🧠 Esquema mental</b><div class="tpse-flow">${x.map.map(v=>`<span>${v}</span>`).join('')}</div></div>`;const trap=x?.trap||genericTraps[area];if(trap)h+=`<div class="tpse-box tpse-trap"><b>⚠️ Pegadinha Cesgranrio</b><p>${trap}</p></div>`;if(err.length)h+=`<div class="tpse-box tpse-errors"><b>🎯 Seus erros recentes neste tópico</b>${err.map(e=>`<p><b>${esc(e.source||'Simulado')} ${e.number?`· questão ${e.number}`:''}</b><br>Sua resposta: <b>${esc(e.user||'em branco')}</b> · gabarito: <b>${esc(e.answer)}</b><br><span>Revisão automática: releia o conceito acima e identifique por que a alternativa correta se encaixa melhor que a escolhida.</span></p>`).join('')}</div>`;return h}

function styles(){if(document.querySelector('#tpse-css'))return;const s=document.createElement('style');s.id='tpse-css';s.textContent=`.tpse-box{margin-top:14px;padding:14px;border:1px solid #cbd5e1;border-radius:10px;background:#f8fafc;line-height:1.6}.tpse-box ul{margin-bottom:0}.tpse-box code{white-space:normal}.tpse-example{background:#f0fdf4;border-color:#bbf7d0}.tpse-trap{background:#fff7ed;border-color:#fed7aa}.tpse-map{background:#eff6ff;border-color:#bfdbfe}.tpse-errors{background:#fef2f2;border-color:#fecaca}.tpse-ref{background:#faf5ff;border-color:#e9d5ff}.tpse-flow{display:grid;gap:7px;margin-top:10px}.tpse-flow span{display:block;background:#fff;border:1px solid #cbd5e1;border-radius:8px;padding:9px}.tpse-flow span+span:before{content:'↓';display:block;text-align:center;margin:-5px 0 5px;color:#64748b}`;document.head.appendChild(s)}
function enhance(){document.querySelectorAll('.tps-overlay .tps-section').forEach(sec=>{if(sec.dataset.enhanced==='1')return;const topic=sec.querySelector('h2')?.textContent?.trim();const area=sec.querySelector('.tps-badge')?.textContent?.trim();if(!topic||!area)return;const wrap=document.createElement('div');wrap.className='tpse-extra';wrap.innerHTML=extraHtml(area,topic);sec.appendChild(wrap);sec.dataset.enhanced='1'});const page=document.querySelector('.tps-overlay .tps-wrap');const hero=page?.querySelector('.tps-hero h1')?.textContent?.trim();if(hero&&refs[hero]&&!page.querySelector('.tpse-area-ref')){const div=document.createElement('div');div.className='tpse-area-ref';div.innerHTML=refHtml(hero);page.appendChild(div)}}
function init(){styles();new MutationObserver(enhance).observe(document.body,{subtree:true,childList:true});window.addEventListener('transpetro-errors-updated',()=>setTimeout(()=>{document.querySelectorAll('.tps-section').forEach(s=>{s.dataset.enhanced='';s.querySelector('.tpse-extra')?.remove()});enhance()},50));setInterval(enhance,500)}
init()
