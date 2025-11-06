# 🎯 Quick Start: Earn Money with Affiliate Links

## What You'll Earn
- **₹120-₹382 per sale** from PharmEasy
- **₹5,000-₹10,000/month** with decent traffic
- **100% legal and sustainable**

---

## Step 1: Sign Up (5 minutes)

### Option A: EarnKaro (Easiest - Recommended)

1. **Visit:** https://earnkaro.com
2. **Sign up** with email/phone
3. **Search** for "PharmEasy" in campaigns
4. **Get your affiliate link**

**Expected:** ₹120 per completed order

### Option B: Cuelinks (Higher Payout)

1. **Visit:** https://www.cuelinks.com
2. **Register** as publisher
3. **Find** PharmEasy campaign
4. **Copy** your affiliate ID

**Expected:** ₹126 per sale

### Option C: INRDeals (Highest Payout)

1. **Visit:** https://inrdeals.com
2. **Sign up** for affiliate program
3. **Search** PharmEasy
4. **Get** tracking link

**Expected:** Up to ₹382.5 per sale

---

## Step 2: Configure Your App (2 minutes)

### Edit `affiliate-config.js`

Replace the placeholder with your actual affiliate ID:

```javascript
const AFFILIATE_CONFIG = {
    pharmeasy: {
        earnkaro: {
            enabled: true, // ← Change to true
            affiliateId: 'EA123456', // ← Your actual ID
            getAffiliateLink: (medicine) => {
                // Get this format from EarnKaro dashboard
                return `https://ekaro.in/enkr12345?link=https://pharmeasy.in/search/all?name=${encodeURIComponent(medicine)}`;
            }
        }
    }
};
```

### Where to Find Your Affiliate Link Format:

**EarnKaro:**
- Dashboard → My Links → Create Link
- Choose PharmEasy
- Copy the generated link format
- Example: `https://ekaro.in/enkr12345?link=DESTINATION_URL`

**Cuelinks:**
- Dashboard → Get Link
- Select PharmEasy
- Copy tracking URL
- Example: `https://linksredirect.com/?pub_id=12345&url=DESTINATION_URL`

---

## Step 3: Test It (1 minute)

1. **Run your app** locally:
   ```bash
   python3 -m http.server 8000
   ```

2. **Search** for a medicine (e.g., "Dolo 650")

3. **Click** on PharmEasy card

4. **Check** the URL in browser - should see your affiliate ID

5. **Verify** on affiliate dashboard that click was tracked

---

## Step 4: Deploy & Track

### Deploy to GitHub Pages:
```bash
git add affiliate-config.js
git commit -m "Add affiliate integration"
git push origin master
```

### Monitor Earnings:

**EarnKaro Dashboard:**
- https://earnkaro.com/dashboard
- View clicks, conversions, earnings

**Cuelinks Reports:**
- https://www.cuelinks.com/reports
- Detailed analytics

---

## 💰 Maximizing Earnings

### 1. **Optimize Conversion:**
```javascript
// Add urgency messaging
"Limited stock - Order now on PharmEasy"

// Highlight discounts
"Get ${discount}% off + ₹120 cashback"
```

### 2. **Track Performance:**
```javascript
// Know which medicines convert best
trackAffiliateClick(pharmacy, medicine, 'earnkaro');
```

### 3. **A/B Test:**
- Test different affiliate networks
- Compare conversion rates
- Stick with highest earnings

### 4. **Add More Pharmacies:**
```javascript
// Add 1mg, Apollo, etc.
onemg: {
    vcommission: {
        enabled: true,
        affiliateId: 'YOUR_ID'
    }
}
```

---

## 📊 Expected Timeline

### Week 1:
- ✅ Setup complete
- ✅ First clicks tracked
- Expected earnings: ₹0-₹500

### Month 1:
- 100-200 users/day
- 5-10 conversions
- Expected earnings: ₹2,000-₹5,000

### Month 3:
- 500-1000 users/day
- 20-30 conversions
- Expected earnings: ₹10,000-₹20,000

---

## ⚠️ Important Rules

### ✅ DO:
- Disclose affiliate links to users
- Track real conversions
- Provide value (price comparison)
- Follow affiliate program terms

### ❌ DON'T:
- Click your own links (banned!)
- Use fake traffic (bots)
- Misrepresent prices
- Violate ToS

---

## 🔧 Troubleshooting

### "My clicks aren't tracking"
- Check affiliate ID is correct
- Verify link format matches network
- Test in incognito mode
- Contact affiliate support

### "No conversions"
- Users must complete purchase
- Cookies must be enabled
- Check attribution window (usually 30 days)
- Optimize your landing page

### "Need help?"
- EarnKaro support: support@earnkaro.com
- Cuelinks support: https://www.cuelinks.com/contact
- Community: Search for affiliate marketing groups

---

## 📈 Growth Strategy

### Phase 1: Basic Setup
- [x] Sign up for affiliate
- [x] Add to app
- [x] Test conversions

### Phase 2: Optimize
- [ ] Add Google Analytics
- [ ] Track best-performing medicines
- [ ] A/B test pharmacy order
- [ ] Add promotional banners

### Phase 3: Scale
- [ ] Add more pharmacy affiliates
- [ ] Create blog content (SEO)
- [ ] Share on social media
- [ ] Partner with health influencers

---

## 🎓 Resources

### Learning:
- **Affiliate Marketing Basics:** YouTube tutorials
- **Conversion Optimization:** Google Analytics Academy
- **Indian Affiliate Programs:** MoneytizeDeal blog

### Tools:
- **Google Analytics:** Track which pharmacies convert
- **Hotjar:** See user behavior
- **Bitly:** Track link clicks

### Communities:
- r/AffiliateMarketing (Reddit)
- Affiliate Marketing India (Facebook)
- Digital Marketing forums

---

## ✨ Pro Tips

1. **Seasonal Promotions:**
   - Flu season → Promote cold medicines
   - Summer → Promote vitamins
   - Festivals → Health checkup packages

2. **Combo Deals:**
   - "Buy Dolo 650 + Get free delivery"
   - "Order 3+ items, save more"

3. **Trust Building:**
   - Show real prices
   - Honest comparisons
   - User reviews

4. **Mobile Optimization:**
   - Most users on mobile
   - Fast loading critical
   - Easy checkout flow

---

## 💡 Final Checklist

Before launching:
- [ ] Affiliate ID configured
- [ ] Links tested in multiple browsers
- [ ] Tracking verified in dashboard
- [ ] Disclosure added ("We earn commission")
- [ ] Privacy policy updated
- [ ] Analytics setup
- [ ] Mobile tested

---

**Questions?** Check the `API_INTEGRATION_GUIDE.md` for more details!

**Ready to earn?** Sign up now: https://earnkaro.com/pharmeasy

Happy earning! 💰
