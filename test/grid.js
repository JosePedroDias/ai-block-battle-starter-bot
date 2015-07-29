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

});
