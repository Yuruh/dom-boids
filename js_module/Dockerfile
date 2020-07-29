FROM node:13.12.0-alpine

COPY . .

RUN npm install

RUN npm run build

RUN npm install -g serve

EXPOSE 5000

# should rewrite api endpoint for easy self hosting without having to rebuild the image
# https://stackoverflow.com/questions/57752046/how-to-set-node-env-variables-runtime-after-build-the-react-project
CMD ["serve", "-s", "."]
