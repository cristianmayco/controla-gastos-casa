#!/bin/bash

# Instalar curl se não estiver instalado
if ! command -v curl &> /dev/null; then
    sudo apt-get update
    sudo apt-get install -y curl
fi

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version

# Instalar dependências do projeto
npm install

# Criar build de produção
npm run build
