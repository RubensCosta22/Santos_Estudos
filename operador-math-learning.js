// Trilha prática de Matemática do Operador Social.
// Integra diretamente nos 7 módulos já renderizados pela disciplina.

const MATH_MODULES = [
  {
    video:'https://www.youtube.com/watch?v=i2GEeGSrZ_E',
    label:'Frações do zero — Professor Ferretto',
    example:[
      'Exemplo: 3/4 + 1/2',
      'Antes da conta: o número de baixo (denominador) diz em quantas partes iguais o inteiro foi dividido. Em 3/4, o inteiro foi dividido em 4 partes e pegamos 3. Em 1/2, foi dividido em 2 partes e pegamos 1.',
      'Por que não fazemos simplesmente 3 + 1 e 4 + 2? Porque quartos e metades são pedaços de tamanhos diferentes. Para somar, precisamos deixar os pedaços do mesmo tamanho.',
      'Como transformar 1/2 em quartos: queremos que o número de baixo passe de 2 para 4. Como 2 × 2 = 4, multiplicamos TAMBÉM o número de cima por 2: 1 × 2 = 2. Portanto, 1/2 = 2/4. Não mudamos o valor da fração; apenas escrevemos a mesma quantidade de outro jeito.',
      'Agora temos 3/4 + 2/4. Os pedaços têm o mesmo tamanho: todos são quartos. Então mantemos o 4 embaixo e contamos quantos quartos temos: 3 quartos + 2 quartos = 5 quartos. Resultado: 5/4.',
      'O que significa 5/4? Significa cinco pedaços de tamanho 1/4. Quatro quartos formam 1 inteiro: 4/4 = 1. Sobra mais 1/4. Portanto, 5/4 = 1 + 1/4 = 1 1/4.',
      'Como chegar a 1,25 sem calculadora: faça 5 ÷ 4. O 4 cabe 1 vez no 5; escreva 1 e sobra 1. Coloque a vírgula e acrescente um zero à sobra: vira 10. O 4 cabe 2 vezes em 10 (2 × 4 = 8); sobra 2. Acrescente outro zero: vira 20. O 4 cabe 5 vezes em 20. Assim, 5 ÷ 4 = 1,25.',
      'Atalho útil: 1/4 = 0,25. Como 5/4 = 1 inteiro + 1/4, também podemos pensar 1 + 0,25 = 1,25.'
    ],
    guided:{q:'Quanto é 2/3 + 1/6?',h:['Primeiro precisamos deixar os denominadores iguais. Temos terços e sextos. Como 3 × 2 = 6, podemos transformar 2/3 em sextos.','Multiplique em cima e embaixo por 2: 2/3 = (2 × 2)/(3 × 2) = 4/6. A quantidade continua igual; só mudamos a forma de escrever.','Agora a conta é 4/6 + 1/6. Como os pedaços são todos sextos, mantenha o 6 e some apenas os pedaços: 4 + 1 = 5.'],a:'5/6'}
  },
  {
    video:'https://www.youtube.com/results?search_query=porcentagem+razao+proporcao+regra+de+tres+matematica+basica+professor+ferretto',
    label:'Porcentagem, razão e regra de três — aula básica',
    example:['Exemplo: 25% de 200','25% quer dizer 25 de cada 100. Como 200 possui dois grupos de 100, teremos 25 + 25.','Outra forma: 25% = 25/100 = 1/4. Então basta dividir 200 por 4.','200 ÷ 4 = 50. Portanto, 25% de 200 = 50.'],
    guided:{q:'Se 4 cadernos custam R$ 20, quanto custam 6?',h:['Descubra primeiro quanto custa apenas 1 caderno.','Se 4 custam 20, faça 20 ÷ 4 = 5. Cada caderno custa R$ 5.','Agora queremos 6 cadernos: 6 × 5 = 30.'],a:'R$ 30'}
  },
  {
    video:'https://www.youtube.com/results?search_query=media+aritmetica+medidas+perimetro+area+matematica+basica+aula',
    label:'Média, medidas, perímetro e área — aula básica',
    example:['Exemplo: média de 6, 8 e 10','Média é como repartir igualmente o total entre todos os valores.','Primeiro some tudo: 6 + 8 + 10 = 24.','Temos 3 números. Divida o total por 3: 24 ÷ 3 = 8. A média é 8.'],
    guided:{q:'Um retângulo mede 5 m por 3 m. Qual é a área?',h:['Área é o espaço que existe dentro da figura.','No retângulo, multiplicamos base pela altura: 5 × 3.','Imagine 3 fileiras com 5 quadradinhos em cada uma: 5 + 5 + 5 = 15.'],a:'15 m²'}
  },
  {
    video:'https://www.youtube.com/results?search_query=interpretacao+tabelas+graficos+matematica+basica+concursos',
    label:'Tabelas e gráficos — interpretação básica',
    example:['Exemplo: 20 atendimentos na segunda e 35 na terça. Quanto aumentou?','A palavra “aumentou” pede a diferença entre o valor maior e o menor.','Faça 35 − 20 = 15.','Isso não quer dizer que terça teve 15 atendimentos; terça teve 35. O aumento de segunda para terça foi de 15.'],
    guided:{q:'Janeiro teve 40 casos e fevereiro 55. Qual foi o aumento?',h:['Procure o valor inicial e o valor final.','Para descobrir quanto aumentou, faça final − inicial.','55 − 40 = 15.'],a:'15 casos'}
  },
  {
    video:'https://www.youtube.com/results?search_query=problemas+tempo+horas+minutos+matematica+basica+concursos',
    label:'Tempo, horas e minutos — problemas básicos',
    example:['Exemplo: começa às 13h20 e dura 1h45.','Some primeiro a parte fácil: 1 hora depois de 13h20 é 14h20.','Agora faltam 45 minutos. De 14h20 até 15h00 passam 40 minutos. Ainda faltam 5 minutos.','Some os 5 minutos restantes: termina às 15h05.'],
    guided:{q:'Um atendimento começa às 9h35 e dura 50 minutos. Quando termina?',h:['De 9h35 até 10h00 passam 25 minutos.','Dos 50 minutos, já usamos 25. Restam 25 minutos.','Some os 25 restantes a 10h00.'],a:'10h25'}
  },
  {
    video:'https://www.youtube.com/watch?v=XLEJ236hXr4',
    label:'Proposições, conectivos e negação — aula básica',
    example:['Exemplo: negue “Todos os servidores chegaram cedo”.','Negar uma frase significa dizer o que precisa acontecer para provar que ela é falsa.','Para provar que “todos chegaram cedo” é falso, não precisamos mostrar que ninguém chegou cedo. Basta encontrar uma única pessoa que não chegou cedo.','Por isso, a negação correta é: “Pelo menos um servidor não chegou cedo”.'],
    guided:{q:'Negue: “João estuda e Maria trabalha”.',h:['A frase afirma que as duas coisas acontecem ao mesmo tempo. Para ela ser falsa, basta pelo menos uma delas não acontecer.','Negue cada parte: “João não estuda” e “Maria não trabalha”.','Ao negar uma frase ligada por “e”, usamos “ou”: basta uma das duas falhar.'],a:'João não estuda ou Maria não trabalha.'}
  },
  {
    video:'https://www.youtube.com/results?search_query=sequencias+padroes+raciocinio+logico+concursos+aula+basica',
    label:'Sequências e padrões — raciocínio lógico básico',
    example:['Exemplo: 2, 5, 8, 11, ...','Pergunte: o que aconteceu do 2 para o 5? Somou 3.','Confira se a regra continua: 5 + 3 = 8 e 8 + 3 = 11. Sim.','Então repita a regra: 11 + 3 = 14. O próximo número é 14.'],
    guided:{q:'Complete: 3, 6, 12, 24, ...',h:['Compare cada número com o anterior.','3 virou 6, 6 virou 12 e 12 virou 24. Em todos os casos o número dobrou, ou seja, multiplicou por 2.','Repita a mesma regra no último número: 24 × 2.'],a:'48'}
  }
]

