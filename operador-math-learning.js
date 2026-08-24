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
    label:'Porcentagem, razão, proporção e regra de três — aula básica',
    lessons:[
      {
        title:'A. Porcentagem — entender antes de calcular',
        why:'Porcentagem significa “de cada 100”. O símbolo % não é uma operação misteriosa: 25% significa 25 em cada 100; 50% significa metade; 10% significa 10 em cada 100.',
        example:[
          'Exemplo: quanto é 25% de 200?',
          '25% quer dizer 25 de cada 100.',
          'O número 200 tem dois grupos de 100. Então pegamos 25 no primeiro grupo e 25 no segundo.',
          '25 + 25 = 50. Portanto, 25% de 200 = 50.',
          'Outro jeito: 25% = 25/100. Simplificando por 25, temos 1/4. Então 25% de um número é a mesma coisa que dividir esse número por 4.',
          '200 ÷ 4 = 50.'
        ],
        guided:{q:'Quanto é 10% de 350?',h:['10% significa 10 de cada 100.','Um atalho seguro para 10% é dividir o número por 10.','350 ÷ 10 = 35.'],a:'35'}
      },
      {
        title:'B. Razão — comparar duas quantidades',
        why:'Razão é uma comparação por divisão. Quando dizemos “2 para 5”, estamos comparando 2 com 5. Podemos escrever 2:5 ou 2/5. A ordem importa: 2/5 não é igual a 5/2.',
        example:[
          'Exemplo: uma equipe tem 6 homens e 9 mulheres. Qual é a razão de homens para mulheres?',
          'A pergunta diz “homens para mulheres”. Então colocamos homens primeiro: 6/9.',
          'Podemos simplificar dividindo os dois números por 3: 6 ÷ 3 = 2 e 9 ÷ 3 = 3.',
          'A razão simplificada é 2/3, ou 2:3.',
          'Isso significa que, mantendo essa mesma comparação, para cada 2 homens há 3 mulheres.'
        ],
        guided:{q:'Há 8 crianças e 12 adultos. Qual é a razão de crianças para adultos, simplificada?',h:['A ordem pedida é crianças primeiro e adultos depois: 8/12.','Procure um número que divida 8 e 12. O 4 divide os dois.','8 ÷ 4 = 2 e 12 ÷ 4 = 3.'],a:'2/3 ou 2:3'}
      },
      {
        title:'C. Proporção — duas razões que representam a mesma relação',
        why:'Proporção acontece quando duas razões são equivalentes. É como dizer que 1/2 e 2/4 representam a mesma quantidade. A ideia é manter a mesma relação enquanto os números aumentam ou diminuem juntos.',
        example:[
          'Exemplo: 2/3 = 4/6 é uma proporção?',
          'Sim. De 2 para 4 multiplicamos por 2. De 3 para 6 também multiplicamos por 2.',
          'Como numerador e denominador foram multiplicados pelo mesmo número, a relação foi mantida.',
          'Também podemos conferir cruzando: 2 × 6 = 12 e 3 × 4 = 12. Como os produtos são iguais, as razões são proporcionais.'
        ],
        guided:{q:'3/5 e 9/15 formam uma proporção?',h:['Veja o que aconteceu de 3 para 9: multiplicou por 3.','Veja o que aconteceu de 5 para 15: também multiplicou por 3.','Como os dois lados mudaram pelo mesmo fator, a relação foi mantida.'],a:'Sim, 3/5 = 9/15.'}
      },
      {
        title:'D. Regra de três simples — descobrir o número que falta',
        why:'Regra de três é usada quando temos três valores conhecidos e queremos descobrir um quarto valor mantendo a mesma relação. Antes de montar a conta, pergunte: “se uma quantidade aumenta, a outra também aumenta?” Se sim, é um caso direto como preço e quantidade de itens.',
        example:[
          'Exemplo: 4 cadernos custam R$ 20. Quanto custam 6 cadernos?',
          'Primeiro organize os dados na mesma ordem: 4 cadernos → R$ 20; 6 cadernos → R$ x.',
          'Por que colocamos x? Porque x representa o valor que ainda não sabemos.',
          'Como mais cadernos custam mais dinheiro, as grandezas aumentam juntas. É uma relação diretamente proporcional.',
          'Método mais fácil para começar: descubra o valor de 1 caderno. Se 4 custam 20, faça 20 ÷ 4 = 5. Cada caderno custa R$ 5.',
          'Agora calcule 6 cadernos: 6 × 5 = 30. Resposta: R$ 30.',
          'Método da multiplicação cruzada: 4/20 = 6/x. Multiplique cruzado: 4 × x = 20 × 6. Então 4x = 120.',
          'Agora precisamos deixar x sozinho. Como x está multiplicado por 4, fazemos a operação contrária: 120 ÷ 4 = 30. Logo, x = 30.',
          'Por que podemos dividir por 4? Porque 4x quer dizer 4 vezes x. Se 4 vezes alguma coisa dá 120, essa coisa é 120 dividido por 4.'
        ],
        guided:{q:'3 garrafas custam R$ 18. Quanto custam 5 garrafas?',h:['Organize: 3 garrafas → R$ 18; 5 garrafas → R$ x.','Comece pelo valor de 1 garrafa: 18 ÷ 3 = 6.','Se cada garrafa custa R$ 6, faça 5 × 6.'],a:'R$ 30'}
      }
    ]
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
const guidedHtml=g=>`<div class="math-hints">${g.h.map((x,i)=>`<details><summary>Dica ${i+1}</summary><p>${escMath(x)}</p></details>`).join('')}<details class="math-answer"><summary>Conferir resposta</summary><p><b>${escMath(g.a)}</b></p></details></div>`

