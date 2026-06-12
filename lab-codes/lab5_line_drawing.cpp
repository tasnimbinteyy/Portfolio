// Lab Task 5: Line Drawing Algorithms
// DDA and Bresenham Line Drawing using OpenGL in CodeBlocks
// Setup: Add OpenGL & GLUT libraries in CodeBlocks linker settings:
//   -lglut32 -lglu32 -lopengl32

#include <GL/glut.h>
#include <cmath>
#include <cstdio>

// ── DDA Line Drawing Algorithm ────────────────────────────────────────────────
// Calculates intermediate points using floating-point increments
void drawDDA(int x1, int y1, int x2, int y2) {
    int dx = x2 - x1;
    int dy = y2 - y1;
    int steps = (abs(dx) > abs(dy)) ? abs(dx) : abs(dy);

    float xInc = (float)dx / steps;
    float yInc = (float)dy / steps;

    float x = x1, y = y1;

    glBegin(GL_POINTS);
    for (int i = 0; i <= steps; i++) {
        glVertex2i(round(x), round(y));
        x += xInc;
        y += yInc;
    }
    glEnd();
}

// ── Bresenham Line Drawing Algorithm ─────────────────────────────────────────
// Uses only integer arithmetic — faster and more accurate than DDA
void drawBresenham(int x1, int y1, int x2, int y2) {
    int dx = abs(x2 - x1);
    int dy = abs(y2 - y1);
    int sx = (x1 < x2) ? 1 : -1;
    int sy = (y1 < y2) ? 1 : -1;
    int err = dx - dy;

    glBegin(GL_POINTS);
    while (true) {
        glVertex2i(x1, y1);
        if (x1 == x2 && y1 == y2) break;
        int e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x1 += sx; }
        if (e2 <  dx) { err += dx; y1 += sy; }
    }
    glEnd();
}

// ── OpenGL Display ────────────────────────────────────────────────────────────
void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    glPointSize(2.0f);

    // DDA Line (Red)
    glColor3f(1.0f, 0.0f, 0.0f);
    drawDDA(50, 50, 400, 300);

    // Bresenham Line (Blue)
    glColor3f(0.0f, 0.0f, 1.0f);
    drawBresenham(50, 300, 400, 50);

    // Labels
    glColor3f(1.0f, 0.0f, 0.0f);
    glRasterPos2i(200, 310);
    const char* label1 = "DDA Line";
    for (int i = 0; label1[i] != '\0'; i++)
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_12, label1[i]);

    glColor3f(0.0f, 0.0f, 1.0f);
    glRasterPos2i(200, 40);
    const char* label2 = "Bresenham Line";
    for (int i = 0; label2[i] != '\0'; i++)
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_12, label2[i]);

    glFlush();
}

void init() {
    glClearColor(1.0f, 1.0f, 1.0f, 1.0f);   // white background
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(0, 500, 0, 400);              // coordinate system
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB);
    glutInitWindowSize(500, 400);
    glutInitWindowPosition(100, 100);
    glutCreateWindow("Lab 5: DDA & Bresenham Line Drawing");
    init();
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
