const express = require('express');
const router = express.Router();

// Rota para renderizar a página inicial
router.get('/', (req, res, next) => {
    try {
        res.render('index');
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
});

module.exports = router;
