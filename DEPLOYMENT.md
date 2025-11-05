# Deployment Guide for MedFinder India 🚀

This guide covers multiple deployment options for hosting MedFinder India. Choose the option that best fits your needs.

## Quick Comparison

| Option | Cost | Setup Time | Best For | Automatic Updates |
|--------|------|------------|----------|-------------------|
| **GitHub Pages** | Free | 2 min | Static sites | ✅ Yes |
| **Azure Static Web Apps** | Free tier | 5 min | Static sites with future API | ✅ Yes |
| **Azure Web Apps (Python)** | Paid | 10 min | If you need Python backend | ✅ Yes |
| **Netlify** | Free tier | 2 min | Quick deployments | ✅ Yes |
| **Vercel** | Free tier | 2 min | Best DX | ✅ Yes |

---

## Option 1: GitHub Pages (Recommended - Easiest) 🌟

**Perfect for:** Static sites, zero configuration, completely free

### Setup Steps:

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**
   - Save

2. **Push the workflow:**
   ```bash
   git add .github/workflows/github-pages.yml
   git commit -m "Add GitHub Pages deployment"
   git push
   ```

3. **Access your site:**
   - Your app will be live at: `https://rushabhshah011.github.io/medicine-availability/`
   - Check deployment status: **Actions** tab in GitHub

**Pros:**
- ✅ Completely free
- ✅ Automatic HTTPS
- ✅ No configuration needed
- ✅ Auto-deploys on every push to main/master

**Cons:**
- ❌ Limited to static content (perfect for this app!)

---

## Option 2: Azure Static Web Apps 🔷

**Perfect for:** Static sites with future plans for serverless APIs

### Setup Steps:

1. **Create Azure Static Web App:**
   ```bash
   # Install Azure CLI if not already installed
   # https://docs.microsoft.com/cli/azure/install-azure-cli

   # Login to Azure
   az login

   # Create resource group
   az group create --name medfinder-rg --location eastus

   # Create static web app
   az staticwebapp create \
     --name medfinder-india \
     --resource-group medfinder-rg \
     --location eastus \
     --sku Free
   ```

2. **Get deployment token:**
   ```bash
   az staticwebapp secrets list \
     --name medfinder-india \
     --resource-group medfinder-rg \
     --query "properties.apiKey" -o tsv
   ```

3. **Add token to GitHub Secrets:**
   - Go to your repo → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: Paste the token from step 2

4. **Push and deploy:**
   ```bash
   git add .github/workflows/azure-static-webapps.yml
   git commit -m "Add Azure Static Web Apps deployment"
   git push
   ```

5. **Get your URL:**
   ```bash
   az staticwebapp show \
     --name medfinder-india \
     --resource-group medfinder-rg \
     --query "defaultHostname" -o tsv
   ```

**Pros:**
- ✅ Free tier (100GB bandwidth/month)
- ✅ Custom domains with free SSL
- ✅ Can add serverless APIs later
- ✅ Global CDN included
- ✅ Staging environments for PRs

**Cons:**
- ❌ Requires Azure account
- ❌ More complex setup

---

## Option 3: Azure Web Apps with Python 🐍

**Perfect for:** If you need a Python backend or server-side logic

### Setup Steps:

1. **Create Azure Web App:**
   ```bash
   # Create App Service Plan
   az appservice plan create \
     --name medfinder-plan \
     --resource-group medfinder-rg \
     --sku B1 \
     --is-linux

   # Create Web App
   az webapp create \
     --name medfinder-india \
     --resource-group medfinder-rg \
     --plan medfinder-plan \
     --runtime "PYTHON:3.11"
   ```

2. **Get publish profile:**
   ```bash
   az webapp deployment list-publishing-profiles \
     --name medfinder-india \
     --resource-group medfinder-rg \
     --xml
   ```

3. **Add to GitHub Secrets:**
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Value: Paste the entire XML output

4. **Update workflow:**
   - Edit `.github/workflows/azure-webapps-python.yml`
   - Change `AZURE_WEBAPP_NAME` to your app name

5. **Deploy:**
   ```bash
   git add .github/workflows/azure-webapps-python.yml
   git commit -m "Add Azure Python Web App deployment"
   git push
   ```

**Pros:**
- ✅ Can add Python backend later
- ✅ Full server control
- ✅ Support for server-side rendering

**Cons:**
- ❌ Not free (starts ~$13/month for B1 tier)
- ❌ Overkill for static sites
- ❌ More complex than static hosting

