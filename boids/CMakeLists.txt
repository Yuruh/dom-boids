cmake_minimum_required(VERSION 3.13)
project(boids)

set(CMAKE_CXX_STANDARD 17)

add_executable(boids main.cpp Map.cpp Map.h Pos2D.cpp Pos2D.h)