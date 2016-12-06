import defines from './Defines'
cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad: function () {
        if (defines.getGameInfo('Game3') === null){
            for (let i in defines.TowerNameConfig){
                defines.saveGameInfo(defines.TowerNameConfig[i],1);
                defines.saveGameInfo(defines.TowerNameConfig[i] + 'Express',0);
            }
            defines.saveGameInfo('GoldCount',100);
            defines.saveGameInfo('Game3',1);
        }else {
            cc.log('不是第一次进入游戏的');
        }
    },

});
