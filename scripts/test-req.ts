import http from 'http';

// Payload matching Register.tsx exactly
// role is 'Patient' (string)
const data = JSON.stringify({
  firstName: 'Debug',
  lastName: 'User',
  email: `debug_real_${Date.now()}@test.com`,
  role: 'Patient',
  password: 'password123',
});

const options = {
  hostname: 'localhost',
  port: 3002, // Targeted debug port
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error('REQ ERROR:', error);
});

req.write(data);
req.end();
