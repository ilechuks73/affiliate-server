const express = require('express')
const router = express.Router()
const Client = require('../../models/Client')
const Marketer = require('../../models/Marketer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


//process client's login
router.post('/client', (req, res) => {
    const { username, email , password } = req.body
    if((!username && !email) || !password){
        return res.json({ msg: 'Please fill all fields'})
    }

    let conditions = !!username ? {username} : {email}
    Client.findOne(conditions)
    .then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exist!'})
        
        //validate password
        bcrypt.compare(password, user.password)
        .then(isMatch  => {
            if(!isMatch) return res.status(400).json({ msg: 'Password incorrect!'})

            jwt.sign(
                {id: user.id},
                config.get('jwtSecret'),
                {expiresIn: 3600},
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email  
                        }
                    })
                }
            )
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

//process marketer's login
router.post('/marketer', (req, res) => {
    const { username, email , password } = req.body
    if((!username && !email) || !password){
        return res.json({ msg: 'Please fill all fields'})
    }

    let conditions = !!username ? {username} : {email}
    Marketer.findOne(conditions)
    .then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exist!'})
        
        //validate password
        bcrypt.compare(password, user.password)
        .then(isMatch  => {
            if(!isMatch) return res.status(400).json({ msg: 'Password Incorrect!'})

            jwt.sign(
                {id: user.id},
                config.get('jwtSecret'),
                {expiresIn: 3600},
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email  
                        }
                    })
                }
            )
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

  

module.exports = router