const express = require('express');
const { entregasController } = require('../controllers/entregasController');

const router = express.Router();

router.get('/entregas', entregasController.listarEntregas);
router.get('/entregas/:idEntrega', entregasController.buscarEntrega);
router.put('/entregas/status/:idEntrega', entregasController.atualizarStatus);

module.exports = router;
