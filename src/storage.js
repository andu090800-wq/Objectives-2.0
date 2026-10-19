import seed from './seed.json';
const KEY='objectiveos-react-v2';
const OLD='objectiveos-v1';
const clone=x=>JSON.parse(JSON.stringify(x));
const defaultState=()=>({version:2,goals:clone(seed),habits:{},shift:'',sessions:{}});
function normalizeGoal(g,i){const base=seed.find(x=>x.id===g.id)||seed[i]||seed[0];return {...base,...g,id:g.id??base.id,history:Array.isArray(g.history)?g.history:[],steps:Array.isArray(g.steps)?g.steps:[],smart:typeof g.smart==='string'?g.smart:'',dumb:typeof g.dumb==='string'?g.dumb:''};}
export function migrate(data){if(!data||!Array.isArray(data.goals))throw Error('Fișierul nu conține obiective valide');const out=defaultState();out.goals=data.goals.map(normalizeGoal);out.habits=data.habits&&typeof data.habits==='object'?data.habits:{};out.shift=typeof data.shift==='string'?data.shift:'';out.sessions=data.sessions&&typeof data.sessions==='object'?data.sessions:{};return out;}
export function load(){try{const newer=localStorage.getItem(KEY);if(newer)return migrate(JSON.parse(newer));const old=localStorage.getItem(OLD);if(old){const migrated=migrate(JSON.parse(old));localStorage.setItem(KEY,JSON.stringify(migrated));return migrated;}}catch(e){console.warn('Datele nu au putut fi citite',e);}return defaultState();}
export function save(state){localStorage.setItem(KEY,JSON.stringify(state));}
export function exportBackup(state){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`objective-os-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export const percent=g=>g.type==='milestone'?(Number(g.value)>=1?100:0):Math.max(0,Math.min(100,Math.round((Number(g.value)-Number(g.baseline))/(Number(g.target)-Number(g.baseline)||1)*100)));
export const dateKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const shiftType=(date,anchor)=>{if(!anchor)return null;const n=s=>{const [y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d)/86400000};return ['Tură 24h','Recuperare','Zi liberă'][((n(date)-n(anchor))%3+3)%3]};
