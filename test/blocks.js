var assert = require('assert');

var blocks = require('../blocks');



suite('blocks', function() {

    suite('regular shapes', function () {
        test('I', function() {
            var p = blocks.blocks['I'];
            var s = p.toString().split('\n');
            console.log(s);
            assert.equal(s[0], '....');
            assert.equal(s[1], 'OOOO');
            assert.equal(s[2], '....');
            assert.equal(s[3], '....');
        });

        test('J', function() {
            var p = blocks.blocks['J'];
            var s = p.toString().split('\n');
            console.log(s);
            assert.equal(s[0], '..O');
            assert.equal(s[1], 'OOO');
            assert.equal(s[2], '...');
        });
    });

});
