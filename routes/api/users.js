const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
const config = require('config');
const jwt = require('jsonwebtoken');
//User Model
const User = require('../../models/User');

// @route  POST api/users
// @desc   Regiater new users
// @access Public

router.post('/' , (req, res) =>{
   const { name, email, password } = req.body;
   //Simple validations
   if(!name || !email || !password){
     return res.status(400).json({msg: 'Please enter all fields'});
   }

    User.findOne({email})
       .then(user => {
        if(user) return res.status(400).json({msg: 'User already exists'});

        const newUser = new User({
            name,
            email,
            password
        });

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err) throw err;
            // hash the password using our new salt
            bcrypt.hash(newUser.password, salt, (err, hash)=> {
                if (err) throw err;
                // override the cleartext password with the hashed one
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            {id: user.id}, //payoad
                            config.get('jwtSecret'), //secret
                            {expiresIn: 3600}, //expiration
                            (err, token) => { //callback
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                })
                            }
                        )
                    })
        });
});
       })   
});


module.exports = router;
