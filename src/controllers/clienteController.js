const { clienteModel } = require('../models/clienteModel');

const clienteController = {

    criarCliente: async (req, res) => {
        try {
            const { nome_completo, cpf, telefone, email, enderecoCompleto } = req.body;

            // Validações básicas
            if (!nome_completo || !cpf || !enderecoCompleto) {
                return res.status(400).json({
                    message: "Campos obrigatórios: nome_completo, cpf, enderecoCompleto"
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

            res.status(201).json({
                message: "Cliente criado com sucesso",
                idCliente: result.insertId
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro ao criar cliente",
                errorMessage: error.message
            });
        }
    },


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
