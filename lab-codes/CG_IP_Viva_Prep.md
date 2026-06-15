# Viva Preparation — CG & IP Lab
### Simple explanations for each lab task

---

## Lab 1 — OpenGL Installation

**Q: OpenGL কি?**
OpenGL হলো একটা library যেটা দিয়ে computer এ 2D/3D graphics draw করা যায়। এটা তোমার code আর GPU এর মধ্যে bridge হিসেবে কাজ করে।

**Q: GLUT কি কাজ করে?**
OpenGL নিজে window তৈরি করতে পারে না। GLUT (freeglut) window তৈরি করে, keyboard/mouse handle করে।

**Q: কী কী install করতে হয়েছিল?**
freeglut এর header files, library files আর freeglut.dll — এই তিনটা সঠিক জায়গায় রেখে CodeBlocks এ linker settings configure করতে হয়েছিল।

---

## Lab 2 — Image Basics

**Q: OpenCV image কীভাবে load করে?**
BGR order এ load করে — Blue, Green, Red। কিন্তু Matplotlib RGB expect করে। তাই `cv2.cvtColor()` দিয়ে convert করতে হয়।

**Q: img.shape কী return করে?**
`(height, width, channels)` — যেমন `(666, 666, 3)` মানে 666px লম্বা, 666px চওড়া, 3টা channel (BGR)।

**Q: 1000 image কীভাবে load করলে?**
`glob.glob()` দিয়ে সব file path collect করে loop এ `cv2.imread()` দিয়ে load করলাম। `if img is not None` check করলাম যাতে corrupt file crash না করে।

---

## Lab 3 — Intensity Transformations

**Q: Intensity Transformation কি?**
প্রতিটা pixel এর value একটা formula দিয়ে বদলানো। একটা pixel independently process হয় — তাই এটাকে **point operation** বলে।

**Q: Image Complement কি?**
`s = 255 - r` — প্রতিটা pixel এর value উল্টে দেওয়া। কালো হয়ে যায় সাদা, সাদা হয়ে যায় কালো।

**Q: Gamma Correction কেন দরকার?**
`s = c · r^γ` — γ < 1 হলে image উজ্জ্বল হয়, γ > 1 হলে অন্ধকার হয়। Washed-out (বেশি উজ্জ্বল, detail নেই) image কে γ = 0.4 দিয়ে ঠিক করা হয়।

**Q: Log Transformation কেন দরকার?**
`s = c · log(1 + r)` — DFT spectrum এর মতো image এ high value গুলো compress করে, low value গুলো expand করে। ফলে dark region এর detail দেখা যায়।

**Q: Image Subtraction দিয়ে কী করলে?**
দুটো একই scene এর image এর পার্থক্য বের করলাম — একটায় car আছে, একটায় নেই। `cv2.absdiff()` দিয়ে difference নিলে শুধু car টা দেখা গেল।

---

## Lab 4 — Histogram & Equalization

**Q: Histogram কি?**
Image এর প্রতিটা intensity value (0-255) কতবার আছে সেটার bar chart। এটা দেখে বলা যায় image টা dark নাকি bright নাকি low contrast।

**Q: Low contrast image এর histogram কেমন দেখায়?**
Narrow — সব pixels একটা ছোট range এ concentrate করা থাকে।

**Q: Histogram Equalization কি করে?**
Pixel values গুলো 0-255 range এ ছড়িয়ে দেয় যাতে contrast বাড়ে। `cv2.equalizeHist()` automatically করে।

**Q: Limitation কি?**
পুরো image কে globally treat করে। Image এর কোনো একটা অংশ dark হলে সেটা আলাদাভাবে improve করা যায় না — সেজন্য CLAHE লাগে।

---

## Lab 5 — Line Drawing Algorithms

**Q: Screen এ line draw করা কেন কঠিন?**
Screen হলো pixel grid — ছোট ছোট square। Mathematical line continuous, কিন্তু screen discrete। তাই line টা কোন কোন pixel দিয়ে যাবে সেটা calculate করতে হয়।

