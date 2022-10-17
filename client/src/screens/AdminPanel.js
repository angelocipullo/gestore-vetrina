import React from 'react'
import { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:8000');

const testObj = {
    "busines": {
        "name":"BUSINESS NAME HERE"
    },
    "logo":{
        "fileURI":"http://src.it",
        "position":"top-left"
    },
    "gallery": {
        "images": [
            { "url":"url", "time":1000},
            { "url":"url", "time":1000}
        ],
        "animation": "slide",
        "backgroundColor":"#e5e5e5"
    },
    "overlayText": {
        "position":"bottom",
        "color": "red",
        "backgroundColor": "black",
        "textAlign":"right",
        "content":"Update da cell",
        "fontSize": 50,
        "isMarquee": true,
        "textTransform": "uppercase",
        "fontWeight": 700
    },
    "lastUpdated": "2022-10-16T00:40:42.869Z"
}

const AdminPanel = () => {

    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };

    const updateConfig = () => {
        client.send(JSON.stringify({
            type: "update-config",
            newConfig: { ...testObj, lastUpdated: new Date() }
        }));
    }

    return (
        <div>
            <div>AdminPanel</div>
            <button onClick={updateConfig}>DEBUG</button>
        </div>
    )
}



export default AdminPanel