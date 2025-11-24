const express = require('express');
const router = express.Router();

const clienteRoutes = require('./clienteRoutes');
const entregaRoutes = require('./entregaRoutes');
const pedidoRoutes = require('./pedidoRoutes');

router.use('/', clienteRoutes);
router.use('/', entregaRoutes);
router.use('/', pedidoRoutes);

module.exports = router;