function learningHtml(m){
  const lessonHtml=m.lessons?`<section class="math-step"><span>✏️ 2. Aprenda cada parte do módulo — uma por vez</span><p>Este módulo reúne assuntos diferentes. Não vamos misturá-los: estude um bloco, faça o exercício guiado e só depois passe ao próximo.</p>${m.lessons.map((l,i)=>`<div class="math-sublesson"><h4>${escMath(l.title)}</h4><p class="math-why"><b>O que isso quer dizer?</b> ${escMath(l.why)}</p><div class="math-example"><b>Exemplo resolvido — sem pular etapas</b><ol>${l.example.map(x=>`<li>${escMath(x)}</li>`).join('')}</ol></div><div class="math-guided-inline"><b>🧮 Agora resolva comigo</b><p>${escMath(l.guided.q)}</p>${guidedHtml(l.guided)}</div></div>`).join('')}</section>`:`<section class="math-step"><span>✏️ 2. Veja um exemplo resolvido — sem pular etapas</span><ol>${m.example.map(x=>`<li>${escMath(x)}</li>`).join('')}</ol></section><section class="math-step guided"><span>🧮 3. Resolva comigo</span><p><b>${escMath(m.guided.q)}</b></p>${guidedHtml(m.guided)}</section>`
  return `<div class="math-learning-flow"><section class="math-step learn"><span>🎥 1. Aprenda</span><p>Assista primeiro à explicação. Pause o vídeo e refaça as contas no papel.</p><a class="math-video-btn" href="${m.video}" target="_blank" rel="noreferrer">▶ Ver explicação em vídeo</a><small>${escMath(m.label)}</small></section>${lessonHtml}<section class="math-step solo"><span>🎯 ${m.lessons?'3':'4'}. Agora sozinha</span><p>Resolva de 3 a 5 questões de CADA assunto estudado. Abaixo de 70% de acertos, volte ao bloco correspondente e refaça o exemplo.</p><button class="math-go-questions" type="button">Ir para Questões</button></section></div>`
}

function operadorAtivo(){return document.querySelector('#cargoSelect')?.value==='operador'}
function patchStudy(){if(!operadorAtivo())return;const pageTitle=document.querySelector('.section-header h2')?.textContent||'';if(!/Matemática.*Raciocínio Lógico/i.test(pageTitle))return;[...document.querySelectorAll('.study-module')].forEach((card,i)=>{const m=MATH_MODULES[i];if(!m||card.dataset.mathV3==='1')return;card.querySelectorAll('.math-learning-flow,.math-method-badge').forEach(x=>x.remove());const summary=card.querySelector('summary>div');if(summary)summary.insertAdjacentHTML('beforeend','<span class="math-method-badge">🎥 Método em etapas</span>');const body=card.querySelector('.study-module-body');if(body)body.insertAdjacentHTML('afterbegin',learningHtml(m));card.dataset.mathV3='1'})}
function topicVideo(topic){const t=topic.toLowerCase();if(t.includes('fraç')||t.includes('inteiro')||t.includes('racional'))return MATH_MODULES[0].video;if(t.includes('porcent')||t.includes('razão')||t.includes('propor')||t.includes('regra de três'))return MATH_MODULES[1].video;if(t.includes('média')||t.includes('medida')||t.includes('perímetro')||t.includes('área'))return MATH_MODULES[2].video;if(t.includes('tabela')||t.includes('gráfico'))return MATH_MODULES[3].video;if(t.includes('tempo')||t.includes('prazo')||t.includes('quantidade'))return MATH_MODULES[4].video;if(t.includes('proposi')||t.includes('conectivo')||t.includes('negação'))return MATH_MODULES[5].video;if(t.includes('sequência')||t.includes('padr')||t.includes('organização'))return MATH_MODULES[6].video;return 'https://www.youtube.com/results?search_query='+encodeURIComponent(topic+' matemática básica concursos aula')}
function patchReview(){if(!operadorAtivo())return;document.querySelectorAll('.weak-topic-row').forEach(row=>{if(row.dataset.mathReviewV2==='1')return;const disc=row.querySelector('span')?.textContent||'';if(!/Matemática|Raciocínio Lógico/i.test(disc))return;const topic=row.querySelector('b')?.textContent||'';const a=document.createElement('a');a.className='math-review-video';a.target='_blank';a.rel='noreferrer';a.href=topicVideo(topic);a.textContent='▶ Ver explicação em vídeo';row.appendChild(a);row.dataset.mathReviewV2='1'})}
function bindMathButtons(){document.querySelectorAll('.math-go-questions').forEach(btn=>{if(btn.dataset.mathBound==='1')return;btn.dataset.mathBound='1';btn.onclick=()=>[...document.querySelectorAll('#nav button')].find(b=>b.textContent.trim()==='Questões')?.click()})}
function refreshMath(){patchStudy();patchReview();bindMathButtons()}
setInterval(refreshMath,400);document.addEventListener('click',()=>setTimeout(refreshMath,50));document.addEventListener('change',()=>setTimeout(refreshMath,50));window.addEventListener('load',refreshMath);refreshMath()
