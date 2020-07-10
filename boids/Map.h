//
// Created by antoine on 10/07/20.
//

#ifndef BOIDS_MAP_H
#define BOIDS_MAP_H

#import <vector>
#include "Pos2D.h"

/*
 * Comme input on va avoir:
 *
 * largeur / hauteur canvas
 * obstacles
 * boids param
 *
 */

class Map {
private:
    Pos2D dimensions;
    std::vector<Pos2D> agents;

public:
    Map();

    /*
     * Print the map to stdout
     */
    void display() const;

    /*
     * Print and rewrites the map to stdout, n times
     * if n == 0, doesn't stop
     * include refresh rate
     * Should not be in map
     */
    void displayInteractive(int n) const;
};


#endif //BOIDS_MAP_H
