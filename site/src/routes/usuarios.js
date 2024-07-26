const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

// Rota para cadastrar um usuário
router.post('/cadastrar', async (req, res, next) => {
    try {
        const resultado = await usuarioController.cadastrar(req.body);
        res.status(201).json(resultado); // Retorna um status 201 (Criado) com os resultados
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

// Rota para autenticar um usuário
router.post('/autenticar', async (req, res, next) => {
    try {
        const resultado = await usuarioController.autenticar(req.body);
        res.status(200).json(resultado); // Retorna um status 200 (OK) com os resultados
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

module.exports = router;
