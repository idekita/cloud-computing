FROM node:16
WORKDIR /user/src
COPY package.json /user/src
RUN npm install 
COPY . /user/src
CMD ["npm", "start"]