const escMath=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))

function learningHtml(m){
  return `<div class="math-learning-flow">
    <section class="math-step learn"><span>🎥 1. Aprenda</span><p>Assista primeiro à explicação. Pause o vídeo e refaça as contas no papel.</p><a class="math-video-btn" href="${m.video}" target="_blank" rel="noreferrer">▶ Ver explicação em vídeo</a><small>${escMath(m.label)}</small></section>
    <section class="math-step"><span>✏️ 2. Veja um exemplo resolvido — sem pular etapas</span><ol>${m.example.map(x=>`<li>${escMath(x)}</li>`).join('')}</ol></section>
    <section class="math-step guided"><span>🧮 3. Resolva comigo</span><p><b>${escMath(m.guided.q)}</b></p><div class="math-hints">${m.guided.h.map((x,i)=>`<details><summary>Dica ${i+1}</summary><p>${escMath(x)}</p></details>`).join('')}<details class="math-answer"><summary>Conferir resposta</summary><p><b>${escMath(m.guided.a)}</b></p></details></div></section>
    <section class="math-step solo"><span>🎯 4. Agora sozinha</span><p>Resolva de 3 a 5 questões desse assunto. Abaixo de 70% de acertos, volte ao vídeo e refaça o exemplo.</p><button class="math-go-questions" type="button">Ir para Questões</button></section>
  </div>`
}

