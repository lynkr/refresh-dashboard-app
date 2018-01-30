const SessionManager = require('../SessionManager');
const User = require('../models/User');
const Device = require('../models/DeviceProfile');
const Errors = require('../ErrorMessages')
const Sounds = require('../Sounds')

const ContextMap = require('../ContextMap')
var newContext = 'mainMenu'

var execute = function(args, assistant){
    args.connectCode = args.color + " " + args.animal + " " + args.appliance;
    var user = assistant.deviceProfile.user;
    if(!user){
        user = new User();        
        user.generateSessionCode();
        user.setContext(newContext);
        assistant.setUser(user)
        user.save();
    }
    var room = SessionManager.getSession(args.connectCode);
    console.log(user)
    SessionManager.sendData(room, 're-connect', user.sessionCode);
    SessionManager.sendData(room, 'setStatus', newContext);
    assistant
        .play(Sounds.forward)
        .say("Connected")
        .reprompt.say('Connected')
        .finish()
}

var validateInput = function(args, assistant){
    if(!assistant.deviceProfile)
        return Errors.NeedToConnect
    if(!args.color || !args.animal || !args.appliance)
        return "I didn't quite get that. Try again or refresh for a new code"
    return null;
}

var ConnectIntent = {
    execute: execute,
    validateInput: validateInput,
    logInput: false
}

module.exports = ConnectIntent;