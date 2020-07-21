var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var protobuf = require("protobufjs");
var axios = require('axios');
var randomColor = require('randomcolor'); // import the script
var Boid = /** @class */ (function () {
    function Boid() {
        this.position = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        };
        this.direction = {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1
        };
    }
    return Boid;
}());
var colors = [];
protobuf.load("map.proto", function (err, root) {
    return __awaiter(this, void 0, void 0, function () {
        var Input, Output, boids, i, payload, msg, buffer, res, receivedBuffer, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err)
                        throw err;
                    Input = root.lookupType("Protobuf.Input");
                    Output = root.lookupType("Protobuf.Output");
                    boids = [];
                    for (i = 0; i < 200; i++) {
                        boids.push(new Boid());
                        colors.push(randomColor());
                    }
                    payload = {
                        map: {
                            dimensions: {
                                x: window.innerWidth,
                                y: window.innerHeight
                            }
                        },
                        refreshRate: 1,
                        secondsOfSimulation: 1,
                        flock: {
                            boids: boids
                        }
                    };
                    msg = Input.create(payload);
                    buffer = Input.encode(msg).finish();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.post("http://localhost:8080", buffer, {
                            responseType: 'arraybuffer'
                        })];
                case 2:
                    res = _a.sent();
                    receivedBuffer = Buffer.from(res.data, "base64");
                    data = Output.decode(receivedBuffer);
                    animateBoids(Output.toObject(data));
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
// gotta type it
function animateBoids(result) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var triangleSize = 60;
    var triangleWidthRad = 0.2;
    var _loop_1 = function (simulation) {
        setTimeout(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var i = 0;
            for (var _i = 0, _a = simulation.flock.boids; _i < _a.length; _i++) {
                var boid = _a[_i];
                ctx.beginPath();
                ctx.moveTo(boid.position.x, boid.position.y);
                var angleRad = Math.atan2(boid.direction.y * -1, boid.direction.x * -1);
                ctx.lineTo(boid.position.x + triangleSize * Math.cos(angleRad + triangleWidthRad), boid.position.y + triangleSize * Math.sin(angleRad + triangleWidthRad));
                ctx.lineTo(boid.position.x + triangleSize * Math.cos(angleRad - triangleWidthRad), boid.position.y + triangleSize * Math.sin(angleRad - triangleWidthRad));
                //  ctx.lineTo(boid.position.x + boid.direction.x * triangleSize, boid.position.y + boid.direction.y * triangleSize)
                //ctx.lineTo(boid.position.x - boid.direction.x * triangleSize, boid.position.y - boid.direction.y * triangleSize)
                // ctx.arc(boid.position.x, boid.position.y, 10, 0, Math.PI*2, false);
                ctx.fillStyle = colors[i++];
                ctx.fill();
                ctx.closePath();
            }
        }, simulation.elapsedTimeSecond * 1000);
    };
    for (var _i = 0, _a = result.simulations; _i < _a.length; _i++) {
        var simulation = _a[_i];
        _loop_1(simulation);
    }
}
