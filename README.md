# realtime-vehicle-tracker

Real-time vehicle location tracking server built with NestJS, WebSockets, Redis, Docker, and NGINX.

## What it does

Simulates real-time GPS tracking where multiple vehicle clients send location updates through a WebSocket gateway and all connected clients receive them instantly.

- Last known location of every vehicle is persisted in Redis
- Newly connected clients immediately receive current positions of all active vehicles
- All traffic is routed through NGINX, NestJS is not exposed directly

## Architecture

```
Browser Tab (Vehicle Client)
        ↓  emits { deviceId, lat, lng }
      NGINX (port 80)
        ↓  proxies HTTP + WebSocket traffic
   NestJS WebSocket Gateway
        ↓  stores last known location in Redis
        ↓  broadcasts update to all connected clients
Browser Tab (Dashboard Client)
        ↓  displays incoming coordinates
```

## How to run

Make sure Docker is installed on your system.

```bash
docker compose up --build
```

Then open `index.html` in two or more browser tabs and click Send in any tab to emit a random GPS coordinate. All tabs will receive and display the update in real time.

## Stack

- NestJS
- Socket.io
- TypeScript
- ioredis
- Docker + Docker Compose
- NGINX