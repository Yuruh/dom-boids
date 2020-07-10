//
// Created by antoine on 10/07/20.
//

#ifndef BOIDS_POS2D_H
#define BOIDS_POS2D_H


struct Pos2D {
    Pos2D(int x, int y);
    int x;
    int y;

    bool operator==(const Pos2D& pos) const;

    Pos2D operator+(const Pos2D& pos) const;
    Pos2D operator+=(const Pos2D& pos) const;

    Pos2D operator/(unsigned int n) const;
};


#endif //BOIDS_POS2D_H
