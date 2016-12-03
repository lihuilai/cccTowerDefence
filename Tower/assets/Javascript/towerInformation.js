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
        TowerAnimationList: {
            default: [],
            type: cc.Prefab
        },
        AnimateLayer: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    showTowerInformationAnimation: function (index) {
        var animate = cc.instantiate(this.TowerAnimationList[index]);
        this.AnimateLayer.addChild(animate);
    },
    closeButton: function (event,customData) {
        cc.log('close button');
        this.node.destroy();
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
