// Vídeos de apoio para todas as disciplinas da Transpetro.
// Cada tópico recebe um atalho de vídeo. Quando há vídeo específico validado, usa URL direta;
// nos demais, abre uma busca focada no YouTube pelo assunto + perfil Cesgranrio/concursos.

const DIRECT = {
  'Matemática Financeira':'https://www.youtube.com/watch?v=tZ4XfkWlh-U'
}

const AREA_HINTS = {
  'Português':'português interpretação gramática Cesgranrio concursos',
  'Inglês':'inglês instrumental interpretação de textos concursos',
  'Administração Financeira e Orçamentária':'administração financeira orçamento matemática financeira concursos Cesgranrio',
  'Administração Geral':'administração geral concursos Cesgranrio',
  'Contabilidade':'contabilidade geral concursos Cesgranrio',
  'Economia':'economia microeconomia macroeconomia concursos Cesgranrio',
  'Gestão de Pessoas':'gestão de pessoas concursos Cesgranrio',
  'Marketing':'marketing administração concursos Cesgranrio',
  'Logística':'logística administração concursos Cesgranrio',
  'Administração da Produção e Operações':'administração produção operações concursos Cesgranrio',
  'Gestão de Projetos':'gestão de projetos PMBOK concursos Cesgranrio',
  'Estratégia Empresarial':'administração estratégica concursos Cesgranrio',
  'Gestão da Qualidade':'gestão da qualidade concursos Cesgranrio',
  'Sustentabilidade e ESG':'ESG sustentabilidade concursos administração',
  'Governança Corporativa':'governança corporativa concursos administração',
  'Compliance e Integridade':'compliance integridade concursos administração',
  'Licitações e Contratos':'lei 14133 licitações contratos concursos aula',
  'Direito Administrativo':'direito administrativo concursos Cesgranrio',
  'Direito Constitucional':'direito constitucional concursos Cesgranrio',
  'Informática':'informática concursos Cesgranrio',
  'Raciocínio Lógico':'raciocínio lógico concursos Cesgranrio'
}

const enc=s=>encodeURIComponent(s)
function youtubeFor(area,topic){
  if(DIRECT[topic]) return DIRECT[topic]
  const hint=AREA_HINTS[area]||`${area} concursos Cesgranrio`
  return `https://www.youtube.com/results?search_query=${enc(`${topic} ${hint} aula`)}`
}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function css(){if(document.querySelector('#tpVideoCss'))return;const s=document.createElement('style');s.id='tpVideoCss';s.textContent=`
.tpv-learn{margin:14px 0;padding:14px;border:1px solid #bfdbfe;background:#eff6ff;border-radius:12px}.tpv-learn b{display:block;margin-bottom:6px}.tpv-learn p{margin:5px 0 10px!important;color:#475569}.tpv-btn{display:inline-flex;align-items:center;gap:6px;background:#dc2626;color:white!important;text-decoration:none!important;border-radius:8px;padding:9px 12px;font-size:12px;font-weight:900}.tpv-note{display:block;margin-top:7px;color:#64748b;font-size:11px}.tpv-home-note{background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:12px;margin:0 0 14px;color:#334155}.tpv-home-note b{color:#1d4ed8}
`;document.head.appendChild(s)}
function patch(){
  const overlay=document.querySelector('.tps-overlay');if(!overlay)return
  const hero=overlay.querySelector('.tps-hero')
  if(hero&&!overlay.querySelector('.tpv-home-note'))hero.insertAdjacentHTML('afterend','<div class="tpv-home-note"><b>🎥 Videoaulas em todas as disciplinas</b><br>Abra uma disciplina e use o botão de vídeo em cada tópico para complementar a apostila com uma explicação audiovisual.</div>')
  const area=hero?.querySelector('h1')?.textContent?.trim()||''
  overlay.querySelectorAll('.tps-section').forEach(sec=>{
    if(sec.dataset.tpv==='1')return
    const topic=sec.querySelector('h2')?.textContent?.trim();if(!topic)return
    const url=youtubeFor(area,topic)
    sec.querySelector('h2').insertAdjacentHTML('afterend',`<div class="tpv-learn"><b>🎥 Aprenda também em vídeo</b><p>Use a videoaula para entender o assunto e depois volte à apostila, aos pontos-chave e às questões.</p><a class="tpv-btn" href="${esc(url)}" target="_blank" rel="noreferrer">▶ Ver explicação em vídeo</a><small class="tpv-note">Busca focada em ${esc(topic)} · ${esc(area)} · concursos/Cesgranrio</small></div>`)
    sec.dataset.tpv='1'
  })
}
css();setInterval(patch,300);document.addEventListener('click',()=>setTimeout(patch,60));
