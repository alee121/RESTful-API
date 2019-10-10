//need to relook over body, the first argument cant be a string???
//change maybe from JSON format to something else or convert to buffer else from JSON 

let request = require('request');

let requestBod = {
  "users": {
    "fname" : "Adrian",
    "lname" : "Lee",
    "mob" : "03",
    "dob" : "15",
    "yob" : "1998",
    "email" : "mynameisadrianlee315@gmail.com"
  },
  "hobbies": {
    "act" : "Tennis",
    "cat" : "Sport"
  }
};

bod = JSON.stringify(requestBod);

const options = {
  uri: 'http://localhost:4250/populate',
  method: 'POST',
  body: bod,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8'
  }
}

request(options, (err, res, body) => {
  if(!err && res.StatusCode == 200) {
    console.log(body.id);
  } 
});
