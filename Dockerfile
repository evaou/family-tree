FROM node:12

WORKDIR /app

COPY package.json . 
COPY tsconfig.json . 
COPY geektrust.ts .
COPY cli.ts .
COPY src /app/src
COPY tests /app/tests
COPY res/tree.txt res/tree.txt
COPY res/geektrust-tree.txt res/geektrust-tree.txt

RUN npm install
RUN mkdir input
RUN npm run build
