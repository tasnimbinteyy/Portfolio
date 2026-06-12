export type PanelType = "image" | "graph";

export interface ImageEntry {
  type: PanelType;
  inputSrc?: string;
  outputSrc?: string;
  inputLabel: string;
  outputLabel: string;
  caption: string;
  graphVariant?: "histogram" | "waveform" | "line" | "scatter" | "bar";
}

// A section can have one entry or an array of entries (shown as separate panels)
export const labImages: Record<string, Record<string, ImageEntry | ImageEntry[]>> = {

  // ── LAB 2 ──────────────────────────────────────────────────────────────────
  "cg-lab-2-image-basics": {
    // Task 1 — read & display
    "read-&-display-image": {
      type: "image",
      inputSrc: "/images/cg-lab/lab2_original.png",
      outputSrc: "/images/cg-lab/lab2_display.png",
      inputLabel: "Strawberries — Fig0630 (BGR loaded by OpenCV)",
      outputLabel: "Correctly displayed (BGR→RGB converted)",
      caption: "OpenCV loads in BGR order — cv2.cvtColor(img, COLOR_BGR2RGB) fixes the colors before display.",
    },
    // Task 2 — dimensions
    "image-dimensions-(rgb)": {
      type: "graph",
      graphVariant: "bar",
      inputLabel: "img.shape — (666, 666, 3)",
      outputLabel: "3 Channels: R, G, B distribution",
      caption: "img.shape returns (height=666, width=666, channels=3). Total pixels = 443,556. channels=3 means BGR color image.",
    },
    // Task 5 — audio/video (Tasks 3 & 4 are code-only, no image needed)
    "read-audio-&-video": {
      type: "graph",
      graphVariant: "waveform",
      inputLabel: "Audio file (.wav) — raw signal",
      outputLabel: "Waveform plot (amplitude vs time)",
      caption: "librosa.load() reads audio as a 1D NumPy array. waveshow() plots amplitude over time.",
    },
  },

  // ── LAB 3 ──────────────────────────────────────────────────────────────────
  "cg-lab-3-intensity-transformations": {
    "image-complement": {
      type: "image",
      inputSrc: "/images/cg-lab/lab3_xray_input.png",
      outputSrc: "/images/cg-lab/lab3_xray_complement.png",
      inputLabel: "Intensity Ramp (Gonzalez Fig 3.7a)",
      outputLabel: "Complement — intensities inverted",
      caption: "s = 255 − r — the complement of a ramp clearly shows how every intensity level gets flipped.",
    },
    "gamma-correction": {
      type: "image",
      inputSrc: "/images/cg-lab/lab3_washed_input.png",
      outputSrc: "/images/cg-lab/lab3_gamma_output.png",
      inputLabel: "Washed-out aerial image (γ = 1.0)",
      outputLabel: "Gamma corrected (γ = 0.4) — brighter",
      caption: "Gonzalez Fig 3.9 — power-law s = c·r^γ brightens washed-out image details.",
    },
    "log-transformation": {
      type: "image",
      inputSrc: "/images/cg-lab/lab3_dft_input.png",
      outputSrc: "/images/cg-lab/lab3_log_output.png",
      inputLabel: "DFT spectrum (without log)",
      outputLabel: "After Log Transform — detail visible",
      caption: "Gonzalez Fig 3.5 — s = c·log(1+r) compresses high values, expands low range.",
    },
    "image-subtraction": {
      type: "image",
      inputSrc: "/images/cg-lab/lab3_car_with.png",
      outputSrc: "/images/cg-lab/lab3_car_diff.png",
      inputLabel: "Scene with car (Gonzalez Fig 10.60a)",
      outputLabel: "Difference — removed car highlighted",
      caption: "cv2.absdiff between two frames reveals exactly what changed in the scene.",
    },
  },

  // ── LAB 4 — Two separate panels: image panel + histogram graph panel ────────
  "cg-lab-4-histogram": {
    "plotting-the-histogram": [
      {
        type: "image",
        inputSrc: "/images/cg-lab/lab4_einstein_input.png",
        outputSrc: "/images/cg-lab/lab4_histogram_plot.png",
        inputLabel: "Einstein — low contrast (Gonzalez Fig 2.41a)",
        outputLabel: "RGB Histogram Plot",
        caption: "A low contrast image has a narrow histogram — pixels clustered in a small intensity range.",
      },
      {
        type: "graph",
        graphVariant: "histogram",
        inputLabel: "Original histogram — narrow peak",
        outputLabel: "After equalization — uniform spread",
        caption: "Gonzalez Sec 3.3 — histogram shape directly shows contrast and brightness distribution.",
      },
    ],
    "histogram-equalization": [
      {
        type: "image",
        inputSrc: "/images/cg-lab/lab4_einstein_input.png",
        outputSrc: "/images/cg-lab/lab4_equalization_result.png",
        inputLabel: "Original Einstein (low contrast)",
        outputLabel: "Before & After Equalization comparison",
        caption: "Gonzalez Eq 3.3-8 — equalization spreads pixel values across full 0–255 range.",
      },
      {
        type: "graph",
        graphVariant: "histogram",
        inputLabel: "Original histogram (narrow, peaked)",
        outputLabel: "Equalized histogram (flat, spread)",
        caption: "CDF becomes approximately linear after equalization — contrast improves significantly.",
      },
    ],
  },

  // ── LAB 5 ──────────────────────────────────────────────────────────────────
  "cg-lab-5-line-drawing": {
    "dda-algorithm": {
      type: "graph",
      graphVariant: "line",
      inputLabel: "Start point (1, 12) → End point (16, 1)",
      outputLabel: "DDA — rasterized pixels on grid",
      caption: "DDA uses floating-point increments — each step rounds (x, y) to nearest pixel.",
    },
    "bresenham-algorithm": {
      type: "graph",
      graphVariant: "line",
      inputLabel: "Same start/end points as DDA",
      outputLabel: "Bresenham — integer arithmetic only",
      caption: "Bresenham uses only integer addition — faster and avoids rounding errors.",
    },
    "dda-vs-bresenham": {
      type: "graph",
      graphVariant: "scatter",
      inputLabel: "Pixel clusters in RGB space",
      outputLabel: "K-Means grouped (K=3 centroids)",
      caption: "Both DDA and Bresenham approximate the same ideal line — Bresenham is more precise.",
    },
  },

  // ── LAB 6 ──────────────────────────────────────────────────────────────────
  "cg-lab-6-geometric-transformations": {
    "translation": {
      type: "image",
      inputSrc: "/images/cg-lab/lab6_woman_original.png",
      outputSrc: "/images/cg-lab/lab6_translated.png",
      inputLabel: "Original (Gonzalez Fig 4.27)",
      outputLabel: "Translated (tx=80, ty=60)",
      caption: "warpAffine shifts every pixel by (tx, ty). Pixels outside boundary become black.",
    },
    "rotation": {
      type: "image",
      inputSrc: "/images/cg-lab/lab6_woman_original.png",
      outputSrc: "/images/cg-lab/lab6_rotated.png",
      inputLabel: "Original",
      outputLabel: "Rotated 45° around center",
      caption: "getRotationMatrix2D builds the 2×3 affine matrix — corners clip after rotation.",
    },
    "scaling": {
      type: "image",
      inputSrc: "/images/cg-lab/lab6_woman_original.png",
      outputSrc: "/images/cg-lab/lab6_scaled_down.png",
      inputLabel: "Original",
      outputLabel: "Scaled Down 0.5×",
      caption: "INTER_AREA interpolation gives best result when scaling down — avoids aliasing.",
    },
    "transformation-matrix": {
      type: "image",
      inputSrc: "/images/cg-lab/lab6_woman_original.png",
      outputSrc: "/images/cg-lab/lab6_transformations_result.png",
      inputLabel: "Original",
      outputLabel: "All transformations compared",
      caption: "Translation, rotation, and scaling all expressed as 2×3 affine matrices.",
    },
  },

  // ── LAB 7 — Image + histogram graph separately ──────────────────────────────
  "cg-lab-7-otsu-thresholding": {
    "what-is-thresholding?": [
      {
        type: "image",
        inputSrc: "/images/cg-lab/lab7_fingerprint_input.png",
        outputSrc: "/images/cg-lab/lab7_fingerprint_otsu.png",
        inputLabel: "Noisy Fingerprint (Gonzalez Fig 10.38)",
        outputLabel: "Otsu Binary Output",
        caption: "OpenCV THRESH_OTSU finds optimal T automatically — ridges white, valleys black.",
      },
      {
        type: "image",
        inputSrc: "/images/cg-lab/lab7_fingerprint_input.png",
        outputSrc: "/images/cg-lab/lab7_otsu_histogram.png",
        inputLabel: "Fingerprint (grayscale)",
        outputLabel: "Histogram with Otsu threshold line",
        caption: "Fingerprint has a bimodal histogram — two clear peaks (ridge vs valley intensity).",
      },
    ],
    "implementation": {
      type: "image",
      inputSrc: "/images/cg-lab/lab7_fingerprint_input.png",
      outputSrc: "/images/cg-lab/lab7_otsu_result.png",
      inputLabel: "Original Fingerprint",
      outputLabel: "Otsu Binary — side by side result",
      caption: "Manual Otsu and OpenCV THRESH_OTSU give the same T value — verifies implementation.",
    },
  },

  // ── LAB 8 ──────────────────────────────────────────────────────────────────
  "cg-lab-8-kmeans-clustering": {
    "k-means-algorithm": [
      {
        type: "image",
        inputSrc: "/images/cg-lab/lab8_strawberry_input.png",
        outputSrc: "/images/cg-lab/lab8_kmeans3_output.png",
        inputLabel: "Strawberries (Gonzalez Fig 6.30)",
        outputLabel: "K-Means Segmented (K=3)",
        caption: "K=3 groups pixels into 3 color clusters — red fruit, green leaves, dark background.",
      },
      {
        type: "graph",
        graphVariant: "scatter",
        inputLabel: "Pixel RGB values (raw, unsegmented)",
        outputLabel: "After K-Means — 3 clusters with centroids",
        caption: "Each dot = a pixel in RGB space. K-Means finds natural color groupings.",
      },
    ],
    "effect-of-k-values": {
      type: "image",
      inputSrc: "/images/cg-lab/lab8_strawberry_input.png",
      outputSrc: "/images/cg-lab/lab8_kmeans_result.png",
      inputLabel: "Original Strawberries",
      outputLabel: "K=2, K=3, K=5 — side by side comparison",
      caption: "Higher K preserves more color detail — K=2 over-simplifies, K=5 captures fine regions.",
    },
  },

  // ── LAB 9 ──────────────────────────────────────────────────────────────────
  "cg-lab-9-edge-detection": {
    "roberts-operator": {
      type: "image",
      inputSrc: "/images/cg-lab/lab9_building_input.png",
      outputSrc: "/images/cg-lab/lab9_roberts.png",
      inputLabel: "Building (Gonzalez Fig 10.16)",
      outputLabel: "Roberts Edge Output",
      caption: "2×2 diagonal gradient — fast but very sensitive to noise.",
    },
    "prewitt-operator": {
      type: "image",
      inputSrc: "/images/cg-lab/lab9_building_input.png",
      outputSrc: "/images/cg-lab/lab9_prewitt.png",
      inputLabel: "Building (original)",
      outputLabel: "Prewitt Edge Output",
      caption: "3×3 kernel averaging — better noise tolerance than Roberts.",
    },
    "sobel-operator": {
      type: "image",
      inputSrc: "/images/cg-lab/lab9_building_input.png",
      outputSrc: "/images/cg-lab/lab9_sobel.png",
      inputLabel: "Building (original)",
      outputLabel: "Sobel Edge Output",
      caption: "Weighted 3×3 — center pixels weighted more, gives stronger cleaner edges.",
    },
    "laplacian-of-gaussian": {
      type: "image",
      inputSrc: "/images/cg-lab/lab9_building_input.png",
      outputSrc: "/images/cg-lab/lab9_log.png",
      inputLabel: "Building (Gaussian pre-blurred)",
      outputLabel: "LoG Edge Output (zero-crossings)",
      caption: "Gonzalez Eq 10.3-7 — Gaussian smoothing first, then Laplacian detects zero-crossings.",
    },
    "canny-detector": {
      type: "image",
      inputSrc: "/images/cg-lab/lab9_building_input.png",
      outputSrc: "/images/cg-lab/lab9_canny.png",
      inputLabel: "Building (original)",
      outputLabel: "Canny Edge Output (T1=50, T2=150)",
      caption: "4-stage pipeline — thin, connected edges. Gold standard for edge detection.",
    },
    "comparison": {
      type: "image",
      inputSrc: "/images/cg-lab/lab9_building_input.png",
      outputSrc: "/images/cg-lab/lab9_edges_comparison.png",
      inputLabel: "Building (original)",
      outputLabel: "All 5 detectors — grid comparison",
      caption: "Roberts → Prewitt → Sobel → LoG → Canny: increasing edge quality and compute cost.",
    },
  },
};
