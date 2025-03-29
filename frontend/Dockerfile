FROM node:16-alpine as build

WORKDIR /app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar todas as dependências, incluindo as de desenvolvimento
RUN npm install --legacy-peer-deps

# Copiar o restante dos arquivos do projeto
COPY . .

# Criar a build de produção
RUN npm run build

# Configurar o Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Criar diretório para os arquivos estáticos
RUN mkdir -p /usr/share/nginx/html/static

# Expor a porta 3000
EXPOSE 3000

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
