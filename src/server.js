const http = require('http');


const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/fundamentos') {
        // Define o cabeçalho da resposta
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        res.end('Hello world, fundamentos nodejs aplicado.');
    } else {
  
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Rota não encontrada');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
