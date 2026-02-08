# How to Generate Project Preview Images

I've created 3 HTML files that generate professional-looking project previews. Follow these steps to capture them as images:

## Method 1: Screenshot (Quickest)

1. **Open each HTML file** in your browser:
   - `oil-spill-generator.html`
   - `energy-dashboard-generator.html`
   - `financial-ai-generator.html`

2. **Take a screenshot** (macOS):
   - Press `Cmd + Shift + 4`
   - Press `Space` to capture the entire window
   - Click on the browser window
   - Image saves to Desktop

3. **Rename and move files**:
   ```bash
   mv ~/Desktop/Screenshot*.png oil-spill.jpg
   mv ~/Desktop/Screenshot*.png energy-dashboard.jpg
   mv ~/Desktop/Screenshot*.png financial-ai.jpg

   # Move to project previews folder
   mv oil-spill.jpg my-portfolio/public/project-previews/
   mv energy-dashboard.jpg my-portfolio/public/project-previews/
   mv financial-ai.jpg my-portfolio/public/project-previews/
   ```

## Method 2: Browser DevTools (Best Quality)

1. Open each HTML file in Chrome/Edge
2. Press `F12` to open DevTools
3. Press `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows)
4. Type "screenshot" and select **"Capture node screenshot"**
5. Click on the canvas element
6. Image downloads automatically

## Method 3: Use the Command Below

I can help you open all three files at once:

```bash
open /Users/kamal/Desktop/Raicode/VatsWebsite/public/project-previews/oil-spill-generator.html
open /Users/kamal/Desktop/Raicode/VatsWebsite/public/project-previews/energy-dashboard-generator.html
open /Users/kamal/Desktop/Raicode/VatsWebsite/public/project-previews/financial-ai-generator.html
```

## What You'll Get:

### 1. Oil Spill Simulation (800x600px)
- **Ocean water background** with blue gradient
- **Animated oil spills** spreading across the surface
- **Green monitoring data points**
- **Grid overlay** for simulation visualization
- Tech badges: Python, Pandas, Simulation

### 2. Energy Analytics Dashboard (800x600px)
- **Dashboard layout** with stat cards
- **Animated line chart** showing energy data
- **Real-time metrics**: 1M+ Records, 3x Faster
- **Professional analytics theme**
- Tech badges: Python, PySpark, ETL

### 3. Financial AI Agent (800x600px)
- **Neural network visualization** with animated nodes
- **AI chat interface mockup** with typing indicator
- **Purple/violet AI theme**
- **Connection lines** showing data flow
- Tech badges: LangChain, LLaMA, AI Agent

## File Naming:

Save the screenshots as:
- `oil-spill.jpg`
- `energy-dashboard.jpg`
- `financial-ai.jpg`

Place them in: `my-portfolio/public/project-previews/`

## For AV Danse Studio:

When you're ready with the image, save it as:
- `av-danse.jpg`

Same location: `my-portfolio/public/project-previews/`

---

**Need help?** Let me know if you want me to adjust any colors, layouts, or text on the generators!
