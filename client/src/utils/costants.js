import events from './eventType'

export const SERVER_URL = `ws://${(window.origin === 'localhost') ? window.origin : '192.168.1.100'}:8000`
export const EVENTS = events

