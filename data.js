// Mock database of medicines and pharmacy availability - India specific

const PHARMACY_APPS = {
    pharmeasy: {
        name: 'PharmEasy',
        icon: '💊',
        color: '#10847E',
        appScheme: 'pharmeasy://',
        webUrl: 'https://pharmeasy.in',
        // Affiliate: Sign up at https://earnkaro.com/pharmeasy (₹120/sale)
        hasAffiliate: true,
        affiliateNote: 'EarnKaro, Cuelinks, INRDeals available',
        getDeepLink: (medicine, pincode) => `pharmeasy://medicines/search?name=${encodeURIComponent(medicine)}&pincode=${pincode}`,
        getWebLink: (medicine, pincode) => `https://pharmeasy.in/search/all?name=${encodeURIComponent(medicine)}`
    },
    onemg: {
        name: '1mg',
        icon: '🏥',
        color: '#FF6F61',
        appScheme: 'onemg://',
        webUrl: 'https://www.1mg.com',
        // Affiliate: VCommission available
        hasAffiliate: true,
        affiliateNote: 'VCommission program available',
        getDeepLink: (medicine, pincode) => `onemg://search?q=${encodeURIComponent(medicine)}&pincode=${pincode}`,
        getWebLink: (medicine, pincode) => `https://www.1mg.com/search/all?name=${encodeURIComponent(medicine)}`
    },
    apollo: {
        name: 'Apollo Pharmacy',
        icon: '🏪',
        color: '#00B38E',
        appScheme: 'apollo247://',
        webUrl: 'https://www.apollopharmacy.in',
        getDeepLink: (medicine, pincode) => `apollo247://pharmacy/search?query=${encodeURIComponent(medicine)}&pincode=${pincode}`,
        getWebLink: (medicine, pincode) => `https://www.apollopharmacy.in/search-medicines/${encodeURIComponent(medicine)}`
    },
    netmeds: {
        name: 'Netmeds',
        icon: '🩺',
        color: '#1C8C8C',
        appScheme: 'netmeds://',
        webUrl: 'https://www.netmeds.com',
        getDeepLink: (medicine, pincode) => `netmeds://search?q=${encodeURIComponent(medicine)}&pincode=${pincode}`,
        getWebLink: (medicine, pincode) => `https://www.netmeds.com/catalogsearch/result/${encodeURIComponent(medicine)}/all`
    },
    medlife: {
        name: 'Medlife',
        icon: '⚕️',
        color: '#E91E63',
        appScheme: 'medlife://',
        webUrl: 'https://www.medlife.com',
        getDeepLink: (medicine, pincode) => `medlife://search?keyword=${encodeURIComponent(medicine)}&pincode=${pincode}`,
        getWebLink: (medicine, pincode) => `https://www.medlife.com/search?keyword=${encodeURIComponent(medicine)}`
    },
    tata1mg: {
        name: 'Tata 1mg',
        icon: '💙',
        color: '#1A7FA0',
        appScheme: 'tata1mg://',
        webUrl: 'https://www.1mg.com',
        getDeepLink: (medicine, pincode) => `tata1mg://search?query=${encodeURIComponent(medicine)}&pincode=${pincode}`,
        getWebLink: (medicine, pincode) => `https://www.1mg.com/search/all?name=${encodeURIComponent(medicine)}`
    }
};

