var line = require('./line');
var bot  = require('./bot');



var settings = {}; // bag

var updates = {}; // bag of bags (game, player1, player2?)



//__main__



// to log stuff
var log = function(msg) {
    console.error.apply(console, arguments);
};



// to send relevant stuff to the server
var out = function() {
    console.log.apply(console, arguments);
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



// setup bot, sharing state and i/o
var b = bot(settings, updates, out, log);



// parse lines, update state, invoke bot
process.stdin.resume();
process.stdin.setEncoding('utf8');

line(
    process.stdin,
    function(cmd) { // onLine
        cmd = cmd.trim();
        if (cmd.length = 0) { return; }

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
                b.play();
                break;

            default:
                //log('unsupported command!');
        }
    },
    function() { // onEnd
        process.exit(0);
    }
);
