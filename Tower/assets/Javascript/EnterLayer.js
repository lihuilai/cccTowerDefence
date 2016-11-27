cc.Class({
    extends: cc.Component,

    properties: {
        Label1: {
            default: null,
            type: cc.Label
        },
        Label2: {
            default: null,
            type: cc.Label
        },
        Mask: {
            default: null,
            type: cc.Node
        },
        SelectedLayer: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {

        this.Label1.node.setOpacity(0);
        this.Label2.node.setOpacity(0);

        var self = this;
        var enterAction = function (object,cb) {
            var that = {};
            object.setScale(5,5);
            var action1 = cc.scaleTo(0.4,1,1);
            var action2 = cc.fadeTo(0.4,255);
            var action3 = cc.delayTime(1);
            object.runAction(action1);
            object.runAction(cc.sequence(action2,action3,cc.callFunc(function () {
                object.setOpacity(0);
                if (cb){
                    cb();
                }
            },object)));
            return that;
        }

        enterAction(this.Label1.node,function () {
            enterAction(self.Label2.node,function () {
                self.node.parent.removeChild(self.node);
                self.SelectedLayer.getComponent('SelectedLayer').enter();
            });
        });
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
