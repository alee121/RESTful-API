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
  password: "secret123",
  database: "mydb",
  multipleStatements: "true"
});

//Establishing connection with the data base
con.connect((err) => {
  if(err)
    throw err;
  console.log("Connected to database");
})


function getAll(){
  return new Promise((resolve,reject) => {
    let sql = "SELECT Users.FirstName, Users.LastName, Hobbies.Activity FROM Users JOIN User_to_Hobby ON Users.idUsers = User_to_Hobby.idUsers JOIN Hobbies ON Hobbies.idHobbies = User_to_Hobby.idHobbies";
    con.query(sql, (err,result,fields) => {
      if(err){
        console.log("Error selecting the users and their hobbies")
        reject({
	  message: 'Error Selecting the users and their hobbies',
	  body: err
	});
      }

      console.log("Selected Users and their Hobbies");
      resolve({
	message: 'Selected Users and their Hobbies',
        body: result
      })
    });
  });
}

function getName(){
  return new Promise((resolve,reject) => {
    let sql = "SELECT FirstName,LastName FROM Users";
    con.query(sql, (err,result,fields) => {
      if(err){
        console.log("Error Selecting all users");
        reject({
	  message: 'Error Selecting all Users',
	  body: err
	});
      }

      console.log("Selected all users");
      resolve({
	message: 'Selected all users',
	body: result
      });
    });
  });
}

function getHobbies(){
  return new Promise((resolve,reject) => {
    let sql = "SELECT Activity FROM Hobbies";
    con.query(sql, (err,result,fields) => {
      if(err){
        console.log("Error SELECTING all hobbies"); 
        reject({
	  message: 'Error Selecting all hobbies',
	  body: err
	});
      } 

      console.log("Selected all hobbies");
      resolve({
	message: 'Selected all hobbies',
	body: result
      });
    });
  });
}

////////////////////////////////////////////
/*****
	EMAIL IS UNIQUE, SO IF THE SAME USER TRIES TO INPUT TWICE, THERE WILL BE AN ERROR
	NEED TO CHECK IF THE USER IS ALREADY IN THE DATABASE. IF SO, THEN I ONLY NEED TO UPDATE
	THE USER TO HOBBIES TABLE
*****/
///////////////////////////////////////////
function postData(body){
  return new Promise((resolve,reject) => {
    const fname = body.users.fname, lname = body.users.lname, mob = body.users.mob, dob = body.users.dob, yob = body.users.yob, email = body.users.email
    let user = "INSERT INTO Users (FirstName, LastName, MOB, DOB, YOB, Email) VALUES (?,?,?,?,?,?)";
    con.query(user, [fname,lname,mob,dob,yob,email], (err,results) => {
      if(err){
        console.log("Error posting to the User table")
        reject(err);
      }
    });

    const act = body.hobbies.act, cat = body.hobbies.cat;
    let hobby = "INSERT INTO Hobbies (Activity, Category) VALUES (?,?)";
    con.query(hobby, [act,cat], (err,result) => {
      if(err){
        console.log("Error posting to the Hobbies table")
        reject(err); 
      }
    });

    //Selecting ID's from tables User and Hobby to input into the composite entity
    let uh = "INSERT INTO User_To_Hobby (idUsers,idHobbies) VALUES ((SELECT idUsers FROM Users WHERE Email=?),(SELECT idHobbies FROM Hobbies WHERE Activity=?))"; 
    con.query(uh, [email,act], (err,result) => {
      if(err){
        console.log("Error posting to the User to Hobby table")
        reject(err);
      }
    })

    resolve("Successfully Updated a Record");
  });
}

//////////////////////////////////////
/*
What if you input the wrong email? Notify the user that an incorrect email was input
*/
//////////////////////////////////////
function deleteUser(name){
  return new Promise((resolve,reject) => {
    const user = name;
    let sql = "DELETE FROM Users WHERE Email=?";
    con.query(sql, [user], (err,result) => {
      if(err || result.affectedRows == 0){
        console.log(`Error deleting user with email: ${user}`);
	if(err == null) err = new Error("Email does not exist");
        reject({
	  message: "Error deleting the user",
	  error: err.message
	});
      }

      console.log("Deleted User");
      resolve(`Successfully Deleted User with Email: ${user}`);
    });
  });
}

function deleteHobby(act){
  return new Promise((resolve,reject) => {
    const hobby = act;
    let sql = "DELETE FROM Hobbies WHERE Activity=?"; 
    con.query(sql, [hobby], (err,result) => {
      if(err || result.affectedRows  == 0){
        console.log(`Failed to delete hobby: ${hobby}`);
	if(err == null) err = new Error("Hobby does not exist");
        reject({
	  message: "Error deleting hobby",
	  error: err.message
        });
      }

      console.log("Deleted Activity");
      resolve(`Successfully Deleted Hobby: ${hobby}`);
    });
  });
}

function deleteAll(){
  return new Promise((resolve,reject) => {
    let hobbies = "DELETE FROM Hobbies";
    let users = "DELETE FROM Users";
    let u_to_h = "DELETE FROM User_to_Hobby";

    con.query(u_to_h, (err,result) => {
      if(err){
	console.log("Deleted all user to hobby relations");
        reject({
	  message: "Error deleting values from User_to_Hobby",
	  error: err
	});
      }
    });
    con.query(hobbies, (err,result) => {
      if(err){
	console.log("Deleted all hobbies")
	reject({
	  message: "Error deleting values from hobbies table",
	  error: err
	});
      }
    });
    con.query(users, (err,result) => {
      if(err){
	console.log("Deleted all users");
	reject({
	  message: "Error deleting from Users table",
	  error: err
	});
      }
    });

    console.log("Deleted all tables");
    resolve("Deleted all tables");
  });
} 


module.exports = {
  postData,
  getName,
  deleteUser,
  deleteHobby,
  deleteAll,
  getAll,
  getHobbies
};

