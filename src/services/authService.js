const jwt = require('jsonwebtoken');
const { User } = require('../models'); 
// Função para gerar o JWT
const generateToken = async (userId) => {
  try {
    // Obter o usuário do banco de dados para obter a permissão
    const user = await User.findByPk(userId);
    
    if (!user) throw new Error('Usuário não encontrado');
    
    // Criação do payload com a permissão do usuário
    const payload = {
      id: user.id,
      username: user.username,
      role: user.permissao, // Inclui a permissão do usuário
    };
    
    // Gerar o JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d', 
    });
    
    return token;
  } catch (error) {
    console.error('Erro ao gerar o token:', error);
    throw error;
  }
};

module.exports = {
  generateToken,
};
