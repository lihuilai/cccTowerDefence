cc.Class({
    extends: cc.Component,

    properties: {

        Game: {
            default: null,
            type: cc.Node
        },
        Mask: {
            default: null,
            type: cc.Node
        },
        TowerMenuBg: {
            default: null,
            type: cc.Node
        },
        Label: {
            default: null,
            type: cc.Label
        },
        LeftList: {
            default: null,
            type: cc.Node
        },
        Canvas: {
            default: null,
            type: cc.Canvas
        },
        StartButton: {
            default: null,
            type: cc.Node
        },
        UILayer: {
            default: null,
            type: cc.Node
        },
        Icon_TowerSpriteFrame: {
            default: [],
            type: cc.SpriteFrame
        },
        SelectedTowerIcon: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.MenuItem = {};
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    enter: function () {
        cc.log('selected enter !!!');
        ///
        ///
        var self = this;
        // var labelAction = cc.moveTo(1,this.Label.node.getPositionX(),this.Canvas.node.height * 0.5 - 80);
        // this.Label.node.runAction(labelAction);
        const MoveAction = function (node,pos,cb) {
            var action = cc.moveTo(0.6,pos);
            var seq = cc.sequence(action,cc.callFunc(function () {
                if (cb){
                    cb();
                }
            }));
            node.runAction(seq);
        }

        MoveAction(this.Label.node,cc.p(this.Label.node.getPositionX(),this.Canvas.node.height * 0.5 - 80),function () {
           MoveAction(self.LeftList,cc.p(self.Canvas.node.width * - 0.5 + 200,self.LeftList.getPositionY()),function () {
               MoveAction(self.TowerMenuBg,cc.p(100,0),function () {
                   //self.StartButton.active = true;
               });
           });
        });
    },
    chooseTower : function (event,index) {
        cc.log('choose tower' + index);
        event.target.getComponent('ChooseTowerIcon').selected();
        this.pushItemInMenu(event.target,index);
    },
    unChooseTower: function (object) {
        this.MenuItem[object.index] = undefined;
        this.TowerMenuBg.removeChild(object);
        this.fixIconPos();
    },
    pushItemInMenu: function (object,index) {
        if (this.MenuItem[index] === undefined){
            cc.log('push item in menu bg');
            var node = cc.instantiate(this.SelectedTowerIcon);
            node.setPosition(cc.p(0,0));
            node.getComponent('SelectedTowerIcon').initSelectedIcon(this,object);
            node.index = index;
            this.TowerMenuBg.addChild(node);
            this.MenuItem[index] = node;


        }

        this.fixIconPos();

    },
    startGame: function () {
        // var MoveAction =
        var self = this;
        var action = cc.moveBy(0.3,0,this.Canvas.node.height);
        var seq = cc.sequence(action,cc.callFunc(function () {
            var a = cc.fadeTo(0.6,0);
            var s = cc.sequence(a,cc.callFunc(function () {
                cc.log('start game');
                self.node.parent.removeChild(self.node);
                self.Game.getComponent('Game').startGame(self.TowerMenuBg.children);
            }));
            self.Mask.runAction(s);
        }))
        this.UILayer.runAction(seq);
    },
    fixIconPos : function () {
        cc.log('TowerMenuBg.length=' + this.TowerMenuBg.children.length)
        if (this.TowerMenuBg.children.length === 0){
            this.StartButton.active = false;
        }else {
            this.StartButton.active = true;
        }
        for (var i = 0 ; i < this.TowerMenuBg.children.length ; i ++){
            var node = this.TowerMenuBg.children[i];
            var pos = cc.pRotateByAngle(cc.p(0,80),cc.p(0,20),i * Math.PI * 2/ this.TowerMenuBg.children.length );
            // node.setPosition(pos);
            node.stopAllActions();
            var action = cc.moveTo(0.2,pos);
            node.runAction(action);
        }
    }
});
