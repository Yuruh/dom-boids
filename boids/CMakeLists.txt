cmake_minimum_required(VERSION 3.10)
project(boids)

set(Casablanca_LIBRARIES "-lboost_system -lcrypto -lssl -lcpprest")

set(CMAKE_CXX_STANDARD 17)

add_executable(boids main.cpp src/Map.cpp include/Map.h src/Pos2D.cpp include/Pos2D.h src/Core.cpp include/Core.h src/Boid.cpp include/Boid.h src/Flock.cpp include/Flock.h include/Maccros.h src/HttpServer.cpp include/HttpServer.h)

target_link_libraries(boids ${Casablanca_LIBRARIES})