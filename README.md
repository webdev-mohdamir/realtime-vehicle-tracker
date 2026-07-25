# realtime-vehicle-tracker

Real-time vehicle location tracking server built with NestJS, WebSockets, Redis, Docker, and NGINX.

## What it does

Simulates real-time GPS tracking where multiple vehicle clients send location updates through a WebSocket gateway and all connected dashboard clients receive them instantly.

## Architecture

```
Browser Tab (Vehicle Client)
        ↓  emits { deviceId, lat, lng }
   NestJS WebSocket Gateway
        ↓  broadcasts to all connected clients
Browser Tab (Dashboard Client)
        ↓  displays incoming coordinates
```

## How to run

1. Install dependencies

npm install

2. Start the server

npm run start:dev

3. Open index.html in two or more browser tabs

4. Click Send in any tab to emit a random GPS coordinate

All tabs will receive and display the update in real time.

## Stack

- NestJS
- Socket.io
- TypeScript
```