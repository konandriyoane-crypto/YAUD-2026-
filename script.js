/* script.js - improved UX, completed templates, seat selection (local fallback) and robust event handling */

let guests = [];

// load guests with error handling and cache-busting when needed
async function loadGuests(){
  try{
    const res = await fetch('guests.json', {cache: 'no-cache'});
    if(!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    guests = Array.isArray(data) ? data : [];
  }catch(err){
    console.warn('Erreur chargement invités :', err);
    guests = [];
  }
}

// kick off guest loading as early as possible
loadGuests();

// helper to add/remove classes with animation-safe timing
function addClass(el, cls){ if(el) el.classList.add(cls); }
function removeClass(el, cls){ if(el) el.classList.remove(cls); }

// Enter universe: graceful fade + accessibility focus
function enterUniverse(){
  const hero = document.querySelector('.hero');
  const universe = document.getElementById('universe');
  if(!hero || !universe) return;

  hero.classList.add('fade-out');

  setTimeout(()=>{
    hero.style.display = 'none';
    hero.setAttribute('aria-hidden','true');

    universe.classList.remove('hidden');
    universe.classList.add('universe','fade-in');
    universe.setAttribute('aria-hidden','false');

    const firstCard = universe.querySelector('.app-card');
    if(firstCard){ firstCard.setAttribute('tabindex','0'); firstCard.focus(); }

    window.scrollTo({ top:0, behavior:'smooth' });
  }, 380);
}

// Navigation between the sections
function showSection(id){
  document.querySelectorAll('.content-section').forEach(section=>{
    section.style.display = 'none';
    section.setAttribute('aria-hidden','true');
  });

  const section = document.getElementById(id);
  if(!section) return;
  section.style.display = 'block';
  section.setAttribute('aria-hidden','false');
  section.setAttribute('tabindex','-1');
  section.focus();
  section.scrollIntoView({ behavior:'smooth' });
}

// Normalize for search
function normalize(text){
  if(!text) return '';
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[’'`]/g,' ')
    .replace(/-/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

// debounce helper
function debounce(fn, wait = 240){
  let t;
  return function(...args){ clearTimeout(t); t = setTimeout(()=> fn.apply(this,args), wait); };
}

// Color map for table names (visual enhancement only)
const TABLE_COLOR = {
  'coral': '#ff8066',
  'blush': '#ffd6e0',
  'amber': '#ffb86b',
  'terracotta': '#e07a5f',
  'champagne': '#f7e7d7',
  'gold': '#ffd166',
  'fuchsia': '#f14c8a'
};

function tableColorForName(name){
  if(!name) return '#fff';
  const lower = name.toLowerCase();
  for(const key of Object.keys(TABLE_COLOR)){
    if(lower.includes(key)) return TABLE_COLOR[key];
  }
  return '#fff';
}

// Storage helpers for seat reservations (local fallback)
const STORAGE_KEY = 'yaud_seat_reservations_v1';

function readReservations(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  }catch(e){ return {}; }
}

function writeReservations(obj){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); }catch(e){ console.warn('Could not write reservations', e); }
}

// Render helpers
function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, (c)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// Extract table number from string like "Table 7 - Fuchsia" or "Table 12"
function extractTableNumber(tableLabel){
  if(!tableLabel) return null;
  const m = tableLabel.match(/(\d{1,3})/);
  return m ? Number(m[1]) : null;
}

// Search logic (robust)
function searchTable(){
  const inputEl = document.getElementById('searchGuest');
  const resultBox = document.getElementById('result');
  if(!inputEl || !resultBox) return;

  const input = (inputEl.value || '').trim();
  if(input.length < 2){
    resultBox.innerHTML = '<p>Veuillez entrer au moins 2 caractères pour rechercher votre nom.</p>';
    return;
  }

  if(!guests.length){
    resultBox.innerHTML = '<p>Liste des invités indisponible pour le moment.</p>';
    return;
  }

  const search = normalize(input);

  const matches = guests.filter(person => {
    const prenom = normalize(person.prenom || '');
    const nom = normalize(person.nom || '');
    const full = normalize(((person.prenom||'') + ' ' + (person.nom||'')).trim());
    const rev = normalize(((person.nom||'') + ' ' + (person.prenom||'')).trim());

    // fuzzy-ish comparisons: includes and small typos tolerated by remove vowels? keep simple for now
    return full.includes(search) || rev.includes(search) || prenom.includes(search) || nom.includes(search);
  });

  if(matches.length === 0){
    resultBox.innerHTML = '<p>Aucun invité trouvé.<br>Vérifiez l\'orthographe ou essayez un autre nom.</p>';
    return;
  }

  if(matches.length > 1){
    window.currentMatches = matches;
    resultBox.innerHTML = `<p>Plusieurs invités correspondent. Veuillez sélectionner votre nom :</p>` +
      matches.map((p, i) => {
        const label = escapeHtml(((p.prenom||'') + ' ' + (p.nom||'')).trim());
        return `<button class="choice" data-index="${i}" aria-label="Sélectionner ${label}">${label} — <small>${escapeHtml(p.table||'')}</small></button>`;
      }).join('');
    return;
  }

  // single match
  showGuestResult(matches[0]);
}

// show guest by index in currentMatches
function showGuest(index){
  const person = (window.currentMatches || [])[index];
  if(!person) return;
  showGuestResult(person);
}

// Render seat map (8 seats) and handle selection
function renderSeatMap(container, tableNumber, currentGuestName){
  const seatsCount = 8; // as specified
  const reservations = readReservations();
  const tableKey = `table_${tableNumber}`;
  const tableRes = reservations[tableKey] || {};

  // build seat buttons
  let html = '<div class="seat-map" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">';
  for(let i=1;i<=seatsCount;i++){
    const occ = tableRes[i] || null; // occupant name
    const isMine = occ && normalize(occ) === normalize(currentGuestName);
    const label = `Place ${i}`;
    if(occ){
      html += `<button class="seat" data-seat="${i}" aria-label="${label} - occupée par ${escapeHtml(occ)}" disabled>${i} • ${escapeHtml(occ)}</button>`;
    }else{
      html += `<button class="seat available" data-seat="${i}" aria-label="${label} - libre">${i}</button>`;
    }
  }
  html += '</div>';

  // list of already reserved on this table (excluding current guest unless they reserved)
  const reservedList = Object.keys(tableRes).map(k => ({seat: k, name: tableRes[k]})).filter(r => normalize(r.name)!==normalize(currentGuestName));
  if(reservedList.length){
    html += '<div style="margin-top:8px"><strong>Places déjà réservées sur cette table :</strong><ul style="margin:6px 0;padding-left:18px">' + reservedList.map(r=>`<li>Place ${escapeHtml(r.seat)} — ${escapeHtml(r.name)}</li>`).join('') + '</ul></div>';
  }

  container.insertAdjacentHTML('beforeend', html);

  // attach handlers for available seats
  container.querySelectorAll('.seat.available').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const seatIndex = btn.getAttribute('data-seat');
      if(!seatIndex) return;
      // confirm
      if(!confirm(`Confirmer la réservation de la place ${seatIndex} pour ${currentGuestName} ?`)) return;
      // write to storage
      const resObj = readReservations();
      resObj[tableKey] = resObj[tableKey] || {};
      // prevent double booking if seat occupied (race condition improbable in localStorage)
      if(resObj[tableKey][seatIndex]){ alert('Désolé, cette place a été prise entre-temps.'); return; }
      resObj[tableKey][seatIndex] = currentGuestName;
      writeReservations(resObj);
      // refresh view
      container.innerHTML = container.innerHTML; // quick reset
      // re-render: remove current content and call showGuestResult again to regenerate
      // find parent guest result wrapper
      const parent = container.closest('.guest-result');
      if(parent){
        const nameEl = parent.querySelector('h3');
        const name = nameEl ? nameEl.textContent.replace(/^Bonjour\s+/,'').trim() : currentGuestName;
        // find the original person by name
        const person = guests.find(p => normalize(((p.prenom||'')+' '+(p.nom||'')).trim()) === normalize(name));
        if(person) showGuestResult(person);
        else parent.querySelector('#result')?.innerHTML = '';
      }
    });
  });
}

