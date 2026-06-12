# generate_all_images.py
# Generates all blog images from Gonzalez DIP3E original .tif files.
# Uses varied, relevant images per lab task instead of always lena.
#
# Run from Anaconda Prompt:
#   cd c:\Users\USER\tasnim-jannat\lab-codes
#   python generate_all_images.py

import cv2
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy.ndimage import convolve
import os

# ── CONFIG ────────────────────────────────────────────────────────────────────
GONZALEZ_ROOT = r"E:\Graphics\Gonzales Book Pictures"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SCRIPT_DIR, '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

# ── Source image paths ────────────────────────────────────────────────────────
def gp(*parts):
    return os.path.join(GONZALEZ_ROOT, *parts)

CAMERAMAN   = gp("DIP3E_CH02_Original_Images", "DIP3E_Original_Images_CH02", "Fig0222(b)(cameraman).tif")
BLD_IMAGE   = gp("DIP3E_CH04_Original_Images", "DIP3E_Original_Images_CH04", "Fig0438(a)(bld_600by600).tif")
STRAWBERRY_LAB2 = gp("DIP3E_CH06_Original_Images", "DIP3E_Original_Images_CH06", "Fig0630(01)(strawberries_fullcolor).tif")
XRAY        = gp("DIP3E_CH03_Original_Images", "DIP3E_Original_Images_CH03", "Fig0304(a)(breast_digital_Xray).tif")
WASHED      = gp("DIP3E_CH03_Original_Images", "DIP3E_Original_Images_CH03", "Fig0309(a)(washed_out_aerial_image).tif")
DFT_NOLOG   = gp("DIP3E_CH03_Original_Images", "DIP3E_Original_Images_CH03", "Fig0305(a)(DFT_no_log).tif")
EINSTEIN_LO = gp("DIP3E_CH02_Original_Images", "DIP3E_Original_Images_CH02", "Fig0241(a)(einstein low contrast).tif")
EINSTEIN_HI = gp("DIP3E_CH02_Original_Images", "DIP3E_Original_Images_CH02", "Fig0241(c)(einstein high contrast).tif")
CAR_WITH    = gp("DIP3E_CH10_Original_Images", "DIP3E_Original_Images_CH10", "Fig1060(a)(car on left).tif")
CAR_WITHOUT = gp("DIP3E_CH10_Original_Images", "DIP3E_Original_Images_CH10", "Fig1060(c)(car removed).tif")
WOMAN       = gp("DIP3E_CH04_Original_Images", "DIP3E_Original_Images_CH04", "Fig0427(a)(woman).tif")
FINGERPRINT = gp("DIP3E_CH10_Original_Images", "DIP3E_Original_Images_CH10", "Fig1038(a)(noisy_fingerprint).tif")
STRAWBERRY  = gp("DIP3E_CH06_Original_Images", "DIP3E_Original_Images_CH06", "Fig0630(01)(strawberries_fullcolor).tif")
BUILDING    = gp("DIP3E_CH10_Original_Images", "DIP3E_Original_Images_CH10", "Fig1016(a)(building_original).tif")
LENNA       = gp("DIP3E_CH06_Original_Images", "DIP3E_Original_Images_CH06", "Fig0638(lenna_RGB).tif")

# ── Helpers ───────────────────────────────────────────────────────────────────
def save(name, img):
    cv2.imwrite(os.path.join(OUT, name), img)
    print(f"  ✓ {name}")

def save_fig(name):
    plt.savefig(os.path.join(OUT, name), bbox_inches='tight', dpi=120, facecolor='#0e0e12')
    plt.close()
    print(f"  ✓ {name}")

def styled_fig(nrows=1, ncols=1, figsize=(10, 5)):
    fig, axes = plt.subplots(nrows, ncols, figsize=figsize, facecolor='#0e0e12')
    return fig, axes

def style_ax(ax, title=''):
    ax.set_facecolor('#0e0e12')
    ax.tick_params(colors='#506464')
    if title:
        ax.set_title(title, color='#e8e8e4', fontsize=11)
    for spine in ax.spines.values():
        spine.set_edgecolor('#2a2a35')

def read_tif(path):
    if not os.path.exists(path):
        print(f"  ⚠ NOT FOUND: {os.path.basename(path)}")
        return None
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if img is None:
        return None
    if img.dtype == np.uint16:
        img = (img / 256).astype(np.uint8)
    if len(img.shape) == 2:
        img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    elif img.shape[2] == 4:
        img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
    return img

def gray(bgr): return cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
def rgb(bgr):  return cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)

