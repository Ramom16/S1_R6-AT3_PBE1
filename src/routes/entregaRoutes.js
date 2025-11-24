const express = require('express');
const { entregasController } = require('../controllers/entregasController');

const router = express.Router();

router.get('/entregas/:idEntrega', entregasController.buscarEntrega);
router.put('/entregas/:idEntrega/status', entregasController.atualizarStatus);
router.get('/entregas', entregasController.listarEntregas);

module.exports = router;
