FROM ubuntu:20.04
RUN apt-get update
RUN apt-get install -y \
    cmake \
    g++ \
    zlib1g-dev \
    libcpprest-dev


COPY . .

RUN mkdir build

RUN cd build

RUN cmake ..

RUN make

EXPOSE 8080

CMD ./boids

