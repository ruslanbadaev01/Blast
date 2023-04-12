var Tile = cc.Node.extend({
    ctor: function (x, y, color = "") {
        this._super();
        this.tileColor = color !== "" ? color : this.randomColor();
        var s = cc.Sprite.create( res.tile[this.tileColor] );
        s.setAnchorPoint( cc.p( 0, 0 ) );
        s.setPosition( cc.p( x, y ) );
        this.addChild( s );
    },

    randomColor: function() {
        var index = Math.floor(Math.random() * (4 + 1));
        return colors[index];
    }
});

colors = ['blue', 'purple', 'red', 'yellow', 'green'];