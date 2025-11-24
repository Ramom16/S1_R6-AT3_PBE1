const { entregasModel } = require('../models/entregasModel');

const entregasController = {

    async buscarEntrega(req, res) {
        try {
            const id = req.params.idEntrega;
            const entrega = await entregasModel.buscarEntrega(id);

            if (!entrega) {
                return res.status(404).json({ mensagem: "Entrega não encontrada" });
            }

            res.json(entrega);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async atualizarStatus(req, res) {
        try {
            const id = req.params.idEntrega;
            const { status } = req.body;

            const resultado = await entregasModel.atualizarStatus(id, status);
            res.json(resultado);

        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};

module.exports = { entregasController };
