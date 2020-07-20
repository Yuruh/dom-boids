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

// TODO take map as input or smth
void Flock::update(float elapsedTimeSec, const Map &map) {
    Pos2D center = this->centreOfMass();

    float reactiveness = 0.1;

    for (Boid &boid : this->boids) {

        // steer to move towards the average position (center of mass) of local flockmates
        Pos2D cohesion = (center - boid.getPosition());
        cohesion.normalize();
        cohesion = cohesion * reactiveness;


        // steer to avoid crowding local flockmates
        Pos2D separation = this->avoidVector(boid);
        separation = separation * reactiveness * 2;

        // steer towards the average heading of local flockmates
        Pos2D alignment = this->centreOfDirection();
        alignment = alignment * reactiveness;

        Pos2D nextDirection = cohesion + separation + alignment;
        nextDirection.normalize();

//        nextDirection = nextDirection * reactiveness;

        boid.setDirection(boid.getDirection() + cohesion + separation + alignment);


        float nextPosX = (boid.getPosition().x + boid.getDirection().x * elapsedTimeSec * boid.getSpeed());
        float nextPosY = (boid.getPosition().y + boid.getDirection().y * elapsedTimeSec * boid.getSpeed());

        /*
         * To do : handle obstacles, turn around, and no multiple boids on same case
         */
        if (nextPosX < 0) {
            nextPosX += map.getDimensions().x;
        }
        if (nextPosX >= map.getDimensions().x) {
            nextPosX -= map.getDimensions().x;
        }
        if (nextPosY < 0) {
            nextPosY += map.getDimensions().y;
        }
        if (nextPosY >= map.getDimensions().y) {
            nextPosY -= map.getDimensions().y;
        }

        struct Predicate {
            int x;
            int y;

            explicit Predicate(int x, int y): x(x), y(y) {}

            bool operator()(Boid boid) const {
                return static_cast<int>(boid.getPosition().x) == x && static_cast<int>(boid.getPosition().y) == y;
            }
        };

        if (std::any_of(this->boids.cbegin(), this->boids.cend(), Predicate(static_cast<int>(nextPosX),
                                                                            static_cast<int>(nextPosY)))) {
            std::cout << "Cannot go there, there's already a boid" << std::endl;
        } else {
            boid.setPosition(Pos2D(nextPosX, nextPosY));
        }
    }
}

Pos2D Flock::avoidVector(const Boid &boid) {
    Pos2D ret;

    int distanceMin = 100;

    for (const Boid &boid_it : this->boids) {
/*        if (boid != boid_it) {
            std::cout << boid_it.getPosition().distanceWith(boid.getPosition()) << std::endl;
        }*/
        if (boid != boid_it && boid_it.getPosition().distanceWith(boid.getPosition()) < distanceMin) {
            ret = ret - (boid_it.getPosition() - boid.getPosition());
            //std::cout << ret << std::endl;

        }
    }
    ret.normalize();
    return ret;
}

Flock &operator<<(Flock &out, const Protobuf::Flock &protobufFlock) {
    protobufFlock.boids().size();

    for (int i = 0; i < protobufFlock.boids().size(); ++i) {
        Boid boid;
        boid << protobufFlock.boids(i);
        out.boids.push_back(boid);
    }
    return out;
}

Protobuf::Flock &operator>>(const Flock &out, Protobuf::Flock &protobufFlock) {
    protobufFlock.clear_boids();

    for (int i = 0; i < out.boids.size(); ++i) {
        auto *boid = protobufFlock.add_boids();

        out.boids[i] >> *boid;
    }
    return protobufFlock;
}