// Mock medicine database with availability and pricing info (in Indian Rupees)
const MEDICINES_DB = {
    'dolo 650': {
        name: 'Dolo 650',
        genericName: 'Paracetamol',
        category: 'Pain Relief / Fever',
        manufacturer: 'Micro Labs',
        availability: {
            pharmeasy: { inStock: true, price: '₹28', delivery: 'Today', discount: '15% off' },
            onemg: { inStock: true, price: '₹30', delivery: 'Today', discount: '10% off' },
            apollo: { inStock: true, price: '₹32', delivery: 'Today', discount: '5% off' },
            netmeds: { inStock: true, price: '₹29', delivery: 'Today', discount: '12% off' },
            medlife: { inStock: true, price: '₹31', delivery: 'Tomorrow', discount: '8% off' },
            tata1mg: { inStock: true, price: '₹30', delivery: 'Today', discount: '10% off' }
        }
    },
    'crocin': {
        name: 'Crocin',
        genericName: 'Paracetamol',
        category: 'Pain Relief / Fever',
        manufacturer: 'GSK',
        availability: {
            pharmeasy: { inStock: true, price: '₹24', delivery: 'Today', discount: '20% off' },
            onemg: { inStock: true, price: '₹26', delivery: 'Today', discount: '15% off' },
            apollo: { inStock: true, price: '₹25', delivery: 'Today', discount: '18% off' },
            netmeds: { inStock: true, price: '₹23', delivery: 'Today', discount: '22% off' },
            medlife: { inStock: true, price: '₹27', delivery: 'Today', discount: '12% off' },
            tata1mg: { inStock: true, price: '₹26', delivery: 'Today', discount: '15% off' }
        }
    },
    'azithromycin': {
        name: 'Azithromycin 500mg',
        genericName: 'Azithromycin',
        category: 'Antibiotic',
        manufacturer: 'Various',
        availability: {
            pharmeasy: { inStock: true, price: '₹95', delivery: 'Today', discount: '10% off' },
            onemg: { inStock: true, price: '₹98', delivery: 'Tomorrow', discount: '8% off' },
            apollo: { inStock: true, price: '₹92', delivery: 'Today', discount: '12% off' },
            netmeds: { inStock: false, price: 'Out of stock', delivery: 'N/A', discount: '' },
            medlife: { inStock: true, price: '₹96', delivery: 'Today', discount: '9% off' },
            tata1mg: { inStock: true, price: '₹98', delivery: 'Tomorrow', discount: '8% off' }
        }
    },
    'metformin': {
        name: 'Metformin 500mg',
        genericName: 'Metformin HCl',
        category: 'Diabetes',
        manufacturer: 'Various',
        availability: {
            pharmeasy: { inStock: true, price: '₹45', delivery: 'Today', discount: '25% off' },
            onemg: { inStock: true, price: '₹48', delivery: 'Today', discount: '20% off' },
            apollo: { inStock: true, price: '₹42', delivery: 'Today', discount: '28% off' },
            netmeds: { inStock: true, price: '₹44', delivery: 'Today', discount: '26% off' },
            medlife: { inStock: true, price: '₹46', delivery: 'Tomorrow', discount: '23% off' },
            tata1mg: { inStock: true, price: '₹48', delivery: 'Today', discount: '20% off' }
        }
    },
    'pantoprazole': {
        name: 'Pantoprazole 40mg',
        genericName: 'Pantoprazole',
        category: 'Acidity / GERD',
        manufacturer: 'Various',
        availability: {
            pharmeasy: { inStock: true, price: '₹68', delivery: 'Today', discount: '18% off' },
            onemg: { inStock: true, price: '₹72', delivery: 'Today', discount: '15% off' },
            apollo: { inStock: true, price: '₹65', delivery: 'Today', discount: '22% off' },
            netmeds: { inStock: true, price: '₹70', delivery: 'Today', discount: '17% off' },
            medlife: { inStock: true, price: '₹69', delivery: 'Today', discount: '19% off' },
            tata1mg: { inStock: true, price: '₹72', delivery: 'Tomorrow', discount: '15% off' }
        }
    },
    'amlodipine': {
        name: 'Amlodipine 5mg',
        genericName: 'Amlodipine Besylate',
        category: 'Blood Pressure',
        manufacturer: 'Various',
        availability: {
            pharmeasy: { inStock: true, price: '₹52', delivery: 'Today', discount: '30% off' },
            onemg: { inStock: true, price: '₹55', delivery: 'Today', discount: '28% off' },
            apollo: { inStock: true, price: '₹50', delivery: 'Today', discount: '32% off' },
            netmeds: { inStock: true, price: '₹53', delivery: 'Today', discount: '29% off' },
            medlife: { inStock: false, price: 'Out of stock', delivery: 'N/A', discount: '' },
            tata1mg: { inStock: true, price: '₹55', delivery: 'Today', discount: '28% off' }
        }
    },
    'atorvastatin': {
        name: 'Atorvastatin 10mg',
        genericName: 'Atorvastatin',
        category: 'Cholesterol',
        manufacturer: 'Various',
        availability: {
            pharmeasy: { inStock: true, price: '₹85', delivery: 'Today', discount: '22% off' },
            onemg: { inStock: true, price: '₹88', delivery: 'Today', discount: '20% off' },
            apollo: { inStock: true, price: '₹82', delivery: 'Today', discount: '25% off' },
            netmeds: { inStock: true, price: '₹86', delivery: 'Tomorrow', discount: '21% off' },
            medlife: { inStock: true, price: '₹87', delivery: 'Today', discount: '20% off' },
            tata1mg: { inStock: true, price: '₹88', delivery: 'Today', discount: '20% off' }
        }
    },
    'cetirizine': {
        name: 'Cetirizine 10mg',
        genericName: 'Cetirizine',
        category: 'Allergy',
        manufacturer: 'Various',
        availability: {
            pharmeasy: { inStock: true, price: '₹18', delivery: 'Today', discount: '35% off' },
            onemg: { inStock: true, price: '₹20', delivery: 'Today', discount: '30% off' },
            apollo: { inStock: true, price: '₹17', delivery: 'Today', discount: '38% off' },
            netmeds: { inStock: true, price: '₹19', delivery: 'Today', discount: '33% off' },
            medlife: { inStock: true, price: '₹21', delivery: 'Today', discount: '28% off' },
            tata1mg: { inStock: true, price: '₹20', delivery: 'Today', discount: '30% off' }
        }
    },
    'montelukast': {
        name: 'Montelukast 10mg',
        genericName: 'Montelukast',
        category: 'Asthma / Allergy',
        manufacturer: 'Various',
        availability: {
            pharmeasy: { inStock: true, price: '₹125', delivery: 'Today', discount: '15% off' },
            onemg: { inStock: true, price: '₹130', delivery: 'Today', discount: '12% off' },
            apollo: { inStock: true, price: '₹122', delivery: 'Today', discount: '18% off' },
            netmeds: { inStock: true, price: '₹128', delivery: 'Tomorrow', discount: '13% off' },
            medlife: { inStock: true, price: '₹126', delivery: 'Today', discount: '14% off' },
            tata1mg: { inStock: true, price: '₹130', delivery: 'Today', discount: '12% off' }
        }
    },
    'vitamin d3': {
        name: 'Vitamin D3 60K',
        genericName: 'Cholecalciferol',
        category: 'Vitamin Supplement',
        manufacturer: 'Various',
        availability: {
            pharmeasy: { inStock: true, price: '₹75', delivery: 'Today', discount: '20% off' },
            onemg: { inStock: true, price: '₹78', delivery: 'Today', discount: '18% off' },
            apollo: { inStock: true, price: '₹72', delivery: 'Today', discount: '24% off' },
            netmeds: { inStock: true, price: '₹76', delivery: 'Today', discount: '19% off' },
            medlife: { inStock: true, price: '₹77', delivery: 'Today', discount: '18% off' },
            tata1mg: { inStock: true, price: '₹78', delivery: 'Today', discount: '18% off' }
        }
    },
    'calpol': {
        name: 'Calpol 500mg',
        genericName: 'Paracetamol',
        category: 'Pain Relief / Fever',
        manufacturer: 'GSK',
        availability: {
            pharmeasy: { inStock: true, price: '₹32', delivery: 'Today', discount: '12% off' },
            onemg: { inStock: true, price: '₹35', delivery: 'Today', discount: '8% off' },
            apollo: { inStock: true, price: '₹33', delivery: 'Today', discount: '10% off' },
            netmeds: { inStock: true, price: '₹31', delivery: 'Today', discount: '14% off' },
            medlife: { inStock: true, price: '₹34', delivery: 'Today', discount: '9% off' },
            tata1mg: { inStock: true, price: '₹35', delivery: 'Today', discount: '8% off' }
        }
    },
    'levothyroxine': {
        name: 'Levothyroxine 50mcg',
        genericName: 'Levothyroxine',
        category: 'Thyroid',
        manufacturer: 'Various',
        availability: {
            pharmeasy: { inStock: true, price: '₹58', delivery: 'Today', discount: '25% off' },
            onemg: { inStock: true, price: '₹62', delivery: 'Today', discount: '22% off' },
            apollo: { inStock: true, price: '₹55', delivery: 'Today', discount: '28% off' },
            netmeds: { inStock: true, price: '₹60', delivery: 'Today', discount: '23% off' },
            medlife: { inStock: true, price: '₹59', delivery: 'Tomorrow', discount: '24% off' },
            tata1mg: { inStock: true, price: '₹62', delivery: 'Today', discount: '22% off' }
        }
    }
};

