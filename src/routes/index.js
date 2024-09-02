const express = require('express');
const { authenticateToken, checkPermission } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.get('/respostas', checkPermission('estudante'), (req, res) => {
  res.send('Conteúdo de respostas');
});

router.get('/questionarios', checkPermission('criador'), (req, res) => {
  res.send('Conteúdo de questionários');
});

module.exports = router;
