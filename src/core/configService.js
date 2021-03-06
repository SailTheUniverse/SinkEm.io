const glob = require('glob'),
    request = require('minirequest'),
    fs = require('fs'),
    ini = require('../modules/ini.js');

var config = {
    port: 3000, //Game Port
    fps: 60, //Frames Per Second
    w: 6000, //World Width
    h: 6000, //World Height
    minimumSquares: 75, //Minimum Amount Of Squares
    minimumTriangles: 50, //Minimum Amount Of Triangles
    minimumPentagons: 10, //Minimum Amount Of Pentagons
    maxSquares: 175, //Maximum Amount Of Squares
    maxTriangles: 125, //Maximum Amount Of Triangles
    maxPentagons: 75, //Maximum Amount Of Pentagons
    chatMaxMessageLength: 70, //Length of messages in chat
    chatIntervalTime: 2500, //ms between each message
    chatBlockedWords: "", //Words to filter from chat
    clientMaxName: 15, //Number of maximum characters in the name box
    clientTitle: "" //The Title That The Client Uses
};

module.exports = {
    getConfig() {
        return config;
    },
    init() {
        this.loadConfig();
    },
    loadConfig() {
        let configFiles = glob.sync(__dirname + "/../settings/*.ini");
        if (configFiles.length === 0) {
          console.log("[\x1b[34mINFO\x1b[0m] No config files found, generating: src/settings/config.ini");
              // Create a new config
              for(var i=0; i<2; i++){
                  request('https://raw.githubusercontent.com/SharkFinProductions/diepio-multiplayer/master/src/settings/config.ini', (error, response, code) => {
                    if (!error && response.statusCode == 200) fs.writeFileSync(__dirname + '/../settings/config.ini', code);
                  });
                  request('https://raw.githubusercontent.com/SharkFinProductions/diepio-multiplayer/master/src/settings/clientConfig.ini', (error, response, code) => {
                    if (!error && response.statusCode == 200) fs.writeFileSync(__dirname + '/../settings/clientConfig.ini', code);
                  });
                  request('https://raw.githubusercontent.com/SharkFinProductions/diepio-multiplayer/master/src/settings/advConfig.ini', (error, response, code) => {
                    if (!error && response.statusCode == 200) fs.writeFileSync(__dirname + '/../settings/advConfig.ini', code);
                  });
              }
        }
        configFiles.forEach(file => {
            try {
                console.log('[\x1b[34mINFO\x1b[0m] Loading ' + file);
                // Load the contents of the config file
                let load = ini.parse(fs.readFileSync(file, 'utf-8'));
                // Replace all the default config's values with the loaded config's values
                for (let obj in load) config[obj] = load[obj];
                console.log('[\x1b[32mOK\x1b[0m] Loaded ' + file);
            } catch (err) {
                console.warn("Error while loading: " + file + " error: " + err);
            }
        });
    }
};
