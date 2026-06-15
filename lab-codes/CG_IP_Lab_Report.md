# Laboratory Report — Computer Graphics and Image Processing
### 7th Semester

| | |
|---|---|
| **Student Name** | [Your Name] |
| **Student ID** | [Your ID] |
| **Department** | [Department Name] |
| **University** | [University Name] |
| **Course Code** | [Course Code] |
| **Submitted To** | [Teacher Name] |
| **Submission Date** | [Date] |

---

## Introduction

This report documents 11 laboratory experiments from the **Computer Graphics and Image Processing** course. Graphics experiments (Labs 1, 5, 6, 8, 10) were implemented in **C++ with OpenGL in CodeBlocks IDE**. Image processing experiments (Labs 2, 3, 4, 7, 9, 11) were implemented in **Python using OpenCV, NumPy, and Matplotlib** in VS Code and Google Colab. All image processing experiments are based on *Gonzalez's Digital Image Processing, 3rd Edition*.

---

## Lab Task 1 — OpenGL Installation in CodeBlocks

**Objective:** Set up the OpenGL environment using freeglut in CodeBlocks on Windows.

The freeglut MinGW package was downloaded and its files were placed in the correct directories — headers in `C:/MinGW/include/GL/`, libraries in `C:/MinGW/lib/`, and `freeglut.dll` in `C:/Windows/System32/`. The CodeBlocks linker was configured with `-lglut32 -lglu32 -lopengl32`. Setup was verified by successfully rendering a white OpenGL window.

---

## Lab Task 2 — Image Basics
*[VS Code / Google Colab]*

**Objective:** Learn basic image input/output operations using Python and OpenCV.

Five tasks were performed:
1. **Read & Display** — Strawberries image (Fig. 6.30) loaded with `cv2.imread()`. BGR to RGB conversion applied before display using Matplotlib.
2. **Image Dimensions** — `img.shape` returns `(height, width, channels)`. Result: `(666, 666, 3)` — total 443,556 pixels.
3. **Load from Storage** — `os.path.exists()` used for local paths; `drive.mount()` used in Google Colab.
4. **Batch Load 1000 Images** — `glob.glob()` collected file paths; loaded in a loop with `None` checks to skip corrupted files.
5. **Audio & Video** — Video read frame-by-frame with `cv2.VideoCapture()`. Audio read with `librosa.load()` and plotted as a waveform.

---

## Lab Task 3 — Intensity Transformations
*[VS Code / Google Colab]*

**Objective:** Apply point-based intensity transformations following Gonzalez Chapter 3.

Each transformation modifies pixel values independently using a mapping function `s = T(r)`.

| Transformation | Formula | Image Used | Effect |
|---|---|---|---|
| Complement | s = 255 − r | Intensity Ramp (Fig. 3.7a) | Inverts all pixel intensities |
| Gamma (γ = 0.4) | s = c · r^γ | Washed-out aerial (Fig. 3.9) | Brightens a dark, low-contrast image |
| Log | s = c · log(1 + r) | DFT spectrum (Fig. 3.5a) | Reveals hidden detail in dark regions |
| Subtraction | s = \|f1 − f2\| | Car scene (Fig. 10.60) | Highlights the removed object between two frames |

---

## Lab Task 4 — Histogram & Histogram Equalization
*[VS Code / Google Colab]*

**Objective:** Analyze pixel intensity distribution using histograms and improve contrast through equalization.

The histogram of the Einstein low-contrast image (Fig. 2.41a) was plotted using `cv2.calcHist()`. The narrow, clustered histogram confirmed poor contrast. Histogram equalization was then applied using `cv2.equalizeHist()`, which redistributes pixel values uniformly across 0–255, significantly improving contrast. Limitation: equalization is a global operation — uneven local lighting requires CLAHE instead.

---

## Lab Task 5 — Line Drawing Algorithms
*[CodeBlocks / OpenGL — based on class lecture slides]*

**Objective:** Implement DDA and Bresenham line drawing algorithms using OpenGL.

A screen is a grid of pixels. Drawing a line means deciding which pixels best represent the ideal mathematical line.

