# About

Faker-Person - it's a fake person generator. That generator was extracted from the oshu-mail which is a part of http://oshu-gun.com communicator.

The project contains a database 'names.db' with 128k+ unique names and 155k+ unique surnames from the British and Irisish registers and websites.

Part of the Irish surnames in the database comes from https://github.com/gaois/IrishSurnameIndex under Open Database License (ODbL) v1.0.

## How to use it?

The only dependency is an SQLite package to have an access to the database.
The easiest way to see the results is to run an npm script like

```bash
npm run generator --rounds=10
```

to get result like

```shell
{ name: 'Chrisha', surname: 'Brickley', alias: 'chrisha.brickley1907' }
{ name: 'John', surname: 'Breheny', alias: 'john.breheny1960' }
{ name: 'Sule', surname: 'Pueblo', alias: 'sule.pueblo1933' }
{ name: 'Andriana', surname: 'Heronemus', alias: 'andriana.heronemus1994' }
{ name: 'Itasca', surname: 'Nyhof', alias: 'itasca.nyhof1964' }
{ name: 'Anabelen', surname: 'Barczynski', alias: 'anabelen.barczynski1926' }
{ name: 'Haci', surname: 'Ehrhardt', alias: 'haci.ehrhardt1905' }
{ name: 'Maronda', surname: 'Carlozzi', alias: 'maronda.carlozzi1903' }
{ name: 'Juanelle', surname: 'Welvaert', alias: 'juanelle.welvaert2015' }
{ name: 'Vertice', surname: 'Zauala', alias: 'vertice.zauala2004' }
[10 rounds - print] 0.23333333333333334
[10 rounds - no print] 0.08333333333333333
```

For more details check the example.
