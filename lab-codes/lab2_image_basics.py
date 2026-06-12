# Lab Task 2: Image Basics
# Run in VS Code or Google Colab
# Install: pip install opencv-python matplotlib

import cv2
import matplotlib.pyplot as plt
import numpy as np
import os
import glob

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'cg-lab')
os.makedirs(OUT, exist_ok=True)

# ── 1. Read and Display an Image ──────────────────────────────────────────────
img = cv2.imread('lena.png')               # replace with your image path
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Save original
cv2.imwrite(os.path.join(OUT, 'lena_original.png'), cv2.imread('lena.png'))

plt.imshow(img_rgb)
plt.title('Display Image')
plt.axis('off')
plt.savefig(os.path.join(OUT, 'lab2_display.png'), bbox_inches='tight', dpi=100)
plt.show()

# ── 2. Image Dimensions (RGB) ─────────────────────────────────────────────────
print(f"Shape  : {img.shape}")             # (height, width, channels)
print(f"Height : {img.shape[0]} px")
print(f"Width  : {img.shape[1]} px")
print(f"Channels: {img.shape[2]}")         # 3 for RGB/BGR

# ── 3. Read Image from Drive / PC Storage ────────────────────────────────────
image_path = r"C:\Users\USER\Pictures\sample.jpg"   # change to your path
if os.path.exists(image_path):
    img_from_drive = cv2.imread(image_path)
    img_from_drive = cv2.cvtColor(img_from_drive, cv2.COLOR_BGR2RGB)
    plt.imshow(img_from_drive)
    plt.title('Image from Drive')
    plt.axis('off')
    plt.show()
else:
    print("File not found. Update the path.")

# ── 4. Read 1000 Images ───────────────────────────────────────────────────────
folder_path = r"C:\Users\USER\Pictures\dataset"     # folder with 1000 images
image_files = glob.glob(os.path.join(folder_path, "*.jpg"))[:1000]

images = []
for path in image_files:
    img_temp = cv2.imread(path)
    if img_temp is not None:
        images.append(img_temp)

print(f"Loaded {len(images)} images")

# ── 5. Read Audio / Video ─────────────────────────────────────────────────────
# --- Video ---
video_path = r"C:\Users\USER\Videos\sample.mp4"    # change to your path
cap = cv2.VideoCapture(video_path)

frame_count = 0
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    frame_count += 1
    if frame_count == 1:                   # show only first frame
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        plt.imshow(frame_rgb)
        plt.title('First Video Frame')
        plt.axis('off')
        plt.show()

cap.release()
print(f"Total frames: {frame_count}")

# --- Audio (requires librosa) ---
# pip install librosa
import librosa
import librosa.display

audio_path = r"C:\Users\USER\Music\sample.wav"     # change to your path
if os.path.exists(audio_path):
    y, sr = librosa.load(audio_path)
    print(f"Sample rate: {sr}, Duration: {len(y)/sr:.2f}s")
    librosa.display.waveshow(y, sr=sr)
    plt.title('Audio Waveform')
    plt.show()
