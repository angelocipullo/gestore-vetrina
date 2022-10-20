import events from './eventType'
import { address } from './serverAddress.json'

export const SERVER_URL = `ws://${(window.origin === 'localhost') ? window.origin : address }:8000`
export const EVENTS = events

