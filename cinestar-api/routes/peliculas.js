const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');

// Todas las películas
router.get('/', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request()
    .query('SELECT id, Titulo, FechaEstreno, Director, Generos, idClasificacion, idEstado, Duracion, Link FROM Pelicula ORDER BY id');
    res.json(result.recordset);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener películas' });
}
});

// Detalle de una película por id
router.get('/:id', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .execute('sp_getPelicula');
    const data = result.recordset || [];
    if (data.length === 0) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(data[0]);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener la película' });
}
});

router.get('/estado/:estado', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('idEstado', sql.Int, req.params.estado)
    .execute('sp_getPeliculas');
    res.json(result.recordset || []);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener películas por estado' });
}
});

module.exports = router;
