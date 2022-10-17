import React from 'react'
import { useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

// components
import GalleryComponent from '../components/RenderComponents/GalleryComponent/GalleryComponent';
import OverlayText from '../components/RenderComponents/OverlayText/OverlayText';
import defaultConfig from '../configuration.json'

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const ShowcaseRender = () => {

  const [config, setConfig] = useState(defaultConfig)

  client.onopen = () => {
    console.log('Listening for configs');
  };

  client.onmessage = (message) => {
    const serverData = JSON.parse(message.data);

    if (serverData.type === 'update-config') {
      console.log(serverData)
      setConfig(serverData.data.newConfig)
    }
  }

  return (
    <div className='app-container'>
      <GalleryComponent gallery={config.gallery} />
      <OverlayText overlayText={config.overlayText} />
    </div>
  )
}

export default ShowcaseRender