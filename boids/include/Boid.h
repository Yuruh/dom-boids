//
// Created by antoine on 10/07/20.
//

#ifndef BOIDS_BOID_H
#define BOIDS_BOID_H


#include "Pos2D.h"

// http://www.kfish.org/boids/pseudocode.html

class Boid {
private:
    Pos2D position;
    Pos2D direction;

    char display;

    // In units per second
    float speed;
public:
    Boid();
    Pos2D getPosition() const;
    Pos2D getDirection() const;
    bool operator==(const Boid &boid) const;
    bool operator!=(const Boid &boid) const;

    void setDirection(const Pos2D &dir);
    void setPosition(Pos2D pos);

    char getDisplay() const;

    float getSpeed() const;

    friend Boid& operator<<(Boid &out, const Protobuf::Boid &protobufBoid);
    friend Protobuf::Boid& operator>>(const Boid &out, Protobuf::Boid &protobufBoid);

};


#endif //BOIDS_BOID_H
