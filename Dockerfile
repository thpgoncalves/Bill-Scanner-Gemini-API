# Utiliza uma imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Expõe a porta na qual a aplicação irá rodar
EXPOSE 3000

# Define o comando para rodar a aplicação, ajustando o caminho
CMD ["node", "dist/api/app.js"]