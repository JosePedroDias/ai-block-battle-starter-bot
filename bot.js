var Grid = require('./grid');



/*
 var fs = require('fs');
var logLines = [];
var logInternal = function(msg) {
    logLines.push(msg);
    fs.writeFileSync('bot.log', logLines.join('\n'));
};
*/
var logInternal = function() {};



var bot = function(settings, updates, out, log) {

    log('started');

    return {
        play: function() {
            /*logInternal('\n--------------------\n');
            logInternal(['** settings\n', JSON.stringify(settings), '\n'].join(''));
            logInternal(['** updates\n', JSON.stringify(updates), '\n'].join(''));
            logInternal(['** play:\n', 'drop', '\n'].join(''));*/

            out('drop');
        }
    };

};



module.exports = bot;
