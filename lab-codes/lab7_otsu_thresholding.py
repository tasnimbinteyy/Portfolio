# Lab Task 7: Otsu's Method for Thresholding
# Gonzalez book image used: lena.png
# Install: pip install opencv-python matplotlib numpy

import cv2
import numpy as np
import matplotlib.pyplot as plt
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

img = cv2.imread('lena.png', cv2.IMREAD_GRAYSCALE)

# ── Otsu Manual ───────────────────────────────────────────────────────────────
def otsu_threshold(image):
    hist, _ = np.histogram(image.flatten(), 256, [0, 256])
    total   = image.size
    prob    = hist / total
    best_thresh, max_variance = 0, 0
    w0, mean0 = 0.0, 0.0
    for t in range(256):
        w0 += prob[t]
        w1  = 1 - w0
        if w0 == 0 or w1 == 0: continue
        mean0 = (mean0 * (w0 - prob[t]) + t * prob[t]) / w0
        mean1 = (np.sum(np.arange(t+1, 256) * prob[t+1:256])) / w1 if w1 > 0 else 0
        between_variance = w0 * w1 * (mean0 - mean1) ** 2
        if between_variance > max_variance:
            max_variance  = between_variance
            best_thresh   = t
    return best_thresh

manual_thresh = otsu_threshold(img)
cv_thresh, binary_otsu = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
_, binary_manual = cv2.threshold(img, manual_thresh, 255, cv2.THRESH_BINARY)

print(f"Manual Otsu Threshold : {manual_thresh}")
print(f"OpenCV Otsu Threshold : {int(cv_thresh)}")

# Save images
cv2.imwrite(os.path.join(OUT, 'lena_otsu.png'), binary_otsu)

# Save comparison
fig, axes = plt.subplots(1, 2, figsize=(10, 5))
axes[0].imshow(img,         cmap='gray'); axes[0].set_title('Original Grayscale'); axes[0].axis('off')
axes[1].imshow(binary_otsu, cmap='gray'); axes[1].set_title(f'Otsu Binary (T={int(cv_thresh)})'); axes[1].axis('off')
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab7_otsu_result.png'), bbox_inches='tight', dpi=100)
plt.show()

# Save histogram with threshold line
fig2, ax = plt.subplots(figsize=(7, 4))
ax.hist(img.flatten(), bins=256, range=[0, 256], color='gray', alpha=0.7)
ax.axvline(x=cv_thresh, color='red', linewidth=2, label=f'Otsu T={int(cv_thresh)}')
ax.set_title("Histogram with Otsu Threshold")
ax.set_xlabel("Pixel Intensity")
ax.set_ylabel("Frequency")
ax.legend()
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab7_otsu_histogram.png'), bbox_inches='tight', dpi=100)
plt.show()

print("Lab 7 images saved to:", OUT)
