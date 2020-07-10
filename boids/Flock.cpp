//
// Created by antoine on 10/07/20.
//

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
    for (Boid &boid : this->boids) {
        int dirX = static_cast<int>(boid.getPosition().x + boid.getDirection().x * elapsedTimeSec);
        int dirY = static_cast<int>(boid.getPosition().y + boid.getDirection().y * elapsedTimeSec);
        if (dirX < 0) {
            dirX += WIDTH;
        }
        if (dirX >= WIDTH) {
            dirX -= WIDTH;
        }
        if (dirY < 0) {
            dirY += HEIGHT;
        }
        if (dirY >= HEIGHT) {
            dirY -= HEIGHT;
        }
        boid.setPosition(Pos2D(dirX, dirY));
    }
}

