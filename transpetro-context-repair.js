// Textos-base restaurados a partir das provas públicas da CESGRANRIO/Transpetro 2023.
// O reparo é aplicado no DOM do simulado e serve como fonte central para questões compartilhadas.

const TEXTS_2023 = {
  pt: `À moda brasileira

1 Estou me vendo debaixo de uma árvore, lendo a pequena história da literatura brasileira.

2 Olavo Bilac! – eu disse em voz alta e de repente parei quase num susto depois que li os primeiros versos do soneto à língua portuguesa: Última flor do Lácio, inculta e bela / És, a um tempo, esplendor e sepultura.

3 Fiquei pensando, mas o poeta disse sepultura?! O tal de Lácio eu não sabia onde ficava, mas de sepultura eu entendia bem, disso eu entendia, repensei baixando o olhar para a terra. Se escrevia (e já escrevia) pequenos contos nessa língua, quer dizer que era a sepultura que esperava por esses meus escritos?

4 Fui falar com meu pai. Comecei por aquelas minhas sondagens antes de chegar até onde queria, os tais rodeios que ele ia ouvindo com paciência enquanto enrolava o cigarro de palha, fumava nessa época esses cigarros. Comecei por perguntar se minha mãe e ele não tinham viajado para o exterior.

5 Meu pai fixou em mim o olhar verde.

6 — Já. Por quê?

7 Comecei a gaguejar. E se eu tivesse nascido na Itália, não seria melhor? Ele ficou sério. Renegar a língua é renegar o país, guarde isso nessa cabecinha. E depois (ele voltou a abrir o livro), olha que beleza o que o poeta escreveu em seguida, Amo-te assim, desconhecida e obscura, veja que confissão de amor ele fez à nossa língua! Tem mais, ele precisava da rima para sepultura e calhou tão bem essa obscura, entendeu agora? – acrescentou e levantou-se. Deu alguns passos e ficou olhando a borboleta que entrou na varanda: Já fez a sua lição de casa?

8 Fechei o livro e recuei. Sempre que meu pai queria mudar de assunto ele mudava de lugar: saía da poltrona e ia para a cadeira de vime. Saía da cadeira de vime e ia para a rede ou simplesmente começava a andar. Era o sinal, Não quero falar nisso, chega. Então a gente falava noutra coisa ou ficava quieta.

9 Tantos anos depois, quando me avisaram lá do pequeno hotel em Jacareí que ele tinha morrido, fiquei pensando nisso, ah! se quando a morte entrou, se nesse instante ele tivesse mudado de lugar. Mudar depressa de lugar e de assunto. Depressa, pai, saia da cama e fique na cadeira ou vá pra rua e feche a porta!

TELLES, Lygia Fagundes. Durante aquele estranho chá: perdidos e achados. Rio de Janeiro: Rocco, 2002. Fragmento adaptado.`,
  en: `How space technology is bringing green wins for transport

1 Space technology is developing fast, and, with every advance, it is becoming more accessible to industry. Today, satellite communications (satcoms) and space-based data are underpinning new ways of operating that boost both sustainability and profitability. Some projects are still in the planning stages, offering great promise for the future. However, others are already delivering practical results.

2 The benefits of space technology broadly fall into two categories: connectivity that can reach into situations where terrestrial technologies struggle to deliver and the deep, unique insights delivered by Earth Observation (EO) data. Both depend on access to satellite networks, particularly medium earth orbit (MEO) and low earth orbit (LEO) satellites that offer low-latency connectivity and frequently updated data. Right now, the satellite supplier market is booming, driving down the cost of access to satellites. Suppliers are increasingly tailoring their services to emerging customer needs and the potential applications are incredible – as a look at the transportation sector shows.

Already, satellites provide regular software updates to vehicles and enhanced safety through an in-car emergency call service.

Satellite communications can step in to deliver highly reliable connectivity where 4G struggles to reach. It will underpin a growing network of EV charging points, connecting each point to the internet for operational management purposes, for billing and access app functionality and for the users’ comfort, they may access the system wherever they are.

7 Satellite technology will increasingly be a part of the vehicles themselves, particularly when automated driving becomes more mainstream. It will be essential for every vehicle to have continuous connectivity to support real-time software patches, map updates and inter-vehicle communications.

8 At our company, we have been deeply embedded in the space engineering for more than 40 years – and we continue to be involved with the state-of-the-art technologies and use cases. We have a strong track record of translating these advances into practical benefits for our customers that make sense on both a business and a sustainability level.

Available at: CGI, “How space technology is bringing green wins for transport”. Retrieved April 25, 2023. Adapted.`
}

const pt2023 = /(Olavo Bilac|Lácio|narradora|língua portuguesa|parágrafo\s*[1-9]|rodeios|gaguejar|cabecinha|sepultura|crônica)/i
const en2023 = /(space technology|satellite|terrestrial technolog|earth observation|paragraph|fragment|connectivity|transport|vehicle|however|according to the text)/i

function repairVisibleQuestion(){
  const card=document.querySelector('.tprm-overlay .tprm-card');
  if(!card || card.querySelector('[data-source-repaired]')) return;
  const badge=[...card.querySelectorAll('.tprm-badge')].map(x=>x.textContent).join(' ');
  if(!/Questão real Cesgranrio/i.test(badge)) return;
  const stem=card.querySelector('.tprm-stem');
  if(!stem) return;
  const txt=stem.textContent||'';
  let context='';
  if(/Português/i.test(badge)&&pt2023.test(txt)) context=TEXTS_2023.pt;
  if(/Inglês/i.test(badge)&&en2023.test(txt)) context=TEXTS_2023.en;
  if(!context) return;
  const box=document.createElement('details');
  box.dataset.sourceRepaired='1';
  box.open=true;
  box.className='tprm-context';
  box.innerHTML=`<summary style="cursor:pointer;font-weight:900;margin-bottom:10px">📄 Texto-base da prova</summary><div style="white-space:pre-wrap;line-height:1.55">${context.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</div>`;
  stem.before(box);
}

window.TRANSPETRO_VERIFIED_CONTEXTS_2023=TEXTS_2023;
new MutationObserver(repairVisibleQuestion).observe(document.documentElement,{subtree:true,childList:true});
setInterval(repairVisibleQuestion,400);
