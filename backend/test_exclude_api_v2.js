const http = require('http');

console.log('Testing GET /api/auth/users with explicit string ID...');

const excludeId = '6994162299f77b6f1d38a8ad5'; // Maria Garcia

const options = {
    hostname: 'localhost',
    port: 5000,
    path: `/api/auth/users?exclude=${excludeId}`,
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });
    
    res.on('end', () => {
        if (res.statusCode === 200) {
            const users = JSON.parse(body);
            console.log(`Received ${users.length} users.`);
            const found = users.find(u => u._id === excludeId);
            if (!found) {
                console.log(`✅ User ${excludeId} was successfully excluded.`);
            } else {
                console.log(`❌ User ${excludeId} was found BUT SHOULD BE EXCLUDED.`);
            }
        } else {
            console.log('❌ Users API Failed');
        }
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.end();
