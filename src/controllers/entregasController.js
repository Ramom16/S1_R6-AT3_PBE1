const { entregaModel } = require('../models/entregaModel');

const entregaController = {

    atualizarStatus: async (req, res) => {
        try {
            const { idEntrega } = req.params;
            const { novoStatus } = req.body;

            if (!novoStatus) {
                return res.status(400).json({ message: "Informe o novo status." });
            }

            const result = await entregaModel.atualizarStatus(idEntrega, novoStatus);

            res.status(200).json({
                message: "Status atualizado com sucesso",
                result
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro ao atualizar status",
                error: error.message
            });
        }
    },

    buscarEntrega: async (req, res) => {
        try {
            const { idEntrega } = req.params;

            const entrega = await entregaModel.buscarEntrega(idEntrega);

            if (!entrega) {
                return res.status(404).json({ message: "Entrega não encontrada." });
            }

            res.status(200).json(entrega);

        } catch (error) {
            res.status(500).json({
                message: "Erro ao buscar entrega",
                error: error.message
            });
        }
    }
};

module.exports = { entregaController };
