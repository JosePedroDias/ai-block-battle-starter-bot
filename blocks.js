var Grid = require('./grid');



var blocks = {
    I: new Grid(4, 4, [[0, 1], [1, 1], [2, 1], [3, 1]]),
    J: new Grid(3, 3, [[2, 0], [0, 1], [1, 1], [2, 1]]),
    L: new Grid(3, 3, [[0, 0], [0, 1], [1, 1], [2, 1]]),
    O: new Grid(2, 2, [[0, 0], [0, 1], [1, 0], [1, 1]]),
    S: new Grid(3, 3, [[1, 0], [2, 0], [0, 1], [1, 1]]),
    T: new Grid(3, 3, [[1, 0], [0, 1], [1, 1], [2, 1]]),
    Z: new Grid(3, 3, [[0, 0], [1, 0], [1, 1], [2, 1]])
};

var getBlock = function(blockType) {
    return blocks[blockType].clone();
};

var blockTypes = Object.keys(blocks);

var l = blockTypes.length;

var getRandomBlockType = function() {
    return blockTypes[ Math.floor( Math.random() * l ) ];
};

module.exports = {
    getBlock           : getBlock,
    blockTypes         : blockTypes,
    getRandomBlockType : getRandomBlockType
};
