const jwt = require('jsonwebtoken');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const userId = '67b30d359670868f3a384813'; // Using ID from previous logs or fetch dynamically
// Wait, I need a valid ID. I'll fetch users first to be sure.

const checkAndTest = async () => {
    // 1. Get a user
    const mongoose = require('mongoose');
    const User = require('./models/User');
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({});
    if(!user) {
        console.log('No user found');
        return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    console.log('Generated Token:', token);
    
    // 2. Test Update
    const data = JSON.stringify({
        name: 'Updated Name',
        role: 'founder',
        experience: '3-5',
        skills: ['React', 'Node'],
        isOnboarded: true
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/profile',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Authorization': `Bearer ${token}`
        }
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log('Response:', body));
    });

    req.on('error', (e) => console.error(e));
    req.write(data);
    req.end();
};

checkAndTest();
