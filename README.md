## sqlite.xyz

---

### dependencies

- docker && docker-compose (or other mysql database)
- nodejs && npm

to install backend dependencies...

```cd <project_root>/server && npm install```

to install frontend dependencies...

```cd <project_root>/client && npm install```

---

### steps to run this application:


docker can be used to run the full stack

```docker-compose -f ./docker-compose.yaml up --build```

OR

start development database...

```cd <project_root> && docker-compose -f docker-compose.yaml up --build```

start development backend server...

```cd <project_root>/server && npm run start```

start development frontend server...

```cd <project_root>/client && npm run start```


---

### ToDo(s):

#### MVP
- [x] add file upload view
- [x] add database service
- [x] add sqlite database list view
- [x] add sqlite database individual view


#### ALPHA
- [ ] add explore community databases view
- [ ] add profile edit/delete view
- [ ] add profile explore view
- [ ] add sql.js sandbox view
- [ ] add email verification
- [ ] setup hosting on aws or gce

---
