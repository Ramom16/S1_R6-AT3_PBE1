const { entregasModel } = require('../models/entregasModel');

const entregasController = {
    /**
             * Retorna o produto referente ao idEntregas pesquisado
             * Rota: get/entregas
             * @asyn
             * @function buscarEntrega
             * @param {Request} req Objeto da requisição HTTP
             * @param {Response} res Objeto da resposta HTTP
             * @returns {Promise<Array>Object>>} Conteudo com os dados da requisição
             */
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
    /**
                 * Atualiza os status da Entrega
                 * Rota: get/entregas/:idEntrega/status
                 * @asyn
                 * @function buscarEntrega
                 * @param {Request} req Objeto da requisição HTTP
                 * @param {Response} res Objeto da resposta HTTP
                 * @returns {Promise<Array>Object>>} Conteudo com os dados da requisição
                 */
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
    /**
         * Retorna as Entregas cadastrados no banco de dados
         * Rota: get/entregas/:idEntrega
         * @asyn
         * 
         * @param {Request} req Objeto da requisição HTTP
         * @param {Response} res Objeto da resposta HTTP
         * @returns {Promise<Array>Object>>} Conteudo com os dados da requisição
         */
    listarEntregas: async (req, res) => {
        try {
            const entregas = await entregasModel.selecionarTodasEntregas();
            res.status(200).json(entregas);
        } catch (error) {
            res.status(500).json({
                message: "Erro ao listar entregas",
                errorMessage: error.message
            });
        }
    },
};

module.exports = { entregasController };
