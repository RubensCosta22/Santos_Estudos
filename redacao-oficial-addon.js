// Módulo de treino da redação técnico-administrativa — Oficial de Administração.
// Baseado no Edital 71/2026: texto técnico-administrativo, 15 a 30 linhas, nota 0–40,
// com avaliação de conteúdo/adequação (20), organização/coerência (10) e linguagem (10).

const STORAGE_KEY='santos:redacaoOficial:v1'
const prompts=[
  {title:'Atendimento e encaminhamento',text:'Um munícipe comparece ao setor solicitando providência sobre demanda que pertence a outra unidade administrativa. Redija uma informação administrativa simples registrando a demanda, a orientação prestada e o encaminhamento adequado, com linguagem objetiva e impessoal.'},
  {title:'Pendência documental',text:'Durante a conferência de um processo administrativo, foi identificada a ausência de documento obrigatório. Redija um despacho simples informando a pendência e indicando a providência necessária para regularização e prosseguimento do processo.'},
  {title:'Controle de prazo',text:'Um processo está próximo do término de prazo para manifestação da unidade responsável. Redija um comunicado interno objetivo alertando sobre o prazo, identificando a necessidade de análise e solicitando providência em tempo hábil.'},
  {title:'Proteção de dados e sigilo',text:'Foi constatado o envio indevido de documento contendo dados pessoais para destinatário interno que não precisava ter acesso à informação. Redija uma comunicação administrativa orientando a equipe sobre proteção de dados, sigilo e uso adequado dos canais institucionais.'},
  {title:'Recebimento de materiais',text:'No recebimento de materiais de expediente, a quantidade entregue diverge da indicada na nota/documento de entrega. Redija um registro administrativo simples descrevendo a divergência e o encaminhamento para regularização.'},
  {title:'Organização documental',text:'O setor precisa reorganizar documentos físicos e eletrônicos para facilitar localização e controle. Redija uma orientação interna contendo medidas de classificação, identificação, guarda, registro e recuperação dos documentos.'}
]

const load=()=>{try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]}catch{return[]}}
const save=v=>localStorage.setItem(STORAGE_KEY,JSON.stringify(v))
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const lines=t=>t.trim()?t.trim().split(/\n+/).length:0
const words=t=>t.trim()?t.trim().split(/\s+/).length:0

function scoreText(text){
  const t=text.trim(),lc=t.toLowerCase(),lineCount=lines(t),wordCount=words(t)
  let content=0,organization=0,language=0
  const administrative=/(encaminh|solicit|inform|registr|provid|process|document|prazo|setor|unidade|atendimento|comunic)/.test(lc)
  const action=/(encaminh|providência|regulariza|solicita|orienta|registra|comunica)/.test(lc)
  const connectors=/(portanto|assim|dessa forma|desse modo|além disso|diante|considerando|para que|por fim)/.test(lc)
  const personal=/\b(eu|acho|na minha opinião|pra gente|a gente)\b/.test(lc)
  const informal=/\b(vc|vcs|tá|né|beleza|okey|mano)\b/.test(lc)
  content += Math.min(8, Math.floor(wordCount/20)*2)
  if(administrative)content+=6
  if(action)content+=4
  if(lineCount>=15&&lineCount<=30)content+=2
  content=Math.min(20,content)
  if(t.length>0)organization+=3
  if(connectors)organization+=3
  if(/\n/.test(t))organization+=2
  if(wordCount>=120)organization+=2
  organization=Math.min(10,organization)
  language=10
  if(personal)language-=3
  if(informal)language-=3
  if(!/[.!?]$/.test(t))language-=1
  if(wordCount<80)language-=2
  language=Math.max(0,language)
  return {content,organization,language,total:content+organization+language,lineCount,wordCount,auto:true}
}

