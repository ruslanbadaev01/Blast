var SuperTile = cc.Node.extend({
    ctor: function (x, y, color = "") {
        this._super();
        this.tileColor = "superb";
        var s = cc.Sprite.create( res.tile.superb );
        s.setAnchorPoint( cc.p( 0, 0 ) );
        s.setPosition( cc.p( x, y ) );
        this.addChild( s );
    }
});