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
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
        country: 'United States',
        experience: '3-5',
        motto: 'Code is life, solving problems is my passion.',
        achievements: 'Lead developer for a successful fintech startup exit and built a microservices platform.',
        partnership: 'Full-time / Equity',
        time: '40+ hours/week',
        profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        isOnboarded: true
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        role: 'founder',
        skills: ['Business Strategy', 'Product Management', 'Market Research'],
        country: 'United Kingdom',
        experience: '6-10',
        motto: 'Building the future of sustainable tech.',
        achievements: 'Launched 3 profitable SaaS products in the healthcare space with 10k+ MAU.',
        partnership: 'Co-founder',
        time: '30+ hours/week',
        profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        isOnboarded: true
    },
    {
        name: 'Michael Johnson',
        email: 'michael.johnson@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Figma', 'UI/UX Design', 'Branding'],
        country: 'Canada',
        experience: '3-5',
        motto: 'Design with empathy and visual clarity.',
        achievements: 'Winner of 2 Red Dot Design Awards for mobile banking apps.',
        partnership: 'Freelance / Contract',
        time: '20+ hours/week',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        isOnboarded: true
    },
    {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Python', 'TensorFlow', 'Data Science'],
        country: 'Australia',
        experience: '0-2',
        motto: 'Data driven decisions for a better tomorrow.',
        achievements: 'Published researcher in Neural Networks and AI ethics for autonomous vehicles.',
        partnership: 'Project-based',
        time: '15+ hours/week',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        isOnboarded: true
    },
    {
        name: 'Chris Brown',
        email: 'chris.brown@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Docker', 'Kubernetes', 'DevOps'],
        country: 'Germany',
        experience: '6-10',
        motto: 'Automate everything and scale fast.',
        achievements: 'Managed cloud infrastructure for a high-traffic e-commerce platform during Black Friday.',
        partnership: 'DevOps Partner',
        time: '40+ hours/week',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        isOnboarded: true
    },
    {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Vue.js', 'Tailwind CSS', 'TypeScript'],
        country: 'France',
        experience: '3-5',
        motto: 'Creating pixel perfect experiences.',
        achievements: 'Consistently delivered high-performing frontend solutions for global luxury brands.',
        partnership: 'UI Consultant',
        time: '25+ hours/week',
        profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
        isOnboarded: true
    },
    {
        name: 'David Lee',
        email: 'david.lee@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Java', 'Spring Boot', 'System Design'],
        country: 'South Korea',
        experience: '6-10',
        motto: 'Scalable systems for high-load environments.',
        achievements: 'Architected a microservices backend handling 1M+ daily active users for a game studio.',
        partnership: 'Backend Specialist',
        time: '35+ hours/week',
        profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
        isOnboarded: true
    },
    {
        name: 'Laura Martinez',
        email: 'laura.martinez@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Flutter', 'Mobile Development', 'Firebase'],
        country: 'Spain',
        experience: '0-2',
        motto: 'Mobile first, seamless user transitions.',
        achievements: 'Developed a social networking app with 500k+ downloads on both App Store and Play Store.',
        partnership: 'Mobile Partner',
        time: '20+ hours/week',
        profilePicture: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop',
        isOnboarded: true
    },
    {
        name: 'James Anderson',
        email: 'james.anderson@example.com',
        password: 'password123',
        role: 'talent',
        skills: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing'],
        country: 'United States',
        experience: '10+',
        motto: 'Security is not an option, it is a necessity.',
        achievements: 'Discovered and reported critical vulnerabilities in major fintech infrastructure.',
        partnership: 'Security Advisor',
        time: '10+ hours/week',
        profilePicture: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
        isOnboarded: true
    },
    {
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        password: 'password123',
        role: 'investor',
        skills: ['VC Strategy', 'Financial Analysis', 'Mentoring'],
        country: 'Mexico',
        experience: '10+',
        motto: 'Investing in people, not just ideas.',
        achievements: 'Early-stage investor in 5 unicorns and managed a $100M venture fund.',
        partnership: 'Strategic Investor',
        time: '5+ hours/week',
        profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
        isOnboarded: true
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
