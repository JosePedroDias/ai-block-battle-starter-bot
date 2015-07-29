var assert = require('assert');

var play   = require('../play');
var blocks = require('../blocks');
var Grid   = require('../grid');



suite('play', function() {

    test('play', function() {
        var field = new Grid(10, 20);
        var piece = blocks.getBlock('T');
        var pos = [3, -1];
        var p = play.play(field, piece, pos);

        p = p.left();
        p = p.turnleft();
        p = p.down();
        p = p.left();
        p = p.turnleft();


        var movements = p.getMovements();
        var field1SR = p.applyMovements().toStringArray();
        //console.log('movements:\n' + JSON.stringify(movements));
        //console.log('field1SR:\n' + field1SR);
        assert.deepEqual(movements, ['left', 'turnleft', 'down', 'left', 'turnleft']);
        assert.equal(field1SR, '0,0,0,0,0,0,0,0,0,0;0,1,1,1,0,0,0,0,0,0;0,0,1,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0,0,0');
    });

    test('electPlay', function() {

        var field = new Grid(10, 20);
        var piece = blocks.getBlock('T');
        var pos = [3, -1];
        var p = play.play(field, piece, pos);

        p = play.electPlay(p);

        var movements = p.getMovements();
        var field1 = p.applyMovements();
        //console.log('movements:\n' + JSON.stringify(movements));
        //console.log('field1:\n' + field1.toString());
        assert.ok(movements.length > 18 && movements.length < 100);
        assert.equal(field1.isLineFilled(19), false);
    });

});
