import defines from './Defines'
cc.Class({
    extends: cc.Component,

    properties: {
    },
    onLoad: function () {
        if (defines.getGameInfo('Game2') === null){
            for (let i in defines.TowerNameConfig){
                defines.saveGameInfo(defines.TowerNameConfig[i],1);
                defines.saveGameInfo(defines.TowerNameConfig[i] + 'Express',0);
            }
            defines.saveGameInfo('Game2',1);
        }else {
            cc.log('不是第一次进入游戏的');
        }
    },

});
