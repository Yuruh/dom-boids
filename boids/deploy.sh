docker build -t yuruh/boids:$(git describe --abbrev=0) .

# docker push yuruh/boids:$(git describe --abbrev=0)