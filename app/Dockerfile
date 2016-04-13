FROM node:0.10

RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app
COPY  ./package.json /usr/src/app
COPY . /usr/src/app
RUN  npm install -g grunt
CMD ["grunt"]
