# PharmEasy & Pharmacy API Integration Guide

## 🎯 Current Status: No Public API Available

PharmEasy and most Indian pharmacy apps **do not offer public APIs** for external developers. This guide shows you the best approaches to work with them.

---

## ✅ Option 1: Affiliate Program (RECOMMENDED - Works Now!)

### **What You Get:**
- ✅ Earn ₹120-₹382 per sale
- ✅ Legal and ToS compliant
- ✅ Works immediately
- ✅ Track conversions

### **How to Set Up:**

#### Step 1: Sign Up for Affiliate Program

Choose one platform:

**Option A: EarnKaro** (Recommended for beginners)
- Website: https://earnkaro.com
- Commission: ₹120/sale
- Sign up → Search "PharmEasy" → Get affiliate link

**Option B: Cuelinks** (Higher payout)
- Website: https://www.cuelinks.com
- Commission: ₹126/sale
- More tracking features

**Option C: INRDeals** (Highest payout)
- Website: https://inrdeals.com
- Commission: Up to ₹382.5/sale
- Best for high volume

#### Step 2: Configure Affiliate Links

1. Open `affiliate-config.js`
2. Add your affiliate ID:

```javascript
const AFFILIATE_CONFIG = {
    pharmeasy: {
        earnkaro: {
            enabled: true, // ← Set to true
            affiliateId: 'YOUR_ACTUAL_ID', // ← Add your ID
            getAffiliateLink: (medicine) => {
                // Your affiliate link format from EarnKaro
                return `https://earnkaro.com/link/YOUR_ID/pharmeasy?search=${encodeURIComponent(medicine)}`;
            }
        }
    }
};
```

3. Update the link in your app to use affiliate links

#### Step 3: Track Earnings

Monitor your dashboard:
- EarnKaro: https://earnkaro.com/dashboard
- Cuelinks: https://www.cuelinks.com/reports
- Expected: ₹5,000-₹10,000/month with decent traffic

---

## 🔮 Option 2: If You Get API Access (Future)

### **How to Request API Access:**

Contact PharmEasy's business team:
1. Email: business@pharmeasy.in
2. Explain your use case (aggregator platform)
3. Expect: Enterprise partnership discussion
4. Reality: They likely won't provide API access for aggregators

### **IF You Get API Access, Here's the Code:**

Create a backend API proxy (required for security):

#### Backend Structure (Node.js Example):

```javascript
// backend/server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Endpoint to search medicines
app.get('/api/pharmeasy/search', async (req, res) => {
    try {
        const { medicine, pincode } = req.query;

        // Call PharmEasy API (hypothetical - they don't have one)
        const response = await axios.get('https://api.pharmeasy.in/v1/search', {
            params: {
                query: medicine,
                pincode: pincode
            },
            headers: {
                'Authorization': `Bearer ${process.env.PHARMEASY_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Return sanitized data
        res.json({
            success: true,
            data: response.data.results.map(item => ({
                name: item.product_name,
                price: item.price,
                mrp: item.mrp,
                discount: item.discount_percent,
                inStock: item.in_stock,
                delivery: item.delivery_time,
                url: item.product_url
            }))
        });

    } catch (error) {
        console.error('PharmEasy API Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch from PharmEasy'
        });
    }
});

app.listen(3000, () => console.log('Backend running on port 3000'));
```

#### Frontend Integration:

```javascript
// app.js - Update this function
async function searchPharmEasyAPI(medicine, pincode) {
    try {
        // Call your backend (not PharmEasy directly)
        const response = await fetch(`/api/pharmeasy/search?medicine=${medicine}&pincode=${pincode}`);
        const data = await response.json();

        if (data.success) {
            return data.data; // Real inventory data
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('API Error:', error);
        // Fallback to redirect
        return null;
    }
}
```

**Why Backend Required:**
- ❌ Can't expose API keys in frontend
- ❌ CORS issues with direct calls
- ✅ Rate limiting control
- ✅ Caching to reduce API calls
- ✅ Security and validation

---

## 🌐 Option 3: Web Scraping (NOT RECOMMENDED)

### **Why We Don't Recommend:**

❌ **Legal Issues:**
- Violates Terms of Service
- Can result in legal action
- IP blocking

❌ **Technical Issues:**
- Websites change frequently
- Rate limiting
- Anti-scraping measures
- Unreliable data

❌ **Ethical Issues:**
- Unfair to pharmacy platforms
- Violates data privacy

### **If You Still Consider It (at your own risk):**

```javascript
// DON'T DO THIS - Example only to show why it's bad
async function scrapePharmEasy(medicine) {
    // This will likely get blocked
    const response = await fetch(`https://pharmeasy.in/search/all?name=${medicine}`);
    const html = await response.text();

    // Parse HTML (brittle, breaks when they update)
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract data (will break often)
    const products = doc.querySelectorAll('.product-card');

    // This is unreliable, illegal, and unethical
    // DON'T USE THIS APPROACH
}
```

---

## 🎨 Option 4: Partnership Approach

### **For Serious Projects:**

1. **Reach out to PharmEasy for Partnership:**
   - Email: business@pharmeasy.in
   - Pitch: You're driving traffic to them
   - Ask for: Special affiliate rate or white-label solution

2. **Revenue Share Model:**
   - Propose: You send users, they pay % of sales
   - Better than standard affiliate
   - Requires business case

3. **White-Label Solution:**
   - They provide medicine search widget
   - You embed on your site
   - They handle transactions

---

## 💡 Best Practices (Current Implementation)

### **What We're Doing Now:**

```javascript
// 1. Deep linking with affiliate tracking
function openPharmacy(pharmacy, medicine) {
    // Check if user has app installed
    const deepLink = pharmacy.getDeepLink(medicine, pincode);
    const webLink = pharmacy.getWebLink(medicine, pincode);

    // Try app first
    window.location.href = deepLink;

    // Fallback to web (with affiliate link)
    setTimeout(() => {
        if (!document.hidden) {
            // Add affiliate parameter
            const affiliateLink = addAffiliateParams(webLink);
            window.location.href = affiliateLink;
        }
    }, 1500);
}
```

### **Add Tracking:**

```javascript
// Track which pharmacy users choose
function trackPharmacyClick(pharmacy, medicine, price) {
    // Google Analytics
    gtag('event', 'pharmacy_click', {
        pharmacy_name: pharmacy.name,
        medicine_name: medicine,
        price: price,
        timestamp: Date.now()
    });

    // Your own analytics
    fetch('/api/analytics/track', {
        method: 'POST',
        body: JSON.stringify({
            event: 'pharmacy_click',
            pharmacy: pharmacy.name,
            medicine: medicine
        })
    });
}
```

---

## 📊 Realistic Expectations

### **With Affiliate Program:**
- ✅ Start earning immediately
- ✅ ₹5,000-₹10,000/month possible
- ✅ Scales with traffic
- ✅ Legal and sustainable

### **With API Access (unlikely):**
- ❓ Requires enterprise partnership
- ❓ May cost money (API fees)
- ❓ Complex approval process
- ✅ Better user experience

### **Current App (Deep Linking):**
- ✅ Best UX without API
- ✅ Legal and compliant
- ✅ Works on all platforms
- ❌ Can't show real-time prices

---

## 🚀 Next Steps

1. **Immediate (Today):**
   - ✅ Sign up for EarnKaro/Cuelinks
   - ✅ Add affiliate links to app
   - ✅ Test on mobile devices

2. **Short Term (This Week):**
   - Add Google Analytics tracking
   - Monitor which pharmacies users click
   - Optimize for conversions

3. **Long Term (Future):**
   - Reach out to pharmacies for partnerships
   - Build backend if you get API access
   - Scale to more pharmacy apps

---

## 🔗 Resources

- **EarnKaro:** https://earnkaro.com/pharmeasy
- **Cuelinks:** https://www.cuelinks.com/campaigns/pharmeasy
- **PharmEasy:** https://pharmeasy.in
- **Contact:** business@pharmeasy.in

---

## ⚠️ Important Notes

1. **No Fake Data:** Don't show fake prices/inventory
2. **Clear Disclosure:** Tell users you use affiliate links
3. **Privacy:** Don't store sensitive health data
4. **Compliance:** Follow Indian pharmacy laws
5. **Terms of Service:** Respect all pharmacy ToS

---

**Bottom Line:** Use affiliate programs for monetization + deep linking for UX. It's the most practical, legal, and profitable approach without API access.
