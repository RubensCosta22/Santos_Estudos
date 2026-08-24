// Migração única solicitada: o primeiro simulado foi salvo sem respostas detalhadas,
// portanto não serve para revisão. Remove esse histórico e desbloqueia todas as questões.
const KEY='transpetro:real-simulado:v1';
const MIGRATION='transpetro:reset-legacy-first-sim:v1';
if(!localStorage.getItem(MIGRATION)){
  try{
    const old=JSON.parse(localStorage.getItem(KEY)||'{}');
    const hasLegacy=(old.results||[]).some(r=>!Array.isArray(r.ids)||!r.answers);
    if(hasLegacy || (old.results||[]).length===1){
      localStorage.setItem(KEY,JSON.stringify({usedIds:[],results:[],quiz:null}));
    }
  }catch{
    localStorage.setItem(KEY,JSON.stringify({usedIds:[],results:[],quiz:null}));
  }
  localStorage.setItem(MIGRATION,'1');
}
