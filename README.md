# dom-boids

L'idée ce serait d'avoir de la vie dans la page html en générant un essaim qui se baladerait sur la page

https://en.wikipedia.org/wiki/Boids

Le plus compliqué va être de parser le DOM. Au lieu de partir du dom, partir d'un screenshot et se baser sur les couleurs ?



Possible de générer un screenshot à partir dun DOM ? Moteur headless comme pour les tests ?

https://github.com/tsayen/dom-to-image  , à utiliser ou pour voir comment parser le dom

En js `window.innerWidth` et `window.innerHeight` dimensions en pixel

Sous-diviser la zone explorable en quadtree

document.documentElement.innerHTML;

UDP ?  Non, les browsers ne supportent pas pour des raisons de sécuriter, donc TCP / websockets, avec socket io probablement

API Gateway en go qui communique vers CPP en RPC ? (pour train go + cpp ?) Pas initialement je pense, peut être si l'IA se complexifie
