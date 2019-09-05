let express = require('express');
let http = require('http');
let bodyparser = require('body-parser');
let routes = require('./api/routes');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use('/routes',routes);

const port = 4250;

const server = http.createServer(app);
server.listen(port);

