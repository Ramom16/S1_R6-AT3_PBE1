const express = require('express');
const { pedidoController } = require('../controllers/pedidoController');

const router = express.Router();

router.post('/', pedidoController.criarPedido);

module.exports = router;
