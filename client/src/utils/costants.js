import events from './eventType'

export const SERVER_URL = `ws://${(window.origin === 'localhost') ? 'localhost': window.location.hostname }:8000`
export const EVENTS = events

