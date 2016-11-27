var GameState = {
    Invalide: -1,
    Waiting: 1,
    Running: 2,
    GameOver: 3
}
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        GoldLabel: {
            default: null,
            type: cc.Label
        },
        GoldCount: 100,
        State: GameState.Invalide,
        Enemy: {
            default: null,
            type: cc.Prefab
        },
        PathObject: {
            default: null,
            type: cc.Node
        },
        GameLayer: {
            default: null,
            type: cc.Node
        },
        UILayer: {
            default: null,
            type: cc.Node
        },
        IconTowers: {
            default: [],
            type: cc.SpriteFrame
        },
        Towers: {
            default: [],
            type: cc.Prefab
        },
        ShowMessageLabel: {
            default: null,
            type: cc.Prefab
        }

    },
    removeAllMenu: function () {
        console.log('remove all menu' + this.node.children.length);
        for (var i = 0 ; i < this.GameLayer.children.length ; i ++){
            if (this.GameLayer.children[i].getComponent('TowerBase')){
                cc.log('Tower Base closeMenu');
                this.GameLayer.children[i].getComponent('TowerBase').closeMenu();
            }
            ///else 子节点没有TowerBasic属性


        }
    },
    // use this for initialization
    setInputControl: function () {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_END,function () {
           ///console.log('touch end');
        });
    }
    ,
    onLoad: function () {

        this.setState(GameState.Waiting);


        this.setInputControl();
        ///将this传给子节点
        this.NowTime = 0;
        this.Enemys = [];
    },

    addEnemy: function () {
        if(this.enemyIndex > 6){
            return
        }
        this.enemyIndex ++;
        var enemy = cc.instantiate(this.Enemy);
        enemy.getComponent('Enemy').Game = this;
        enemy.getComponent('Enemy').initEnemy(this.PathObject);
        // this.EnemyLayer.addChild(enemy);
        this.GameLayer.addChild(enemy);
        this.Enemys.push(enemy);
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.State === GameState.Running) {
            this.GoldLabel.string = this.GoldCount.toString();
            if (this.NowTime > 3) {
                // console.log('加一个敌人');
                this.NowTime = 0;
                this.addEnemy();
            } else {
                this.NowTime += dt;
            }
        }
    },
    enemyMoveOver : function (object) {
        // this.EnemyLayer.removeChild(object.node);
        this.GameLayer.removeChild(object.node);
        for (var i = 0 ; i < this.Enemys.length; i ++){
            if (this.Enemys[i] === object.node){
                this.Enemys.splice(i,1);
                // console.log('删掉一个 敌人');
            }

        }
    },
    ScaleToGameMapSize: function (slider,coustomEventData) {
        // console.log('ScaleToGameMapSize');
        var value = slider.progress;
        this.node.setScale(1 + value * 3,1 + value * 3);
        // console.log('ScaleToGameMapSize' + value);
    },
    setState: function (state) {
        if (this.State === state){
            return;
        }

        switch (state){
            case GameState.Waiting:
                break;
            case GameState.Running:


                break;
            case GameState.GameOver:
                break;
            default:
                break;
        }
        this.State = state;
     },
    startGame: function (selectedTowers) {
        this.SelectedTowerList = selectedTowers;
        // cc.log('selected towers length' + selectedTowers.length);
        this.setState(GameState.Running);
    },
    showMessage: function (str) {
        // cc.log('show message' + str);
        var showMessage = cc.instantiate(this.ShowMessageLabel);
        showMessage.setPosition(cc.p(0,0));
        showMessage.getComponent('ShowMessage').ShowMessage(str);
        this.node.addChild(showMessage);
    },
    removeEnemy: function (enemy) {
        for (var i = 0 ; i < this.Enemys.length; i ++){
            if (this.Enemys[i] === enemy){
                this.Enemys.splice(i,1);
            }
        }
        this.GameLayer.removeChild(enemy);
    }
});
