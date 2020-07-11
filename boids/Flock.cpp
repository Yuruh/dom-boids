//
// Created by antoine on 10/07/20.
//

#include <iostream>
#include "Flock.h"
#include "Maccros.h"

Pos2D Flock::centreOfMass() {
    Pos2D accumulator(0, 0);


    for (const Boid &boid : this->boids) {
        accumulator += boid.getPosition();
    }

    return accumulator / this->boids.size();
}

void Flock::addBoid(const Boid &boid) {
    this->boids.push_back(boid);
}

const std::vector<Boid> Flock::getBoids() const {
    return this->boids;
}

void Flock::update(float elapsedTimeSec) {
    Pos2D center = this->centreOfMass();

    for (Boid &boid : this->boids) {

        Pos2D directionTowardsCenter = (center - boid.getPosition());

        boid.setDirection(boid.getDirection() + directionTowardsCenter);


        float nextPosX = (boid.getPosition().x + boid.getDirection().x * elapsedTimeSec);
        float nextPosY = (boid.getPosition().y + boid.getDirection().y * elapsedTimeSec);
        if (nextPosX < 0) {
            nextPosX += WIDTH;
        }
        if (nextPosX >= WIDTH) {
            nextPosX -= WIDTH;
        }
        if (nextPosY < 0) {
            nextPosY += HEIGHT;
        }
        if (nextPosY >= HEIGHT) {
            nextPosY -= HEIGHT;
        }
        boid.setPosition(Pos2D(nextPosX, nextPosY));
    }
}

