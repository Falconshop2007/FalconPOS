/* Falcon System POS - main application (no framework, no build step) */
const KEY='falcon_v2',OLD='rsm_v1',TABS=['Dashboard','POS','Stock','Repairs','Monthly Report','Backup'];
let D={items:[],sales:[],repairs:[],users:[]},tab='Dashboard',msg='',month=new Date().toISOString().slice(0,7),cart=[],last=null,q='',st='All';
try{const s=localStorage.getItem(KEY)||localStorage.getItem(OLD);if(s)D=Object.assign(D,JSON.parse(s))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(D));window.saveFail=false}catch(e){window.saveFail=true}};
const $=s=>document.querySelector(s),uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const money=n=>'Rs. '+(+n||0).toLocaleString('en-LK',{minimumFractionDigits:2,maximumFractionDigits:2});
const today=()=>new Date().toISOString().slice(0,10),val=id=>$('#'+id).value;
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+(+n||0));return x.toISOString().slice(0,10)};
const label=i=>[i.brand,i.model||i.name].filter(Boolean).join(' ');
const sellable=i=>+i.qty>0&&(i.type!='laptop'||['Available','Not Marked'].includes(i.status));
function csvOut(rows){return rows.map(r=>r.map(c=>{c=String(c??'');return /[",\n]/.test(c)?'"'+c.replace(/"/g,'""')+'"':c}).join(',')).join('\r\n')}
function csvIn(t,d){const out=[];let r=[],c='',q=false;t=t.replace(/^\uFEFF/,'');
for(let i=0;i<t.length;i++){const ch=t[i];
if(q){if(ch=='"'){if(t[i+1]=='"'){c+='"';i++}else q=false}else c+=ch}
else if(ch=='"'&&!c)q=true;else if(ch==d){r.push(c);c=''}
else if(ch=='\n'||ch=='\r'){if(ch=='\r'&&t[i+1]=='\n')i++;r.push(c);c='';if(r.some(x=>x.trim()))out.push(r);r=[]}
else c+=ch}
r.push(c);if(r.some(x=>x.trim()))out.push(r);return out}
async function dl(name,text,type){const blob=new Blob([text],{type:type||'text/csv'});
try{const d=await claude.use('downloads');if(d){await d.save({filename:name,data:blob});return}}catch(e){if(e&&e.code=='declined')return}
const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click()}
const flash=m=>{msg=m;render()};
function ask(msg,o={}){return new Promise(res=>{const d=document.createElement('div');d.className='dlg';d.innerHTML=`<div class="dbox"><p>${esc(msg).replace(/\n/g,'<br>')}</p>${o.input?`<input id="dlgi" type="${o.type||'text'}">`:''}<div class="row" style="justify-content:flex-end;margin-top:14px"><button class="g" id="dn">${esc(o.no||'Cancel')}</button><button class="b" id="dy">${esc(o.yes||'OK')}</button></div></div>`;document.body.appendChild(d);
const i=d.querySelector('#dlgi'),fin=v=>{d.remove();res(v)};(i||d.querySelector('#dy')).focus();d.querySelector('#dy').onclick=()=>fin(o.input?i.value:true);d.querySelector('#dn').onclick=()=>fin(o.input?null:false);
d.onkeydown=e=>{if(e.key=='Enter')d.querySelector('#dy').click();if(e.key=='Escape')d.querySelector('#dn').click()}})}

const repInc=r=>r.status==='Completed'?+r.cost||0:0;
function monthly(){const m={},g=k=>m[k]||(m[k]={sales:0,repairs:0,n:0,rn:0});
D.sales.forEach(s=>{const o=g(s.date.slice(0,7));o.sales+=+s.total+(+s.adj||0);o.n++});
D.repairs.forEach(r=>{if(r.status=='Completed'){const o=g((r.doneDate||r.date).slice(0,7));o.repairs+=repInc(r);o.rn++}});return m}

const hue=s=>{let x=0;for(const c of String(s||'x'))x=(x*31+c.charCodeAt(0))%360;return x};
const ikey=i=>(i.brand||'')+'|'+(i.model||i.name||'');
const _pc={};
function pic(i){const im=(D.imgs||{})[ikey(i)];if(im)return `<img src="${im}" alt="">`;const nm=[i.brand,i.model,i.name,i.gpu].join(' ').toLowerCase(),kk=(i.type||'')+'|'+(i.brand||'')+'|'+(i.model||'')+'|'+(i.gpu||'');return _pc[kk]||(_pc[kk]=art(i,nm))}
function art(i,nm){const k=hue(i.brand||i.model||i.name||'x'),c1=`hsl(${k},70%,52%)`,c2=`hsl(${(k+45)%360},80%,66%)`,bg=`<rect width="200" height="140" fill="hsl(${k},80%,94%)"/><circle cx="168" cy="22" r="36" fill="hsl(${k},85%,87%)"/><circle cx="22" cy="128" r="42" fill="hsl(${k},85%,90%)"/>`;let b;
if(i.type=='laptop'){const gm=/rtx|gtx|cyborg|victus|gaming|legion|nitro|rog|loq/.test(nm),br=esc(String(i.brand||i.model||'').toUpperCase().slice(0,10)),id='g'+k+(gm?1:0);
b=`<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${gm?'#ff2d6f':c1}"/><stop offset="1" stop-color="${gm?'#5b3cff':c2}"/></linearGradient></defs><rect x="38" y="18" width="124" height="78" rx="7" fill="#1d212c"/><rect x="43" y="23" width="114" height="68" rx="3" fill="url(#${id})"/><path d="M43 72Q72 52 100 68T157 60V91H43Z" fill="#fff" opacity=".17"/><text x="100" y="62" font-family="Arial,sans-serif" font-weight="800" font-size="${br.length>6?14:19}" fill="#fff" text-anchor="middle" letter-spacing="1">${br}</text><path d="M20 100h160l-11 15H31z" fill="hsl(${k},12%,82%)"/><rect x="80" y="100" width="40" height="4" rx="2" fill="hsl(${k},12%,62%)"/>${gm?'<rect x="38" y="96" width="124" height="3" rx="1.5" fill="#ff2d6f"/>':''}`}
else if(/mouse/.test(nm))b=`<rect x="76" y="28" width="48" height="78" rx="24" fill="${c1}"/><path d="M100 28v32M76 62h48" stroke="#fff" stroke-width="3" opacity=".7"/><rect x="95" y="40" width="10" height="14" rx="5" fill="#fff"/>`
else if(/keyboard|keybo/.test(nm))b=`<rect x="26" y="44" width="148" height="60" rx="8" fill="#2a2f3c"/>${[0,1,2].map(r=>[0,1,2,3,4,5,6,7,8,9].map(c=>`<rect x="${36+c*13}" y="${54+r*14}" width="10" height="10" rx="2" fill="${r==1?c1:'#fff'}" opacity=".85"/>`).join('')).join('')}`
else if(/charg|adapter|adaptor|power/.test(nm))b=`<rect x="70" y="30" width="60" height="46" rx="8" fill="${c1}"/><rect x="84" y="16" width="8" height="15" fill="#667"/><rect x="108" y="16" width="8" height="15" fill="#667"/><path d="M100 76v16q0 16 24 16h26" stroke="#2a2f3c" stroke-width="5" fill="none" stroke-linecap="round"/>`
else if(/head|ear|speaker|airpod|buds/.test(nm))b=`<path d="M56 88V70a44 44 0 0 1 88 0v18" stroke="#2a2f3c" stroke-width="8" fill="none"/><rect x="46" y="78" width="24" height="38" rx="10" fill="${c1}"/><rect x="130" y="78" width="24" height="38" rx="10" fill="${c1}"/>`
else if(/bag|case|sleeve|backpack/.test(nm))b=`<path d="M78 42q0-20 22-20t22 20" stroke="#2a2f3c" stroke-width="6" fill="none"/><rect x="52" y="42" width="96" height="74" rx="14" fill="${c1}"/><rect x="52" y="70" width="96" height="6" fill="#000" opacity=".15"/><rect x="92" y="66" width="16" height="14" rx="3" fill="#fff"/>`
else if(/ssd|hdd|drive|usb|flash|pen|ram|memory|disk|card/.test(nm))b=`<rect x="50" y="38" width="100" height="64" rx="12" fill="#2a2f3c"/><rect x="62" y="50" width="44" height="8" rx="4" fill="${c1}"/><circle cx="132" cy="54" r="5" fill="#34d399"/><rect x="62" y="78" width="76" height="6" rx="3" fill="#fff" opacity=".25"/>`
else if(/monitor|screen|display|lcd/.test(nm))b=`<rect x="40" y="22" width="120" height="74" rx="7" fill="#1d212c"/><rect x="45" y="27" width="110" height="62" rx="3" fill="${c1}"/><rect x="92" y="96" width="16" height="14" fill="#99a"/><rect x="72" y="110" width="56" height="6" rx="3" fill="#99a"/>`
else b=`<path d="M100 26l46 20v52l-46 20-46-20V46z" fill="${c1}"/><path d="M100 26l46 20-46 20-46-20z" fill="${c2}"/><path d="M100 66v52" stroke="#fff" stroke-width="3" opacity=".5"/>`;
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">${bg}${b}</svg>`}
const _pm={};function pimg(i){const im=(D.imgs||{})[ikey(i)];if(im)return im;const kk=(i.type=='laptop'?'L':'A')+(i.brand||i.model);return _pm[kk]||(_pm[kk]=pimg0(i))}
function pimg0(i){const im=(D.imgs||{})[ikey(i)];if(im)return im;const k=hue(i.brand||i.model),t=(i.brand||i.model||'?').slice(0,2).toUpperCase();
const svg=i.type=='laptop'?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${k},85%,60%)"/><stop offset="1" stop-color="hsl(${(k+50)%360},85%,72%)"/></linearGradient></defs><rect width="200" height="140" fill="hsl(${k},80%,94%)"/><rect x="42" y="22" width="116" height="74" rx="7" fill="hsl(${k},30%,22%)"/><rect x="48" y="28" width="104" height="62" rx="3" fill="url(#g)"/><text x="100" y="69" font-family="Arial" font-weight="bold" font-size="26" fill="#fff" text-anchor="middle">${t}</text><path d="M28 98h144l-8 12H36z" fill="hsl(${k},15%,78%)"/><rect x="84" y="98" width="32" height="3" rx="1.5" fill="hsl(${k},15%,62%)"/></svg>`
:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140"><rect width="200" height="140" fill="hsl(${k},80%,94%)"/><text x="100" y="92" font-size="64" text-anchor="middle">🎧</text></svg>`;
return 'data:image/svg+xml,'+encodeURIComponent(svg)}
function readImg(f,cb){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,420/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.8))};im.onerror=()=>flash('That file is not a picture');im.src=r.result};r.readAsDataURL(f)}
function upImg(el){const f=el.files[0],i=D.items.find(x=>x.id==ed);if(!f||!i)return;readImg(f,d=>{(D.imgs=D.imgs||{})[ikey(i)]=d;save();flash('Photo saved for '+label(i))})}
const newForm=()=>({type:'laptop',brand:'',model:'',serial:'',cond:'',cpu:'',gen:'',ram:'',storage:'',gpu:'',supplier:'',qty:1,cost:'',price:''});
let nf=newForm(),nimg='';
function pickNew(el){const f=el.files[0];if(f)readImg(f,d=>{nimg=d;render()})}
function rmImg(){const i=D.items.find(x=>x.id==ed);if(i&&D.imgs){delete D.imgs[ikey(i)];save();flash('Photo removed')}}
const kf=v=>v>=1e6?(v/1e6).toFixed(1)+'M':v>=1e3?Math.round(v/1e3)+'k':Math.round(v);
function lineChart(lab,ser){const W=560,H=220,p={l:40,r:12,t:12,b:26},mx=Math.max(1,...ser.flatMap(s=>s.v))*1.1,x=i=>p.l+(W-p.l-p.r)*i/Math.max(1,lab.length-1),y=v=>p.t+(H-p.t-p.b)*(1-v/mx);
const sm=a=>a.map((q,i)=>i?`C${(a[i-1][0]+q[0])/2},${a[i-1][1]} ${(a[i-1][0]+q[0])/2},${q[1]} ${q[0]},${q[1]}`:`M${q[0]},${q[1]}`).join(' ');
return `<svg viewBox="0 0 ${W} ${H}" width="100%"><defs>${ser.map((s,k)=>`<linearGradient id="a${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.c}" stop-opacity=".28"/><stop offset="1" stop-color="${s.c}" stop-opacity="0"/></linearGradient>`).join('')}</defs>
${[0,1,2,3,4].map(f=>`<line x1="${p.l}" x2="${W-p.r}" y1="${y(mx*f/4)}" y2="${y(mx*f/4)}" stroke="var(--b)"/><text x="${p.l-6}" y="${y(mx*f/4)+4}" text-anchor="end" font-size="10" fill="var(--m)">${kf(mx*f/4)}</text>`).join('')}
${lab.map((l,i)=>`<text x="${x(i)}" y="${H-6}" text-anchor="middle" font-size="10" fill="var(--m)">${l}</text>`).join('')}
${ser.map((s,k)=>{const pts=s.v.map((v,i)=>[x(i),y(v)]),d=sm(pts);return `<path d="${d} L${x(s.v.length-1)},${y(0)} L${x(0)},${y(0)}Z" fill="url(#a${k})"/><path d="${d}" fill="none" stroke="${s.c}" stroke-width="3" stroke-linecap="round"/>${pts.map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="3.5" fill="var(--c)" stroke="${s.c}" stroke-width="2"/>`).join('')}`}).join('')}</svg>`}
function donut(parts,center){const R=54,C=2*Math.PI*R,tot=parts.reduce((a,p)=>a+p.v,0)||1;let off=0;
return `<svg viewBox="0 0 140 140" width="170" style="color:var(--t)"><circle cx="70" cy="70" r="${R}" fill="none" stroke="var(--b)" stroke-width="16"/>${parts.map(p=>{const d=C*p.v/tot,s=`<circle cx="70" cy="70" r="${R}" fill="none" stroke="${p.c}" stroke-width="16" stroke-dasharray="${d} ${C-d}" stroke-dashoffset="${-off}" transform="rotate(-90 70 70)"/>`;off+=d;return s}).join('')}<text x="70" y="68" text-anchor="middle" font-size="22" font-weight="700" fill="currentColor">${center}</text><text x="70" y="86" text-anchor="middle" font-size="10" fill="var(--m)">Available</text></svg>`}
const SC={Available:'#20c997',Purchased:'#7c5cfc','Not Marked':'#3b82f6',Returned:'#ff7a59','Shop Usage':'#e8267e'};
function vDash(){const M=monthly(),now=new Date(),keys=[];for(let k=5;k>=0;k--){const d=new Date(now.getFullYear(),now.getMonth()-k,1);keys.push(d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'))}
const cur=M[month]||{sales:0,repairs:0},rev=Object.values(M).reduce((a,o)=>a+o.sales+o.repairs,0),L=D.items.filter(i=>i.type=='laptop'),av=L.filter(sellable),pend=D.repairs.filter(r=>r.status!='Completed');
const inv=invList(),by={},sts={};av.forEach(i=>by[i.brand||'Other']=(by[i.brand||'Other']||0)+1);L.forEach(i=>sts[i.status||'Other']=(sts[i.status||'Other']||0)+1);
const bys=Object.entries(by).sort((a,b)=>b[1]-a[1]),mxb=Math.max(1,...bys.map(x=>x[1])),low=D.items.filter(i=>i.type!='laptop'&&+i.qty<=5);
const KC=[['#f5a524','💰','Total revenue',money(rev).replace('.00','')],['#7c5cfc','🧾','Invoices this month',inv.filter(o=>o.date.startsWith(month)).length],['#20c997','💻','Laptops in stock',av.length],['#ff7a59','🛠️','Pending repairs',pend.length]];
return `<div class="card" style="background:linear-gradient(120deg,rgba(232,38,126,.12),rgba(124,92,252,.14))"><h3 style="font-size:20px;margin:0">Welcome, ${esc(me.name)} 👋</h3><span class="m">Today: ${inv.filter(o=>o.date==today()).length} invoices · ${money(inv.filter(o=>o.date==today()).reduce((a,o)=>a+o.total,0)).replace('.00','')} sold${inv.some(o=>o.bal>0)?' · Outstanding '+money(inv.reduce((a,o)=>a+o.bal,0)).replace('.00',''):''}</span></div>
<div class="kg">${KC.map(k=>`<div class="kc" style="--k:${k[0]}"><i>${k[1]}</i><div><small>${k[2]}</small><b>${k[3]}</b></div></div>`).join('')}</div>
<div class="dg"><div class="card"><h3>Income overview <span class="m" style="font-weight:400">· this month ${money(cur.sales+cur.repairs).replace('.00','')}</span></h3>
<div class="leg"><span><i style="background:#f5a524"></i>Sales</span><span><i style="background:#7c5cfc"></i>Repairs</span></div>
${lineChart(keys.map(k=>k.slice(5)+'/'+k.slice(2,4)),[{c:'#f5a524',v:keys.map(k=>(M[k]||{sales:0}).sales)},{c:'#7c5cfc',v:keys.map(k=>(M[k]||{repairs:0}).repairs)}])}</div>
<div class="card" style="text-align:center"><h3 style="text-align:left">Laptop stock status</h3>${donut(Object.entries(sts).map(([k,v])=>({c:SC[k]||'#94a3b8',v})),L.length?Math.round(100*av.length/L.length)+'%':'0%')}
<div class="leg" style="justify-content:center;margin-top:8px">${Object.entries(sts).map(([k,v])=>`<span><i style="background:${SC[k]||'#94a3b8'}"></i>${esc(k)} ${v}</span>`).join('')}</div></div></div>
<div class="dg" style="margin-top:16px"><div class="card"><h3>Available laptops by brand</h3>${bys.map(([k,v],n)=>`<div class="bl"><span>${esc(k)}</span><div><i style="width:${100*v/mxb}%;background:${CATC[n%6]}"></i></div><b>${v}</b></div>`).join('')||'<span class="m">No stock yet</span>'}</div>
<div class="card"><h3>Recent invoices</h3>${inv.slice(0,5).map(o=>`<div class="bl"><span style="width:60px"><b>${esc(o.inv)}</b></span><span style="flex:1;width:auto">${esc(o.customer)}</span><b>${money(o.total).replace('.00','')}</b></div>`).join('')||'<span class="m">No invoices yet</span>'}
<h3 style="margin-top:14px">🔔 Low stock accessories</h3>${low.length?low.map(i=>`${esc(label(i))} — <span class="warn">${i.qty}</span>`).join('<br>'):'<span class="m">All good</span>'}</div></div>`}

const COLS=[['no','No'],['serial','Serial'],['brand','Brand'],['model','Model'],['cond','Condition'],['cpu','CPU'],['gen','Gen'],['ram','RAM'],['storage','Storage'],['gpu','Graphic'],['status','Status'],['customer','Customer'],['invoice','Invoice'],['date','Date'],['supplier','Supplier'],['remarks','Remarks']];
const ALIAS={'no':'no','serial no':'serial','serial':'serial','brand':'brand','model':'model','condition':'cond','processor':'cpu','gen':'gen','ram':'ram','storage':'storage','graphic':'gpu','status':'status','customer':'customer','invoice no':'invoice','date':'date','supplier':'supplier','remarks':'remarks','cost':'cost','price':'price','qty':'qty','type':'type','name':'model'};
function vStock(){const rows=D.items.filter(i=>(st=='All'||(i.status||'')==st||(st=='Accessory'&&i.type!='laptop'))&&(!q||JSON.stringify(Object.values(i)).toLowerCase().includes(q.toLowerCase())));
const sts=['All',...new Set(D.items.map(i=>i.status).filter(Boolean)),'Accessory'];
return itemEditor()+`<div class="card"><h3>Import stock (paste from Excel / Google Sheets)</h3>
<textarea id="paste" rows="4" placeholder="Copy the whole sheet including the header row (No, Serial No, Brand, Model, Condition, ...) and paste here"></textarea>
<div class="row" style="margin-top:8px"><button class="b" onclick="doImport(val('paste'))">Import pasted data</button>
<label>or CSV/TSV file<input type="file" id="f" accept=".csv,.tsv,.txt"></label><button class="g" onclick="fileImp()">Import file</button>
<button class="g" onclick="doImport(SEED)">Load Falcon stock list</button><label class="chk" style="flex:none"><input type="checkbox" ${window.updMode?'checked':''} onchange="window.updMode=this.checked">Update existing rows (match by serial) instead of skipping</label><button class="g" onclick="expItems()">Export stock CSV</button></div>
<div class="m" style="margin-top:6px">Known serials (or "No" for rows without serial) are skipped, so re-importing is safe. Add optional columns <b>cost</b>, <b>price</b> to set prices.</div></div>
<div class="card"><h3>Add product</h3><div class="row"><label>Type<select onchange="nf.type=this.value;render()">${['laptop','accessory','part'].map(x=>`<option ${x==nf.type?'selected':''}>${x}</option>`).join('')}</select></label>
${[['brand','Brand'],['model','Model / product name *'],['serial','Serial no.'],['cond','Condition'],['cpu','Processor'],['gen','Gen'],['ram','RAM'],['storage','Storage'],['gpu','Graphic'],['supplier','Supplier']].map(([k,t])=>`<label>${t}<input value="${esc(nf[k])}" oninput="nf.${k}=this.value"></label>`).join('')}
${nf.type!='laptop'?`<label>Quantity<input type="number" value="${nf.qty}" oninput="nf.qty=this.value"></label>`:''}<label>Cost<input type="number" value="${nf.cost}" oninput="nf.cost=this.value"></label><label>Selling price<input type="number" value="${nf.price}" oninput="nf.price=this.value"></label></div>
<div class="row" style="margin-top:12px;align-items:center"><label style="flex:0 1 280px">Product photo (choose a file or take a picture)<input type="file" accept="image/*" onchange="pickNew(this)"></label>
<span class="th" style="width:96px;height:68px;border-radius:12px">${nimg?`<img src="${nimg}" alt="">`:pic({type:nf.type,brand:nf.brand,model:nf.model})}</span><button class="b" onclick="addItem()">＋ Add product</button></div></div>
<div class="card"><div class="row"><label>Search<input value="${esc(q)}" oninput="q=this.value;clearTimeout(window.tt);window.tt=setTimeout(render,250)" placeholder="serial, model, customer..."></label>
<label>Status<select onchange="st=this.value;render()">${sts.map(s=>`<option ${s==st?'selected':''}>${s}</option>`).join('')}</select></label><span class="m">${rows.length} / ${D.items.length} items</span></div>
${ced()&&rows.length?`<div class="row" style="margin-top:12px;padding-top:12px;border-top:1px dashed var(--b)"><label>Set price for the ${rows.length} items shown<input id="bp" type="number" placeholder="e.g. 85000"></label><button class="g" onclick="bulkPrice()">Apply price</button>
<label>Set status for the ${rows.length} items shown<select id="bs">${['Available','Purchased','Returned','Not Marked','Shop Usage'].map(s=>`<option>${s}</option>`).join('')}</select></label><button class="g" onclick="bulkStatus()">Apply status</button></div><div class="m" style="margin-top:6px">Tip: search for a model (e.g. A1504VA) first, then set one price for all of them. Click any cell in the table to edit it.</div>`:''}
<div class="sc" style="margin-top:8px"><table><tr><th></th>${COLS.map(c=>`<th>${c[1]}</th>`).join('')}<th>Qty</th><th>Price</th><th></th></tr>
${rows.slice(0,400).map(i=>`<tr><td><span class="th">${pic(i)}</span></td>${COLS.map(([k])=>{const v=i[k]??(k=='model'?i.name:'');if(!ced())return k=='status'?`<td><span class="tag ${i.status}">${esc(i.status||'')}</span></td>`:`<td>${esc(v)}</td>`;
return k=='status'?`<td><select class="ce" onchange="qe('${i.id}','status',this.value)">${[...new Set(['Available','Purchased','Returned','Not Marked','Shop Usage',i.status||''])].map(s=>`<option ${s==(i.status||'')?'selected':''}>${esc(s)}</option>`).join('')}</select></td>`:`<td><input class="ce" style="width:${CW[k]||100}px" value="${esc(v)}" onchange="qe('${i.id}','${k}',this.value)"></td>`}).join('')}<td>${ced()?`<input class="ce" type="number" style="width:70px" value="${i.qty}" onchange="qi('${i.id}','qty',this.value)">`:i.qty}</td><td>${ced()?`<input class="ce" type="number" style="width:105px" value="${i.price||''}" onchange="qi('${i.id}','price',this.value)">`:(i.price?money(i.price):'—')}</td><td><button class="x" title="Full editor + photo" onclick="ed='${i.id}';render();scrollTo(0,0)">✎</button><button class="x" onclick="delItem('${i.id}')">✕</button></td></tr>`).join('')||'<tr><td class="m">Nothing found</td></tr>'}</table></div></div>`}
function addItem(){if(!ced())return;const g=k=>String(nf[k]||'').trim(),ty=nf.type;if(!g('model'))return flash('Please enter the model / product name');
if(ty=='laptop'&&g('serial')&&D.items.some(i=>i.serial==g('serial')))return flash('This serial number already exists');
const o={id:uid(),type:ty,status:ty=='laptop'?'Available':'',qty:ty=='laptop'?1:Math.max(0,+nf.qty||0),cost:+nf.cost||0,price:+nf.price||0};
['brand','model','serial','cond','cpu','gen','ram','storage','gpu','supplier'].forEach(k=>o[k]=g(k));D.items.push(o);const had=!!nimg;if(had)(D.imgs=D.imgs||{})[ikey(o)]=nimg;nf=newForm();nimg='';save();flash('Product added'+(had?' with photo':''))}
async function delItem(id){if(!ced())return;if(await ask('Delete this item?')){D.items=D.items.filter(i=>i.id!=id);save();render()}}
function expItems(){dl('falcon-stock-'+today()+'.csv',csvOut([[...COLS.map(c=>c[1]),'Qty','Cost','Price'],...D.items.map(i=>[...COLS.map(c=>i[c[0]]??''),i.qty,i.cost,i.price])]))}
async function fileImp(){const f=$('#f').files[0];if(!f)return flash('Choose a file first');doImport(await f.text())}
function doImport(t){if(me&&!ced())return;if(!t.trim())return flash('Nothing to import');
const l1=t.split('\n')[0],d=l1.includes('\t')?'\t':l1.includes('|')?'|':',',rows=csvIn(t,d);if(rows.length<2)return flash('Need a header row plus data');
const map=rows[0].map(h=>ALIAS[h.trim().toLowerCase()]||null);
if(!map.includes('serial')&&!map.includes('model'))return flash('Header row not recognised (need at least Serial No / Model)');
const seen=new Set(D.items.map(i=>i.serial||('no:'+i.no)));let add=0,skip=0,upd=0;
rows.slice(1).forEach(r=>{const o={id:uid(),type:'laptop'};map.forEach((k,j)=>{if(k)o[k]=(r[j]||'').trim()});
if(!o.model&&!o.brand&&!o.serial){skip++;return}
const key=o.serial&&o.serial!='SN no'?o.serial:'no:'+o.no;if(seen.has(key)){if(window.updMode){const it=D.items.find(x=>x.serial&&x.serial==o.serial||(!x.serial&&('no:'+x.no)==key));if(it){Object.keys(o).forEach(k=>{if(k!='id'&&k!='type'&&o[k]!==''&&o[k]!==undefined)it[k]=['qty','cost','price'].includes(k)?(+o[k]||0):o[k]});if(o.status&&o.qty===undefined&&it.type=='laptop')it.qty=['Available','Not Marked'].includes(it.status)?1:0;upd++;return}}skip++;return}seen.add(key);
if(o.type!='laptop'&&o.type!='accessory'&&o.type!='part')o.type='laptop';
o.status=o.status||(o.type=='laptop'?'Available':'');
o.qty=o.qty!==undefined&&o.qty!==''?+o.qty||0:(o.type=='laptop'?(['Available','Not Marked'].includes(o.status)?1:0):0);
o.cost=+o.cost||0;o.price=+o.price||0;D.items.push(o);add++});
save();flash(`Imported ${add} new, updated ${upd}, skipped ${skip} duplicates/empty rows`)}

let cf={cu:'',ph:'',ad:'',sh:'Same as recipient',pm:'Cash',dt:'',disc:'',shp:'',paid:''},dv=null;
function specDesc(i){if(i.type!='laptop')return label(i);const g=/^\d+(st|nd|rd|th)$/i.test(i.gen||'')?i.gen+' Gen':(i.gen||'');
return [label(i),i.cpu?[i.cpu,g].filter(Boolean).join(', ')+' Processor':'',[i.ram&&i.ram+' RAM',i.storage].filter(Boolean).join(', '),i.gpu,i.serial&&'S/N: '+i.serial].filter(Boolean).join('\n')}
let cat='All';
const calc=()=>{const sub=cart.reduce((a,c)=>a+c.qty*c.price,0),d=Math.min(sub,Math.max(0,+cf.disc||0)),s=Math.max(0,+cf.shp||0);return{sub,d,s,net:sub-d+s}};
function updTot(){const t=calc(),g=id=>document.getElementById(id);if(!g('t_n'))return;g('t_d').textContent='-'+money(t.d);g('t_s').textContent=money(t.s);g('t_n').textContent=money(t.net);
const pd=cf.paid===''?t.net:Math.max(0,+cf.paid||0),c=g('t_c');c.textContent=pd>t.net?'Change to return: '+money(pd-t.net):pd<t.net?'Balance due: '+money(t.net-pd):'';c.style.color=pd<t.net?'#e8590c':'#20a67a'}
function scanAdd(){const s=q.trim().toLowerCase();if(!s)return;const pool=D.items.filter(sellable);let it=pool.find(i=>String(i.serial||'').toLowerCase()==s);if(!it){const m=pool.filter(i=>has(i,q));if(m.length==1)it=m[0]}if(!it)return flash('No exact match for "'+q+'"');q='';window.refocus=1;addCart(it.id)}
function holdBill(){if(!cart.length)return flash('Nothing to hold');(D.held=D.held||[]).push({id:uid(),cart:cart.map(c=>({...c})),cf:{...cf},at:Date.now()});cart=[];cf={cu:'',ph:'',ad:'',sh:'Same as recipient',pm:'Cash',dt:'',disc:'',shp:'',paid:''};save();flash('Bill put on hold')}
function recall(id){const x=(D.held||[]).find(y=>y.id==id);if(!x)return;cart=x.cart.filter(c=>D.items.some(i=>i.id==c.id&&sellable(i)));cf=x.cf;D.held=D.held.filter(y=>y.id!=id);save();render()}
function dropHeld(id){D.held=(D.held||[]).filter(y=>y.id!=id);save();render()}
function fillCust(){const n=cf.cu.trim().toLowerCase();if(!n)return;const s=[...D.sales].reverse().find(x=>String(x.customer).toLowerCase()==n&&(x.phone||x.addr));if(s){if(!cf.ph&&s.phone){cf.ph=s.phone;$('#cf_ph').value=s.phone}if(!cf.ad&&s.addr){cf.ad=s.addr;$('#cf_ad').value=s.addr}}}
const CATC=['#f5a524','#7c5cfc','#20c997','#ff7a59','#3b82f6','#e8267e'];
function pcard(i,mode){const c=cart.find(x=>x.id==i.id),tag=i.cond||(i.type=='laptop'?'':i.type);
return `<div class="pc ${c?'sel':''}"><div class="pim">${pic(i)}${tag?`<span class="bd">${esc(tag)}</span>`:''}</div>
<div class="pt">${esc(label(i))}</div><div class="ps">${esc([i.cpu,i.gen,i.ram,i.storage].filter(Boolean).join(' · ')||i.serial||'')}</div>
<div class="pf"><b>${i.price?money(i.price).replace('.00',''):'Set price'}</b><span class="m">${i.type=='laptop'?esc(i.serial||''):i.qty+' left'}</span></div>
${mode=='avail'?`<button class="addb" onclick="addCart('${i.id}');tab='POS';q='';cat='All';window.fresh=1;render()">Sell</button>`:c?(i.type=='laptop'?`<button class="addb on" onclick="rmCart('${i.id}')">✓ Added · remove</button>`:`<div class="stp"><button onclick="cq('${i.id}',-1)">−</button><b>${c.qty}</b><button onclick="cq('${i.id}',1)">+</button></div>`):`<button class="addb" onclick="addCart('${i.id}')">Add to order</button>`}</div>`}
function vPOS(){const pool=D.items.filter(sellable),br=[...new Set(pool.filter(i=>i.type=='laptop').map(i=>i.brand||'Other'))].sort(),acc=pool.filter(i=>i.type!='laptop').length;
const inCat=i=>cat=='All'||(cat=='Accessories'?i.type!='laptop':i.type=='laptop'&&(i.brand||'Other')==cat);
const L=pool.filter(i=>inCat(i)&&(!q||has(i,q))).slice(0,150),tot=cart.reduce((a,c)=>a+c.qty*c.price,0);
const cats=[['All',pool.length],...br.map(b=>[b,pool.filter(i=>i.type=='laptop'&&(i.brand||'Other')==b).length]),...(acc?[['Accessories',acc]]:[])];
return `<div class="pos2"><div><div class="card" style="padding:12px"><label>🔍 Search or scan a serial barcode<input value="${esc(q)}" ${SRCH} onkeydown="if(event.key=='Enter')scanAdd()" placeholder="brand, model, serial… (press Enter to add)"></label></div>
<div class="cats">${cats.map(([n,c],k)=>`<div class="cat ${n==cat?'on':''}" style="--k:${CATC[k%6]}" data-c="${esc(n)}" onclick="cat=this.dataset.c;render()"><b>${esc(n)}</b><small>${c} items</small></div>`).join('')}</div>
<div class="pg">${L.map(i=>pcard(i,'pos')).join('')||'<div class="card m">No sellable items found</div>'}</div></div>
<div class="card cart"><h3>Current order</h3>${cart.map((c,n)=>{const i=D.items.find(x=>x.id==c.id);return `<div class="ci"><span class="cim">${pic(i)}</span><div style="flex:1;min-width:0"><div class="pt" style="min-height:0">${esc(label(i))}</div><div class="m">${c.qty} × ${money(c.price).replace('.00','')}</div>
<label style="margin:6px 0 0">Unit price (Rs.)<input type="number" value="${c.price||''}" onchange="cart[${n}].price=+this.value||0;render()"></label>${ced()?`<details><summary class="m">Edit invoice text</summary><label>Description<textarea rows="4" onchange="cart[${n}].desc=this.value">${esc(c.desc)}</textarea></label><label>Warranty line<input value="${esc(c.warr)}" onchange="cart[${n}].warr=this.value"></label></details>`:''}</div>
<b>${money(c.qty*c.price).replace('.00','')}</b><button class="x" onclick="rmCart('${c.id}')">✕</button></div>`}).join('')||'<div class="m" style="padding:14px;text-align:center">Tap “Add to order” on a product</div>'}
<div class="sumbox"><div><span>Sub total</span><span>${money(calc().sub)}</span></div><div><span>Discount</span><span id="t_d"></span></div><div><span>Shipping</span><span id="t_s"></span></div><div class="big"><span>Total amount</span><span id="t_n"></span></div></div>
<div class="row"><label>Discount (Rs.)<input type="number" value="${cf.disc}" oninput="cf.disc=this.value;updTot()"></label><label>Shipping (Rs.)<input type="number" value="${cf.shp}" oninput="cf.shp=this.value;updTot()"></label><label>Paid now (Rs.)<input type="number" placeholder="blank = full" value="${cf.paid}" oninput="cf.paid=this.value;updTot()"></label></div><div id="t_c" style="margin:8px 0;font-weight:600"></div>
<div class="pay">${[['Cash','💵'],['Card','💳'],['Bank transfer','🏦']].map(([p,ic])=>`<div class="pm ${cf.pm==p?'on':''}" onclick="cf.pm='${p}';render()"><span>${ic}</span>${p}</div>`).join('')}</div>
<details open><summary>Customer &amp; invoice details</summary><div class="row"><datalist id="cust">${[...new Set(D.sales.map(s=>s.customer))].slice(-80).map(c=>`<option value="${esc(c)}">`).join('')}</datalist><label>Customer name<input list="cust" value="${esc(cf.cu)}" oninput="cf.cu=this.value;fillCust()"></label><label>Phone<input id="cf_ph" value="${esc(cf.ph)}" oninput="cf.ph=this.value"></label>
<label>Address / town<input id="cf_ad" value="${esc(cf.ad)}" oninput="cf.ad=this.value"></label><label>Ship to<input value="${esc(cf.sh)}" oninput="cf.sh=this.value"></label><label>Date<input type="date" value="${cf.dt||today()}" onchange="cf.dt=this.value"></label></div></details>
<button class="b" style="width:100%;margin-top:12px;padding:13px" onclick="checkout()">Place order &amp; create invoice</button><button class="g" style="width:100%;margin-top:8px" onclick="holdBill()">⏸ Hold this bill</button>${(D.held||[]).length?`<div style="margin-top:12px"><b class="m">Held bills</b>${D.held.map(x=>`<div class="ci" style="margin:6px 0;align-items:center"><div style="flex:1">${x.cart.length} item(s) · ${esc(x.cf.cu||'Walk-in')}<div class="m">${new Date(x.at).toLocaleTimeString()}</div></div><button class="g" style="padding:5px 10px" onclick="recall('${x.id}')">Recall</button><button class="x" onclick="dropHeld('${x.id}')">✕</button></div>`).join('')}</div>`:''}</div></div>
${last?rcptHTML():''}`}
function rmCart(id){cart=cart.filter(c=>c.id!=id);render()}
function cq(id,d){const c=cart.find(x=>x.id==id),i=D.items.find(x=>x.id==id);c.qty=Math.max(1,Math.min(+i.qty,c.qty+d));render()}
function addCart(id){const i=D.items.find(x=>x.id==id),c=cart.find(x=>x.id==id);if(c){if(i.type!='laptop'&&c.qty<i.qty)c.qty++}else cart.push({id,qty:1,price:+i.price||0,desc:specDesc(i),warr:i.type=='laptop'?set().warr:''});render()}
function checkout(){if(!cart.length)return flash('Cart is empty');
for(const c of cart){const i=D.items.find(x=>x.id==c.id);if(!i||!sellable(i)||c.qty>+i.qty)return flash('"'+(i?label(i):'An item')+'" is no longer available. Remove it from the order.');if(!(+c.price>0))return flash('Please set a price for '+label(i))}const S=set();let inv=String(+S.next||12270);while(D.sales.some(s=>s.inv==inv))inv=String(+inv+1);S.next=+inv+1;
const date=cf.dt||today(),customer=cf.cu.trim()||'Walk-in',t=calc(),pd=cf.paid===''?t.net:Math.min(t.net,Math.max(0,+cf.paid||0));
cart.forEach((c,n)=>{const i=D.items.find(x=>x.id==c.id);D.sales.push({id:uid(),inv,date,customer,phone:cf.ph,addr:cf.ad,ship:cf.sh,pay:cf.pm,by:me?me.user:'',itemId:i.id,name:label(i),desc:c.desc||specDesc(i),warr:c.warr,qty:c.qty,price:c.price,total:c.qty*c.price,...(n===0?{adj:t.s-t.d,disc:t.d,shp:t.s,paid:pd}:{})});
i.qty-=c.qty;i.price=c.price||i.price;if(i.type=='laptop'){i.status='Purchased';i.customer=customer;i.invoice=inv;i.date=date}});
last=invModel(invList().find(o=>o.inv==inv));cart=[];cf={cu:'',ph:'',ad:'',sh:'Same as recipient',pm:'Cash',dt:'',disc:'',shp:'',paid:''};save();flash('Invoice '+inv+' created')}

function vRepairs(){return `<div class="card"><h3>New repair ticket</h3><div class="row">
<label>Customer<input id="rc"></label><label>Phone<input id="rp"></label><label>Device<input id="rd"></label><label>Serial<input id="rs"></label><label>Issue<input id="ri"></label><label>Received<input id="rr" type="date" value="${today()}"></label>
<button class="b" onclick="addRepair()">Create ticket</button></div></div>
<div class="card sc"><table><tr><th>Ticket</th><th>Customer</th><th>Device</th><th>Status</th><th>Final cost</th><th>Labor d</th><th>Parts d</th><th>Warranty until</th><th></th></tr>
${[...D.repairs].reverse().map(r=>{const e=r.doneDate?addDays(r.doneDate,Math.max(+r.laborDays||0,+r.partsDays||0)):'';
return `<tr><td>${r.ticket}</td><td>${esc(r.customer)}<br><span class="m">${esc(r.phone)}</span></td><td>${esc(r.device)}<br><span class="m">${esc(r.serial)}</span></td>
<td><select onchange="setR('${r.id}','status',this.value)">${['Received','In Progress','Completed'].map(s=>`<option ${s==r.status?'selected':''}>${s}</option>`).join('')}</select></td>
<td><input type="number" style="width:100px" value="${r.cost||''}" onchange="setR('${r.id}','cost',this.value)"></td>
<td><input type="number" style="width:64px" value="${r.laborDays}" onchange="setR('${r.id}','laborDays',this.value)"></td>
<td><input type="number" style="width:64px" value="${r.partsDays}" onchange="setR('${r.id}','partsDays',this.value)"></td>
<td class="${e&&e>=today()?'ok':'m'}">${e?(e>=today()?'⚠ active ':'expired ')+e:'—'}</td><td><button class="x" onclick="delR('${r.id}')">✕</button></td></tr>`}).join('')||'<tr><td class="m">No repairs yet</td></tr>'}</table></div>`}
function addRepair(){if(!val('rc').trim())return flash('Enter customer');
D.repairs.push({id:uid(),ticket:'REP-'+String(D.repairs.length+1).padStart(5,'0'),customer:val('rc').trim(),phone:val('rp'),device:val('rd'),serial:val('rs'),issue:val('ri'),date:val('rr')||today(),status:'Received',cost:0,laborDays:30,partsDays:90,doneDate:''});save();flash('Ticket created')}
function setR(id,k,v){const r=D.repairs.find(x=>x.id==id);r[k]=v;if(k=='status')r.doneDate=v=='Completed'?today():'';save();render()}
async function delR(id){if(!ced())return;if(await ask('Delete this repair ticket?')){D.repairs=D.repairs.filter(r=>r.id!=id);save();render()}}

function vReport(){const m=monthly(),keys=Object.keys(m).sort().reverse(),cur=m[month]||{sales:0,repairs:0,n:0,rn:0};
return `<div class="card"><h3>Monthly income</h3><div class="row"><label>Month<input type="month" value="${month}" onchange="month=this.value;render()"></label>
<button class="b" onclick="expMonth()">Export this month (CSV)</button><button class="g" onclick="expAll()">Export all months</button></div>
<div class="kpi" style="margin-top:10px"><div>Sales lines (${cur.n})<b>${money(cur.sales)}</b></div><div>Repairs (${cur.rn})<b>${money(cur.repairs)}</b></div><div>Total<b>${money(cur.sales+cur.repairs)}</b></div></div></div>
<div class="card" style="overflow-x:auto"><h3>All months</h3><table><tr><th>Month</th><th>Sales</th><th>Repairs</th><th>Total</th></tr>${keys.map(k=>`<tr><td>${k}</td><td>${money(m[k].sales)}</td><td>${money(m[k].repairs)}</td><td><b>${money(m[k].sales+m[k].repairs)}</b></td></tr>`).join('')||'<tr><td class="m">No income yet</td></tr>'}</table></div>`}
function expMonth(){const rows=[['type','date','reference','customer','description','qty','amount']];
D.sales.filter(s=>s.date.startsWith(month)).forEach(s=>{rows.push(['Sale',s.date,s.inv,s.customer,s.name,s.qty,s.total]);if(+s.adj)rows.push(['Discount/shipping',s.date,s.inv,s.customer,'',1,s.adj])});
D.repairs.filter(r=>r.status=='Completed'&&(r.doneDate||r.date).startsWith(month)).forEach(r=>rows.push(['Repair',r.doneDate||r.date,r.ticket,r.customer,r.device+' - '+r.issue,1,repInc(r)]));
rows.push(['TOTAL','','','','','',rows.slice(1).reduce((a,r)=>a+(+r[6]||0),0)]);dl('falcon-income-'+month+'.csv',csvOut(rows))}
function expAll(){const m=monthly();dl('falcon-income-by-month.csv',csvOut([['month','sales','repairs','total'],...Object.keys(m).sort().map(k=>[k,m[k].sales,m[k].repairs,m[k].sales+m[k].repairs])]))}
function vBackup(){return `<div class="card"><h3>Backup &amp; restore</h3><p class="m">Data is stored in this browser only. Download a backup regularly.</p>
<div class="row"><button class="b" onclick="dl('falcon-backup-'+today()+'.json',JSON.stringify(D),'application/json')">Download backup</button><label>Restore file<input type="file" id="bf" accept=".json"></label><button class="g" onclick="restore()">Restore</button></div></div>`}
async function restore(){if(!adm())return;const f=$('#bf').files[0];if(!f)return flash('Choose a backup file');
try{const j=JSON.parse(await f.text());if(!(await ask('Replace ALL current data with this backup?')))return;D=Object.assign({items:[],sales:[],repairs:[],users:D.users},j);D.seeded=true;const n=D.users.find(u=>u.id==me.id);save();if(!n){logout();return}flash('Restored')}catch(e){flash('Invalid backup file')}}

let me=null,ed=null,einv=null,ab='All';
const adm=()=>me&&me.role=='admin';
const ced=()=>me&&(me.role=='admin'||me.edit);
const EXTRA=['Available','Invoices','Repairs','Stock'];
const TK=()=>D.tickets||(D.tickets=[]);
function myTabs(){if(me.role=='admin')return['Dashboard','POS','Available','Stock','Invoices','Repairs','Support','Monthly Report','Users','Settings'];return['POS',...EXTRA.filter(t=>(me.tabs||[]).includes(t)),'Support']}
const IC={Dashboard:'📊',POS:'🧾',Available:'✅',Stock:'💻',Invoices:'📄',Repairs:'🛠️','Monthly Report':'📈',Users:'👥',Support:'🎫',Settings:'⚙️'};
async function H(s){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('falcon:'+s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return'p:'+s}}
const longDate=d=>{const x=new Date(d);return isNaN(x)?d:x.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})};
const mdy=d=>{const x=new Date(d);return isNaN(x)?d:(x.getMonth()+1)+'.'+x.getDate()+'.'+x.getFullYear()};
function set(){D.set=Object.assign({name:'Falcon System',sub:'Sainthamaruthu',tel:'+94777396064, +67 4504028',fax:'067 454028',email:'faconn@gmail.com',web:'falconsys.org',warr:'One month Warranty',thanks:'Thank you for your business!',next:12270},D.set||{});return D.set}
function dHTML(l){const L=String(l.desc||'').split('\n');return `<span class="pn">${esc(L[0])}</span>${L.length>1?'<br>'+L.slice(1).map(esc).join('<br>'):''}${l.warr?`<br><mark>${esc(l.warr)}</mark>`:''}`}
function dlInvoice(){const s=document.querySelector('.sheet');if(!s)return;const css=(typeof INVCSS!='undefined'?INVCSS:[...document.querySelectorAll('style')].map(x=>x.textContent).join('\n'));
dl('invoice-'+last.inv+'.html',`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice ${esc(last.inv)}</title><style>${css}</style></head><body style="background:#fff;padding:0"><div class="shs"><div class="sheet">${s.innerHTML}</div></div><script>onload=()=>setTimeout(()=>print(),400)<\/script></body></html>`,'text/html')}
const nf2=v=>(+v||0).toLocaleString('en-LK');
function rc80(o,S){return `<div class="rc80"><div style="text-align:center"><b style="font-size:16px">${esc(S.name)}</b><br>${esc(S.sub)}<br>${esc(S.tel)}</div><hr>Invoice: <b>${esc(o.inv)}</b><br>${longDate(o.date)}<br>Customer: ${esc(o.customer)}${o.phone?'<br>'+esc(o.phone):''}<hr>${o.lines.map(l=>`<div><b>${esc(String(l.desc||'').split('\n')[0])}</b><br><span class="rr">${l.qty} x ${nf2(l.price)} = ${nf2(l.total)}</span>${l.warr?'<br><small>'+esc(l.warr)+'</small>':''}</div><div style="clear:both;height:5px"></div>`).join('')}<hr>Subtotal<span class="rr">${nf2(o.sub)}</span><br>${o.disc?`Discount<span class="rr">-${nf2(o.disc)}</span><br>`:''}${o.shp?`Shipping<span class="rr">${nf2(o.shp)}</span><br>`:''}<b>TOTAL<span class="rr">${nf2(o.total)}</span></b><br>${o.bal>0?`Paid<span class="rr">${nf2(o.paid)}</span><br><b>BALANCE DUE<span class="rr">${nf2(o.bal)}</span></b><br>`:''}<hr><div style="text-align:center">${esc(S.thanks)}</div></div>`}
function print80(){document.body.classList.add('p80');const st=document.createElement('style');st.textContent='@page{size:80mm auto;margin:0}';document.head.appendChild(st);const done=()=>{document.body.classList.remove('p80');st.remove();removeEventListener('afterprint',done)};addEventListener('afterprint',done);window.print()}
function rcptHTML(){const o=last,S=set(),n=Math.max(0,12-o.lines.length);
return `<div class="card sheetwrap"><div class="row" style="margin-bottom:10px"><button class="b" onclick="window.print()">🖨 Print invoice (A4)</button><button class="g" onclick="print80()">🧾 Print 80mm receipt</button><button class="g" onclick="dlInvoice()">⬇ Download invoice file</button><button class="g" onclick="last=null;render()">Close</button><span class="m">Choose your printer in the print window that opens.</span></div>
<div class="shs"><div class="sheet"><div class="vt">Invoice ${esc(o.inv)}</div><img class="slogo" src="${LOGO}" alt="">
<h1>${esc(S.name)}</h1><div class="sub">${esc(S.sub)}</div><hr>
<div class="g3"><div><span class="lb">Date</span>${longDate(o.date)}</div><div><span class="lb">To</span>${esc(o.customer)}${o.addr?'<br>'+esc(o.addr):''}</div><div><span class="lb">Ship To</span>${esc(o.ship||'Same as recipient')}</div></div>
<div class="ph">${esc(o.phone)}</div>
<table class="it"><tr><th style="width:11%">Quantity</th><th>Description</th><th class="r" style="width:16%">Unit Price</th><th class="r" style="width:14%">Total</th></tr>
${o.lines.map(l=>`<tr><td>${l.qty}</td><td>${dHTML(l)}</td><td class="r">${(+l.price||0).toLocaleString('en-LK')}</td><td class="r">${(+l.total||0).toLocaleString('en-LK')}</td></tr>`).join('')}
${'<tr><td></td><td></td><td></td><td></td></tr>'.repeat(n)}
<tr class="tt"><td colspan="3" class="r">Subtotal</td><td class="r"><b>${nf2(o.sub)}</b></td></tr>${o.disc?`<tr class="tt"><td colspan="3" class="r">Discount</td><td class="r">-${nf2(o.disc)}</td></tr>`:''}<tr class="tt"><td colspan="3" class="r">Shipping &amp; Handling</td><td class="r">${o.shp?nf2(o.shp):'-'}</td></tr>
<tr class="tt"><td colspan="3" class="r"><b>Total Due By ${mdy(o.date)}</b></td><td class="r"><b>${nf2(o.total)}</b></td></tr>${o.bal>0?`<tr class="tt"><td colspan="3" class="r">Paid</td><td class="r">${nf2(o.paid)}</td></tr><tr class="tt"><td colspan="3" class="r"><b>Balance Due</b></td><td class="r"><b>${nf2(o.bal)}</b></td></tr>`:''}</table>
<div class="thx">${esc(S.thanks)}</div>
<div class="ft"><div><b>Tel:</b> ${esc(S.tel)}<br><b>Fax:</b> ${esc(S.fax)}</div><div><b>Email:</b> ${esc(S.email)}<br><b>Web:</b> ${esc(S.web)}</div></div></div></div>${rc80(o,S)}</div>`}
const SRCH=`oninput="q=this.value;clearTimeout(window.tt);window.tt=setTimeout(render,250)"`;
const has=(i,s)=>JSON.stringify(Object.values(i)).toLowerCase().includes(s.toLowerCase());

function vAvail(){const L=D.items.filter(i=>i.type=='laptop'&&sellable(i)),br=[...new Set(L.map(i=>i.brand||'Other'))].sort();
const f=L.filter(i=>(ab=='All'||(i.brand||'Other')==ab)&&(!q||has(i,q)));
const cnt=fn=>{const o={};f.forEach(i=>{const k=fn(i);o[k]=(o[k]||0)+1});return Object.entries(o).sort((x,y)=>y[1]-x[1])};
const chips=a=>a.map(([k,v])=>`<span class="tag" style="margin:2px">${esc(k)}: <b>${v}</b></span>`).join('');
const grp={};f.forEach(i=>{const k=[i.brand||'Other',i.model||'—',i.cpu||'—',i.storage||'—'].join('¦');grp[k]=(grp[k]||0)+1});
const G=Object.entries(grp).sort((x,y)=>x[0].localeCompare(y[0]));
return `<div class="kpi"><div>Available laptops<b>${f.length}</b></div><div>Brands<b>${new Set(f.map(i=>i.brand)).size}</b></div><div>Models<b>${new Set(f.map(i=>i.brand+i.model)).size}</b></div><div>Spec groups<b>${G.length}</b></div></div>
<div class="card"><div class="row"><label>Search<input value="${esc(q)}" ${SRCH} placeholder="serial, model, processor..."></label>
<label>Brand<select onchange="ab=this.value;render()">${['All',...br].map(b=>`<option ${b==ab?'selected':''}>${b}</option>`).join('')}</select></label></div></div>
<div class="card"><h3>By brand</h3>${chips(cnt(i=>i.brand||'Other'))}<h3 style="margin-top:12px">By processor</h3>${chips(cnt(i=>i.cpu||'—'))}<h3 style="margin-top:12px">By storage</h3>${chips(cnt(i=>i.storage||'—'))}</div>
<div class="card sc"><h3>Summary — brand / model / processor / storage</h3><table><tr><th>Brand</th><th>Model</th><th>Processor</th><th>Storage</th><th>In stock</th></tr>
${G.map(([k,v])=>`<tr>${k.split('¦').map(x=>`<td>${esc(x)}</td>`).join('')}<td><b>${v}</b></td></tr>`).join('')||'<tr><td class="m">No available laptops</td></tr>'}</table></div>
<h3 style="margin:6px 4px 10px">Available laptop list</h3><div class="pg">${f.slice(0,200).map(i=>pcard(i,'avail')).join('')}</div>`}

const EF=[['no','No'],['serial','Serial'],['brand','Brand'],['model','Model'],['cond','Condition'],['cpu','Processor'],['gen','Gen'],['ram','RAM'],['storage','Storage'],['gpu','Graphic'],['status','Status'],['customer','Customer'],['invoice','Invoice'],['date','Date'],['supplier','Supplier'],['remarks','Remarks'],['qty','Qty'],['cost','Cost'],['price','Price']];
function itemEditor(){const i=D.items.find(x=>x.id==ed);if(!i)return'';return `<div class="card" style="border-color:var(--p)"><h3>Edit item</h3><div class="row">${EF.map(([k,t])=>`<label>${t}<input id="ei_${k}" value="${esc(i[k]??(k=='model'?i.name:''))}"></label>`).join('')}</div><div class="row" style="margin-top:12px"><label>Product photo (used for every ${esc(label(i))})<input type="file" accept="image/*" onchange="upImg(this)"></label><button class="g" onclick="rmImg()">Remove photo</button></div><div class="row" style="margin-top:12px"><button class="b" onclick="saveItem()">Save</button><button class="g" onclick="ed=null;render()">Cancel</button></div></div>`}
const CW={no:55,serial:150,brand:90,model:150,cond:90,cpu:110,gen:70,ram:90,storage:100,gpu:150,customer:110,invoice:85,date:100,supplier:80,remarks:160};
const stockRows=()=>D.items.filter(i=>(st=='All'||(i.status||'')==st||(st=='Accessory'&&i.type!='laptop'))&&(!q||has(i,q)));
function qe(id,k,v){if(!ced())return;const i=D.items.find(x=>x.id==id);v=String(v).trim();
if(k=='serial'&&v&&D.items.some(x=>x.id!=id&&x.serial==v)){flash('That serial number already exists');return}
i[k]=v;if(k=='status'&&i.type=='laptop'){i.qty=['Available','Not Marked'].includes(v)?1:0;if(v=='Available'){i.customer='';i.invoice='';i.date=''}}
save();if(k=='status')render()}
async function bulkPrice(){if(!ced())return;const p=+val('bp'),L=stockRows();if(!(p>0))return flash('Type a price first');
if(!(await ask('Set the price to Rs. '+p.toLocaleString()+' for '+L.length+' items?',{yes:'Yes, apply'})))return;L.forEach(i=>i.price=p);save();flash('Price set for '+L.length+' items')}
async function bulkStatus(){if(!ced())return;const s=val('bs'),L=stockRows();
if(!(await ask('Change the status of '+L.length+' items to "'+s+'"?',{yes:'Yes, apply'})))return;L.forEach(i=>{i.status=s;if(i.type=='laptop'){i.qty=['Available','Not Marked'].includes(s)?1:0;if(s=='Available'){i.customer='';i.invoice='';i.date=''}}});save();flash('Status changed for '+L.length+' items')}
function qi(id,k,v){if(!ced())return;const i=D.items.find(x=>x.id==id);i[k]=+v||0;save()}
function saveItem(){if(!ced())return;const i=D.items.find(x=>x.id==ed);EF.forEach(([k])=>{const v=val('ei_'+k).trim();i[k]=['qty','cost','price'].includes(k)?+v||0:v});save();ed=null;flash('Item updated')}

function invList(){const m={};D.sales.forEach(s=>{const o=m[s.inv]||(m[s.inv]={inv:s.inv,date:s.date,customer:s.customer,phone:s.phone||'',addr:s.addr||'',ship:s.ship||'',pay:s.pay,by:s.by,sub:0,disc:0,shp:0,lines:[]});o.sub+=+s.total;o.lines.push(s);if(s.adj!==undefined){o.disc=+s.disc||0;o.shp=+s.shp||0}if(s.paid!==undefined)o.paid=+s.paid});
Object.values(m).forEach(o=>{o.total=o.sub-o.disc+o.shp;if(o.paid===undefined)o.paid=o.total;o.paid=Math.min(o.paid,o.total);o.bal=Math.max(0,o.total-o.paid)});
return Object.values(m).sort((a,b)=>(+b.inv||0)-(+a.inv||0)||String(b.inv).localeCompare(a.inv))}
const invModel=o=>({inv:o.inv,date:o.date,customer:o.customer,phone:o.phone,addr:o.addr,ship:o.ship,pay:o.pay,sub:o.sub,disc:o.disc,shp:o.shp,paid:o.paid,bal:o.bal,total:o.total,lines:o.lines.map(l=>({desc:l.desc||l.name,warr:l.warr||'',qty:l.qty,price:l.price,total:l.total}))});
function restoreLine(s){const i=D.items.find(x=>x.id==s.itemId);if(i){i.qty=(+i.qty||0)+(+s.qty||0);if(i.type=='laptop'){i.status='Available';i.customer='';i.invoice='';i.date=''}}}
function vInv(){const L=invList().filter(o=>!q||has([o.inv,o.customer,o.date,o.by,o.phone,o.lines.map(l=>l.name)],q));
const ed2=einv&&dv&&ced()?`<div class="card" style="border-color:var(--p)"><h3>Edit invoice ${esc(dv.orig)}</h3><div class="row">
<label>Invoice no<input id="dv_inv" value="${esc(dv.inv)}"></label><label>Date<input id="dv_date" type="date" value="${dv.date}"></label><label>Customer<input id="dv_customer" value="${esc(dv.customer)}"></label><label>Phone<input id="dv_phone" value="${esc(dv.phone)}"></label>
<label>Address<input id="dv_addr" value="${esc(dv.addr)}"></label><label>Ship to<input id="dv_ship" value="${esc(dv.ship)}"></label><label>Discount<input id="dv_disc" type="number" value="${dv.disc||''}"></label><label>Shipping<input id="dv_shp" type="number" value="${dv.shp||''}"></label><label>Paid so far<input id="dv_paid" type="number" placeholder="blank = full" value="${dv.paid}"></label><label>Payment<select id="dv_pay">${['Cash','Card','Bank transfer'].map(p=>`<option ${p==dv.pay?'selected':''}>${p}</option>`).join('')}</select></label></div>
${dv.lines.map((l,n)=>`<div style="border-top:1px solid var(--b);margin-top:10px;padding-top:8px"><div class="row"><label style="flex:3 1 260px">Description<textarea id="dl_d${n}" rows="4">${esc(l.desc)}</textarea></label><div style="flex:2 1 200px" class="row"><label>Warranty<input id="dl_w${n}" value="${esc(l.warr)}"></label><label>Qty<input id="dl_q${n}" type="number" value="${l.qty}"></label><label>Unit price<input id="dl_p${n}" type="number" value="${l.price}"></label></div><button class="x" onclick="dDel(${n})">🗑 Remove line</button></div></div>`).join('')}
<div class="row" style="margin-top:12px"><label>Add product<select id="dv_add"><option value="custom">Custom line (type your own)</option>${D.items.filter(sellable).slice(0,300).map(i=>`<option value="${i.id}">${esc(label(i))} ${esc(i.serial||'')}</option>`).join('')}</select></label><button class="g" onclick="dAdd()">＋ Add line</button></div>
<div class="row" style="margin-top:12px"><button class="b" onclick="dSave()">Save invoice</button><button class="g" onclick="einv=null;dv=null;render()">Cancel</button></div></div>`:'';
return (last?rcptHTML():'')+ed2+`<div class="card"><div class="row"><label>Search invoices<input value="${esc(q)}" ${SRCH} placeholder="invoice no, customer, item..."></label>${ced()?'<button class="b" onclick="tab=\'POS\';window.fresh=1;render()">＋ Create invoice</button>':''}</div></div>
<div class="card sc"><table><tr><th>Invoice</th><th>Date</th><th>Customer</th><th>Items</th><th>Payment</th><th>By</th><th>Total</th><th>Balance</th><th></th></tr>
${L.map(o=>`<tr><td><b>${esc(o.inv)}</b></td><td>${o.date}</td><td>${esc(o.customer)}</td><td>${esc(o.lines.map(l=>l.name+(l.qty>1?' ×'+l.qty:'')).join(', ').slice(0,60))}</td><td>${o.pay||''}</td><td>${esc(o.by)}</td><td><b>${money(o.total)}</b></td><td class="${o.bal>0?'warn':'m'}">${o.bal>0?money(o.bal):'Paid'}</td>
<td><button class="g" style="padding:5px 10px" onclick="viewInv('${o.inv}')">View / Print</button>${ced()&&o.bal>0?` <button class="g" style="padding:5px 10px" onclick="payInv('${o.inv}')">Receive payment</button>`:''}${ced()?` <button class="g" style="padding:5px 10px" onclick="editInvStart('${o.inv}')">Edit</button> <button class="x" onclick="delInv('${o.inv}')">🗑</button>`:''}</td></tr>`).join('')||'<tr><td class="m">No invoices yet</td></tr>'}</table></div>`}
async function payInv(inv){if(!ced())return;const o=invList().find(x=>x.inv==inv),v=await ask('Balance due: '+money(o.bal)+'\nAmount received now (Rs.)',{input:1,type:'number'});if(!v||!(+v>0))return;
const f=o.lines[0];f.paid=Math.min(o.total,o.paid+(+v));if(f.adj===undefined){f.adj=0;f.disc=0;f.shp=0}save();flash('Payment recorded. Balance: '+money(Math.max(0,o.total-f.paid)))}
function viewInv(inv){last=invModel(invList().find(x=>x.inv==inv));einv=null;dv=null;render();scrollTo(0,0)}
async function delInv(inv){if(!ced())return;if(!(await ask('Delete invoice '+inv+'?')))return;const back=await ask('Put the items back into stock?',{yes:'Yes, restore stock',no:'No, leave stock'});
D.sales.filter(s=>s.inv==inv).forEach(s=>{if(back)restoreLine(s)});D.sales=D.sales.filter(s=>s.inv!=inv);if(last&&last.inv==inv)last=null;save();flash('Invoice '+inv+' deleted')}
function editInvStart(inv){if(!ced())return;const o=invList().find(x=>x.inv==inv);dv={orig:o.inv,inv:o.inv,date:o.date,customer:o.customer,phone:o.phone,addr:o.addr,ship:o.ship||'Same as recipient',pay:o.pay||'Cash',disc:o.disc||0,shp:o.shp||0,paid:o.bal>0?o.paid:'',lines:o.lines.map(l=>({itemId:D.items.some(i=>i.id==l.itemId)?l.itemId:null,name:l.name,desc:l.desc||l.name,warr:l.warr||'',qty:l.qty,price:l.price}))};last=null;einv=1;render();scrollTo(0,0)}
function dsync(){if(!dv)return;['inv','date','customer','phone','addr','ship','pay','disc','shp','paid'].forEach(k=>{const e=$('#dv_'+k);if(e)dv[k]=e.value});dv.lines.forEach((l,n)=>{if($('#dl_d'+n)){l.desc=$('#dl_d'+n).value;l.warr=$('#dl_w'+n).value;l.qty=Math.max(1,+$('#dl_q'+n).value||1);l.price=+$('#dl_p'+n).value||0}})}
function dDel(n){dsync();dv.lines.splice(n,1);render()}
function dAdd(){dsync();const id=val('dv_add');if(id=='custom')dv.lines.push({itemId:null,name:'Custom item',desc:'Custom item',warr:'',qty:1,price:0});
else{const i=D.items.find(x=>x.id==id);if(dv.lines.some(l=>l.itemId==id&&i.type=='laptop'))return flash('Laptop already on this invoice');dv.lines.push({itemId:id,name:label(i),desc:specDesc(i),warr:i.type=='laptop'?set().warr:'',qty:1,price:+i.price||0})}render()}
function dSave(){if(!ced())return;dsync();if(!dv.lines.length)return flash('An invoice needs at least one line (or delete the whole invoice)');
if(!dv.inv.trim())return flash('Enter an invoice number');if(invList().some(o=>o.inv==dv.inv&&o.inv!=dv.orig))return flash('Invoice number already used');
const snap=JSON.stringify({i:D.items,s:D.sales});D.sales.filter(s=>s.inv==dv.orig).forEach(restoreLine);D.sales=D.sales.filter(s=>s.inv!=dv.orig);
const sub=dv.lines.reduce((a,l)=>a+l.qty*l.price,0),dd=Math.min(sub,Math.max(0,+dv.disc||0)),sh=Math.max(0,+dv.shp||0),net=sub-dd+sh,pd=(dv.paid===''||dv.paid==null)?net:Math.max(0,+dv.paid||0);
for(const [n,l] of dv.lines.entries()){if(l.itemId){const i=D.items.find(x=>x.id==l.itemId);
if(!i||+i.qty<l.qty||(i.type=='laptop'&&!sellable(i))){const r=JSON.parse(snap);D.items=r.i;D.sales=r.s;return flash('Not enough stock for '+l.name)}
i.qty-=l.qty;if(i.type=='laptop'){i.status='Purchased';i.customer=dv.customer;i.invoice=dv.inv;i.date=dv.date}}
D.sales.push({id:uid(),inv:dv.inv.trim(),date:dv.date,customer:dv.customer.trim()||'Walk-in',phone:dv.phone,addr:dv.addr,ship:dv.ship,pay:dv.pay,by:me.user,itemId:l.itemId,name:l.name,desc:l.desc,warr:l.warr,qty:l.qty,price:l.price,total:l.qty*l.price,...(n===0?{adj:sh-dd,disc:dd,shp:sh,paid:pd}:{})})}
dv=null;einv=null;last=null;save();flash('Invoice saved')}
let tf={s:'',inv:'',m:''};
const TC={Open:'#ff7a59','In progress':'#f5a524',Resolved:'#20c997'};
function tHTML(t){return `<div class="card"><div class="row" style="justify-content:space-between;align-items:center"><div><b>${t.no} · ${esc(t.subject)}</b><div class="m">${esc(t.byName)} · ${new Date(t.at).toLocaleString()}${t.inv?' · Invoice '+esc(t.inv):''}</div></div><span class="tag" style="background:${TC[t.status]}22;color:${TC[t.status]}">${t.status}</span></div>
<p style="white-space:pre-wrap;margin:10px 0">${esc(t.msg)}</p>${t.replies.map(r=>`<div class="ci" style="margin-left:${r.by==t.by?0:26}px"><div><b>${esc(r.name)}</b> <span class="m">${new Date(r.at).toLocaleString()}</span><div style="white-space:pre-wrap">${esc(r.text)}</div></div></div>`).join('')}
<div class="row"><label>Reply<input id="tr_${t.id}" placeholder="Write a reply…" onkeydown="if(event.key=='Enter')tReply('${t.id}')"></label><button class="g" onclick="tReply('${t.id}')">Send</button></div>
${adm()?`<div class="row" style="margin-top:10px">${['Open','In progress','Resolved'].map(s=>`<button class="${t.status==s?'b':'g'}" onclick="tStatus('${t.id}','${s}')">${s}</button>`).join('')}${t.inv&&invList().some(o=>o.inv==t.inv)?`<button class="g" onclick="tab='Invoices';q='';window.fresh=1;editInvStart('${t.inv}')">✎ Open invoice</button>`:''}<button class="x" onclick="tDel('${t.id}')">🗑 Delete</button></div>`:''}</div>`}
function vSupport(){const L=(adm()?TK():TK().filter(t=>t.by==me.user)).slice().reverse(),invs=invList().filter(o=>adm()||o.by==me.user).slice(0,40);
return (adm()?`<div class="card"><h3>🎫 Support tickets</h3><span class="m">Billing mistakes reported by your team appear here. Reply, change the status, or open the invoice to fix it.</span></div>`:`<div class="card"><h3>🎫 Report a billing mistake</h3><div class="row"><label>Subject<input value="${esc(tf.s)}" oninput="tf.s=this.value" placeholder="e.g. Wrong price on invoice"></label>
<label>Related invoice<select onchange="tf.inv=this.value"><option value="">— none —</option>${invs.map(o=>`<option ${o.inv==tf.inv?'selected':''}>${esc(o.inv)}</option>`).join('')}</select></label></div>
<label style="margin-top:8px">Message to admin<textarea rows="3" oninput="tf.m=this.value" placeholder="Describe what went wrong…">${esc(tf.m)}</textarea></label><button class="b" style="margin-top:10px" onclick="newTicket()">Send to admin</button></div>`)+(L.map(tHTML).join('')||'<div class="card m">No tickets yet</div>')}
function newTicket(){if(!tf.s.trim()||!tf.m.trim())return flash('Please add a subject and a message');const n=Math.max(0,...TK().map(t=>+t.no.slice(2)||0))+1;
TK().push({id:uid(),no:'T-'+String(n).padStart(3,'0'),by:me.user,byName:me.name,subject:tf.s.trim(),inv:tf.inv,msg:tf.m.trim(),status:'Open',at:Date.now(),replies:[]});tf={s:'',inv:'',m:''};save();flash('Ticket sent to the admin ✔')}
function tReply(id){const t=TK().find(x=>x.id==id),v=$('#tr_'+id).value.trim();if(!t||!v)return;if(!adm()&&t.by!=me.user)return;t.replies.push({by:me.user,name:me.name,text:v,at:Date.now()});
if(adm()&&t.status=='Open')t.status='In progress';if(!adm()&&t.status=='Resolved')t.status='Open';save();render()}
function tStatus(id,s){if(!adm())return;TK().find(x=>x.id==id).status=s;save();render()}
async function tDel(id){if(!adm()||!(await ask('Delete this ticket?')))return;D.tickets=TK().filter(x=>x.id!=id);save();render()}
function vSet(){const S=set(),F=[['name','Company name'],['sub','Town / subtitle'],['tel','Tel'],['fax','Fax'],['email','Email'],['web','Web'],['warr','Default warranty line'],['thanks','Thank-you line'],['next','Next invoice number']];
return `<div class="card"><h3>Company &amp; invoice settings</h3><div class="row">${F.map(([k,t])=>`<label>${t}<input id="se_${k}" value="${esc(S[k])}"></label>`).join('')}</div><div class="row" style="margin-top:12px"><button class="b" onclick="saveSet()">Save settings</button></div></div>
<div class="card"><h3>Danger zone</h3><button class="g" onclick="clearHist()">🗑 Delete all invoices / sales history</button></div>`}
function saveSet(){if(!adm())return;const S=set();['name','sub','tel','fax','email','web','warr','thanks'].forEach(k=>S[k]=val('se_'+k));S.next=+val('se_next')||S.next;save();flash('Settings saved')}
async function clearHist(){if(!adm())return;if(!(await ask('Delete ALL invoices and sales history?')))return;if(!(await ask('Really delete everything? This cannot be undone.',{yes:'Yes, delete all'})))return;
const back=await ask('Put all sold items back into stock?',{yes:'Yes, restore stock',no:'No, leave stock'});if(back)D.sales.forEach(restoreLine);D.sales=[];last=null;save();flash('Sales history cleared')}
async function myPw(){const o=await ask('Enter your current password',{input:1,type:'password'});if(o==null)return;if(await H(o)!=me.pass)return flash('Wrong current password');const p=await ask('Enter a new password',{input:1,type:'password'});if(!p)return;me.pass=await H(p);save();flash('Your password was changed')}
function updUser(id,k,v){if(!adm())return;v=v.trim();const u=D.users.find(x=>x.id==id);if(!v)return render();if(k=='user'&&D.users.some(x=>x.id!=id&&x.user.toLowerCase()==v.toLowerCase()))return flash('Username already exists');u[k]=v;save();render()}
function vUsers(){return `<div class="card"><h3>Add user</h3><div class="row"><label>Name<input id="un"></label><label>Username<input id="uu"></label><label>Password<input id="up" type="password"></label>
<label>Role<select id="ur"><option value="sales">Sales boy</option><option value="admin">Admin</option></select></label><button class="b" onclick="addUser()">Add user</button></div></div>
<div class="card sc"><table><tr><th>Name</th><th>Username</th><th>Role</th><th>Can log in</th><th>Extra pages</th><th>Edit / delete rights</th><th></th></tr>${D.users.map(u=>{const a=u.role=='admin';return `<tr><td><input value="${esc(u.name)}" onchange="updUser('${u.id}','name',this.value)"></td><td><input value="${esc(u.user)}" onchange="updUser('${u.id}','user',this.value)"></td>
<td><select onchange="setRole('${u.id}',this.value)"><option value="admin" ${a?'selected':''}>Admin</option><option value="sales" ${!a?'selected':''}>Sales boy</option></select></td>
<td><input type="checkbox" ${u.active!==false?'checked':''} ${u.id==me.id?'disabled':''} onchange="uflag('${u.id}','active',this.checked)"></td>
<td>${a?'<span class="m">Everything</span>':EXTRA.map(t=>`<label class="chk"><input type="checkbox" ${(u.tabs||[]).includes(t)?'checked':''} onchange="utab('${u.id}','${t}',this.checked)">${t}</label>`).join('')}</td>
<td>${a?'<span class="m">Full</span>':`<label class="chk"><input type="checkbox" ${u.edit?'checked':''} onchange="uflag('${u.id}','edit',this.checked)">Can edit &amp; delete</label>`}</td>
<td><button class="g" style="padding:5px 10px" onclick="pw('${u.id}')">Change password</button> <button class="x" onclick="delUser('${u.id}')">✕</button></td></tr>`}).join('')}</table></div>
<div class="m">A Sales boy can only choose products, set the price and print the bill, plus send support tickets. Tick <b>Extra pages</b> or <b>Can edit &amp; delete</b> to give a person more power. Untick <b>Can log in</b> to block an account.</div>`}
function uflag(id,k,v){if(!adm())return;const u=D.users.find(x=>x.id==id);if(k=='active'&&!v&&u.role=='admin'&&D.users.filter(x=>x.role=='admin'&&x.active!==false).length<2)return flash('Keep at least one active admin');u[k]=v;save();render()}
function utab(id,t,v){if(!adm())return;const u=D.users.find(x=>x.id==id);u.tabs=(u.tabs||[]).filter(x=>x!=t);if(v)u.tabs.push(t);save()}
async function addUser(){if(!adm())return;const u=val('uu').trim(),p=val('up');if(!u||!p||!val('un').trim())return flash('Fill in name, username and password');
if(D.users.some(x=>x.user.toLowerCase()==u.toLowerCase()))return flash('Username already exists');
D.users.push({id:uid(),name:val('un').trim(),user:u,pass:await H(p),role:val('ur')});save();flash('User added')}
async function pw(id){if(!adm())return;const p=await ask('Enter a new password for this user',{input:1,type:'password'});if(!p)return;D.users.find(u=>u.id==id).pass=await H(p);save();flash('Password changed')}
function setRole(id,r){const u=D.users.find(x=>x.id==id);if(u.role=='admin'&&r!='admin'&&D.users.filter(x=>x.role=='admin').length<2){flash('Keep at least one admin');return}u.role=r;save();if(u.id==me.id){me=u}flash('Role updated')}
async function delUser(id){if(id==me.id)return flash("You can't delete yourself");const u=D.users.find(x=>x.id==id);if(u.role=='admin'&&D.users.filter(x=>x.role=='admin').length<2)return flash('Keep at least one admin');
if(await ask('Delete user '+u.user+'?')){D.users=D.users.filter(x=>x.id!=id);save();render()}}

async function doLogin(){const u=D.users.find(x=>x.user.toLowerCase()==val('lu').trim().toLowerCase());
if(u&&u.pass==await H(val('lp'))){if(u.active===false){$('#le').textContent='This account is disabled. Please contact the admin.';return}me=u;try{(val('lr')&&$('#lr').checked?localStorage:sessionStorage).setItem('falcon_me',u.id)}catch(e){}tab=u.role=='admin'?'Dashboard':'POS';msg='Welcome, '+u.name+'!';$('#lp').value='';$('#le').textContent='';window.fresh=1;showApp()}
else $('#le').textContent='Wrong username or password'}
function togglePw(){const e=$('#lp');e.type=e.type=='password'?'text':'password'}
function forgot(){$('#le').style.color='#475569';$('#le').textContent='Please ask your admin to reset your password.'}
function logout(){me=null;cart=[];last=null;try{sessionStorage.removeItem('falcon_me');localStorage.removeItem('falcon_me')}catch(e){}showApp()}
function showApp(){$('#login').classList.toggle('hid',!!me);document.querySelector('.shell').classList.toggle('hid',!me);if(me)render();else{$('#lu').value='';$('#lp').value='';$('#le').textContent='';$('#le').style.color=''}}
async function boot(){if(!D.users||!D.users.length){D.users=[{id:uid(),name:'Administrator',user:'admin',pass:await H('admin123'),role:'admin'},{id:uid(),name:'Sales Boy',user:'sales',pass:await H('sales123'),role:'sales'}];save()}
try{const s=sessionStorage.getItem('falcon_me')||localStorage.getItem('falcon_me');if(s){const u=D.users.find(x=>x.id==s);if(u&&u.active!==false)me=u}}catch(e){}showApp()}

function render(){if(me){const f=D.users.find(u=>u.id==me.id);if(!f||f.active===false){me=null;showApp();return}me=f}if(!me)return;cart=cart.filter(c=>D.items.some(i=>i.id==c.id));const T=myTabs(),nOpen=adm()?TK().filter(t=>t.status!='Resolved').length:0;if(!T.includes(tab))tab=T[0];
$('#nav').innerHTML=T.map(t=>`<button class="${t==tab?'on':''}" onclick="tab='${t}';msg='';q='';cat='All';st='All';ab='All';ed=null;einv=null;window.fresh=1;render();scrollTo(0,0)"><span>${IC[t]}</span>${t}${t=='Support'&&nOpen?`<em class="bdg">${nOpen}</em>`:''}</button>`).join('');
$('#ttl').textContent=tab;$('#who').textContent=me.name+' · '+(me.role=='admin'?'Admin':'Sales');$('#app').className=window.fresh?'in':'';window.fresh=0;
const V={Dashboard:vDash,POS:vPOS,Available:vAvail,Stock:vStock,Invoices:vInv,Repairs:vRepairs,'Monthly Report':vReport,Users:vUsers,Support:vSupport,Settings:()=>vSet()+vBackup()},a=document.activeElement,id=a&&a.id;
$('#app').innerHTML=(window.saveFail?'<div class="card warn">⚠ Could not save: browser storage is full or blocked. Download a backup now (Settings) and remove large photos.</div>':'')+(msg?`<div class="card" style="border-color:var(--p)">${esc(msg)}</div>`:'')+V[tab]();if(tab=='POS')updTot();if(window.refocus){window.refocus=0;const e0=document.querySelector('main input[oninput]');if(e0)e0.focus()}
const inp=document.querySelector('main input[oninput]');if(q&&inp&&a&&a.tagName=='INPUT'&&!id){inp.focus();inp.setSelectionRange(q.length,q.length)}}

if(!D.seeded){if(!D.items.length){try{doImport(SEED)}catch(e){}}D.seeded=true;save()}
msg='';boot();
