//
// Created by antoine on 10/07/20.
//

#include <iostream>
#include "../include/Flock.h"
#include "../include/Maccros.h"

Pos2D Flock::centreOfMass() const {
    Pos2D accumulator(0, 0);


    for (const Boid &boid : this->boids) {
        accumulator += boid.getPosition();
    }

    return accumulator / this->boids.size();
}


Pos2D Flock::centreOfDirection() const {
    Pos2D accumulator(0, 0);

    for (const Boid &boid : this->boids) {
        accumulator += boid.getDirection();
    }

    accumulator.normalize();

    return accumulator;
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

        Pos2D cohesion = (center - boid.getPosition());
        cohesion.normalize();
        Pos2D separation = this->avoidVector(boid);
        Pos2D alignment = this->centreOfDirection();

        boid.setDirection(boid.getDirection() + cohesion + separation + alignment);


        float nextPosX = (boid.getPosition().x + boid.getDirection().x * elapsedTimeSec);
        float nextPosY = (boid.getPosition().y + boid.getDirection().y * elapsedTimeSec);

        /*
         * To do : handle obstacles, turn around, and no multiple boids on same case
         */
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

Pos2D Flock::avoidVector(const Boid &boid) {
    Pos2D ret;

    int distanceMin = 5;

    for (const Boid &boid_it : this->boids) {
        if (boid != boid_it && boid_it.getPosition().distanceWith(boid.getPosition()) < distanceMin) {
            ret = ret - (boid_it.getPosition() - boid.getPosition());
        }
    }
    ret.normalize();
    return ret;
}

