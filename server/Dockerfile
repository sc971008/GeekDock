FROM node

WORKDIR /app

# 先复制 package 文件，利用缓存
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm install

EXPOSE 8000

CMD ["node", "server.js"]