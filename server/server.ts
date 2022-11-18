import { NextFunction, Request, RequestHandler, Response } from "express";

const express = require('express');

const app = express();

import fs from 'fs';

app.use(express.json());


app.listen(8080, function () {
  console.log("C'est parti ! En attente de connexion sur le port 8080...");
});

// Configuration d'express pour utiliser le répertoire "dist"
app.use(express.static('./dist/'));


type Marker = {
  id:number,
  name: string,
  description: string,
  type: string,
  longitude: number,
  lattitude: number
}

var markersData: Marker[] = [];
var errorParse: string = "";

try {
  markersData = JSON.parse(require('fs').readFileSync(__dirname + '/markers.json'));
} catch (e) {
  errorParse = "Impossible to parse the data."
}

// Add Access Control Allow Origin headers
app.use((req:RequestHandler, res:Response, next:NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", ["PUT","DELETE"]);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', function (req:Request, res:Response) {
  res.sendFile(__dirname + 'index.html');
});

app.get('/markers', function (req: Request, res: Response) {
  
  console.log("Reçu : GET /stations");
  res.setHeader('Content-type', 'application/json');
  if (errorParse == "") {
    res.json({ status: 0, data: markersData });
  } else {
    res.json({ status: -1, data: errorParse });
  }
});


app.put('/markers', function (req:Request, res:Response) {
  console.log("Reçu : PUT /markers");
  console.log("body=" + JSON.stringify(req.body));
  res.setHeader('Content-type', 'application/json');
  let newIndex = 0;
  for(let mark of markersData){
    if(mark.id > newIndex) newIndex = mark.id;
  }
  newIndex++;
  let data = req.body;
  data.id = newIndex;
  markersData.push(data);
  fs.writeFile('markers.json', JSON.stringify(markersData), (err) => {
    console.log(err);
  });
  res.json({ status: 200 });
});

app.delete('/markers/:id', function (req:Request, res:Response) {
  console.log("Reçu : DELETE /markers/" + req.params.id);
  console.log("body=" + JSON.stringify(req.body));
  res.setHeader('Content-type', 'application/json');
  console.log(req.params.id)
  markersData = markersData.filter((value:Marker) => {
    console.log(value.id != parseInt(req.params.id))
    return value.id != parseInt(req.params.id);
  })
  console.log(markersData)
  fs.writeFile('markers.json', JSON.stringify(markersData), (err) => {
    console.log(err);
  });
  res.json({ status: 200 });
});


