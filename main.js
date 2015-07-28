var readline = require('readline');



var settings = {}; // bag

var updates = {}; // bag of bags (game, player1, player2?)



//__main__



// to send relevant stuff to the server
var out = function() {
    console.log.apply(console, arguments);
};



// to log stuff
var log = function(msg) {
    console.error.apply(console, arguments);
};



// should cover all received data parsing
var parseVal = function parseVal(s) {
    if (s.indexOf(';') !== -1) {
        return s.split(';').map(parseVal);
    }
    if (s.indexOf(',') !== -1) {
        return s.split(',').map(parseVal);
    }
    return (isFinite(s) ? parseFloat(s) : s);
};



var rl = readline.createInterface({
    input    : process.stdin,
    terminal : false
});



rl.prompt();



rl.on('line', function(cmd) {
    log('received "%s"', cmd);

    var parts = cmd.split(' ');
    var op = parts.shift();
    
    switch (op) {
        case 'settings':
            settings[ parts[0] ] = parseVal( parts[1] );
            break;
            
        case 'update':
            (function() {
                var bag = updates[ parts[0] ];
                if (!bag) {
                    bag = {};
                    updates[ parts[0] ] = bag;
                }
                bag [ parts[1] ] = parseVal( parts[2] );
            })();
            break;
            
        case 'action':
            // TODO
            out('drop');
            break;
            
        default:
            // unsupported
    }
});



rl.on('close', function() {
    process.exit(0);
});
