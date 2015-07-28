var Grid = require('./grid');



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

    log('started');

    return {
        play: function() {
            logInternal('\n--------------------\n');
            logInternal('round ' + updates.game.round);
            logInternal('piece ' + updates.game.this_piece_type + ' at ' + updates.game.this_piece_position);

            var g = new Grid(settings.field_width, settings.field_height);
            g.fromStringArray( updates[ settings.your_bot].field );
            logInternal( g.toString() );

            out('drop');
        }
    };

};



module.exports = bot;
