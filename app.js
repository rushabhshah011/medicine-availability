// Main application logic for MedFinder India

// DOM Elements
const pincodeInput = document.getElementById('pincodeInput');
const pincodeError = document.getElementById('pincodeError');
const pincodeInfo = document.getElementById('pincodeInfo');
const pincodeInfoText = document.getElementById('pincodeInfoText');
const medicineSearch = document.getElementById('medicineSearch');
const clearBtn = document.getElementById('clearBtn');
const searchBtn = document.getElementById('searchBtn');
const suggestionsEl = document.getElementById('suggestions');
const resultsSection = document.getElementById('resultsSection');
const emptyState = document.getElementById('emptyState');
const noResults = document.getElementById('noResults');
const pharmacyList = document.getElementById('pharmacyList');
const resultsCount = document.getElementById('resultsCount');
const resultsMedicine = document.querySelector('.results-medicine');
const tryAgainBtn = document.getElementById('tryAgainBtn');

// State
let currentPincode = null;
let currentMedicine = null;
let searchTimeout = null;
let isPincodeValid = false;
let isMedicineValid = false;

// Initialize app
function init() {
    setupEventListeners();
    showEmptyState();
    loadSavedPincode();
}

// Event Listeners
function setupEventListeners() {
    // Pincode input
    pincodeInput.addEventListener('input', handlePincodeInput);
    pincodeInput.addEventListener('blur', validatePincode);

    // Medicine search input
    medicineSearch.addEventListener('input', handleMedicineInput);
    medicineSearch.addEventListener('keydown', handleKeyDown);

    // Clear button
    clearBtn.addEventListener('click', clearSearch);

    // Search button
    searchBtn.addEventListener('click', handleSearchClick);

    // Try again button
    tryAgainBtn.addEventListener('click', () => {
        showEmptyState();
        medicineSearch.focus();
    });

    // Popular search chips
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const medicine = chip.getAttribute('data-medicine');
            medicineSearch.value = medicine;
            handleMedicineInput({ target: medicineSearch });

            // Auto-search if pincode is valid
            if (isPincodeValid) {
                setTimeout(() => handleSearchClick(), 300);
            } else {
                pincodeInput.focus();
            }
        });
    });

    // Click outside to close suggestions
    document.addEventListener('click', (e) => {
        if (!suggestionsEl.contains(e.target) && e.target !== medicineSearch) {
            hideSuggestions();
        }
    });
}

// Load saved pincode from localStorage
function loadSavedPincode() {
    const savedPincode = localStorage.getItem('medfinder_pincode');
    if (savedPincode && isValidPincode(savedPincode)) {
        pincodeInput.value = savedPincode;
        validatePincode();
    }
}

// Handle pincode input
function handlePincodeInput(e) {
    const value = e.target.value;

    // Only allow numbers
    e.target.value = value.replace(/\D/g, '');

    // Clear previous states
    pincodeInput.classList.remove('error', 'success');
    pincodeError.classList.add('hidden');
    pincodeInfo.classList.add('hidden');

    if (e.target.value.length === 6) {
        validatePincode();
    } else {
        isPincodeValid = false;
        updateSearchButton();
    }
}

// Validate pincode
function validatePincode() {
    const pincode = pincodeInput.value.trim();

    if (pincode.length === 0) {
        isPincodeValid = false;
        updateSearchButton();
        return;
    }

    if (isValidPincode(pincode)) {
        isPincodeValid = true;
        currentPincode = pincode;

        // Save to localStorage
        localStorage.setItem('medfinder_pincode', pincode);

        // Show success state
        pincodeInput.classList.add('success');
        pincodeInput.classList.remove('error');
        pincodeError.classList.add('hidden');

        // Show location info
        const info = getPincodeInfo(pincode);
        pincodeInfoText.textContent = `Delivering to ${info.city}, ${info.state}`;
        pincodeInfo.classList.remove('hidden');
    } else {
        isPincodeValid = false;
        currentPincode = null;

        // Show error state
        pincodeInput.classList.add('error');
        pincodeInput.classList.remove('success');
        pincodeInfo.classList.add('hidden');
        pincodeError.classList.remove('hidden');
    }

    updateSearchButton();
}

// Handle medicine input
function handleMedicineInput(e) {
    const query = e.target.value.trim();

    // Show/hide clear button
    if (query.length > 0) {
        clearBtn.classList.add('visible');
    } else {
        clearBtn.classList.remove('visible');
        hideSuggestions();
        isMedicineValid = false;
        updateSearchButton();
        return;
    }

    // Debounce search
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        showSuggestions(query);
    }, 200);

    isMedicineValid = query.length > 0;
    updateSearchButton();
}

// Update search button state
function updateSearchButton() {
    searchBtn.disabled = !(isPincodeValid && isMedicineValid);
}

// Handle keyboard navigation
function handleKeyDown(e) {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query.length > 0 && isPincodeValid) {
            hideSuggestions();
            handleSearch(query);
        } else if (!isPincodeValid) {
            pincodeInput.focus();
        }
    } else if (e.key === 'Escape') {
        hideSuggestions();
    }
}

