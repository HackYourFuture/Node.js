const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.post('/weather', (req, res) =>{
    const cityName = req.body.cityName;
    res.send(cityName);
})

module.exports =router;