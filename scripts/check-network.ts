import net from 'net';

const HOST = 'drepto.rf82wv8.mongodb.net';
const PORT = 27017;

console.log(`Testing TCP connection to ${HOST}:${PORT}...`);

const socket = new net.Socket();
socket.setTimeout(5000);

socket.on('connect', () => {
    console.log('✅ Success! Connection established.');
    socket.destroy();
});

socket.on('timeout', () => {
    console.error('❌ Timeout! Could not connect within 5 seconds.');
    console.error('This indicates a FIREWALL is blocking the connection.');
    socket.destroy();
});

socket.on('error', (err) => {
    console.error(`❌ Error: ${err.message}`);
    socket.destroy();
});

socket.connect(PORT, HOST);
