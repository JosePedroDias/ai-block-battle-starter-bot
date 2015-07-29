// https://github.com/JosePedroDias/tetris/blob/master/lib/tetris.js

var seq = require('./aux').seq;

/*
all setters should return new grids
*/



var Grid = function(w, h, arr) {
    this.w = w;
    this.h = h;
    if (arr) {
        this.a = arr.slice();
    }
    else {
        this.a = new Array(this.w * this.h);
    }
};

Grid.prototype = {

    _get: function(x, y) {
        if (!this._inBounds(x, y)) { return false; }
        return !!this.a[this.w * y + x];
    },

    _set: function (x, y, v) {
        if (!this._inBounds(x, y)) { return; } // TODO REQ?
        if (v === undefined) { v = true; }
        
        this.a[this.w * y + x] = v;
    },

    _inBounds: function(x, y) {
        return x >= 0 &&
            y >= 0 &&
            x < this.w &&
            y < this.h;
    },

    collides: function (n, pos) {
        var that = this;
        var res = false;

        seq(that.h).forEach(function(y) {
            var yy = y + pos[1];
            seq(that.w).forEach(function(x) {
                var xx = x + pos[0];
                if (
                    n._get(x, y) &&
                    (
                        !that._inBounds(xx, yy) ||
                        that._get(xx, yy)
                    )
                ) {
                    res = true;

                }
            });
        });

        return res;
    },

    put: function (n, pos, vv) {
        if (vv === undefined) { vv = true; }
    
        var that = this;

        seq(n.h).forEach(function(y) {
            var yy = y + pos[1];
            seq(n.w).forEach(function(x) {
                var v = n._get(x, y);
                if (v) {
                    var xx = x + pos[0];
                    that._set(xx, yy, vv);
                }
            });
        });

        return this;
    },

    isLineFilled: function (y) {
        var that = this;

        return seq(this.w).every(function(x) {
            return that._get(x, y);
        });
    },

    _eraseLine: function (y) {
        var that = this;

        seq(this.w).forEach(function(x) {
            that._set(x, y, false);
        });
    },

    _copyLineAbove: function (y) {
        var that = this;

        seq(this.w).forEach(function(x) {
            that._set(x, y, that._get(x, y - 1));
        });
    },

    gravity: function (y0) {
        var that = this;

        seq(this.h - 1 - y0).forEach(function(y) {
            that._copyLineAbove( that.h - y + y0 );
        });

        this._eraseLine(y0);

        return this;
    },
    
    clone: function() {
        return new Grid(this.w, this.h, this.a);
    },

    rotatedCWClone: function () {
        var that = this;
        var n = new Grid(this.h, this.w);

        seq(that.h).forEach(function(y) {
            seq(that.w).forEach(function(x) {
                var v = that._get(x, y);
                if (v) {
                    n._set(that.h - y - 1, x);
                }
            });
        });

        return n;
    },

    rotatedCCWClone: function () {
        var that = this;
        var n = new Grid(this.h, this.w);

        seq(that.h).forEach(function(y) {
            seq(that.w).forEach(function(x) {
                var v = that._get(x, y);
                if (v) {
                    n._set(y, that.w - x - 1);
                }
            });
        });

        return n;
    },

    toString: function () {
        var that = this;
        var r = [];

        seq(that.h).forEach(function(y) {
            seq(that.w).forEach(function(x) {
                var v = that._get(x, y);
                r.push( v ? 'O' : '.' );
            });
            r.push('\n');
        });
        r.pop();

        return r.join('');
    },

    toStringArray: function () {
        var that = this;

        return seq(that.h).map(function(y) {
            return seq(that.w).map(function(x) {
                var v = that._get(x, y);
                return (v ? 1 : 0);
            }).join(',');
        }).join(';');
    },

    fromStringArray: function(arr) {
        var that = this;

        seq(that.h).forEach(function(y) {
            seq(that.w).forEach(function(x) {
                var v = arr[y][x];
                that._set(x, y, !!v);
            });
        });
    }
};



module.exports = Grid;
