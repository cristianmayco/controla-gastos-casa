# controla-gastos-casa
Uma aplicação simples para gerenciar contas mensais e os próximos vencimentos e lembretes

## Funcionalidades

- Cadastro de contas com nome, valor e data de vencimento
- Opção de definir data de lembrete (padrão: 10 dias antes do vencimento)
- Marcação de contas como pagas
- Listagem de todas as contas
- Listagem de contas não pagas
- Lembretes automáticos para contas próximas do vencimento
- Notificações de contas vencidas

## Tecnologias Utilizadas

### Backend
- Java 21
- Spring Boot 3
- Spring Data JPA
- Spring Web
- PostgreSQL 16
- Docker
- Maven

### Frontend
- React 18
- TypeScript
- Material-UI
- Axios
- Docker

## Estrutura do Projeto
```
controla-gastos-casa/
├── backend/               # API Java Spring Boot
├── frontend/             # Aplicação React
└── docker-compose.yml    # Configuração dos containers
```

## Pré-requisitos

1. Instalar o Docker:
```bash
# Atualizar os pacotes
sudo apt-get update

# Instalar dependências
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Adicionar a chave GPG oficial do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Configurar o repositório estável
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar o Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Adicionar seu usuário ao grupo docker
sudo usermod -aG docker $USER
```

2. Instalar o Docker Compose:
```bash
# Baixar o Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Dar permissão de execução
sudo chmod +x /usr/local/bin/docker-compose
```

3. Fazer logout e login novamente para aplicar as alterações de grupo

## Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/cristianmayco/controla-gastos-casa.git
cd controla-gastos-casa
```

2. Inicie os containers com Docker Compose:
```bash
docker-compose up -d
```

3. A aplicação estará disponível em:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui.html

## Endpoints da API

### Contas
- `GET /api/contas` - Lista todas as contas
- `GET /api/contas/nao-pagas` - Lista contas não pagas
- `GET /api/contas/{id}` - Busca uma conta específica
- `POST /api/contas` - Cria uma nova conta
- `PUT /api/contas/{id}` - Atualiza uma conta existente
- `DELETE /api/contas/{id}` - Remove uma conta
- `PUT /api/contas/{id}/pagar` - Marca uma conta como paga

### Lembretes
- `GET /api/lembretes` - Lista todos os lembretes ativos
- `GET /api/lembretes/proximos` - Lista lembretes dos próximos 10 dias

## Desenvolvimento

### Backend
Para desenvolver o backend localmente sem Docker:

1. Instalar Java 21:
```bash
sudo apt-get install openjdk-21-jdk
```

2. Instalar Maven:
```bash
sudo apt-get install maven
```

3. Executar o PostgreSQL (necessário Docker):
```bash
docker run -d --name postgres -p 5432:5432 -e POSTGRES_DB=controlagastos -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres postgres:16
```

4. Executar o backend:
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
Para desenvolver o frontend localmente sem Docker:

1. Instalar Node.js e npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Instalar dependências e executar:
```bash
cd frontend
npm install
npm start
