// Trilha prática de Matemática do Operador Social.
// Integra diretamente nos 7 módulos já renderizados pela disciplina.

const MATH_MODULES = [
  {
    video:'https://www.youtube.com/watch?v=i2GEeGSrZ_E',
    label:'Frações do zero — Professor Ferretto',
    example:['Exemplo: 3/4 + 1/2','1) Transforme 1/2 em 2/4.','2) Some: 3/4 + 2/4 = 5/4.','3) 5/4 também pode ser escrito como 1,25.'],
    guided:{q:'Quanto é 2/3 + 1/6?',h:['Deixe as duas frações com o mesmo denominador.','2/3 = 4/6.','Agora some 4/6 + 1/6.'],a:'5/6'}
  },
  {
    video:'https://www.youtube.com/results?search_query=porcentagem+razao+proporcao+regra+de+tres+matematica+basica+professor+ferretto',
    label:'Porcentagem, razão e regra de três — aula básica',
    example:['Exemplo: 25% de 200','1) 25% = 25/100 = 0,25.','2) Multiplique 0,25 × 200.','3) Resultado: 50.'],
    guided:{q:'Se 4 cadernos custam R$ 20, quanto custam 6?',h:['Descubra primeiro o preço de 1 caderno.','20 ÷ 4 = 5.','Agora faça 6 × 5.'],a:'R$ 30'}
  },
  {
    video:'https://www.youtube.com/results?search_query=media+aritmetica+medidas+perimetro+area+matematica+basica+aula',
    label:'Média, medidas, perímetro e área — aula básica',
    example:['Exemplo: média de 6, 8 e 10','1) Some: 6 + 8 + 10 = 24.','2) Existem 3 valores.','3) 24 ÷ 3 = 8.'],
    guided:{q:'Um retângulo mede 5 m por 3 m. Qual é a área?',h:['Use área = base × altura.','Base 5 e altura 3.','Faça 5 × 3.'],a:'15 m²'}
  },
  {
    video:'https://www.youtube.com/results?search_query=interpretacao+tabelas+graficos+matematica+basica+concursos',
    label:'Tabelas e gráficos — interpretação básica',
    example:['Exemplo: 20 atendimentos na segunda e 35 na terça.','1) Pegue apenas os valores pedidos.','2) Para saber o aumento: 35 − 20.','3) Aumento de 15 atendimentos.'],
    guided:{q:'Janeiro teve 40 casos e fevereiro 55. Qual foi o aumento?',h:['A pergunta pede diferença.','Use subtração.','Faça 55 − 40.'],a:'15 casos'}
  },
  {
    video:'https://www.youtube.com/results?search_query=problemas+tempo+horas+minutos+matematica+basica+concursos',
    label:'Tempo, horas e minutos — problemas básicos',
    example:['Exemplo: começa às 13h20 e dura 1h45.','1) +1 hora = 14h20.','2) +45 min = 15h05.','3) Termina às 15h05.'],
    guided:{q:'Um atendimento começa às 9h35 e dura 50 minutos. Quando termina?',h:['Até 10h faltam 25 minutos.','Depois disso restam 25 minutos.','Some 25 minutos a 10h.'],a:'10h25'}
  },
  {
    video:'https://www.youtube.com/watch?v=XLEJ236hXr4',
    label:'Proposições, conectivos e negação — aula básica',
    example:['Exemplo: negue “Todos os servidores chegaram cedo”.','1) Para negar “todos”, basta uma exceção.','2) Não troque simplesmente por “nenhum”.','3) Negação: “Pelo menos um servidor não chegou cedo”.'],
    guided:{q:'Negue: “João estuda e Maria trabalha”.',h:['Use a Lei de De Morgan.','Negue cada parte.','Troque “e” por “ou”.'],a:'João não estuda ou Maria não trabalha.'}
  },
  {
    video:'https://www.youtube.com/results?search_query=sequencias+padroes+raciocinio+logico+concursos+aula+basica',
    label:'Sequências e padrões — raciocínio lógico básico',
    example:['Exemplo: 2, 5, 8, 11, ...','1) Compare termos vizinhos.','2) A diferença é sempre +3.','3) Próximo: 11 + 3 = 14.'],
    guided:{q:'Complete: 3, 6, 12, 24, ...',h:['Observe a relação entre termos.','Cada número é o anterior ×2.','Faça 24 × 2.'],a:'48'}
  }
]

const escMath=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))

