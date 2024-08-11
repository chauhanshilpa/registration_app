FROM node:slim
RUN apt-get update && \
    apt-get install -y curl
WORKDIR /backend
COPY /backend /backend
RUN npm install
EXPOSE 4002
CMD node index.js