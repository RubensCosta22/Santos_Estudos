import { loadTranspetroQuestions } from './transpetro-question-pack.js'
import { loadAutoralQuestions } from './transpetro-autoral-pack.js'
import { loadContextReplacements } from './transpetro-context-replacements.js'

const KEY='transpetro:real-simulado:v1'
const EXAM_SECONDS=16200
const letters=['A','B','C','D','E']
let pool=[],historical=[],autoral=[],replacements=[],root=null,timer=null
let state={usedIds:[],results:[],quiz:null}

const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x}
const typeOf=q=>q.area==='Português'?'pt':q.area==='Inglês'?'en':'spec'
const qById=id=>pool.find(q=>q.uid===id)
const fmt=s=>{s=Math.max(0,Math.floor(s));return `${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor((s%3600)/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`}

function loadState(){try{state={...state,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{}}
function persist(){localStorage.setItem(KEY,JSON.stringify(state))}
function hasOwnContext(q){return Boolean(q?.context&&String(q.context).trim())}
function realNeedsMissingContext(q){
 if(q?.origin!=='Questão real Cesgranrio'||hasOwnContext(q))return false
 const s=String(q.stem||'')
 const pt=/\b(texto|parágrafo|parágrafos|versos?|trecho|poema|fragmento|passagem|charge|imagem|figura|gráfico|tabela|anúncio|autor(?:a)?|narrador(?:a)?|personagem|estrofe)\b/i
 const en=/\b(text|paragraph|passage|excerpt|poem|verse|lines?|figure|chart|table|image|advertisement|author|writer|speaker|narrator|according to|the word|the expression|the sentence|fragment)\b/i
 return (q.area==='Inglês'?en:pt).test(s)||Boolean(q.visual)
}
function eligible(q){return q&&!realNeedsMissingContext(q)}

async function normalize(){
 const h=await loadTranspetroQuestions(),a=await loadAutoralQuestions(),r=loadContextReplacements()
 historical=(h?.questions||[]).map(q=>({...q,uid:`H:${q.id}`,origin:'Questão real Cesgranrio'}))
 autoral=(a||[]).map(q=>({...q,uid:`A:${q.id}`,origin:'Questão autoral calibrada Cesgranrio'}))
 replacements=(r||[]).map(q=>({...q,uid:`R:${q.id}`,origin:'Questão autoral substituta · contexto completo'}))
 pool=[...historical,...autoral,...replacements]
 repairActiveQuiz()
}
function available(){const used=new Set(state.usedIds);return pool.filter(q=>eligible(q)&&!used.has(q.uid))}
function counts(){const a=available();return{pt:a.filter(q=>typeOf(q)==='pt').length,en:a.filter(q=>typeOf(q)==='en').length,spec:a.filter(q=>typeOf(q)==='spec').length,total:a.length}}
function possible(){const c=counts();return Math.min(Math.floor(c.pt/10),Math.floor(c.en/10),Math.floor(c.spec/50))}
function repairActiveQuiz(){
 const z=state.quiz;if(!z||z.finished||!Array.isArray(z.ids))return
 const reserved=new Set([...state.usedIds,...z.ids]);let changed=false
 for(let i=0;i<z.ids.length;i++){
  const old=qById(z.ids[i]);if(eligible(old))continue
  const kind=i<10?'pt':i<20?'en':'spec'
  const rep=pool.find(q=>eligible(q)&&typeOf(q)===kind&&!reserved.has(q.uid))
  if(rep){delete z.answers?.[z.ids[i]];reserved.delete(z.ids[i]);z.ids[i]=rep.uid;reserved.add(rep.uid);changed=true}
 }
 if(changed)persist()
}
function groupMap(){
 const z=state.quiz,map={}
 z.ids.forEach((id,i)=>{const q=qById(id);if(!q?.context)return;const key=`${q.area}:${q.context}`;(map[key]??={context:q.context,area:q.area,positions:[]}).positions.push(i+1)})
 return map
}
function groupFor(q){if(!q?.context)return null;return groupMap()[`${q.area}:${q.context}`]||null}

function injectCss(){if(document.querySelector('#tprm2-css'))return;const s=document.createElement('style');s.id='tprm2-css';s.textContent=`
.tprm2-tab{border-color:#166534!important;color:#166534!important;font-weight:900!important}.tprm2-overlay{position:fixed;inset:0;z-index:12000;background:#f8fafc;color:#0f172a;overflow:auto}.tprm2-top{position:sticky;top:0;z-index:5;background:#07111f;color:#fff;padding:14px 22px;display:flex;justify-content:space-between;align-items:center}.tprm2-wrap{max-width:1180px;margin:auto;padding:22px}.tprm2-card,.tprm2-metric{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:18px;margin-bottom:14px}.tprm2-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.tprm2-metric strong{display:block;font-size:25px}.tprm2-btn{border:1px solid #cbd5e1;background:#fff;border-radius:9px;padding:9px 13px;font-weight:800;cursor:pointer}.tprm2-btn.primary{background:#166534;color:#fff;border-color:#166534}.tprm2-actions{display:flex;gap:8px;flex-wrap:wrap}.tprm2-badge{display:inline-block;padding:4px 8px;border-radius:999px;background:#dcfce7;color:#166534;font-size:10px;font-weight:900;margin-right:5px}.tprm2-muted{font-size:12px;color:#64748b}.tprm2-stem{font-size:15px;line-height:1.6;white-space:pre-wrap;margin:14px 0}.tprm2-source{background:#f8fafc;border:1px solid #cbd5e1;border-left:5px solid #2563eb;border-radius:12px;padding:16px;margin:12px 0 20px}.tprm2-source-text{white-space:pre-wrap;line-height:1.65;margin-top:12px}.tprm2-option{display:flex;gap:10px;border:1px solid #e2e8f0;border-radius:10px;padding:11px;margin:8px 0;cursor:pointer}.tprm2-option.selected{border-color:#2563eb;background:#eff6ff}.tprm2-nav{display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin-top:15px}.tprm2-nav button{padding:7px 2px;border:1px solid #cbd5e1;background:#fff;border-radius:6px}.tprm2-nav .done{background:#dcfce7}.tprm2-nav .current{outline:2px solid #2563eb}.tprm2-row{display:grid;grid-template-columns:1fr auto;gap:12px;padding:10px 0;border-top:1px solid #e2e8f0}.tprm2-bar{height:8px;background:#e2e8f0;border-radius:999px;overflow:hidden;margin-top:6px}.tprm2-bar i{display:block;height:100%;background:#166534}.tprm2-wrong{border-left:4px solid #dc2626}.tprm2-bad{color:#b91c1c}.tprm2-ok{color:#166534}.tprm2-note{padding:12px;border-radius:10px;background:#ecfdf5;border:1px solid #a7f3d0;color:#166534}.tprm2-clock{font-size:22px;font-weight:900}@media(max-width:800px){.tprm2-grid{grid-template-columns:1fr 1fr}.tprm2-wrap{padding:12px}.tprm2-nav{grid-template-columns:repeat(7,1fr)}}`;
 document.head.appendChild(s)}

function ensureButton(){const tabs=document.querySelector('.tp-overlay .tp-tabs');if(!tabs)return;tabs.querySelector('[data-real-mock]')?.remove();if(tabs.querySelector('[data-real-mock-v2]'))return;const b=document.createElement('button');b.dataset.realMockV2='1';b.className='tprm2-tab';b.textContent='📝 Simulado';b.onclick=open;tabs.appendChild(b)}
function open(){if(root)return;root=document.createElement('div');root.className='tprm2-overlay';document.body.appendChild(root);render()}
function close(){clearInterval(timer);root?.remove();root=null}
function render(){if(!root)return;clearInterval(timer);root.innerHTML=`<div class="tprm2-top"><div><b>Transpetro 2026 · Simulado Completo</b><div class="tprm2-muted">70 questões · 10 Português · 10 Inglês · 50 Específicas · 4h30</div></div><div class="tprm2-actions">${state.quiz&&!state.quiz.finished?'<span class="tprm2-clock" id="tprm2clock"></span>':''}<button class="tprm2-btn" data-close>Voltar</button></div></div><div class="tprm2-wrap">${state.quiz?quizPage():home()}</div>`;bind();if(state.quiz&&!state.quiz.finished)startClock()}
function home(){const c=counts(),p=possible(),blocked=historical.filter(realNeedsMissingContext).length;return `<div class="tprm2-grid"><div class="tprm2-metric"><small>Banco utilizável</small><strong>${c.total}</strong></div><div class="tprm2-metric"><small>Substitutas com contexto</small><strong>${replacements.length}</strong><span>19 Português + 19 Inglês</span></div><div class="tprm2-metric"><small>Simulados inéditos disponíveis</small><strong>${p}</strong></div><div class="tprm2-metric"><small>Realizados</small><strong>${state.results.length}</strong></div></div><div class="tprm2-card"><h2>Simulado Transpetro — Administração</h2><p>Questões históricas que perderam texto, gráfico ou figura continuam fora do sorteio. Para não reduzir o banco, foram adicionadas <b>38 questões autorais substitutas</b>, com texto-base completo e dificuldade calibrada para o estilo Cesgranrio.</p><div class="tprm2-note"><b>Sem questões quebradas:</b> ${blocked} itens históricos permanecem preservados no banco para futura restauração, mas não entram na prova. As substitutas cobrem a lacuna sem exigir links externos.</div><p>Disponíveis: <b>${c.pt}</b> Português · <b>${c.en}</b> Inglês · <b>${c.spec}</b> Específicas.</p><button class="tprm2-btn primary" id="startMock" ${p<1?'disabled':''}>Iniciar simulado de 70 questões</button></div>`}
function startMock(){const a=available(),pt=shuffle(a.filter(q=>typeOf(q)==='pt')).slice(0,10),en=shuffle(a.filter(q=>typeOf(q)==='en')).slice(0,10),sp=shuffle(a.filter(q=>typeOf(q)==='spec')).slice(0,50);if(pt.length<10||en.length<10||sp.length<50){alert('Banco insuficiente para montar um simulado completo sem repetição.');return}state.quiz={ids:[...pt,...en,...sp].map(q=>q.uid),index:0,answers:{},startedAt:Date.now(),finished:false};persist();render()}
function sourceHtml(q,pos){const g=groupFor(q);if(!g)return'';const first=g.positions[0],qs=g.positions.join(', ');if(pos===first)return`<section class="tprm2-source"><h3>📄 Texto-base</h3><div><b>Utilize este texto nas questões ${qs}.</b></div><div class="tprm2-source-text">${esc(g.context)}</div></section>`;return`<section class="tprm2-source"><details><summary><b>📄 Reabrir texto-base — questões ${qs}</b></summary><div class="tprm2-source-text">${esc(g.context)}</div></details></section>`}
function quizPage(){const z=state.quiz;if(z.finished)return resultPage();const q=qById(z.ids[z.index]);if(!q)return'<div class="tprm2-card">Questão indisponível.</div>';const pos=z.index+1,sel=z.answers[q.uid]||'';return`<div class="tprm2-card"><span class="tprm2-badge">${pos}/70</span><span class="tprm2-badge">${esc(q.area)}</span><span class="tprm2-badge">${esc(q.origin)}</span>${sourceHtml(q,pos)}<div class="tprm2-stem">${esc(q.stem)}</div>${letters.filter(l=>q.options?.[l]!=null).map(l=>`<label class="tprm2-option ${sel===l?'selected':''}"><input type="radio" name="tprm2ans" value="${l}" ${sel===l?'checked':''}><b>${l}</b><span>${esc(q.options[l])}</span></label>`).join('')}<div class="tprm2-actions"><button class="tprm2-btn" data-prev>← Anterior</button><button class="tprm2-btn" data-next>Próxima →</button><button class="tprm2-btn primary" id="finishMock">Finalizar</button></div><div class="tprm2-nav">${z.ids.map((id,i)=>`<button data-jump="${i}" class="${z.answers[id]?'done':''} ${i===z.index?'current':''}">${i+1}</button>`).join('')}</div></div>`}
function stats(){const z=state.quiz,areas={},topics={},wrong=[];let correct=0,blank=0;z.ids.forEach((id,i)=>{const q=qById(id);if(!q)return;const ans=z.answers[id]||'',ok=ans===q.answer;if(ok)correct++;if(!ans)blank++;const area=q.area||'Outros',topic=q.topic||'Sem tópico';areas[area]??={total:0,correct:0};areas[area].total++;if(ok)areas[area].correct++;const k=`${area}|${topic}`;topics[k]??={area,topic,total:0,correct:0};topics[k].total++;if(ok)topics[k].correct++;else wrong.push({n:i+1,q,ans})});return{correct,blank,areas:Object.entries(areas).map(([name,v])=>({name,...v,pct:Math.round(v.correct/v.total*100)})),topics:Object.values(topics).map(v=>({...v,pct:Math.round(v.correct/v.total*100)})).sort((a,b)=>a.pct-b.pct||b.total-a.total),wrong}}
function finish(auto=false){const z=state.quiz;if(!auto){const blank=z.ids.filter(id=>!z.answers[id]).length;if(!confirm(blank?`Há ${blank} questão(ões) em branco. Finalizar?`:'Finalizar e ver o diagnóstico?'))return}z.finished=true;const s=stats();state.usedIds=[...new Set([...state.usedIds,...z.ids])];state.results.push({at:new Date().toISOString(),correct:s.correct,total:70,elapsed:Math.round((Date.now()-z.startedAt)/1000),areas:s.areas,topics:s.topics});persist();render()}
function resultPage(){const s=stats();return`<div class="tprm2-card"><h2>Resultado</h2><div class="tprm2-grid"><div class="tprm2-metric"><small>Acertos</small><strong>${s.correct}/70</strong></div><div class="tprm2-metric"><small>Aproveitamento</small><strong>${Math.round(s.correct/70*100)}%</strong></div><div class="tprm2-metric"><small>Erros</small><strong>${70-s.correct-s.blank}</strong></div><div class="tprm2-metric"><small>Em branco</small><strong>${s.blank}</strong></div></div></div><div class="tprm2-card"><h2>Desempenho por área</h2>${s.areas.map(a=>`<div class="tprm2-row"><div><b>${esc(a.name)}</b><div class="tprm2-bar"><i style="width:${a.pct}%"></i></div></div><b>${a.correct}/${a.total} · ${a.pct}%</b></div>`).join('')}</div><div class="tprm2-card"><h2>Prioridade de revisão</h2>${s.topics.slice(0,20).map(t=>`<div class="tprm2-row"><div><b>${esc(t.topic)}</b><br><small>${esc(t.area)}</small></div><b class="${t.pct<60?'tprm2-bad':'tprm2-ok'}">${t.correct}/${t.total} · ${t.pct}%</b></div>`).join('')}</div><div class="tprm2-card"><h2>Questões erradas (${s.wrong.length})</h2>${s.wrong.map(x=>`<details class="tprm2-card tprm2-wrong"><summary><b>Questão ${x.n} · ${esc(x.q.area)} · ${esc(x.q.topic||'')}</b></summary><div class="tprm2-stem">${esc(x.q.stem)}</div><p>Sua resposta: <b>${esc(x.ans||'Em branco')}</b> · Gabarito: <b>${esc(x.q.answer)}</b></p>${x.q.explanation?`<p><b>Explicação:</b> ${esc(x.q.explanation)}</p>`:''}</details>`).join('')||'<p>Nenhum erro.</p>'}<button class="tprm2-btn" id="doneMock">Voltar aos simulados</button></div>`}
function startClock(){const tick=()=>{if(!state.quiz||state.quiz.finished)return;const left=Math.max(0,EXAM_SECONDS-Math.floor((Date.now()-state.quiz.startedAt)/1000)),el=document.querySelector('#tprm2clock');if(el)el.textContent=fmt(left);if(left<=0){clearInterval(timer);finish(true)}};tick();timer=setInterval(tick,1000)}
function bind(){root.querySelector('[data-close]')?.addEventListener('click',close);root.querySelector('#startMock')?.addEventListener('click',startMock);root.querySelectorAll('input[name="tprm2ans"]').forEach(i=>i.onchange=()=>{state.quiz.answers[state.quiz.ids[state.quiz.index]]=i.value;persist();render()});root.querySelector('[data-prev]')?.addEventListener('click',()=>{if(state.quiz.index>0)state.quiz.index--;persist();render()});root.querySelector('[data-next]')?.addEventListener('click',()=>{if(state.quiz.index<69)state.quiz.index++;persist();render()});root.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{state.quiz.index=+b.dataset.jump;persist();render()});root.querySelector('#finishMock')?.addEventListener('click',()=>finish(false));root.querySelector('#doneMock')?.addEventListener('click',()=>{state.quiz=null;persist();render()})}

async function init(){injectCss();loadState();try{await normalize();window.openTranspetroRealSimulado=open;setInterval(ensureButton,300);ensureButton()}catch(e){console.error('Simulado Transpetro V2:',e)}}
init()
