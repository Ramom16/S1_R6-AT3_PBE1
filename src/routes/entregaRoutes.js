const express = require('express');
const { entregaController } = require('../controllers/entregaController');

const router = express.Router();


router.get('/:idEntrega', entregaController.buscarEntrega);
router.put('/:idEntrega/status', entregaController.atualizarStatus);

module.exports = router;
