const COLORS={Materia:'#d91330',Equilibrio:'#25b63d',Cambiamento:'#efb91c',Forza:'#8a12c5',Energia:'#1825d9',Spirito:'#65121b'};
const SHORT={Materia:'MA',Equilibrio:'EQ',Cambiamento:'CA',Forza:'FO',Energia:'EN',Spirito:'SP'};
const TYPES={POZIONE:['Materia','Equilibrio'],VELENO:['Materia','Cambiamento'],PLaccatura:['Forza','Equilibrio'],TAGLIO:['Forza','Cambiamento'],RUNA:['Energia','Materia'],PERGAMENA:['Equilibrio','Energia'],GRIMORIO:['Energia','Spirito']};
const RECIPES=[
['Cura ferite base','Materia','Equilibrio','Cambiamento','','','Equilibrio','GUARIGIONE! 1! no morente','','POZIONE','BASE'],
['Siero minore della coagulazione','Materia','Energia','Spirito','','','Equilibrio','Su morente il conteggio riparte','','POZIONE','BASE'],
['Concentrato di carota','Materia','Cambiamento','Materia','','','Equilibrio','IMMUNE! a CECITÀ! per 10 min o 1 comb.','','POZIONE','BASE'],
['Concentrato di concentrazione','Materia','Spirito','Spirito','','','Equilibrio','IMMUNE! a CONFUSIONE! per 10 min o 1 comb.','','POZIONE','BASE'],
['Sputo di aculei','Materia','Energia','Cambiamento','','','Equilibrio','CRITICO! fino a 3 bersagli entro 10 metri, poi subisci i CRITICO! fatti','','POZIONE','BASE'],
['Mano pesante','Materia','Materia','Materia','','','Equilibrio','ARGENTO! con armi per 10 min o 1 comb.','','POZIONE','BASE'],
['Anima caliente','Materia','Forza','Materia','','','Equilibrio','FUOCO! con armi per 10 min. o 1 comb.','','POZIONE','BASE'],
['Sangue freddo','Materia','Energia','Materia','','','Equilibrio','GELO! con armi per 10 min. o 1 comb.','','POZIONE','BASE'],
['Neutralizzatore minore','Materia','Cambiamento','Cambiamento','Forza','','Equilibrio','NEUTRALIZZA! VELENO!','','POZIONE','MEDIO'],
['Guarigione minore','Materia','Cambiamento','Cambiamento','Materia','','Equilibrio','GUARIGIONE! 5!','GUARIGIONE! 1! a morente','POZIONE','MEDIO'],
['Cura ferite medio','Materia','Cambiamento','Energia','Forza','','Equilibrio','GUARIGIONE! 3! no morente','','POZIONE','MEDIO'],
['Cordiale','Materia','Cambiamento','Energia','Spirito','','Equilibrio','OPERA NEUTRA','FORSE IMMUNITÀ argento (TEORIA ERRATA)','POZIONE','MEDIO'],
['Concentrato analgesico','Materia','Energia','Energia','Spirito','','Equilibrio','IMMUNE! a DOLORE! per 10 min. o per 1 comb.','','POZIONE','MEDIO'],
['Gela budella','Materia','Energia','Equilibrio','Spirito','','Equilibrio','IMMUNE! a FUOCO! per 10 min. o per 1 comb.','','POZIONE','MEDIO'],
['Forza superiore','Materia','Equilibrio','Forza','Materia','','Equilibrio','Il PG ha la forza di 4 persone, per spostare oggetti o persone','','POZIONE','MEDIO'],
['Estratto di bava di fata','Materia','Forza','Forza','Forza','','Equilibrio','Recupera 1 Mana','','POZIONE','MEDIO'],
['Concentrato di adrenalina','Materia','Forza','Forza','Spirito','','Equilibrio','IMMUNE! a PARALISI! per 10 min. o 1 comb.','','POZIONE','MEDIO']].map((r,i)=>({id:i,name:r[0],parts:[r[1],r[2],r[3],r[4],r[5],r[6]].filter(Boolean),effect:r[7],extra:r[8],type:r[9],level:r[10]}));
const ALIUM=[['Acquamarina','Magia','Fuoco',1,'Converte Confusione in Artefatto Ciop'],['Supporto minore','Magia','Fuoco',2,'Creazione supporto minore per gemme'],['Agata','Magia','Fuoco',3,'Converte Cecità in Artefatto Ciop'],['Alabastro','Magia','Fuoco',4,'Converte Paralisi in Confusione'],['Ambra','Magia','Acqua',1,'Converte Sonno in Confusione'],['Ametista','Magia','Acqua',2,'Converte Dolore in Confusione'],['Avorio','Magia','Acqua',3,'Converte Silenzio in Artefatto Ciop'],['Corallo','Magia','Acqua',4,'Con max PR, gira X Mana per guadagnare X PR. No cura.'],['Eliolite','Fuoco','Aria',1,'Converte Crash in Artefatto Repulsione. Serve scudo.'],['Ematite','Fuoco','Aria',2,'Riflesso a Confusione'],['Giada','Fuoco','Aria',3,'Riflesso a Terra'],['Giadeite','Fuoco','Aria',4,'Riflesso a Cecità'],['Giaietto','Acqua','Aria',1,'Riflesso a Dolore'],['Granati','Acqua','Aria',2,'Converte Paralisi in Silenzio'],['Iolite','Acqua','Aria',3,'Riflesso a Silenzio'],['Lapislazzuli','Acqua','Aria',4,'Riflesso a Disarmo'],['Madreperla','Magia','Magia',1,'Prosciuga energia magica counter (da controllare)'],['Ossidiana','Acqua','Acqua',1,'Prosciuga energia magica counter (da controllare)'],['Rubino','Aria','Aria',1,'Allunga tempo di sanguinamento (+120 sec da Morente)'],['Smeraldo','Aria','Aria',2,'Puoi slegarti (1 Mana, Giorn.?)'],['Topazio','Aria','Aria',3,'Vedi Attenuati per 15 min., usa Giorn.'],['Turchese','Aria','Aria',4,'Guarigione su sé stessi dopo 10 sec. con 1 mana']].map(x=>({name:x[0],e1:x[1],e2:x[2],gen:x[3],effect:x[4]}));
const $=s=>document.querySelector(s);const main=$('#main');let tab='home',type='POZIONE',size='BASE',parts=['Materia','Equilibrio','Cambiamento','Equilibrio'];const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const dots=a=>'<div class="sources">'+a.map(s=>`<span class="dot" style="background:${COLORS[s]||'#444'}" title="${s}">${SHORT[s]||s.slice(0,2)}</span>`).join('')+'</div>';
function switchTab(t){tab=t;document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===t));render();scrollTo(0,0)}document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
function home(){main.innerHTML=`<div class="hero"><div class="hero-title">Ricettario<br>delle Opere</div><div class="crest c1"><img src="assets/morker.png" alt="Morker"></div><div class="crest c2"><img src="assets/luxia.png" alt="Luxia"></div><div class="crest c3"><img src="assets/solcarune.png" alt="Solcarune"></div><div class="crest c4"><img src="assets/rivargento.png" alt="Rivargento"></div><div class="sun"><img src="assets/solaris.png" alt="Solaris"></div><div class="hero-actions"><button data-go="recipes">▤ Sfoglia le opere</button><button data-go="calc">◎ Consulta la ruota</button><button data-go="alium">◇ Archivio dell'Alium</button></div></div>`;document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>switchTab(b.dataset.go))}
function recipes(){main.innerHTML=`<section class="screen"><h1 class="h">Ricettario</h1><p class="muted">Prima selezione di ricette effettivamente nominate nel foglio “Ricette”. La versione completa verrà importata nella fase dati.</p><input id="q" type="search" placeholder="Cerca opera o effetto…"><div class="filters"><select id="rt"><option value="">Tutte le tipologie</option>${['POZIONE','VELENO','RUNA','PERGAMENA','GRIMORIO','PLaccatura','TAGLIO'].map(x=>`<option>${x}</option>`).join('')}</select><select id="rl"><option value="">Tutte le taglie</option><option>BASE</option><option>MEDIO</option><option>AVANZATO</option></select></div><div id="list"></div></section>`;['q','rt','rl'].forEach(id=>$('#'+id).oninput=filterRecipes);filterRecipes()}
function filterRecipes(){const q=$('#q').value.toLowerCase(),t=$('#rt').value,l=$('#rl').value;const rows=RECIPES.filter(r=>(!t||r.type===t)&&(!l||r.level===l)&&(!q||(r.name+' '+r.effect).toLowerCase().includes(q)));$('#list').innerHTML=`<p class="counter">${rows.length} opere visualizzate</p>`+rows.map(r=>`<details class="recipe"><summary><div class="line"><span class="name">${esc(r.name)}</span><span class="tag">${r.level}</span></div><div class="muted">${r.type} · ${r.parts.length} ingredienti</div></summary>${dots(r.parts)}<p class="info">${esc(r.effect)}</p>${r.extra?`<p class="muted">Nota: ${esc(r.extra)}</p>`:''}</details>`).join('')}
function opts(selected){return Object.keys(COLORS).map(s=>`<option ${s===selected?'selected':''}>${s}</option>`).join('')}
function resetParts(){const fixed=TYPES[type]||TYPES.POZIONE;parts=Array(size==='BASE'?4:size==='MEDIO'?5:6).fill('Equilibrio');parts[0]=fixed[0];parts[parts.length-1]=fixed[1]}
function calc(){main.innerHTML=`<section class="screen"><h1 class="h">Ruota del Creazionismo</h1><p class="muted">Configura la combinazione. Il riconoscimento confronta le Fonti con le ricette note; la simulazione dei giri è ancora da validare.</p><div class="panel"><div class="filters"><select id="size"><option value="BASE">Base · 4 passaggi</option><option value="MEDIO">Media · 5 passaggi</option><option value="AVANZATO">Avanzata · 6 passaggi</option></select><select id="type">${Object.keys(TYPES).map(s=>`<option value="${s}">${s}</option>`).join('')}</select></div><div id="steps"></div></div><div id="results"></div></section>`;$('#size').value=size;$('#type').value=type;$('#size').onchange=e=>{size=e.target.value;resetParts();steps()};$('#type').onchange=e=>{type=e.target.value;resetParts();steps()};steps()}
function steps(){$('#steps').innerHTML=parts.map((s,i)=>`<div class="step"><label>${i===0?'Apertura':i===parts.length-1?'Chiusura':'Passaggio '+(i+1)}</label><select data-i="${i}" ${i===parts.length-1?'disabled':''}>${opts(s)}</select><span class="dot" style="background:${COLORS[s]}">${SHORT[s]}</span></div>`).join('')+`<p class="muted">La chiusura è fissa: ${parts.at(-1)}, generazione 1. L'apertura è modificabile.</p>`;document.querySelectorAll('#steps select').forEach(el=>el.onchange=e=>{parts[+e.target.dataset.i]=e.target.value;steps()});results()}
// Ruota: trascrizione esatta delle 15 posizioni per generazione dal foglio "Ruota".
const WHEEL_ROWS=[
['—','EQ','—','EN','FO','CA','MA','SP','—','EQ','MA','EN','CA','SP','FO'],
['EN','—','FO','EQ','SP','—','FO','MA','EQ','CA','—','EN','SP','CA','MA'],
['CA','FO','—','MA','EN','—','EQ','SP','EQ','SP','MA','—','CA','FO','EN'],
['MA','—','EN','—','CA','EQ','—','EN','MA','FO','CA','EQ','SP','SP','FO']
];
const GENPATHS={BASE:[[4,3,2,1],[2,3,2,1],[2,1,2,1]],MEDIO:[[1,2,1,2,1],[1,2,3,2,1],[3,2,1,2,1],[3,2,3,2,1],[3,4,3,2,1]],AVANZATO:[[2,1,2,1,2,1],[2,1,2,3,2,1],[2,3,2,1,2,1],[2,3,2,3,2,1],[2,3,4,3,2,1],[4,3,2,1,2,1],[4,3,2,3,2,1],[4,3,4,3,2,1]]};
const PER_STEP={1:3,2:6,3:9,4:12};
function permutations(a){if(a.length<2)return[a];return a.flatMap((x,i)=>permutations(a.filter((_,j)=>j!==i)).map(p=>[x,...p]))}
function scanTo(source,gen,from){const row=WHEEL_ROWS[gen-1];let first=-1,second=-1;
  for(let step=1;step<=30;step++){
    let pos=from===0?((step-1)%15):((from+step-1)%15);
    if(row[pos]===SHORT[source]){if(first<0)first=step;else{second=step;break}}
  }
  if(first<0||second<0)return null;
  return [first,second];
}
function candidate(seq,gens,choices){let pos=0,total=0,works=0,steps=[];
  for(let i=0;i<seq.length;i++){
    const g=gens[i],find=scanTo(seq[i],g,pos);if(!find)return null;
    const w=find[choices[i]-1];if(w<1||w>15)return null;
    pos=(pos+w-1)%15+1;
    const qty=Math.ceil(w/PER_STEP[g]);total+=qty;works+=w;
    steps.push({source:seq[i],gen:g,work:w,qty,arrival:pos,choice:choices[i]});
  }
  return {total,works,steps,gens,seq};
}
function computeTop10(sources,level){const gensList=GENPATHS[level],centers=sources.slice(1,-1),orders=permutations(centers.map((_,i)=>i));
 const best=[];let count=0;
 for(const gens of gensList)for(const order of orders){const seq=[sources[0],...order.map(i=>centers[i]),sources.at(-1)];
   for(let mask=0;mask<(1<<seq.length);mask++){
     const choices=seq.map((_,i)=>((mask>>i)&1)+1),c=candidate(seq,gens,choices);
     if(!c)continue;count++;best.push(c);
   }
 }
 best.sort((a,b)=>a.total-b.total||a.works-b.works||a.gens.join('').localeCompare(b.gens.join('')));
 return {best:best.slice(0,10),count};
}
function results(){
 const recognized=RECIPES.filter(r=>r.level===size&&r.type===type&&r.parts.length===parts.length&&r.parts[0]===parts[0]&&r.parts.at(-1)===parts.at(-1)&&r.parts.slice(1,-1).slice().sort().join('|')===parts.slice(1,-1).slice().sort().join('|'));
 const art=['RUNA','PERGAMENA','GRIMORIO'].includes(type);
 const {best,count}=computeTop10(parts,size);
 $('#results').innerHTML=`<h2 class="h">Le 10 soluzioni più economiche</h2><div class="panel"><div class="line"><b>${recognized.length?esc(recognized[0].name):'Opera non identificata'}</b><span class="badge ${recognized.length?'':'unknown'}">${recognized.length?'Scoperta':'Sconosciuta'}</span></div><p class="muted">${recognized.length?esc(recognized[0].effect):'Nessun effetto noto nel ricettario locale importato.'}</p>${art?'<p class="warning">Artimagia: validità del sistema ancora da verificare.</p>':''}<p class="muted">Le Fonti centrali possono essere riordinate. La chiusura è sempre in generazione 1.</p></div>
 <p class="muted">${count} percorsi calcolabili · ordinati per quantità di ingredienti, poi per numero totale di lavorazioni. Conteggi ricavati dalle tabelle «Ruota» e «Regole» di Brumo; da confrontare con i risultati del foglio originale.</p>
 ${best.length?best.map((c,i)=>`<details class="recipe"><summary><div class="result-heading"><span class="name">${i+1}. Soluzione</span><span class="tag">${c.total} ingredienti · ${c.works} lavorazioni</span></div><div class="muted">Gen. ${c.gens.join(' → ')}</div>${dots(c.seq)}</summary><div class="calc-stats"><div><strong>${c.total}</strong><small>Ingredienti totali</small></div><div><strong>${c.works}</strong><small>Lavorazioni totali</small></div></div><div class="work-list">${c.steps.map((s,j)=>`<div><b>${j+1}. ${esc(s.source)} · Gen. ${s.gen}</b><p>${s.qty} ingredienti · ${s.work} lavorazioni</p><small>Pallino ${s.arrival} · ${s.choice}° occorrenza</small></div>`).join('')}</div><img class="wheel-original" src="assets/ruota-originale.png" alt="Ruota originale del Creazionismo fornita dall'autore"><p class="notice">La ruota mostrata è l'immagine originale. La posizione di arrivo di ogni passaggio è indicata sopra. La sovrapposizione grafica del percorso è prevista in un successivo aggiornamento.</p></details>`).join(''):'<div class="notice">Nessun percorso calcolabile con le regole attuali. Questo non dimostra che l’opera sia impossibile.</div>'}
 <p class="notice">Nota: i calcoli sono una trasposizione delle regole di Brumo, non ancora certificata da un confronto sistematico per tutte le combinazioni. Il riconoscimento delle scoperte usa ancora il campione locale, non l’intero foglio Google.</p>`;
}
function alium(){main.innerHTML=`<section class="screen"><h1 class="h">Archivio dell'Alium</h1><p class="muted">Prime combinazioni note dalla scheda “Lista alium ordinata”.</p><input id="aq" type="search" placeholder="Cerca gemma o effetto…"><div id="alist"></div></section>`;$('#aq').oninput=filterAlium;filterAlium()}
function filterAlium(){let q=$('#aq').value.toLowerCase();let a=ALIUM.filter(x=>(x.name+' '+x.effect).toLowerCase().includes(q));$('#alist').innerHTML=`<p class="counter">${a.length} combinazioni visualizzate</p>`+a.map(x=>`<details class="recipe"><summary><div class="line"><span class="name">◇ ${esc(x.name)}</span><span class="tag">Gen. ${x.gen}</span></div><div class="muted">Alium · ${x.e1} · ${x.e2}</div></summary><p class="info">${esc(x.effect)}</p></details>`).join('')}
function render(){({home,recipes,calc,alium}[tab])()}resetParts();render();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
