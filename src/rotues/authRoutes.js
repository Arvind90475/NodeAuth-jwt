const express = require('express');
const router = express.Router();








router.post('/signup', (req, res) => {
    res.send('Heello');
    ;
})

router.get('/signup', (req, res) => {
    res.send('Heello');
    ;
})



module.exports = router;