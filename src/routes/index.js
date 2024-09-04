const express = require('express');
const router = express.Router();
const garantirAutenticacao = require('../middlewares/garantirAutenticacao');
const { checkPermission } = require('../middlewares/authMiddleware');

router.use(garantirAutenticacao());

/**
 * @swagger
 * /protected/dashboard:
 *   get:
 *     summary: Acesso à área administrativa.
 *     tags: [Protected]
 *     responses:
 *       200:
 *         description: Acesso permitido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bem-vindo, teste@email.com. Você tem acesso à área administrativa."
 *       403:
 *         description: Acesso negado.
 */
router.get('/dashboard', checkPermission('admin'), (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.email}. Você tem acesso à área administrativa.` });
});

/**
 * @swagger
 * /protected/respostas:
 *   get:
 *     summary: Acesso ao conteúdo de respostas.
 *     tags: [Protected]
 *     responses:
 *       200:
 *         description: Conteúdo de respostas.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Conteúdo de respostas"
 *       403:
 *         description: Acesso negado.
 */
router.get('/respostas', checkPermission('estudante'), (req, res) => {
  res.send('Conteúdo de respostas');
});

/**
 * @swagger
 * /protected/questionarios:
 *   get:
 *     summary: Acesso ao conteúdo de questionários.
 *     tags: [Protected]
 *     responses:
 *       200:
 *         description: Conteúdo de questionários.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Conteúdo de questionários"
 *       403:
 *         description: Acesso negado.
 */
router.get('/questionarios', checkPermission('criador'), (req, res) => {
  res.send('Conteúdo de questionários');
});

module.exports = router;
