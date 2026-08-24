// Camada pedagógica para Matemática e Raciocínio Lógico do Operador Social.
// Enriquece a trilha existente sem alterar persistência, banco de questões ou simulados.

const MODULES = [
  {
    match: ['Inteiros, racionais e frações'],
    video: 'https://www.youtube.com/watch?v=i2GEeGSrZ_E',
    videoLabel: 'Frações do zero — Professor Ferretto',
    example: ['Exemplo: 3/4 + 1/2', '1) Use o mesmo denominador: 1/2 = 2/4.', '2) Some os numeradores: 3/4 + 2/4 = 5/4.', '3) Resultado: 5/4 = 1,25.'],
    guided: {q:'Quanto é 2/3 + 1/6?', hints:['Primeiro, deixe as duas frações com o mesmo denominador.','3 vira 6 multiplicando por 2. Faça o mesmo no numerador: 2/3 = 4/6.','Agora some 4/6 + 1/6.'], answer:'5/6'}
  },
  {
    match: ['Porcentagem, razão, proporção e regra de três'],
    video: 'https://www.youtube.com/results?search_query=porcentagem+razao+proporcao+regra+de+tres+matematica+basica+professor+ferretto',
    videoLabel: 'Porcentagem e regra de três — aula básica',
    example: ['Exemplo: 25% de 200', '1) 25% = 25/100 = 0,25.', '2) Multiplique: 0,25 × 200.', '3) Resultado: 50.'],
    guided: {q:'Se 4 cadernos custam R$ 20, quanto custam 6 cadernos?', hints:['Descubra primeiro quanto custa 1 caderno.','20 ÷ 4 = 5 reais por caderno.','Agora multiplique o valor unitário por 6.'], answer:'R$ 30'}
  },
  {
    match: ['Média, medidas, perímetro e área'],
    video: 'https://www.youtube.com/results?search_query=media+aritmetica+medidas+perimetro+area+matematica+basica+aula',
    videoLabel: 'Média, medidas, perímetro e área — aula básica',
    example: ['Exemplo: média de 6, 8 e 10', '1) Some os valores: 6 + 8 + 10 = 24.', '2) Conte quantos valores existem: 3.', '3) Divida: 24 ÷ 3 = 8.'],
    guided: {q:'Um retângulo mede 5 m por 3 m. Qual é a área?', hints:['Área de retângulo usa base × altura.','A base é 5 e a altura é 3.','Multiplique 5 × 3.'], answer:'15 m²'}
  },
  {
    match: ['Tabelas e gráficos'],
    video: 'https://www.youtube.com/results?search_query=interpretacao+tabelas+graficos+matematica+basica+concursos',
    videoLabel: 'Tabelas e gráficos — interpretação básica',
    example: ['Exemplo: uma tabela mostra 20 atendimentos na segunda e 35 na terça.', '1) Identifique os valores pedidos.', '2) Para saber o aumento, faça 35 − 20.', '3) O aumento foi de 15 atendimentos.'],
    guided: {q:'Um gráfico mostra 40 casos em janeiro e 55 em fevereiro. Qual foi o aumento?', hints:['Leia apenas os dois valores relevantes.','A pergunta pede diferença, então use subtração.','Faça 55 − 40.'], answer:'15 casos'}
  },
  {
    match: ['Tempo, prazos e quantidades'],
    video: 'https://www.youtube.com/results?search_query=problemas+tempo+horas+minutos+matematica+basica+concursos',
    videoLabel: 'Tempo, horas e minutos — problemas básicos',
    example: ['Exemplo: uma tarefa começa às 13h20 e dura 1h45.', '1) Some 1 hora: 14h20.', '2) Some 45 minutos: 15h05.', '3) Termina às 15h05.'],
    guided: {q:'Um atendimento começa às 9h35 e dura 50 minutos. Quando termina?', hints:['Até 10h faltam 25 minutos.','Dos 50 minutos, depois disso ainda restam 25.','Some os 25 restantes a 10h.'], answer:'10h25'}
  },
  {
    match: ['Proposições, conectivos e negação'],
    video: 'https://www.youtube.com/watch?v=XLEJ236hXr4',
    videoLabel: 'Proposições e negação — Julio Bara Matemática',
    example: ['Exemplo: negue “Todos os servidores chegaram cedo”.', '1) Não troque simplesmente por “nenhum”.', '2) Para negar “todos”, basta existir pelo menos uma exceção.', '3) Negação: “Pelo menos um servidor não chegou cedo”.'],
    guided: {q:'Qual é a negação de “João estuda e Maria trabalha”?', hints:['A negação de uma conjunção usa a Lei de De Morgan.','Negue cada parte e troque “e” por “ou”.','Fica: João não estuda OU Maria não trabalha.'], answer:'João não estuda ou Maria não trabalha.'}
  },
  {
    match: ['Sequências, padrões e organização de informações'],
    video: 'https://www.youtube.com/results?search_query=sequencias+padroes+raciocinio+logico+concursos+aula+basica',
    videoLabel: 'Sequências e padrões — raciocínio lógico básico',
    example: ['Exemplo: 2, 5, 8, 11, ...', '1) Compare termos vizinhos.', '2) A diferença é sempre +3.', '3) Próximo termo: 11 + 3 = 14.'],
    guided: {q:'Complete: 3, 6, 12, 24, ...', hints:['Observe o que acontece de um termo para o próximo.','Cada termo é o anterior multiplicado por 2.','Faça 24 × 2.'], answer:'48'}
  }
]

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const isOperador = () => document.querySelector('#cargoSelect')?.value === 'operador'
const moduleFor = title => MODULES.find(m => m.match.some(x => title.includes(x)))

