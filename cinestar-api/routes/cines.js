const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');

router.get('/', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request().execute('sp_getCines');
    res.json(result.recordset || []);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cines' });
}
});

router.get('/:id', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .execute('sp_getCine');
    const data = result.recordset || [];
    if (data.length === 0) return res.status(404).json({ message: 'Cine no encontrado' });
    res.json(data[0]);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cine' });
}
});

router.get('/:id/tarifas', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('idCine', sql.Int, req.params.id)
    .execute('sp_getCineTarifas');
    res.json(result.recordset || []);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tarifas' });
}
});

router.get('/:id/peliculas', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('idCine', sql.Int, req.params.id)
    .execute('sp_getCinePeliculas');
    res.json(result.recordset || []);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener películas del cine' });
}
});

module.exports = router;
