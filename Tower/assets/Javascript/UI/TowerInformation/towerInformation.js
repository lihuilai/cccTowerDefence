import defines from './../../Defines'
import ResourcesManager from './../../ResourcesManager'
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
        },
        LevelLabel: {
            default: null,
            type: cc.Label
        },
        ExpressLabel: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    showTowerInformationAnimation: function (index) {
        var animate = cc.instantiate(this.TowerAnimationList[index]);
        this.AnimateLayer.addChild(animate);
        ///得到当前塔的等级
        let level = defines.getTowerLevel(index);
        cc.log('tower level+' + level);
        this.LevelLabel.string = 'Level:' + level;
        let self = this;
        let loadUrl = defines.ConfigUrl[defines.TowerNameConfig[index]];
        cc.log('loadUrl=' + loadUrl);
        ResourcesManager.load(loadUrl,(res)=>{
            ///取出相对应的级数的数据
            cc.log('Tower Config' + JSON.stringify(res));
            //得到当前Tower升级所需要的经验值
            let levelExpress = defines.getTowerLevelExpress(index,level,res);
            let express = defines.getTowerExpress(index);
            cc.log('levelExpress' + levelExpress);
            cc.log('now Express' + express);
            self.ExpressLabel.string = express + '/' + levelExpress;

        });

    },
    closeButton: function (event,customData) {
        cc.log('close button');
        this.node.destroy();
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
