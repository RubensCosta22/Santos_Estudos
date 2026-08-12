import { loadTranspetroQuestions } from './transpetro-question-pack.js'

// Compatibilidade com a primeira versão do addon: o pack expõe `stats`,
// enquanto a UI esperava `examStats`.
if(!Object.getOwnPropertyDescriptor(Object.prototype,'examStats')){
  Object.defineProperty(Object.prototype,'examStats',{
    configurable:true,
    enumerable:false,
    get(){
      if(this && this.stats && this.questions){
        return Object.entries(this.stats).map(([year,data])=>({year:Number(year),...data})).sort((a,b)=>a.year-b.year)
      }
      return undefined
    }
  })
}

const STORAGE_KEY='transpetro:question-state:v1'
const letters=['A','B','C','D','E']
let dataset=null
let reviewRoot=null
let reviewIndex=0

const esc=(v='')=>String(v).replace(/[&<>\'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))
const readState=()=>{try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||{}}catch{return {}}}
const qById=id=>dataset?.questions?.find(q=>q.id===id)

function ensureStyles(){
  if(document.querySelector('#tpqReviewHotfixStyles'))return
  const s=document.createElement('style');s.id='tpqReviewHotfixStyles';s.textContent=`
  .tpq-review-overlay{position:fixed;inset:0;z-index:10150;background:#f8fafc;color:#0f172a;overflow:auto}.tpq-review-top{position:sticky;top:0;z-index:4;background:#07111f;color:white;padding:14px 22px;display:flex;justify-content:space-between;align-items:center;gap:12px}.tpq-review-wrap{max-width:1050px;margin:auto;padding:20px}.tpq-review-card{background:white;border:1px solid #e2e8f0;border-radius:14px;padding:18px}.tpq-review-option{display:flex;gap:10px;border:1px solid #e2e8f0;border-radius:10px;padding:11px;margin:8px 0;align-items:flex-start}.tpq-review-option.correct{border-color:#16a34a;background:#f0fdf4}.tpq-review-option.wrong{border-color:#dc2626;background:#fef2f2}.tpq-review-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.tpq-review-actions button,.tpq-review-close{border:1px solid #cbd5e1;background:white;border-radius:9px;padding:9px 13px;font-weight:700;cursor:pointer}.tpq-review-close{background:#111827;color:#fff;border-color:#334155}.tpq-review-grid{display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin-top:14px}.tpq-review-grid button{padding:8px 2px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;cursor:pointer;font-size:11px}.tpq-review-grid button.ok{background:#dcfce7;border-color:#86efac}.tpq-review-grid button.bad{background:#fee2e2;border-color:#fca5a5}.tpq-review-grid button.current{outline:2px solid #2563eb}@media(max-width:600px){.tpq-review-grid{grid-template-columns:repeat(5,1fr)}}`;
  document.head.appendChild(s)
}

function closeReview(){reviewRoot?.remove();reviewRoot=null}
function renderReview(){
  const z=readState().quiz
  if(!reviewRoot||!z?.finished||!Array.isArray(z.ids))return closeReview()
  reviewIndex=Math.max(0,Math.min(reviewIndex,z.ids.length-1))
  const q=qById(z.ids[reviewIndex]);if(!q)return closeReview()
  const selected=z.answers?.[q.id]||null, ok=selected===q.answer
  const context=q.contextId?dataset.contexts?.[q.contextId]:''
  reviewRoot.innerHTML=`<div class="tpq-review-top"><div><strong>Revisão da prova</strong><div style="font-size:11px;color:#94a3b8">${q.year} · questão ${q.number} · ${reviewIndex+1}/${z.ids.length}</div></div><button class="tpq-review-close" data-hotfix-close>Voltar ao resultado</button></div><div class="tpq-review-wrap"><div class="tpq-review-card"><div style="display:flex;justify-content:space-between;gap:12px;align-items:start"><div><b>${esc(q.area)}</b><div style="font-size:12px;color:#64748b">${esc(q.source||'')}</div></div><strong>${ok?'✅ Correta':selected?'❌ Incorreta':'⬜ Em branco'}</strong></div>${context?`<details open style="margin:14px 0"><summary><b>Texto de apoio</b></summary><div style="white-space:pre-wrap;line-height:1.55;margin-top:10px">${esc(context)}</div></details>`:''}<p style="white-space:pre-wrap;line-height:1.6">${esc(q.stem)}</p>${letters.map(l=>{const cls=l===q.answer?'correct':selected===l?'wrong':'';return `<div class="tpq-review-option ${cls}"><b>${l}</b><span>${esc(q.options?.[l]||'')}</span>${l===q.answer?'<b style="margin-left:auto">Gabarito</b>':selected===l?'<b style="margin-left:auto">Sua resposta</b>':''}</div>`}).join('')}<div class="tpq-review-actions"><button data-hotfix-prev ${reviewIndex===0?'disabled':''}>Anterior</button><button data-hotfix-next ${reviewIndex===z.ids.length-1?'disabled':''}>Próxima</button></div><div class="tpq-review-grid">${z.ids.map((id,i)=>{const qq=qById(id),sel=z.answers?.[id]||null,cls=sel===qq?.answer?'ok':'bad';return `<button class="${cls} ${i===reviewIndex?'current':''}" data-hotfix-jump="${i}">${i+1}</button>`}).join('')}</div></div></div>`
  reviewRoot.querySelector('[data-hotfix-close]').onclick=closeReview
  reviewRoot.querySelector('[data-hotfix-prev]')?.addEventListener('click',()=>{reviewIndex--;renderReview()})
  reviewRoot.querySelector('[data-hotfix-next]')?.addEventListener('click',()=>{reviewIndex++;renderReview()})
  reviewRoot.querySelectorAll('[data-hotfix-jump]').forEach(b=>b.onclick=()=>{reviewIndex=Number(b.dataset.hotfixJump);renderReview()})
}

function openReview(){
  const z=readState().quiz
  if(!dataset||!z?.finished)return
  ensureStyles();reviewIndex=0;reviewRoot=document.createElement('div');reviewRoot.className='tpq-review-overlay';document.body.appendChild(reviewRoot);renderReview()
}

function enhanceResult(){
  const original=document.querySelector('.tpq-overlay [data-tpq-review]')
  if(!original||original.dataset.hotfixed==='1')return
  original.dataset.hotfixed='1'
  original.textContent='Refazer erradas'
  original.classList.remove('primary')
  const review=document.createElement('button');review.className='tpq-btn primary';review.type='button';review.textContent='Revisar prova';review.dataset.hotfixReview='1';review.onclick=openReview
  original.parentElement?.insertBefore(review,original)
}

async function init(){
  try{dataset=await loadTranspetroQuestions()}catch(e){console.error('Hotfix Transpetro: falha ao carregar questões',e)}
  const observer=new MutationObserver(enhanceResult);observer.observe(document.body,{childList:true,subtree:true});enhanceResult()
}
init()
