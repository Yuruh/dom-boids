//
// Created by antoine on 10/07/20.
//

#include "Pos2D.h"

bool Pos2D::operator==(const Pos2D &pos) const {
    return pos.x == this->x && pos.y == this->y;
}

Pos2D::Pos2D(int x, int y): x(x), y(y) {

}

Pos2D Pos2D::operator+(const Pos2D &pos) const {
    return Pos2D(this->x + pos.x, this->y + pos.y);
}

Pos2D Pos2D::operator/(unsigned int n) const {
    if (n < 1) {
        return *this;
    }
    return Pos2D(this->x / n, this->y / n);
}

Pos2D Pos2D::operator+=(const Pos2D &pos) const {
    return *this + pos;
}
