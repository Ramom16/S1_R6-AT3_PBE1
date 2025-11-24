const pool = require('../config/db');

const entregasModel = {

    /**
     * Registra uma entrega no banco de dados vinculada a um pedido.
     * O cálculo da entrega (valorDistancia, valorPeso, taxa, etc) já deve vir pronto.
     *
     * @async
     * @param {number} idPedido - ID do pedido vinculado
     * @param {Object} dadosEntrega - Objeto contendo os valores calculados da entrega
     * @param {number} dadosEntrega.valorDistancia
     * @param {number} dadosEntrega.valorPeso
     * @param {number} dadosEntrega.acrescimo
     * @param {number} dadosEntrega.desconto
     * @param {number} dadosEntrega.taxaExtra
     * @param {number} dadosEntrega.valorFinal
     *
     * @returns {Promise<Object>} Retorna o resultado da inserção no banco
     *
     * @example
     * const dadosEntrega = {
     *   valorDistancia: 30,
     *   valorPeso: 10,
     *   acrescimo: 5,
     *   desconto: 0,
     *   taxaExtra: 2,
     *   valorFinal: 47
     * };
     *
     * const resultado = await entregasModel.registrarEntrega(1, dadosEntrega);
     * // saída
     * {
     *   fieldCount: 0,
     *   affectedRows: 1,
     *   insertId: 12,
     *   info: '',
     *   serverStatus: 2,
     *   warningStatus: 0
     * }
     */
    registrarEntrega: async (idPedido, dadosEntrega) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const sql = `
                INSERT INTO entregas
                (idPedido_fk, valorDistancia, valorPeso, acrescimo, desconto, taxaExtra, valorFinal, statusEntrega)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'calculado')
            `;

            const values = [idPedido, dadosEntrega.valorDistancia, dadosEntrega.valorPeso, dadosEntrega.acrescimo, dadosEntrega.desconto, dadosEntrega.taxaExtra, dadosEntrega.valorFinal];

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
     * Atualiza o status de uma entrega (ex: "calculado", "enviado", "entregue", etc.)
     *
     * @async
     * @param {number} idEntrega - ID da entrega
     * @param {string} novoStatus - Novo status a ser definido
     * @returns {Promise<Object>} Resultado da atualização no banco
     *
     * @example
     * await entregaModel.atualizarStatus(5, 'enviado');
     * // Saída:
     * {
     *   fieldCount: 0,
     *   affectedRows: 1,
     *   insertId: 0,
     *   info: 'Rows matched: 1 Changed: 1 Warnings: 0',
     *   serverStatus: 2,
     *   warningStatus: 0,
     *   changedRows: 1
     * }
     */
    atualizarStatus: async (idEntrega, novoStatus) => {
        const sql = `
            UPDATE entregas SET statusEntrega = ?
            WHERE idEntregas = ?
        `;
        const [rows] = await pool.query(sql, [novoStatus, idEntrega]);
        return rows;
    },

    /**
     * Busca uma entrega pelo ID
     *
     * @async
     * @param {number} idEntrega - ID da entrega a ser consultada
     * @returns {Promise<Object|null>} Retorna o objeto da entrega ou null caso não exista
     *
     * @example
     * const entrega = await entregasModel.buscarEntrega(10);
     * // Saída:
     * {
     *   idEntregas: 10,
     *   idPedido_fk: 3,
     *   valorDistancia: 20,
     *   valorPeso: 5,
     *   acrescimo: 2,
     *   desconto: 0,
     *   taxaExtra: 1,
     *   valorFinal: 28,
     *   statusEntrega: 'calculado'
     * }
     */
    buscarEntrega: async (idEntrega) => {
        const sql = 'SELECT * FROM entregas WHERE idEntregas = ?';
        const [rows] = await pool.query(sql, [idEntrega]);
        return rows[0];
    },
    selecionarTodasEntregas: async () => {
        const sql = 'SELECT * FROM entregas';
        const [rows] = await pool.query(sql);
        return rows;
    },
};

module.exports = { entregasModel };
