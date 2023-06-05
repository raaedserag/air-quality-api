FROM node:18.16.0-alpine
WORKDIR /usr/air-quality-api
COPY . .
RUN npm ci
EXPOSE 80
ENTRYPOINT ["npm"]
CMD ["start"]
