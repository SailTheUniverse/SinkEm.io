var banList = [];
const server = require("../server.js"),
    pluginService = require('./pluginService.js');
module.exports = {
    getBanList: () => banList,
    setBanList: ips => {
        banList = ips;
        server.ban();
    },
    addBan: ip =>{
        pluginService.getPlugins().forEach(plugin => plugin.call('beforeBan'));
        banList.push(ip);
        server.ban();
    },
    delBan: ip => banList.splice(ip, 1)
};