def resize_to(img, target):
    """Resize img to same size as target."""
    return cv2.resize(img, (target.shape[1], target.shape[0]))

print("\n=== Generating all CG Lab images ===\n")

# ─────────────────────────────────────────────────────────────────────────────
# LAB 2 — Image Basics  →  Cameraman (classic CS test image)
# ─────────────────────────────────────────────────────────────────────────────
print("[Lab 2] Image Basics — Strawberries (Fig0630)")
bld = read_tif(STRAWBERRY_LAB2)
if bld is not None:
    bld_rgb  = rgb(bld)
    save('lab2_original.png', bld)

    fig, axes = styled_fig(1, 2, (12, 5))
    axes[0].imshow(bld_rgb); style_ax(axes[0], 'Original (BGR loaded)'); axes[0].axis('off')
    for i, color in enumerate(('red', 'green', 'blue')):
        hist = cv2.calcHist([bld], [i], None, [256], [0, 256])
        axes[1].plot(hist, color=color, label=color.capitalize())
    style_ax(axes[1], 'RGB Histogram')
    axes[1].set_xlabel('Intensity', color='#506464')
    axes[1].set_ylabel('Frequency', color='#506464')
    axes[1].legend(labelcolor='#e8e8e4')
    axes[1].set_xlim([0, 256])
    plt.tight_layout()
    save_fig('lab2_display.png')

# ─────────────────────────────────────────────────────────────────────────────
# LAB 3 — Intensity Transformations
# complement  → Breast X-Ray  (classic Gonzalez example)
# gamma       → Washed aerial (low contrast — gamma brightens it)
# log         → DFT no-log    (Gonzalez uses this exact image for log demo)
# subtraction → Car images    (Ch10 — car removed from scene)
# ─────────────────────────────────────────────────────────────────────────────
print("\n[Lab 3] Intensity Transformations")

# — Complement (X-Ray) —
xray = read_tif(XRAY)
if xray is not None:
    xray_gray  = gray(xray)
    complement = 255 - xray_gray
    save('lab3_xray_input.png',      xray_gray)
    save('lab3_xray_complement.png', complement)

# — Gamma (Washed aerial) —
washed = read_tif(WASHED)
if washed is not None:
    washed_gray = gray(washed)
    def gamma_corr(img, g):
        return (np.power(img / 255.0, g) * 255).astype(np.uint8)
    gamma_out = gamma_corr(washed_gray, 0.4)
    save('lab3_washed_input.png',  washed_gray)
    save('lab3_gamma_output.png',  gamma_out)

# — Log (DFT image) —
dft = read_tif(DFT_NOLOG)
if dft is not None:
    dft_gray = gray(dft)
    c   = 255 / np.log(1 + np.max(dft_gray))
    log = np.clip(c * np.log(1 + dft_gray.astype(np.float32)), 0, 255).astype(np.uint8)
    save('lab3_dft_input.png',  dft_gray)
    save('lab3_log_output.png', log)

# — Subtraction (Car removed) —
car_w  = read_tif(CAR_WITH)
car_wo = read_tif(CAR_WITHOUT)
if car_w is not None and car_wo is not None:
    cw_g  = gray(car_w)
    cwo_g = gray(car_wo)
    cwo_g = resize_to(cwo_g, cw_g)
    diff  = cv2.absdiff(cw_g, cwo_g)
    _, diff_t = cv2.threshold(diff, 20, 255, cv2.THRESH_BINARY)
    save('lab3_car_with.png',    cw_g)
    save('lab3_car_without.png', cwo_g)
    save('lab3_car_diff.png',    diff_t)

