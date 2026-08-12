import { getSession, fetchTranspetroState, saveTranspetroState } from './cloud.js'

const EXAM_DATE='2026-11-29'
const syllabus=[
 ['Português',['Compreensão de textos','Ortografia oficial','Mecanismos de coesão textual','Significação das palavras','Emprego de tempos e modos verbais','Emprego das classes de palavras','Coordenação e subordinação','Pontuação','Concordância verbal e nominal','Regência verbal e nominal','Crase','Colocação dos pronomes átonos']],
 ['Inglês',['Compreensão de texto escrito em língua inglesa','Itens gramaticais relevantes para a compreensão dos conteúdos semânticos']],
 ['Administração Financeira e Orçamentária',['Matemática Financeira','Valor do Dinheiro no Tempo','Risco x Retorno','Análise de Investimentos','Alavancagem e Endividamento','Planejamento Financeiro e Orçamentário','Administração do Capital de Giro','Fontes de Financiamento a Longo Prazo']],
 ['Produção e Compras',['Strategic Sourcing','Administração de Compras','Gestão de Estoques: MRP','Ponto de Ressuprimento','Lote Econômico de Compra','Just in Time','Rastreamento: RFID, Código de Barras e UID','Planejamento e Controle da Produção','Supply Chain Management']],
 ['Contratação',['Lei 13.303/2016 — artigos 28 a 91','LC 123/2006 — artigos 42 a 49 e alterações']],
 ['Gerenciamento de Projetos',['Ciclo de Vida','Estrutura Analítica de Projeto — EAP','Viabilidade técnica e econômica','Aquisições do Projeto — PMBOK 7ª ed.','Metodologias Ágeis']],
 ['Conflitos e Negociação',['Conflitos e negociação']],
 ['Sistemas de Informação',['Sistemas operacionais e sistemas de apoio à decisão','Gestão dos sistemas de informação: dimensões, competências, metodologias e ferramentas']],
 ['Estratégia Empresarial',['Estruturas Organizacionais','Estratégia Organizacional','Ferramentas da Análise Estratégica','Processo de Administração Estratégica','Ambiente Externo e Capacidades da Empresa','Estratégias no Nível do Negócio','Estratégias Corporativas','Implementação, gestão e mensuração das estratégias']],
 ['Administração Mercadológica',['Marketing','Marketing B2B','Marketing de Serviços','Pesquisa de Mercado','Planejamento de Marketing','Estratégias de Marketing','Relacionamento com Clientes','Gestão Comercial','Comportamento do Consumidor','Marca','Mídias digitais','Plataformização']],
 ['Contabilidade',['Contabilidade Geral','Contabilidade de Custos','Contabilidade Gerencial','Governança','Compliance e Riscos']],
 ['Processo Decisório',['Natureza da Decisão','Modelo Racional da Tomada de Decisão','Vieses comuns e mitigação','Conscientização Limitada','Técnicas e Instrumentos de Apoio à Decisão']],
 ['Recursos Humanos',['Estratégias de RH','Remuneração e Benefícios','Desempenho','Cultura Organizacional','Desenvolvimento de RH','Gestão do Conhecimento','Carreira e Sucessão','Liderança e Equipe']],
 ['Lógica',['Funções','Análise Combinatória','Progressões','Raciocínio Lógico Quantitativo']],
 ['Estatística',['Probabilidade','Estatística Descritiva']],
 ['Sustentabilidade e Responsabilidade Socioambiental',['Gestão Ambiental nas Organizações','Relacionamento com Públicos de Interesse','Relatórios Ambientais','Indicadores de Gestão Ambiental e ESG']]
]
const exams=[
 {year:2011,title:'Transpetro — Administrador(a) Júnior',questions:70,specific:50,duration:'4h30',status:'Prova e gabarito conferidos'},
 {year:2012,title:'Transpetro — Administrador(a) Júnior',questions:70,specific:50,duration:'4h30',status:'Prova e gabarito conferidos'},
 {year:2023,title:'Transpetro — Administração',questions:70,specific:50,duration:'4h30',status:'Prova e gabarito conferidos'}
]
const totalTopics=syllabus.reduce((n,[,t])=>n+t.length,0)
const key=(area,topic)=>`${area}|${topic}`
const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))
const daysToExam=()=>Math.max(0,Math.ceil((new Date(EXAM_DATE+'T23:59:59')-Date.now())/86400000))
let user=null
let state={topics:{},sessions:[],examAttempts:[],tab:'inicio'}
let root=null
let syncTimer=null

