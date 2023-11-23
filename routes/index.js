var express = require('express');
var router = express.Router();
const { login } = require('../helpers/userHelper')

const verifyLogin = (req, res, next) => {
  if (req.session.status) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/', verifyLogin, (req, res) => {
  res.set('Cache-Control', 'no-store')
  res.render('index')

})
router.get('/login', (req, res) => {

  if (!req.session.status) {
    console.log(req.session.status);
    if (req.session.loginError)
      var loginError = "User name or password is incorrect"

    req.session.loginError = false
    res.set('Cache-Control', 'no-store')
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

      res.redirect('/')
    }
    else {
      req.session.loginError = true
      res.redirect('/login')
    }

  })


})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})
module.exports = router;
