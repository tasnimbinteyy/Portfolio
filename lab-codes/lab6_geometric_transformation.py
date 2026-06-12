# Lab Task 6: Geometric Transformations using OpenCV
# Translation, Rotation, Scaling
# Install: pip install opencv-python matplotlib numpy

import cv2
import numpy as np
import matplotlib.pyplot as plt
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

img = cv2.imread('lena.png')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
h, w = img.shape[:2]

# ── 1. Translation ────────────────────────────────────────────────────────────
tx, ty = 100, 50
M_translate = np.float32([[1, 0, tx], [0, 1, ty]])
translated  = cv2.warpAffine(img, M_translate, (w, h))
cv2.imwrite(os.path.join(OUT, 'lena_translated.png'), cv2.cvtColor(translated, cv2.COLOR_RGB2BGR))

# ── 2. Rotation ───────────────────────────────────────────────────────────────
angle    = 45
center   = (w // 2, h // 2)
M_rotate = cv2.getRotationMatrix2D(center, angle, scale=1.0)
rotated  = cv2.warpAffine(img, M_rotate, (w, h))
cv2.imwrite(os.path.join(OUT, 'lena_rotated.png'), cv2.cvtColor(rotated, cv2.COLOR_RGB2BGR))

# ── 3. Scaling ────────────────────────────────────────────────────────────────
scaled_up   = cv2.resize(img, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_LINEAR)
scaled_down = cv2.resize(img, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
cv2.imwrite(os.path.join(OUT, 'lena_scaled_up.png'),   cv2.cvtColor(scaled_up,   cv2.COLOR_RGB2BGR))
cv2.imwrite(os.path.join(OUT, 'lena_scaled_down.png'), cv2.cvtColor(scaled_down, cv2.COLOR_RGB2BGR))
# Save a comparison of original vs scaled-down for blog
cv2.imwrite(os.path.join(OUT, 'lena_scaled.png'),      cv2.cvtColor(scaled_up,   cv2.COLOR_RGB2BGR))

# ── Display All ───────────────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 5, figsize=(20, 5))
axes[0].imshow(img);          axes[0].set_title('Original')
axes[1].imshow(translated);   axes[1].set_title(f'Translated\n(tx={tx}, ty={ty})')
axes[2].imshow(rotated);      axes[2].set_title(f'Rotated {angle}°')
axes[3].imshow(scaled_up);    axes[3].set_title('Scaled Up (2x)')
axes[4].imshow(scaled_down);  axes[4].set_title('Scaled Down (0.5x)')
for ax in axes: ax.axis('off')
plt.suptitle('Lab 6: Geometric Transformations', fontsize=14)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab6_transformations_result.png'), bbox_inches='tight', dpi=100)
plt.show()

print("Lab 6 images saved to:", OUT)
