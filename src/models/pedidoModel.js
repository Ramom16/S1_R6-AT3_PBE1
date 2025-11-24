const pool = require('../config/db');

const pedidoModel = {
    /**
 * Insere um novo pedido no banco de dados.
 * Este método utiliza transações para garantir consistência dos dados.
 *
 * @async
 * @function criarPedido
 * @param {number} pIdCliente - ID do cliente relacionado ao pedido.
 * @param {string} pDataPedido - Data de criação do pedido (YYYY-MM-DD).
 * @param {string} pTipo - Tipo de entrega (ex: "rápida", "normal").
 * @param {number} pDistancia - Distância total em quilômetros.
 * @param {number} pPeso - Peso total da carga em kg.
 * @param {number} pValorKm - Valor base por quilômetro.
 * @param {number} pValorKg - Valor base por kg.
 * @returns {Promise<Object>} Retorna o objeto contendo as informações da inserção (insertId, affectedRows, etc).
 *
 * @example
 * const resultado = await pedidoModel.criarPedido(
 *   1,
 *   "2025-01-10",
 *   "rápida",
 
 * );
 *
 * // Saída esperada:
 * {
 *   "fieldCount": 0,
 *   "affectedRows": 1,
 *   "insertId": 15,
 *   "info": "",
 *   "serverStatus": 2,
 *   "warningStatus": 0,
 *   "changedRows": 0
 * }
 */
    criarPedido: async (pIdCliente, pDataPedido, pTipo, pDistancia, pPeso, pValorKm, pValorKg) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const sql = `
                INSERT INTO pedidos 
                (idCliente_fk, dataPedido, tipoEntrega, distanciaKm, pesoKg, valorBaseKm, valorBaseKg)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [pIdCliente, pDataPedido, pTipo, pDistancia, pPeso, pValorKm, pValorKg];

            const [rows] = await connection.query(sql, values);
            await connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    },
    /**
     * Busca um pedido pelo ID.
     *
     * @async
     * @function buscarPedidoPorId
     * @param {number} id - ID do pedido a ser consultado.
     * @returns {Promise<Object|null>} Retorna um objeto com os dados do pedido encontrado,
     * ou null caso não exista.
     *
     * @example
     * const pedido = await pedidoModel.buscarPedidoPorId(10);
     *
     * // Saída:
     * {
     *   "idPedidos": 10,
     *   "idCliente_fk": 1,
     *   "dataPedido": "2025-01-10T00:00:00.000Z",
     *   "tipoEntrega": "rápida",
     *   "distanciaKm": 12.5,
     *   "pesoKg": 3.2,
     *   "valorBaseKm": 2.5,
     *   "valorBaseKg": 1.75
     * }
     */
    buscarPedidoPorId: async (idPedidos) => {
        const sql = 'SELECT * FROM pedidos WHERE idPedidos = ?';
        const [rows] = await pool.query(sql, [idPedidos]);
        return rows[0];
    }
};

module.exports = { pedidoModel };
