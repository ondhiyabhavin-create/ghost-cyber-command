# How to Add GHOST SVG Logo to PowerPoint

## Method 1: Direct SVG Import (PowerPoint 2019/365)
**Best for:** Modern PowerPoint versions with full SVG support

### Steps:
1. Open your PowerPoint presentation
2. Go to **Insert** tab → **Pictures** → **This Device**
3. Navigate to: `/Users/bhavinondhiya/Desktop/Ghost/public/ghost-logo.svg`
4. Select the file and click **Insert**
5. The SVG will be inserted as a vector graphic (scalable without quality loss)

### Advantages:
- ✅ Vector quality (scalable)
- ✅ Small file size
- ✅ Editable in PowerPoint

---

## Method 2: Convert to PNG (Most Compatible)
**Best for:** Older PowerPoint versions or maximum compatibility

### Option A: Using Preview (Mac)
1. Open `ghost-logo.svg` in Preview app
2. Go to **File** → **Export**
3. Choose format: **PNG**
4. Set resolution: **300 DPI** (for high quality)
5. Save as `ghost-logo.png`
6. In PowerPoint: **Insert** → **Pictures** → Select the PNG file

### Option B: Using Online Converter
1. Go to: https://cloudconvert.com/svg-to-png
2. Upload `ghost-logo.svg`
3. Set DPI to 300
4. Download PNG
5. Insert in PowerPoint

### Option C: Using Command Line (Mac Terminal)
```bash
cd /Users/bhavinondhiya/Desktop/Ghost/public
# If you have ImageMagick installed:
convert -density 300 ghost-logo.svg -resize 1000x ghost-logo-hq.png
```

---

## Method 3: Copy-Paste from Browser
**Best for:** Quick insertion

### Steps:
1. Open `ghost-logo.svg` in a web browser (Chrome/Safari)
2. Right-click on the logo → **Copy Image**
3. In PowerPoint: Right-click → **Paste**
4. Resize as needed

---

## Method 4: Insert as EMF (Windows Vector Format)
**Best for:** Windows PowerPoint with vector support

### Steps:
1. Convert SVG to EMF using online tool: https://convertio.co/svg-emf/
2. In PowerPoint: **Insert** → **Pictures** → Select EMF file
3. Maintains vector quality

---

## Method 5: Embed as Icon (PowerPoint 365)
**Best for:** Using logo as icon

### Steps:
1. Go to **Insert** → **Icons**
2. Click **Upload** icon
3. Select `ghost-logo.svg`
4. Insert and customize

---

## Recommended Settings After Insertion:

### For Best Quality:
1. **Right-click logo** → **Format Picture**
2. **Picture** tab → Set **Compression** to **High Quality**
3. **Size** tab → Check **Lock aspect ratio**
4. **Position** tab → Set alignment

### For Transparency:
- SVG already has transparent background
- PNG: Ensure you use PNG with transparency
- Right-click → **Format Picture** → **Picture** → **Transparency** → Adjust if needed

### For Consistent Sizing:
1. Select logo
2. **Format** tab → **Size** group
3. Set specific dimensions (e.g., Width: 2 inches)
4. Check **Lock aspect ratio**

---

## File Locations:
- **SVG Logo:** `/Users/bhavinondhiya/Desktop/Ghost/public/ghost-logo.svg`
- **PNG Logo:** `/Users/bhavinondhiya/Desktop/Ghost/public/ghost-logo.png`
- **Favicon SVG:** `/Users/bhavinondhiya/Desktop/Ghost/public/favicon.svg` (simpler version)

---

## Tips:
- ✅ **Use SVG** if PowerPoint version supports it (best quality)
- ✅ **Use PNG at 300 DPI** for maximum compatibility
- ✅ **Lock aspect ratio** to prevent distortion
- ✅ **Save as template** if using logo on multiple slides
- ✅ **Use Master Slide** to add logo to all slides at once

---

## Adding to All Slides (Master Slide):
1. Go to **View** → **Slide Master**
2. Select the **Master Slide** (top slide)
3. Insert logo using any method above
4. Position where you want it (usually top-right or bottom)
5. Click **Close Master View**
6. Logo will appear on all slides

---

## Troubleshooting:
- **Logo appears blurry:** Use SVG or high-resolution PNG (300 DPI)
- **Background is white:** SVG has transparent background, ensure PNG has alpha channel
- **Can't insert SVG:** Your PowerPoint version may not support SVG - use PNG instead
- **Logo too large:** Right-click → **Format Picture** → **Size** → Reduce percentage


