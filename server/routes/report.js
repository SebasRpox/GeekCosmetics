const { Router } = require('express');
const { cnn_mysql } = require('../database/db');
const router = Router();

router.get('/articulos', (req, res) => {
    cnn_mysql.query('SELECT * FROM articulos', (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Se presento un error en la base de datos");
        } else {
            //console.log("articulos recibidos")
            return res.json(resultset);
        }
    })
});

router.get('/numOrden', (req, res) => {
    cnn_mysql.query('SELECT * FROM numOrden', (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Se presento un error en la base de datos");
        } else {
            //console.log("orden recibida")
            return res.json(resultset);
        }
    })
});

module.exports = router;