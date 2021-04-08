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

router.get('/obtenerOrden', (req, res) => {
    cnn_mysql.query('SELECT * FROM orden', (err, resultSet) => {
        if (err) {
            return res.status(500).send("Database error");
        } else {
            return res.json(resultSet);
        }
    })
});

router.delete(`/eliminarOrden/:numOrden`, (req, res)=>{
    const {numOrden} = req.params;
    console.log("id database: ",numOrden)
    cnn_mysql.query("DELETE FROM orden WHERE `numOrden` = ?", numOrden, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    });
    console.log("eliminado");
})

//agregar numero de orden
router.post("/addNumOrden", (req, res) => {
    cnn_mysql.query("INSERT INTO `numOrden`(`orden`) VALUES (0)", (err, resultSet) => {
        if (err) {
            return res.status(500).send("Database error");
        }
        else {
            console.log("num orden enviado")
            return res.json(resultSet)
        }
    })
});

router.post("/addReport", async (req, res) => {
    const { orden, nombre, articulo, cantidad, subtotal } = req.body;
    const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO orden(numOrden, nombre, fecha, articulo, cantidad, subtotal) VALUES (?,?,CURRENT_TIMESTAMP,?,?,?)`, [orden,nombre,articulo,cantidad,subtotal]);

    if (rows.affectedRows > 0) {
        res.json({
            orden: orden, nombre: nombre, articulo: articulo, cantidad: cantidad, subtotal: subtotal 
        })
    } else {
        res.json({})
    }
    console.log("agregado");
});

router.get('/subtotal', (req, res) => {
    cnn_mysql.query('SELECT subtotal FROM orden', (err, resultSet) => {
        if (err) {
            return res.status(500).send("Database error");
        } else {
            return res.json(resultSet);
        }
    })
});

router.post("/addReportTotal", async (req, res) => {
    const {subtotal, iva, total } = req.body;
    const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO ordenTotal(subtotal, iva, total) VALUES (?,?,?)`, [subtotal,iva,total]);

    if (rows.affectedRows > 0) {
        res.json({
            subtotal: subtotal, iva: iva, total: total
        })
    } else {
        res.json({})
    }
    console.log("total agregado");
});

router.get('/total', (req, res) => {
    cnn_mysql.query('SELECT * FROM ordenTotal', (err, resultSet) => {
        if (err) {
            return res.status(500).send("Database error");
        } else {
            return res.json(resultSet);
        }
    })
});

module.exports = router;