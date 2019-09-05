let express = require('express');

const router = express.Router();

//Get the users' names
router.get('/users', (req,res) => {
  res.send("Getting users' names");
})

//Get the hobbies of user
router.get('/hobbies', (req,res) => {
  res.send('Getting hobbies of users');
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

//delete name or hobby
router.delete('/user/:name', (req,res) => {
  var name = req.params.name;
  res.send('deleting a user ' + name);
})

router.delete('/hobby/:activity', (req,res) => {
  res.send('deleting hobby' + req.params.activity);
})

router.all('/', (req,res) => {
  res.status(404).send({
    message: 'ERROR, PATH NOT FOUND'
  })
});

module.exports = router;
