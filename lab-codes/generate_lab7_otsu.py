import cv2
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os

GONZALEZ = r"E:\Graphics\Gonzales Book Pictures\DIP3E_CH10_Original_Images\DIP3E_Original_Images_CH10"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SCRIPT_DIR, '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

BG = '#0e0e12'
FG = '#e8e8e4'
GRID = '#2a2a35'

def read_tif(filename):
    path = os.path.join(GONZALEZ, filename)
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print("NOT FOUND:", filename)
        return None
    if img.dtype == np.uint16:
        img = (img / 256).astype(np.uint8)
    if len(img.shape) == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return img

def style_ax(ax, title=''):
    ax.set_facecolor(BG)
    ax.tick_params(colors='#506464')
    if title:
        ax.set_title(title, color=FG, fontsize=10)
    for spine in ax.spines.values():
        spine.set_edgecolor(GRID)

def apply_otsu(img):
    t, binary = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return int(t), binary

def save(name):
    plt.savefig(os.path.join(OUT, name), dpi=120, bbox_inches='tight', facecolor=BG)
    plt.close()
    print("Saved:", name)

# ── Fig 10.36 — Original septagon + noise variants ───────────────────────────
print("[Fig 10.36] Septagon + Gaussian noise")
f36a = read_tif("Fig1036(a)(original_septagon).tif")
f36b = read_tif("Fig1036(b)(gaussian_noise_mean_0_std_10_added).tif")
f36c = read_tif("Fig1036(c)(gaussian_noise_mean_0_std_50_added).tif")

if all(x is not None for x in [f36a, f36b, f36c]):
    fig, axes = plt.subplots(1, 3, figsize=(13, 5), facecolor=BG)
    for ax, img, title in zip(axes,
        [f36a, f36b, f36c],
        ['(a) Original Septagon', '(b) Gaussian Noise σ=10', '(c) Gaussian Noise σ=50']):
        ax.imshow(img, cmap='gray'); style_ax(ax, title); ax.axis('off')
    plt.suptitle('Figure 10.36 — Septagon with Gaussian Noise', color=FG, fontsize=12)
    plt.tight_layout()
    save('lab7_fig1036.png')

# ── Fig 10.37 — Otsu on septagon+noise and intensity ramp ────────────────────
print("[Fig 10.37] Otsu on septagon+noise & intensity ramp")
f37a = read_tif("Fig1037(a)(septagon_gaussian_noise_mean_0_std_10_added).tif")
f37b = read_tif("Fig1037(b)(intensity_ramp).tif")

if all(x is not None for x in [f37a, f37b]):
    t37a, bin37a = apply_otsu(f37a)
    t37b, bin37b = apply_otsu(f37b)

    fig, axes = plt.subplots(2, 3, figsize=(14, 9), facecolor=BG)
    # Row 1: septagon+noise
    axes[0][0].imshow(f37a, cmap='gray');   style_ax(axes[0][0], '(a) Septagon + Noise σ=10'); axes[0][0].axis('off')
    axes[0][1].hist(f37a.flatten(), bins=256, range=[0,256], color='#506464', alpha=0.85)
    style_ax(axes[0][1], f'Histogram  T*={t37a}')
    axes[0][1].axvline(t37a, color='#e07070', linewidth=2)
    axes[0][1].set_xlim([0,256])
    axes[0][2].imshow(bin37a, cmap='gray'); style_ax(axes[0][2], f'Otsu Binary  T={t37a}'); axes[0][2].axis('off')
    # Row 2: intensity ramp
    axes[1][0].imshow(f37b, cmap='gray');   style_ax(axes[1][0], '(b) Intensity Ramp'); axes[1][0].axis('off')
    axes[1][1].hist(f37b.flatten(), bins=256, range=[0,256], color='#506464', alpha=0.85)
    style_ax(axes[1][1], f'Histogram  T*={t37b}')
    axes[1][1].axvline(t37b, color='#e07070', linewidth=2)
    axes[1][1].set_xlim([0,256])
    axes[1][2].imshow(bin37b, cmap='gray'); style_ax(axes[1][2], f'Otsu Binary  T={t37b}'); axes[1][2].axis('off')

    plt.suptitle('Figure 10.37 — Otsu Thresholding Results', color=FG, fontsize=12)
    plt.tight_layout()
    save('lab7_fig1037.png')

# ── Fig 10.38 — Noisy fingerprint ────────────────────────────────────────────
print("[Fig 10.38] Noisy fingerprint")
f38a = read_tif("Fig1038(a)(noisy_fingerprint).tif")

