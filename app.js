// État de l'application
let currentScreen = 'homeScreen';
let selectedGuest = null;
let occupiedSeats = {};
let carouselIndex = 0;

// Initialisation
window.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Carousel photos accueil
    setInterval(() => {
        rotateCarousel();
    }, 4000);
    
    // Récupérer les places occupées depuis localStorage
    loadOccupiedSeats();
}

// Navigation
function enterApp() {
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('mainNav').classList.remove('hidden');
    showScreen('findPlaceScreen');
}

function showScreen(screenId) {
    // Masquer tous les écrans
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    
    // Afficher l'écran demandé
    document.getElementById(screenId).classList.remove('hidden');
    currentScreen = screenId;
    
    // Réinitialiser certains contenus
    if (screenId === 'findPlaceScreen') {
        document.getElementById('guestSearch').value = '';
        document.getElementById('resultCard').classList.add('hidden');
        document.getElementById('helpMessage').classList.remove('hidden');
        document.getElementById('autocompleteList').classList.add('hidden');
    }
}

function goBack() {
    document.getElementById('homeScreen').classList.remove('hidden');
    document.getElementById('mainNav').classList.add('hidden');
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
}

// Recherche d'invité
function searchGuest(query) {
    const autocompleteList = document.getElementById('autocompleteList');
    
    if (!query || query.length < 1) {
        autocompleteList.classList.add('hidden');
        return;
    }
    
    const results = searchGuests(query);
    
    if (results.length === 0) {
        autocompleteList.classList.add('hidden');
        return;
    }
    
    autocompleteList.innerHTML = '';
    results.slice(0, 8).forEach(result => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.textContent = `${result.guest.firstName} ${result.guest.lastName}`;
        item.onclick = () => selectGuest(result.guest);
        autocompleteList.appendChild(item);
    });
    
    autocompleteList.classList.remove('hidden');
}

function selectGuest(guest) {
    selectedGuest = guest;
    displayGuestCard(guest);
    document.getElementById('autocompleteList').classList.add('hidden');
}

// Affichage de la carte invité
function displayGuestCard(guest) {
    document.getElementById('helpMessage').classList.add('hidden');
    document.getElementById('resultCard').classList.remove('hidden');
    
    // Greeting
    const firstName = guest.firstName.split(' ')[0];
    document.getElementById('resultGreeting').textContent = `Bonjour ${firstName},`;
    
    // Table et place
    document.getElementById('resultTable').textContent = guest.table;
    document.getElementById('resultSeat').textContent = guest.seat;
    
    // Compagnons
    const companionsList = document.getElementById('companionsList');
    companionsList.innerHTML = '';
    guest.companions.forEach(companion => {
        const li = document.createElement('li');
        li.textContent = companion;
        companionsList.appendChild(li);
    });
    
    // Visualisation table
    displayTableVisualization(guest.table, guest.seat);
}

// Visualisation de la table
function displayTableVisualization(tableNumber, selectedSeat) {
    const tableViz = document.getElementById('tableVisualization');
    tableViz.innerHTML = '';
    
    const tableGuests = getTableGuests(tableNumber);
    
    for (let i = 1; i <= 8; i++) {
        const seatDiv = document.createElement('div');
        seatDiv.className = 'seat';
        
        const guestAtSeat = tableGuests.find(g => g.seat === i);
        
        if (i === selectedSeat) {
            seatDiv.classList.add('selected');
            seatDiv.textContent = '✓';
        } else if (guestAtSeat) {
            seatDiv.classList.add('occupied');
            const firstName = guestAtSeat.firstName.split(' ')[0];
            seatDiv.textContent = firstName.substring(0, 3);
        } else {
            seatDiv.classList.add('available');
            seatDiv.textContent = i;
        }
        
        tableViz.appendChild(seatDiv);
    }
}

// Carousel accueil
function rotateCarousel() {
    const photos = document.querySelectorAll('.couple-photo');
    
    if (photos.length === 0) return;
    
    // Masquer current
    photos[carouselIndex].classList.add('hidden');
    
    // Afficher next
    carouselIndex = (carouselIndex + 1) % photos.length;
    photos[carouselIndex].classList.remove('hidden');
}

// Gestion des places occupées (localStorage)
function loadOccupiedSeats() {
    const saved = localStorage.getItem('occupiedSeats');
    occupiedSeats = saved ? JSON.parse(saved) : {};
}

function saveOccupiedSeats() {
    localStorage.setItem('occupiedSeats', JSON.stringify(occupiedSeats));
}

// Optimisation pour connexion mobile faible
if ('serviceWorker' in navigator && 'caches' in window) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {
            // Service Worker optionnel
        });
    });
}

// Détection de la connexion
window.addEventListener('online', () => {
    console.log('Connexion rétablie');
});

window.addEventListener('offline', () => {
    console.log('Mode hors ligne');
});