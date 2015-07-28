var seq = function(n){
    var arr = new Array(n);
    for (var i = 0; i < n; ++i) {
        arr[i] = i;
    }
    return arr;
};

module.exports = {
    seq: seq
};
