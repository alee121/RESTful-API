///////////////////
/*
CRITICALLY IMPORTANT
THIS IS BECAUSE WE ARE USING VIRTUALBOX
TO CONNECT TO MYSQL WORKBENCH, NEED TO PUT IN ROUTER GATEWAY
router gateway = 10.0.2.2
*/
//////////////////

let mysql = require('mysql');

const con = mysql.createConnection({
  host: "10.0.2.2",
  user: "root",
  password: "Mynameisjimmy1",
  database: "mydb"
});

con.connect((err) => {
  if(err)
    throw err;
  console.log("Connected to database");
});


function getName(){
  let sql = "SELECT * FROM User";
  con.query(sql, (err,result) => {
    if(err) throw err;

    console.log("Selected all users");
  });
  return Promise.resolve("Successfully returned users");
}

function postData(){
  let user = "INSERT INTO User (FirstName, LastName, MOB, DOB, YOB, Email) VALUES ('Adrian', 'Lee', '03', '15', '1998', 'mynameisadrianlee@gmail.com')";
  con.query(user, (err,result) => {
    if(err)
      throw err;
    console.log("User has been populated");
  });

  let hobby = "INSERT INTO Hobbies (Activity, Category) VALUES ('Tennis', 'Sports')";
  con.query(hobby, (err,result) => {
    if(err) throw err;
    console.log("Hobby has been populated");
  });
  return Promise.resolve("Successfully Updated a Record");
}

function deleteUser(){
  let sql = "DELETE";
  con.query(sql, (err,result) => {
    if(err) throw err;

    console.log("Deleted User");
  });
  return Promise.resolve("Successfully Deleted User");
}

function deleteAll(){

} 


module.exports = {
  postData,
  getName 
};

