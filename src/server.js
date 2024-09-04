const express = require('express');
const app = express();
const swaggerDocs = require('./swagger');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/index');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Swagger Docs disponível em http://localhost:${PORT}/api-docs`);
});
