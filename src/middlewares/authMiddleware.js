const { User } = require('../models'); 

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
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
