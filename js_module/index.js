var test = 12;
var protobuf = require("protobufjs");

console.log(test);

protobuf.load("map.proto", function(err, root) {
    if (err)
        throw err;

    const Input = root.lookupType("Protobuf.Pos2D")

    const payload = {x: 1, y: 2}

    const msg = Input.create(payload);
    const buffer = Input.encode(msg).finish()

    const decoded = Input.decode(buffer);

    const result = Input.toObject(decoded);

    console.log(result);
})
