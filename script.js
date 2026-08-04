// Données invités
let guests = [];

// Chargement des données
async function loadGuests() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/konandriyoane-crypto/YAUD-2026-/main/guests.json');
    guests = await response.json();
  } catch (error) {
    console.error('Erreur chargement invités:', error);
    guests = [];
  }
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
  loadGuests();
  setupCarousel();
  setupSearch();
});

// === CAROUSEL ===
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-img');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  currentSlide = n;
  updateCarousel();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function updateCarousel() {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function setupCarousel() {
  if (slides.length > 0) {
    updateCarousel();
    setInterval(nextSlide, 5000); // Change photo tous les 5 secondes
  }
}

// === NAVIGATION APP ===
function enterUniverse() {
  const hero = document.querySelector('.hero');
  const appNav = document.getElementById('appNav');
  const appContainer = document.getElementById('appContainer');
  
  hero.classList.add('hidden');
  appNav.classList.remove('hidden');
  appContainer.classList.remove('hidden');
  
  // Affiche la première section
  showSection('find-place');
}

function showSection(sectionId) {
  // Cache toutes les sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.setAttribute('aria-hidden', 'true');
    section.style.display = 'none';
  });
  
  // Affiche la section demandée
  const section = document.getElementById(sectionId);
  if (section) {
    section.setAttribute('aria-hidden', 'false');
    section.style.display = 'flex';
  }
}

// === RECHERCHE INVITÉS ===
function setupSearch() {
  const searchInput = document.getElementById('searchGuest');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTable(e.target.value);
    });
  }
}

// Fuzzy matching avec correction accents
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlève accents
    .replace(/[-\s]/g, ''); // Enlève tirets et espaces
}

function fuzzyMatch(query, text) {
  const norm_query = normalizeText(query);
  const norm_text = normalizeText(text);
  
  if (!norm_query) return false;
  if (norm_text.includes(norm_query)) return true;
  
  // Recherche approximative
  let queryIdx = 0;
  for (let i = 0; i < norm_text.length; i++) {
    if (norm_text[i] === norm_query[queryIdx]) {
      queryIdx++;
      if (queryIdx === norm_query.length) return true;
    }
  }
  return false;
}

function searchTable(query) {
  const resultBox = document.getElementById('result');
  resultBox.innerHTML = '';
  
  if (!query.trim()) {
    resultBox.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Entrez votre nom pour trouver votre place...</p>';
    return;
  }
  
  // Recherche
  const matches = guests.filter(guest => 
    fuzzyMatch(query, guest.prenom) || 
    fuzzyMatch(query, guest.nom)
  );
  
  if (matches.length === 0) {
    resultBox.innerHTML = '<p style="text-align: center; color: #e07a5f; padding: 20px;">❌ Aucun résultat trouvé</p>';
    return;
  }
  
  // Affiche les résultats
  matches.forEach(guest => {
    const card = createGuestCard(guest);
    resultBox.appendChild(card);
  });
}

function createGuestCard(guest) {
  const card = document.createElement('div');
  card.className = 'guest-result';
  
  const tableColor = getTableColor(guest.table);
  
  card.innerHTML = `
    <h3>Bonjour ${guest.prenom}!</h3>
    <p>Nous sommes heureux de vous accueillir pour cette belle journée.</p>
    
    <div class="table-info">
      <div class="table-color" style="background: ${tableColor}; box-shadow: 0 0 8px ${tableColor}80;"></div>
      <div>
        <strong>Votre table :</strong><br>
        <span style="font-size: 16px; font-weight: 600;">${guest.table}</span>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 12px;">
      <p style="color: #999; font-size: 12px;">Ensemble, partageons cette belle journée! 💝</p>
    </div>
  `;
  
  return card;
}

function getTableColor(tableName) {
  const colors = {
    'Table 1 - Coral': '#ff8066',
    'Table 2 - Blush': '#ffd6e0',
    'Table 3 - Amber': '#ffb86b',
    'Table 4 - Terracotta': '#e07a5f',
    'Table 5 - Champagne': '#f7e7d7',
    'Table 6 - Gold': '#ffd166',
    'Table 7 - Fuchsia': '#f14c8a'
  };
  return colors[tableName] || '#e5d5c8';
}

// Service Worker pour offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.log('SW registration failed:', err);
    });
  });
}
