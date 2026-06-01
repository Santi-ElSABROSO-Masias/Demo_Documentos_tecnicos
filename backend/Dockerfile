# ==========================================
# ETAPA 1: COMPILACIÓN
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias necesarias
COPY package*.json ./
RUN npm ci

# Copiar el código fuente del backend y compilar
COPY . .
RUN npm run build

# ==========================================
# ETAPA 2: PRODUCCIÓN (IMAGEN FINAL)
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Instalar únicamente dependencias de producción para minimizar el tamaño de la imagen
COPY package*.json ./
RUN npm ci --only=production

# Copiar el build compilado y la carpeta de recursos de plantillas
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/resources ./resources

# Puerto expuesto por defecto (inyectado o 3001)
EXPOSE 3001

CMD ["node", "dist/main.js"]
