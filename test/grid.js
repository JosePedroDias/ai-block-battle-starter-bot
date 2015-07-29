var assert = require('assert');

var blocks = require('../blocks');
var Grid   = require('../grid');



suite('grid', function() {

    test('_get', function() {
        var a = new Grid(3, 2);
        a._set(0, 0, true);
        a._set(2, 1, true);

        assert.equal(a._get(0, 0), true);
        assert.equal(a._get(2, 1), true);

        assert.equal(a._get(2, 0), false); // default

        assert.equal(a._get(-1, 0), false); // out of bounds
        assert.equal(a._get(3, 0), false); // out of bounds
    });

    test('_set', function() {
        var a = new Grid(3, 2);
        assert.equal(a._get(2, 1), false); // before
        a._set(2, 1, true);
        assert.equal(a._get(2, 1), true); // after -> set

        a._set(-1, 1, true);
        assert.equal(a._get(-1, 1), false); // out of bounds, ignored

        a._set(3, 1, true);
        assert.equal(a._get(3, 1), false); // out of bounds, ignored
    });

    test('collides', function() {
        var f = new Grid(10, 20);
        f._set(10, 19);
        var pT = blocks.getBlock('T');

        assert.equal(f.collides(pT, [3, -1]), false); // collisions don't occurr against top

        assert.equal(f.collides(pT, [-1, 0]), true); // collision against left
        assert.equal(f.collides(pT, [0, 0]), false); // no collision against left

        assert.equal(f.collides(pT, [8, 0]), true); // collision against right
        assert.equal(f.collides(pT, [7, 0]), false); // no collision against right

        assert.equal(f.collides(pT, [0, 19]), true); // collision against bottom
        assert.equal(f.collides(pT, [0, 18]), false); // no collision against bottom

        assert.equal(f.collides(pT, [10, 19]), true); // collision against field cell
        assert.equal(f.collides(pT, [11, 19]), true); // no collision against field cell
    });

});
