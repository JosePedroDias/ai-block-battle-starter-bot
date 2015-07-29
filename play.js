var play = function play(field, piece, pos, movements) {

    if (movements === undefined) {
        movements = [];
    }

    return {
        left: function() {
            var pos2 = [ pos[0] - 1, pos[1] ];
            if (field.collides(piece, pos2)) { return; }
            var m = movements.slice(); m.push('left');
            return play(field, piece, pos2, m);
        },

        right: function() {
            var pos2 = [ pos[0] + 1, pos[1] ];
            if (field.collides(piece, pos2)) { return; }
            var m = movements.slice(); m.push('right');
            return play(field, piece, pos2, m);
        },

        down: function() {
            var pos2 = [ pos[0], pos[1] + 1 ];
            if (field.collides(piece, pos2)) { return; }
            var m = movements.slice(); m.push('down');
            return play(field, piece, pos2, m);
        },

        turnLeft: function() {
            var piece2 = piece.rotatedCCWClone();
            if (field.collides(piece2, pos)) { return; }
            var m = movements.slice(); m.push('turnleft');
            return play(field, piece2, pos, m);
        },

        turnRight: function() {
            var piece2 = piece.rotatedCWClone();
            if (field.collides(piece2, pos)) { return; }
            var m = movements.slice(); m.push('turnright');
            return play(field, piece2, pos, m);
        },

        getPosition: function() {
            return pos;
        },

        getMovements: function() {
            return movements;
        },

        applyMovements: function() {
            return field.put(piece, pos, true);
        }
    };
};



//var possibleActions = 'left right down turnLeft turnRight'.split(' ');




var electPlay = function(pl) {
    var bag, possibleActions;

    var dir = ( (Math.random() < 0.5) ? 'left' : 'right');
    var turn = ( (Math.random() < 0.5) ? 'turnLeft' : 'turnRight');

    while (true) {
        possibleActions = ['down', dir];
        if (Math.random() < 0.1) {
            possibleActions.push( turn );
        }

        bag = possibleActions
            .map(function (action) {
                return pl[action]();
            })
            .filter(function(el) {
                return !!el;
            });
        var l = bag.length;
        if (l === 0) { return pl; }
        pl = bag[ Math.floor( Math.random() * l ) ];
    }
};



module.exports = {
    play      : play,
    electPlay : electPlay
};
