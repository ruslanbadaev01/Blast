
var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        var backgroundLayer = new cc.LayerColor.create(new cc.color(161, 161, 161));
        this.addChild(backgroundLayer);

        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        this.field = new Field();
        this.field.setPosition(cc.p( (132), (219)) );
        this.addChild( this.field );

        this.scoreCount = 0;
        this.movesCount = 37;
        this.score = new cc.Sprite(res.ScoreBg);
        this.score.attr({
            x: 2197 - 29 + this.score.width / 2,
            y: 922 - 45 + this.score.height / 2
        });

        var timeLabel = new cc.LabelTTF("Время:", "Marvin", 65);
        timeLabel.x = this.score.width / 2;
        timeLabel.y = 1123;
        this.score.addChild(timeLabel, 5);

        var scoreLabel = new cc.LabelTTF("Очки:", "Marvin", 65);
        scoreLabel.x = this.score.width / 2;
        scoreLabel.y = 361;
        this.score.addChild(scoreLabel, 5);

        this.scoreCountLabel = new cc.LabelTTF("0", "Marvin", 132);
        this.scoreCountLabel.x = this.score.width / 2;
        this.scoreCountLabel.y = 235;
        this.score.addChild(this.scoreCountLabel, 5);

        this.movesCountLabel = new cc.LabelTTF("37", "Marvin", 230);
        this.movesCountLabel.x = this.score.width / 2;
        this.movesCountLabel.y = 712;
        this.score.addChild(this.movesCountLabel, 5);

        this.addChild(this.score, 0);

        this.pauseBtn = new cc.Sprite(res.button.pause);
        this.pauseBtn.attr({
            x: 3197 - 30,
            y: 2220 - 48
        });
        this.pauseBtn.setAnchorPoint( cc.p( 0, 0 ) );

        this.addChild(this.pauseBtn, 0);

        this.top = new cc.Sprite(res.TopBg);
        this.top.attr({
            x: 310 - 5,
            y: 2165 - 14
        });

        this.progress = new cc.Sprite(res.progress.back);
        this.top.setAnchorPoint( cc.p( 0, 0 ) );
        this.progress.attr({
            x: 625,
            y: 65
        });

        this.progress.setAnchorPoint( cc.p( 0, 0 ) );

        var progressLabel = new cc.LabelTTF("Прогресс", "Marvin", 64);
        progressLabel.x = 507 + progressLabel.width / 2;
        progressLabel.y = 170 + progressLabel.height / 2;
        this.progress.addChild(progressLabel, 5);

        var progressBar = new cc.Sprite(res.progress.front);
        progressBar.attr({
            x: 625 + 52,
            y: 65 + 44
        });
        //progressBar.setContentSize(10, progressBar.height);
        this.progress.addChild(progressBar, 5);

        this.top.addChild(this.progress, 3);
        this.addChild(this.top, 2);

        this.registerScoreCallback();
        return true;
    },

    updateScoreLabel: function() {
        this.scoreCountLabel.setString( this.scoreCount );
        this.movesCountLabel.setString( this.movesCount );
        if (this.scoreCount >= 100)
            cc.director.runScene(new GameVictoryScene(this.scoreCount, this.movesCount));
        if (this.movesCount === 0)
            cc.director.runScene(new GameOverScene(this.scoreCount));
    },

    registerScoreCallback: function() {
        var gameLayer = this;
        this.field.setCollapseCallback(function( c ) {
            gameLayer.scoreCount += c;
            gameLayer.movesCount--;
            gameLayer.updateScoreLabel();
        });
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

