FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# 构建生产版本
RUN npm run build

# 安装 serve 提供静态文件
RUN npm install -g serve

EXPOSE 3000

# 使用 serve 启动生产 build，监听 0.0.0.0
CMD ["serve", "-s", "build", "-l", "3000"]