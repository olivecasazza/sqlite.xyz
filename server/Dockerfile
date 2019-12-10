FROM node:10.17.0

# create application 
# directory
RUN mkdir /server
WORKDIR /server

# install application 
# dependencies
COPY package.json .
RUN npm i

# copy source code
# into container
COPY .  .

# expose application 
# ports
EXPOSE 8000

# make sure database is migrated
# RUN npm run migration:run

CMD ["npm", "run", "start" ]