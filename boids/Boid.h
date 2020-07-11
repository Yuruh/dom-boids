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

    // In units per second
    float speed;
public:
    Boid();
    Pos2D getPosition() const;
    Pos2D getDirection() const;
    bool operator==(const Boid &boid) const;

    void setDirection(const Pos2D &dir);
    void setPosition(Pos2D pos);

};


#endif //BOIDS_BOID_H
