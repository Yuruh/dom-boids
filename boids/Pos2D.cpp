//
// Created by antoine on 10/07/20.
//

#include "Pos2D.h"

bool Pos2D::operator==(const Pos2D &pos) const {
    return pos.x == this->x && pos.y == this->y;
}

Pos2D::Pos2D(int x, int y): x(x), y(y) {

}
