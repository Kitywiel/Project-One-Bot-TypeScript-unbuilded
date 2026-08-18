import WebSocket, { WebSocketServer } from 'ws';
import { log } from './handeler/console-handeler';
import type { Server } from 'http';

const clients = new Set<WebSocket>();

let wss: WebSocketServer;

export function setupWebSocket(server: Server) {
    wss = new WebSocketServer({
        server,
        path: '/ws'
    });

    wss.on('connection', (socket) => {
        clients.add(socket);

        console.log('[WS]> Client connected');

        socket.send(JSON.stringify({
            type: 'connection',
            status: 'connected'
        }));

        socket.on('close', () => {
            clients.delete(socket);

            console.log('[WS]> Client disconnected');
        });

        socket.on('error', (error) => {
            console.error('[WS]> Client error:', error);
        });

        socket.on('message', (data) => {
            try {
                const message = JSON.parse(data.toString());

                console.log('[WS]> Received:', message);

                // Handle commands from the website here.
            } catch {
                console.log('[WS]> Invalid message received.');
            }
        });
    });

    log(5, 'WebSocket server ready on /ws');
}