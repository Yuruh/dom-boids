//
// Created by antoine on 10/07/20.
//

#include <cmath>
#include "Pos2D.h"

bool Pos2D::operator==(const Pos2D &pos) const {
    return pos.x == this->x && pos.y == this->y;
}

Pos2D::Pos2D(float x, float y): x(x), y(y) {

}

Pos2D Pos2D::operator+(const Pos2D &pos) const {
    return Pos2D(this->x + pos.x, this->y + pos.y);
}

Pos2D Pos2D::operator/(float n) const {
    if (n < 0.0001 && n > -0.0001) {
        return *this;
    }
    return Pos2D(this->x / n, this->y / n);
}

Pos2D& Pos2D::operator+=(const Pos2D &pos) {
    *this = *this + pos;
    return *this;
}

Pos2D Pos2D::operator-(const Pos2D &pos) const {
    return Pos2D(this->x - pos.x, this->y - pos.y);

}

void Pos2D::normalize() {
    *this = *this / this->getMagnitude();
}

float Pos2D::getMagnitude() const {
    return std::sqrt(this->x * this->x + this->y * this->y);
}

Pos2D::Pos2D() {
    this->x = 0;
    this->y = 0;

}

float Pos2D::distanceWith(const Pos2D &other) const {
    return std::sqrt((other.x - this->x) * (other.x - this->x) + (other.y - this->y) * (other.y - this->y));
}


std::ostream& operator<<(std::ostream &os, const Pos2D &pos) {
    os << pos.x << " " << pos.y;
    return os;
}