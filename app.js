// État app
let currentScreen = 'homeScreen';
let selectedGuest = null;
let carouselIndex = 0;

window.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Carousel auto
    setInterval(() => {
        rotateCarousel();
    }, 4000);
    
    // Empêcher zoom iPhone
    document.addEventListener('gesturestart', e => e.preventDefault());
}

// Navigation
function enterApp() {
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('mainNav').classList.remove('hidden');
    showScreen('findPlaceScreen');
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    
    document.getElementById(screenId).classList.remove('hidden');
    currentScreen = screenId;
    
    // Reset search
    if (screenId === 'findPlaceScreen') {
        document.getElementById('guestSearch').value = '';
        document.getElementById('resultCard').classList.add('hidden');
        document.getElementById('helpMessage').classList.remove('hidden');
        document.getElementById('autocompleteList').classList.add('hidden');
    }
    
    // Scroll to top
    document.getElementById(screenId).scrollTop = 0;
}

function goBack() {
    document.getElementById('homeScreen').classList.remove('hidden');
    document.getElementById('mainNav').classList.add('hidden');
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById('homeScreen').scrollTop = 0;
}

// Recherche
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

// Affichage carte
function displayGuestCard(guest) {
    document.getElementById('helpMessage').classList.add('hidden');
    document.getElementById('resultCard').classList.remove('hidden');
    
    const firstName = guest.firstName.split(' ')[0];
    document.getElementById('resultGreeting').textContent = `Bonjour ${firstName},`;
    document.getElementById('resultTable').textContent = `${guest.table}`;
}

// Carousel
function rotateCarousel() {
    const photos = document.querySelectorAll('.couple-photo');
    if (photos.length === 0) return;
    
    photos[carouselIndex].classList.add('hidden');
    carouselIndex = (carouselIndex + 1) % photos.length;
    photos[carouselIndex].classList.remove('hidden');
    
    // Dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === carouselIndex);
    });
}

function goToSlide(index) {
    const photos = document.querySelectorAll('.couple-photo');
    photos[carouselIndex].classList.add('hidden');
    carouselIndex = index;
    photos[carouselIndex].classList.remove('hidden');
    
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === carouselIndex);
    });
}

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    });
}