"""
Remove black background from the Florence Laundry logo.

Input:  /home/z/my-project/download/assets/florence-logo.jpeg
        (768x1366 JPEG, black background, gold icon + text)

Output: /home/z/my-project/download/assets/florence-logo-cover.png     (full logo, transparent)
        /home/z/my-project/download/assets/florence-logo-header.png    (icon-only crop, transparent)

Strategy:
  The logo is gold/yellow on pure black. We use a luminance-based alpha channel
  with a soft threshold so:
    - Pure black (0,0,0)        → alpha 0   (fully transparent)
    - Dim compression artifacts → alpha 0   (still transparent)
    - Gold edges                → soft transition (anti-aliased)
    - Bright gold               → alpha 255 (fully opaque)
"""
from PIL import Image
import numpy as np

SRC = '/home/z/my-project/download/assets/florence-logo.jpeg'
OUT_FULL = '/home/z/my-project/download/assets/florence-logo-cover.png'
OUT_ICON = '/home/z/my-project/download/assets/florence-logo-header.png'

# --- 1. Load and convert to RGBA ---
img = Image.open(SRC).convert('RGB')
arr = np.array(img)
H, W, _ = arr.shape
print(f"Loaded logo: {W} x {H}")

# --- 2. Compute brightness (max of RGB channels — best for gold-on-black) ---
brightness = arr.max(axis=2).astype(float)

# --- 3. Soft-threshold alpha ---
# 0-60    → fully transparent (kills pure black bg + JPEG compression noise)
# 60-140  → smooth transition (preserves anti-aliased gold edges)
# 140+    → fully opaque (preserves bright gold)
alpha = np.clip((brightness - 60) * (255.0 / 80.0), 0, 255).astype(np.uint8)

# --- 4. Color cleanup: kill residual color in low-alpha pixels ---
# Prevents color halos when logo is placed on different backgrounds.
# Where alpha < 100, pull RGB toward pure black (which is invisible at low alpha).
clean_rgb = arr.copy()
mask_low_alpha = alpha < 100
# Force low-alpha pixels' RGB to follow their alpha (so dark areas stay dark, bright edges stay bright)
# This way, when alpha is low, RGB is also low (invisible against any bg)
intensity_norm = (alpha / 255.0).reshape(H, W, 1)
clean_rgb = (arr * intensity_norm).astype(np.uint8)

rgba = np.dstack([clean_rgb, alpha])
result = Image.fromarray(rgba, 'RGBA')
result.save(OUT_FULL, 'PNG')
print(f"Saved full transparent logo: {OUT_FULL}  ({result.size})")

# --- 5. Crop icon-only version (top ~32% of the logo, based on VLM description) ---
# Logo layout: icon at top, then "FLORENCE LAUNDRY" text, then gold lines + Arabic at bottom
# Icon roughly occupies top 30-35% of the image
icon_top = int(H * 0.04)
icon_bottom = int(H * 0.34)
icon_left = int(W * 0.10)
icon_right = int(W * 0.90)
icon_crop = result.crop((icon_left, icon_top, icon_right, icon_bottom))
icon_crop.save(OUT_ICON, 'PNG')
print(f"Saved icon-only crop:       {OUT_ICON}  ({icon_crop.size})")

# --- 6. Stats ---
alpha_arr = np.array(result)[:, :, 3]
opaque_pct = (alpha_arr > 200).sum() / alpha_arr.size * 100
transparent_pct = (alpha_arr < 10).sum() / alpha_arr.size * 100
print(f"\nAlpha stats:")
print(f"  Fully opaque pixels:      {opaque_pct:.1f}%")
print(f"  Fully transparent pixels: {transparent_pct:.1f}%")
print(f"  Soft-edge pixels:         {100 - opaque_pct - transparent_pct:.1f}%")
