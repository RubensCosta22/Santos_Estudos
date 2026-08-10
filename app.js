import { cargos, materials } from './data.js'
import { studyGuides } from './study.js'
import { questionBank } from './questions.js'
import { cloudEnabled, getSession, signIn, signUp, signOut, onAuthStateChange, fetchUserState, saveUserState } from './cloud.js'

const $ = (s) => document.querySelector(s)
const uid = () => crypto.randomUUID?.() || Math.random().toString(36).slice(2)
const today = () => new Date().toISOString().slice(0,10)
const load = (k,d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const save = (k,v) => localStorage.setItem(k, JSON.stringify(v))
const fmt = (d) => d ? new Intl.DateTimeFormat('pt-BR',{timeZone:'UTC'}).format(new Date(d+'T00:00:00Z')) : '—'
const esc = (v='') => String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))
const OFFICIAL_EXAM_MINUTES = 210 // Edital 73/2026, item 8.7.1: 3h30 incluindo folha de respostas.
const formatClock = (seconds) => { const s=Math.max(0,Math.floor(seconds)); const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60; return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` }
let quizTimerHandle = null

let state = {
  cargoId: load('santos:cargo','fiscal'),
  page: 'dashboard',
  topics: load('santos:topics',{}),
  sessions: load('santos:sessions',[]),
  questions: load('santos:questions',[]),
  reviews: load('santos:reviews',[]),
  errors: load('santos:errors',[]),
  schedule: load('santos:schedule',[]),
  simulations: load('santos:simulations',[]),
  examDate: load('santos:examDate',''),
  materialStatus: load('santos:materialStatus',{}),
  materialQuery: '',
  materialCategory: 'all',
  materialPriority: 'all',
  selectedDisciplineId: null,
  bankAttempts: load('santos:bankAttempts',[]),
  bankDiscipline: 'all',
  bankTopic: 'all',
  bankDifficulty: 'all',
  bankQty: 10,
  quiz: load('santos:activeQuiz',null),
  quizResult: null
}
if(state.quiz) state.page='questoes'

const persistentFields=['cargoId','topics','sessions','questions','reviews','errors','schedule','simulations','examDate','materialStatus','bankAttempts','quiz']
const legacySnapshot=Object.fromEntries(persistentFields.map(k=>[k,structuredClone(state[k])]))
const legacyHasData=Object.keys(legacySnapshot.topics||{}).length>0 || ['sessions','questions','reviews','errors','schedule','simulations','bankAttempts'].some(k=>(legacySnapshot[k]||[]).length>0)
let currentUser=null
let syncTimer=null
let appInitialized=false
let cloudLoading=false

const emptySnapshot=()=>({cargoId:'fiscal',topics:{},sessions:[],questions:[],reviews:[],errors:[],schedule:[],simulations:[],examDate:'',materialStatus:{},bankAttempts:[],quiz:null})
const snapshotState=()=>Object.fromEntries(persistentFields.map(k=>[k,structuredClone(state[k])]))
const applySnapshot=(data={})=>{
  const base=emptySnapshot()
  for(const k of persistentFields) state[k]=structuredClone(data[k] ?? base[k])
  if(!cargos.some(c=>c.id===state.cargoId))state.cargoId='fiscal'
  state.page=state.quiz?'questoes':'dashboard'
  state.quizResult=null
  state.selectedDisciplineId=null
  state.materialQuery='';state.materialCategory='all';state.materialPriority='all';state.bankDiscipline='all';state.bankTopic='all';state.bankDifficulty='all';state.bankQty=10
}
const cloudCacheKey=()=>currentUser?`santos:cloud:${currentUser.id}`:null
const cacheSnapshot=()=>{const k=cloudCacheKey();if(k)save(k,snapshotState())}
const setSyncStatus=(text,kind='')=>{const el=$('#syncStatus');if(el){el.textContent=text;el.dataset.kind=kind}}
async function syncNow(){
  if(!currentUser||cloudLoading)return
  clearTimeout(syncTimer);syncTimer=null;setSyncStatus('Salvando…','saving')
  try{await saveUserState(currentUser.id,snapshotState());cacheSnapshot();setSyncStatus('Sincronizado','ok')}
  catch(err){console.error('Falha ao sincronizar',err);cacheSnapshot();setSyncStatus('Offline · cache local','warn')}
}
function scheduleSync(){if(!currentUser)return;clearTimeout(syncTimer);syncTimer=setTimeout(syncNow,650)}

const nav = [['dashboard','Dashboard'],['cronograma','Meu Cronograma'],['estudar','Estudar'],['edital','Edital'],['disciplinas','Disciplinas'],['materiais','Leis e Materiais'],['questoes','Questões'],['erros','Caderno de Erros'],['revisoes','Revisões'],['simulados','Simulados'],['desempenho','Desempenho'],['config','Configurações']]
const cargo = () => cargos.find(c=>c.id===state.cargoId)
const discipline = (id) => cargo().disciplines.find(d=>d.id===id)
const topicKey = (d,t) => `${state.cargoId}|${d}|${t}`
const persist = () => {
  if(currentUser){cacheSnapshot();scheduleSync();return}
  save('santos:cargo',state.cargoId); save('santos:topics',state.topics); save('santos:sessions',state.sessions); save('santos:questions',state.questions); save('santos:reviews',state.reviews); save('santos:errors',state.errors); save('santos:schedule',state.schedule); save('santos:simulations',state.simulations); save('santos:examDate',state.examDate); save('santos:materialStatus',state.materialStatus); save('santos:bankAttempts',state.bankAttempts); if(state.quiz)save('santos:activeQuiz',state.quiz);else localStorage.removeItem('santos:activeQuiz')
}

function authMessage(text,type='info'){const el=$('#authMessage');if(!el)return;el.hidden=!text;el.textContent=text||'';el.className=`auth-message ${type}`}
function showAuth(){
  $('#bootScreen').hidden=true;$('#appShell').hidden=true;$('#authScreen').hidden=false;currentUser=null
}
function showApp(){
  $('#bootScreen').hidden=true;$('#authScreen').hidden=true;$('#appShell').hidden=false
  $('#userEmail').textContent=currentUser?.email||''
}
function bindAuth(){
  document.querySelectorAll('[data-auth-tab]').forEach(b=>b.onclick=()=>{const tab=b.dataset.authTab;document.querySelectorAll('[data-auth-tab]').forEach(x=>x.classList.toggle('active',x===b));$('#signInForm').hidden=tab!=='signin';$('#signUpForm').hidden=tab!=='signup';authMessage('')})
  $('#signInForm').onsubmit=async e=>{e.preventDefault();authMessage('Entrando…');const btn=e.currentTarget.querySelector('button');btn.disabled=true;const {data,error}=await signIn($('#signInEmail').value.trim(),$('#signInPassword').value);btn.disabled=false;if(error){authMessage('Não foi possível entrar. Verifique e-mail, senha e confirmação da conta.','error');return}if(data?.user)await enterUser(data.user)}
  $('#signUpForm').onsubmit=async e=>{e.preventDefault();const p1=$('#signUpPassword').value,p2=$('#signUpPassword2').value;if(p1!==p2){authMessage('As senhas não coincidem.','error');return}authMessage('Criando conta…');const btn=e.currentTarget.querySelector('button');btn.disabled=true;const {data,error}=await signUp($('#signUpEmail').value.trim(),p1);btn.disabled=false;if(error){authMessage(error.message||'Não foi possível criar a conta.','error');return}if(data?.session&&data?.user){await enterUser(data.user);return}authMessage('Conta criada. Confirme o e-mail recebido e depois entre na plataforma.','success')}
}
async function enterUser(user){
  if(!user)return
  currentUser=user;cloudLoading=true;$('#bootScreen').hidden=false;$('#authScreen').hidden=true;$('#appShell').hidden=true;$('#bootScreen span').textContent='Carregando seus dados…'
  let remote=null
  try{remote=await fetchUserState(user.id)}catch(err){console.error('Falha ao carregar nuvem',err)}
  if(remote?.state){applySnapshot(remote.state)}else{const cached=load(`santos:cloud:${user.id}`,null);applySnapshot(cached||emptySnapshot())}
  cloudLoading=false;showApp()
  if(!appInitialized){initAppShell();appInitialized=true}else{$('#cargoSelect').value=state.cargoId;render()}
  setSyncStatus(remote?'Sincronizado':'Conta pronta','ok')
  if(!remote)await syncNow()
}
async function bootstrap(){
  bindAuth()
  if(!cloudEnabled){$('#bootScreen span').textContent='Supabase ainda não configurado. Gere config.js ou publique pelo Render.';return}
  onAuthStateChange(async(event,session)=>{if(event==='SIGNED_OUT'){showAuth();return}if(session?.user&&session.user.id!==currentUser?.id)await enterUser(session.user)})
  const {session,error}=await getSession();if(error)console.error(error);if(session?.user)await enterUser(session.user);else showAuth()
  window.addEventListener('online',()=>{if(currentUser)syncNow()})
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&currentUser)syncNow()})
}

function initAppShell(){
  $('#nav').innerHTML = nav.map(([id,label])=>`<button data-page="${id}">${label}</button>`).join('')
  $('#cargoSelect').innerHTML = cargos.map(c=>`<option value="${c.id}">${c.name}</option>`).join(''); $('#cargoSelect').value=state.cargoId
  $('#nav').onclick=e=>{const b=e.target.closest('button'); if(!b)return; state.page=b.dataset.page; render()}
  $('#cargoSelect').onchange=e=>{if(state.quiz?.mode==='simulado'&&!confirm('Há um simulado em andamento. Trocar de cargo encerrará a prova sem registrar o resultado. Continuar?')){e.target.value=state.cargoId;return} state.cargoId=e.target.value; state.selectedDisciplineId=null; state.bankDiscipline='all'; state.bankTopic='all'; state.bankDifficulty='all'; state.quiz=null; state.quizResult=null; state.page='dashboard'; persist(); render()}
  $('#menuBtn').onclick=()=>$('#sidebar').classList.toggle('open')
  $('#logoutBtn').onclick=async()=>{await syncNow();await signOut();applySnapshot(emptySnapshot());showAuth()}
  render()
}

function render(){
  if(quizTimerHandle){clearInterval(quizTimerHandle);quizTimerHandle=null}
  [...$('#nav').querySelectorAll('button')].forEach(b=>b.classList.toggle('active',b.dataset.page===state.page))
  const pages={dashboard:dashboard,cronograma:cronograma,estudar:estudar,edital:edital,disciplinas:disciplinas,disciplina:disciplinaPage,materiais:materiais,questoes:questoes,erros:erros,revisoes:revisoes,simulados:simulados,desempenho:desempenho,config:config}
  $('#content').innerHTML=pages[state.page]()
  bindPage()
  if(state.quiz?.mode==='simulado') startSimulationTimer()
}
const head=(t,s='')=>`<div class="section-header"><div><h2>${t}</h2><p>${s}</p></div></div>`
function metrics(){const c=cargo();const all=c.disciplines.flatMap(d=>d.topics.map(t=>[d.id,t]));const studied=all.filter(([d,t])=>state.topics[`${state.cargoId}|${d}|${t}`]?.studied).length;const qs=state.questions.filter(q=>q.cargo===state.cargoId);const totalQ=qs.reduce((a,q)=>a+q.quantity,0);const correct=qs.reduce((a,q)=>a+q.correct,0);const ss=state.sessions.filter(s=>s.cargo===state.cargoId);const mins=ss.reduce((a,s)=>a+s.durationMinutes,0);const pending=state.reviews.filter(r=>r.cargo===state.cargoId&&r.status!=='done'&&r.dueDate<=today()).length;return{studied,total:all.length,progress:all.length?Math.round(studied/all.length*100):0,totalQ,accuracy:totalQ?Math.round(correct/totalQ*100):0,hours:Math.round(mins/6)/10,pending}}
function dashboard(){const m=metrics();const c=cargo();const days=state.examDate?Math.max(0,Math.ceil((new Date(state.examDate+'T00:00:00')-Date.now())/86400000)):'—';const sched=state.schedule.find(s=>s.cargo===state.cargoId&&s.date===today()&&!s.done);return head('Dashboard',`Visão geral da sua preparação para ${c.name}`)+`<div class="hero-today"><div><span class="eyebrow">ESTUDAR HOJE</span><h3>${esc(sched?.topic||'Defina seu próximo bloco de estudo')}</h3><p>${sched?`${sched.minutes} min · ${sched.studyType}`:'Use o cronograma para gerar uma recomendação baseada no peso real da prova.'}</p></div><button class="primary" data-go="estudar">INICIAR ESTUDO</button></div><div class="metric-grid">${metric('Dias até a prova',days,state.examDate?fmt(state.examDate):'Defina em Configurações')}${metric('Horas estudadas',m.hours+'h','Total registrado')}${metric('Edital concluído',m.progress+'%',`${m.studied} de ${m.total} tópicos`)}${metric('Questões',m.totalQ,`${m.accuracy}% de acertos`)}${metric('Revisões pendentes',m.pending,m.pending?'Atenção hoje':'Tudo em dia')}</div><div class="dashboard-grid"><div class="card"><h3>Progresso por disciplina</h3>${c.disciplines.map(d=>{const n=d.topics.filter(t=>state.topics[topicKey(d.id,t)]?.studied).length;const p=Math.round(n/d.topics.length*100);return `<div style="margin:14px 0"><div style="display:flex;justify-content:space-between;font-size:11px"><b>${esc(short(d.name))}</b><span>${p}%</span></div><div class="progress"><i style="width:${p}%"></i></div></div>`}).join('')}</div><div class="card"><h3>Peso na pontuação</h3>${c.disciplines.map(d=>`<div style="display:grid;grid-template-columns:48px 1fr;gap:8px;margin:11px 0;font-size:11px"><b>${d.share}%</b><span>${esc(short(d.name))}</span></div>`).join('')}</div></div>`}
const metric=(l,v,h)=>`<div class="metric-card"><span>${l}</span><strong>${v}</strong><small>${h}</small></div>`
function edital(){const c=cargo();return head('Edital Verticalizado','Marque cada item individualmente conforme avança.')+`<div class="stack">${c.disciplines.map(d=>{const done=d.topics.filter(t=>state.topics[topicKey(d.id,t)]?.studied).length;return `<div class="card"><h3>${esc(d.name)} <span style="float:right;color:#2563eb">${Math.round(done/d.topics.length*100)}%</span></h3><p class="muted">${d.questions} questões · peso ${d.weight} · ${d.share}% da pontuação</p>${d.topics.map((t,i)=>{const s=state.topics[topicKey(d.id,t)]||{};return `<div class="topic-row"><div class="topic-name"><span>${i+1}</span>${esc(t)}</div><div class="topic-checks"><label><input type="checkbox" data-topic="${encodeURIComponent(t)}" data-d="${d.id}" data-f="studied" ${s.studied?'checked':''}>Estudado</label><label><input type="checkbox" data-topic="${encodeURIComponent(t)}" data-d="${d.id}" data-f="reviewed" ${s.reviewed?'checked':''}>Revisado</label><label><input type="checkbox" data-topic="${encodeURIComponent(t)}" data-d="${d.id}" data-f="questions" ${s.questions?'checked':''}>Questões</label></div></div>`}).join('')}</div>`}).join('')}</div>`}
function disciplinas(){return head('Disciplinas','Peso, progresso, desempenho e conteúdo de estudo em uma única visão.')+`<div class="discipline-grid">${cargo().disciplines.map(d=>{const n=d.topics.filter(t=>state.topics[topicKey(d.id,t)]?.studied).length;const p=Math.round(n/d.topics.length*100);const qs=state.questions.filter(q=>q.cargo===state.cargoId&&q.disciplineId===d.id);const tq=qs.reduce((a,q)=>a+q.quantity,0),tc=qs.reduce((a,q)=>a+q.correct,0),acc=tq?Math.round(tc/tq*100):0;const guide=studyGuides[d.id];return `<div class="card discipline-card"><div class="weight-badge">${d.share}% da prova</div><h3>${esc(d.name)}</h3><div class="mini-stats"><span><b>${d.questions}</b> questões</span><span><b>${d.weight}</b> peso</span><span><b>${acc}%</b> acertos</span></div><div class="progress"><i style="width:${p}%"></i></div><small>${n}/${d.topics.length} tópicos estudados · ${p}%</small>${guide?`<div class="study-available"><b>${guide.modules.length} módulos de estudo disponíveis</b><span>Resumo, foco de prova, exemplos e fontes.</span></div>`:''}<button class="secondary discipline-open" data-open-discipline="${d.id}">Abrir disciplina</button></div>`}).join('')}</div>`}
function disciplinaPage(){
  const d=discipline(state.selectedDisciplineId)||cargo().disciplines[0]
  state.selectedDisciplineId=d.id
  const n=d.topics.filter(t=>state.topics[topicKey(d.id,t)]?.studied).length
  const progress=Math.round(n/d.topics.length*100)
  const qs=state.questions.filter(q=>q.cargo===state.cargoId&&q.disciplineId===d.id)
  const tq=qs.reduce((a,q)=>a+q.quantity,0),tc=qs.reduce((a,q)=>a+q.correct,0),acc=tq?Math.round(tc/tq*100):0
  const ss=state.sessions.filter(s=>s.cargo===state.cargoId&&s.disciplineId===d.id)
  const mins=ss.reduce((a,s)=>a+s.durationMinutes,0)
  const guide=studyGuides[d.id]
  const related=materials.filter(m=>(m.cargo==='ambos'||m.cargo===state.cargoId)&&m.disciplines.includes(d.id))
  const reviews=state.reviews.filter(r=>r.cargo===state.cargoId&&r.disciplineId===d.id&&r.status!=='done')
  const updateNotice=d.id==='fiscal-especificos'||d.id==='fiscal-legislacao'?`<div class="notice legal-update"><div><b>⚠ Código de Posturas: consulte também as alterações posteriores.</b><span>A biblioteca inclui as LCs 1.289/2025, 1.294/2025, 1.304/2025 e 1.310/2025, que modificaram pontos da Lei nº 3.531/1968. Estude a norma-base junto com as leis modificadoras oficiais.</span></div></div>`:''
  return `<button class="back-link" data-go="disciplinas">← Voltar para disciplinas</button>`+
  head(d.name,`${d.questions} questões · peso ${d.weight} · ${d.share}% da pontuação`)+updateNotice+
  `<div class="discipline-kpis">${metric('Progresso',progress+'%',`${n}/${d.topics.length} tópicos`)}${metric('Desempenho',acc+'%',`${tq} questões registradas`)}${metric('Tempo estudado',Math.round(mins/6)/10+'h',`${ss.length} sessões`)}${metric('Revisões',reviews.length,'pendentes/agendadas')}</div>`+
  `<div class="card discipline-section"><div class="section-row"><div><span class="eyebrow dark">CONTEÚDO DO EDITAL</span><h3>Checklist da disciplina</h3></div><b>${progress}% concluído</b></div><div class="compact-topics">${d.topics.map((t,i)=>{const st=state.topics[topicKey(d.id,t)]||{};return `<label class="compact-topic ${st.studied?'done':''}"><input type="checkbox" data-topic="${encodeURIComponent(t)}" data-d="${d.id}" data-f="studied" ${st.studied?'checked':''}><span><b>${i+1}.</b> ${esc(t)}</span></label>`}).join('')}</div></div>`+
  (guide?`<div class="study-intro"><div><span class="eyebrow dark">RESUMO PARA ESTUDO</span><h3>Trilha guiada</h3><p>${esc(guide.intro)}</p></div><span class="guide-badge">${guide.modules.length} módulos</span></div><div class="study-module-stack">${guide.modules.map((m,i)=>studyModule(m,i,related,d)).join('')}</div>`:`<div class="card notice-card"><h3>Conteúdo do edital organizado</h3><p>Esta disciplina já possui checklist, materiais vinculados, questões, revisões e histórico. Os resumos guiados estão sendo priorizados pelas matérias de maior peso.</p></div>`)+
  `<div class="discipline-bottom-grid"><div class="card"><h3>Leis e materiais relacionados</h3>${related.slice(0,8).map(m=>`<div class="source-row"><div><b>${esc(m.title)}</b><span>${esc(m.source)}</span></div><a target="_blank" rel="noreferrer" href="${m.url}">Abrir ↗</a></div>`).join('')||'<p class="muted">Nenhum material vinculado.</p>'}</div><div class="card"><h3>Histórico recente</h3>${ss.slice(0,6).map(s=>`<div class="source-row"><div><b>${esc(s.topic)}</b><span>${s.studyType} · ${fmt(s.date)}</span></div><strong>${s.durationMinutes} min</strong></div>`).join('')||'<p class="muted">Nenhuma sessão registrada nesta disciplina.</p>'}</div></div>`
}
function studyModule(m,index,related,d){
  const covered=m.topics.filter(t=>d.topics.includes(t))
  const sources=m.sourceIds.map(id=>materials.find(x=>x.id===id)).filter(Boolean)
  return `<details class="card study-module" ${index===0?'open':''}><summary><div><span>MÓDULO ${index+1}</span><h3>${esc(m.title.replace(/^\d+\.\s*/,''))}</h3><p>${covered.map(esc).join(' · ')}</p></div><b>⌄</b></summary><div class="study-module-body"><div class="study-summary"><h4>Resumo</h4><p>${esc(m.summary)}</p></div><div class="study-points"><h4>Pontos-chave</h4><ul>${m.keyPoints.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="exam-focus"><b>🎯 Foco de prova</b><p>${esc(m.examFocus)}</p></div><div class="practical-example"><b>Exemplo prático</b><p>${esc(m.example)}</p></div><div class="module-footer"><div class="source-buttons">${sources.map(src=>`<a target="_blank" rel="noreferrer" href="${src.url}">📖 ${esc(src.title)}</a>`).join('')}</div><button class="primary" data-study-module="${m.id}" data-study-d="${d.id}" data-study-topic="${encodeURIComponent(covered[0]||d.topics[0])}">Registrar estudo</button></div></div></details>`
}
function materiais(){
  const all=materials.filter(m=>m.cargo==='ambos'||m.cargo===state.cargoId)
  const relevantDisciplineNames=m=>m.disciplines.map(id=>cargo().disciplines.find(d=>d.id===id)?.name).filter(Boolean)
  const q=state.materialQuery.trim().toLowerCase()
  const list=all.filter(m=>{
    const byQ=!q||[m.title,m.description,m.source,m.type,m.category,m.priority,...relevantDisciplineNames(m)].join(' ').toLowerCase().includes(q)
    const byCat=state.materialCategory==='all'||m.category===state.materialCategory
    const byPriority=state.materialPriority==='all'||m.priority===state.materialPriority
    return byQ&&byCat&&byPriority
  })
  const statusCounts=['Não iniciado','Estudando','Concluído'].map(x=>[x,all.filter(m=>(state.materialStatus[m.id]||'Não iniciado')===x).length])
  return head('Leis e Materiais',`${all.length} fontes selecionadas para ${cargo().name}.`)+`<div class="notice"><div><b>Lei seca continua indispensável.</b><span>As fontes abaixo foram vinculadas ao conteúdo do edital. Materiais complementares não substituem a norma oficial.</span></div></div><div class="material-summary">${statusCounts.map(([label,n])=>`<div><b>${n}</b><span>${label}</span></div>`).join('')}</div><div class="card material-toolbar"><label class="field"><span>Pesquisar</span><input id="materialSearch" value="${esc(state.materialQuery)}" placeholder="Lei, SUAS, ECA, Código de Posturas..."></label><label class="field"><span>Categoria</span><select id="materialCategory"><option value="all">Todas</option><option ${state.materialCategory==='Fonte oficial gratuita'?'selected':''}>Fonte oficial gratuita</option><option ${state.materialCategory==='Material complementar gratuito'?'selected':''}>Material complementar gratuito</option></select></label><label class="field"><span>Prioridade</span><select id="materialPriority"><option value="all">Todas</option><option ${state.materialPriority==='Essencial'?'selected':''}>Essencial</option><option ${state.materialPriority==='Alta'?'selected':''}>Alta</option><option ${state.materialPriority==='Complementar'?'selected':''}>Complementar</option></select></label></div><div class="material-grid">${list.map(m=>{const st=state.materialStatus[m.id]||'Não iniciado',ds=relevantDisciplineNames(m);return `<div class="card material-card"><div class="material-meta"><span>${esc(m.type)}</span><span class="priority ${m.priority.toLowerCase()}">${esc(m.priority)}</span></div><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p>${ds.length?`<div class="material-disciplines">${ds.map(d=>`<span>${esc(short(d))}</span>`).join('')}</div>`:''}<small>${esc(m.source)} · ${esc(m.category)}</small><div class="material-actions"><label><span>Status</span><select data-material-status="${m.id}"><option ${st==='Não iniciado'?'selected':''}>Não iniciado</option><option ${st==='Estudando'?'selected':''}>Estudando</option><option ${st==='Concluído'?'selected':''}>Concluído</option></select></label><a class="secondary" target="_blank" rel="noreferrer" href="${m.url}">Abrir material ↗</a></div></div>`}).join('')||'<div class="card empty"><p>Nenhum material corresponde aos filtros.</p></div>'}</div>`
}
function estudar(){const c=cargo(),d=c.disciplines[0];return head('Sessão de Estudo','Registre o bloco e gere revisões em 24h, 7d e 30d.')+`<form class="card form-card" id="studyForm"><div class="form-grid">${selectField('studyD','Disciplina',c.disciplines.map(x=>[x.id,x.name]))}${selectField('studyTopic','Assunto',d.topics.map(x=>[x,x]))}${selectField('studyType','Tipo de estudo',['Teoria','Lei seca','Questões','Revisão','Simulado'].map(x=>[x,x]))}${inputField('studyMin','Duração (min)','number',45)}${inputField('studyQ','Questões realizadas','number',0)}${inputField('studyCorrect','Acertos','number',0)}</div><label class="field"><span>Observações</span><textarea id="studyNotes" rows="4"></textarea></label><button class="primary">Salvar sessão</button></form>`+history()}
function history(){const list=state.sessions.filter(s=>s.cargo===state.cargoId).slice(0,8);return `<div class="card history"><h3>Histórico recente</h3>${list.length?list.map(s=>`<div class="history-row"><div><b>${esc(discipline(s.disciplineId)?.name)}</b><span>${esc(s.topic)} · ${s.studyType}</span></div><div><b>${s.durationMinutes} min</b><span>${fmt(s.date)}</span></div></div>`).join(''):'<p class="muted">Nenhuma sessão registrada.</p>'}</div>`}
const shuffle = (arr) => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]} return a }
const bankCargo = () => questionBank.filter(q=>q.cargo===state.cargoId)
const sourceLink = (q) => materials.find(m=>m.id===q.sourceId)
const bankPool = () => bankCargo().filter(q=>(state.bankDiscipline==='all'||q.disciplineId===state.bankDiscipline)&&(state.bankTopic==='all'||q.topic===state.bankTopic)&&(state.bankDifficulty==='all'||q.difficulty===state.bankDifficulty))
const freshPool = (pool) => {
  const lastSeen=new Map();
  for(const a of state.bankAttempts){if(a.cargo===state.cargoId&&!lastSeen.has(a.questionId))lastSeen.set(a.questionId,Date.parse(a.at||a.date)||0)}
  return shuffle(pool).sort((a,b)=>(lastSeen.get(a.id)||0)-(lastSeen.get(b.id)||0))
}
function questionStats(){const a=state.bankAttempts.filter(x=>x.cargo===state.cargoId),correct=a.filter(x=>x.correct).length;return{answered:a.length,correct,accuracy:a.length?Math.round(correct/a.length*100):0,available:bankCargo().length}}
function questoes(){
  if(state.quiz) return renderQuiz()
  if(state.quizResult) return renderQuizResult()
  const c=cargo(),d=c.disciplines[0],list=state.questions.filter(q=>q.cargo===state.cargoId).slice(0,12),stats=questionStats()
  const selectedD=state.bankDiscipline==='all'?null:discipline(state.bankDiscipline)
  const topics=selectedD?[...new Set(bankCargo().filter(q=>q.disciplineId===selectedD.id).map(q=>q.topic))]:[]
  const counts=c.disciplines.map(x=>[x,bankCargo().filter(q=>q.disciplineId===x.id).length])
  const last=state.bankAttempts.filter(x=>x.cargo===state.cargoId).slice(0,8)
  return head('Banco de Questões',`Questões originais inspiradas no padrão objetivo da IBAM para ${c.name}.`)+
  `<div class="notice bank-notice"><div><b>Banco autoral — padrão IBAM, não cópia de prova.</b><span>4 alternativas (A–D), uma resposta correta, cobrança normativa, interpretação e situações práticas. A seleção prioriza questões inéditas ou menos recentes para reduzir repetição.</span></div></div>`+
  `<div class="metric-grid bank-metrics">${metric('Questões no banco',stats.available,'Disponíveis para este cargo')}${metric('Respondidas',stats.answered,'Tentativas registradas')}${metric('Acertos',stats.accuracy+'%',`${stats.correct} respostas corretas`)}${metric('Simulado completo',c.disciplines.reduce((a,x)=>a+x.questions,0),'Distribuição real do edital')}</div>`+
  `<div class="card bank-builder"><div class="section-row"><div><span class="eyebrow dark">RESOLVER AGORA</span><h3>Monte um bloco de questões</h3></div><span class="ibam-badge">ESTILO IBAM</span></div><form id="bankForm"><div class="form-grid bank-filter-grid"><label class="field"><span>Disciplina</span><select id="bankD"><option value="all">Todas as disciplinas</option>${c.disciplines.map(x=>`<option value="${x.id}" ${state.bankDiscipline===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label><label class="field"><span>Assunto</span><select id="bankTopic"><option value="all">Todos os assuntos</option>${topics.map(t=>`<option value="${esc(t)}" ${state.bankTopic===t?'selected':''}>${esc(t)}</option>`).join('')}</select></label><label class="field"><span>Dificuldade</span><select id="bankDifficulty"><option value="all" ${state.bankDifficulty==='all'?'selected':''}>Todas</option><option value="fácil" ${state.bankDifficulty==='fácil'?'selected':''}>Fácil</option><option value="médio" ${state.bankDifficulty==='médio'?'selected':''}>Médio</option><option value="difícil" ${state.bankDifficulty==='difícil'?'selected':''}>Difícil</option></select></label><label class="field"><span>Quantidade</span><input id="bankQty" type="number" min="1" max="30" value="${state.bankQty}"></label></div><div class="bank-actions"><button class="primary" type="submit">Iniciar bloco</button><button class="secondary" type="button" id="startFullSim">Simulado completo do edital</button></div><p class="muted bank-pool-info">O filtro atual possui <b>${bankPool().length}</b> questão(ões).</p></form></div>`+
  `<div class="bank-discipline-grid">${counts.map(([x,n])=>`<div class="card bank-discipline"><div><span>${x.questions} na prova · peso ${x.weight}</span><h3>${esc(short(x.name))}</h3></div><strong>${n}</strong><small>questões no banco</small></div>`).join('')}</div>`+
  `<div class="card bank-history"><div class="section-row"><div><span class="eyebrow dark">HISTÓRICO DO BANCO</span><h3>Últimas respostas</h3></div></div>${last.length?last.map(a=>{const q=questionBank.find(x=>x.id===a.questionId);return `<div class="bank-history-row"><span class="result-dot ${a.correct?'ok':'bad'}"></span><div><b>${esc(q?short(discipline(q.disciplineId)?.name||''):'Questão')}</b><small>${esc(q?.topic||'')} · ${fmt(a.date)}</small></div><strong>${a.correct?'Acertou':'Errou'}</strong></div>`}).join(''):'<p class="muted">Nenhuma questão do banco respondida ainda.</p>'}</div>`+
  `<details class="card manual-question-register"><summary>Registrar questões feitas fora da plataforma</summary><form id="qForm"><div class="form-grid">${selectField('qD','Disciplina',c.disciplines.map(x=>[x.id,x.name]))}${selectField('qTopic','Assunto',d.topics.map(x=>[x,x]))}${inputField('qQty','Quantidade','number',10)}${inputField('qCorrect','Acertos','number',0)}</div><button class="primary">Registrar resultado externo</button></form>${list.length?`<div class="mini-history"><h4>Registros recentes</h4>${list.map(q=>{const r=Math.round(q.correct/q.quantity*100),l=level(r);return `<div><span>${esc(short(discipline(q.disciplineId)?.name||''))} · ${esc(q.topic)}</span><b>${q.correct}/${q.quantity} · <em class="${l.c}">${r}%</em></b></div>`}).join('')}</div>`:''}</details>`
}
function renderQuiz(){
  const ids=state.quiz.questionIds,q=questionBank.find(x=>x.id===ids[state.quiz.index]); if(!q){state.quiz=null;persist();return questoes()}
  if(state.quiz.mode==='simulado') return renderSimulationQuestion(q)
  const selected=state.quiz.answers[q.id],answered=Number.isInteger(selected),src=sourceLink(q),letter=i=>'ABCD'[i]
  const pct=Math.round(((state.quiz.index+(answered?1:0))/ids.length)*100)
  return `<div class="quiz-shell"><div class="quiz-top"><button class="back-link" data-quit-quiz>← Sair do bloco</button><div><b>BLOCO DE QUESTÕES</b><span>Questão ${state.quiz.index+1} de ${ids.length}</span></div></div><div class="progress quiz-progress"><i style="width:${pct}%"></i></div><div class="card quiz-card"><div class="quiz-meta"><span class="ibam-badge">ORIGINAL · ESTILO IBAM</span><span class="difficulty ${q.difficulty}">${esc(q.difficulty)}</span></div><p class="quiz-discipline">${esc(discipline(q.disciplineId)?.name||'')} · <b>${esc(q.topic)}</b></p><h3>${esc(q.stem).replaceAll('\n','<br>')}</h3><div class="quiz-options">${q.options.map((o,i)=>{const cls=answered?(i===q.answer?'correct':i===selected?'wrong':''):'';return `<button ${answered?'disabled':''} class="quiz-option ${cls}" data-answer="${i}"><span>${letter(i)}</span><p>${esc(o)}</p></button>`}).join('')}</div>${answered?`<div class="answer-feedback ${selected===q.answer?'correct-box':'wrong-box'}"><b>${selected===q.answer?'✓ Resposta correta':'✕ Resposta incorreta'} — alternativa ${letter(q.answer)}</b><p>${esc(q.explanation)}</p>${src?`<a href="${src.url}" target="_blank" rel="noreferrer">Consultar fonte relacionada ↗</a>`:''}${selected!==q.answer?`<button class="secondary add-error-btn" data-add-bank-error="${q.id}">Adicionar ao Caderno de Erros</button>`:''}</div><div class="quiz-next"><span>${selected===q.answer?'Bom. Consolide o raciocínio antes de avançar.':'Leia o comentário e identifique exatamente por que a alternativa correta vence as demais.'}</span><button class="primary" data-next-question>${state.quiz.index===ids.length-1?'Finalizar':'Próxima questão →'}</button></div>`:''}</div></div>`
}
function renderSimulationQuestion(q){
  const quiz=state.quiz,ids=quiz.questionIds,answers=quiz.answers||{},flagged=quiz.flagged||{},letter=i=>'ABCD'[i]
  const selected=answers[q.id],answeredCount=ids.filter(id=>Number.isInteger(answers[id])).length,flaggedCount=ids.filter(id=>flagged[id]).length
  const remaining=Math.max(0,Math.ceil((quiz.startedAt+(quiz.durationMinutes||OFFICIAL_EXAM_MINUTES)*60000-Date.now())/1000))
  return `<div class="simulation-shell">
    <div class="simulation-toolbar card">
      <div><span class="eyebrow dark">SIMULADO OFICIAL · ESTILO IBAM</span><b>${esc(cargo().name)}</b><small>${ids.length} questões · 3h30 · sem correção durante a prova</small></div>
      <div class="simulation-clock"><span>Tempo restante</span><strong id="simTimer">${formatClock(remaining)}</strong></div>
      <button class="secondary danger-outline" data-quit-quiz>Encerrar sem salvar</button>
    </div>
    <div class="simulation-layout">
      <section>
        <div class="simulation-question-head">
          <div><span>Questão ${quiz.index+1} de ${ids.length}</span><b>${esc(short(discipline(q.disciplineId)?.name||''))}</b></div>
          <button class="flag-button ${flagged[q.id]?'active':''}" data-sim-flag="${q.id}">${flagged[q.id]?'★ Marcada para revisar':'☆ Marcar para revisar'}</button>
        </div>
        <div class="card quiz-card simulation-question-card">
          <div class="quiz-meta"><span class="ibam-badge">ORIGINAL · ESTILO IBAM</span><span class="difficulty ${q.difficulty}">${esc(q.difficulty)}</span></div>
          <p class="quiz-discipline">${esc(discipline(q.disciplineId)?.name||'')} · <b>${esc(q.topic)}</b></p>
          <h3>${esc(q.stem).replaceAll('\n','<br>')}</h3>
          <div class="quiz-options simulation-options">${q.options.map((o,i)=>`<button class="quiz-option ${selected===i?'selected':''}" data-answer="${i}"><span>${letter(i)}</span><p>${esc(o)}</p></button>`).join('')}</div>
          <div class="simulation-nav-actions">
            <button class="secondary" data-sim-prev ${quiz.index===0?'disabled':''}>← Anterior</button>
            <span>${answeredCount}/${ids.length} respondidas · ${flaggedCount} marcada(s)</span>
            <button class="primary" data-sim-next>${quiz.index===ids.length-1?'Ir ao cartão-resposta':'Próxima →'}</button>
          </div>
        </div>
      </section>
      <aside class="card answer-sheet">
        <div class="answer-sheet-head"><div><span class="eyebrow dark">CARTÃO-RESPOSTA</span><h3>${answeredCount}/${ids.length} respondidas</h3></div><small>★ revisar</small></div>
        <div class="answer-grid">${ids.map((id,i)=>{const done=Number.isInteger(answers[id]),mark=!!flagged[id],cur=i===quiz.index;return `<button data-sim-jump="${i}" class="answer-number ${done?'answered':''} ${mark?'flagged':''} ${cur?'current':''}">${i+1}${mark?'<i>★</i>':''}</button>`}).join('')}</div>
        <div class="answer-legend"><span><i class="answered"></i>Respondida</span><span><i class="flagged"></i>Revisar</span><span><i></i>Em branco</span></div>
        <div class="answer-sheet-summary"><b>${ids.length-answeredCount} em branco</b><span>Você pode alterar qualquer resposta até finalizar.</span></div>
        <button class="primary finish-simulation" id="finishSimulation">Finalizar prova</button>
      </aside>
    </div>
  </div>`
}
function startSimulationTimer(){
  if(!state.quiz||state.quiz.mode!=='simulado')return
  const tick=()=>{
    if(!state.quiz||state.quiz.mode!=='simulado'){if(quizTimerHandle)clearInterval(quizTimerHandle);quizTimerHandle=null;return}
    const deadline=state.quiz.startedAt+(state.quiz.durationMinutes||OFFICIAL_EXAM_MINUTES)*60000
    const seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000)),el=$('#simTimer')
    if(el){el.textContent=formatClock(seconds);el.classList.toggle('urgent',seconds<=900)}
    if(seconds<=0){if(quizTimerHandle)clearInterval(quizTimerHandle);quizTimerHandle=null;finishQuiz(true)}
  }
  tick();quizTimerHandle=setInterval(tick,1000)
}
function startOfficialSimulation(){
  const ids=[]
  for(const d of cargo().disciplines){
    const pool=freshPool(bankCargo().filter(q=>q.disciplineId===d.id))
    if(pool.length<d.questions){alert(`Banco insuficiente em ${d.name}: ${pool.length}/${d.questions}.`);return}
    ids.push(...pool.slice(0,d.questions).map(q=>q.id))
  }
  state.quizResult=null
  state.quiz={mode:'simulado',questionIds:ids,index:0,answers:{},flagged:{},startedAt:Date.now(),durationMinutes:OFFICIAL_EXAM_MINUTES}
  state.page='questoes';persist();render()
}
function finishQuiz(force=false){
  if(!state.quiz)return
  const quiz=state.quiz,ids=quiz.questionIds,answers=quiz.answers||{},startedAt=quiz.startedAt,mode=quiz.mode
  const all=ids.map(id=>questionBank.find(q=>q.id===id)).filter(Boolean).map(q=>({q,selected:answers[q.id]}))
  if(mode==='simulado'&&!force){const blanks=all.filter(x=>!Number.isInteger(x.selected)).length;if(!confirm(blanks?`Ainda há ${blanks} questão(ões) em branco. Deseja finalizar e contabilizá-las como não acertadas?`:'Finalizar o simulado agora? Depois disso o gabarito e os comentários serão liberados.'))return}
  const graded=mode==='simulado'?all:all.filter(x=>Number.isInteger(x.selected)),groups={}
  const correct=graded.filter(x=>x.selected===x.q.answer).length
  graded.forEach(({q,selected})=>{
    const ok=selected===q.answer,blank=!Number.isInteger(selected)
    state.bankAttempts.unshift({id:uid(),cargo:state.cargoId,questionId:q.id,disciplineId:q.disciplineId,topic:q.topic,selected:blank?null:selected,correct:ok,blank,date:today(),at:new Date().toISOString(),source:mode==='simulado'?'simulado':'bloco'})
    const k=q.disciplineId+'||'+q.topic;groups[k]??={disciplineId:q.disciplineId,topic:q.topic,quantity:0,correct:0};groups[k].quantity++;groups[k].correct+=ok?1:0
    const tk=topicKey(q.disciplineId,q.topic),cur=state.topics[tk]||{studied:false,reviewed:false,questions:false};state.topics[tk]={...cur,questions:true}
  })
  Object.values(groups).forEach(g=>state.questions.unshift({id:uid(),cargo:state.cargoId,...g,date:today(),source:mode==='simulado'?'simulado-ibam':'banco'}))
  let weighted=null,byDiscipline=[],byTopic=[]
  if(mode==='simulado'){
    weighted=0
    byDiscipline=cargo().disciplines.map(d=>{const items=graded.filter(x=>x.q.disciplineId===d.id),hits=items.filter(x=>x.selected===x.q.answer).length,blank=items.filter(x=>!Number.isInteger(x.selected)).length,points=hits*d.weight,max=d.questions*d.weight;weighted+=points;return{disciplineId:d.id,total:items.length,correct:hits,blank,accuracy:items.length?Math.round(hits/items.length*100):0,points,max,lost:max-points}})
    const tg={};graded.forEach(x=>{const k=x.q.disciplineId+'||'+x.q.topic;tg[k]??={disciplineId:x.q.disciplineId,topic:x.q.topic,total:0,correct:0,blank:0};tg[k].total++;tg[k].correct+=x.selected===x.q.answer?1:0;tg[k].blank+=Number.isInteger(x.selected)?0:1});byTopic=Object.values(tg).map(x=>({...x,accuracy:Math.round(x.correct/x.total*100)})).sort((a,b)=>a.accuracy-b.accuracy||b.total-a.total)
  }
  const durationLimit=quiz.durationMinutes||OFFICIAL_EXAM_MINUTES,durationMinutes=Math.min(durationLimit,Math.max(1,Math.round((Date.now()-startedAt)/60000)))
  const wrongIds=graded.filter(x=>x.selected!==x.q.answer).map(x=>x.q.id),blankIds=graded.filter(x=>!Number.isInteger(x.selected)).map(x=>x.q.id),flaggedIds=Object.keys(quiz.flagged||{}).filter(id=>quiz.flagged[id])
  if(mode==='simulado')state.simulations.unshift({id:uid(),cargo:state.cargoId,date:today(),raw:correct,weighted,source:'banco-ibam-v8',durationMinutes,answered:graded.length-blankIds.length,blank:blankIds.length,byDiscipline})
  state.quizResult={mode,total:graded.length,correct,accuracy:graded.length?Math.round(correct/graded.length*100):0,weighted,durationMinutes,wrongIds,blankIds,flaggedIds,questionIds:ids,answers:{...answers},byDiscipline,byTopic,timeExpired:force&&Date.now()>=startedAt+durationLimit*60000}
  state.quiz=null;if(mode==='simulado')state.page='questoes';persist();render()
}
function renderQuizResult(){
  const r=state.quizResult;if(r.mode==='simulado')return renderSimulationResult(r)
  const l=level(r.accuracy);return head('Resultado do bloco','Seu desempenho já foi incorporado ao cronograma e ao painel de desempenho.')+`<div class="card quiz-result"><span class="status ${l.c}">${l.l}</span><h2>${r.correct}/${r.total}</h2><p>${r.accuracy}% de acertos · ${r.durationMinutes} min</p><div class="result-actions">${r.wrongIds.length?`<button class="secondary" id="retryWrong">Refazer ${r.wrongIds.length} errada(s)</button>`:''}<button class="primary" id="newQuiz">Novo bloco</button></div></div>`
}
function renderSimulationResult(r){
  const c=cargo(),totalQuestions=c.disciplines.reduce((a,d)=>a+d.questions,0),eligible=r.weighted>=50,reviewIds=[...new Set([...(r.wrongIds||[]),...(r.flaggedIds||[])])],letter=i=>Number.isInteger(i)?'ABCD'[i]:'—'
  const weak=(r.byTopic||[]).filter(x=>x.accuracy<100).slice(0,12)
  return head('Resultado do Simulado',r.timeExpired?'O tempo de 3h30 terminou e a prova foi finalizada automaticamente.':'Correção liberada somente após a finalização, como em uma prova real.')+
  `<div class="simulation-result-hero card"><div><span class="status ${eligible?'good':'critical'}">${eligible?'≥ 50 pontos':'< 50 pontos'}</span><h2>${r.weighted}/100</h2><p>Nota ponderada · ${r.correct}/${totalQuestions} acertos · ${r.accuracy}%</p><small>O edital exige no mínimo 50% dos pontos para habilitação objetiva, além da margem classificatória prevista.</small></div><div class="result-time"><span>Tempo utilizado</span><b>${r.durationMinutes} min</b><small>${r.blankIds.length} em branco · ${r.flaggedIds.length} marcada(s) para revisar</small></div></div>`+
  `<div class="metric-grid simulation-result-metrics">${metric('Acertos brutos',`${r.correct}/${totalQuestions}`,`${r.accuracy}%`)}${metric('Nota ponderada',`${r.weighted}/100`,`${100-r.weighted} ponto(s) perdido(s)`)}${metric('Em branco',r.blankIds.length,'Contabilizadas sem acerto')}${metric('Revisar',r.flaggedIds.length,'Marcadas durante a prova')}</div>`+
  `<div class="card table-card simulation-breakdown"><div class="section-row"><div><span class="eyebrow dark">DESEMPENHO POR DISCIPLINA</span><h3>Onde a nota foi ganha e perdida</h3></div></div><table><thead><tr><th>Disciplina</th><th>Acertos</th><th>%</th><th>Pontos</th><th>Perdidos</th></tr></thead><tbody>${r.byDiscipline.map(x=>`<tr><td>${esc(short(discipline(x.disciplineId)?.name||''))}</td><td>${x.correct}/${x.total}</td><td>${x.accuracy}%</td><td><b>${x.points}/${x.max}</b></td><td>${x.lost}</td></tr>`).join('')}</tbody></table></div>`+
  `<div class="simulation-report-grid"><div class="card"><div class="section-row"><div><span class="eyebrow dark">ASSUNTOS FRACOS</span><h3>Prioridade de revisão</h3></div></div>${weak.length?weak.map(x=>`<div class="weak-topic-row"><div><b>${esc(x.topic)}</b><span>${esc(short(discipline(x.disciplineId)?.name||''))}</span></div><strong class="${level(x.accuracy).c}">${x.correct}/${x.total} · ${x.accuracy}%</strong></div>`).join(''):'<p class="muted">Nenhum erro no simulado. Excelente consistência.</p>'}</div><div class="card"><div class="section-row"><div><span class="eyebrow dark">PRÓXIMA AÇÃO</span><h3>Transforme erro em revisão</h3></div></div><p class="muted">As respostas já alimentaram o painel de desempenho e o algoritmo do cronograma. Use o gabarito comentado abaixo para revisar somente o que exigiu atenção.</p><div class="result-actions stacked">${r.wrongIds.length?`<button class="secondary" id="retryWrong">Refazer ${r.wrongIds.length} errada(s)/em branco</button>`:''}<button class="primary" id="newSimulation">Novo simulado completo</button><button class="secondary" id="newQuiz">Voltar ao banco</button></div></div></div>`+
  `<div class="card post-exam-review"><div class="section-row"><div><span class="eyebrow dark">GABARITO COMENTADO PÓS-PROVA</span><h3>${reviewIds.length?`${reviewIds.length} questão(ões) para revisar`:'Nenhuma questão pendente de revisão'}</h3></div><span class="ibam-badge">LIBERADO APÓS FINALIZAR</span></div>${reviewIds.map(id=>{const q=questionBank.find(x=>x.id===id);if(!q)return'';const sel=r.answers[q.id],src=sourceLink(q),ok=sel===q.answer;return `<details class="review-question ${ok?'review-correct':'review-wrong'}"><summary><span>${ok?'✓':'✕'}</span><div><b>${esc(q.topic)}</b><small>${esc(short(discipline(q.disciplineId)?.name||''))} · sua resposta ${letter(sel)} · correta ${letter(q.answer)}</small></div><strong>Ver comentário</strong></summary><div><p class="review-stem">${esc(q.stem).replaceAll('\n','<br>')}</p><p><b>Resposta correta: ${letter(q.answer)}.</b> ${esc(q.options[q.answer])}</p><p>${esc(q.explanation)}</p>${src?`<a href="${src.url}" target="_blank" rel="noreferrer">Consultar fonte relacionada ↗</a>`:''}${!ok?`<button class="secondary add-result-error" data-result-error="${q.id}">Adicionar ao Caderno de Erros</button>`:''}</div></details>`}).join('')||'<p class="muted">Você não errou nem marcou questões para revisão.</p>'}</div>`
}
function revisoes(){const list=state.reviews.filter(r=>r.cargo===state.cargoId).sort((a,b)=>a.dueDate.localeCompare(b.dueDate));return head('Revisões','Ciclo sugerido: 24 horas, 7 dias e 30 dias.')+`<div class="stack">${list.length?list.map(r=>`<div class="card review-row"><div><span class="status ${r.status==='done'?'good':r.dueDate<=today()?'critical':'attention'}">${r.status==='done'?'Concluída':r.dueDate<=today()?'Vencida/hoje':'Agendada'}</span><h3>${esc(r.topic)}</h3><p>${esc(discipline(r.disciplineId)?.name)} · revisão ${r.interval} · ${fmt(r.dueDate)}</p></div><div class="row-actions"><button class="secondary" data-review="${r.id}" data-status="postponed">Adiar</button><button class="primary" data-review="${r.id}" data-status="done">Concluir</button></div></div>`).join(''):'<div class="card empty"><p>As revisões aparecerão após a primeira sessão.</p></div>'}</div>`}
function erros(){const c=cargo(),d=c.disciplines[0];const list=state.errors.filter(e=>e.cargo===state.cargoId);return head('Caderno de Erros','Transforme erros recorrentes em uma fila objetiva de revisão.')+`<form class="card form-card" id="eForm"><div class="form-grid">${selectField('eD','Disciplina',c.disciplines.map(x=>[x.id,x.name]))}${selectField('eTopic','Assunto',d.topics.map(x=>[x,x]))}${selectField('eReason','Motivo do erro',['Falta de conhecimento','Confusão entre conceitos','Desatenção','Interpretação','Cálculo','Esquecimento da legislação'].map(x=>[x,x]))}</div>${textField('eQuestion','Questão / descrição')}${textField('eMine','Minha resposta')}${textField('eCorrect','Resposta correta')}${textField('eExplanation','Explicação')}<button class="primary">Adicionar erro</button></form><div class="stack">${list.map(e=>`<div class="card error-card"><div><span class="status attention">${e.reason}</span><h3>${esc(e.topic)}</h3><p>${esc(e.question)}</p><small>${fmt(e.date)}</small></div><button class="icon-btn" data-del-error="${e.id}">Excluir</button></div>`).join('')}</div>`}
function cronograma(){const list=state.schedule.filter(s=>s.cargo===state.cargoId);return head('Meu Cronograma','Prioridade baseada em peso da disciplina, progresso e desempenho.')+`<div class="card generator"><div><h3>Gerar ciclo de hoje</h3><p>Disciplinas mais pesadas e com pior desempenho recebem prioridade.</p></div><div class="generator-actions"><input id="schedMin" type="number" min="30" step="15" value="120"><span>minutos</span><button class="primary" id="genSchedule">Gerar</button></div></div><div class="stack">${list.length?list.map(s=>`<div class="card schedule-row"><div><span>${fmt(s.date)}</span><h3>${esc(s.topic)}</h3><p>${esc(discipline(s.disciplineId)?.name)} · ${s.studyType}</p></div><b>${s.minutes} min</b></div>`).join(''):'<div class="card empty"><p>Gere seu primeiro ciclo.</p></div>'}</div>`}
function desempenho(){return head('Desempenho','Horas estudadas e taxa de acertos por disciplina.')+`<div class="discipline-grid">${cargo().disciplines.map(d=>{const ss=state.sessions.filter(s=>s.cargo===state.cargoId&&s.disciplineId===d.id),qs=state.questions.filter(q=>q.cargo===state.cargoId&&q.disciplineId===d.id),mins=ss.reduce((a,s)=>a+s.durationMinutes,0),tq=qs.reduce((a,q)=>a+q.quantity,0),tc=qs.reduce((a,q)=>a+q.correct,0),acc=tq?Math.round(tc/tq*100):0;return `<div class="card discipline-card"><h3>${esc(d.name)}</h3><div class="mini-stats"><span><b>${Math.round(mins/6)/10}h</b> estudadas</span><span><b>${tq}</b> questões</span><span><b>${acc}%</b> acertos</span></div><div class="progress"><i style="width:${acc}%"></i></div></div>`}).join('')}</div>`}
function simulados(){
  const c=cargo(),rows=state.simulations.filter(s=>s.cargo===state.cargoId),total=c.disciplines.reduce((a,d)=>a+d.questions,0)
  return head('Simulados','Modo prova com cronômetro oficial, cartão-resposta e relatório por assunto.')+
  `<div class="card official-sim-card"><div><span class="eyebrow dark">MODO PROVA · EDITAL 73/2026</span><h3>Simulado completo estilo IBAM</h3><p>${total} questões na distribuição real do cargo · <b>3h30</b> de duração · 4 alternativas · correção somente no final.</p><div class="official-sim-features"><span>⏱ cronômetro contínuo</span><span>★ marcar para revisar</span><span>▦ cartão-resposta</span><span>📊 relatório por assunto</span></div></div><button class="primary big-action" id="startOfficialSimulation">Iniciar simulado de prova</button></div>`+
  `<details class="card manual-question-register"><summary>Registrar um simulado feito fora da plataforma</summary><form class="form-card" id="simForm"><div class="simulation-grid">${c.disciplines.map(d=>`<label class="field"><span>${esc(short(d.name))} — ${d.questions} questões, peso ${d.weight}</span><input type="number" min="0" max="${d.questions}" value="0" data-sim="${d.id}"></label>`).join('')}</div><button class="primary">Registrar simulado externo</button></form></details>`+
  `<div class="card table-card simulation-history"><div class="section-row"><div><span class="eyebrow dark">HISTÓRICO</span><h3>Resultados anteriores</h3></div></div><table><thead><tr><th>Data</th><th>Acertos</th><th>Nota ponderada</th><th>Tempo</th><th>Origem</th></tr></thead><tbody>${rows.length?rows.map(s=>`<tr><td>${fmt(s.date)}</td><td>${s.raw}/${total}</td><td><b>${s.weighted}/100</b></td><td>${s.durationMinutes?`${s.durationMinutes} min`:'—'}</td><td>${s.source?.startsWith('banco-ibam')?'Modo prova':'Registro externo'}</td></tr>`).join(''):`<tr><td colspan="5" class="muted">Nenhum simulado registrado.</td></tr>`}</tbody></table></div>`
}
function config(){const imported=currentUser?load(`santos:legacyImported:${currentUser.id}`,false):false;return head('Configurações','Preferências da sua preparação e sincronização.')+`<div class="config-grid"><div class="card form-card"><h3>Preparação</h3><label class="field"><span>Data da prova</span><input id="examDate" type="date" value="${state.examDate}"></label><p class="muted">Alterações são salvas na sua conta Supabase e mantidas também em cache local neste dispositivo.</p></div><div class="card cloud-account-card"><span class="eyebrow dark">CONTA</span><h3>${esc(currentUser?.email||'')}</h3><p>Seus dados ficam associados ao seu usuário e protegidos por Row Level Security. Outra conta não consegue consultar este progresso.</p><div class="cloud-account-actions"><button class="secondary" id="syncNowBtn">Sincronizar agora</button>${legacyHasData&&!imported?`<button class="secondary" id="importLegacyBtn">Importar dados antigos deste navegador</button>`:''}</div></div></div>`}

function selectField(id,label,opts){return `<label class="field"><span>${label}</span><select id="${id}">${opts.map(([v,l])=>`<option value="${esc(v)}">${esc(l)}</option>`).join('')}</select></label>`}
function inputField(id,label,type,val){return `<label class="field"><span>${label}</span><input id="${id}" type="${type}" value="${val}" min="0"></label>`}
function textField(id,label){return `<label class="field"><span>${label}</span><textarea id="${id}" rows="3"></textarea></label>`}
function level(r){if(r<60)return{l:'Crítico',c:'critical'};if(r<75)return{l:'Atenção',c:'attention'};if(r<85)return{l:'Bom',c:'good'};return{l:'Domínio',c:'mastery'}}
function short(n){return n.replace('Conhecimentos Específicos de ','Específicos ').replace('Direito Constitucional, Administrativo, Poder de Polícia e Processo Administrativo','Direito').replace('Legislação Municipal de Santos Aplicada à Fiscalização','Legislação Municipal').replace('Políticas Públicas de Assistência Social, SUAS, ECA e Atendimento Socioassistencial','SUAS / ECA').replace('Conhecimentos Básicos de Legislação Municipal e Serviço Público','Legislação / Serviço Público')}
function syncTopicSelect(dSel,tSel){const ds=$(`#${dSel}`),ts=$(`#${tSel}`);if(!ds||!ts)return;const update=()=>{const d=discipline(ds.value);ts.innerHTML=d.topics.map(t=>`<option>${esc(t)}</option>`).join('')};ds.onchange=update}

function bindPage(){
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{state.page=b.dataset.go;render()})
  document.querySelectorAll('[data-open-discipline]').forEach(b=>b.onclick=()=>{state.selectedDisciplineId=b.dataset.openDiscipline;state.page='disciplina';render()})
  document.querySelectorAll('[data-study-module]').forEach(b=>b.onclick=()=>{state.studyPrefill={disciplineId:b.dataset.studyD,topic:decodeURIComponent(b.dataset.studyTopic)};state.page='estudar';render()})
  document.querySelectorAll('[data-topic]').forEach(i=>i.onchange=()=>{const t=decodeURIComponent(i.dataset.topic),k=topicKey(i.dataset.d,t),cur=state.topics[k]||{studied:false,reviewed:false,questions:false};state.topics[k]={...cur,[i.dataset.f]:i.checked};persist();render()})
  syncTopicSelect('studyD','studyTopic'); syncTopicSelect('qD','qTopic'); syncTopicSelect('eD','eTopic')
  const bankD=$('#bankD');if(bankD)bankD.onchange=()=>{state.bankDiscipline=bankD.value;state.bankTopic='all';render()}
  const bankTopic=$('#bankTopic');if(bankTopic)bankTopic.onchange=()=>{state.bankTopic=bankTopic.value;render()}
  const bankDifficulty=$('#bankDifficulty');if(bankDifficulty)bankDifficulty.onchange=()=>{state.bankDifficulty=bankDifficulty.value;render()}
  const bankForm=$('#bankForm');if(bankForm)bankForm.onsubmit=e=>{e.preventDefault();state.bankQty=Math.max(1,Math.min(30,+$('#bankQty').value||10));const pool=freshPool(bankPool());if(!pool.length)return;state.quizResult=null;state.quiz={mode:'block',questionIds:pool.slice(0,Math.min(state.bankQty,pool.length)).map(q=>q.id),index:0,answers:{},flagged:{},startedAt:Date.now()};persist();render()}
  const fullSim=$('#startFullSim');if(fullSim)fullSim.onclick=startOfficialSimulation
  const officialSim=$('#startOfficialSimulation');if(officialSim)officialSim.onclick=startOfficialSimulation
  document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{const qid=state.quiz?.questionIds[state.quiz.index];if(!qid)return;if(state.quiz.mode!=='simulado'&&Number.isInteger(state.quiz.answers[qid]))return;state.quiz.answers[qid]=+b.dataset.answer;persist();render()})
  document.querySelectorAll('[data-sim-jump]').forEach(b=>b.onclick=()=>{if(!state.quiz||state.quiz.mode!=='simulado')return;state.quiz.index=+b.dataset.simJump;persist();render()})
  const simPrev=$('[data-sim-prev]');if(simPrev)simPrev.onclick=()=>{if(state.quiz.index>0){state.quiz.index--;persist();render()}}
  const simNext=$('[data-sim-next]');if(simNext)simNext.onclick=()=>{if(state.quiz.index<state.quiz.questionIds.length-1){state.quiz.index++;persist();render()}else{document.querySelector('.answer-sheet')?.scrollIntoView({behavior:'smooth',block:'start'})}}
  const simFlag=$('[data-sim-flag]');if(simFlag)simFlag.onclick=()=>{state.quiz.flagged??={};state.quiz.flagged[simFlag.dataset.simFlag]=!state.quiz.flagged[simFlag.dataset.simFlag];persist();render()}
  const finishSim=$('#finishSimulation');if(finishSim)finishSim.onclick=()=>finishQuiz(false)
  const addBankError=$('[data-add-bank-error]');if(addBankError)addBankError.onclick=()=>{const q=questionBank.find(x=>x.id===addBankError.dataset.addBankError),selected=state.quiz?.answers[q?.id];if(!q||!Number.isInteger(selected))return;const exists=state.errors.some(e=>e.bankQuestionId===q.id&&!e.reviewed);if(!exists)state.errors.unshift({id:uid(),cargo:state.cargoId,disciplineId:q.disciplineId,topic:q.topic,question:q.stem,myAnswer:q.options[selected],correctAnswer:q.options[q.answer],reason:'Falta de conhecimento',explanation:q.explanation,date:today(),reviewed:false,bankQuestionId:q.id});persist();addBankError.textContent='Adicionada ao Caderno';addBankError.disabled=true}
  const nextQ=$('[data-next-question]');if(nextQ)nextQ.onclick=()=>{if(state.quiz.index>=state.quiz.questionIds.length-1)finishQuiz();else{state.quiz.index++;persist();render()}}
  const quitQ=$('[data-quit-quiz]');if(quitQ)quitQ.onclick=()=>{const msg=state.quiz?.mode==='simulado'?'Encerrar este simulado sem registrar resultado? O cronômetro e as respostas serão descartados.':'Sair deste bloco? As respostas ainda não serão registradas.';if(confirm(msg)){state.quiz=null;persist();render()}}
  const retryWrong=$('#retryWrong');if(retryWrong)retryWrong.onclick=()=>{const ids=[...state.quizResult.wrongIds];state.quizResult=null;state.quiz={mode:'block',questionIds:shuffle(ids),index:0,answers:{},flagged:{},startedAt:Date.now()};persist();render()}
  const newQuiz=$('#newQuiz');if(newQuiz)newQuiz.onclick=()=>{state.quizResult=null;persist();render()}
  const newSimulation=$('#newSimulation');if(newSimulation)newSimulation.onclick=startOfficialSimulation
  document.querySelectorAll('[data-result-error]').forEach(b=>b.onclick=()=>{const q=questionBank.find(x=>x.id===b.dataset.resultError),selected=state.quizResult?.answers?.[q?.id];if(!q)return;const exists=state.errors.some(e=>e.bankQuestionId===q.id&&!e.reviewed);if(!exists)state.errors.unshift({id:uid(),cargo:state.cargoId,disciplineId:q.disciplineId,topic:q.topic,question:q.stem,myAnswer:Number.isInteger(selected)?q.options[selected]:'Em branco',correctAnswer:q.options[q.answer],reason:'Falta de conhecimento',explanation:q.explanation,date:today(),reviewed:false,bankQuestionId:q.id});persist();b.textContent='Adicionada ao Caderno';b.disabled=true})
  if(state.studyPrefill&&$('#studyD')){const pref=state.studyPrefill;$('#studyD').value=pref.disciplineId;const d=discipline(pref.disciplineId);$('#studyTopic').innerHTML=d.topics.map(t=>`<option>${esc(t)}</option>`).join('');$('#studyTopic').value=pref.topic;state.studyPrefill=null}
  const sf=$('#studyForm');if(sf)sf.onsubmit=e=>{e.preventDefault();const d=$('#studyD').value,t=$('#studyTopic').value,rec={id:uid(),cargo:state.cargoId,disciplineId:d,topic:t,studyType:$('#studyType').value,durationMinutes:+$('#studyMin').value,questions:+$('#studyQ').value,correct:+$('#studyCorrect').value,notes:$('#studyNotes').value,date:today()};state.sessions.unshift(rec);const k=topicKey(d,t),cur=state.topics[k]||{studied:false,reviewed:false,questions:false};state.topics[k]={...cur,studied:true,questions:rec.questions>0||cur.questions};[[1,'24h'],[7,'7d'],[30,'30d']].forEach(([days,interval])=>{const dt=new Date();dt.setDate(dt.getDate()+days);state.reviews.unshift({id:uid(),cargo:state.cargoId,disciplineId:d,topic:t,dueDate:dt.toISOString().slice(0,10),status:'pending',interval})});persist();render()}
  const qf=$('#qForm');if(qf)qf.onsubmit=e=>{e.preventDefault();state.questions.unshift({id:uid(),cargo:state.cargoId,disciplineId:$('#qD').value,topic:$('#qTopic').value,quantity:+$('#qQty').value,correct:+$('#qCorrect').value,date:today()});persist();render()}
  document.querySelectorAll('[data-review]').forEach(b=>b.onclick=()=>{state.reviews=state.reviews.map(r=>r.id===b.dataset.review?{...r,status:b.dataset.status}:r);persist();render()})
  const ef=$('#eForm');if(ef)ef.onsubmit=e=>{e.preventDefault();if(!$('#eQuestion').value.trim())return;state.errors.unshift({id:uid(),cargo:state.cargoId,disciplineId:$('#eD').value,topic:$('#eTopic').value,question:$('#eQuestion').value,myAnswer:$('#eMine').value,correctAnswer:$('#eCorrect').value,reason:$('#eReason').value,explanation:$('#eExplanation').value,date:today(),reviewed:false});persist();render()}
  document.querySelectorAll('[data-del-error]').forEach(b=>b.onclick=()=>{state.errors=state.errors.filter(x=>x.id!==b.dataset.delError);persist();render()})
  const gs=$('#genSchedule');if(gs)gs.onclick=()=>{let remaining=+$('#schedMin').value;const scored=cargo().disciplines.flatMap(d=>d.topics.filter(t=>!state.topics[topicKey(d.id,t)]?.studied).map(t=>{const qs=state.questions.filter(q=>q.cargo===state.cargoId&&q.disciplineId===d.id),tq=qs.reduce((a,q)=>a+q.quantity,0),tc=qs.reduce((a,q)=>a+q.correct,0),acc=tq?tc/tq:.7;return{d,t,score:d.share*(1+(1-acc))}})).sort((a,b)=>b.score-a.score);const items=[];for(const x of scored.slice(0,8)){if(remaining<20)break;const block=Math.min(45,remaining);items.push({id:uid(),cargo:state.cargoId,disciplineId:x.d.id,topic:x.t,minutes:block,studyType:'Teoria',date:today(),done:false});remaining-=block}state.schedule=state.schedule.filter(s=>!(s.cargo===state.cargoId&&s.date===today())).concat(items);persist();render()}
  const sim=$('#simForm');if(sim)sim.onsubmit=e=>{e.preventDefault();const c=cargo();let raw=0,weighted=0;document.querySelectorAll('[data-sim]').forEach(i=>{const d=c.disciplines.find(x=>x.id===i.dataset.sim),a=Math.min(d.questions,Math.max(0,+i.value));raw+=a;weighted+=a*d.weight});state.simulations.unshift({id:uid(),cargo:state.cargoId,date:today(),raw,weighted});persist();render()}
  const ms=$('#materialSearch');if(ms)ms.oninput=()=>{const pos=ms.selectionStart??ms.value.length;state.materialQuery=ms.value;render();const next=$('#materialSearch');if(next){next.focus();next.setSelectionRange(pos,pos)}}
  const mc=$('#materialCategory');if(mc)mc.onchange=()=>{state.materialCategory=mc.value;render()}
  const mp=$('#materialPriority');if(mp)mp.onchange=()=>{state.materialPriority=mp.value;render()}
  document.querySelectorAll('[data-material-status]').forEach(el=>el.onchange=()=>{state.materialStatus[el.dataset.materialStatus]=el.value;persist();render()})
  const ex=$('#examDate');if(ex)ex.onchange=()=>{state.examDate=ex.value;persist()}
  const syncBtn=$('#syncNowBtn');if(syncBtn)syncBtn.onclick=syncNow
  const importLegacy=$('#importLegacyBtn');if(importLegacy)importLegacy.onclick=()=>{if(!confirm('Importar os dados antigos deste navegador e substituir os dados atuais desta conta?'))return;applySnapshot(legacySnapshot);save(`santos:legacyImported:${currentUser.id}`,true);persist();render()}
}
bootstrap()