function injectStyles(){
 const s=document.createElement('style');s.textContent=`
 .tp-launch{width:100%;margin-top:10px;border:1px solid #22c55e55!important;background:linear-gradient(135deg,#052e16,#14532d)!important;color:#dcfce7!important;font-weight:800!important}.tp-overlay{position:fixed;inset:0;z-index:9999;background:#f8fafc;color:#0f172a;overflow:auto}.tp-top{position:sticky;top:0;z-index:3;background:#07111f;color:#fff;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px}.tp-brand strong{display:block;font-size:17px}.tp-brand span{font-size:11px;color:#94a3b8}.tp-close{border:1px solid #334155;background:#111827;color:#fff;border-radius:9px;padding:9px 13px;cursor:pointer}.tp-wrap{max-width:1180px;margin:auto;padding:24px}.tp-hero{background:linear-gradient(135deg,#07111f,#123524);color:white;border-radius:18px;padding:28px;display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center}.tp-hero h1{margin:4px 0 8px;font-size:30px}.tp-hero p{margin:0;color:#cbd5e1}.tp-days{font-size:42px;font-weight:900;text-align:center}.tp-days small{display:block;font-size:11px;color:#94a3b8}.tp-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0}.tp-tabs button{border:1px solid #cbd5e1;background:#fff;border-radius:999px;padding:9px 14px;cursor:pointer;font-weight:700}.tp-tabs button.active{background:#0f172a;color:#fff}.tp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.tp-card{background:white;border:1px solid #e2e8f0;border-radius:14px;padding:18px;box-shadow:0 1px 2px #00000008}.tp-card strong.big{display:block;font-size:28px;margin-top:5px}.tp-progress{height:8px;background:#e2e8f0;border-radius:20px;overflow:hidden}.tp-progress i{display:block;height:100%;background:#16a34a}.tp-area{margin:12px 0}.tp-area h3{display:flex;justify-content:space-between;gap:12px}.tp-topic{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;padding:10px 0;border-top:1px solid #eef2f7}.tp-topic label{display:flex;align-items:center;gap:8px;font-size:13px}.tp-topic input{width:17px;height:17px}.tp-exams{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.tp-exam-year{font-size:28px;font-weight:900;color:#166534}.tp-pill{display:inline-block;padding:4px 8px;border-radius:999px;background:#dcfce7;color:#166534;font-size:10px;font-weight:800}.tp-today{border-left:4px solid #16a34a}.tp-btn{border:0;border-radius:9px;background:#166534;color:#fff;padding:10px 14px;font-weight:800;cursor:pointer}.tp-muted{color:#64748b;font-size:12px}.tp-session-list{margin-top:12px}.tp-session{display:flex;justify-content:space-between;border-top:1px solid #e2e8f0;padding:9px 0;font-size:12px}@media(max-width:800px){.tp-grid,.tp-exams{grid-template-columns:1fr 1fr}.tp-hero{grid-template-columns:1fr}.tp-wrap{padding:14px}}@media(max-width:520px){.tp-grid,.tp-exams{grid-template-columns:1fr}.tp-top{padding:12px}.tp-hero h1{font-size:23px}}
 `;document.head.appendChild(s)
}
async function loadCloud(){
 const {session}=await getSession();user=session?.user||null
 if(!user)return
 try{const remote=await fetchTranspetroState(user.id);if(remote?.state)state={...state,...remote.state,tab:'inicio'}}catch(e){console.error('Transpetro cloud load',e)}
}
function persist(){
 localStorage.setItem('transpetro:state',JSON.stringify(state));clearTimeout(syncTimer)
 if(user)syncTimer=setTimeout(()=>saveTranspetroState(user.id,{topics:state.topics,sessions:state.sessions,examAttempts:state.examAttempts}).catch(console.error),500)
}
function progress(){const done=Object.values(state.topics).filter(Boolean).length;return{done,pct:Math.round(done/totalTopics*100)}}
function render(){
 const p=progress();root.innerHTML=`<div class="tp-top"><div class="tp-brand"><strong>Transpetro 2026 · Administração</strong><span>Cesgranrio · Nível Superior · prova 29/11/2026</span></div><button class="tp-close" data-tp-close>Voltar ao Santos</button></div><div class="tp-wrap"><section class="tp-hero"><div><span class="tp-pill">NOVO MÓDULO</span><h1>Profissional Transpetro — Administração</h1><p>70 questões · 10 Português · 10 Inglês · 50 Específicas · 5 alternativas · 4h30</p></div><div class="tp-days">${daysToExam()}<small>DIAS ATÉ A PROVA</small></div></section><div class="tp-tabs">${[['inicio','Visão geral'],['edital','Edital 2026'],['provas','Provas anteriores'],['registro','Registrar estudo']].map(([id,l])=>`<button data-tp-tab="${id}" class="${state.tab===id?'active':''}">${l}</button>`).join('')}</div>${page(p)}</div>`
 bind()
}
function page(p){
 if(state.tab==='edital')return `<div class="tp-card"><h2>Edital verticalizado 2026</h2><p class="tp-muted">Conteúdo oficial da Ênfase 1 — Administração. Marque somente depois de estudar o tópico.</p><div class="tp-progress"><i style="width:${p.pct}%"></i></div><p><b>${p.done}/${totalTopics}</b> tópicos · ${p.pct}%</p></div>${syllabus.map(([a,ts])=>{const d=ts.filter(t=>state.topics[key(a,t)]).length;return `<section class="tp-card tp-area"><h3>${esc(a)} <span>${d}/${ts.length}</span></h3>${ts.map(t=>`<div class="tp-topic"><span>${esc(t)}</span><label><input type="checkbox" data-tp-topic="${encodeURIComponent(key(a,t))}" ${state.topics[key(a,t)]?'checked':''}> Estudado</label></div>`).join('')}</section>`}).join('')}`
 if(state.tab==='provas')return `<div class="tp-card"><h2>Provas reais Cesgranrio</h2><p>Temos <b>210 questões reais</b> da Transpetro para Administração, sendo <b>150 específicas</b>. Elas ficam separadas do futuro banco autoral 2026 para preservar o valor diagnóstico.</p></div><div class="tp-exams">${exams.map(e=>`<div class="tp-card"><div class="tp-exam-year">${e.year}</div><h3>${e.title}</h3><p>${e.questions} questões · ${e.specific} específicas · ${e.duration}</p><span class="tp-pill">${e.status}</span></div>`).join('')}</div><div class="tp-card" style="margin-top:14px"><h3>Regra do módulo</h3><p class="tp-muted">2011 e 2012 entram como histórico do estilo Cesgranrio. 2023 é a referência histórica principal. O banco autoral será filtrado pelo conteúdo programático 2026 — temas antigos fora do edital não serão tratados como conteúdo atual.</p></div>`
 if(state.tab==='registro')return `<div class="tp-card"><h2>Registrar estudo</h2><form id="tpSession"><label>Área<br><select id="tpArea" style="width:100%;padding:10px;margin:6px 0 12px">${syllabus.map(([a])=>`<option>${esc(a)}</option>`).join('')}</select></label><label>Minutos estudados<br><input id="tpMinutes" type="number" min="1" value="60" style="width:100%;padding:10px;margin:6px 0 12px"></label><button class="tp-btn">Registrar sessão</button></form><div class="tp-session-list">${state.sessions.slice(-10).reverse().map(s=>`<div class="tp-session"><span>${esc(s.area)} · ${s.date}</span><b>${s.minutes} min</b></div>`).join('')}</div></div>`
 const mins=state.sessions.reduce((a,s)=>a+Number(s.minutes||0),0)
 return `<div class="tp-grid"><div class="tp-card"><span class="tp-muted">Edital concluído</span><strong class="big">${p.pct}%</strong><small>${p.done}/${totalTopics} tópicos</small></div><div class="tp-card"><span class="tp-muted">Tempo estudado</span><strong class="big">${(mins/60).toFixed(1)}h</strong><small>${state.sessions.length} sessões</small></div><div class="tp-card"><span class="tp-muted">Questões históricas</span><strong class="big">210</strong><small>2011 · 2012 · 2023</small></div><div class="tp-card"><span class="tp-muted">Específicas históricas</span><strong class="big">150</strong><small>Administrador / Administração</small></div></div><div class="tp-card tp-today" style="margin-top:14px"><span class="tp-pill">COMEÇAR HOJE</span><h2>Administração Financeira e Orçamentária</h2><p>Comece por <b>Matemática Financeira → Valor do Dinheiro no Tempo → Análise de Investimentos</b>. São conteúdos do edital 2026 e aparecem naturalmente em provas de Administração da Cesgranrio.</p><button class="tp-btn" data-tp-go="edital">Abrir edital verticalizado</button></div><div class="tp-card" style="margin-top:14px"><h3>Conteúdo oficial 2026</h3><p class="tp-muted">Inclui Financeira e Orçamentária, Produção e Compras, Lei 13.303/2016, LC 123/2006, PMBOK 7, Ágeis, Sistemas de Informação, Estratégia, Marketing, Contabilidade, Processo Decisório, RH, Lógica, Estatística e ESG.</p></div>`
}
function bind(){
 root.querySelector('[data-tp-close]').onclick=()=>root.remove()
 root.querySelectorAll('[data-tp-tab]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tpTab;render()})
 root.querySelectorAll('[data-tp-go]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tpGo;render()})
 root.querySelectorAll('[data-tp-topic]').forEach(i=>i.onchange=()=>{state.topics[decodeURIComponent(i.dataset.tpTopic)]=i.checked;persist();render()})
 const f=root.querySelector('#tpSession');if(f)f.onsubmit=e=>{e.preventDefault();state.sessions.push({date:new Date().toLocaleDateString('pt-BR'),area:root.querySelector('#tpArea').value,minutes:Number(root.querySelector('#tpMinutes').value)});persist();render()}
}
async function openModule(){
 root=document.createElement('div');root.className='tp-overlay';document.body.appendChild(root)
 const cached=JSON.parse(localStorage.getItem('transpetro:state')||'null');if(cached)state={...state,...cached,tab:'inicio'}
 await loadCloud();render()
}
async function init(){
 injectStyles();const nav=document.querySelector('#nav');if(!nav)return
 const b=document.createElement('button');b.className='tp-launch';b.innerHTML='⚓ Transpetro 2026';b.onclick=openModule;nav.appendChild(b)
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()
