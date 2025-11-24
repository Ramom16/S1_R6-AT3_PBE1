const express = require('express');
const { entregasController } = require('../controllers/entregasController');

const router = express.Router();

router.get('/entregas', entregasController.listarEntregas);
router.get('/entregas/:idEntrega', entregasController.buscarEntrega);
router.put('/entregas/:idEntrega/status', entregasController.atualizarStatus);

module.exports = router;
