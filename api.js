var TGBotAPI = require("tgbotapi");
var cfg = require("./config");
var cmds = require("./commands.js")

var tgbotapi = new TGBotAPI(cfg["token"], function(msg) {
    console.log(msg);
    
    cmds.parse(msg);
});

module.exports.tgbotapi = tgbotapi;