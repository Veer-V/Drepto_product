const http = require('http');

const data = JSON.stringify({
    email: 'debug@test.com',
    password: 'password',
    firstName: 'Debug',
    lastName: 'User'
});

const options = {
    hostname: 'localhost',
    port: 3005,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
