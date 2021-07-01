const express = require('express');
const app = express();

app.use(express.static('./dist'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/'}),
);
var _port = process.env.PORT || 8080;
app.listen(_port);
console.log("-> Server started : " + _port);
//
