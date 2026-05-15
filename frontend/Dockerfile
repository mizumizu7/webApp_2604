FROM node:24

WORKDIR /app

COPY package.json package-lock.json ./

# 依存解決を柔軟に行う場合
# RUN npm install

# package-lock.jsonに完全一致した依存関係でインストール
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
