var api = require("./api.js");
var cfg = require("./config");

function sendMsg(id, txt) {
    api.tgbotapi.sendMessage({
        chat_id: id,
        text: txt
    });
}

module.exports.sendMsg = sendMsg;

function adminCheck(id) {
    for(var i = 0; i < cfg["admins"].length; i++) {
        if(id == cfg["admins"][i]) {
            return true;
        }
    }
    return false;
}

module.exports.adminCheck = adminCheck;