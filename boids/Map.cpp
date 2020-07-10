//
// Created by antoine on 10/07/20.
//

#include <iostream>
#include <algorithm>
#include "Map.h"


Map::Map(): dimensions(Pos2D(10, 5)) {
    this->agents.push_back(Pos2D(4, 2));
}

void Map::display() const {


    struct Predicate {
        Pos2D pos2D;

        explicit Predicate(Pos2D pos): pos2D(pos) {}
        bool operator()(Pos2D pos) const { return pos == pos2D; }
    };

    for (int i = 0; i < this->dimensions.y; ++i) {
        for (int j = 0; j < this->dimensions.x; ++j) {
            if (std::any_of(this->agents.cbegin(), this->agents.cend(), Predicate(Pos2D(j, i))
            )) {
                std::cout << "o";
            } else {
                std::cout << "x";
            }
        }
        std::cout  << std::endl;
    }
}
