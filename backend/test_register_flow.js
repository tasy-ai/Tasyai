const http = require('http');

// Generates a random user
const randomId = Math.floor(Math.random() * 10000);
const email = `auto_test_${randomId}@example.com`;
const password = 'password123';
const name = `Auto Tester ${randomId}`;

const data = JSON.stringify({
    name,
    email,
    password
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/signup',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log(`Attempting to register: ${email}`);

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    
    res.on('end', () => {
        console.log('Response Body:', body);
        if (res.statusCode === 201) {
            console.log('✅ Registration API Success');
            // Now check DB
            checkDb(email);
        } else {
            console.log('❌ Registration API Failed');
        }
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();

function checkDb(targetEmail) {
    // We can't easily require mongoose here without setup, 
    // but the API returned success which usually means it saved.
    // Let's rely on the previous checkDb.js script or trust the API 201 response.
    console.log('Please run "node checkDb.js" to verify persistence.');
}
