const http = require('http');

console.log('Testing GET /api/auth/users...');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/users',
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    
    res.on('end', () => {
        console.log('Response Body Preview:', body.substring(0, 200));
        if (res.statusCode === 200) {
            console.log('✅ Users API Success');
        } else {
            console.log('❌ Users API Failed');
        }
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();
