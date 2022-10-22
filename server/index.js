// dependencies
const webSocketServer = require('websocket').server;
const http = require('http');
const fs = require('fs');

// utils
const PORT = 8000;
const DEFAULT_CONFIG = require('./defaultConfiguration.json')
const EVENTS = require('../client/src/utils/eventType.js')
const PREFIX = "[Gestore Vetrina]"

// Start server
const server = http.createServer();
server.listen(PORT);

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    fs.writeFileSync('client/src/utils/serverAddress.json', `{ "address": "${add}" }`)
    console.log(PREFIX, `Server listening on ${add}:${PORT}`)
  })

const wsServer = new webSocketServer({
    httpServer: server
});

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

// global vars
let globalConfig = {}

if ( fs.existsSync('./server/configuration.json')) {
    globalConfig = require('./configuration.json');
    console.log(PREFIX, 'Config found and loaded')
} else {
    globalConfig = DEFAULT_CONFIG;
}

const clients = {};

const sendMessage = (json) => {
    Object.keys(clients).map((client) => { clients[client].sendUTF(json) });
}


wsServer.on('request', function (request) {
    const timestamp = `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}] `

    var userID = getUniqueID();
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log(timestamp + `client ${request.origin} connected as ${userID}`);

    // events handler
    connection.on('message', onChange);

    // user disconnected
    connection.on('close', onClose);
});



const onChange = (message) => {
    if (message.type === 'utf8') {
        const dataFromClient = JSON.parse(message.utf8Data);
        const json = { type: dataFromClient.type };

        switch (dataFromClient.type) {
            case EVENTS.CONFIG_LOAD:
                json.data = { actualConfig: globalConfig };
                break;
            case EVENTS.CONFIG_UPDATE:
                fs.writeFileSync('./server/configuration.json', JSON.stringify(dataFromClient.newConfig));
                globalConfig = dataFromClient.newConfig
                json.data = { newConfig: dataFromClient.newConfig };
                break;
            case EVENTS.CONFIG_RESET:
                globalConfig = DEFAULT_CONFIG
                json.data = { newConfig: DEFAULT_CONFIG };
            case EVENTS.IMAGE_UPLOAD:
                console.log(dataFromClient)
        }

        sendMessage(JSON.stringify(json));
    }
}

const onClose = () => {
    const timestamp = `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}] `

    console.log(timestamp + 'client disconnected');
}
