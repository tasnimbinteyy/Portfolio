import re

path = r'c:\Users\USER\tasnim-jannat\src\app\blog\cg-lab\[slug]\labContents.ts'
content = open(path, encoding='utf-8').read()

old = "\"img = cv2.imread('lena.png', cv2.IMREAD_GRAYSCALE)\","
new = "\"img = cv2.imread('intensity_ramp.png', cv2.IMREAD_GRAYSCALE)\","

old2 = "\"axes[0].imshow(img, cmap='gray');        axes[0].set_title('Original')\","
new2 = "\"axes[0].imshow(img, cmap='gray');        axes[0].set_title('Original (Intensity Ramp)')\","

old3 = "\"**Application:** Used in medical imaging \u2014 X-ray films appear as negatives; taking the complement gives a more intuitive bright-bone-on-dark-background view.\","
new3 = "\"**Application:** The intensity ramp (Fig 3.7a) is the ideal demo for complement \u2014 a smooth gradient from black to white becomes white to black, perfectly illustrating s = 255 \u2212 r.\","

content = content.replace(old, new, 1)
content = content.replace(old2, new2, 1)
content = content.replace(old3, new3, 1)

open(path, 'w', encoding='utf-8').write(content)
print("DONE")
