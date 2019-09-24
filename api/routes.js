let express = require('express');
let sql     = require('./controller/sql.js');

const router = express.Router();

//Get the users' names and the hobbies they enjoy but no other sensitive personal information
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

//Get the all users' name from database
router.get('/info', (req,res) => {
  res.send("Getting users' names");
});

//Get the hobbies of user
router.get('/hobbies', (req,res) => {
  res.send('Getting hobbies of users');
});

//Update all using the body of the packet sent
router.post('/populate', async (req,res) => {
  var response = await sql.postData()
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

//delete name or hobby
router.delete('/email/:name', async (req,res) => {
  var name = req.params.name;
  var response = await sql.deleteUser(name)
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

router.all('/', (req,res) => {
  res.status(404).send({
    message: 'ERROR, PATH NOT FOUND'
  });
});

module.exports = router;
