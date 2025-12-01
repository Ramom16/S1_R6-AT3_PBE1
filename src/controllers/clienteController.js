const { clienteModel } = require('../models/clienteModel');

const clienteController = {
    /**
         * Cria um novo cliente no banco de dados
         * Rota: post/produtos/
         * @async
         * @function criarCliente
         * @param {Request} req Objeto da requisição HTTP
         * @param {Response} res Objeto da resposta HTTP
         * @returns {Promise<Object>} Retorna objeto contendo as informações sobre o resultado do insert
         */
    criarCliente: async (req, res) => {
        try {
            const { nome_completo, cpf, telefone, email, enderecoCompleto } = req.body;

            // Validações básicas para criar o cliente
            if (!nome_completo || !cpf || !enderecoCompleto || !email) {
                return res.status(400).json({
                    message: "Campos obrigatórios: nome_completo, cpf, email, enderecoCompleto"
                });
            }

            // Verificar se CPF já existe
            const clienteExistente = await clienteModel.buscarPorCPF(cpf);
            if (clienteExistente.length > 0) {
                return res.status(400).json({
                    message: "CPF já cadastrado."
                });
            }

            // Insere o cliente
            const result = await clienteModel.criarClientes(
                nome_completo,
                cpf,
                telefone,
                email,
                enderecoCompleto
            );

            if (result.affectedRows === 1 && result.insertId != 0) {
                res.status(201).json({ message: 'Registro incluído com sucesso', result: result });
            } else {
                throw new Error('Ocorreu um erro ao incluir o registro');
            }

        } catch (error) {
            res.status(500).json({
                message: "Erro ao criar cliente",
                errorMessage: error.message
            });
        }
    },

    /**
         * Retorna os clientes cadastrados no banco de dados
         * Rota: get/clientes
         * @asyn
         * 
         * @param {Request} req Objeto da requisição HTTP
         * @param {Response} res Objeto da resposta HTTP
         * @returns {Promise<Array>Object>>} Conteudo com os dados da requisição
         */
    listarClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.selecionarTodosClientes();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({
                message: "Erro ao listar clientes",
                errorMessage: error.message
            });
        }
    },

    /**
         * Retorna o produto referente ao idCliente pesquisado
         * Rota: get/clientes/:idClientes
         * @asyn
         * @function buscarClientePorId
         * @param {Request} req Objeto da requisição HTTP
         * @param {Response} res Objeto da resposta HTTP
         * @returns {Promise<Array>Object>>} Conteudo com os dados da requisição
         */
    buscarClientePorId: async (req, res) => {
        try {
            const { idCliente } = req.params;

            const cliente = await clienteModel.selecionarClientePorId(idCliente);

            if (cliente.length === 0) {
                return res.status(404).json({
                    message: "Cliente não encontrado"
                });
            }

            res.status(200).json(cliente[0]);

        } catch (error) {
            res.status(500).json({
                message: "Erro ao buscar cliente",
                errorMessage: error.message
            });
        }
    },

    /**
             * Atualiza o cliente 
             * Rota: get/clientes/:idClientes
             * @asyn
             * @function atualizarCliente
             * @param {Request} req Objeto da requisição HTTP
             * @param {Response} res Objeto da resposta HTTP
             * @returns {Promise<Array>Object>>} Conteudo com os dados da requisição
             */
    atualizarCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;
            const { nome_completo, cpf, telefone, email, enderecoCompleto } = req.body;

            // Verifica se o cliente existe
            const existe = await clienteModel.selecionarClientePorId(idCliente);
            if (existe.length === 0) {
                return res.status(404).json({
                    message: "Cliente não encontrado"
                });
            }

            const resultado = await clienteModel.alterarCliente(
                nome_completo,
                cpf,
                telefone,
                email,
                enderecoCompleto,
                idCliente
            );

            res.status(200).json({
                message: "Cliente atualizado com sucesso",
                resultado
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro ao atualizar cliente",
                errorMessage: error.message
            });
        }
    },

    /**
                 * Deleta o cliente 
                 * Rota: get/clientes/:idClientes
                 * @asyn
                 * @function deletarCliente
                 * @param {Request} req Objeto da requisição HTTP
                 * @param {Response} res Objeto da resposta HTTP
                 * @returns {Promise<Array>Object>>} Conteudo com os dados da requisição
                 */
    deletarCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;

            const existe = await clienteModel.selecionarClientePorId(idCliente);

            if (existe.length === 0) {
                return res.status(404).json({
                    message: "Cliente não encontrado"
                });
            }

            await clienteModel.deleteCliente(idCliente);

            res.status(200).json({
                message: "Cliente deletado com sucesso"
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro ao deletar cliente",
                errorMessage: error.message
            });
        }
    }
};

module.exports = { clienteController };
