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




// parse lines, update state, invoke bot
process.stdin.resume();
process.stdin.setEncoding('utf8');




/*
 settings timebank 10000
 settings time_per_move 500
 settings player_names player1,player2
 settings your_bot player1
 settings field_width 10
 settings field_height 20

 update game round 1
 update game this_piece_type T
 update game next_piece_type T
 update game this_piece_position 3,-1
 update player1 row_points 0
 update player1 combo 0
 update player1 field 0,0,0,1,1,1,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0
 update player2 field 0,0,0,1,1,1,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0
 update player2 row_points 0
 update player2 combo 0
 action moves 10000
* */


var blockTypes = Object.keys(blocks);

var getRandomBlockType = function() {
    var l = blockTypes.length;
    return blockTypes[ Math.floor( Math.random() * l ) ];
};


var movesLeft = 10000;
var timePerMove = 500;
var round = 0;
var field = new Grid(dims[0], dims[1]);
var pieces = [];
pieces.push( getRandomBlockType() );
pieces.push( getRandomBlockType() );
var pos = [3, -1];
var points = 0;
var rowPoints = 0;
var combo = 0;
var waitingForBot = false;



var sendRound = function() {
    ++round;

    if (pieces.length > 1) {
        pieces.shift();
        pieces.push( getRandomBlockType() );
    }

    out('update game round ' + round);
    out('update game this_piece_type ' + pieces[0]);
    out('update game next_piece_type ' + pieces[1]);
    out('update game this_piece_position ' + pos.join(','));
    out('update ' + playerBot + ' points ' + points);
    out('update ' + playerBot + ' row_points ' + rowPoints);
    out('update ' + playerBot + ' combo ' + combo);
    var p = blocks[pieces[0]].clone();
    var field2 = field.clone();
    field2.put(p, pos);
    out('update ' + playerBot + ' field ' + field2.toStringArray());
    out('action moves ' + movesLeft);

    waitingForBot = true;
};



line(
    process.stdin,
    function(cmd) { // onLine
        cmd = cmd.trim();
        if (cmd.length = 0) { return; }

        log('received "%s"', cmd);

        if (!waitingForBot) {
            log('got answer without expecting it!');
        }
        else {

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
