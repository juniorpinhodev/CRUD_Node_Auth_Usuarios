const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = [{ email: 'teste@email.com', password: '123456' }]; // Simulando um usuário para autenticação.

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT.
 *     tags: [Auth]
 *     requestBody:
 *       description: Dados para autenticação.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Token gerado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado.
 *       401:
 *         description: Usuário ou senha inválidos.
 *       500:
 *         description: Erro ao autenticar.
 */

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
});

module.exports = router;
