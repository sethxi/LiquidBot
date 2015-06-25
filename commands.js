var lib = require("./lib.js");
var t = require("./index.js");
var cfg = require("./config");
var math = require("mathjs");

function commands(msg) {
    var command = msg.text.split("; ");
    var args = [];
    
    for(var i = 1; i < command.length; i++) {
        args.push(command[i]);
    }
    
    if(command[0].toLowerCase() != "lb") return;
    
    switch(args[0].toLowerCase()){
        case "help":
            var help = "";
            for(var i = 0; i < cfg["help"].length;i++) {
                help += cfg["help"][i] + "\n";
            }
            lib.sendMsg(msg.chat.id, help);
            break;
        case "say":
            if(!lib.adminCheck(msg.from.id)) {
                lib.sendMsg("You don't have access to this command, " + msg.from.first_name + ".");
                return;
            }
            
            if(args[1] == "here") {
                lib.sendMsg(msg.chat.id, args[2]);
            } else {
                var contact;
                for(var i = 0; i < cfg["chats"].length; i++) {
                    if(args[1].toLowerCase() == cfg["chats"][i][0].toLowerCase()) {
                        contact = cfg["chats"][i][1];
                    }
                }
                if(contact) {
                    lib.sendMsg(contact, args[2]);
                } else {
                    lib.sendMsg(msg.chat.id, "Could not find chat '" + args[1] + "'.");
                }
            }
            break;
        case "chats":
            if(!lib.adminCheck(msg.from.id)) {
                lib.sendMsg("You don't have access to this command, " + msg.from.first_name + ".");
                return;
            }
            
            var chats = "Chats: \n";
            
            for(var i = 0; i < cfg["chats"].length; i++) {
                chats += cfg["chats"][i][0] + "\n";
            }
            
            lib.sendMsg(msg.chat.id, chats);
            
            break;
        case "admin":
            if(!lib.adminCheck(msg.from.id)) {
                lib.sendMsg(msg.chat.id, "You are not an admin, " + msg.from.first_name + ".");
            } else {
                lib.sendMsg(msg.chat.id, "You are an admin, " + msg.from.first_name + ".");
            }
            break;
        case "math":
            try {
                lib.sendMsg(msg.chat.id, msg.from.first_name + ": " + math.eval(args[1]))
            } catch (err) {
                lib.sendMsg(msg.chat.id, "That's an invalid math problem, " + msg.from.first_name + ".")
            }
            break;
        default:
            lib.sendMsg(msg.chat.id, "Invalid command, " + msg.from.first_name + ".");
    }
}

module.exports.parse = commands;