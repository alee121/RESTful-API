let express = require('express');
let http = require('http');
let bodyparser = require('body-parser');
let morgan = require('morgan');
const routes = require('./api/routes.js');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(morgan('combined'));

app.use('/',routes);

const port = 4250;

const server = http.createServer(app);
server.listen(port, 'localhost', () => {
  console.log("Server is up and running");
});