function showGuestResult(person){
  const resultBox = document.getElementById('result');
  if(!resultBox || !person) return;

  const name = `${person.prenom || ''} ${person.nom || ''}`.trim();
  const table = person.table || '—';
  const color = tableColorForName(table);
  const tableNumber = extractTableNumber(table);

  resultBox.innerHTML = `\n    <div class="guest-result" role="status">\n      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">\n        <div style="width:12px;height:12px;border-radius:4px;background:${color};border:1px solid rgba(0,0,0,0.06)"></div>\n        <h3>Bonjour ${escapeHtml(person.prenom || '')} ✨</h3>\n      </div>\n      <p>Nous sommes ravis de vous accueillir pour cette belle journée.</p>\n      <p>Votre table : <strong>${escapeHtml(table)}</strong></p>\n    </div>`;

  // seat selection UI (local fallback)
  const wrapper = resultBox.querySelector('.guest-result');
  if(tableNumber){
    const seatContainer = document.createElement('div');
    seatContainer.style.marginTop = '10px';
    seatContainer.innerHTML = `<p><strong>Choisissez votre place (8 places par table)</strong></p>`;
    wrapper.appendChild(seatContainer);

    renderSeatMap(seatContainer, tableNumber, name);
  } else {
    const note = document.createElement('p');
    note.textContent = 'Numéro de table non disponible.';
    wrapper.appendChild(note);
  }

  // ensure screen readers announce the new content
  resultBox.setAttribute('aria-live','polite');
}

// attach debounced input handler and delegation for choice buttons
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchGuest');
  if(input){
    const deb = debounce(searchTable, 300);
    input.addEventListener('input', deb);
  }

  // delegate clicks on choice buttons
  const resultBox = document.getElementById('result');
  if(resultBox){
    resultBox.addEventListener('click', (ev)=>{
      const btn = ev.target.closest('.choice');
      if(!btn) return;
      const idx = Number(btn.getAttribute('data-index'));
      if(!Number.isNaN(idx)) showGuest(idx);
    });
  }

  // keyboard: Enter on input triggers search
  if(input){
    input.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter') { e.preventDefault(); searchTable(); }
    });
  }

  // small enhancement: open route link in same origin fallback
  const mapButton = document.querySelector('.map-button');
  if(mapButton){
    mapButton.addEventListener('click', ()=>{
      // nothing to change; this keeps behavior — placeholder to allow analytics later
    });
  }
});

// expose some functions for inline HTML that uses them
window.enterUniverse = enterUniverse;
window.showSection = showSection;
window.searchTable = searchTable;
window.showGuest = showGuest;
