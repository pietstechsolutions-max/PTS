# Piets Technology Solutions - HQ server (website + client hub + admin)
FROM node:22-slim

# better-sqlite3 ships prebuilt binaries for node 22; build tools are only a fallback.
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY . .

# Persistent data (SQLite) lives here - mount a disk/volume at /app/server/data
ENV DB_PATH=/app/server/data/piets.db
ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD node -e "fetch('http://localhost:'+(process.env.PORT||3000)+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server/index.js"]
