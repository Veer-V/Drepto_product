import http from 'http';

const options = {
    hostname: 'localhost',
    port: 3001, // Vite port
    path: '/api/products', // GET request to test proxy
    method: 'GET',
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error('PROXY ERROR:', error);
});

req.end();
