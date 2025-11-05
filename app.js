// Main application logic

// DOM Elements
const searchInput = document.getElementById('medicineSearch');
const clearBtn = document.getElementById('clearBtn');
const suggestionsEl = document.getElementById('suggestions');
const resultsSection = document.getElementById('resultsSection');
const emptyState = document.getElementById('emptyState');
const noResults = document.getElementById('noResults');
const pharmacyList = document.getElementById('pharmacyList');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');

// State
let currentMedicine = null;
let searchTimeout = null;

// Initialize app
function init() {
    setupEventListeners();
    showEmptyState();
}

// Event Listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('keydown', handleKeyDown);

    // Clear button
    clearBtn.addEventListener('click', clearSearch);

    // Popular search chips
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const medicine = chip.getAttribute('data-medicine');
            searchInput.value = medicine;
            handleSearch(medicine);
        });
    });

    // Click outside to close suggestions
    document.addEventListener('click', (e) => {
        if (!suggestionsEl.contains(e.target) && e.target !== searchInput) {
            hideSuggestions();
        }
    });
}

// Handle search input with debouncing
function handleSearchInput(e) {
    const query = e.target.value.trim();

    // Show/hide clear button
    if (query.length > 0) {
        clearBtn.classList.add('visible');
    } else {
        clearBtn.classList.remove('visible');
        hideSuggestions();
        showEmptyState();
        return;
    }

    // Debounce search
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        showSuggestions(query);
    }, 200);
}

// Handle keyboard navigation
function handleKeyDown(e) {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query.length > 0) {
            hideSuggestions();
            handleSearch(query);
        }
    } else if (e.key === 'Escape') {
        hideSuggestions();
    }
}

// Clear search
function clearSearch() {
    searchInput.value = '';
    clearBtn.classList.remove('visible');
    hideSuggestions();
    showEmptyState();
    searchInput.focus();
}

// Show search suggestions
function showSuggestions(query) {
    const results = searchMedicines(query);

    if (results.length === 0) {
        hideSuggestions();
        return;
    }

    suggestionsEl.innerHTML = results.map(medicine => `
        <div class="suggestion-item" data-key="${medicine.key}">
            <strong>${highlightMatch(medicine.name, query)}</strong>
            <div style="font-size: 0.875rem; color: var(--text-secondary);">
                ${medicine.genericName} • ${medicine.category}
            </div>
        </div>
    `).join('');

    // Add click handlers to suggestions
    suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const key = item.getAttribute('data-key');
            const medicine = getMedicine(key);
            searchInput.value = medicine.name;
            hideSuggestions();
            handleSearch(key);
        });
    });

    suggestionsEl.classList.add('visible');
}

// Hide suggestions
function hideSuggestions() {
    suggestionsEl.classList.remove('visible');
}

// Highlight matching text
function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span style="color: var(--primary);">$1</span>');
}

// Handle search submission
function handleSearch(medicineKey) {
    currentMedicine = getMedicine(medicineKey);

    if (!currentMedicine) {
        showNoResults(medicineKey);
        return;
    }

    displayResults(currentMedicine);
}

// Display pharmacy results
function displayResults(medicine) {
    // Hide other states
    emptyState.classList.add('hidden');
    noResults.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    // Get available pharmacies
    const availablePharmacies = Object.entries(medicine.availability)
        .filter(([_, data]) => data.inStock)
        .map(([key, data]) => ({ key, ...data, ...PHARMACY_APPS[key] }));

    // Update results count
    resultsCount.textContent = availablePharmacies.length;

    // Sort by price (cheapest first, but put GoodRx last)
    availablePharmacies.sort((a, b) => {
        if (a.key === 'goodrx') return 1;
        if (b.key === 'goodrx') return -1;

        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return priceA - priceB;
    });

    // Render pharmacy cards
    pharmacyList.innerHTML = availablePharmacies.map((pharmacy, index) => `
        <div class="pharmacy-card" data-pharmacy="${pharmacy.key}" data-medicine="${medicine.name}">
            <div class="pharmacy-icon" style="background-color: ${pharmacy.color}20;">
                <span style="font-size: 1.5rem;">${pharmacy.icon}</span>
            </div>
            <div class="pharmacy-info">
                <div class="pharmacy-name">
                    ${pharmacy.name}
                    ${index === 0 && pharmacy.key !== 'goodrx' ? '<span class="availability in-stock">Best Price</span>' : ''}
                </div>
                <div class="pharmacy-details">
                    ${pharmacy.price} • ${pharmacy.delivery}
                </div>
            </div>
            <div class="pharmacy-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
    `).join('');

    // Add click handlers for deep linking
    pharmacyList.querySelectorAll('.pharmacy-card').forEach(card => {
        card.addEventListener('click', () => {
            const pharmacyKey = card.getAttribute('data-pharmacy');
            const medicineName = card.getAttribute('data-medicine');
            handlePharmacyClick(pharmacyKey, medicineName);
        });
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle pharmacy card click with deep linking
function handlePharmacyClick(pharmacyKey, medicineName) {
    const pharmacy = PHARMACY_APPS[pharmacyKey];

    if (!pharmacy) return;

    // Try to open the app using deep link
    const deepLink = pharmacy.getDeepLink(medicineName);
    const webLink = pharmacy.getWebLink(medicineName);

    // Attempt to open deep link
    const startTime = Date.now();
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = deepLink;
    document.body.appendChild(iframe);

    // Set timeout to check if app opened
    setTimeout(() => {
        const endTime = Date.now();
        const elapsed = endTime - startTime;

        // If app didn't open (user stayed on page), open web fallback
        if (document.hidden || elapsed > 2000) {
            // App likely opened, remove iframe
            document.body.removeChild(iframe);
        } else {
            // App didn't open, go to web version
            document.body.removeChild(iframe);
            window.location.href = webLink;
        }
    }, 1500);

    // For iOS Safari, we need a different approach
    if (isIOS()) {
        window.location.href = deepLink;
        setTimeout(() => {
            // If still on the page after 1.5s, app is not installed
            if (!document.hidden) {
                window.location.href = webLink;
            }
        }, 1500);
    }
}

// Detect iOS
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Show empty state
function showEmptyState() {
    resultsSection.classList.add('hidden');
    noResults.classList.add('hidden');
    emptyState.classList.remove('hidden');
}

// Show no results
function showNoResults(query) {
    resultsSection.classList.add('hidden');
    emptyState.classList.add('hidden');
    noResults.classList.remove('hidden');

    document.getElementById('noResultsText').textContent =
        `No results found for "${query}". Try a different medicine name.`;
}

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