function operadorAtivo(){return document.querySelector('#cargoSelect')?.value==='operador'}
function patchStudy(){if(!operadorAtivo())return;const pageTitle=document.querySelector('.section-header h2')?.textContent||'';if(!/Matemática.*Raciocínio Lógico/i.test(pageTitle))return;[...document.querySelectorAll('.study-module')].forEach((card,i)=>{const m=MATH_MODULES[i];if(!m||card.dataset.mathV2==='1')return;const summary=card.querySelector('summary>div');if(summary)summary.insertAdjacentHTML('beforeend','<span class="math-method-badge">🎥 Método em 4 etapas</span>');const body=card.querySelector('.study-module-body');if(body)body.insertAdjacentHTML('afterbegin',learningHtml(m));card.dataset.mathV2='1'})}
function topicVideo(topic){const t=topic.toLowerCase();if(t.includes('fraç')||t.includes('inteiro')||t.includes('racional'))return MATH_MODULES[0].video;if(t.includes('porcent')||t.includes('razão')||t.includes('propor')||t.includes('regra de três'))return MATH_MODULES[1].video;if(t.includes('média')||t.includes('medida')||t.includes('perímetro')||t.includes('área'))return MATH_MODULES[2].video;if(t.includes('tabela')||t.includes('gráfico'))return MATH_MODULES[3].video;if(t.includes('tempo')||t.includes('prazo')||t.includes('quantidade'))return MATH_MODULES[4].video;if(t.includes('proposi')||t.includes('conectivo')||t.includes('negação'))return MATH_MODULES[5].video;if(t.includes('sequência')||t.includes('padr')||t.includes('organização'))return MATH_MODULES[6].video;return 'https://www.youtube.com/results?search_query='+encodeURIComponent(topic+' matemática básica concursos aula')}
function patchReview(){if(!operadorAtivo())return;document.querySelectorAll('.weak-topic-row').forEach(row=>{if(row.dataset.mathReviewV2==='1')return;const disc=row.querySelector('span')?.textContent||'';if(!/Matemática|Raciocínio Lógico/i.test(disc))return;const topic=row.querySelector('b')?.textContent||'';const a=document.createElement('a');a.className='math-review-video';a.target='_blank';a.rel='noreferrer';a.href=topicVideo(topic);a.textContent='▶ Ver explicação em vídeo';row.appendChild(a);row.dataset.mathReviewV2='1'})}
function bindMathButtons(){document.querySelectorAll('.math-go-questions').forEach(btn=>{if(btn.dataset.mathBound==='1')return;btn.dataset.mathBound='1';btn.onclick=()=>[...document.querySelectorAll('#nav button')].find(b=>b.textContent.trim()==='Questões')?.click()})}
function refreshMath(){patchStudy();patchReview();bindMathButtons()}
setInterval(refreshMath,400);document.addEventListener('click',()=>setTimeout(refreshMath,50));document.addEventListener('change',()=>setTimeout(refreshMath,50));window.addEventListener('load',refreshMath);refreshMath()
