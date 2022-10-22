import React, { useState } from 'react'
import Section from '../components/AdminComponents/Section';
import List from '../components/AdminComponents/List/List';
import { ToastContainer, toast } from 'react-toastify'

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { EVENTS, SERVER_URL } from '../utils/costants';
import { uploadImage } from '../utils/image.helper';

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
        toast.success('Vetrina Aggiornata!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setDifConfig(config)
        client.send(JSON.stringify({
            type: EVENTS.CONFIG_UPDATE,
            newConfig: { ...config, lastUpdated: new Date() }
        }));
    }

    const resetConfig = () => {
        toast.error('Carico impostazioni di fabbrica', {
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
            type: EVENTS.CONFIG_RESET,
        }));
    }

    if (config)
        return (
            <div className='admin-container'>
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

                            <div className='flex'>
                                <input
                                    onChange={(e) => setConfig({ ...config, overlayText: { ...config.overlayText, isMarquee: e.target.checked } })}
                                    checked={config.overlayText.isMarquee}
                                    type="checkbox"
                                />
                                <p className='p1'>Scorrevole</p>
                            </div>

                            <div className='flex-col' style={{ marginTop: '10px' }}>
                                <p className='p1'>Colore</p>
                                <input
                                    onChange={(e) => setConfig({ ...config, overlayText: { ...config.overlayText, color: e.target.value } })}
                                    value={config.overlayText.color}
                                    type="color"
                                />
                            </div>

                            <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column' }}>
                                <p className='p1'>Contenuto</p>
                                <input
                                    onChange={(e) => setConfig({ ...config, overlayText: { ...config.overlayText, content: e.target.value } })}
                                    value={config.overlayText.content}
                                    type="text"
                                    placeholder='Testo da mostrare'
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
                            <div className='flex' style={{ marginBottom: 20 }}>
                                <input
                                    onChange={(e) => setConfig({ ...config, gallery: { ...config.gallery, isEnabled: e.target.checked } })}
                                    checked={config.gallery.isEnabled}
                                    type="checkbox"
                                />
                                <p className='p1'>Abilita</p>
                            </div>

                            <div style={{marginBottom: 15}}>
                                <p className='p1'>Numero di Secondi per ogni immagine</p>
                                <input
                                    onChange={(e) => setConfig({ ...config, gallery: { ...config.gallery, slideDelay: parseInt(e.target.value) * 1000 } })}
                                    value={config.gallery.slideDelay / 1000}
                                    type="number"
                                    placeholder='Secondi'
                                />
                            </div>

                            <div>
                                <p className='p1'>Carica immagini</p>
                                <input type="file" accept="image/*" onChange={(e) => uploadImage(client, e.target.files)} />
                            </div>
                            <List
                                title="Immagini"
                                items={config.gallery.images}
                                onChange={(newImages) => setConfig({ ...config, gallery: { ...config.gallery, images: newImages } })}
                            />
                        </div>
                    </Section>

                    <div
                        className={difConfig === config ? 'admin-btn-disabled' : 'admin-btn'}
                        onClick={updateConfig}
                    >
                        Aggiorna
                    </div>

                    <div
                        className={'admin-btn-secondary'}
                        onClick={resetConfig}
                    >
                        Formatta
                    </div>
                </div>
            </div>
        )
}



export default AdminScreen