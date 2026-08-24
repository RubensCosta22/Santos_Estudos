import { loadTranspetroQuestions } from './transpetro-question-pack.js'
import { loadAutoralQuestions } from './transpetro-autoral-pack.js'

const KEY='transpetro:real-simulado:v1'
const EXAM_SECONDS=16200
const letters=['A','B','C','D','E']
let pool=[],historical=[],autoral=[],root=null,timer=null
let state={usedIds:[],results:[],quiz:null}

const EXAMS={
  2011:{
    url:'https://arquivos.qconcursos.com/prova/arquivo_prova/24192/cesgranrio-2011-transpetro-administrador-junior-prova.pdf',
    pt:{page:3,title:'Um pouco de silêncio — Lya Luft'},
    en:{page:4,title:'Model copes with chaos to deliver relief — Rachel Ehrenberg'}
  },
  2012:{
    url:'https://arquivos.qconcursos.com/prova/arquivo_prova/28573/cesgranrio-2012-transpetro-administrador-junior-prova.pdf',
    pt:{page:3,title:'Science fiction — Carlos Drummond de Andrade'},
    en:{page:4,title:'Safety Meeting Presentation'}
  },
  2023:{
    url:'https://arquivos.qconcursos.com/prova/arquivo_prova/101215/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-1-administracao-prova.pdf',
    pt:{page:3,title:'À moda brasileira — Lygia Fagundes Telles'},
    en:{page:4,title:'How space technology is bringing green wins for transport'}
  }
}

