# Screenshot Instructions for Project Images

All 4 project image generators should now be open in your browser!

## Quick Screenshot Method (macOS):

1. **Press** `Cmd + Shift + 4`
2. **Press** `Space` (cursor changes to camera icon)
3. **Click** on each browser window to capture
4. Screenshots save to Desktop automatically

## Rename & Move Files:

After taking all 4 screenshots, run these commands:

```bash
cd ~/Desktop

# Rename screenshots (adjust filenames based on timestamp)
mv Screenshot*.png oil-spill.jpg
mv Screenshot*.png energy-dashboard.jpg
mv Screenshot*.png financial-ai.jpg
mv Screenshot*.png av-danse.jpg

# Move to project folder
mv oil-spill.jpg ~/Desktop/Raicode/VatsWebsite/my-portfolio/public/project-previews/
mv energy-dashboard.jpg ~/Desktop/Raicode/VatsWebsite/my-portfolio/public/project-previews/
mv financial-ai.jpg ~/Desktop/Raicode/VatsWebsite/my-portfolio/public/project-previews/
mv av-danse.jpg ~/Desktop/Raicode/VatsWebsite/my-portfolio/public/project-previews/
```

## What You're Capturing:

1. **Oil Spill Simulation** - Blue ocean theme with oil spills and monitoring data points
2. **Energy Analytics Dashboard** - Blue analytics theme with dashboard cards and charts
3. **Financial AI Agent** - Purple AI theme with neural network and chat interface
4. **AV Danse Studio** - Golden/orange Bharatanatyam theme with Indian-inspired patterns

## Alternative: Better Quality with DevTools

For higher quality images:
1. Open DevTools (`F12`)
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Type "screenshot" → Select **"Capture node screenshot"**
4. Click on the `.canvas` element in the page
5. Image downloads automatically (already named)

---

Once all 4 images are in `my-portfolio/public/project-previews/`, I'll update the code to use them!