function learningBlock(m){
  return `<div class="math-learning-flow">
    <section class="math-step learn"><span>🎥 1. Aprenda</span><p>Comece pela explicação em vídeo. Assista pausando e refazendo as contas no papel.</p><a class="math-video-btn" target="_blank" rel="noreferrer" href="${m.video}">▶ Ver explicação em vídeo</a><small>${esc(m.videoLabel)}</small></section>
    <section class="math-step"><span>✏️ 2. Veja um exemplo resolvido</span><ol>${m.example.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></section>
    <section class="math-step guided"><span>🧮 3. Resolva comigo</span><p><b>${esc(m.guided.q)}</b></p><div class="math-hints">${m.guided.hints.map((h,i)=>`<details><summary>Dica ${i+1}</summary><p>${esc(h)}</p></details>`).join('')}<details class="math-answer"><summary>Conferir resposta</summary><p><b>${esc(m.guided.answer)}</b></p></details></div></section>
    <section class="math-step solo"><span>🎯 4. Agora sozinha</span><p>Faça de 3 a 5 questões desse assunto no banco. Tente sem olhar as dicas. Se ficar abaixo de 70%, volte ao vídeo e refaça o exemplo.</p><button class="math-go-questions" type="button">Ir para Questões</button></section>
  </div>`
}

function enhanceStudy(){
  if(!isOperador()) return
  document.querySelectorAll('.study-module').forEach(card=>{
    if(card.dataset.mathEnhanced) return
    const title=card.querySelector('summary h3')?.textContent?.trim()||''
    const m=moduleFor(title)
    if(!m) return
    const body=card.querySelector('.study-module-body')
    if(!body) return
    body.insertAdjacentHTML('afterbegin',learningBlock(m))
    card.dataset.mathEnhanced='1'
  })
}

function enhanceReview(){
  if(!isOperador()) return
  document.querySelectorAll('.weak-topic-row').forEach(row=>{
    if(row.dataset.mathVideo) return
    const discipline=row.querySelector('span')?.textContent||''
    if(!/Matemática|Raciocínio Lógico/i.test(discipline)) return
    const topic=row.querySelector('b')?.textContent||''
    const m=MODULES.find(x=>x.match.some(k=>k.toLowerCase().split(',')[0].includes(topic.toLowerCase())||topic.toLowerCase().includes(k.toLowerCase().split(',')[0]))) || MODULES.find(x=>x.match.some(k=>/fraç|porcent|razão|regra|média|medida|perímetro|área|tabela|gráfico|tempo|prazo|quantidade|proposi|conectivo|negação|sequência|padr/i.test(k)&&new RegExp(topic.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'))))
    const fallback='https://www.youtube.com/results?search_query='+encodeURIComponent(topic+' matemática básica concursos aula')
    const a=document.createElement('a');a.className='math-review-video';a.target='_blank';a.rel='noreferrer';a.href=m?.video||fallback;a.textContent='▶ Ver explicação em vídeo'
    row.appendChild(a);row.dataset.mathVideo='1'
  })
}

function bindActions(){
  document.querySelectorAll('.math-go-questions').forEach(btn=>{if(btn.dataset.bound)return;btn.dataset.bound='1';btn.addEventListener('click',()=>{const nav=[...document.querySelectorAll('#nav button')].find(b=>b.textContent.trim()==='Questões');nav?.click()})})
}

function run(){enhanceStudy();enhanceReview();bindActions()}
const obs=new MutationObserver(()=>requestAnimationFrame(run))
obs.observe(document.documentElement,{childList:true,subtree:true})
document.addEventListener('change',e=>{if(e.target?.id==='cargoSelect')setTimeout(run,0)})
run()
