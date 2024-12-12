## Global
- For all this project : node version : 20.16.0

## Backend
- refer to README inside my-nest-backend
- use and restore dump.sql to load existing datas
```bash
$ psql -U <username> -d <dbname> -f "dump.sql"
```
- before running API don't forget to create a .env file with following infos:
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=<username>
DATABASE_PASSWORD=<password>
DATABASE_NAME=myapp
```
- use and import in Postman NODE_Project.postman_collection.json if you want a ready to run collection

## Frontend
- install dependencies 
```bash 
$ npm i 
```
- run project on your laptop
```bash
npx expo start --web
```