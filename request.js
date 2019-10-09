let request = require('request');

let requestBod = {
  users: "",
  hobbies: "",
  utoh: ""
};

const options = {
  url: 'localhost:4250/populate',
  method: 'POST',
  body: requestBod,
  headers: {
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8'
  }
}


request(options, (err, res, body) => {
  
}
