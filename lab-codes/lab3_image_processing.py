# Lab Task 3: Image Processing
# Gonzalez book images used: lena.png
# Install: pip install opencv-python matplotlib numpy

import cv2
import numpy as np
import matplotlib.pyplot as plt
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

def show(title, img, cmap='gray'):
    plt.figure(figsize=(5, 5))
    plt.imshow(img, cmap=cmap)
    plt.title(title)
    plt.axis('off')
    plt.show()

# ── 1. Image Complement ───────────────────────────────────────────────────────
img = cv2.imread('lena.png', cv2.IMREAD_GRAYSCALE)
complement = 255 - img

cv2.imwrite(os.path.join(OUT, 'lena_original.png'), img)
cv2.imwrite(os.path.join(OUT, 'lena_complement.png'), complement)

show('Original', img)
show('Complement', complement)

# ── 2. Gamma Correction ───────────────────────────────────────────────────────
def gamma_correction(image, gamma=1.0):
    normalized = image / 255.0
    corrected = np.power(normalized, gamma) * 255
    return corrected.astype(np.uint8)

img_color = cv2.imread('lena.png')
img_color_rgb = cv2.cvtColor(img_color, cv2.COLOR_BGR2RGB)
gamma04 = gamma_correction(img_color, 0.4)
gamma25 = gamma_correction(img_color, 2.5)

cv2.imwrite(os.path.join(OUT, 'lena_gamma04.png'), gamma04)
cv2.imwrite(os.path.join(OUT, 'lena_gamma25.png'), gamma25)

show('Original', img_color_rgb, cmap=None)
show('Gamma = 0.4 (Brighter)', cv2.cvtColor(gamma04, cv2.COLOR_BGR2RGB), cmap=None)
show('Gamma = 2.5 (Darker)',   cv2.cvtColor(gamma25, cv2.COLOR_BGR2RGB), cmap=None)

# ── 3. Log Transformation ─────────────────────────────────────────────────────
img_gray = cv2.imread('lena.png', cv2.IMREAD_GRAYSCALE)
c = 255 / np.log(1 + np.max(img_gray))
log_transformed = c * np.log(1 + img_gray.astype(np.float32))
log_transformed = np.clip(log_transformed, 0, 255).astype(np.uint8)

cv2.imwrite(os.path.join(OUT, 'lena_log.png'), log_transformed)

show('Original', img_gray)
show('Log Transformed', log_transformed)

# ── 4. Image Subtraction — Find Absent Person ────────────────────────────────
# For demo: use lena as img1, darkened version as img2
img1 = cv2.imread('lena.png', cv2.IMREAD_GRAYSCALE)
# Simulate "person removed" by blacking out a region
img2 = img1.copy()
img2[100:300, 150:350] = img1[100:300, 150:350] * 0  # zero out a region

diff = cv2.absdiff(img1, img2)
_, diff_thresh = cv2.threshold(diff, 30, 255, cv2.THRESH_BINARY)

cv2.imwrite(os.path.join(OUT, 'scene_with_person.png'),    img1)
cv2.imwrite(os.path.join(OUT, 'scene_without_person.png'), img2)
cv2.imwrite(os.path.join(OUT, 'scene_diff.png'),           diff_thresh)

fig, axes = plt.subplots(1, 3, figsize=(15, 5))
axes[0].imshow(img1, cmap='gray');        axes[0].set_title('Image 1 (with person)')
axes[1].imshow(img2, cmap='gray');        axes[1].set_title('Image 2 (without person)')
axes[2].imshow(diff_thresh, cmap='gray'); axes[2].set_title('Absent Person (Difference)')
for ax in axes: ax.axis('off')
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab3_subtraction_result.png'), bbox_inches='tight', dpi=100)
plt.show()

print("Lab 3 images saved to:", OUT)