function learningHtml(m){
  return `<div class="math-learning-flow">
    <section class="math-step learn"><span>🎥 1. Aprenda</span><p>Assista primeiro à explicação. Pause o vídeo e refaça as contas no papel.</p><a class="math-video-btn" href="${m.video}" target="_blank" rel="noreferrer">▶ Ver explicação em vídeo</a><small>${escMath(m.label)}</small></section>
    <section class="math-step"><span>✏️ 2. Veja um exemplo resolvido</span><ol>${m.example.map(x=>`<li>${escMath(x)}</li>`).join('')}</ol></section>
    <section class="math-step guided"><span>🧮 3. Resolva comigo</span><p><b>${escMath(m.guided.q)}</b></p><div class="math-hints">${m.guided.h.map((x,i)=>`<details><summary>Dica ${i+1}</summary><p>${escMath(x)}</p></details>`).join('')}<details class="math-answer"><summary>Conferir resposta</summary><p><b>${escMath(m.guided.a)}</b></p></details></div></section>
    <section class="math-step solo"><span>🎯 4. Agora sozinha</span><p>Resolva de 3 a 5 questões desse assunto. Abaixo de 70% de acertos, volte ao vídeo e refaça o exemplo.</p><button class="math-go-questions" type="button">Ir para Questões</button></section>
  </div>`
}

function operadorAtivo(){return document.querySelector('#cargoSelect')?.value==='operador'}

function patchStudy(){
  if(!operadorAtivo())return
  const pageTitle=document.querySelector('.section-header h2')?.textContent||''
  if(!/Matemática.*Raciocínio Lógico/i.test(pageTitle))return
  const cards=[...document.querySelectorAll('.study-module')]
  cards.forEach((card,i)=>{
    const m=MATH_MODULES[i]
    if(!m||card.dataset.mathV2==='1')return
    const summary=card.querySelector('summary>div')
    if(summary)summary.insertAdjacentHTML('beforeend','<span class="math-method-badge">🎥 Método em 4 etapas</span>')
    const body=card.querySelector('.study-module-body')
    if(body)body.insertAdjacentHTML('afterbegin',learningHtml(m))
    card.dataset.mathV2='1'
  })
}

function topicVideo(topic){
  const t=topic.toLowerCase()
  if(t.includes('fraç')||t.includes('inteiro')||t.includes('racional'))return MATH_MODULES[0].video
  if(t.includes('porcent')||t.includes('razão')||t.includes('propor')||t.includes('regra de três'))return MATH_MODULES[1].video
  if(t.includes('média')||t.includes('medida')||t.includes('perímetro')||t.includes('área'))return MATH_MODULES[2].video
  if(t.includes('tabela')||t.includes('gráfico'))return MATH_MODULES[3].video
  if(t.includes('tempo')||t.includes('prazo')||t.includes('quantidade'))return MATH_MODULES[4].video
  if(t.includes('proposi')||t.includes('conectivo')||t.includes('negação'))return MATH_MODULES[5].video
  if(t.includes('sequência')||t.includes('padr')||t.includes('organização'))return MATH_MODULES[6].video
  return 'https://www.youtube.com/results?search_query='+encodeURIComponent(topic+' matemática básica concursos aula')
}

function patchReview(){
  if(!operadorAtivo())return
  document.querySelectorAll('.weak-topic-row').forEach(row=>{
    if(row.dataset.mathReviewV2==='1')return
    const disc=row.querySelector('span')?.textContent||''
    if(!/Matemática|Raciocínio Lógico/i.test(disc))return
    const topic=row.querySelector('b')?.textContent||''
    const a=document.createElement('a')
    a.className='math-review-video';a.target='_blank';a.rel='noreferrer';a.href=topicVideo(topic);a.textContent='▶ Ver explicação em vídeo'
    row.appendChild(a);row.dataset.mathReviewV2='1'
  })
}

function bindMathButtons(){
  document.querySelectorAll('.math-go-questions').forEach(btn=>{
    if(btn.dataset.mathBound==='1')return
    btn.dataset.mathBound='1'
    btn.onclick=()=>[...document.querySelectorAll('#nav button')].find(b=>b.textContent.trim()==='Questões')?.click()
  })
}

function refreshMath(){patchStudy();patchReview();bindMathButtons()}
setInterval(refreshMath,400)
document.addEventListener('click',()=>setTimeout(refreshMath,50))
document.addEventListener('change',()=>setTimeout(refreshMath,50))
window.addEventListener('load',refreshMath)
refreshMath()
