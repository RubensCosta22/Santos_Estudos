import fs from 'node:fs'
import { cargos, materials } from './data.js'
import { questionBank } from './questions.js'
import { studyGuides } from './study.js'

let ok = true
const fail = (...args) => { console.error('FALHA:', ...args); ok = false }
const materialIds = new Set(materials.map(m => m.id))
const ids = new Set()
const semantic = new Map()
const stemsByCargo = new Set()
const letters = [0,0,0,0]
let coveredTopics = 0
let totalTopics = 0

console.log('=== BANCO E COBERTURA ===')
for (const c of cargos) {
  let cargoCount = 0
  let cargoTopics = 0
  let cargoCovered = 0
  for (const d of c.disciplines) {
    totalTopics += d.topics.length
    cargoTopics += d.topics.length
    const qs = questionBank.filter(q => q.cargo === c.id && q.disciplineId === d.id)
    cargoCount += qs.length
    const topicSet = new Set(qs.map(q => q.topic))
    const missing = d.topics.filter(t => !topicSet.has(t))
    coveredTopics += d.topics.length - missing.length
    cargoCovered += d.topics.length - missing.length
    if (missing.length) fail('Tópicos sem questão', d.id, missing)
    if (qs.length < d.questions * 3) fail('Banco insuficiente para 3 simulados iniciais sem repetição', d.id)
  }
  console.log(`${c.name}: ${cargoCount} questões | ${cargoCovered}/${cargoTopics} tópicos`)
}

for (const q of questionBank) {
  if (ids.has(q.id)) fail('ID duplicado', q.id)
  ids.add(q.id)
  const c = cargos.find(x => x.id === q.cargo)
  const d = c?.disciplines.find(x => x.id === q.disciplineId)
  if (!d) fail('Disciplina inválida', q.id)
  else if (!d.topics.includes(q.topic)) fail('Tópico inválido', q.id, q.topic)
  if (!Array.isArray(q.options) || q.options.length !== 4) fail('Alternativas inválidas', q.id)
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) fail('Gabarito inválido', q.id)
  if (!q.explanation?.trim()) fail('Sem comentário', q.id)
  if (!q.original || q.style !== 'IBAM-inspired') fail('Metadados autorais/estilo inválidos', q.id)
  if (q.sourceId && !materialIds.has(q.sourceId)) fail('Fonte inexistente', q.id, q.sourceId)
  letters[q.answer]++
  const localKey = `${q.cargo}|${q.stem}`
  if (stemsByCargo.has(localKey)) fail('Enunciado duplicado no mesmo cargo', q.id)
  stemsByCargo.add(localKey)
  const semKey = `${q.stem}|${[...q.options].sort().join('||')}`
  const correctText = q.options[q.answer]
  if (semantic.has(semKey) && semantic.get(semKey) !== correctText) fail('Gabarito semanticamente divergente', q.id)
  semantic.set(semKey, correctText)
}
if (questionBank.length !== 395) fail('Quantidade de questões mudou', questionBank.length)
if (coveredTopics !== totalTopics) fail('Cobertura incompleta', coveredTopics, totalTopics)
if (Math.max(...letters) - Math.min(...letters) > 1) fail('Gabaritos desequilibrados', letters)
console.log(`Total: ${questionBank.length} | tópicos ${coveredTopics}/${totalTopics} | A/B/C/D ${letters.join('/')}`)

console.log('\n=== COMPOSIÇÃO DO SIMULADO ===')
for (const c of cargos) {
  const totalQ = c.disciplines.reduce((a,d) => a + d.questions, 0)
  const maxPoints = c.disciplines.reduce((a,d) => a + d.questions * d.weight, 0)
  console.log(`${c.name}: ${totalQ} questões | ${maxPoints} pontos`)
  if (c.id === 'fiscal' && totalQ !== 50) fail('Fiscal deve ter 50 questões')
  if (c.id === 'operador' && totalQ !== 40) fail('Operador deve ter 40 questões')
  if (maxPoints !== 100) fail('Pontuação máxima deve ser 100', c.id, maxPoints)
}

