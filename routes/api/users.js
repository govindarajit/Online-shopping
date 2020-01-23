const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// User Model
const User = require('../../models/User');

// POST api/users
// Register new user
 
router.post('/', (req, res) => {
  const { name, email, password,mobile  } = req.body;

  // Simple validation for the signUp
  if(!name || !email || !password ||!mobile ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // we are Checking if the user is existing by using email
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        name,
        email,
        password ,
        mobile
      });

      // Creating salt and hashing
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email ,
                      mobile:user.mobile
                    }
                  });
                }
              )
            });
        })
      })
    })
});

module.exports = router;
