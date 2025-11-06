// Affiliate Integration Configuration
// Sign up at: https://earnkaro.com/pharmeasy or https://www.cuelinks.com/

const AFFILIATE_CONFIG = {
    pharmeasy: {
        // Option 1: EarnKaro (₹120/sale)
        earnkaro: {
            enabled: false, // Set to true after signup
            affiliateId: 'YOUR_EARNKARO_ID',
            getAffiliateLink: (medicine) => {
                return `https://earnkaro.com/pharmeasy?product=${encodeURIComponent(medicine)}`;
            }
        },

        // Option 2: Cuelinks (₹126/sale)
        cuelinks: {
            enabled: false, // Set to true after signup
            affiliateId: 'YOUR_CUELINKS_ID',
            getAffiliateLink: (medicine) => {
                return `https://www.cuelinks.com/v/pharmeasy?search=${encodeURIComponent(medicine)}`;
            }
        },

        // Option 3: Direct link (no commission but works immediately)
        direct: {
            enabled: true,
            getLink: (medicine) => {
                return `https://pharmeasy.in/search/all?name=${encodeURIComponent(medicine)}`;
            }
        }
    },

    // Add more pharmacy affiliate programs
    onemg: {
        // 1mg affiliate via VCommission
        vcommission: {
            enabled: false,
            affiliateId: 'YOUR_VCOMMISSION_ID',
            getAffiliateLink: (medicine) => {
                return `https://www.vcommission.com/1mg?search=${encodeURIComponent(medicine)}`;
            }
        },
        direct: {
            enabled: true,
            getLink: (medicine) => {
                return `https://www.1mg.com/search/all?name=${encodeURIComponent(medicine)}`;
            }
        }
    }
};

// Function to get the appropriate link (affiliate or direct)
function getPharmacyLink(pharmacyKey, medicine) {
    const config = AFFILIATE_CONFIG[pharmacyKey];

    if (!config) {
        console.warn(`No config found for pharmacy: ${pharmacyKey}`);
        return null;
    }

    // Try affiliate links first
    for (const [platform, settings] of Object.entries(config)) {
        if (platform !== 'direct' && settings.enabled && settings.affiliateId !== 'YOUR_' + platform.toUpperCase() + '_ID') {
            console.log(`Using ${platform} affiliate link for ${pharmacyKey}`);
            return settings.getAffiliateLink(medicine);
        }
    }

    // Fallback to direct link
    if (config.direct && config.direct.enabled) {
        return config.direct.getLink(medicine);
    }

    return null;
}

// Track affiliate clicks (optional analytics)
function trackAffiliateClick(pharmacy, medicine, linkType) {
    // Send to your analytics
    console.log('Affiliate Click:', {
        pharmacy,
        medicine,
        linkType,
        timestamp: new Date().toISOString()
    });

    // You can send this to Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'affiliate_click', {
            pharmacy: pharmacy,
            medicine: medicine,
            link_type: linkType
        });
    }
}

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getPharmacyLink, trackAffiliateClick, AFFILIATE_CONFIG };
}
