const database = require("../database/config");

async function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", email);

    // Consulta parametrizada para evitar injeção de SQL
    const instrucaoSql = `
        SELECT id, nome, email, fk_empresa as empresaId
        FROM usuario
        WHERE email = ? AND senha = ?;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    try {
        const [resultados] = await database.executar(instrucaoSql, [email, senha]);
        return resultados;
    } catch (erro) {
        console.error("Erro ao executar a instrução SQL: ", erro.message || erro);
        throw erro;
    }
}

async function cadastrar(nome, email, senha, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email);

    // Consulta parametrizada para evitar injeção de SQL
    const instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, fk_empresa)
        VALUES (?, ?, ?, ?);
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    try {
        const [resultados] = await database.executar(instrucaoSql, [nome, email, senha, fkEmpresa]);
        return resultados;
    } catch (erro) {
        console.error("Erro ao executar a instrução SQL: ", erro.message || erro);
        throw erro;
    }
}

module.exports = {
    autenticar,
    cadastrar
};
