/**
 * Created by chu on 2016/12/4 0004.
 */
let Defines = ()=> {
    var that = {};

    that.ConfigUrl = {
        gong: 'resources/config/gongConfig.json',
        dapao: 'resources/config/dapaoConfig.json',
    };
    that.ScreenConfie = {
        width: 1920,
        height: 1080
    };
    that.TowerNameConfig = ['gong','dapao'];
    that.saveGameInfo = function (key,value) {
        cc.sys.localStorage.setItem(key,value);
    };
    that.getGameInfo = function (key) {
        return JSON.parse(cc.sys.localStorage.getItem(key));
    };
    that.getTowerLevel = function (index) {
         return that.getGameInfo(that.TowerNameConfig[index]);
    }
    that.getTowerExpress = function (index) {
        return that.getGameInfo(that.TowerNameConfig[index] + 'Express');
    }
    that.getTowerLevelExpress = function (index,level,config) {
        let key = that.TowerNameConfig[index];
        let info = config[level - 1];
        return info['express'];
    }
    


    return that;
};
let defines = Defines();
export default defines;