console.log('\n=== MODO PROVA V8 PRESERVADO ===')
const app = fs.readFileSync('./app.js', 'utf8')
const css = fs.readFileSync('./styles.css', 'utf8')
const required = [
  ['duração oficial 210 min', /OFFICIAL_EXAM_MINUTES\s*=\s*210/],
  ['persistência do simulado ativo', /santos:activeQuiz/],
  ['renderização própria do simulado', /function renderSimulationQuestion\(/],
  ['cronômetro contínuo', /function startSimulationTimer\(/],
  ['marcação para revisar', /data-sim-flag/],
  ['cartão-resposta', /CARTÃO-RESPOSTA/],
  ['navegação livre', /data-sim-jump/],
  ['finalização explícita', /finishSimulation/],
  ['relatório final', /function renderSimulationResult\(/],
  ['desempenho por disciplina', /DESEMPENHO POR DISCIPLINA/],
  ['assuntos fracos', /ASSUNTOS FRACOS/],
  ['gabarito pós-prova', /GABARITO COMENTADO PÓS-PROVA/],
  ['estilo de cartão-resposta', /\.answer-sheet\{/],
]
for (const [name, rx] of required) if (!rx.test(app + '\n' + css)) fail('Recurso V8 ausente:', name)

const simStart = app.indexOf('function renderSimulationQuestion(')
const simEnd = app.indexOf('function startSimulationTimer(', simStart)
const simRender = app.slice(simStart, simEnd)
if (/q\.answer|q\.explanation|sourceLink\(q\)/.test(simRender)) fail('Modo prova expõe gabarito/comentário antes da finalização')
else console.log('Correção durante a prova: BLOQUEADA')

const resultStart = app.indexOf('function renderSimulationResult(')
const resultEnd = app.indexOf('function revisoes(', resultStart)
const resultRender = app.slice(resultStart, resultEnd)
if (!/q\.answer/.test(resultRender) || !/q\.explanation/.test(resultRender)) fail('Resultado não libera gabarito comentado')
else console.log('Gabarito comentado pós-prova: OK')

console.log('\n=== TRILHAS E MATERIAIS ===')
for (const c of cargos) for (const d of c.disciplines) {
  const guide = studyGuides[d.id]
  if (!guide) fail('Sem trilha', d.id)
  const covered = new Set(guide?.modules.flatMap(m => m.topics) || [])
  const missing = d.topics.filter(t => !covered.has(t))
  if (missing.length) fail('Trilha incompleta', d.id, missing)
}
console.log(`Materiais: ${materials.length}`)
console.log('\n=== NUVEM V9 ===')
const cloud = fs.readFileSync('./cloud.js','utf8')
const index = fs.readFileSync('./index.html','utf8')
const migration = fs.readFileSync('./supabase/migrations/20260810_user_state.sql','utf8')
const build = fs.readFileSync('./scripts/render-build.sh','utf8')
const v9checks=[
 ['login por senha',/signInWithPassword/],['cadastro',/auth\.signUp/],['estado remoto',/from\('user_state'\)/],['upsert remoto',/\.upsert\(/],['auth gate',/id="authScreen"/],['logout',/id="logoutBtn"/],['RLS habilitado',/enable row level security/i],['policy auth.uid select',/auth\.uid\(\).*user_id/s],['build Render gera config',/SUPABASE_PUBLISHABLE_KEY/]
]
for(const [name,rx] of v9checks) if(!rx.test(cloud+'\n'+app+'\n'+index+'\n'+migration+'\n'+build)) fail('Recurso V9 ausente:',name)
const repoText=cloud+'\n'+app+'\n'+index+'\n'+migration+'\n'+build
if(/service[_-]?role/i.test(repoText)) fail('Referência a service_role encontrada na aplicação cliente')
else console.log('Cliente sem service_role: OK')
console.log('Autenticação + RLS + sincronização: OK')
console.log(`\nRESULTADO: ${ok ? 'OK' : 'FALHA'}`)
process.exit(ok ? 0 : 1)
