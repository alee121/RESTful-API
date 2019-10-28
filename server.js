let express = require('express');
let http = require('http');
let bodyparser = require('body-parser');
let morgan = require('morgan');
const routes = require('./api/routes.js');
require('dotenv').config();

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(morgan('combined'));

app.use('/',routes);

const port = process.env.PORT;

const server = http.createServer(app);
server.listen(port, process.env.HOST, () => {
  console.log("Server is up and running");
});

