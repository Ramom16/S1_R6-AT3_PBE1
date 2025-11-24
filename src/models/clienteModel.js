/**
 * Módulo responsável pelas operações relacionadas aos clientes no banco de dados.
 * @module clienteModel
 */

const pool = require('../config/db');

const clienteModel = {

    /**
     * Seleciona todos os clientes cadastrados.
     * @async
     * @returns {Promise<Array>} Lista contendo todos os clientes cadastrados.
     *
     * @example
     * const clientes = await clienteModel.selecionarTodosClientes();
     * // Saída:
     * // [
     * //   { idCliente: 1, nome_completo: "Maria", cpf: "00011122233", ... },
     * //   { idCliente: 2, nome_completo: "João", cpf: "11122233344", ... }
     * // ]
     */
    selecionarTodosClientes: async () => {
        const sql = 'SELECT * FROM clientes';
        const [rows] = await pool.query(sql);
        return rows;
    },

    /**
     * Cria um novo cliente no banco de dados.
     * @async
     * @param {string} pNome - Nome completo do cliente.
     * @param {string} pCpf - CPF do cliente (único).
     * @param {string} pTelefone - Telefone do cliente.
     * @param {string} pEmail - Email do cliente.
     * @param {string} pEnderecoCompleto - Endereço completo do cliente.
     * @returns {Promise<Object>} Resultado da execução do INSERT, incluindo insertId.
     *
     * @example
     * const cliente = await clienteModel.criarClientes(
     *   "Carlos Alberto", "12345678900", "11988887777", "carlos@email.com",
     *   "Rua Azul, 104 - São Paulo"
     * );
     *
     * // Saída:
     * // {
     * //   fieldCount: 0,
     * //   affectedRows: 1,
     * //   insertId: 10,
     * //   serverStatus: 2,
     * //   warningStatus: 0
     * // }
     */
    criarClientes: async (pNome, pCpf, pTelefone, pEmail, pEnderecoCompleto) => {
        const sql = 'INSERT INTO clientes (nome_completo, cpf, telefone, email, enderecoCompleto) VALUES (?,?,?,?,?)';
        const values = [pNome, pCpf, pTelefone, pEmail, pEnderecoCompleto];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Busca um cliente pelo CPF.
     * @async
     * @param {string} cpf - CPF a ser buscado.
     * @returns {Promise<Array>} Um array contendo o cliente encontrado (ou vazio se não existir).
     *
     * @example
     * const cliente = await clienteModel.buscarPorCPF("12345678900");
     * // Saída:
     * // [
     * //   { idCliente: 5, nome_completo: "...", cpf: "12345678900", ... }
     * // ]
     */
    buscarPorCPF: async (cpf) => {
        try {
            const [rows] = await pool.query('SELECT * FROM clientes WHERE cpf = ?', [cpf]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar CPF:', error);
            throw error;
        }
    },

    /**
     * Atualiza um cliente existente.
     * @async
     * @param {string} pNome - Novo nome do cliente.
     * @param {string} pCpf - Novo CPF.
     * @param {string} pTelefone - Novo telefone.
     * @param {string} pEmail - Novo email.
     * @param {string} pEnderecoCompleto - Novo endereço.
     * @param {number} pIdCliente - ID do cliente a ser atualizado.
     * @returns {Promise<Object>} Resultado do UPDATE.
     *
     * @example
     * const result = await clienteModel.alterarCliente(
     *   "Novo Nome", "98765432100", "11977775555",
     *   "novo@email.com", "Rua Nova, 45", 3
     * );
     *
     * // Saída:
     * // {
     * //   affectedRows: 1,
     * //   changedRows: 1,
     * //   warningStatus: 0
     * // }
     */
    alterarCliente: async (pNome, pCpf, pTelefone, pEmail, pEnderecoCompleto, pIdCliente) => {
        const sql = `
            UPDATE clientes 
            SET nome_completo = ?, cpf = ?, telefone = ?, email = ?, enderecoCompleto = ?
            WHERE idCliente = ?
        `;
        const values = [pNome, pCpf, pTelefone, pEmail, pEnderecoCompleto, pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Busca um cliente pelo seu ID.
     * @async
     * @param {number} pIdCliente - ID do cliente.
     * @returns {Promise<Array>} Array contendo o cliente (ou vazio se não existir).
     *
     * @example
     * const cliente = await clienteModel.selecionarClientePorId(4);
     * // Saída:
     * // [
     * //    { idCliente: 4, nome_completo: "...", ... }
     * // ]
     */
    selecionarClientePorId: async (pIdCliente) => {
        const sql = 'SELECT * FROM clientes WHERE idCliente = ?';
        const [rows] = await pool.query(sql, [pIdCliente]);
        return rows;
    },

    /**
     * Deleta um cliente pelo ID.
     * @async
     * @param {number} pIdCliente - ID do cliente a ser removido.
     * @returns {Promise<Object>} Resultado do DELETE.
     *
     * @example
     * const result = await clienteModel.deleteCliente(7);
     * // Saída:
     * // {
     * //   affectedRows: 1,
     * //   warningStatus: 0
     * // }
     */
    deleteCliente: async (pIdCliente) => {
        const sql = 'DELETE FROM clientes WHERE idCliente = ?';
        const [rows] = await pool.query(sql, [pIdCliente]);
        return rows;
    }
};

module.exports = { clienteModel };
