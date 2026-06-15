import cv2
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os

GONZALEZ_ROOT = r"E:\Graphics\Gonzales Book Pictures"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SCRIPT_DIR, '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

SEPTAGON = os.path.join(GONZALEZ_ROOT,
    "DIP3E_CH10_Original_Images",
    "DIP3E_Original_Images_CH10",
    "Fig1036(a)(original_septagon).tif")

print("[Lab 10] Boundary & Flood Fill - Septagon")
print("Loading:", SEPTAGON)

sept = cv2.imread(SEPTAGON, cv2.IMREAD_UNCHANGED)
if sept is None:
    print("ERROR: Could not load septagon image")
    exit(1)

if sept.dtype == np.uint16:
    sept = (sept / 256).astype(np.uint8)
if len(sept.shape) == 3:
    sept = cv2.cvtColor(sept, cv2.COLOR_BGR2GRAY)

print("Loaded. Shape:", sept.shape, "dtype:", sept.dtype)

_, sept_bin = cv2.threshold(sept, 127, 255, cv2.THRESH_BINARY)
cv2.imwrite(os.path.join(OUT, 'lab10_septagon_input.png'), sept_gray := sept)

# Boundary Fill (iterative stack)
def boundary_fill(img_bin, seed_x, seed_y, fill_val=128, border_val=0):
    out = img_bin.copy()
    h, w = out.shape
    stack = [(seed_x, seed_y)]
    visited = set()
    while stack:
        x, y = stack.pop()
        if (x, y) in visited or x < 0 or x >= w or y < 0 or y >= h:
            continue
        visited.add((x, y))
        px = int(out[y, x])
        if px == border_val or px == fill_val:
            continue
        out[y, x] = fill_val
        stack += [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]
    return out

# Flood Fill (cv2.floodFill)
def flood_fill(img_bin, seed_x, seed_y, fill_val=128):
    out = img_bin.copy()
    mask = np.zeros((out.shape[0]+2, out.shape[1]+2), np.uint8)
    cv2.floodFill(out, mask, (seed_x, seed_y), fill_val)
    return out

cy, cx = sept_bin.shape[0]//2, sept_bin.shape[1]//2
print("Seed point:", cx, cy, "pixel value:", sept_bin[cy, cx])

bf_result = boundary_fill(sept_bin, cx, cy, fill_val=128, border_val=0)
ff_result = flood_fill(sept_bin,    cx, cy, fill_val=128)

cv2.imwrite(os.path.join(OUT, 'lab10_boundary_fill.png'), bf_result)
cv2.imwrite(os.path.join(OUT, 'lab10_flood_fill.png'),    ff_result)

fig, axes = plt.subplots(1, 3, figsize=(15, 5), facecolor='#0e0e12')
for ax, (title, img) in zip(axes, [
    ('Original Septagon', sept_gray),
    ('Boundary Fill',     bf_result),
    ('Flood Fill',        ff_result),
]):
    ax.imshow(img, cmap='gray')
    ax.set_facecolor('#0e0e12')
    ax.set_title(title, color='#e8e8e4', fontsize=11)
    ax.axis('off')
plt.suptitle('Lab 10: Boundary & Flood Fill - Gonzalez Fig 10.36', color='#e8e8e4', fontsize=13)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab10_fill_comparison.png'), bbox_inches='tight', dpi=120, facecolor='#0e0e12')
plt.close()

print("Done. Saved:")
print("  lab10_septagon_input.png")
print("  lab10_boundary_fill.png")
print("  lab10_flood_fill.png")
print("  lab10_fill_comparison.png")
