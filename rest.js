const express = require("express");
const app = express();
const fs = require("fs");
const port = 5200;

const jsonFile = "./db.json";

app.get('/db', (req, res) => {
    fs.readFile(jsonFile, (err, data) => {
        res.end(data);
    })
});

app.get('/:table', (req, res) => {
    fs.readFile(jsonFile, (err, data) => {
        var jsonContent = JSON.parse(data); 
        if (jsonContent.hasOwnProperty(req.params.table)) {
            res.end(jsonContent[req.params.table]);
        } else {
            res.end(`{}`);
        }
    })
});

app.get('/:table/:id', (req, res) => {
    if (parseInt(req.params.id) !== NaN) {
        fs.readFile(jsonFile, (err, data) => {
            var jsonContent = JSON.parse(data); 
            if (jsonContent.hasOwnProperty(req.params.table)) {
                const element = jsonContent[req.params.table].reduce((acc, val) => {
                    if (val.id === parseInt(req.params.id)) {
                        return JSON.stringify(val, null, 2);
                    } else {
                        return acc;
                    }
                }, `{}`);
                res.end(element);
            } else {
                res.end(`{}`);
            }
        });
    } else {
        res.end(`{}`);
    }
});
