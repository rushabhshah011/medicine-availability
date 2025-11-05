// Mock database of medicines and pharmacy availability

const PHARMACY_APPS = {
    cvs: {
        name: 'CVS Pharmacy',
        icon: '🏪',
        color: '#CC0000',
        appScheme: 'cvs://',
        webUrl: 'https://www.cvs.com',
        getDeepLink: (medicine) => `cvs://pharmacy/search?q=${encodeURIComponent(medicine)}`,
        getWebLink: (medicine) => `https://www.cvs.com/shop/pharmacy?searchTerm=${encodeURIComponent(medicine)}`
    },
    walgreens: {
        name: 'Walgreens',
        icon: '💊',
        color: '#E31837',
        appScheme: 'walgreens://',
        webUrl: 'https://www.walgreens.com',
        getDeepLink: (medicine) => `walgreens://search?query=${encodeURIComponent(medicine)}`,
        getWebLink: (medicine) => `https://www.walgreens.com/search/results.jsp?Ntt=${encodeURIComponent(medicine)}`
    },
    riteaid: {
        name: 'Rite Aid',
        icon: '🏥',
        color: '#0066B2',
        appScheme: 'riteaid://',
        webUrl: 'https://www.riteaid.com',
        getDeepLink: (medicine) => `riteaid://pharmacy/search?q=${encodeURIComponent(medicine)}`,
        getWebLink: (medicine) => `https://www.riteaid.com/shop/catalogsearch/result/?q=${encodeURIComponent(medicine)}`
    },
    walmart: {
        name: 'Walmart Pharmacy',
        icon: '🛒',
        color: '#0071CE',
        appScheme: 'walmart://',
        webUrl: 'https://www.walmart.com',
        getDeepLink: (medicine) => `walmart://pharmacy/search?query=${encodeURIComponent(medicine)}`,
        getWebLink: (medicine) => `https://www.walmart.com/search?q=${encodeURIComponent(medicine)}+pharmacy`
    },
    amazon: {
        name: 'Amazon Pharmacy',
        icon: '📦',
        color: '#FF9900',
        appScheme: 'amazon://',
        webUrl: 'https://pharmacy.amazon.com',
        getDeepLink: (medicine) => `amazon://pharmacy/search?keywords=${encodeURIComponent(medicine)}`,
        getWebLink: (medicine) => `https://pharmacy.amazon.com/search?keywords=${encodeURIComponent(medicine)}`
    },
    goodrx: {
        name: 'GoodRx',
        icon: '💰',
        color: '#FFA500',
        appScheme: 'goodrx://',
        webUrl: 'https://www.goodrx.com',
        getDeepLink: (medicine) => `goodrx://drug/${encodeURIComponent(medicine.toLowerCase())}`,
        getWebLink: (medicine) => `https://www.goodrx.com/${encodeURIComponent(medicine.toLowerCase())}`
    }
};

