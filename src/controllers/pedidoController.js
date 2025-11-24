const { pedidoModel } = require('../models/pedidoModel');
const { entregasModel } = require('../models/entregasModel');
const calculo = require('../services/calculoEntrega');

const pedidoController = {
    criarPedido: async (req, res) => {
        try {
            const { idCliente, dataPedido, tipoEntrega, distanciaKm, pesoKg, valorBaseKm, valorBaseKg } = req.body;

            if (!idCliente || !dataPedido || !tipoEntrega || !distanciaKm || !pesoKg || !valorBaseKm || !valorBaseKg) {
                return res.status(400).json({ message: 'Dados incompletos' });
            }

            const pedidoInserido = await pedidoModel.criarPedido(
                idCliente, dataPedido, tipoEntrega,
                distanciaKm, pesoKg, valorBaseKm, valorBaseKg
            );

            const pedidoCriado = await pedidoModel.buscarPedidoPorId(pedidoInserido.insertId);

            const calculoEntrega = calculo.calcularEntrega(pedidoCriado);

            const entregaRegistrada = await entregasModel.registrarEntrega(
                pedidoInserido.insertId,
                calculoEntrega
            );

            res.status(201).json({
                message: 'Pedido e entrega registrados com sucesso',
                pedido: pedidoCriado,
                entrega: entregaRegistrada,
                calculo: calculoEntrega
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno no servidor',
                errorMessage: error.message
            });
        }
    }
};

module.exports = { pedidoController };
