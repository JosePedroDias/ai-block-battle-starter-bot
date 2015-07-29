var assert = require('assert');

var blocks = require('../blocks');



suite('blocks', function() {

    suite('getBlock', function () {
        test('I', function() {
            var p = blocks.getBlock('I');
            var s = p.toString().split('\n');
            assert.equal(s[0], '....');
            assert.equal(s[1], 'OOOO');
            assert.equal(s[2], '....');
            assert.equal(s[3], '....');
        });

        test('J', function() {
            var p = blocks.getBlock('J');
            var s = p.toString().split('\n');
            assert.equal(s[0], '..O');
            assert.equal(s[1], 'OOO');
            assert.equal(s[2], '...');
        });

        test('L', function() {
            var p = blocks.getBlock('L');
            var s = p.toString().split('\n');
            assert.equal(s[0], 'O..');
            assert.equal(s[1], 'OOO');
            assert.equal(s[2], '...');
        });

        test('O', function() {
            var p = blocks.getBlock('O');
            var s = p.toString().split('\n');
            assert.equal(s[0], 'OO');
            assert.equal(s[1], 'OO');
        });

        test('S', function() {
            var p = blocks.getBlock('S');
            var s = p.toString().split('\n');
            assert.equal(s[0], '.OO');
            assert.equal(s[1], 'OO.');
            assert.equal(s[2], '...');
        });

        test('T', function() {
            var p = blocks.getBlock('T');
            var s = p.toString().split('\n');
            assert.equal(s[0], '.O.');
            assert.equal(s[1], 'OOO');
            assert.equal(s[2], '...');
        });

        test('Z', function() {
            var p = blocks.getBlock('Z');
            var s = p.toString().split('\n');
            assert.equal(s[0], 'OO.');
            assert.equal(s[1], '.OO');
            assert.equal(s[2], '...');
        });
    });

});
