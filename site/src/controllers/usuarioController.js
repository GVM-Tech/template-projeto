const usuarioModel = require('../models/usuarioModel');

async function autenticar(req, res, next) {
    const { emailServer: email, senhaServer: senha } = req.body;

    if (!email) {
        return res.status(400).send("Seu email está undefined!");
    }
    if (!senha) {
        return res.status(400).send("Sua senha está indefinida!");
    }

    try {
        const resultadoAutenticar = await usuarioModel.autenticar(email, senha);
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

        if (resultadoAutenticar.length === 1) {
            console.log(resultadoAutenticar);
            res.status(200).json(resultadoAutenticar);
        } else if (resultadoAutenticar.length === 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
        } else {
            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
    } catch (erro) {
        console.error("Houve um erro ao realizar o login! Erro: ", erro.message || erro);
        res.status(500).json({ error: erro.message || 'Erro interno do servidor' });
    }
}

async function cadastrar(req, res, next) {
    const { nomeServer: nome, emailServer: email, senhaServer: senha, idEmpresaVincularServer: fkEmpresa } = req.body;

    if (!nome) {
        return res.status(400).send("Seu nome está undefined!");
    }
    if (!email) {
        return res.status(400).send("Seu email está undefined!");
    }
    if (!senha) {
        return res.status(400).send("Sua senha está undefined!");
    }
    if (!fkEmpresa) {
        return res.status(400).send("Sua empresa a vincular está undefined!");
    }

    try {
        const resultado = await usuarioModel.cadastrar(nome, email, senha, fkEmpresa);
        res.status(201).json(resultado); // Retorna um status 201 (Criado) com os resultados
    } catch (erro) {
        console.error("Houve um erro ao realizar o cadastro! Erro: ", erro.message || erro);
        res.status(500).json({ error: erro.message || 'Erro interno do servidor' });
    }
}

module.exports = {
    autenticar,
    cadastrar
};
