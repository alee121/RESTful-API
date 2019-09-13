let express = require('express');
<<<<<<< HEAD
let sql     = require('./controller/sql.js');

const router = express.Router();

//Get the users' names and the hobbies they enjoy but no other sensitive personal information
router.get('/info', (req,res) => {
  res.send("Getting users and hobbies to corresponding users");
=======

const router = express.Router();

//Get the users' names
router.get('/users', (req,res) => {
  res.send("Getting users' names");
})

//Get the hobbies of user
router.get('/hobbies', (req,res) => {
  res.send('Getting hobbies of users');
>>>>>>> e06f5b49579d01e84d6570175f616393a7d7c3b1
})

//Post name to SQL
// MAYBE SEND BODY OF USER NAME AND HOBBY AT ONCE????
router.post('/user/:name', (req,res) => {
  var name = req.params.name;
  res.send('Posting user name ' + name);
})

//sending hobby or hobbies designated user see above
router.post('/hobby/:hobby', (req,res) => {
  res.send('Posting hobby for user');
})

<<<<<<< HEAD
//Update all using the body of the packet sent
router.post('/populate', (req,res) => {

})

=======
>>>>>>> e06f5b49579d01e84d6570175f616393a7d7c3b1
//delete name or hobby
router.delete('/user/:name', (req,res) => {
  var name = req.params.name;
  res.send('deleting a user ' + name);
})

router.delete('/hobby/:activity', (req,res) => {
  res.send('deleting hobby' + req.params.activity);
})

<<<<<<< HEAD
//Delete everything in the tables in the schema
router.delete('/deleteAll', (req,res) => {

})

=======
>>>>>>> e06f5b49579d01e84d6570175f616393a7d7c3b1
router.all('/', (req,res) => {
  res.status(404).send({
    message: 'ERROR, PATH NOT FOUND'
  })
});

module.exports = router;
