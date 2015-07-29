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

        turnleft: function() {
            var piece2 = piece.rotatedCCWClone();
            if (field.collides(piece2, pos)) { return; }
            var m = movements.slice(); m.push('turnleft');
            return play(field, piece2, pos, m);
        },

        turnright: function() {
            var piece2 = piece.rotatedCWClone();
            if (field.collides(piece2, pos)) { return; }
            var m = movements.slice(); m.push('turnright');
            return play(field, piece2, pos, m);
        },

        getField: function() {
            return field;
        },

        getPiece: function() {
            return piece;
        },

        getPosition: function() {
            return pos;
        },

        getMovements: function() {
            return movements;
        },

        applyMovements: function() {
            return field.clone().put(piece, pos, true);
        }
    };
};



//var possibleActions = 'left right down turnleft turnright'.split(' ');




var electPlay = function(pl) {
    var bag, possibleActions;

    var dir = ( (Math.random() < 0.5) ? 'left' : 'right');
    var turn = ( (Math.random() < 0.5) ? 'turnleft' : 'turnright');

    while (true) {
        possibleActions = ['down', dir];
        if (Math.random() < 0.1) {
            possibleActions.push( turn );
        }

        /*console.log('field:', pl.getField());
        console.log('piece:', pl.getPiece());
        console.log('position:', pl.getPosition());*/

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
