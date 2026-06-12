# Lab Task 8: K-Means Clustering
# Gonzalez book image used: lena.png
# Install: pip install opencv-python matplotlib numpy

import cv2
import numpy as np
import matplotlib.pyplot as plt
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

img = cv2.imread('lena.png')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# ── K-Means Manual ────────────────────────────────────────────────────────────
def kmeans_manual(image, k=3, max_iter=10):
    pixels = image.reshape(-1, 3).astype(np.float32)
    np.random.seed(42)
    idx       = np.random.choice(len(pixels), k, replace=False)
    centroids = pixels[idx]
    for _ in range(max_iter):
        distances     = np.linalg.norm(pixels[:, np.newaxis] - centroids, axis=2)
        labels        = np.argmin(distances, axis=1)
        new_centroids = np.array([pixels[labels == i].mean(axis=0) for i in range(k)])
        if np.allclose(centroids, new_centroids): break
        centroids = new_centroids
    segmented_pixels = centroids[labels].astype(np.uint8)
    return segmented_pixels.reshape(image.shape), labels.reshape(image.shape[:2])

# ── OpenCV K-Means ────────────────────────────────────────────────────────────
def kmeans_opencv(image, k=3):
    pixels   = image.reshape(-1, 3).astype(np.float32)
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    _, labels, centers = cv2.kmeans(pixels, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    centers   = np.uint8(centers)
    segmented = centers[labels.flatten()]
    return segmented.reshape(image.shape)

# ── Save K=3 result ───────────────────────────────────────────────────────────
segmented_k3, _ = kmeans_manual(img, k=3)
cv2.imwrite(os.path.join(OUT, 'lena_kmeans3.png'), cv2.cvtColor(segmented_k3, cv2.COLOR_RGB2BGR))

# ── K values comparison ───────────────────────────────────────────────────────
k_values = [2, 3, 5]
fig, axes = plt.subplots(1, len(k_values) + 1, figsize=(20, 5))
axes[0].imshow(img); axes[0].set_title('Original Image'); axes[0].axis('off')
for i, k in enumerate(k_values):
    seg, _ = kmeans_manual(img, k=k)
    axes[i+1].imshow(seg); axes[i+1].set_title(f'K-Means  K={k}'); axes[i+1].axis('off')
plt.suptitle('Lab 8: K-Means Clustering Segmentation', fontsize=14)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab8_kmeans_result.png'), bbox_inches='tight', dpi=100)
plt.show()

# ── Manual vs OpenCV comparison ───────────────────────────────────────────────
manual_result, _ = kmeans_manual(img, k=3)
opencv_result    = kmeans_opencv(img, k=3)
fig2, axes2 = plt.subplots(1, 3, figsize=(15, 5))
axes2[0].imshow(img);            axes2[0].set_title('Original')
axes2[1].imshow(manual_result);  axes2[1].set_title('Manual K-Means (K=3)')
axes2[2].imshow(opencv_result);  axes2[2].set_title('OpenCV K-Means (K=3)')
for ax in axes2: ax.axis('off')
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab8_kmeans_compare.png'), bbox_inches='tight', dpi=100)
plt.show()

print("Lab 8 images saved to:", OUT)
