const express = require('express');
const router = express.Router();


const clienteRoutes = require('./clienteRoutes');
const entregaRoutes = require('./entregaRoutes');
const pedidoRoutes = require('./pedidoRoutes');


router.use('/clientes', clienteRoutes);
router.use('/entregas', entregaRoutes);
router.use('/pedidos', pedidoRoutes);

module.exports = router;
