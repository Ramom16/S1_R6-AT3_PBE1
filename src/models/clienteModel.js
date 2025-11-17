const pool = require('../config/db')

const clienteModel = {
    selecionarTodosClientes: async () => {
        const sql = 'SELECT * FROM clientes';
        const [rows] = await pool.query(sql);
        return rows;
    },
    criarClientes: async (pNome, pCpf, pTelefone, pEmail, pEnderecoCompleto) => {
        const sql = 'INSERT INTO clientes (nome_completo, cpf, telefone, email, enderecoCompleto) VALUES (?,?,?,?,?);';
        const values = [pNome, pCpf, pTelefone, pEmail, pEnderecoCompleto];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    
    buscarPorCPF: async (cpf) => {
        try {
            const [rows] = await pool.query('SELECT * FROM clientes WHERE cpf = ?', [cpf]);
            return rows;
        } catch (error) {
            console.error('Erro ao buscar CPF:', error);
            throw error;
        }
    },
    alterarCliente: async (pNome, pCpf, pTelefone, pEmail, pEnderecoCompleto, pIdCliente) => {
        const sql = 'UPDATE clientes SET nome_completo = ?, cpf = ?, telefone = ?, email = ?, enderecoCompleto = ? WHERE idCliente = ?;';
        const values = [pNome, pCpf, pTelefone, pEmail, pEnderecoCompleto, pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    selecionarClientePorId: async (pIdCliente) => {
        const sql = 'SELECT * FROM clientes WHERE idCliente =?;';
        const values = [pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    deleteCliente: async (pIdCliente) => {
        const sql = "DELETE FROM clientes WHERE idCliente =?;";
        const values = [pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
}

module.exports = { clienteModel }