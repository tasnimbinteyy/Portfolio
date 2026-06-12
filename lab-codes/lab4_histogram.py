# Lab Task 4: Histogram & Histogram Equalization
# Gonzalez book image used: lena.png
# Install: pip install opencv-python matplotlib numpy

import cv2
import numpy as np
import matplotlib.pyplot as plt
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

img      = cv2.imread('lena.png')
img_rgb  = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# ── 1. RGB Histogram plot ─────────────────────────────────────────────────────
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].imshow(img_rgb)
axes[0].set_title('Original Image')
axes[0].axis('off')

for i, color in enumerate(('red', 'green', 'blue')):
    hist = cv2.calcHist([img], [i], None, [256], [0, 256])
    axes[1].plot(hist, color=color, label=color.capitalize())

axes[1].set_title('RGB Histogram')
axes[1].set_xlabel('Pixel Intensity')
axes[1].set_ylabel('Frequency')
axes[1].legend()
axes[1].set_xlim([0, 256])
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab4_rgb_histogram.png'), bbox_inches='tight', dpi=100)
plt.show()

# ── 2. Histogram Equalization ─────────────────────────────────────────────────
equalized = cv2.equalizeHist(img_gray)

cv2.imwrite(os.path.join(OUT, 'lena_gray.png'),      img_gray)
cv2.imwrite(os.path.join(OUT, 'lena_equalized.png'), equalized)

fig, axes = plt.subplots(2, 2, figsize=(12, 10))
axes[0][0].imshow(img_gray,  cmap='gray'); axes[0][0].set_title('Original Grayscale'); axes[0][0].axis('off')
axes[0][1].imshow(equalized, cmap='gray'); axes[0][1].set_title('Equalized Image');    axes[0][1].axis('off')
axes[1][0].plot(cv2.calcHist([img_gray],  [0], None, [256], [0, 256]), color='black')
axes[1][0].set_title('Original Histogram'); axes[1][0].set_xlim([0, 256])
axes[1][1].plot(cv2.calcHist([equalized], [0], None, [256], [0, 256]), color='black')
axes[1][1].set_title('Equalized Histogram'); axes[1][1].set_xlim([0, 256])
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab4_equalization_result.png'), bbox_inches='tight', dpi=100)
plt.show()

# Save side-by-side comparison image
fig2, axes2 = plt.subplots(1, 2, figsize=(10, 5))
axes2[0].imshow(img_gray,  cmap='gray'); axes2[0].set_title('Original');   axes2[0].axis('off')
axes2[1].imshow(equalized, cmap='gray'); axes2[1].set_title('Equalized');   axes2[1].axis('off')
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lena_equalized_compare.png'), bbox_inches='tight', dpi=100)
plt.close()

print("Lab 4 images saved to:", OUT)