# ─────────────────────────────────────────────────────────────────────────────
# LAB 4 — Histogram  →  Einstein low-contrast (ideal equalization demo)
# ─────────────────────────────────────────────────────────────────────────────
print("\n[Lab 4] Histogram — Einstein low contrast")
ein_lo = read_tif(EINSTEIN_LO)
if ein_lo is not None:
    ein_gray  = gray(ein_lo)
    equalized = cv2.equalizeHist(ein_gray)
    save('lab4_einstein_input.png',     ein_gray)
    save('lab4_einstein_equalized.png', equalized)

    # Histogram plot
    fig, axes = styled_fig(1, 2, (12, 5))
    axes[0].imshow(ein_gray, cmap='gray'); style_ax(axes[0], 'Einstein (Low Contrast)'); axes[0].axis('off')
    axes[1].plot(cv2.calcHist([ein_gray], [0], None, [256], [0, 256]), color='#8a9a8a')
    style_ax(axes[1], 'Grayscale Histogram')
    axes[1].set_xlabel('Intensity', color='#506464')
    axes[1].set_xlim([0, 256])
    plt.tight_layout()
    save_fig('lab4_histogram_plot.png')

    # Equalization comparison
    fig2, axes2 = styled_fig(2, 2, (12, 10))
    axes2[0][0].imshow(ein_gray,  cmap='gray'); style_ax(axes2[0][0], 'Original (Low Contrast)'); axes2[0][0].axis('off')
    axes2[0][1].imshow(equalized, cmap='gray'); style_ax(axes2[0][1], 'After Equalization');       axes2[0][1].axis('off')
    axes2[1][0].plot(cv2.calcHist([ein_gray],  [0], None, [256], [0, 256]), color='#8a9a8a')
    style_ax(axes2[1][0], 'Original Histogram'); axes2[1][0].set_xlim([0, 256])
    axes2[1][1].plot(cv2.calcHist([equalized], [0], None, [256], [0, 256]), color='#8a9a8a')
    style_ax(axes2[1][1], 'Equalized Histogram'); axes2[1][1].set_xlim([0, 256])
    plt.tight_layout()
    save_fig('lab4_equalization_result.png')