function render(){
  const host=document.querySelector('#content');if(!host)return
  const history=load()
  host.innerHTML=`<div class="section-header"><div><h2>Redação — Oficial de Administração</h2><p>Treino de texto técnico-administrativo conforme o Edital 71/2026.</p></div></div>
  <div class="notice"><div><b>Formato da prova</b><span>Texto manuscrito de natureza técnico-administrativa · 15 a 30 linhas · nota máxima 40 · mínimo 20 pontos para habilitação.</span></div></div>
  <div class="metric-grid"><div class="metric-card"><span>Conteúdo e adequação</span><strong>20</strong><small>tema, proposta e providências</small></div><div class="metric-card"><span>Organização e coerência</span><strong>10</strong><small>estrutura e articulação</small></div><div class="metric-card"><span>Linguagem</span><strong>10</strong><small>norma-padrão, clareza e formalidade</small></div><div class="metric-card"><span>Nota mínima</span><strong>20/40</strong><small>caráter eliminatório</small></div></div>
  <div class="card form-card"><div class="section-row"><div><span class="eyebrow dark">PROPOSTA DE TREINO</span><h3 id="redTitle"></h3></div><button class="secondary" id="newRedPrompt">Sortear proposta</button></div><p id="redPrompt"></p><label class="field"><span>Seu texto — use uma quebra de linha para representar cada linha manuscrita</span><textarea id="redText" rows="18" placeholder="Escreva aqui sua redação..."></textarea></label><div class="redacao-live"><span id="redLines">0 linhas</span><span id="redWords">0 palavras</span><span>Exigência: 15–30 linhas</span></div><button class="primary" id="gradeRedacao">Avaliar treino</button></div>
  <div id="redResult"></div>
  <div class="card"><div class="section-row"><div><span class="eyebrow dark">CHECKLIST ANTES DE ENTREGAR</span><h3>Critérios do edital</h3></div></div><div class="compact-topics"><label class="compact-topic"><span>1. Respondi exatamente à situação-problema e às providências pedidas?</span></label><label class="compact-topic"><span>2. Mantive natureza técnico-administrativa, sem transformar o texto em dissertação genérica?</span></label><label class="compact-topic"><span>3. Organizei as informações em sequência lógica e coerente?</span></label><label class="compact-topic"><span>4. Usei linguagem formal, clara, objetiva e impessoal?</span></label><label class="compact-topic"><span>5. Preservei sigilo, proteção de dados, urbanidade e zelo documental quando pertinentes?</span></label><label class="compact-topic"><span>6. O texto ficou entre 15 e 30 linhas?</span></label></div></div>
  <div class="card table-card"><div class="section-row"><div><span class="eyebrow dark">HISTÓRICO</span><h3>Treinos anteriores</h3></div></div><table><thead><tr><th>Data</th><th>Proposta</th><th>Linhas</th><th>Palavras</th><th>Nota estimada</th></tr></thead><tbody>${history.length?history.slice(0,10).map(x=>`<tr><td>${esc(x.date)}</td><td>${esc(x.title)}</td><td>${x.score.lineCount}</td><td>${x.score.wordCount}</td><td><b>${x.score.total}/40</b></td></tr>`).join(''):'<tr><td colspan="5">Nenhum treino registrado.</td></tr>'}</tbody></table></div>`
  let current=prompts[Math.floor(Math.random()*prompts.length)]
  const showPrompt=()=>{document.querySelector('#redTitle').textContent=current.title;document.querySelector('#redPrompt').textContent=current.text}
  showPrompt()
  document.querySelector('#newRedPrompt').onclick=()=>{current=prompts[Math.floor(Math.random()*prompts.length)];showPrompt();document.querySelector('#redResult').innerHTML=''}
  const ta=document.querySelector('#redText'),live=()=>{document.querySelector('#redLines').textContent=`${lines(ta.value)} linhas`;document.querySelector('#redWords').textContent=`${words(ta.value)} palavras`};ta.oninput=live
  document.querySelector('#gradeRedacao').onclick=()=>{
    if(!ta.value.trim())return
    const s=scoreText(ta.value),eligible=s.total>=20&&s.lineCount>=15&&s.lineCount<=30
    const warnings=[]
    if(s.lineCount<15)warnings.push('Abaixo de 15 linhas: no exame isso gera nota zero.')
    if(s.lineCount>30)warnings.push('Acima de 30 linhas: excede o limite previsto no edital.')
    if(s.wordCount<100)warnings.push('Texto muito curto para desenvolver adequadamente uma situação técnico-administrativa.')
    document.querySelector('#redResult').innerHTML=`<div class="card simulation-result-hero"><div><span class="status ${eligible?'good':'critical'}">${eligible?'TREINO HABILITADO':'REVISAR'}</span><h2>${s.total}/40</h2><p>Estimativa automática para orientar o treino — não substitui correção humana.</p></div><div><b>Conteúdo ${s.content}/20</b><br><b>Organização ${s.organization}/10</b><br><b>Linguagem ${s.language}/10</b></div></div>${warnings.length?`<div class="notice"><div><b>Atenção</b><span>${warnings.map(esc).join(' ')}</span></div></div>`:''}`
    const h=load();h.unshift({id:crypto.randomUUID?.()||Date.now(),date:new Date().toLocaleDateString('pt-BR'),title:current.title,prompt:current.text,text:ta.value,score:s});save(h.slice(0,50))
  }
}

function install(){
  const nav=document.querySelector('#nav');if(!nav)return
  const sync=()=>{
    const official=document.querySelector('#cargoSelect')?.value==='oficial'
    let btn=document.querySelector('#oficialRedacaoNav')
    if(official&&!btn){btn=document.createElement('button');btn.id='oficialRedacaoNav';btn.textContent='Redação';nav.insertBefore(btn,[...nav.children].find(x=>x.textContent==='Simulados')||null);btn.onclick=()=>{[...nav.querySelectorAll('button')].forEach(x=>x.classList.remove('active'));btn.classList.add('active');render()}}
    if(btn)btn.style.display=official?'':'none'
  }
  sync();document.querySelector('#cargoSelect')?.addEventListener('change',()=>setTimeout(sync,0))
}

const timer=setInterval(()=>{if(document.querySelector('#nav')&&document.querySelector('#cargoSelect')){clearInterval(timer);install()}},200)
