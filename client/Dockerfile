FROM node:10.17.0

# create application directory
RUN mkdir /client
WORKDIR /client

# install application dependencies
COPY package.json .
RUN npm i

# copy source code 
# into container
COPY .  .

CMD ["npm", "run", "start"]