**DDA Algorithm** uses floating-point arithmetic. It calculates `steps = max(|dx|, |dy|)` and increments x and y by `dx/steps` and `dy/steps` each step, rounding to the nearest pixel.

**Bresenham's Algorithm** uses integer arithmetic only. It maintains an error term `err = dx − dy` and updates x or y based on whether the error crosses a threshold. No rounding or floating-point operations are needed.

| Feature | DDA | Bresenham |
|---|---|---|
| Arithmetic | Floating-point | Integer only |
| Speed | Slower | Faster |
| Accuracy | Rounding errors possible | More precise |
| Hardware suitability | Not GPU-friendly | Used in GPU rasterizers |

Bresenham is preferred in hardware because integer operations are significantly faster than floating-point operations at the hardware level.

---

## Lab Task 6 — Geometric Transformations

**Objective:** Apply translation, rotation, and scaling to images using affine transformation matrices.

All three transformations were applied to the Woman image (Fig. 4.27) using `cv2.warpAffine()`. Every transformation is expressed as a 2×3 affine matrix:

```
[x']   [a  b  tx] [x]
[y'] = [c  d  ty] [y]
                  [1]
```

- **Translation** (tx=80, ty=60) — shifts every pixel. Pixels outside the boundary become black.
- **Rotation** (45°) — rotates around the image center using `cv2.getRotationMatrix2D()`. Corner regions are clipped.
- **Scaling** (0.5×) — resizes using `cv2.resize()` with `INTER_AREA` interpolation, which gives the best quality when reducing image size.

---

## Lab Task 7 — Otsu's Thresholding Method

**Objective:** Automatically find the optimal threshold for binary segmentation and reproduce Gonzalez Figures 10.36–10.41.

**Theory:** Thresholding converts a grayscale image to black and white by comparing each pixel to a threshold T — pixels above T become white, below become black. Otsu's method automatically finds the best T by maximizing the variance between the two classes (background and foreground):

> σ²_between = w0 · w1 · (μ0 − μ1)²

where w0, w1 are the pixel fractions of each class and μ0, μ1 are their mean intensities.

**Implementation:** Both a manual implementation (iterating all 256 threshold values) and OpenCV's `THRESH_BINARY + THRESH_OTSU` were used — both produced the same threshold value, confirming correctness.

**Experimental Results — Gonzalez Figures 10.36–10.41:**

| Figure | Image | Observation |
|---|---|---|
| 10.36 | Septagon with noise variants (σ = 0, 10, 50) | Input images used for the thresholding experiment |
| 10.37 | Septagon σ=10 and intensity ramp | Bimodal histogram gives clean result; flat histogram shows Otsu's limitation |
| 10.38 | Noisy fingerprint | Classic bimodal histogram — T* = 125, ideal case for Otsu |
| 10.39 | Polymersomes | Otsu cleanly separates vesicle structures from background |
| 10.40 | Large septagon σ=50 | Heavy noise distorts the histogram — Otsu performs poorly |
| 10.41 | Small septagon σ=10 | Low noise keeps histogram peaks clear — Otsu performs well |

**Key Finding:** Otsu works best when the image has a clear bimodal histogram. Heavy noise or uneven lighting reduces its effectiveness.

---

## Lab Task 8 — Cohen-Sutherland Line Clipping
*[CodeBlocks / OpenGL]*

**Objective:** Clip lines to a rectangular viewport so that only the visible portion is drawn.

Clips lines to a rectangular viewport using 4-bit outcodes (LEFT=0001, RIGHT=0010, BOTTOM=0100, TOP=1000).

**Steps:**
1. Compute OC1, OC2 for both endpoints
2. If `OC1 | OC2 == 0` → accept (both inside) → If `OC1 & OC2 != 0` → reject (both outside same side)
3. Else → find boundary intersection, replace outside endpoint, repeat

---

## Lab Task 9 — K-Means Clustering
*[VS Code / Google Colab]*

**Objective:** Segment an image by grouping pixels with similar colors using K-Means clustering.

K-Means groups data points into k clusters by minimizing the distance between each point and its cluster center (centroid).