**Q: DDA কীভাবে কাজ করে?**
`steps = max(|dx|, |dy|)`, তারপর প্রতি step এ x আর y তে `dx/steps` আর `dy/steps` যোগ করে, round করে pixel plot করে। **Floating point** use করে।

**Q: Bresenham কীভাবে আলাদা?**
শুধু **integer arithmetic** — কোনো float নেই। একটা error term `err = dx - dy` maintain করে। প্রতি step এ error দেখে x বা y adjust করে। Faster এবং more accurate।

**Q: কোনটা ভালো?**
Bresenham — কারণ integer operation hardware এ অনেক fast। GPU এর ভেতরেও এই algorithm use হয়।

---

## Lab 6 — Geometric Transformations

**Q: Geometric Transformation কি?**
Image এর pixel গুলোর position বদলানো — কিন্তু pixel এর color/value বদলায় না।

**Q: Translation কি?**
Image কে x আর y direction এ shift করা। Matrix: `[[1, 0, tx], [0, 1, ty]]`। Boundary এর বাইরে যাওয়া pixel গুলো কালো হয়ে যায়।

**Q: Rotation কি?**
Image কে একটা center point এর চারদিকে ঘোরানো। `cv2.getRotationMatrix2D(center, angle, scale)` দিয়ে matrix বানানো হয়।

**Q: Scaling কি?**
Image কে বড় বা ছোট করা। Downscaling এ `INTER_AREA` interpolation best — aliasing এড়ায়।

**Q: Affine Matrix কি?**
2×3 matrix যেটা দিয়ে translation, rotation, scaling সব express করা যায়। `cv2.warpAffine()` এই matrix নিয়ে সব pixel এর নতুন position calculate করে।

---

## Lab 7 — Otsu's Thresholding

**Q: Thresholding কি?**
Grayscale image কে binary (শুধু কালো-সাদা) image এ convert করা। একটা threshold T ঠিক করা হয় — T এর উপরে white, নিচে black।

**Q: Otsu's Method কি করে?**
Automatically সবচেয়ে ভালো T খুঁজে বের করে। সে threshold টা choose করে যেটায় background আর foreground এর মধ্যে পার্থক্য (inter-class variance) সবচেয়ে বেশি।

**Q: Formula কি?**
`σ²_between = w0 · w1 · (μ0 - μ1)²`
w0, w1 = দুটো class এর pixel fraction, μ0, μ1 = দুটো class এর mean intensity।

**Q: কোন image এ ভালো কাজ করে?**
Bimodal histogram — দুটো আলাদা peak আছে যেমন fingerprint (ridge আর valley)। Fig 10.38।

**Q: কোথায় fail করে?**
Flat histogram বা heavy noise — যেমন Fig 10.40 এ σ=50 noise এর কারণে histogram এর দুটো peak আর আলাদা থাকে না।

**Q: Fig 10.36-10.41 এ কি দেখালে?**
Different images এ Otsu apply করলাম — septagon with noise, fingerprint, polymersomes। দেখলাম noise বাড়লে Otsu এর performance কমে, bimodal histogram থাকলে ভালো কাজ করে।

---

## Lab 8 — Cohen-Sutherland Line Clipping

**Q: Line Clipping কি?**
Graphics এ viewport (window) এর বাইরের line এর অংশ কেটে বাদ দেওয়া। শুধু visible অংশটুকু draw করা হয়।

**Q: Outcode কি?**
প্রতিটা endpoint এর position বোঝানোর জন্য 4-bit code:
- Bit 0 (LEFT): x < xmin
- Bit 1 (RIGHT): x > xmax
- Bit 2 (BOTTOM): y < ymin
- Bit 3 (TOP): y > ymax
ভেতরে থাকলে 0000।

**Q: Algorithm কীভাবে কাজ করে?**
- দুটো endpoint এর OC বের করো
- `OC1 | OC2 == 0` → দুটোই ভেতরে → draw করো (trivially accept)
- `OC1 & OC2 != 0` → দুটোই same side এর বাইরে → বাদ দাও (trivially reject)
- নাহলে → বাইরের endpoint টা boundary তে নিয়ে আসো, repeat করো

