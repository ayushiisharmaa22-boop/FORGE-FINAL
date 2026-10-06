const STATE_FILES={Manipur:['data/thoubal.csv','data/tamenglong.csv','data/tengnoupal.csv','data/ukhrul.csv']};
let state='Manipur', msmes=[], faculty=[], mode='msme';
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function csv(text){const out=[];let row=[],cell='',q=false;for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c==='"'){if(q&&n==='"'){cell+='"';i++}else q=!q}else if(c===','&&!q){row.push(cell);cell=''}else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&n==='\n')i++;row.push(cell);if(row.some(x=>x.trim()))out.push(row);row=[];cell=''}else cell+=c}if(cell||row.length){row.push(cell);out.push(row)}const h=out.shift();return out.map(r=>Object.fromEntries(h.map((k,i)=>[k,r[i]??''])))}
async function load(){faculty=await fetch('data/faculty.json').then(r=>r.json());let all=[];for(const f of STATE_FILES[state]){const t=await fetch(f).then(r=>r.text());all.push(...csv(t))}msmes=all;render();}
function activity(r){try{const a=JSON.parse(r.Activities||'[]');return a.map(x=>x.Description).join('; ')||'MSME'}catch{return 'MSME'}}
function render(){
 $('#state').textContent=state; $('#msmeCount').textContent=msmes.length.toLocaleString(); $('#facultyCount').textContent=faculty.length;
 $('#msme').style.display=mode==='msme'?'block':'none'; $('#prof').style.display=mode==='prof'?'block':'none';
 const q=($('#search').value||'').toLowerCase(), d=$('#district').value;
 const target=mode==='msme'?$('#results'):$('#profResults');
 if(mode==='msme'){let a=msmes.filter(r=>(!d||r.District===d)&&Object.values(r).join(' ').toLowerCase().includes(q)).slice(0,60);target.innerHTML=a.map(r=>`<article class="card"><div class="tag">${esc(r.District)}</div><h3>${esc(r.EnterpriseName)}</h3><p>${esc(activity(r))}</p><small>${esc(r.CommunicationAddress)}</small><button onclick="connect('${esc(r.EnterpriseName).replaceAll("'","\\'")}')">Find university match →</button></article>`).join('')||'<div class="empty">No MSMEs found.</div>'}
 else {let a=faculty.filter(r=>Object.values(r).join(' ').toLowerCase().includes(q)).slice(0,60);target.innerHTML=a.map(r=>`<article class="card"><div class="tag">${esc(r['Domain / Department'])}</div><h3>${esc(r['Faculty Name'])}</h3><p>${esc(r['Specialization / Area of Interest'])}</p><small>${esc(r.Designation)} · ${esc(r['Field'])}</small><button onclick="alert('Connection request ready for '+${JSON.stringify(r['Faculty Name'])})">Request collaboration →</button></article>`).join('')||'<div class="empty">No professors found.</div>'}
}
function connect(name){mode='prof';$('#search').value='';$('#modeProf').classList.add('active');$('#modeMsme').classList.remove('active');render();window.scrollTo({top:350,behavior:'smooth'});}
$('#modeMsme').onclick=()=>{mode='msme';$('#modeMsme').classList.add('active');$('#modeProf').classList.remove('active');render()};$('#modeProf').onclick=()=>{mode='prof';$('#modeProf').classList.add('active');$('#modeMsme').classList.remove('active');render()};$('#search').oninput=render;$('#district').onchange=render;load();
