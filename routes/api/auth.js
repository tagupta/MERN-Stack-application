const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
const config = require('config');
const jwt = require('jsonwebtoken');
//User Model
const User = require('../../models/User');

// @route  POST api/auth
// @desc   auth user
// @access Public

router.post('/' , (req, res) =>{
   const { email, password } = req.body;
   //Simple validations
   if(!email || !password){
     return res.status(400).json({msg: 'Please enter all fields'});
   }

    User.findOne({email})
       .then(user => {
        if(!user) return res.status(400).json({msg: 'User does not exist'});

        // Validating password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

            jwt.sign(
                {id: user.id},
                config.get('jwtSecret'),
                {expiresIn: 3600},
                (err,token) => {
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
       })   
});



module.exports = router;
