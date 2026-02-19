const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Company = require('./models/Company');
const User = require('./models/User');

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

const seedCompanies = async () => {
    await connectDB();

    try {
        const adminUser = await User.findOne({ email: 'jane.smith@example.com' }); // Founder from user seeder
        
        if (!adminUser) {
            console.error('Seed user Jane Smith not found. Run user seeder first.');
            process.exit(1);
        }

        const companies = [
            {
                name: 'Nebula Systems',
                tagline: 'Decentralized Compute for AI',
                description: 'Nebula is building the world\'s first decentralized GPU cloud, specifically optimized for large language model inference and training.',
                industry: 'Artificial Intelligence',
                fundingStage: 'Series A+',
                logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=200&h=200&fit=crop',
                creator: adminUser._id,
                benefits: ['High Equity', 'Async Culture', 'L&D Budget'],
                openings: [
                    { role: 'Senior ML Engineer', experience: '5-8 years', techStack: ['Python', 'PyTorch', 'CUDA'], workModel: 'Remote' },
                    { role: 'Backend Lead', experience: '8+ years', techStack: ['Go', 'Kubernetes', 'gRPC'], workModel: 'Remote' }
                ],
                location: 'San Francisco, CA'
            },
            {
                name: 'Quantum Solve',
                tagline: 'Quantum-Safe Encryption to the Edge',
                description: 'Protecting the world\'s data from future quantum threats using post-quantum cryptography that runs on everything from servers to IoT devices.',
                industry: 'Cybersecurity',
                fundingStage: 'Seed',
                logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop',
                creator: adminUser._id,
                benefits: ['Premium Health', 'Annual Retreats', 'High Equity'],
                openings: [
                    { role: 'Cryptography Researcher', experience: '3-5 years', techStack: ['C++', 'Rust', 'Assembly'], workModel: 'Hybrid' }
                ],
                location: 'Austin, TX'
            },
            {
                name: 'BioHeal AI',
                tagline: 'AI-Powered Drug Discovery',
                description: 'BioHeal uses generative modeling to design novel molecules for rare diseases that have been neglected by big pharma.',
                industry: 'Biotech',
                fundingStage: 'Series A+',
                logo: 'https://images.unsplash.com/photo-1532187875605-2fe358a3d46a?w=200&h=200&fit=crop',
                creator: adminUser._id,
                benefits: ['L&D Budget', 'Flexible Hours'],
                openings: [
                    { role: 'Computational Chemist', experience: '5-8 years', techStack: ['Python', 'RDKit', 'TensorFlow'], workModel: 'Hybrid' }
                ],
                location: 'Boston, MA'
            },
            {
                name: 'GreenPulse',
                tagline: 'The Operating System for Smart Grids',
                description: 'Optimizing renewable energy distribution using real-time demand forecasting and distributed ledger technology.',
                industry: 'CleanTech',
                fundingStage: 'Series A+',
                logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=200&h=200&fit=crop',
                creator: adminUser._id,
                benefits: ['Remote First', 'Sustainable Travel Budget'],
                openings: [
                    { role: 'Data Engineer', experience: '3-5 years', techStack: ['Scala', 'Kafka', 'Spark'], workModel: 'Remote' }
                ],
                location: 'Berlin, Germany'
            },
            {
                name: 'Zenith SaaS',
                tagline: 'Enterprise Resource Orchestration',
                description: 'Consolidating fragmented enterprise workflows into a single, AI-orchestrated dashboard.',
                industry: 'Enterprise SaaS',
                fundingStage: 'Seed',
                logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop',
                creator: adminUser._id,
                benefits: ['Unlimited PTO', 'Home Office Stipend'],
                openings: [
                    { role: 'Product Designer', experience: '3-5 years', techStack: ['Figma', 'React', 'Storybook'], workModel: 'Remote' }
                ],
                location: 'Remote'
            },
            {
                name: 'Aether Robotics',
                tagline: 'Autonomous Warehouse Swarms',
                description: 'Aether builds collaborative robots that work alongside humans to 10x warehouse efficiency without changing infrastructure.',
                industry: 'Robotics',
                fundingStage: 'Series B',
                logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=200&fit=crop',
                creator: adminUser._id,
                benefits: ['Equity', 'Gym Membership', 'Free Lunch'],
                openings: [
                    { role: 'Robotics Software Engineer', experience: '3-5 years', techStack: ['C++', 'ROS', 'OpenCV'], workModel: 'Onsite' }
                ],
                location: 'Seattle, WA'
            },
            {
                name: 'DeepCode',
                tagline: 'Self-Healing Software Infrastructure',
                description: 'DeepCode uses specialized agents to monitor, debug, and patch production systems automatically.',
                industry: 'DevOps',
                fundingStage: 'Seed',
                logo: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=200&h=200&fit=crop',
                creator: adminUser._id,
                benefits: ['Async Culture', 'Mental Health Support'],
                openings: [
                    { role: 'SRE Lead', experience: '6-10 years', techStack: ['Python', 'Terraform', 'Prometheus'], workModel: 'Remote' }
                ],
                location: 'London, UK'
            },
            {
                name: 'Stellar FinTech',
                tagline: 'Borderless Business Banking',
                description: 'Unifying global payouts, treasury, and cards for startups operating across 50+ countries.',
                industry: 'FinTech',
                fundingStage: 'Series C',
                logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop',
                creator: adminUser._id,
                benefits: ['Parental Leave', 'Stock Options'],
                openings: [
                    { role: 'Fullstack Developer', experience: '3-5 years', techStack: ['Node.js', 'React', 'PostgreSQL'], workModel: 'Hybrid' }
                ],
                location: 'Singapore'
            },
            {
                name: 'Vivid Reality',
                tagline: 'Spatial Computing for Education',
                description: 'Creating immersive AR/VR environments for medical and engineering simulations.',
                industry: 'EdTech',
                fundingStage: 'Series A+',
                logo: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=200&h=200&fit=crop',
                creator: adminUser._id,
                benefits: ['VR Headset Allowance', 'L&D Budget'],
                openings: [
                    { role: 'Unity Developer', experience: '3-5 years', techStack: ['C#', 'Unity', 'Blender'], workModel: 'Hybrid' }
                ],
                location: 'Los Angeles, CA'
            },
            {
                name: 'Orbit Logistics',
                tagline: 'Predictive Supply Chain Management',
                description: 'Orbit uses satellite data and AI to predict and route around supply chain disruptions before they happen.',
                industry: 'Logistics',
                fundingStage: 'Series B',
                logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=200&fit=crop',
                creator: adminUser._id,
                benefits: ['Flexible Working', 'Annual Retreats'],
                openings: [
                    { role: 'Backend Engineer', experience: '3-5 years', techStack: ['Python', 'FastAPI', 'Redis'], workModel: 'Remote' }
                ],
                location: 'Toronto, Canada'
            }
        ];

        await Company.deleteMany();
        await Company.insertMany(companies);

        console.log('Companies Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedCompanies();
