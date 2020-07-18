#include <memory>

#include <iostream>
#include <ctime>
#include <zconf.h>
#include "include/Map.h"
#include "include/Maccros.h"
#include "include/HttpServer.h"

std::unique_ptr<HttpServer> g_httpHandler;

void on_initialize(const std::string& address) {

    uri_builder uri(address);


    auto addr = uri.to_uri().to_string();
    g_httpHandler = std::make_unique<HttpServer>(addr);
    std::cout << "Launching http handler..." << std::endl;
    g_httpHandler->open().wait();

    std::cout << "Listening for requests at: " << addr << std::endl;
}

void on_shutdown()
{
    std::cout << "Closing http handler..." << std::endl;
    g_httpHandler->close().wait();
    std::cout << "Http handler closed" << std::endl;
}


int main() {
    std::string port = "8080";
    std::string address = "http://127.0.0.1:";
    address.append(port);

    on_initialize(address);
    std::cout << "Press ENTER to exit." << std::endl;

    std::string line;
    std::getline(std::cin, line);

    on_shutdown();
/*

    std::srand(static_cast<unsigned int>(std::time(nullptr)));

    std::cout << "Hello, World!" << std::endl;

    Flock flock;
    int nbOfBoids = 10;
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

    return 0;*/
}




