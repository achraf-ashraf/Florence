"""
Crop the original equipment screenshot to include ALL content:
- Equipment Overview title
- Description paragraph (mentions brands)
- All 4 equipment photos
- Brands table with country of origin

Exclude:
- Top Adobe Acrobat status bar (Y=0-30)
- Left blue sidebar with LAUNDRY logo + page number "17" (X=0-80)
- Far-right page number "18" (X>920)
- Bottom margin

Result: a clean content crop suitable for the brochure.
"""
from PIL import Image

SRC = "/home/z/my-project/upload/Screenshot 2026-06-29 163816.png"
OUT = "/home/z/my-project/download/assets/equipment-full.jpg"

img = Image.open(SRC).convert('RGB')
W, H = img.size
print(f"Source: {W} x {H}")

# Crop the main content area:
# - Exclude top Adobe bar (Y < 130)
# - Exclude left blue sidebar (X < 80)
# - Exclude far-right page number (X > 940)
# - Keep some bottom margin
crop = img.crop((80, 130, 940, 820))
crop.save(OUT, quality=95)
print(f"Saved full equipment content: {crop.size} -> {OUT}")

# Verify the crop
import subprocess
result = subprocess.run([
    'z-ai', 'vision',
    '-p', 'What is visible in this image? List: (1) any title text, (2) any paragraph text, (3) how many equipment photos are visible, (4) any table content, (5) any page numbers or UI elements that should NOT be there. Be brief.',
    '-i', OUT,
    '-o', '/tmp/vlm-fullcrop.json'
], capture_output=True, text=True)
import json
d = json.load(open('/tmp/vlm-fullcrop.json'))
print("\n--- VLM verification ---")
print(d['choices'][0]['message']['content'])
