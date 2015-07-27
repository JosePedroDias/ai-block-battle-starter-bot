var readline = require('readline');



var settings = {}; // bag

var updates = {}; // bag of bags (game, player1, player2?)



//__main__



var out = function(msg) {
    console.log(msg);
};

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
    output   : process.stdout,
    terminal : false
});

rl.setPrompt('');
rl.prompt();

rl.on('line', function(cmd) {
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
            log('drop');
            break;
            
        default:
            // unsupported
    }
});

rl.on('close', function() {
    process.exit(0);
});

//rl.pause() stops listening
//rl.resume() resumes listening
//rl.close() to exit
