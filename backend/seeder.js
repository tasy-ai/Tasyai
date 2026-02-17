const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const users = [
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['React', 'Node.js', 'MongoDB'],
        country: 'USA',
        experience: '3-5',
        motto: 'Code is life',
        achievements: 'Lead developer for a successful fintech startup exit.',
        partnership: 'Full-time'
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        role: 'founder',
        skills: ['Agile', 'Scrum', 'Jira'],
        country: 'UK',
        experience: '3-5',
        motto: 'Building the future',
        achievements: 'Launched 3 profitable SaaS products in the healthcare space.',
        partnership: 'Co-founder'
    },
    {
        name: 'Michael Johnson',
        email: 'michael.johnson@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Figma', 'Sketch', 'Adobe XD'],
        country: 'Canada',
        experience: '3-5',
        motto: 'Design with empathy',
        achievements: 'Winner of 2 Red Dot Design Awards for mobile apps.',
        partnership: 'Freelance'
    },
    {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Python', 'TensorFlow', 'SQL'],
        country: 'Australia',
        experience: '0-2',
        motto: 'Data driven decisions',
        achievements: 'Published researcher in Neural Networks and AI ethics.',
        partnership: 'Project-based'
    },
    {
        name: 'Chris Brown',
        email: 'chris.brown@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Docker', 'Kubernetes', 'AWS'],
        country: 'Germany',
        experience: '6-10',
        motto: 'Automate everything',
        achievements: 'Managed cloud infrastructure for a high-traffic e-commerce platform.',
        partnership: 'DevOps Partner'
    },
    {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Vue.js', 'CSS', 'HTML'],
        country: 'France',
        experience: '3-5',
        motto: 'Pixel perfect',
        achievements: 'Consistently delivered high-performing frontend solutions for Fortune 500 clients.',
        partnership: 'UI Consultant'
    },
    {
        name: 'David Lee',
        email: 'david.lee@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Java', 'Spring Boot', 'MySQL'],
        country: 'South Korea',
        experience: '3-5',
        motto: 'Scalable systems',
        achievements: 'Architected a microservices backend handling 1M+ daily active users.',
        partnership: 'Backend Specialist'
    },
    {
        name: 'Laura Martinez',
        email: 'laura.martinez@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Flutter', 'Dart', 'Firebase'],
        country: 'Spain',
        experience: '0-2',
        motto: 'Mobile first',
        achievements: 'Developed a social networking app with 500k+ downloads on Play Store.',
        partnership: 'Mobile Partner'
    },
    {
        name: 'James Anderson',
        email: 'james.anderson@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Selenium', 'Cypress', 'JUnit'],
        country: 'USA',
        experience: '3-5',
        motto: 'Quality assures success',
        achievements: 'Reduced production bugs by 40% through automated testing frameworks.',
        partnership: 'QA Lead'
    },
    {
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Azure', 'GCP', 'Terraform'],
        country: 'Mexico',
        experience: '6-10',
        motto: 'Cloud native',
        achievements: 'Reduced infrastructure costs by 30% using multi-cloud strategies.',
        partnership: 'Cloud Strategy'
    }
];

const seedUsers = async () => {
    await connectDB();

    try {
        // await User.deleteMany(); // Optional: Clear existing users
        // console.log('Data Destroyed...');

        for (const user of users) {
             // Use findOneAndUpdate with upsert to update existing dummy users or create new ones
             await User.findOneAndUpdate(
                 { email: user.email },
                 { ...user },
                 { upsert: true, new: true, runValidators: true }
             );
             console.log(`Synced user: ${user.name}`);
         }

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedUsers();
