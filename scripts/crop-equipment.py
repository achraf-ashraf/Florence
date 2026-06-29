"""
Crop the 4 equipment photos from the screenshot.

The screenshot is a brochure page (1920x1080) showing:
  - Top text paragraph
  - Middle: 4 equipment photos in a horizontal 1x4 row
  - Right: brands table
  - Bottom-left: page number "17"

We need to extract ONLY the 4 equipment photos as a clean horizontal strip.

Strategy: Crop tightly around just the 4 photo cells. Based on VLM feedback,
the first attempt (X=40-660, Y=420-810) included top text, left sidebar,
and page number. Let me try a tighter crop focused on the photo row only.
"""
from PIL import Image

SRC = "/home/z/my-project/upload/Screenshot 2026-06-29 163816.png"
OUT = "/home/z/my-project/download/assets/equipment-strip.jpg"

img = Image.open(SRC).convert('RGB')
W, H = img.size
print(f"Source: {W} x {H}")

# Based on VLM analysis:
# - 4 photos in horizontal 1x4 row in middle of layout
# - First attempt (X=40-660, Y=420-810) was too loose — included top text, left sidebar, page number
#
# Tighter crop: focus only on the photo row
# The photos appear to start below the "Equipment Overview" paragraph
# and end above the page number area

# Let me try multiple candidate crops and save them all for VLM verification
candidates = [
    # (left, top, right, bottom, name)
    (90,  460, 640, 720, 'tight-v1'),    # Tighter on all sides
    (110, 480, 630, 700, 'tight-v2'),    # Even tighter
    (95,  470, 645, 730, 'tight-v3'),    # Slightly wider, still tight
]

for (l, t, r, b, name) in candidates:
    crop = img.crop((l, t, r, b))
    out_path = f'/tmp/equip-{name}.jpg'
    crop.save(out_path, quality=92)
    print(f"  {name}: crop=({l},{t},{r},{b}) size={crop.size} -> {out_path}")

# Also save the original full image as a JPG for VLM coord verification
img.save('/tmp/equip-full.jpg', quality=88)
print(f"\nFull image saved to /tmp/equip-full.jpg for coord verification")
