# ==========================================
# ETAPA 1: COMPILACIÓN (REACT + VITE)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Inyectar argumentos en tiempo de compilación (Vite requiere esto al compilar el bundle estático)
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ==========================================
# ETAPA 2: SERVIDOR WEB DE PRODUCCIÓN (NGINX)
# ==========================================
FROM nginx:alpine

# Copiar el build estático compilado al directorio raíz de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
