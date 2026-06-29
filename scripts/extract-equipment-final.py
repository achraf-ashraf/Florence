"""
Final, simple equipment photo extraction.

Based on all analysis: there are 2 distinct equipment photos in the screenshot:
  Photo 1 (left): Ironing press — X≈130-435, Y≈400-790
  Photo 2 (right): Washing machine — X≈460-645, Y≈400-790

This script cleanly crops both and assembles them into a premium horizontal strip
on a dark background that matches the brochure's theme.
"""
from PIL import Image, ImageOps

SRC = "/home/z/my-project/upload/Screenshot 2026-06-29 163816.png"
OUT_DIR = "/home/z/my-project/download/assets"

img = Image.open(SRC).convert('RGB')
W, H = img.size

# Two photo regions (with padding) — based on gap detection that found:
# Photo 1: X=130-435, Photo 2: X=459-646
# Adding 10px padding on each side for safety
photos = [
    ('press',     120, 400, 445, 800),   # Ironing press
    ('washer',    450, 400, 660, 800),   # Washing machine
]

crops = []
for name, l, t, r, b in photos:
    crop = img.crop((l, t, r, b))
    # Auto-trim white borders by finding the bounding box of non-white content
    # Convert to grayscale and find non-white region
    gray = crop.convert('L')
    import numpy as np
    arr = np.array(gray)
    # Non-white = brightness < 240
    non_white = arr < 240
    rows = np.where(non_white.any(axis=1))[0]
    cols = np.where(non_white.any(axis=0))[0]
    if len(rows) > 0 and len(cols) > 0:
        top_pad = max(rows[0] - 8, 0)
        bot_pad = min(rows[-1] + 8, crop.size[1])
        left_pad = max(cols[0] - 8, 0)
        right_pad = min(cols[-1] + 8, crop.size[0])
        crop = crop.crop((left_pad, top_pad, right_pad, bot_pad))

    out_path = f'{OUT_DIR}/equipment-{name}.jpg'
    crop.save(out_path, quality=95)
    crops.append(crop)
    print(f"Saved {name}: {crop.size} -> {out_path}")

# Create premium horizontal strip on dark background (matches brochure theme)
print("\n--- Creating premium equipment strip ---")
target_h = max(c.size[1] for c in crops)
gap_px = 24
resized = []
for c in crops:
    new_w = int(c.size[0] * target_h / c.size[1])
    resized.append(c.resize((new_w, target_h), Image.LANCZOS))

total_w = sum(c.size[0] for c in resized) + gap_px * (len(resized) - 1)
# Dark background matching brochure theme
strip = Image.new('RGB', (total_w, target_h), (15, 15, 17))
x = 0
for c in resized:
    strip.paste(c, (x, 0))
    x += c.size[0] + gap_px

strip_path = f'{OUT_DIR}/equipment-showcase.jpg'
strip.save(strip_path, quality=95)
print(f"Saved equipment showcase strip: {strip.size} -> {strip_path}")

# Also create a version with subtle gold border around each photo
print("\n--- Creating bordered version ---")
strip_bordered = Image.new('RGB', (total_w, target_h), (15, 15, 17))
x = 0
for c in resized:
    # Add thin gold border (1px)
    bordered = ImageOps.expand(c, border=1, fill=(197, 163, 90))
    # Recalculate size after border
    bw, bh = bordered.size
    strip_bordered.paste(bordered, (x, 0))
    x += bw + gap_px - 2  # adjust for border

strip_bordered_path = f'{OUT_DIR}/equipment-showcase-bordered.jpg'
strip_bordered.save(strip_bordered_path, quality=95)
print(f"Saved bordered equipment strip: {strip_bordered.size}")

# Clean up old experimental files
import os
for f in os.listdir(OUT_DIR):
    if f.startswith('equipment-') and f not in ['equipment-press.jpg', 'equipment-washer.jpg', 'equipment-showcase.jpg', 'equipment-showcase-bordered.jpg']:
        os.remove(os.path.join(OUT_DIR, f))
        print(f"  Removed old file: {f}")

print("\n--- Final equipment assets ---")
for f in sorted(os.listdir(OUT_DIR)):
    if f.startswith('equipment-'):
        size = os.path.getsize(os.path.join(OUT_DIR, f))
        print(f"  {f}: {size//1024}KB")
