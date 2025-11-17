const pool = require('../config/db');

const pedidoModel = {
    insertItem: async (pIdPedido, pIdProduto, pQuantidadeItem, pValorItem) => {
        try {
            const connection = await pool.getConnection();
            await connection.beginTransaction();
            //insert 1 - tabela pedidos 
            const sqlPedido = 'INSERT INTO pedidos (idCliente_fk, dataPedido, tipoEntrega, distanciaKm, pesoKg, valorBaseKm, valorBaseKg) VALUES (?,?,?,?,?,?,?);'
            const valuesPedido = [pIdCliente, pQuantidadeItem * pValorItem, pDataPedido];
            const [rowsPedido] = await connection.query(sqlPedido, valuesPedido);

            connection.commit();

            return { rowsPedido, rowsItem }
        } catch (error) {
            connection.rollback();
            throw error;
        }
    }
};

module.exports = { pedidoModel };