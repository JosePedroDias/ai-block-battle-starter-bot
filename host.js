var line = require('./line');
var Grid = require('./grid');
var blocks = require('./blocks');

var dims = [10, 20];

var players = ['player1'];
var playerBot = players[0];



// to log stuff
var log = function(msg) {
    console.error.apply(console, arguments);
};



// to send relevant stuff to the server
var out = function() {
    console.log.apply(console, arguments);
};



var fs = require('fs');
var logLines = [];
var logInternal = function(msg) {
    logLines.push(msg);
    fs.writeFileSync('host.log', logLines.join('\n'));
};

//var logInternal = function() {};



// parse lines, update state, invoke bot
process.stdin.resume();
process.stdin.setEncoding('utf8');



var movesLeft = 10000;
var timePerMove = 500;
var round = 0;
var field = new Grid(dims[0], dims[1]);
var pieces = [];
pieces.push( blocks.getRandomBlockType() );
pieces.push( blocks.getRandomBlockType() );
var pos = [3, -1];
var points = 0;
var rowPoints = 0;
var combo = 0;
var waitingForBot = false;



var sendRound = function() {
    ++round;

    logInternal('round ' + round);

    if (pieces.length > 1) {
        pieces.shift();
        pieces.push( blocks.getRandomBlockType() );
    }

    out('update game round ' + round);
    out('update game this_piece_type ' + pieces[0]);
    out('update game next_piece_type ' + pieces[1]);
    out('update game this_piece_position ' + pos.join(','));
    out('update ' + playerBot + ' points ' + points);
    out('update ' + playerBot + ' row_points ' + rowPoints);
    out('update ' + playerBot + ' combo ' + combo);
    var p = blocks.getBlock( pieces[0] );
    var field2 = field.clone();
    field2.put(p, pos);
    var tmp = field2.toStringArray();
    logInternal(tmp);
    out('update ' + playerBot + ' field ' + tmp);
    out('action moves ' + movesLeft);

    waitingForBot = true;
};



line(
    process.stdin,
    function(cmd) { // onLine
        cmd = cmd.trim();
        if (cmd.length = 0) { return; }

        log('received "%s"', cmd);
        logInternal('received "' + cmd + '"', cmd);

        if (!waitingForBot) {
            log('got answer without expecting it!');
        }
        else {
            if (round < 4) {
                sendRound();
            }
        }
    },
    function() { // onEnd
        process.exit(0);
    }
);

out('settings timebank ' + movesLeft);
out('settings time_per_move ' + timePerMove);
out('settings player_names ' + players.join(','));
out('settings your_bot ' + playerBot);
out('settings field_width ' + dims[0]);
out('settings field_height ' + dims[1]);

sendRound();
