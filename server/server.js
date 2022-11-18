"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const fs_1 = __importDefault(require("fs"));
app.use(express.json());
app.listen(8080, function () {
    console.log("C'est parti ! En attente de connexion sur le port 8080...");
});
// Configuration d'express pour utiliser le répertoire "dist"
app.use(express.static('./dist/'));
function isMarker(x) {
    return x.id != undefined && x.longitude != undefined && x.lattitude != undefined && x.name != undefined && x.type != undefined && x.description != undefined;
}
var markersData = [];
var errorParse = "";
try {
    markersData = JSON.parse(require('fs').readFileSync(__dirname + '/markers.json'));
}
catch (e) {
    errorParse = "Impossible to parse the data.";
}
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", ["PUT", "DELETE"]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + 'index.html');
});
app.get('/markers', function (req, res) {
    console.log("Reçu : GET /stations");
    res.setHeader('Content-type', 'application/json');
    if (errorParse == "") {
        res.json({ status: 0, data: markersData });
    }
    else {
        res.json({ status: -1, message: "Error while server parse markers data." });
    }
});
app.put('/markers', function (req, res) {
    console.log("Reçu : PUT /markers");
    console.log("body=" + JSON.stringify(req.body));
    res.setHeader('Content-type', 'application/json');
    let nameIndispo = false;
    markersData.forEach((value) => {
        if (value.name === req.body.name) {
            nameIndispo = true;
        }
    });
    if (nameIndispo) {
        res.json({ status: -1, message: "Nom déja utilisé." });
        return;
    }
    if (!isMarker(req.body)) {
        console.log("Isnt a marker");
        res.json({ status: -2, message: "Mauvaise données transmise." });
        return;
    }
    let newIndex = 0;
    for (let mark of markersData) {
        if (mark.id > newIndex)
            newIndex = mark.id;
    }
    let data = req.body;
    newIndex++;
    data.id = newIndex;
    markersData.push(data);
    fs_1.default.writeFile('markers.json', JSON.stringify(markersData), (err) => {
        console.log(err);
    });
    res.json({ status: 200 });
});
app.delete('/markers/:id', function (req, res) {
    console.log("Reçu : DELETE /markers/" + req.params.id);
    console.log("body=" + JSON.stringify(req.body));
    res.setHeader('Content-type', 'application/json');
    console.log("\n\n\n\n" + req.params.id);
    if (parseInt(req.params.id) == NaN) {
        res.json({ status: -1, message: "Données invalide." });
        return;
    }
    let intialLength = markersData.length;
    markersData = markersData.filter((value) => {
        console.log(value.id != parseInt(req.params.id));
        return value.id != parseInt(req.params.id);
    });
    console.log(markersData);
    if (markersData.length == intialLength) {
        res.json({ status: -2, message: "Données invalide." });
        return;
    }
    fs_1.default.writeFile('markers.json', JSON.stringify(markersData), (err) => {
        console.log(err);
    });
    res.json({ status: 200 });
});
