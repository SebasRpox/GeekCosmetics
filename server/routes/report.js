const { Router } = require('express');
const { cnn_mysql } = require('../database/db');
const router = Router();

//obtener datos de los articulos
router.get('/articulos', (req, res) => {
    cnn_mysql.query('SELECT * FROM articulos', (err, resultSet) => {
        if (err) {
            return res.status(500).send("Database error");
        } else {
            //console.log("articulos recibidos")
            return res.json(resultSet);
        }
    })
});

//obtener numero de orden
router.get('/numOrden', (req, res) => {
    cnn_mysql.query('SELECT * FROM numOrden', (err, resultSet) => {
        if (err) {
            return res.status(500).send("Database error");
        } else {
            return res.json(resultSet);
        }
    })
});

//agregar numero de orden
router.post("/addNumOrden", (req, res) => {
    cnn_mysql.query("INSERT INTO `numOrden`(`orden`) VALUES (0)", (err, resultSet) => {
        if(err){
            return res.status(500).send("Database error");
        }
        else{
            console.log("num orden enviado")
            return res.json(resultSet)
        }
    })
})

module.exports = router;