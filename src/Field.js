var Field = cc.Node.extend({
    WIDTH: 9,
    HEIGHT: 10,
    MAP: [[], [], [], [], [], [], [], [], [], []],
    COLORS_MAP: [[], [], [], [], [], [], [], [], [], []],
    collapseCounter: 0,
    mixCount: 1,

    ctor: function () {
        this._super();
        var sbg = cc.Sprite.create(res.FieldBg);
        sbg.setAnchorPoint( cc.p( 0, 0 ) );
        this.addChild( sbg );
        for (var row = 0; row < this.HEIGHT; row++) {
            for (var col = 0; col < this.WIDTH; col++) {
                var s = new Tile(col * 171 / 2, (row) * 170 / 2);
                this.MAP[row][col] = s;
                this.COLORS_MAP[row][col] = s.tileColor;
                //s = cc.Sprite.create(res.tile.blue);
                s.setAnchorPoint( cc.p( 0, 0 ) );
                s.setPosition( cc.p( col * 171 / 2 + 50, (row) * 170 / 2 + 50) );
                s.setTag(row + ' ' + col);
                this.addChild( s, row );
            }
        }
        this.setAnchorPoint( cc.p( 0, 0 ) );
        cc.log(this.MAP);
        //this.addChild(this.MAP);
        cc.log(this.COLORS_MAP);
        this.addHandlers();
        this.collapseCallback = null;
    },

    renderTiles: function() {
        for (var row = 0; row < this.HEIGHT; row++) {
            for (var col = 0; col < this.WIDTH; col++) {
                this.removeChild(this.MAP[row][col], true);
                if(this.COLORS_MAP[row][col] === "") {
                    this.collapseCounter++;
                }
                var s = new Tile(col * 171 / 2, (row) * 170 / 2, this.COLORS_MAP[row][col]);
                this.MAP[row][col] = s;
                this.COLORS_MAP[row][col] = s.tileColor;
                //s = cc.Sprite.create(res.tile.blue);
                s.setAnchorPoint( cc.p( 0, 0 ) );
                s.setPosition( cc.p( col * 171 / 2 + 50, (row) * 170 / 2 + 50) );
                s.setTag(row + ' ' + col);
                this.addChild( s, row );
            }
        }
    },

    removeTile: function( row, col ) {
        var r = row;
        var c = col;
        var act = new cc.FadeOut(1);
        this.MAP[row][col].runAction(act);
        //setTimeout(function () {
            this.removeChild(this.MAP[row][col], true);
            this.MAP[row][col] = null;
            this.COLORS_MAP[row][col] = "";
        //}, 1000);
    },

    collapseTiles: function( row, col, color ) {
        this.removeTile(row, col);
        if (row > 0) {
            if ( this.COLORS_MAP[row - 1][col] === color ) {
                this.collapseTiles(row - 1, col, color);
            }
        }
        if ( row < this.HEIGHT - 1 ) {
            if ( this.COLORS_MAP[row + 1][col] === color ) {
                this.collapseTiles(row + 1, col, color);
            }
        }
        if ( col > 0 ) {
            if ( this.COLORS_MAP[row][col - 1] === color ) {
                this.collapseTiles(row, col - 1, color);
            }
        }
        if ( col < this.WIDTH - 1 ) {
            if ( this.COLORS_MAP[row][col + 1] === color ) {
                this.collapseTiles(row, col + 1, color);
            }
        }
    },

    isCollapasable: function( row, col ) {
        if (row > 0) {
            if ( this.COLORS_MAP[row - 1][col] === this.COLORS_MAP[row][col] ) {
                return true;
            }
        }
        if ( row < this.HEIGHT - 1 ) {
            if ( this.COLORS_MAP[row + 1][col] === this.COLORS_MAP[row][col] ) {
                return true;
            }
        }
        if ( col > 0 ) {
            if ( this.COLORS_MAP[row][col - 1] === this.COLORS_MAP[row][col] ) {
                return true;
            }
        }
        if ( col < this.WIDTH - 1 ) {
            if ( this.COLORS_MAP[row][col + 1] === this.COLORS_MAP[row][col] ) {
                return true;
            }
        }
        return false;
    },

    checkAvailableMoves: function() {
        for (var col = 0; col < this.WIDTH; col++) {
            for (var row = 0; row < this.HEIGHT - 1; row++) {
                if (this.isCollapasable(row, col))
                    return true;
            }
        }
        return false;
    },

    moveDown: function () {
        for (var col = 0; col < this.WIDTH; col++) {
            //var child;
            for (var row = 0; row < this.HEIGHT - 1; row++) {
                if (this.COLORS_MAP[row][col] === "") {
                    for (var rown = row + 1; rown < this.HEIGHT; rown++) {
                        if (this.COLORS_MAP[rown][col] !== "") {
                            var tmp = this.COLORS_MAP[rown][col]
                            this.COLORS_MAP[rown][col] = this.COLORS_MAP[row][col];
                            this.COLORS_MAP[row][col] = tmp;
                            var tmp1 = this.MAP[rown][col]
                            this.MAP[rown][col] = this.MAP[row][col];
                            this.MAP[row][col] = tmp;
                            this.MAP[row][col].shifted = rown;
                            break;
                        }
                    }
                }
            }
        }
        cc.log(this.COLORS_MAP);
    },

    CreateSuperTile: function(row, col) {
        this.removeChild(this.MAP[row][col], true);
        var s = new SuperTile(col * 171 / 2, (row) * 170 / 2);
        this.MAP[row][col] = s;
        this.COLORS_MAP[row][col] = s.tileColor;
        //s = cc.Sprite.create(res.tile.blue);
        s.setAnchorPoint( cc.p( 0, 0 ) );
        s.setPosition( cc.p( col * 171 / 2 + 50, (row) * 170 / 2 + 50) );
        s.setTag(row + ' ' + col);
        this.addChild( s, row );
    },

    superTileCollapse: function (row, col) {
        for (var c = 0; c < this.WIDTH; c++) {
            this.removeTile(row, c);
        }
    },

    setCollapseCallback: function(callback) {
        this.collapseCallback = callback;
    },

    addHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown : function( touch, event ) {
                self.onMouseDown( touch, event );
            },
            onMouseMove: function( touch, event ) {
                self.onMouseMove( touch, event );
            },
            onMouseScroll: function( touch, event ) {
                self.onMouseScroll( touch, event );
            },
            onMouseUp: function( touch, event ) {
                self.onMouseUp( touch, event );
            }
        }, this);
    },

    onMouseDown:function (touch, event) {
        cc.log(event);
        cc.log(touch);

        return true;
    },

    onMouseMove:function (touch, event) {
    },

    onMouseScroll:function (touch, event) {
    },

    onMouseUp:function (touch, event) {
        cc.log(event);
        cc.log(touch);
        var getPoint = touch.getLocation();
        cc.log(getPoint);
        var lx = getPoint.x -  this.getPositionX();
        var ly = getPoint.y -  this.getPositionY();
        cc.log(lx);
        cc.log(ly);
        var col = Math.trunc((lx - 50) / 171);
        var row = Math.trunc((ly - 50) / 170);
        cc.log(row);
        cc.log(col);
        var c = this.COLORS_MAP[row][col];
        if (row >= 0 && row < this.HEIGHT && col >= 0 && col < this.WIDTH && c) {
            cc.log('+');
            cc.log(c);
            if (c === "superb") {
                this.superTileCollapse(row, col);
                this.moveDown();
                this.renderTiles();
                if ( this.collapseCallback ) {
                    this.collapseCallback( this.collapseCounter );
                }
                this.collapseCounter = 0;
            }
            else if (this.isCollapasable(row, col)) {
                cc.log(this.COLORS_MAP);
                if (c === "superb") {
                    this.superTileCollapse(row, col);
                } else {
                    this.collapseTiles(row, col, c);
                }
                this.moveDown();
                this.renderTiles();
                if (this.collapseCounter >= 5 && c !== "superb") {
                    this.CreateSuperTile(row, col);
                }
                if ( this.collapseCallback ) {
                    this.collapseCallback( this.collapseCounter );
                }
                this.collapseCounter = 0;
                if (this.checkAvailableMoves()) {
                }
                else if (this.mixCount > 0) {
                    this.COLORS_MAP = [[], [], [], [], [], [], [], [], [], []];
                    this.renderTiles();
                    this.mixCount--;
                } else {
                    cc.director.runScene(new GameOverScene(this.scoreCount));
                }
            }
            return true;
        } else {
            cc.log('-');
            return false;
        }
        return true;
    },

    onEnter:function () {
        //cc.registerTargetedDelegate(1, true, this);
        this._super();
    },

    onExit:function () {
        //cc.unregisterTouchDelegate(this);
        this._super();
    }
});