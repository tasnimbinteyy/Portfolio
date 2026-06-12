# Lab Task 9: Edge Detection (Gonzalez Chapter 10)
# Install: pip install opencv-python matplotlib numpy scipy

import cv2
import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import convolve
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

img = cv2.imread('lena.png', cv2.IMREAD_GRAYSCALE)

# ── 1. Roberts ────────────────────────────────────────────────────────────────
roberts_x = np.array([[ 1,  0], [ 0, -1]], dtype=np.float32)
roberts_y = np.array([[ 0,  1], [-1,  0]], dtype=np.float32)
roberts   = np.hypot(convolve(img.astype(np.float32), roberts_x),
                     convolve(img.astype(np.float32), roberts_y))
roberts   = np.clip(roberts, 0, 255).astype(np.uint8)
cv2.imwrite(os.path.join(OUT, 'lena_roberts.png'), roberts)

# ── 2. Prewitt ────────────────────────────────────────────────────────────────
prewitt_x = np.array([[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]], dtype=np.float32)
prewitt_y = np.array([[-1,-1,-1], [ 0, 0, 0], [ 1, 1, 1]], dtype=np.float32)
prewitt   = np.hypot(convolve(img.astype(np.float32), prewitt_x),
                     convolve(img.astype(np.float32), prewitt_y))
prewitt   = np.clip(prewitt, 0, 255).astype(np.uint8)
cv2.imwrite(os.path.join(OUT, 'lena_prewitt.png'), prewitt)

# ── 3. Sobel ──────────────────────────────────────────────────────────────────
sobel_x = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
sobel_y = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
sobel   = np.clip(np.hypot(sobel_x, sobel_y), 0, 255).astype(np.uint8)
cv2.imwrite(os.path.join(OUT, 'lena_sobel.png'), sobel)

# ── 4. LoG ────────────────────────────────────────────────────────────────────
blurred = cv2.GaussianBlur(img, (5, 5), 0)
log     = cv2.Laplacian(blurred, cv2.CV_64F)
log     = np.clip(np.abs(log), 0, 255).astype(np.uint8)
cv2.imwrite(os.path.join(OUT, 'lena_log_edge.png'), log)

# ── 5. Canny ──────────────────────────────────────────────────────────────────
canny = cv2.Canny(img, threshold1=50, threshold2=150)
cv2.imwrite(os.path.join(OUT, 'lena_canny.png'), canny)

# ── Comparison grid ───────────────────────────────────────────────────────────
results = {'Original': img, 'Roberts': roberts, 'Prewitt': prewitt,
           'Sobel': sobel, 'LoG': log, 'Canny': canny}

fig, axes = plt.subplots(2, 3, figsize=(15, 10))
for ax, (title, result) in zip(axes.flatten(), results.items()):
    ax.imshow(result, cmap='gray')
    ax.set_title(title, fontsize=13)
    ax.axis('off')
plt.suptitle('Lab 9: Edge Detection — Gonzalez Chapter 10', fontsize=15)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lena_edges_comparison.png'), bbox_inches='tight', dpi=100)
plt.show()

# ── Canny parameter tuning ────────────────────────────────────────────────────
fig2, axes2 = plt.subplots(1, 3, figsize=(15, 5))
for i, (low, high) in enumerate([(30, 100), (50, 150), (100, 200)]):
    result = cv2.Canny(img, low, high)
    axes2[i].imshow(result, cmap='gray')
    axes2[i].set_title(f'Canny  T1={low}, T2={high}')
    axes2[i].axis('off')
plt.suptitle('Canny Threshold Comparison', fontsize=13)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab9_canny_tuning.png'), bbox_inches='tight', dpi=100)
plt.show()

print("Lab 9 images saved to:", OUT)
