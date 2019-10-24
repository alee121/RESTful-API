let express = require('express');
let sql     = require('./controller/sql.js');

const router = express.Router();

//Get all users and the hobbies they are interested in
router.get('/info', async (req,res) => {
  var response = await sql.getAll()
  .then((response) => {
    res.status(200).json({
      message: response
    });
  })
  .catch(err => {
    res.status(401).json({
      error: err
    })
  })
})

//Get all the users names from the database
router.get('/users', async (req,res) => {
  var response = await sql.getName()
  .then((response) => {
    res.status(200).json({
      message: response
    });
  })
  .catch(err => {
    res.status(401).json({
      error: err
    })
  })
});

//Get the hobbies of user
router.get('/hobbies', async (req,res) => {
  var response = await sql.getHobbies()
  .then((response) => {
    res.status(200).json({
      message: response
    });
  })
  .catch(err => {
    res.status(401).json({
      error: err
    })
  })
});

//Update all using the body of the packet sent
router.post('/populate', async (req,res) => {
  let body = req.body
  var response = await sql.postData(body)
  .then((response) => {
    res.status(200).json({
      message: response
    });
  })
  .catch(err => {
    res.status(401).json({
      error: err
    })
  })
});

//delete user from the Users table
router.delete('/user/:email', async (req,res) => {
  var email = req.params.email;
  var response = await sql.deleteUser(email)
  .then((response) => {
    res.status(200).json({
      message: response
    });
  })
  .catch(err => {
    res.status(401).json({
      error: err
    })
  })
});

//Deleting hobby from the Hobbies table
router.delete('/hobby/:activity', async (req,res) => {
  var hobby = req.params.activity;
  var response = await sql.deleteHobby(hobby)
  .then((response) => {
    res.status(200).json({
      message: response
    });
  })
  .catch(err => {
    res.status(401).json({
      error: err
    })
  })
});

//Delete everything in the tables in the schema
router.delete('/deleteAll', async (req,res) => {
  var response = await sql.deleteAll()
  .then((response) => {
    res.status(200).json({
      message: response
    });
  })
  .catch(err => {
    res.status(401).json({
      error: err
    })
  })
});

router.use((req,res) => {
  res.status(404).json({
    error: 'PATH NOT FOUND'
  });
});

module.exports = router;
