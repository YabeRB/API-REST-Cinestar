require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); 
const cors = require('cors');    

const peliculasRouter = require('./routes/peliculas');
const cinesRouter = require('./routes/cines');

const app = express();

app.use(express.json());
app.use(cors());      
app.use(morgan('dev')); 

app.get('/', (req, res) => {
    res.json({
    status: 'OK',
    message: 'Cinestar API funcionando 🚀',
    endpoints: {
    peliculas: '/api/peliculas',
    cines: '/api/cines'
    }
});
});

// Rutas principales
app.use('/api/peliculas', peliculasRouter);
app.use('/api/cines', cinesRouter);

app.use((req, res) => {
    res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
});
});

// Manejo de errores del servidor
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
    error: 'Error interno en el servidor',
    details: err.message
});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