// Mock medicine database with availability and pricing info
const MEDICINES_DB = {
    'aspirin': {
        name: 'Aspirin',
        genericName: 'Acetylsalicylic Acid',
        category: 'Pain Relief',
        availability: {
            cvs: { inStock: true, price: '$8.99', delivery: 'Same day' },
            walgreens: { inStock: true, price: '$9.49', delivery: 'Same day' },
            riteaid: { inStock: true, price: '$8.49', delivery: '1-2 days' },
            walmart: { inStock: true, price: '$6.99', delivery: 'Same day' },
            amazon: { inStock: true, price: '$7.99', delivery: '2 days' },
            goodrx: { inStock: true, price: 'From $5.50', delivery: 'Compare prices' }
        }
    },
    'ibuprofen': {
        name: 'Ibuprofen',
        genericName: 'Ibuprofen',
        category: 'Pain Relief / Anti-inflammatory',
        availability: {
            cvs: { inStock: true, price: '$10.99', delivery: 'Same day' },
            walgreens: { inStock: true, price: '$11.49', delivery: 'Same day' },
            riteaid: { inStock: true, price: '$9.99', delivery: 'Same day' },
            walmart: { inStock: true, price: '$8.99', delivery: 'Same day' },
            amazon: { inStock: true, price: '$9.49', delivery: '1 day' },
            goodrx: { inStock: true, price: 'From $6.75', delivery: 'Compare prices' }
        }
    },
    'amoxicillin': {
        name: 'Amoxicillin',
        genericName: 'Amoxicillin',
        category: 'Antibiotic',
        availability: {
            cvs: { inStock: true, price: '$15.99', delivery: 'Same day' },
            walgreens: { inStock: true, price: '$16.99', delivery: 'Same day' },
            riteaid: { inStock: false, price: 'Out of stock', delivery: 'N/A' },
            walmart: { inStock: true, price: '$13.99', delivery: 'Same day' },
            amazon: { inStock: true, price: '$14.49', delivery: '1-2 days' },
            goodrx: { inStock: true, price: 'From $8.50', delivery: 'Compare prices' }
        }
    },
    'lisinopril': {
        name: 'Lisinopril',
        genericName: 'Lisinopril',
        category: 'Blood Pressure',
        availability: {
            cvs: { inStock: true, price: '$12.99', delivery: 'Same day' },
            walgreens: { inStock: true, price: '$13.49', delivery: 'Same day' },
            riteaid: { inStock: true, price: '$11.99', delivery: '1 day' },
            walmart: { inStock: true, price: '$9.99', delivery: 'Same day' },
            amazon: { inStock: true, price: '$10.99', delivery: '2 days' },
            goodrx: { inStock: true, price: 'From $4.00', delivery: 'Compare prices' }
        }
    },
    'metformin': {
        name: 'Metformin',
        genericName: 'Metformin HCl',
        category: 'Diabetes',
        availability: {
            cvs: { inStock: true, price: '$14.99', delivery: 'Same day' },
            walgreens: { inStock: true, price: '$15.99', delivery: 'Same day' },
            riteaid: { inStock: true, price: '$13.99', delivery: 'Same day' },
            walmart: { inStock: true, price: '$11.99', delivery: 'Same day' },
            amazon: { inStock: true, price: '$12.99', delivery: '1 day' },
            goodrx: { inStock: true, price: 'From $4.50', delivery: 'Compare prices' }
        }
    },
    'atorvastatin': {
        name: 'Atorvastatin',
        genericName: 'Atorvastatin Calcium',
        category: 'Cholesterol',
        availability: {
            cvs: { inStock: true, price: '$18.99', delivery: 'Same day' },
            walgreens: { inStock: true, price: '$19.99', delivery: 'Same day' },
            riteaid: { inStock: true, price: '$17.99', delivery: '1 day' },
            walmart: { inStock: true, price: '$15.99', delivery: 'Same day' },
            amazon: { inStock: false, price: 'Out of stock', delivery: 'N/A' },
            goodrx: { inStock: true, price: 'From $7.00', delivery: 'Compare prices' }
        }
    },
    'omeprazole': {
        name: 'Omeprazole',
        genericName: 'Omeprazole',
        category: 'Acid Reflux',
        availability: {
            cvs: { inStock: true, price: '$16.99', delivery: 'Same day' },
            walgreens: { inStock: true, price: '$17.49', delivery: 'Same day' },
            riteaid: { inStock: true, price: '$15.99', delivery: 'Same day' },
            walmart: { inStock: true, price: '$13.99', delivery: 'Same day' },
            amazon: { inStock: true, price: '$14.99', delivery: '2 days' },
            goodrx: { inStock: true, price: 'From $9.00', delivery: 'Compare prices' }
        }
    },
    'levothyroxine': {
        name: 'Levothyroxine',
        genericName: 'Levothyroxine Sodium',
        category: 'Thyroid',
        availability: {
            cvs: { inStock: true, price: '$13.99', delivery: 'Same day' },
            walgreens: { inStock: true, price: '$14.99', delivery: 'Same day' },
            riteaid: { inStock: true, price: '$12.99', delivery: '1 day' },
            walmart: { inStock: true, price: '$10.99', delivery: 'Same day' },
            amazon: { inStock: true, price: '$11.99', delivery: '1-2 days' },
            goodrx: { inStock: true, price: 'From $4.00', delivery: 'Compare prices' }
        }
    },
    'amlodipine': {
        name: 'Amlodipine',
        genericName: 'Amlodipine Besylate',
        category: 'Blood Pressure',
        availability: {
            cvs: { inStock: true, price: '$11.99', delivery: 'Same day' },
            walgreens: { inStock: true, price: '$12.99', delivery: 'Same day' },
            riteaid: { inStock: false, price: 'Out of stock', delivery: 'N/A' },
            walmart: { inStock: true, price: '$9.99', delivery: 'Same day' },
            amazon: { inStock: true, price: '$10.49', delivery: '2 days' },
            goodrx: { inStock: true, price: 'From $4.00', delivery: 'Compare prices' }
        }
    },
    'albuterol': {
        name: 'Albuterol',
        genericName: 'Albuterol Sulfate',
        category: 'Asthma / Respiratory',
        availability: {
            cvs: { inStock: true, price: '$24.99', delivery: 'Same day' },
            walgreens: { inStock: true, price: '$26.99', delivery: 'Same day' },
            riteaid: { inStock: true, price: '$23.99', delivery: 'Same day' },
            walmart: { inStock: true, price: '$21.99', delivery: 'Same day' },
            amazon: { inStock: true, price: '$22.99', delivery: '1 day' },
            goodrx: { inStock: true, price: 'From $15.00', delivery: 'Compare prices' }
        }
    }
};

// Function to search medicines
function searchMedicines(query) {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();
    const results = [];

    for (const [key, medicine] of Object.entries(MEDICINES_DB)) {
        if (medicine.name.toLowerCase().includes(lowerQuery) ||
            medicine.genericName.toLowerCase().includes(lowerQuery) ||
            medicine.category.toLowerCase().includes(lowerQuery)) {
            results.push({ key, ...medicine });
        }
    }

    return results;
}

// Function to get medicine details
function getMedicine(medicineKey) {
    return MEDICINES_DB[medicineKey.toLowerCase()];
}
