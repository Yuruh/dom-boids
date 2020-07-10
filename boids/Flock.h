//
// Created by antoine on 10/07/20.
//

#ifndef BOIDS_FLOCK_H
#define BOIDS_FLOCK_H


#include <vector>
#include "Boid.h"

/*
 * For now we take "all boids" in the computation, but it should be only the ones that are near
 */

class Flock {
private:
    std::vector<Boid> boids;

    // could take a boid as param to exclude it
    /*
     * Compute the center position of all boids
     */
    Pos2D centreOfMass();

public:
    void addBoid(const Boid &boid);
    const std::vector<Boid> getBoids() const;
    void update(float elapsedTimeSec);

};


#endif //BOIDS_FLOCK_H
