var Grid   = require('./grid');
var blocks = require('./blocks');
var play   = require('./play');


/*
settings:
{
    "timebank"      : 10000,
    "time_per_move" : 500,
    "player_names"  : ["player1", "player2"],
    "your_bot"      : "player1",
    "field_width"   : 10,
    "field_height"  : 20
}

updates:
 {
    "game" : {
        "round"                : 1,
        "this_piece_type"     : "T",
        "next_piece_type"     : "T",
        "this_piece_position" : [3, -1]
    },
    "player1" : {
        "row_points" : 0,
        "combo"      : 0,
        "field"      : // array of h arrays of w
    },
    "player2" : {
        "row_points" : 0,
        "combo"      : 0,
        "field"      : // array of h arrays of w
    }
}
 */




var fs = require('fs');
var logLines = [];
var logInternal = function(msg) {
    logLines.push(msg);
    fs.writeFileSync('bot.log', logLines.join('\n'));
};

//var logInternal = function() {};



var bot = function(settings, updates, out, log) {

    //log = logInternal; // TODO TEMP

    log('started');

    return {
        play: function() {
            //log('\n--------------------\n');
            //log('round ' + updates.game.round);

            var pieceType     = updates.game.this_piece_type;
            //var nextPieceType = updates.game.next_piece_type;
            var pos = updates.game.this_piece_position;
            
            log('piece of type ' + pieceType + ' at ' + pos);
            
            var p = blocks.getBlock(pieceType);
            //log('piece:');
            //log( p.toString() );
            
            var w = settings.field_width;
            var h = settings.field_height;
            var field = updates[ settings.your_bot].field;
            
            var g = new Grid(w, h);
            g.fromStringArray(field);
            g.put(p, pos, false); // erase current piece
            
            //log('grid:');
            //log( g.toString() );
            
            //out('drop');

            var pl = play.play(g, p, pos);
            pl = play.electPlay(pl);
            var movements = pl.getMovements();
            movements = movements.join(',');
            if (movements.length === 0) {
                movements = 'no_moves';
            }
            log(movements);
            out(movements);
        }
    };

};



module.exports = bot;
