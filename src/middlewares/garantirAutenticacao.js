const jwt = require('jsonwebtoken');
const { User } = require('../models'); 

const garantirAutenticacao = (permissaoNecessaria) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Assumindo que o token é enviado no formato 'Bearer token'
      if (!token) return res.status(401).json({ message: 'Token não fornecido' });

      // Verificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verificar se o usuário tem a permissão necessária
      if (permissaoNecessaria && decoded.role !== permissaoNecessaria) {
        return res.status(403).json({ message: 'Acesso negado' });
      }

      req.user = decoded; 
      next();
    } catch (error) {
      console.error('Erro na autenticação:', error);
      res.status(401).json({ message: 'Token inválido' });
    }
  };
};

module.exports = garantirAutenticacao;
