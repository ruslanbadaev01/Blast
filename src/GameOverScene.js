var GameOverScene = cc.Scene.extend({
    finalScore: 0,
    labelGameOver: {},
    labelScore: {},
    labelPrompt: {},
    ctor: function(score) {
        this._super();
        this.finalScore = score;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                cc.director.runScene(new StartScene());
            }
        }, this);

    },
    onEnter: function() {
        this._super();

        var winSize = cc.view.getDesignResolutionSize();

        this.labelGameOver = new cc.LabelTTF("Поражение :(", "Marvin", 160);
        this.labelGameOver.x = winSize.width * 0.50;
        this.labelGameOver.y = winSize.height * 0.50;
        this.addChild(this.labelGameOver);

        this.labelScore = new cc.LabelTTF("Счёт: " + this.finalScore, "Marvin", 130);
        this.labelScore.x = winSize.width * 0.50;
        this.labelScore.y = winSize.height * 0.43;
        this.addChild(this.labelScore);

        this.labelPrompt = new cc.LabelTTF("Нажмите в любом месте для продолжения",  "Marvin", 70);
        this.labelPrompt.x = winSize.width * 0.50;
        this.labelPrompt.y = winSize.height * 0.30;
        this.addChild(this.labelPrompt);
    },
});