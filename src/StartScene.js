var StartScene = cc.Scene.extend({
    titleSprite: {},
    subTitleSprite: {},
    onEnter: function() {
        this._super();

        var winSize = cc.view.getDesignResolutionSize();

        this.titleSprite = cc.LabelTTF.create("Blast", "Marvin", 150);
        this.titleSprite.x = winSize.width / 2;
        this.titleSprite.y = winSize.height / 2;
        this.addChild(this.titleSprite);

        this.subTitleSprite = cc.LabelTTF.create("Нажмите чтобы играть", "Marvin", 70);
        this.subTitleSprite.x = winSize.width / 2;
        this.subTitleSprite.y = winSize.height / 2 - 180;
        this.addChild(this.subTitleSprite);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touches, event) {
                cc.director.runScene(new GameScene());
            },
        }, this);

    },
});