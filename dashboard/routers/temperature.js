const express = require('express');

const router = new express.Router();
const { status } = require('../helper/monitor');

router
    .route('')
    .get((req, res, next) => {
        status('/temperature', (temperature_list) => {
            if (temperature_list) {
                return res.render('temperature.html', {temperature_list: temperature_list});
            } else {
                return res.send('NOT FOUND');
            }
        });
    });


module.exports = router;