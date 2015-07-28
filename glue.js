var child_process = require('child_process');



var scenario = [
    'node host.js',
    'node main.js'
];
scenario = scenario.map(function(sc) {
    return sc.split(' ');
});



var inverse = true;
var i = process[ inverse ? 'stdout' : 'stdin'  ];
var o = process[ inverse ? 'stdin'  : 'stdout' ];



var p1 = child_process.spawn( scenario[0].shift(), scenario[0], {stdio: [i, o, undefined]});
var p2 = child_process.spawn( scenario[1].shift(), scenario[1], {stdio: [o, i, undefined]});



process.on('SIGINT', function() {
    console.log('Got SIGINT. Exiting...');
    p1.kill();
    p2.kill();
});
