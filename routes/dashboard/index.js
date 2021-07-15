const express = require('express')
const router = express.Router()
const Client = require('../../models/Client')
const Marketer = require('../../models/Marketer')
const auth = require('../../middleware/auth')

router.get('/client', auth, (req, res) => {
    Client.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
});

router.get('/marketer', auth, (req, res) => {
    Marketer.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
});

module.exports = router;