const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const fmt=s=>{s=Math.max(0,Math.floor(s));return `${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor((s%3600)/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`}
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x}
const typeOf=q=>q.area==='Português'?'pt':q.area==='Inglês'?'en':'spec'
const qById=id=>pool.find(q=>q.uid===id)
function yearOf(q){
 const direct=Number(q?.year||q?.ano||q?.examYear||q?.exam_year||0);if(EXAMS[direct])return direct
 const source=String(q?.source||q?.prova||q?.exam||'');const m=source.match(/20(?:11|12|23)/);if(m&&EXAMS[+m[0]])return +m[0]
 const s=String(q?.stem||'')
 if(/Olavo Bilac|Lácio|space technology|satellite|Earth Observation/i.test(s))return 2023
 if(/marciano|Science fiction|OSHA|Safety Meeting|hazards|working safely/i.test(s))return 2012
 if(/silêncio|sossego|manada|hamsters|humanitarian aid|fragile networks|Nagurney|chaos to deliver relief/i.test(s))return 2011
 return 0
}
function needsSharedMaterial(q){
 if(q?.origin!=='Questão real Cesgranrio')return false
 if(q.context&&String(q.context).trim())return false
 if(Boolean(q.visual))return true
 const s=String(q.stem||'')
 const re=typeOf(q)==='en'?/\b(text|paragraph|passage|excerpt|poem|verse|lines?|figure|chart|table|image|author|writer|speaker|narrator|according to|the word|the expression|fragment)\b/i:/\b(texto|parágrafo|parágrafos|versos?|trecho|poema|fragmento|passagem|charge|imagem|figura|gráfico|tabela|autor(?:a)?|narrador(?:a)?|personagem|estrofe)\b/i
 return re.test(s)
}
function examMaterial(q){const y=yearOf(q),kind=typeOf(q);return EXAMS[y]?.[kind]?{year:y,kind,...EXAMS[y][kind],url:EXAMS[y].url}:null}
function eligible(q){return !!q&&(!needsSharedMaterial(q)||!!examMaterial(q))}
function loadState(){try{state={...state,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{}}
function persist(){localStorage.setItem(KEY,JSON.stringify(state))}

async function normalize(){
 const h=await loadTranspetroQuestions(),a=await loadAutoralQuestions()
 historical=(h?.questions||[]).map(q=>({...q,uid:`H:${q.id}`,origin:'Questão real Cesgranrio'}))
 autoral=(a||[]).map(q=>({...q,uid:`A:${q.id}`,origin:'Questão autoral calibrada Cesgranrio'}))
 pool=[...historical,...autoral]
 repairActiveQuiz()
}
function available(){const used=new Set(state.usedIds);return pool.filter(q=>eligible(q)&&!used.has(q.uid))}
function counts(){const a=available();return{pt:a.filter(q=>typeOf(q)==='pt').length,en:a.filter(q=>typeOf(q)==='en').length,spec:a.filter(q=>typeOf(q)==='spec').length,total:a.length}}
function possible(){const c=counts();return Math.min(Math.floor(c.pt/10),Math.floor(c.en/10),Math.floor(c.spec/50))}
function repairActiveQuiz(){
 const z=state.quiz;if(!z||z.finished||!Array.isArray(z.ids))return
 const reserved=new Set([...state.usedIds,...z.ids]);let changed=false
 for(let i=0;i<z.ids.length;i++){
  const q=qById(z.ids[i]);if(eligible(q))continue
  const kind=i<10?'pt':i<20?'en':'spec';const rep=pool.find(x=>eligible(x)&&typeOf(x)===kind&&!reserved.has(x.uid))
  if(rep){delete z.answers?.[z.ids[i]];reserved.delete(z.ids[i]);z.ids[i]=rep.uid;reserved.add(rep.uid);changed=true}
 }
 if(changed)persist()
}
function materialGroups(){
 const z=state.quiz,map={}
 z.ids.forEach((id,i)=>{const q=qById(id),m=examMaterial(q);if(!m||!needsSharedMaterial(q))return;const key=`${m.year}:${m.kind}`;(map[key]??={...m,positions:[]}).positions.push(i+1)})
 return map
}
function materialFor(q){const m=examMaterial(q);if(!m)return null;return materialGroups()[`${m.year}:${m.kind}`]||null}

function css(){if(document.querySelector('#tprm3-css'))return;const s=document.createElement('style');s.id='tprm3-css';s.textContent=`
.tprm3-tab{border-color:#166534!important;color:#166534!important;font-weight:900!important}.tprm3-overlay{position:fixed;inset:0;z-index:13000;background:#f8fafc;color:#0f172a;overflow:auto}.tprm3-top{position:sticky;top:0;z-index:5;background:#07111f;color:#fff;padding:14px 22px;display:flex;justify-content:space-between;align-items:center;gap:12px}.tprm3-wrap{max-width:1180px;margin:auto;padding:22px}.tprm3-card,.tprm3-metric{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:18px;margin-bottom:14px}.tprm3-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.tprm3-metric strong{display:block;font-size:25px}.tprm3-btn{border:1px solid #cbd5e1;background:#fff;border-radius:9px;padding:9px 13px;font-weight:800;cursor:pointer}.tprm3-btn.primary{background:#166534;color:#fff;border-color:#166534}.tprm3-actions{display:flex;gap:8px;flex-wrap:wrap}.tprm3-badge{display:inline-block;padding:4px 8px;border-radius:999px;background:#dcfce7;color:#166534;font-size:10px;font-weight:900;margin-right:5px}.tprm3-muted{font-size:12px;color:#64748b}.tprm3-stem{font-size:15px;line-height:1.6;white-space:pre-wrap;margin:14px 0}.tprm3-source{background:#f8fafc;border:1px solid #cbd5e1;border-left:5px solid #2563eb;border-radius:12px;padding:14px;margin:12px 0 20px}.tprm3-source iframe{width:100%;height:680px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;margin-top:10px}.tprm3-option{display:flex;gap:10px;border:1px solid #e2e8f0;border-radius:10px;padding:11px;margin:8px 0;cursor:pointer}.tprm3-option.selected{border-color:#2563eb;background:#eff6ff}.tprm3-nav{display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin-top:15px}.tprm3-nav button{padding:7px 2px;border:1px solid #cbd5e1;background:#fff;border-radius:6px}.tprm3-nav .done{background:#dcfce7}.tprm3-nav .current{outline:2px solid #2563eb}.tprm3-row{display:grid;grid-template-columns:1fr auto;gap:12px;padding:10px 0;border-top:1px solid #e2e8f0}.tprm3-bar{height:8px;background:#e2e8f0;border-radius:999px;overflow:hidden;margin-top:6px}.tprm3-bar i{display:block;height:100%;background:#166534}.tprm3-wrong{border-left:4px solid #dc2626}.tprm3-bad{color:#b91c1c}.tprm3-ok{color:#166534}.tprm3-note{padding:12px;border-radius:10px;background:#ecfdf5;border:1px solid #a7f3d0;color:#166534}.tprm3-clock{font-size:22px;font-weight:900}.tprm3-history{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 0;border-top:1px solid #e2e8f0}@media(max-width:800px){.tprm3-grid{grid-template-columns:1fr 1fr}.tprm3-wrap{padding:12px}.tprm3-nav{grid-template-columns:repeat(7,1fr)}.tprm3-source iframe{height:560px}}`;
 document.head.appendChild(s)}
function ensure(){const tabs=document.querySelector('.tp-overlay .tp-tabs');if(!tabs)return;tabs.querySelector('[data-real-mock]')?.remove();tabs.querySelector('[data-real-mock-v2]')?.remove();if(tabs.querySelector('[data-real-mock-v3]'))return;const b=document.createElement('button');b.dataset.realMockV3='1';b.className='tprm3-tab';b.textContent='📝 Simulado';b.onclick=open;tabs.appendChild(b)}
function open(){if(root)return;root=document.createElement('div');root.className='tprm3-overlay';document.body.appendChild(root);render()}
function close(){clearInterval(timer);root?.remove();root=null}
function render(){if(!root)return;clearInterval(timer);root.innerHTML=`<div class="tprm3-top"><div><b>Transpetro 2026 · Simulado Completo</b><div class="tprm3-muted">70 questões · questões reais preservadas · sem repetição</div></div><div class="tprm3-actions">${state.quiz&&!state.quiz.finished?'<span class="tprm3-clock" id="tprm3clock"></span>':''}<button class="tprm3-btn" data-close>Voltar</button></div></div><div class="tprm3-wrap">${state.quiz?quizPage():home()}</div>`;bind();if(state.quiz&&!state.quiz.finished)clock()}
function home(){const c=counts(),p=possible(),restored=historical.filter(q=>needsSharedMaterial(q)&&!!examMaterial(q)).length;return `<div class="tprm3-grid"><div class="tprm3-metric"><small>Banco utilizável</small><strong>${c.total}</strong></div><div class="tprm3-metric"><small>Questões reais com material restaurado</small><strong>${restored}</strong></div><div class="tprm3-metric"><small>Simulados inéditos disponíveis</small><strong>${p}</strong></div><div class="tprm3-metric"><small>Simulados realizados</small><strong>${state.results.length}</strong></div></div><div class="tprm3-card"><h2>Simulado Transpetro — Administração</h2><p><b>70 questões: 10 Português + 10 Inglês + 50 Específicas · 4h30.</b></p><div class="tprm3-note"><b>Questões reais:</b> os itens que dependem de texto, tabela, gráfico ou figura usam o caderno público original da Cesgranrio incorporado dentro do simulado. Não há questões substitutas.</div><p>Disponíveis: <b>${c.pt}</b> Português · <b>${c.en}</b> Inglês · <b>${c.spec}</b> Específicas.</p><button class="tprm3-btn primary" id="startMock" ${p<1?'disabled':''}>Iniciar novo simulado</button></div>${historyHtml()}`}
function historyHtml(){if(!state.results.length)return'';return`<div class="tprm3-card"><h2>Histórico de resultados</h2>${[...state.results].map((r,i)=>({r,i})).reverse().map(({r,i})=>`<div class="tprm3-history"><div><b>Simulado ${i+1}</b><br><small>${r.at?new Date(r.at).toLocaleString('pt-BR'):'resultado salvo'}</small></div><div><b>${r.correct??'-'}/${r.total||70} · ${r.correct!=null?Math.round(r.correct/(r.total||70)*100):'-'}%</b> <button class="tprm3-btn" data-history="${i}">Ver resultado</button></div></div>`).join('')}</div>`}
function pickBlock(items,n){const real=shuffle(items.filter(q=>q.origin==='Questão real Cesgranrio')),other=shuffle(items.filter(q=>q.origin!=='Questão real Cesgranrio'));return [...real,...other].slice(0,n).sort((a,b)=>{const ya=yearOf(a)||9999,yb=yearOf(b)||9999;return ya-yb})}
function startMock(){const a=available(),pt=pickBlock(a.filter(q=>typeOf(q)==='pt'),10),en=pickBlock(a.filter(q=>typeOf(q)==='en'),10),sp=pickBlock(a.filter(q=>typeOf(q)==='spec'),50);if(pt.length<10||en.length<10||sp.length<50){alert('Banco insuficiente para montar um simulado completo sem repetição.');return}state.quiz={ids:[...pt,...en,...sp].map(q=>q.uid),index:0,answers:{},startedAt:Date.now(),finished:false};persist();render()}
function sourceHtml(q,pos){const g=materialFor(q);if(!g)return'';const qs=g.positions.join(', '),first=g.positions[0],src=`${g.url}#page=${g.page}&view=FitH`;if(pos===first)return`<section class="tprm3-source"><h3>📄 Material original da prova ${g.year}</h3><div><b>${esc(g.title)}</b> · utilize o material abaixo nas questões <b>${qs}</b>.</div><iframe src="${esc(src)}" title="Prova original Cesgranrio ${g.year}"></iframe></section>`;return`<section class="tprm3-source"><details><summary><b>📄 Reabrir material original — questões ${qs}</b></summary><iframe src="${esc(src)}" title="Prova original Cesgranrio ${g.year}"></iframe></details></section>`}
function quizPage(){const z=state.quiz;if(z.finished)return resultPage();const q=qById(z.ids[z.index]);if(!q)return'<div class="tprm3-card">Questão indisponível.</div>';const pos=z.index+1,sel=z.answers[q.uid]||'';return`<div class="tprm3-card"><span class="tprm3-badge">${pos}/70</span><span class="tprm3-badge">${esc(q.area)}</span><span class="tprm3-badge">${esc(q.origin)}</span>${sourceHtml(q,pos)}<div class="tprm3-stem">${esc(q.stem)}</div>${letters.filter(l=>q.options?.[l]!=null).map(l=>`<label class="tprm3-option ${sel===l?'selected':''}"><input type="radio" name="tprm3ans" value="${l}" ${sel===l?'checked':''}><b>${l}</b><span>${esc(q.options[l])}</span></label>`).join('')}<div class="tprm3-actions"><button class="tprm3-btn" data-prev>← Anterior</button><button class="tprm3-btn" data-next>Próxima →</button><button class="tprm3-btn primary" id="finishMock">Finalizar</button></div><div class="tprm3-nav">${z.ids.map((id,i)=>`<button data-jump="${i}" class="${z.answers[id]?'done':''} ${i===z.index?'current':''}">${i+1}</button>`).join('')}</div></div>`}
function statsFrom(ids,answers){const areas={},topics={},wrong=[];let correct=0,blank=0;ids.forEach((id,i)=>{const q=qById(id);if(!q)return;const ans=answers?.[id]||'',ok=ans===q.answer;if(ok)correct++;if(!ans)blank++;const area=q.area||'Outros',topic=q.topic||q.subject||q.discipline||q.subtopic||'Sem tópico informado';areas[area]??={total:0,correct:0};areas[area].total++;if(ok)areas[area].correct++;const k=`${area}|${topic}`;topics[k]??={area,topic,total:0,correct:0};topics[k].total++;if(ok)topics[k].correct++;else wrong.push({n:i+1,id,area,topic,stem:q.stem,answer:q.answer,user:ans,explanation:q.explanation||''})});return{correct,blank,areas:Object.entries(areas).map(([name,v])=>({name,...v,pct:Math.round(v.correct/v.total*100)})),topics:Object.values(topics).map(v=>({...v,pct:Math.round(v.correct/v.total*100)})).sort((a,b)=>a.pct-b.pct||b.total-a.total),wrong}}
function finish(auto=false){const z=state.quiz;if(!auto){const blank=z.ids.filter(id=>!z.answers[id]).length;if(!confirm(blank?`Há ${blank} questão(ões) em branco. Finalizar?`:'Finalizar e ver o diagnóstico?'))return}const s=statsFrom(z.ids,z.answers);z.finished=true;state.usedIds=[...new Set([...state.usedIds,...z.ids])];state.results.push({at:new Date().toISOString(),correct:s.correct,total:70,elapsed:Math.round((Date.now()-z.startedAt)/1000),ids:[...z.ids],answers:{...z.answers},areas:s.areas,topics:s.topics,wrong:s.wrong});persist();render()}
function diagnosticHtml(s){return`<div class="tprm3-grid"><div class="tprm3-metric"><small>Acertos</small><strong>${s.correct}/70</strong></div><div class="tprm3-metric"><small>Aproveitamento</small><strong>${Math.round(s.correct/70*100)}%</strong></div><div class="tprm3-metric"><small>Erros</small><strong>${70-s.correct-s.blank}</strong></div><div class="tprm3-metric"><small>Em branco</small><strong>${s.blank}</strong></div></div><div class="tprm3-card"><h2>Desempenho por área</h2>${s.areas.map(a=>`<div class="tprm3-row"><div><b>${esc(a.name)}</b><div class="tprm3-bar"><i style="width:${a.pct}%"></i></div></div><b>${a.correct}/${a.total} · ${a.pct}%</b></div>`).join('')}</div><div class="tprm3-card"><h2>Prioridade de revisão</h2>${s.topics.slice(0,20).map(t=>`<div class="tprm3-row"><div><b>${esc(t.topic)}</b><br><small>${esc(t.area)}</small></div><b class="${t.pct<60?'tprm3-bad':'tprm3-ok'}">${t.correct}/${t.total} · ${t.pct}%</b></div>`).join('')}</div><div class="tprm3-card"><h2>Questões erradas (${s.wrong.length})</h2>${s.wrong.map(x=>`<details class="tprm3-card tprm3-wrong"><summary><b>Questão ${x.n} · ${esc(x.area)} · ${esc(x.topic)}</b></summary><div class="tprm3-stem">${esc(x.stem)}</div><p>Sua resposta: <b>${esc(x.user||'Em branco')}</b> · Gabarito: <b>${esc(x.answer)}</b></p>${x.explanation?`<p><b>Explicação:</b> ${esc(x.explanation)}</p>`:''}</details>`).join('')||'<p>Nenhum erro.</p>'}</div>`}
function resultPage(){const s=statsFrom(state.quiz.ids,state.quiz.answers);return`<div class="tprm3-card"><h2>Resultado do simulado</h2></div>${diagnosticHtml(s)}<button class="tprm3-btn" id="doneMock">Voltar aos simulados</button>`}
function showHistory(i){const r=state.results[i];if(!r)return;if(r.ids&&r.answers){const s=statsFrom(r.ids,r.answers);root.innerHTML=`<div class="tprm3-top"><b>Resultado salvo · Simulado ${i+1}</b><button class="tprm3-btn" id="backHome">Voltar</button></div><div class="tprm3-wrap">${diagnosticHtml(s)}</div>`;root.querySelector('#backHome').onclick=render;return}root.innerHTML=`<div class="tprm3-top"><b>Resultado salvo · Simulado ${i+1}</b><button class="tprm3-btn" id="backHome">Voltar</button></div><div class="tprm3-wrap"><div class="tprm3-card"><h2>Resultado</h2><div class="tprm3-grid"><div class="tprm3-metric"><small>Acertos</small><strong>${r.correct??'-'}/${r.total||70}</strong></div><div class="tprm3-metric"><small>Aproveitamento</small><strong>${r.correct!=null?Math.round(r.correct/(r.total||70)*100):'-'}%</strong></div></div><p class="tprm3-muted">Este resultado foi salvo antes da versão que armazenava o detalhamento questão por questão. Os próximos simulados terão diagnóstico completo no histórico.</p></div></div>`;root.querySelector('#backHome').onclick=render}
function clock(){const tick=()=>{if(!state.quiz||state.quiz.finished)return;const left=Math.max(0,EXAM_SECONDS-Math.floor((Date.now()-state.quiz.startedAt)/1000)),el=document.querySelector('#tprm3clock');if(el)el.textContent=fmt(left);if(left<=0){clearInterval(timer);finish(true)}};tick();timer=setInterval(tick,1000)}
function bind(){root.querySelector('[data-close]')?.addEventListener('click',close);root.querySelector('#startMock')?.addEventListener('click',startMock);root.querySelectorAll('input[name="tprm3ans"]').forEach(i=>i.onchange=()=>{state.quiz.answers[state.quiz.ids[state.quiz.index]]=i.value;persist();render()});root.querySelector('[data-prev]')?.addEventListener('click',()=>{if(state.quiz.index>0)state.quiz.index--;persist();render()});root.querySelector('[data-next]')?.addEventListener('click',()=>{if(state.quiz.index<69)state.quiz.index++;persist();render()});root.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{state.quiz.index=+b.dataset.jump;persist();render()});root.querySelector('#finishMock')?.addEventListener('click',()=>finish(false));root.querySelector('#doneMock')?.addEventListener('click',()=>{state.quiz=null;persist();render()});root.querySelectorAll('[data-history]').forEach(b=>b.onclick=()=>showHistory(+b.dataset.history))}
async function init(){css();loadState();try{await normalize();window.openTranspetroRealSimulado=open;setInterval(ensure,300);ensure()}catch(e){console.error('Simulado Transpetro V3:',e)}}
init()
