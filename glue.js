var child_process = require('child_process');

/*var stream = require('stream');
var Writable = stream.Writable;
var Readable = stream.Readable;*/



var scenario = [
    'node host.js',
    'node main.js'
];
scenario = scenario.map(function(sc) {
    return sc.split(' ');
});



var i = process.stdin;
var o = process.stdout;
var p1 = child_process.spawn( scenario[0].shift(), scenario[0], {stdio: [i, o, undefined]});
var p2 = child_process.spawn( scenario[1].shift(), scenario[1], {stdio: [o, i, undefined]});



/*var p1 = child_process.spawn( scenario[0].shift(), scenario[0], {stdio: [new Readable(), new Writable(), new Writable()]});
var p2 = child_process.spawn( scenario[1].shift(), scenario[1], {stdio: [new Readable(), new Writable(), new Writable()]});*/



process.on('SIGINT', function() {
    console.log('Got SIGINT. Exiting...');
    p1.kill();
    p2.kill();
});
