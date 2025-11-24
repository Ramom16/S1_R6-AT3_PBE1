const express = require('express');
const { entregasController } = require('../controllers/entregasController');

const router = express.Router();

router.get('/:idEntrega', entregasController.buscarEntrega);
router.put('/:idEntrega/status', entregasController.atualizarStatus);

module.exports = router;