// Indian pincodes database (sample cities)
const PINCODE_INFO = {
    '110001': { city: 'New Delhi', state: 'Delhi' },
    '400001': { city: 'Mumbai', state: 'Maharashtra' },
    '560001': { city: 'Bangalore', state: 'Karnataka' },
    '600001': { city: 'Chennai', state: 'Tamil Nadu' },
    '700001': { city: 'Kolkata', state: 'West Bengal' },
    '500001': { city: 'Hyderabad', state: 'Telangana' },
    '411001': { city: 'Pune', state: 'Maharashtra' },
    '380001': { city: 'Ahmedabad', state: 'Gujarat' },
    '201301': { city: 'Noida', state: 'Uttar Pradesh' },
    '122001': { city: 'Gurgaon', state: 'Haryana' }
};

// Function to validate Indian pincode
function isValidPincode(pincode) {
    return /^[1-9][0-9]{5}$/.test(pincode);
}

// Function to get pincode info
function getPincodeInfo(pincode) {
    return PINCODE_INFO[pincode] || { city: 'Your area', state: 'India' };
}

// Function to search medicines
function searchMedicines(query) {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();
    const results = [];

    for (const [key, medicine] of Object.entries(MEDICINES_DB)) {
        if (medicine.name.toLowerCase().includes(lowerQuery) ||
            medicine.genericName.toLowerCase().includes(lowerQuery) ||
            medicine.category.toLowerCase().includes(lowerQuery) ||
            medicine.manufacturer.toLowerCase().includes(lowerQuery)) {
            results.push({ key, ...medicine });
        }
    }

    return results;
}

// Function to get medicine details
function getMedicine(medicineKey) {
    return MEDICINES_DB[medicineKey.toLowerCase()];
}
