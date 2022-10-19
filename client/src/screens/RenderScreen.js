import React from 'react'
import { useEffect, useState } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { EVENTS, SERVER_URL } from '../utils/costants';

// components
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import GalleryComponent from '../components/RenderComponents/GalleryComponent/GalleryComponent';
import OverlayText from '../components/RenderComponents/OverlayText/OverlayText';

const client = new W3CWebSocket(SERVER_URL);

const ShowcaseRender = () => {

    const [config, setConfig] = useState(null)

    client.onerror = (e) => {
        toast.error('Connessione al server fallita', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    client.onopen = () => {
        toast.success('Connesso al server', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        client.send(JSON.stringify({
            type: EVENTS.CONFIG_LOAD,
        }));
    }

    client.onmessage = (message) => {
        const serverData = JSON.parse(message.data);

        switch (serverData.type) {
            case EVENTS.CONFIG_UPDATE:
                setConfig(serverData.data.newConfig)
                break;
            case EVENTS.CONFIG_LOAD:
                console.log('LOADED', serverData.data.actualConfig)
                setConfig(serverData.data.actualConfig);
                break;
            default:
                break;

        }
    }

    if (config) {
        return (
            <div className='app-container'>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <GalleryComponent gallery={config.gallery} />
                <OverlayText overlayText={config.overlayText} />
            </div>
        )
    } else {
        return (
            <div style={{ backgroundColor: "#2b2b2b" }}>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        )
    }
}

export default ShowcaseRender