---

## Option 4: Netlify (No GitHub Actions Needed) 🎯

**Perfect for:** Quick deployments with great DX

### Setup Steps:

1. **Via Netlify Dashboard:**
   - Go to [https://netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Choose your repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `/`
   - Click "Deploy site"

2. **Via Netlify CLI:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login
   netlify login

   # Deploy
   netlify deploy --prod
   ```

**URL:** You'll get a URL like `medfinder-india.netlify.app`

**Pros:**
- ✅ Super easy setup
- ✅ Free tier (100GB bandwidth/month)
- ✅ Instant cache invalidation
- ✅ Great CI/CD dashboard
- ✅ Free SSL & custom domains

---

## Option 5: Vercel (No GitHub Actions Needed) ⚡

**Perfect for:** Best developer experience

### Setup Steps:

1. **Via Vercel Dashboard:**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Import Project"
   - Select your repository
   - No build settings needed
   - Click "Deploy"

2. **Via Vercel CLI:**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login
   vercel login

   # Deploy
   vercel --prod
   ```

**URL:** You'll get a URL like `medfinder-india.vercel.app`

**Pros:**
- ✅ Instant deployments
- ✅ Free tier (100GB bandwidth/month)
- ✅ Preview deployments for PRs
- ✅ Excellent performance
- ✅ Zero configuration

---

## Custom Domain Setup

### For GitHub Pages:
1. Add a `CNAME` file with your domain
2. Add DNS records at your domain registrar:
   ```
   CNAME  www   rushabhshah011.github.io.
   A      @     185.199.108.153
   A      @     185.199.109.153
   A      @     185.199.110.153
   A      @     185.199.111.153
   ```

### For Azure/Netlify/Vercel:
- Follow the respective platform's custom domain wizard
- All provide free SSL certificates automatically

---

## Environment Variables (If Needed Later)

For future API integrations, you can add environment variables:

### GitHub Actions:
```yaml
env:
  PHARMACY_API_KEY: ${{ secrets.PHARMACY_API_KEY }}
```

### Azure Static Web Apps:
```bash
az staticwebapp appsettings set \
  --name medfinder-india \
  --setting-names PHARMACY_API_KEY=your-key
```

### Netlify/Vercel:
- Dashboard → Site settings → Environment variables

---

## Monitoring & Analytics

### Add Google Analytics:
Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Performance Monitoring:
- **Lighthouse CI**: Run on every deploy
- **Vercel Analytics**: Built-in performance monitoring
- **Azure Application Insights**: For Azure deployments

---

## Troubleshooting

### GitHub Pages not working?
- Check Actions tab for errors
- Ensure branch name is `main` or `master`
- Verify Pages is enabled in Settings

### Azure deployment failing?
- Check secrets are correctly set
- Verify resource names match
- Check Action logs for detailed errors

### Files not updating?
- Clear browser cache (Ctrl+Shift+R)
- Check CDN cache settings
- Wait a few minutes for propagation

---

## Recommended Setup for MedFinder India

**For immediate deployment:** → **GitHub Pages** (2 minutes)

**For production app:** → **Azure Static Web Apps** or **Vercel** (5 minutes)

**If adding backend APIs later:** → **Azure Static Web Apps** (supports Azure Functions)

---

## Security Considerations

All deployment options provide:
- ✅ Automatic HTTPS/SSL
- ✅ DDoS protection
- ✅ CDN distribution
- ✅ Regular security updates

For production:
- Add Content Security Policy (CSP) headers
- Enable HSTS
- Add rate limiting (if using APIs)
- Set up error tracking (Sentry)

---

## Cost Comparison (Monthly)

| Platform | Free Tier | Paid (if exceeding) |
|----------|-----------|---------------------|
| GitHub Pages | Always free | N/A |
| Azure Static Web Apps | Free | $9 (Standard) |
| Azure Web Apps | N/A | $13+ (B1 tier) |
| Netlify | 100GB | $19 (Pro) |
| Vercel | 100GB | $20 (Pro) |

**For MedFinder India:** The free tiers are more than enough for thousands of users!

---

## Next Steps

1. Choose your deployment platform
2. Follow the setup steps above
3. Push your code
4. Share your live URL! 🎉

Need help? Check the logs in:
- **GitHub Actions**: Actions tab
- **Azure**: Portal → Deployment Center
- **Netlify/Vercel**: Dashboard → Deploys
