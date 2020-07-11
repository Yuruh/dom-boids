#include <iostream>
#include <ctime>
#include <zconf.h>
#include "Map.h"
#include "Maccros.h"


int main() {
    std::srand(static_cast<unsigned int>(std::time(nullptr)));

    std::cout << "Hello, World!" << std::endl;

    Flock flock;
    int nbOfBoids = /*std::rand() % 30 + */10;
    for (int i = 0; i < nbOfBoids; ++i) {
        Boid boid;
        flock.addBoid(boid);
    }
    Map map(flock, Pos2D(WIDTH, HEIGHT));

    clock_t t;
    while (true) {
        t = clock();
        flock.update((float)t / CLOCKS_PER_SEC);

        usleep(200 * 1000);
        map.display();
    }

    return 0;
}