**Algorithm Steps:**
1. Randomly initialize k centroids in RGB color space
2. Assign each pixel to the nearest centroid based on Euclidean distance
3. Recalculate each centroid as the mean color of all assigned pixels
4. Repeat steps 2–3 until centroids no longer change

Both a manual NumPy implementation and OpenCV's `cv2.kmeans()` were used on the Strawberries image (Fig. 6.30).

| K Value | Segmentation Result |
|---|---|
| K = 2 | Rough split into foreground and background |
| K = 3 | Red fruit, green leaves, and dark background separated |
| K = 5 | More detailed color regions visible |

Higher K values produce more detailed segmentation but require more computation.

---

## Lab Task 10 — Boundary Fill and Flood Fill Algorithm
*[CodeBlocks / OpenGL — Applied for Object Detection]*

**Objective:** Fill enclosed regions in a raster image starting from a seed pixel.

Both algorithms start from a seed pixel and spread outward to fill a region. The difference lies in how they decide when to stop.

**Boundary Fill** — spreads to all 4 neighboring pixels (up, down, left, right) as long as the neighbor is not the boundary color and not already filled. The shape must have a pre-drawn closed boundary.

**Flood Fill** — replaces all connected pixels that share the same color as the seed pixel with the fill color. No pre-drawn boundary is needed.

| Feature | Boundary Fill | Flood Fill |
|---|---|---|
| Stop condition | Reaches the boundary color | Leaves the target color |
| Requires pre-drawn border | Yes | No |
| Risk | Leaks through gaps in the boundary | May overfill large uniform regions |

Both were implemented recursively in C++ using OpenGL's `glReadPixels()` to check pixel color at each step.

---

## Lab Task 11 — Edge Detection
*[VS Code / Google Colab — Gonzalez Chapter 10]*

**Objective:** Detect edges in an image using Laplacian of Gaussian (LoG) and Canny operators, applied to the Building image (Fig. 10.16).

An edge is a location in an image where pixel intensity changes sharply — typically at object boundaries.

**Laplacian of Gaussian (LoG)** (Gonzalez Eq. 10.3-7):
First applies a Gaussian blur to reduce noise, then uses the Laplacian (second derivative) to find locations where intensity changes direction — called zero-crossings. These zero-crossings are the detected edges. Output was normalized to 0–255 for visibility since raw LoG values are very small.

**Canny Detector** (Gonzalez Section 10.4):
A four-stage pipeline — (1) Gaussian smoothing to reduce noise, (2) Sobel gradient computation to find edge strength and direction, (3) non-maximum suppression to thin edges to one pixel wide, and (4) hysteresis thresholding (T1=50, T2=150) to keep only strong, connected edges and discard weak isolated ones.

| Detector | Noise Tolerance | Edge Quality | Speed |
|---|---|---|---|
| LoG | High | Precise but can be thick | Medium |
| Canny | Highest | Thin, connected, clean | Slower |

**Key Finding:** Canny produces superior results because non-maximum suppression removes redundant edge pixels and hysteresis thresholding eliminates noise responses, giving thin and well-connected edges.

---

## Conclusion

This laboratory course provided hands-on experience across 11 experiments covering both Computer Graphics and Digital Image Processing. The experiments progressed from foundational setup (OpenGL installation, image I/O) through core techniques (intensity transformations, histograms, line drawing) to more advanced topics (line clipping, fill algorithms, segmentation, and edge detection).

Key findings from the experiments:
- **Bresenham's algorithm** proves that integer arithmetic can outperform floating-point in rasterization — a principle still used in modern GPU hardware.
- **Cohen-Sutherland clipping** demonstrates how simple bitwise operations can make a graphics algorithm extremely efficient.
- **Otsu's method** shows that a well-chosen statistical criterion can fully automate threshold selection — validated across six different images from Gonzalez Chapter 10.
- **K-Means clustering** effectively segments images by color without requiring labeled data.
- **Canny edge detection** remains the industry standard because its multi-stage design systematically addresses every weakness of simpler edge detectors.

---
*Computer Graphics and Image Processing Laboratory — 7th Semester*
