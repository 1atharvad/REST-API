const express = require("express");
const app = express();
const fs = require("fs");
const port = 5200;

var jsonData = {
    "name": "John",
    "address": "Los Angeles"
}

app.get('/users', (req, res) => {
    fs.readFile("./db.json", (err, data) => {
        res.end(data);
    })
});

app.get('/users/:id', (req, res) => {
    fs.readFile("./db.json", (err, data) => {
        var flag = 0;

        JSON.parse(data).forEach((element) => {
            if (element.id === parseInt(req.params.id)) {
                flag = 1;
                res.end(JSON.stringify(element, null, 2));
            }
        });
        if (flag === 0) {
            res.status(404).end("Not found at id " + req.params.id);
        }
    })
});

app.post('/users', (req, res) => {
    fs.readFile("./db.json", (err, data) => {
        var flag = 0;
        var dt = JSON.parse(data);

        dt.forEach((element, index) => {
            if (index !== element.id-1) {
                jsonData.id = index+1;
                dt.splice(index, 0, jsonData);
                flag = 1;
            }
        });
        if (flag === 0) {
            jsonData.id = dt.length+1;
            dt.splice(dt.length, 0, jsonData);
        }
        fs.writeFile("./db.json", JSON.stringify(dt, null, 2), () => {
            res.end(JSON.stringify(dt, null, 2));
        });
    })
});

app.delete('/users/:id', (req, res) => {
    fs.readFile("./db.json", (err, data) => {
        var flag = 0;
        var dt = JSON.parse(data);

        dt.forEach((element, index) => {
            if (element.id === parseInt(req.params.id)) {
                dt.splice(index, 1);
                flag = 1;
            }
        });
        if (flag === 1) {
            fs.writeFile("./db.json", JSON.stringify(dt, null, 2), () => {
                res.end(JSON.stringify(dt, null, 2));
            });
        } else {
            res.status(404).end("Not found at id " + req.params.id);
        }
    })
});

app.put('/users/:id', (req, res) => {
    fs.readFile("./db.json", (err, data) => {
        var flag = 0;
        var dt = JSON.parse(data);

        dt.forEach((element, index) => {
            if (element.id === parseInt(req.params.id)) {
                dt.splice(index, 1, jsonData);
                flag = 1;
            }
        });
        if (flag === 0) {
            jsonData.id = parseInt(req.params.id);
            dt.splice(dt.length, 0, jsonData);
        }
        fs.writeFile("./db.json", JSON.stringify(dt, null, 2), () => {
            res.end(JSON.stringify(dt, null, 2));
        });
    })
});

app.patch('/users/:id', (req, res) => {
    fs.readFile("./db.json", (err, data) => {
        var flag = 0;
        var dt = JSON.parse(data);

        dt.forEach((element, index) => {
            if (element.id === parseInt(req.params.id)) {
                Object.keys(jsonData).forEach((key) => {
                    dt[index][key] = jsonData[key];
                });
                flag = 1;
            }
        });
        if (flag === 1) {
            fs.writeFile("./db.json", JSON.stringify(dt, null, 2), () => {
                res.end(JSON.stringify(dt, null, 2));
            });
        } else {
            res.status(404).end("Not found at id " + req.params.id);
        }
    })
});

app.listen(port, () => {
    console.log("Listening at port: " + port);
});
