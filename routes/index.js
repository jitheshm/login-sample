var express = require('express');
var router = express.Router();
const { login } = require('../helpers/userHelper')



/* GET home page. */
router.get('/login', (req, res) => {
 
  if (!req.session.status) {
    console.log(req.session.status);
    if (req.session.loginError)
      var loginError = "User name or password is incorrect"

    req.session.loginError = false
    res.render('login', { title: 'Login-Sample', loginError });
  }
  else {
    res.redirect("/")
  }
});


router.post('/login', (req, res) => {
  // console.log(req.body);
  login(req.body).then((result) => {
    console.log(result);
    if (result.status) {
      req.session.user = req.body.User
      req.session.status = true
      // console.log(req.session.status);

      res.json("success")
    }
    else {
      req.session.loginError = true
      res.redirect('/login')
    }

  })


})
module.exports = router;
