# ProjetCICD_BilheranOlivier

npm install
npm install -g

npm run start-db
PORT=3000 npm run start

tool add --code abcd --charge 12 --lng 43.43 --lat 53.43 -p 8080

tool list -p 8080

/!\ Si tool ne marche pas, remplacez par : node dist/src/index.js

DOCKER IMAGE :

docker-compose up

docker-compose run tool add --code abcd --charge 12 --lng 43.43 --lat 53.43 -p 8080
docker-compose run tool list -p 8080