//
// Created by antoine on 10/07/20.
//

#ifndef BOIDS_POS2D_H
#define BOIDS_POS2D_H


#include <iostream>

struct Pos2D {
    Pos2D(float x, float y);
    float x;
    float y;

    bool operator==(const Pos2D& pos) const;

    Pos2D operator+(const Pos2D& pos) const;
    Pos2D operator-(const Pos2D& pos) const;
    Pos2D& operator+=(const Pos2D& pos);
    Pos2D operator/(float n) const;

    void normalize();
    float getMagnitude() const;
};

std::ostream& operator<<(std::ostream& os, const Pos2D& pos);


#endif //BOIDS_POS2D_H
