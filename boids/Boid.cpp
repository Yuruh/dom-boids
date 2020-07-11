//
// Created by antoine on 10/07/20.
//

#include <cstdlib>
#include "Boid.h"
#include "Maccros.h"

Pos2D Boid::getPosition() const {
    return this->position;
}

Boid::Boid(): direction(Pos2D(std::rand() % 2 - 1, std::rand() % 2 - 1)), position(std::rand() % WIDTH, std::rand() % HEIGHT)
{
    this->direction.normalize();
    this->speed = 2;
}

/*
 * We consider two boids equal if they have the same location (they should never overlap)
 */
bool Boid::operator==(const Boid &boid) const {
    return position.x == this->position.x && position.y == this->position.y;
}

void Boid::setPosition(Pos2D pos) {
    this->position = pos;
}

Pos2D Boid::getDirection() const {
    return this->direction;
}

void Boid::setDirection(const Pos2D &dir) {
    this->direction = dir;
    this->direction.normalize();
}
