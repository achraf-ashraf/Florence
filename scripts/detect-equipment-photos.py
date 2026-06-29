"""
Final approach: Use connected-component analysis on the dark-pixel mask
to find individual equipment photo regions.

Each photo is a contiguous dark region. By finding connected components
in the dark mask, we can identify each photo as a separate blob.
"""
from PIL import Image
import numpy as np
from scipy import ndimage

SRC = "/home/z/my-project/upload/Screenshot 2026-06-29 163816.png"
OUT_DIR = "/home/z/my-project/download/assets"

img = Image.open(SRC).convert('RGB')
arr = np.array(img)
H, W, _ = arr.shape

# Equipment region (excludes sidebar and brands table)
LEFT, RIGHT = 120, 680
TOP, BOT = 400, 800

region = arr[TOP:BOT, LEFT:RIGHT]
brightness = region.max(axis=2)

# Dark = equipment (brightness < 180 to exclude light-gray equipment bodies)
# Use a lower threshold to get the darker parts of equipment
dark_mask = brightness < 180

# Label connected components
# Use 4-connectivity (von Neumann neighborhood) to avoid merging diagonal touches
structure = np.array([[0,1,0],[1,1,1],[0,1,0]])
labeled, num_features = ndimage.label(dark_mask, structure=structure)
print(f"Found {num_features} connected components (raw)")

# Filter components by size — keep only large ones (actual equipment, not noise)
sizes = ndimage.sum(dark_mask, labeled, range(1, num_features + 1))
print(f"\nComponent sizes (sorted):")
size_threshold = 500  # components smaller than 500px are noise
valid_components = []
for i, size in enumerate(sizes, 1):
    if size > size_threshold:
        # Get bounding box of this component
        slice_obj = ndimage.find_objects(labeled == i)[0]
        y_min, y_max = slice_obj[0].start, slice_obj[0].stop
        x_min, x_max = slice_obj[1].start, slice_obj[1].stop
        width = x_max - x_min
        height = y_max - y_min
        print(f"  Component {i}: size={size}px, X={x_min+LEFT}-{x_max+LEFT} (w={width}), Y={y_min+TOP}-{y_max+TOP} (h={height})")
        # Only keep components that look like photos (width > 50, height > 100)
        if width > 50 and height > 100:
            valid_components.append({
                'id': i,
                'x_min': x_min + LEFT,
                'x_max': x_max + LEFT,
                'y_min': y_min + TOP,
                'y_max': y_max + TOP,
                'width': width,
                'height': height,
                'size': size,
            })

print(f"\n{len(valid_components)} valid photo components:")
for c in valid_components:
    print(f"  Photo: X={c['x_min']}-{c['x_max']} (w={c['width']}), Y={c['y_min']}-{c['y_max']} (h={c['height']}), size={c['size']}px")

# Sort by X coordinate (left to right)
valid_components.sort(key=lambda c: c['x_min'])

# Save each photo with padding
individual_crops = []
for i, c in enumerate(valid_components, 1):
    pad = 12
    l = max(c['x_min'] - pad, 0)
    r = min(c['x_max'] + pad, W)
    t = max(c['y_min'] - pad, 0)
    b = min(c['y_max'] + pad, H)
    crop = img.crop((l, t, r, b))
    crop.save(f'{OUT_DIR}/equipment-{i}.jpg', quality=92)
    individual_crops.append(crop)
    print(f"  → Saved equipment-{i}.jpg ({crop.size})")

# Create combined horizontal strip on dark background
print("\n--- Combined strip on dark background ---")
if individual_crops:
    # Standardize heights
    target_h = max(c.size[1] for c in individual_crops)  # use max height, pad smaller ones
    gap_px = 20
    # Resize all to target_h
    resized = []
    for c in individual_crops:
        new_w = int(c.size[0] * target_h / c.size[1])
        resized.append(c.resize((new_w, target_h)))

    total_w = sum(c.size[0] for c in resized) + gap_px * (len(resized) - 1)
    strip = Image.new('RGB', (total_w, target_h), (15, 15, 17))
    x = 0
    for c in resized:
        strip.paste(c, (x, 0))
        x += c.size[0] + gap_px
    strip.save(f'{OUT_DIR}/equipment-strip.jpg', quality=92)
    print(f"Saved dark-bg strip: {strip.size}")

    # Also on cream background
    strip2 = Image.new('RGB', (total_w, target_h), (242, 238, 227))
    x = 0
    for c in resized:
        strip2.paste(c, (x, 0))
        x += c.size[0] + gap_px
    strip2.save(f'{OUT_DIR}/equipment-strip-cream.jpg', quality=92)
    print(f"Saved cream-bg strip: {strip2.size}")
