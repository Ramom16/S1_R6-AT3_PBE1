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
    },
    buscarTodasEntregas: async (req, res) => {
        try {
            const resultado = await entregasModel.selecionarTodasEntregas();
            console.log(resultado)
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });
            }
            res.status(200).json({ message: 'Resultado dos dados listados', data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
        }
    }
};

module.exports = { entregasController };
