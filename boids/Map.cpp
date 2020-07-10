//
// Created by antoine on 10/07/20.
//

#include <iostream>
#include <algorithm>
#include "Map.h"
#include "Maccros.h"


bool isBoid(int x, int y, const Flock &flock) {

}


/*
 * Default constructor generates a random map
 */
/*Map::Map(): dimensions(Pos2D(WIDTH, HEIGHT)) {
    int nbOfBoids = std::rand() % 30 + 10;
    for (int i = 0; i < nbOfBoids; ++i) {
        Boid boid;
        this->flock.addBoid(boid);
    }
}*/



void Map::display() const {


/*    struct Predicate {
        int x;
        int y;

        explicit Predicate(int x, int y): x(x), y(y) {}

        bool operator()(Boid boid) const {
            std::cout<<"allo\n";
            return boid.getPosition().x == x && boid.getPosition().y == y;
        }
    };*/
    for (int i = 0; i < this->dimensions.x + 2; ++i) {
        std::cout << "-";
    }
    std::cout << std::endl;
    for (int y = 0; y < this->dimensions.y; y++) {
        std::cout << "|";
        for (int x = 0; x < this->dimensions.x; ++x) {
            if (this->isBoid(x, y)) {
                std::cout << "o";
            } else {
                std::cout << " ";
            }
/*            if (std::any_of(this->flock.getBoids().cbegin(), this->flock.getBoids().cend(), Predicate(i, j))) {
                std::cout << "o";
            } else {
                std::cout << "x";
            }*/
        }
        std::cout  <<  "|" << std::endl;
    }
    for (int i = 0; i < this->dimensions.x + 2; ++i) {
        std::cout << "-";
    }
    std::cout << std::endl;

}

Map::Map(Flock &flock, Pos2D dimensions): flock(flock), dimensions(dimensions) {

}

bool Map::isBoid(int x, int y) const {
    for (int i = 0; i < this->flock.getBoids().size(); ++i) {
        const Boid &boid = this->flock.getBoids()[i];
        // The modulo prevents out of bound, temporary solution until we handle collisions
        if (boid.getPosition().x == x && boid.getPosition().y == y) {
            return true;
        }
    }
    return false;
}
