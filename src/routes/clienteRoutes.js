const express = require('express');
const { clienteController } = require('../controllers/clienteController');

const router = express.Router();

router.post('/clientes', clienteController.criarCliente);
router.get('/clientes', clienteController.listarClientes);
router.get('/clientes/:idCliente', clienteController.buscarClientePorId);
router.put('/clientes/:idCliente', clienteController.atualizarCliente);
router.delete('/clientes/:idCliente', clienteController.deletarCliente);

module.exports = router;
