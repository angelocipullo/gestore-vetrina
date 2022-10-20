import React, { useState } from 'react'
import Section from '../components/AdminComponents/Section';

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { EVENTS, SERVER_URL } from '../utils/costants';
import List from '../components/AdminComponents/List/List';

const client = new W3CWebSocket(SERVER_URL);

const AdminScreen = () => {
    const [difConfig, setDifConfig] = useState()
    const [config, setConfig] = useState()

    client.onopen = () => {
        client.send(JSON.stringify({
            type: EVENTS.CONFIG_LOAD,
        }));
    };

    client.onmessage = (message) => {
        const serverData = JSON.parse(message.data);

        if (serverData.type === EVENTS.CONFIG_LOAD) {
            console.log(serverData.data.actualConfig)
            setConfig(serverData.data.actualConfig);
            setDifConfig(serverData.data.actualConfig)
        }
    }

    const updateConfig = () => {
        client.send(JSON.stringify({
            type: EVENTS.CONFIG_UPDATE,
            newConfig: { ...config, lastUpdated: new Date() }
        }));
    }

    if (config)
        return (
            <div className='admin-container'>
                <div className='admin-content'>
                    <div className='admin-title'>Pannello di controllo</div>

                    <Section name='Testo'>
                        <div className='flex-col section-content'>
                            <div className='flex'>
                                <input
                                    onChange={(e) => setConfig({ ...config, overlayText: { ...config.overlayText, isEnabled: e.target.checked } })}
                                    checked={config.overlayText.isEnabled}
                                    type="checkbox"
                                />
                                <p className='p1'>Abilita</p>
                            </div>

                            <div style={{ margin: '20px 0' }}>
                                <p className='p1'>Contenuto</p>
                                <input
                                    onChange={(e) => setConfig({ ...config, overlayText: { ...config.overlayText, content: e.target.value } })}
                                    value={config.overlayText.content} type="text" placeholder='ss'
                                />
                            </div>


                            <p style={{ marginBottom: 8 }} className='p1'>Dimensioni del testo</p>
                            <input
                                onChange={(e) => setConfig({ ...config, overlayText: { ...config.overlayText, fontSize: e.target.value } })}
                                type="range"
                                value={config.overlayText.fontSize}
                                min="10"
                                max="100"
                            />
                        </div>
                    </Section>

                    <Section name='Galleria'>
                        <div className='flex-col section-content'>
                            <div className='flex'>
                                <input
                                    onChange={(e) => setConfig({ ...config, gallery: { ...config.gallery, isEnabled: e.target.checked } })}
                                    checked={config.gallery.isEnabled}
                                    type="checkbox"
                                />
                                <p className='p1'>Abilita</p>
                            </div>
                            <List 
                                title="Immagini" 
                                items={config.gallery.images} 
                                onChange={(e) => console.log('evt', e)}
                            />
                        </div>
                    </Section>

                    <div
                        className={difConfig === config ? 'admin-btn-disabled' : 'admin-btn'}
                        onClick={updateConfig}
                    >
                        Aggiorna
                    </div>
                </div>
            </div>
        )
}



export default AdminScreen