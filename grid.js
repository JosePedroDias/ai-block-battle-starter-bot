// https://github.com/JosePedroDias/tetris/blob/master/lib/tetris.js

var seq = require('./aux').seq;



var Grid = function(w, h, arr) {
    this.w = w;
    this.h = h;
    this._a = new Array(this.w * this.h);

    if (arr !== undefined) {
        this.setArray(arr);
    }
};

Grid.prototype = {

    get: function(x, y) {
        return this._a[this.w * y + x];
    },

    set: function (x, y, v) {
        if (v === undefined) { v = true; }
        
        this._a[this.w * y + x] = v;
    },

    unset: function (x, y) {
        return this.set(x, y, false);
    },

    setArray: function (arr) {
        var that = this;
        
        arr.forEach(function(p) {
            that.set(p[0], p[1]);
        });
    },

    rotatedClone: function () {
        var that = this;
        var n = new Grid(this.h, this.w);

        seq(that.h).forEach(function(y) {
            seq(that.w).forEach(function(x) {
                n.set(that.h - y - 1, x, that.get(x, y));
            });
        });
    },

    r: function () {
        return this.rotatedClone();
    },

    collides: function (n, pos) {
        if (pos[0] < 0 || pos[1] < 0 || pos[0] + n.w > this.w || pos[1] + n.h > this.h) {
            return true;
        }

        var that = this;

        seq(that.h).forEach(function(y) {
            seq(that.w).forEach(function(x) {
                if (n.get(x, y) && that.get(x + pos[0], y + pos[1])) { return true; }
            });
        });

        return false;
    },

    put: function (n, pos, vv) {
        if (vv === undefined) { vv = true; }
    
        var that = this;

        seq(n.h).forEach(function(y) {
            var yy = y + pos[1];
            if (yy < 0 || yy >= that.h) { return; }
            
            seq(n.w).forEach(function(x) {
                var v = n.get(x, y);
                if (v) {
                    var xx = x + pos[0];
                    if (xx < 0 || xx >= that.w) { return; }
                    
                    that.set(xx, yy, vv);
                }
            });
        });
    },

    isLineFilled: function (y) {
        var that = this;

        return seq(this.w).every(function(x) {
            return that.get(x, y);
        });
    },

    eraseLine: function (y) {
        var that = this;

        seq(this.w).forEach(function(x) {
            return that.unset(x, y);
        });
    },

    copyLineAbove: function (y) {
        var that = this;

        seq(this.w).forEach(function(x) {
            that.set(x, y, that.get(x, y - 1));
        });
    },

    gravity: function (y0) {
        var that = this;

        seq(this.h - 1 - y0).forEach(function(y) {
            that.copyLineAbove( that.h - y + y0 );
        });

        this.eraseLine(0);
    },
    
    clone: function() {
        var c = new Grid(this.w, this.h);
        c._a = this._a.slice();
        return c;
    },

    toString: function () {
        var that = this;
        var r = [];

        seq(that.h).forEach(function(y) {
            seq(that.w).forEach(function(x) {
                var v = that.get(x, y);
                r.push( v ? 'O' : '.' );
            });
            r.push('\n');
        });

        return r.join('');
    },

    toStringArray: function () {
        var that = this;

        return seq(that.h).map(function(y) {
            return seq(that.w).map(function(x) {
                var v = that.get(x, y);
                return (v ? 1 : 0);
            }).join(',');
        }).join(';');
    },

    fromStringArray: function(arr) {
        var that = this;

        seq(that.h).forEach(function(y) {
            seq(that.w).forEach(function(x) {
                var v = arr[y][x];
                that.set(x, y, !!v);
            });
        });
    }
};



module.exports = Grid;
