let express = require('express');
let sql     = require('./controller/sql.js');

const router = express.Router();

//Get the users' names and the hobbies they enjoy but no other sensitive personal information
router.get('/info', async (req,res) => {
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
router.get('/users', (req,res) => {
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
router.delete('/user/:name', (req,res) => {
  var name = req.params.name;
  res.send('deleting a user ' + name);
});

router.delete('/hobby/:activity', (req,res) => {
  res.send('deleting hobby' + req.params.activity);
});

//Delete everything in the tables in the schema
router.delete('/deleteAll', (req,res) => {

});

router.all('/', (req,res) => {
  res.status(404).send({
    message: 'ERROR, PATH NOT FOUND'
  });
});

module.exports = router;
