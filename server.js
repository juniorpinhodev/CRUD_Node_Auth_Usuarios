const http = require('http');

// Criando o servidor
const server = http.createServer((req, res) => {
    // Verifica a URL da requisição
    if (req.method === 'GET' && req.url === '/fundamentos') {
        // Define o cabeçalho da resposta
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        // Envia a resposta
        res.end('Hello world, fundamentos nodejs aplicado.');
    } else {
        // Para outras rotas, retorna 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Rota não encontrada');
    }
});

// Ouvindo a porta 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
