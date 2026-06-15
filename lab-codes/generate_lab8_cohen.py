import cv2
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SCRIPT_DIR, '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

# Viewport
xmin, xmax, ymin, ymax = 2, 8, 2, 8

# Cohen-Sutherland outcodes
INSIDE, LEFT, RIGHT, BOTTOM, TOP = 0, 1, 2, 4, 8

def compute_outcode(x, y):
    code = INSIDE
    if   x < xmin: code |= LEFT
    elif x > xmax: code |= RIGHT
    if   y < ymin: code |= BOTTOM
    elif y > ymax: code |= TOP
    return code

def cohen_sutherland(x1, y1, x2, y2):
    oc1, oc2 = compute_outcode(x1, y1), compute_outcode(x2, y2)
    while True:
        if not (oc1 | oc2):        # trivially accept
            return x1, y1, x2, y2, True
        elif oc1 & oc2:            # trivially reject
            return x1, y1, x2, y2, False
        oc_out = oc1 if oc1 else oc2
        if   oc_out & TOP:    x = x1 + (x2-x1)*(ymax-y1)/(y2-y1); y = ymax
        elif oc_out & BOTTOM: x = x1 + (x2-x1)*(ymin-y1)/(y2-y1); y = ymin
        elif oc_out & RIGHT:  y = y1 + (y2-y1)*(xmax-x1)/(x2-x1); x = xmax
        else:                 y = y1 + (y2-y1)*(xmin-x1)/(x2-x1); x = xmin
        if oc_out == oc1: x1, y1, oc1 = x, y, compute_outcode(x, y)
        else:             x2, y2, oc2 = x, y, compute_outcode(x, y)

# Lines to demonstrate all cases
lines = [
    (0.5, 5,   9.5, 5,   'Crosses left & right'),   # crosses both sides
    (3,   9.5, 7,   0.5, 'Crosses top & bottom'),   # crosses top & bottom
    (3,   3,   7,   7,   'Fully inside'),            # fully inside
    (0.5, 0.5, 1.8, 1.8, 'Fully outside'),           # fully outside
    (1,   6,   5,   10,  'Partially inside'),        # partial
]

BG    = '#0e0e12'
FG    = '#e8e8e4'
GRID  = '#2a2a35'
VP    = '#506464'
RED   = '#e07070'
GREEN = '#70c070'

def draw_regions(ax):
    # 9 region labels like tutorialspoint
    regions = [
        (0.5, 8.7, '1001', '#e07070'), (5,   8.7, '1000', '#e8e8e4'), (8.7, 8.7, '1010', '#e07070'),
        (0.5, 5,   '0001', '#e8e8e4'), (5,   5,   '0000', '#70c070'), (8.7, 5,   '0010', '#e8e8e4'),
        (0.5, 1.3, '0101', '#e07070'), (5,   1.3, '0100', '#e8e8e4'), (8.7, 1.3, '0110', '#e07070'),
    ]
    for rx, ry, label, color in regions:
        ax.text(rx, ry, label, color=color, fontsize=8, ha='center', va='center',
                fontfamily='monospace', alpha=0.7)

# ── Figure 1: INPUT — all original lines (before clipping) ──────────────────
fig, ax = plt.subplots(figsize=(6, 6), facecolor=BG)
ax.set_facecolor(BG)
ax.set_xlim(0, 10); ax.set_ylim(0, 10)
ax.set_aspect('equal')

# viewport rectangle
rect = patches.Rectangle((xmin, ymin), xmax-xmin, ymax-ymin,
                           linewidth=2, edgecolor=VP, facecolor='#506464' + '18')
ax.add_patch(rect)
ax.text(5, 5.1, 'Clip Window', color=VP, fontsize=9, ha='center', va='center', alpha=0.6)

draw_regions(ax)

# draw all lines in red (unclipped)
for x1, y1, x2, y2, label in lines:
    ax.plot([x1, x2], [y1, y2], color=RED, linewidth=2, alpha=0.9)
    ax.plot([x1, x2], [y1, y2], 'o', color=RED, markersize=4)

ax.set_title('Input — Lines Before Clipping', color=FG, fontsize=11, pad=10)
for spine in ax.spines.values(): spine.set_edgecolor(GRID)
ax.tick_params(colors='#506464')
ax.grid(True, color=GRID, linewidth=0.5, alpha=0.5)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab8_cohen_input.png'), dpi=130, bbox_inches='tight', facecolor=BG)
plt.close()
print("Saved: lab8_cohen_input.png")

# ── Figure 2: OUTPUT — clipped lines ────────────────────────────────────────
fig, ax = plt.subplots(figsize=(6, 6), facecolor=BG)
ax.set_facecolor(BG)
ax.set_xlim(0, 10); ax.set_ylim(0, 10)
ax.set_aspect('equal')

rect = patches.Rectangle((xmin, ymin), xmax-xmin, ymax-ymin,
                           linewidth=2, edgecolor=VP, facecolor='#506464' + '18')
ax.add_patch(rect)
ax.text(5, 5.1, 'Clip Window', color=VP, fontsize=9, ha='center', va='center', alpha=0.6)

draw_regions(ax)

for x1, y1, x2, y2, label in lines:
    # draw original line faintly
    ax.plot([x1, x2], [y1, y2], color=RED, linewidth=1.5, alpha=0.25, linestyle='--')
    # draw clipped portion
    cx1, cy1, cx2, cy2, accepted = cohen_sutherland(x1, y1, x2, y2)
    if accepted:
        ax.plot([cx1, cx2], [cy1, cy2], color=GREEN, linewidth=2.5, alpha=1.0)
        ax.plot([cx1, cx2], [cy1, cy2], 'o', color=GREEN, markersize=5)

ax.set_title('Output — Lines After Clipping', color=FG, fontsize=11, pad=10)
for spine in ax.spines.values(): spine.set_edgecolor(GRID)
ax.tick_params(colors='#506464')
ax.grid(True, color=GRID, linewidth=0.5, alpha=0.5)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'lab8_cohen_output.png'), dpi=130, bbox_inches='tight', facecolor=BG)
plt.close()
print("Saved: lab8_cohen_output.png")
