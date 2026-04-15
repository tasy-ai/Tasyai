const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('MongoDB Connected');

        const adminEmail = 'admin@tasyai.com';
        const adminPassword = 'Admin@1234';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        
        if (existingAdmin) {
            console.log('Admin user already exists.');
            // Ensure role is admin
            if (existingAdmin.role !== 'admin') {
               existingAdmin.role = 'admin';
               await existingAdmin.save();
               console.log('Updated existing user role to admin.');
            }
            process.exit(0);
        }

        console.log('Creating new admin user...');
        
        // Let the User model pre-save hook hash the password
        const adminUser = new User({
            name: 'Tasyai Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
            isOnboarded: true,
            skills: ['Platform Management', 'System Architecture'],
            time: 'Full-time'
        });

        await adminUser.save();
        
        console.log('✅ Admin user created successfully!');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`); // In a real system, never log this, but this is a controlled seed
        
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
        process.exit(1);
    } finally {
        mongoose.connection.close();
    }
};

seedAdmin();
