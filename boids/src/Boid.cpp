//
// Created by antoine on 10/07/20.
//

#include <cstdlib>
#include "../include/Boid.h"
#include "../include/Maccros.h"

Pos2D Boid::getPosition() const {
    return this->position;
}

Boid::Boid(): direction(Pos2D(std::rand() % 2 - 1, std::rand() % 2 - 1)), position(std::rand() % WIDTH, std::rand() % HEIGHT)
{
    this->direction.normalize();
    this->speed = 100;

    this->display = 'a' + std::rand() % 26;
}

char Boid::getDisplay() const {
    return this->display;
}

/*
 * We consider two boids equal if they have the same location (they should never overlap)
 */
bool Boid::operator==(const Boid &boid) const {
    return static_cast<int>(boid.position.x) == static_cast<int>(this->position.x) &&
            static_cast<int>(boid.position.y) == static_cast<int>(this->position.y);
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

bool Boid::operator!=(const Boid &boid) const {
    return !(*this == boid);
}

Boid &operator<<(Boid &out, const Protobuf::Boid &protobufBoid) {
    out.direction << protobufBoid.direction();
    out.position << protobufBoid.position();
    return out;
}

Protobuf::Boid &operator>>(const Boid &in, Protobuf::Boid &protobufBoid) {
    auto *direction = new Protobuf::Pos2D;
    auto *position = new Protobuf::Pos2D;

    in.direction >> *direction;
    in.position >> *position;

    protobufBoid.set_allocated_direction(direction);
    protobufBoid.set_allocated_position(position);
    return protobufBoid;
}

float Boid::getSpeed() const {
    return speed;
}