if f38a is not None:
    t38, bin38 = apply_otsu(f38a)

    fig, axes = plt.subplots(1, 3, figsize=(13, 5), facecolor=BG)
    axes[0].imshow(f38a, cmap='gray'); style_ax(axes[0], '(a) Noisy Fingerprint'); axes[0].axis('off')
    axes[1].hist(f38a.flatten(), bins=256, range=[0,256], color='#506464', alpha=0.85)
    style_ax(axes[1], f'Histogram  T*={t38}')
    axes[1].axvline(t38, color='#e07070', linewidth=2, label=f'T = {t38}')
    axes[1].legend(labelcolor=FG, facecolor=BG)
    axes[1].set_xlim([0,256])
    axes[2].imshow(bin38, cmap='gray'); style_ax(axes[2], f'(b) Otsu Binary  T={t38}'); axes[2].axis('off')

    plt.suptitle('Figure 10.38 — Otsu on Noisy Fingerprint', color=FG, fontsize=12)
    plt.tight_layout()
    save('lab7_fig1038.png')

# ── Fig 10.39 — Polymersomes ──────────────────────────────────────────────────
print("[Fig 10.39] Polymersomes")
f39a = read_tif("Fig1039(a)(polymersomes).tif")

if f39a is not None:
    t39, bin39 = apply_otsu(f39a)

    fig, axes = plt.subplots(1, 3, figsize=(13, 5), facecolor=BG)
    axes[0].imshow(f39a, cmap='gray'); style_ax(axes[0], '(a) Polymersomes'); axes[0].axis('off')
    axes[1].hist(f39a.flatten(), bins=256, range=[0,256], color='#506464', alpha=0.85)
    style_ax(axes[1], f'Histogram  T*={t39}')
    axes[1].axvline(t39, color='#e07070', linewidth=2, label=f'T = {t39}')
    axes[1].legend(labelcolor=FG, facecolor=BG)
    axes[1].set_xlim([0,256])
    axes[2].imshow(bin39, cmap='gray'); style_ax(axes[2], f'(b) Otsu Binary  T={t39}'); axes[2].axis('off')

    plt.suptitle('Figure 10.39 — Otsu on Polymersomes', color=FG, fontsize=12)
    plt.tight_layout()
    save('lab7_fig1039.png')

# ── Fig 10.40 — Large septagon noise std50 ───────────────────────────────────
print("[Fig 10.40] Large septagon noise std50")
f40a = read_tif("Fig1040(a)(large_septagon_gaussian_noise_mean_0_std_50_added).tif")

if f40a is not None:
    t40, bin40 = apply_otsu(f40a)

    fig, axes = plt.subplots(1, 3, figsize=(13, 5), facecolor=BG)
    axes[0].imshow(f40a, cmap='gray'); style_ax(axes[0], '(a) Septagon Noise σ=50 (large)'); axes[0].axis('off')
    axes[1].hist(f40a.flatten(), bins=256, range=[0,256], color='#506464', alpha=0.85)
    style_ax(axes[1], f'Histogram  T*={t40}')
    axes[1].axvline(t40, color='#e07070', linewidth=2, label=f'T = {t40}')
    axes[1].legend(labelcolor=FG, facecolor=BG)
    axes[1].set_xlim([0,256])
    axes[2].imshow(bin40, cmap='gray'); style_ax(axes[2], f'(b) Otsu Binary  T={t40}'); axes[2].axis('off')

    plt.suptitle('Figure 10.40 — Otsu on Large Septagon (High Noise)', color=FG, fontsize=12)
    plt.tight_layout()
    save('lab7_fig1040.png')

# ── Fig 10.41 — Small septagon noise std10 ───────────────────────────────────
print("[Fig 10.41] Small septagon noise std10")
f41a = read_tif("Fig1041(a)(septagon_small_noisy_mean_0_stdv_10).tif")

if f41a is not None:
    t41, bin41 = apply_otsu(f41a)

    fig, axes = plt.subplots(1, 3, figsize=(13, 5), facecolor=BG)
    axes[0].imshow(f41a, cmap='gray'); style_ax(axes[0], '(a) Small Septagon Noise σ=10'); axes[0].axis('off')
    axes[1].hist(f41a.flatten(), bins=256, range=[0,256], color='#506464', alpha=0.85)
    style_ax(axes[1], f'Histogram  T*={t41}')
    axes[1].axvline(t41, color='#e07070', linewidth=2, label=f'T = {t41}')
    axes[1].legend(labelcolor=FG, facecolor=BG)
    axes[1].set_xlim([0,256])
    axes[2].imshow(bin41, cmap='gray'); style_ax(axes[2], f'(b) Otsu Binary  T={t41}'); axes[2].axis('off')

    plt.suptitle('Figure 10.41 — Otsu on Small Septagon (Low Noise)', color=FG, fontsize=12)
    plt.tight_layout()
    save('lab7_fig1041.png')

print("\nAll done!")
