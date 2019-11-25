# sqlite.xyz

### dependencies

- docker && docker-compose (or other mysql database)
- nodejs

to install backend dependencies...

```cd <project_root>/server && npm install```

to install frontend dependencies...

```cd <project_root>/client && npm install```

### steps to run this application:

start development database...

```cd <project_root> && docker-compose -f docker-compose.yaml up --build```

start development backend server...

```cd <project_root>/server && npm run start```

start development frontend server...

```cd <project_root>/client && npm run start```