**Q: কেন এটা efficient?**
বেশিরভাগ line trivially accept বা reject হয় — intersection calculate করতেই হয় না।

---

## Lab 9 — K-Means Clustering

**Q: Clustering কি?**
Similar জিনিসগুলোকে group করা, কোনো label ছাড়া। Image processing এ pixels কে color similarity অনুযায়ী group করা।

**Q: K-Means কীভাবে কাজ করে?**
1. k টা random centroid choose করো
2. প্রতিটা pixel কে সবচেয়ে কাছের centroid এর group এ দাও
3. প্রতিটা group এর নতুন centroid calculate করো (mean)
4. Centroid আর না বদলানো পর্যন্ত repeat করো

**Q: Image segmentation এ কীভাবে use হয়?**
প্রতিটা pixel এর RGB value একটা point — K-Means similar color এর pixel গুলো একসাথে group করে। K=3 মানে 3টা color region।

**Q: K এর value কীভাবে affect করে?**
K বাড়লে বেশি detail — কিন্তু computation বাড়ে। K=2 খুব rough, K=5 বেশি detail।

---

## Lab 10 — Boundary & Flood Fill

**Q: Fill Algorithm কি কাজ করে?**
একটা seed pixel থেকে শুরু করে পুরো region এ color fill করে।

**Q: Boundary Fill এ কি হয়?**
Seed থেকে শুরু করে চারদিকে ছড়িয়ে যায়। যখন boundary color এর pixel পাওয়া যায় সেখানে থেমে যায়। Shape এর border আগে থেকে drawn থাকতে হবে।

**Q: Flood Fill এ কি হয়?**
Seed এর color (target color) এর সব connected pixel কে fill color দিয়ে replace করে। Border লাগে না।

**Q: 4-connected মানে কি?**
শুধু উপরে, নিচে, বামে, ডানে — 4 দিকে ছড়ায়। 8-connected হলে diagonal ও।

**Q: কোথায় use হয়?**
Paint এর bucket tool, map এ region color করা, game এ fog of war।

---

## Lab 11 — Edge Detection

**Q: Edge কি?**
Image এ যেখানে intensity হঠাৎ বেশি বদলে যায় — object এর boundary, surface এর crease।

**Q: LoG কীভাবে কাজ করে?**
1. Gaussian blur দিয়ে noise কমাও
2. Laplacian (second derivative) apply করো
3. Zero-crossing যেখানে সেখানে edge

**Q: কেন Gaussian blur আগে দরকার?**
Laplacian noise কে amplify করে। Blur আগে দিলে noise suppress হয়।

**Q: Canny কি এবং কেন best?**
4টা stage:
1. Gaussian smoothing — noise কমানো
2. Sobel দিয়ে gradient বের করা
3. Non-maximum suppression — edge কে 1 pixel wide করা
4. Hysteresis thresholding — weak edge বাদ দেওয়া

এই 4 step এর কারণে Canny সবচেয়ে thin, connected, clean edge দেয়।

**Q: LoG আর Canny এর পার্থক্য?**
LoG simpler কিন্তু edges thick হতে পারে। Canny অনেক বেশি precise — non-maximum suppression এজন্য।

---

## Common Viva Questions

**Q: Computer Graphics আর Image Processing এর পার্থক্য কি?**
- **Computer Graphics**: কিছু তৈরি করা — line, shape, 3D object draw করা (output = image)
- **Image Processing**: existing image এ কাজ করা — enhance, analyze, transform (input = image)

**Q: OpenGL এ glBegin/glEnd কি করে?**
Drawing শুরু আর শেষ mark করে। `glBegin(GL_POINTS)` বলে "এখন points আঁকব", `glEnd()` বলে "শেষ"।

**Q: Gonzalez এর book কোন edition ব্যবহার করেছ?**
Digital Image Processing, 3rd Edition — Rafael C. Gonzalez & Richard E. Woods।

---

*All the best for your viva!*
