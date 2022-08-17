Potrebne namestitve:
Node.js: https://nodejs.org/en/
Angular CLI: https://angular.io/cli (npm install -g @angular/cli)
MongoDB (client): https://www.mongodb.com/try/download/shell (namestitev in dodajanje exe datotek v path)
MongoDB (server): https://www.mongodb.com/try/download/community (namestitev in dodajanje exe datotek v path)
MongoDB database tools: https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools (namestitev in dodajanje exe datotek v path)

Neobvezno, ampak priporočljivo za dodajanje novih vnosov:
https://www.mongodb.com/products/compass


Navodila za zagon baze (datoteke z vsemi že uvoženimi podatki so v docs (slo.json, slo.csv, eng.json, eng.csv)):
1. V mapi EDIH KATALOG v1 ustvarimo mapo, v katero bo Mongo shranjeval podatke (npr.: "mongodata")
2. Odpremo terminalsko okno in se premaknemo v mapo EDIH KATALOG v1
3. Zaženemo ukaz `mongod --dbpath=mongodata --nojournal`
4. V novem terminalu zaženemo ukaz `mongoimport --db EDIH --collection slo --mode upsert --jsonArray --file ./docs/slo.json`
5. V terminalu zaženemo ukaz `mongoimport --db EDIH --collection eng --mode upsert --jsonArray --file ./docs/eng.json`
6. (Odpremo MongoDBCompass in preverimo, če je baza ustvarjena (vpišemo connection string "mongodb://localhost/EDIH"))


Navodila za zagon zalednega sistema:
1. Odpremo terminal
2. Premaknemo se v podmapo projekta: `cd <pot do projekta>/EDIH KATALOG v1/server`
3. Zaženemo ukaz `npm install`
4. Zaženemo ukaz `node bin/www`


Navodila za zagon uporabniškega vmesnika:
1. Odpremo terminal
2. Premaknemo se v podmapo projekta: `cd <pot do projekta>/EDIH KATALOG v1/frontend`
3. Zaženemo ukaz `npm install`
4. Zaženemo ukaz `ng serve --open` (to bo odprlo nov zavihek na localhost:4200)
5. Za slovensko stran gremo na localhost:4200/slo, za angleško pa na localhost:4200/eng# SEROI
# SEROI
# SEROI
