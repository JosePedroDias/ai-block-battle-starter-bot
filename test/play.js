var assert = require('assert');

var play   = require('../play');
var blocks = require('../blocks');
var Grid   = require('../grid');



suite('play', function() {

    test('play', function() {
        var field = new Grid(10, 20);
        var piece = blocks.blocks['J'].clone();
        var pos = [3, 0];
        var p = play.play(field, piece, pos);

        p = p.down();
        p = p.left();
        p = p.turnLeft();

        var field1 = p.applyMovements();
        var movements = p.getMovements();
        console.log('movements: ' + movements.join(','));
        console.log('field1:\n' + field1.toString());
    });

    test('electPlay', function() {

        var field = new Grid(10, 20);
        var piece = blocks.blocks['J'].clone();
        var pos = [3, 0];
        var p = play.play(field, piece, pos);

        p = play.electPlay(p);

        var field1 = p.applyMovements();
        var movements = p.getMovements();
        console.log('movements: ' + movements.join(','));
        console.log('field1:\n' + field1.toString());
    });

});
