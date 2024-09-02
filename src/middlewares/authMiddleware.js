const { User } = require('../models'); 
// Middleware para verificar a permissão
const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; // Supondo que você armazena o ID do usuário no req.user após a autenticação
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (user.permissao !== requiredPermission) {
        return res.status(403).json({ message: 'Acesso negado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  };
};

module.exports = { checkPermission };