// Handle search button click
function handleSearchClick() {
    const query = medicineSearch.value.trim();

    if (!isPincodeValid) {
        pincodeInput.focus();
        pincodeInput.classList.add('error');
        return;
    }

    if (query.length > 0) {
        hideSuggestions();
        handleSearch(query);
    }
}

// Clear search
function clearSearch() {
    medicineSearch.value = '';
    clearBtn.classList.remove('visible');
    hideSuggestions();
    isMedicineValid = false;
    updateSearchButton();
    medicineSearch.focus();
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
            <div style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.125rem;">
                ${medicine.genericName} • ${medicine.category}
            </div>
        </div>
    `).join('');

    // Add click handlers to suggestions
    suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            const key = item.getAttribute('data-key');
            const medicine = getMedicine(key);
            medicineSearch.value = medicine.name;
            clearBtn.classList.add('visible');
            hideSuggestions();
            isMedicineValid = true;
            updateSearchButton();

            // Auto-search if pincode is valid
            if (isPincodeValid) {
                handleSearch(key);
            }
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
    return text.replace(regex, '<span style="background: rgba(16, 132, 126, 0.15);">$1</span>');
}

// Handle search submission
function handleSearch(medicineKey) {
    // Scroll to top for better UX on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });

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

    // Update results header
    resultsMedicine.textContent = medicine.name;

    // Get available pharmacies
    const availablePharmacies = Object.entries(medicine.availability)
        .filter(([_, data]) => data.inStock)
        .map(([key, data]) => ({ key, ...data, ...PHARMACY_APPS[key] }));

    // Update results count
    resultsCount.textContent = availablePharmacies.length;

    // Sort by price (cheapest first)
    availablePharmacies.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return priceA - priceB;
    });

    // Render pharmacy cards
    pharmacyList.innerHTML = availablePharmacies.map((pharmacy, index) => `
        <div class="pharmacy-card" data-pharmacy="${pharmacy.key}" data-medicine="${medicine.name}">
            <div class="pharmacy-icon" style="background-color: ${pharmacy.color}20;">
                <span style="font-size: 1.75rem;">${pharmacy.icon}</span>
            </div>
            <div class="pharmacy-info">
                <div class="pharmacy-name">
                    ${pharmacy.name}
                    ${index === 0 ? '<span class="availability best-price">Best Price</span>' : ''}
                </div>
                <div class="pharmacy-details">
                    <div>
                        <span class="pharmacy-price">${pharmacy.price}</span>
                        ${pharmacy.discount ? `<span class="pharmacy-discount">${pharmacy.discount}</span>` : ''}
                    </div>
                    <div style="margin-top: 0.25rem;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 0.25rem;">
                            <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                        </svg>
                        ${pharmacy.delivery}
                    </div>
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
}

// Handle pharmacy card click with deep linking
function handlePharmacyClick(pharmacyKey, medicineName) {
    const pharmacy = PHARMACY_APPS[pharmacyKey];

    if (!pharmacy) return;

    // Get appropriate link (affiliate or direct)
    let webLink = pharmacy.getWebLink(medicineName, currentPincode);

    // Check if affiliate link function exists and is configured
    if (typeof getPharmacyLink !== 'undefined') {
        const affiliateLink = getPharmacyLink(pharmacyKey, medicineName);
        if (affiliateLink) {
            webLink = affiliateLink;
            console.log(`Using affiliate link for ${pharmacy.name}`);

            // Track affiliate click
            if (typeof trackAffiliateClick !== 'undefined') {
                trackAffiliateClick(pharmacyKey, medicineName, 'web_click');
            }
        }
    }

    // Try to open the app using deep link
    const deepLink = pharmacy.getDeepLink(medicineName, currentPincode);

    // Track analytics
    console.log(`Opening ${pharmacy.name} for ${medicineName} at ${currentPincode}`);

    // For iOS, use different approach
    if (isIOS()) {
        // Try app first
        window.location.href = deepLink;

        // Fallback to web (with affiliate link)
        setTimeout(() => {
            if (!document.hidden) {
                window.location.href = webLink;
            }
        }, 1500);
        return;
    }

    // For Android/Desktop
    // Attempt to open deep link
    const startTime = Date.now();

    // Create hidden iframe for deep link attempt
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = deepLink;
    document.body.appendChild(iframe);

    // Set timeout to check if app opened
    setTimeout(() => {
        try {
            document.body.removeChild(iframe);
        } catch (e) {
            // Iframe may already be removed
        }

        const endTime = Date.now();
        const elapsed = endTime - startTime;

        // If app didn't open (user stayed on page), open web fallback
        if (!document.hidden && elapsed < 2000) {
            // App didn't open, go to web version (with affiliate link)
            window.location.href = webLink;
        }
        // else: App likely opened, do nothing
    }, 1500);
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
        `No results found for "${query}". Try searching with a different name.`;
}

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
