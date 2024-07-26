const mysql = require('mysql2/promise');

// Configuração da conexão com o banco de dados MySQL
const mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306, // Define uma porta padrão se não estiver especificada
};

// Cria um pool de conexões para melhor gerenciamento
const pool = mysql.createPool(mySqlConfig);

async function executar(instrucao) {
    // Verifica se o ambiente está configurado corretamente
    const ambienteProcesso = process.env.AMBIENTE_PROCESSO;
    if (ambienteProcesso !== 'producao' && ambienteProcesso !== 'desenvolvimento') {
        console.error('\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n');
        return Promise.reject('AMBIENTE NÃO CONFIGURADO EM .env');
    }

    try {
        // Obtém uma conexão do pool
        const [conexao] = await pool.getConnection();

        // Executa a consulta
        const [resultados] = await conexao.query(instrucao);

        // Libera a conexão de volta ao pool
        conexao.release();

        console.log(resultados);
        return resultados;
    } catch (erro) {
        // Log do erro no MySQL Server
        console.error('ERRO NO MySQL SERVER: ', erro.message || erro);
        throw erro;
    }
}

module.exports = {
    executar
};
