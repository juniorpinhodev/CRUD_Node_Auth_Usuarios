const jwt = require('jsonwebtoken');
const { User } = require('../models');

const garantirAutenticacao = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; 
      if (!token) return res.status(401).json({ message: 'Token não fornecido' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      
      next();
    } catch (error) {
      console.error('Erro na autenticação:', error);
      res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  };
};

module.exports = garantirAutenticacao;