# ─────────────────────────────────────────────────────────────────────────────
# LAB 6 — Geometric Transformations  →  Woman image (Ch04)
# ─────────────────────────────────────────────────────────────────────────────
print("\n[Lab 6] Geometric Transformations — Woman")
woman = read_tif(WOMAN)
if woman is not None:
    h, w   = woman.shape[:2]
    w_rgb  = rgb(woman)

    M_t        = np.float32([[1, 0, 80], [0, 1, 60]])
    translated = cv2.warpAffine(woman, M_t, (w, h))

    M_r     = cv2.getRotationMatrix2D((w//2, h//2), 45, 1.0)
    rotated = cv2.warpAffine(woman, M_r, (w, h))

    scaled_up   = cv2.resize(woman, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_LINEAR)
    scaled_down = cv2.resize(woman, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)

    save('lab6_woman_original.png',   woman)
    save('lab6_translated.png',       translated)
    save('lab6_rotated.png',          rotated)
    save('lab6_scaled_up.png',        scaled_up)
    save('lab6_scaled_down.png',      scaled_down)

    fig, axes = styled_fig(1, 4, (22, 6))
    for ax, (title, im) in zip(axes, [
        ('Original',       w_rgb),
        ('Translated',     rgb(translated)),
        ('Rotated 45°',    rgb(rotated)),
        ('Scaled Down 0.5×', rgb(scaled_down)),
    ]):
        ax.imshow(im); style_ax(ax, title); ax.axis('off')
    plt.tight_layout()
    save_fig('lab6_transformations_result.png')

# ─────────────────────────────────────────────────────────────────────────────
# LAB 7 — Otsu  →  Fingerprint (bimodal histogram — perfect for Otsu)
# ─────────────────────────────────────────────────────────────────────────────
print("\n[Lab 7] Otsu Thresholding — Fingerprint")
fp = read_tif(FINGERPRINT)
if fp is not None:
    fp_gray = gray(fp)
    cv_t, binary = cv2.threshold(fp_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    print(f"  Otsu T = {int(cv_t)}")
    save('lab7_fingerprint_input.png', fp_gray)
    save('lab7_fingerprint_otsu.png',  binary)

    fig, axes = styled_fig(1, 2, (10, 5))
    axes[0].imshow(fp_gray, cmap='gray'); style_ax(axes[0], 'Original Fingerprint'); axes[0].axis('off')
    axes[1].imshow(binary,  cmap='gray'); style_ax(axes[1], f'Otsu Binary  T={int(cv_t)}'); axes[1].axis('off')
    plt.tight_layout()
    save_fig('lab7_otsu_result.png')

    fig2, ax = plt.subplots(figsize=(7, 4), facecolor='#0e0e12')
    style_ax(ax, 'Histogram with Otsu Threshold')
    ax.hist(fp_gray.flatten(), bins=256, range=[0, 256], color='#506464', alpha=0.85)
    ax.axvline(x=cv_t, color='#e8e8e4', linewidth=2, label=f'T = {int(cv_t)}')
    ax.set_xlabel('Pixel Intensity', color='#506464')
    ax.set_ylabel('Frequency', color='#506464')
    ax.legend(labelcolor='#e8e8e4')
    plt.tight_layout()
    save_fig('lab7_otsu_histogram.png')

# ─────────────────────────────────────────────────────────────────────────────
# LAB 8 — K-Means  →  Strawberries (colorful — best for clustering demo)
# ─────────────────────────────────────────────────────────────────────────────
print("\n[Lab 8] K-Means Clustering — Strawberries")
straw = read_tif(STRAWBERRY)
if straw is not None:
    straw_rgb = rgb(straw)
    save('lab8_strawberry_input.png', straw)

    def kmeans_seg(img_bgr, k):
        pixels   = img_bgr.reshape(-1, 3).astype(np.float32)
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.5)
        _, labels, centers = cv2.kmeans(pixels, k, None, criteria, 10, cv2.KMEANS_PP_CENTERS)
        centers   = np.uint8(centers)
        return centers[labels.flatten()].reshape(img_bgr.shape)

    seg3 = kmeans_seg(straw, 3)
    save('lab8_kmeans3_output.png', seg3)

    fig, axes = styled_fig(1, 4, (22, 6))
    axes[0].imshow(straw_rgb); style_ax(axes[0], 'Original Strawberries'); axes[0].axis('off')
    for i, k in enumerate([2, 3, 5]):
        seg = kmeans_seg(straw, k)
        axes[i+1].imshow(rgb(seg)); style_ax(axes[i+1], f'K-Means  K={k}'); axes[i+1].axis('off')
    plt.suptitle('K-Means Segmentation — Strawberries', color='#e8e8e4', fontsize=13)
    plt.tight_layout()
    save_fig('lab8_kmeans_result.png')

# ─────────────────────────────────────────────────────────────────────────────
# LAB 9 — Edge Detection  →  Building (Gonzalez Ch10 exact image)
# Input  = building_original (grayscale)
# Output = each edge detector applied to building
# ─────────────────────────────────────────────────────────────────────────────
print("\n[Lab 9] Edge Detection — Building")
building = read_tif(BUILDING)
if building is not None:
    b_gray = gray(building)
    save('lab9_building_input.png', b_gray)

    # Roberts
    rx = np.array([[ 1,  0], [ 0, -1]], dtype=np.float32)
    ry = np.array([[ 0,  1], [-1,  0]], dtype=np.float32)
    roberts = np.clip(np.hypot(convolve(b_gray.astype(np.float32), rx),
                               convolve(b_gray.astype(np.float32), ry)), 0, 255).astype(np.uint8)
    save('lab9_roberts.png', roberts)

    # Prewitt
    px = np.array([[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]], dtype=np.float32)
    py = np.array([[-1,-1,-1], [ 0, 0, 0], [ 1, 1, 1]], dtype=np.float32)
    prewitt = np.clip(np.hypot(convolve(b_gray.astype(np.float32), px),
                               convolve(b_gray.astype(np.float32), py)), 0, 255).astype(np.uint8)
    save('lab9_prewitt.png', prewitt)

    # Sobel
    sx = cv2.Sobel(b_gray, cv2.CV_64F, 1, 0, ksize=3)
    sy = cv2.Sobel(b_gray, cv2.CV_64F, 0, 1, ksize=3)
    sobel = np.clip(np.hypot(sx, sy), 0, 255).astype(np.uint8)
    save('lab9_sobel.png', sobel)

    # LoG
    blurred  = cv2.GaussianBlur(b_gray, (5, 5), 0)
    log_edge = np.clip(np.abs(cv2.Laplacian(blurred, cv2.CV_64F)), 0, 255).astype(np.uint8)
    save('lab9_log.png', log_edge)

    # Canny
    canny = cv2.Canny(b_gray, 50, 150)
    save('lab9_canny.png', canny)

    # Comparison grid — input + all 5 detectors
    fig, axes = styled_fig(2, 3, (15, 10))
    pairs = [
        ('Original (Building)', b_gray),
        ('Roberts',  roberts),
        ('Prewitt',  prewitt),
        ('Sobel',    sobel),
        ('LoG',      log_edge),
        ('Canny',    canny),
    ]
    for ax, (title, result) in zip(axes.flatten(), pairs):
        ax.imshow(result, cmap='gray'); style_ax(ax, title); ax.axis('off')
    plt.suptitle('Edge Detection — Gonzalez Chapter 10', color='#e8e8e4', fontsize=14)
    plt.tight_layout()
    save_fig('lab9_edges_comparison.png')

print(f"\n✓ All done! Images saved to:\n  {os.path.abspath(OUT)}")
print("\nNext: pnpm run dev → check blog images.")
