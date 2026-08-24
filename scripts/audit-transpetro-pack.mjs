import fs from 'node:fs'
import zlib from 'node:zlib'

const src=fs.readFileSync('transpetro-question-pack.js','utf8')
const m=src.match(/const PACK='([^']+)'/)
if(!m) throw new Error('PACK não encontrado')
const raw=zlib.gunzipSync(Buffer.from(m[1],'base64')).toString('utf8')
const data=JSON.parse(raw)
const questions=Array.isArray(data)?data:(data.questions||[])
const rows=questions.map((q,i)=>({
  idx:i+1,
  id:q.id,
  year:q.year||q.ano||q.examYear||q.exam_year||null,
  area:q.area||q.discipline||q.subject||null,
  topic:q.topic||q.subtopic||null,
  source:q.source||q.exam||q.prova||null,
  number:q.number||q.questionNumber||q.question_number||q.numero||null,
  answer:q.answer||q.correctAnswer||null,
  context:Boolean(q.context&&String(q.context).trim()),
  visual:Boolean(q.visual),
  stem:String(q.stem||q.question||'').replace(/\s+/g,' ').trim()
}))

console.log('TOTAL',rows.length)
const byYear={};for(const r of rows){const k=String(r.year??'sem-ano');byYear[k]=(byYear[k]||0)+1}
console.log('BY_YEAR',JSON.stringify(byYear))
const y2023=rows.filter(r=>String(r.year)==='2023'||/2023/.test(String(r.source||'')))
console.log('COUNT_2023',y2023.length)
const areas={};for(const r of y2023){areas[r.area||'sem-area']=(areas[r.area||'sem-area']||0)+1}
console.log('AREAS_2023',JSON.stringify(areas))
console.log('QUESTIONS_2023_BEGIN')
for(const r of y2023) console.log(JSON.stringify({...r,stem:r.stem.slice(0,220)}))
console.log('QUESTIONS_2023_END')
const suspect=rows.filter(r=>{
 const s=r.stem
 const ref=/\b(texto|parágrafo|parágrafos|versos?|trecho|poema|fragmento|passagem|charge|imagem|figura|gráfico|tabela|anúncio|autor(?:a)?|narrador(?:a)?|personagem|estrofe|text|paragraph|passage|excerpt|poem|verse|lines?|figure|chart|table|image|author|writer|speaker|narrator|according to|the word|the expression|fragment)\b/i
 return ref.test(s)&&!r.context
})
console.log('SUSPECT_CONTEXT_COUNT',suspect.length)
for(const r of suspect) console.log('SUSPECT',JSON.stringify({...r,stem:r.stem.slice(0,180)}))
