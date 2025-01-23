# ProjetCICD_BilheranOlivier

![Build Status](https://github.com/LBilheran/ProjetCICD_BilheranOlivier/actions/workflows/compilation.yml/badge.svg?branch=staging)
![Commit Status](https://img.shields.io/github/commit-activity/t/LBilheran/ProjetCICD_BilheranOlivier?)

## Projet

- L'outil est un serveur qui permet, à l'aide d'une base de données, de :
    - créer des véhicules
    - lister les véhicules
    - supprimer des véhicules

- Les véhicules possèdent un code, une charge de batterie et des coordonnées (lat,long).
- Une image Docker est disponible mais elle ne permet pas de choisir le serveur sur lequel se déploît le serveur (8080).

## Version Manuelle

- Installation :
```bash
npm install
npm install -g
```

- Démarrer la base de donnée :
```bash
npm run start-db
```

- Démarrer le serveur (port=8080 par défaut) :
```bash
PORT=3000 npm run start
```

- Ajouter un véhicule :
```bash
tool add --code abcd --charge 12 --lng 43.43 --lat 53.43 -p 3000
```
- Lister les véhicules :
```bash
tool list -p 3000
```

- Supprimer un véhicule :
```bash
tool delete --id 1 -p 3000
```

## Version Docker

- Installation :
```bash
docker-compose up
```

- Ajouter un véhicule :
```bash
docker-compose run tool add --code abcd --charge 12 --lng 43.43 --lat 53.43 -p 8080
```
- Lister les véhicules :
```bash
docker-compose run tool list -p 8080
```

- Supprimer un véhicule :
```bash
docker-compose run tool delete --id 1 -p 3000
```