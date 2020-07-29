docker build -t yuruh/dom-boids-demo:$(git describe --abbrev=0) .

docker push yuruh/dom-boids-demo:$(git describe --abbrev=0)
