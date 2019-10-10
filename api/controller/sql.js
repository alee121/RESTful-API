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
  database: "mydb",
  multipleStatements: "true"
});

con.connect((err) => {
  if(err)
    throw err;
  console.log("Connected to database");
});

function getAll(){

}

function getName(){
  let sql = "SELECT FirstName,LastName FROM Users";
  con.query(sql, (err,result,fields) => {
    if(err) throw err;

    console.log("Selected all users");
    console.log(result);
  });
  return Promise.resolve('Returning all users');
}

function getHobbies(){

}

function postData(body){
  const fname = body.users.fname, lname = body.users.lname, mob = body.users.mob, dob = body.users.dob, yob = body.users.yob, email = body.users.email
  console.log(fname + lname + mob + dob + yob + email)
  let user = "INSERT INTO Users (FirstName, LastName, MOB, DOB, YOB, Email) VALUES (?,?,?,?,?,?)";
  con.query(user, [fname,lname,mob,dob,yob,email], (err,results) => {
    if(err){
      console.log("Error posting to the User table")
      return Promise.reject(err);
    }
  });

  const act = body.hobbies.act, cat = body.hobbies.cat;
  let hobby = "INSERT INTO Hobbies (Activity, Category) VALUES (?,?)";
  con.query(hobby, [act,cat], (err,result) => {
    if(err){
      console.log("Error posting to the Hobbies table")
      return Promise.reject(err); 
    }
  });

  let uh = "INSERT INTO User_To_Hobby (idUsers) VALUES ((SELECT idHobbies FROM Hobbies WHERE Activity=?),(SELECT idUsers FROM Users WHERE Email=?))"; 
  con.query(uh, [email,act], (err,result) => {
    if(err){
      console.log("Error posting to the User to Hobby table")
      return Promise.reject(err);
    }
  })

  return Promise.resolve("Successfully Updated a Record");
}

function deleteUser(user){
  let sql = "DELETE FROM Users WHERE Email=" +"'"+user+"'";
  con.query(sql, (err,result) => {
    if(err) throw err;

    console.log("Deleted User");
  });
  return Promise.resolve("Successfully Deleted User");
}

function deleteHobby(hobby){
  let sql = "DELETE FROM Hobbies WHERE Activity=" +"'"+hobby+"'";
  con.query(sql, (err,result) => {
    if(err) throw err;

    console.log("Deleted Activity");
  });
  return Promise.resolve("Successfully Deleted Hobby");
}

function deleteAll(){
  let hobbies = "DELETE FROM Hobbies";
  let users = "DELETE FROM Users";
  //let u_to_h = "DELETE FROM User_to_Hobby";

  con.query(hobbies, (err,result) => {
    if(err) throw err;
    console.log("Deleted the table Hobbies");
  });
  con.query(users, (err,result) => {
    if(err) throw err;
    console.log("Deleted the table Users");
  });
  //con.query(u_to_h, (err,result) => {
  //  if(err) throw err;
  //  console.log("Deleted the table Users_to_Hobby");
  //});

  return Promise.resolve("Deleted all tables");
} 


module.exports = {
  postData,
  getName,
  deleteUser,
  deleteHobby,
  deleteAll
};

