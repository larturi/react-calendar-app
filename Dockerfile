FROM node:16 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Configura las variables de entorno para el entorno de producción
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

RUN npm run build

# Usa una imagen más ligera para ejecutar la aplicación
FROM nginx:alpine

# Copia la build de la aplicación React al directorio adecuado de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expon el puerto en el que Nginx estará escuchando
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
