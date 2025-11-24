const express = require('express');
const { clienteController } = require('../controllers/clienteController');

const router = express.Router();


router.post('/', clienteController.criarCliente);
router.get('/', clienteController.listarClientes);
router.get('/:idCliente', clienteController.buscarClientePorId);
router.put('/:idCliente', clienteController.atualizarCliente);
router.delete('/:idCliente', clienteController.deletarCliente);

module.exports = router;
