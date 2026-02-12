import { 
  Eye, 
  Zap, 
  TrendingUp,
  Code2,
  Shield,
  Rocket,
  Code,
  User,
  Globe,
  FileText
} from 'lucide-react';

export const candidates = [
  {
    id: 1,
    name: 'Marcus Thorne',
    role: 'Senior Full-Stack Developer',
    headline: 'Building scalable React architectures',
    experience: '8 Years Experience',
    location: 'London, UK',
    matchScore: 98,
    status: 'online',
    badge: 'Top 5% Talent',
    badgeColor: 'emerald',
    quote: 'Passionate about scaling series-A startups through design-led engineering and high-performance React architectures.',
    about: [
      "I'm a full-stack developer with a passion for building beautiful, functional, and scalable web applications. I have over 8 years of experience in the industry, working with startups and enterprises alike.",
      "My core expertise lies in the React ecosystem, but I'm also proficient in Node.js, Python, and AWS. I love solving complex problems and delivering high-quality software."
    ],
    skills: [
      { name: 'React', level: 'high' },
      { name: 'Node.js', level: 'high' },
      { name: 'PostgreSQL', level: 'medium' },
      { name: 'AWS', level: 'medium' },
      { name: 'TypeScript', level: 'high' },
      { name: 'GraphQL', level: 'medium' }
    ],
    ventures: [
      {
        id: 1,
        name: 'DevFlow',
        role: 'Co-Founder',
        description: 'Developer productivity tools',
        icon: Code2,
        color: 'from-blue-500 to-cyan-500'
      }
    ],
    experienceList: [
      {
        period: '2020 — Present',
        title: 'Senior Developer',
        company: 'TechGrowth',
        description: 'Leading a team of 10 developers building next-gen SaaS products.',
        active: true
      },
      {
        period: '2016 — 2020',
        title: 'Full Stack Engineer',
        company: 'StartUp Inc',
        description: 'Developed and maintained core infrastructure for high-traffic platforms.',
        active: false
      }
    ],
    links: [
      { name: 'GitHub', url: 'github.com/marcusthorne', icon: Code, color: 'bg-slate-800' },
      { name: 'LinkedIn', url: 'linkedin.com/in/mthorne', icon: User, color: 'bg-[#0077b5]' }
    ],
    image: 'https://i.pravatar.cc/150?u=marcus'
  },
  {
    id: 2,
    name: 'Elena Rodriguez',
    role: 'Lead UI Designer',
    headline: 'Crafting digital experiences',
    experience: '6 Years Experience',
    location: 'Madrid, Spain',
    matchScore: 94,
    status: 'offline',
    badge: 'UI/UX Specialist',
    badgeColor: 'blue',
    quote: 'Specialized in creating seamless glassmorphic design systems that bridge the gap between aesthetics and functionality.',
    about: [
      "I am a UI/UX designer with a sharp eye for detail and a love for creating intuitive, user-centric designs. I believe that good design is not just about how things look, but how they work.",
      "With a background in fine arts and 6 years of digital product design, I bring a unique perspective to every project I touch."
    ],
    skills: [
      { name: 'Figma', level: 'high' },
      { name: 'Tailwind CSS', level: 'high' },
      { name: 'Prototyping', level: 'high' },
      { name: 'Motion Design', level: 'medium' },
      { name: 'React (Basic)', level: 'low' }
    ],
    ventures: [],
    experienceList: [
      {
        period: '2019 — Present',
        title: 'Lead UI Designer',
        company: 'Glassy',
        description: 'Spearheading the design system overhaul for enterprise clients.',
        active: true
      },
      {
        period: '2017 — 2019',
        title: 'Product Designer',
        company: 'Studio X',
        description: 'Designed mobile apps for fintech startups.',
        active: false
      }
    ],
    links: [
      { name: 'Dribbble', url: 'dribbble.com/elena', icon: Globe, color: 'bg-pink-600' },
      { name: 'Behance', url: 'behance.net/elena', icon: Globe, color: 'bg-blue-600' }
    ],
    image: 'https://i.pravatar.cc/150?u=elena'
  },
  {
    id: 3,
    name: 'Julian Vosh',
    role: 'Product Manager',
    headline: 'Driving product growth',
    experience: '10 Years Experience',
    location: 'Remote',
    matchScore: 91,
    status: 'online',
    badge: 'Former CTO',
    badgeColor: 'primary',
    quote: 'Experienced product leader with a focus on AI-driven SaaS growth and high-level technical strategy.',
    about: [
      "Product veteran with over a decade of experience launching and scaling B2B SaaS products. I have a technical background which allows me to work closely with engineering teams.",
      "My focus is on data-driven decision making and aligning product strategy with business goals."
    ],
    skills: [
      { name: 'Product Strategy', level: 'high' },
      { name: 'Roadmapping', level: 'high' },
      { name: 'Python', level: 'medium' },
      { name: 'Data Analysis', level: 'high' }
    ],
    ventures: [
      {
        id: 1,
        name: 'GrowthAI',
        role: 'Advisor',
        description: 'AI for marketing automation',
        icon: Rocket,
        color: 'from-purple-500 to-pink-500'
      }
    ],
    experienceList: [
      {
        period: '2018 — Present',
        title: 'VP of Product',
        company: 'SaaSify',
        description: 'Managing product line for AI-driven analytics tools.',
        active: true
      },
      {
        period: '2013 — 2018',
        title: 'CTO',
        company: 'TechStart',
        description: 'Led engineering and product teams from seed to Series B.',
        active: false
      }
    ],
    links: [
      { name: 'LinkedIn', url: 'linkedin.com/in/julianvosh', icon: User, color: 'bg-[#0077b5]' },
      { name: 'Medium', url: 'medium.com/@julian', icon: FileText, color: 'bg-black' }
    ],
    image: 'https://i.pravatar.cc/150?u=julian'
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Frontend Developer',
    headline: 'Frontend performance expert',
    experience: '4 Years Experience',
    location: 'Singapore',
    matchScore: 89,
    status: 'online',
    badge: 'Rising Star',
    badgeColor: 'amber',
    quote: 'Frontend wizard obsessed with micro-interactions and performance optimization in modern web apps.',
    about: [
      "I live and breathe frontend development. I love creating buttery smooth animations and responsive layouts that delight users.",
      "Constantly learning exploring new libraries and frameworks to stay on the bleeding edge."
    ],
    skills: [
      { name: 'Vue.js', level: 'high' },
      { name: 'Nuxt', level: 'high' },
      { name: 'JavaScript', level: 'high' },
      { name: 'GSAP', level: 'medium' }
    ],
    ventures: [],
    experienceList: [
      {
        period: '2021 — Present',
        title: 'Frontend Dev',
        company: 'WebSolutions',
        description: 'Building interactive marketing sites for global brands.',
        active: true
      }
    ],
    links: [
      { name: 'GitHub', url: 'github.com/davidchen', icon: Code, color: 'bg-slate-800' }
    ],
    image: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: 5,
    name: 'Sarah Jenkins',
    role: 'Engineering Manager',
    headline: 'Scaling engineering teams',
    experience: '12 Years Experience',
    location: 'New York, USA',
    matchScore: 87,
    status: 'away',
    badge: 'Systems Architect',
    badgeColor: 'purple',
    quote: 'Deep expertise in building distributed systems and managing high-growth engineering teams in hyper-scale environments.',
    about: [
      "An engineering leader who still loves to code. I specialize in building distributed systems and fostering engineering cultures that prioritize innovation and reliability.",
      "I have managed teams of 50+ engineers and successfully delivered critical infrastructure projects."
    ],
    skills: [
      { name: 'System Design', level: 'high' },
      { name: 'Go', level: 'high' },
      { name: 'Kubernetes', level: 'high' },
      { name: 'Leadership', level: 'high' }
    ],
    ventures: [
      {
        id: 1,
        name: 'CloudScale',
        role: 'Board Member',
        description: 'Infrastructure consulting',
        icon: Shield,
        color: 'from-green-500 to-emerald-500'
      }
    ],
    experienceList: [
      {
        period: '2019 — Present',
        title: 'Director of Engineering',
        company: 'BigTech',
        description: 'Overseeing cloud infrastructure division.',
        active: true
      },
      {
        period: '2012 — 2019',
        title: 'Principal Engineer',
        company: 'DataCorp',
        description: 'Architected real-time data processing pipeline.',
        active: false
      }
    ],
    links: [
       { name: 'LinkedIn', url: 'linkedin.com/in/sarahj', icon: User, color: 'bg-[#0077b5]' }
    ],
    image: 'https://i.pravatar.cc/150?u=sarah'
  }
];

export const roles = [
  { name: 'All Roles', count: 128 },
  { name: 'Lead UI Designer', count: 12 },
  { name: 'Full-Stack Developer', count: 45 },
  { name: 'Product Manager', count: 8 },
  { name: 'Growth Marketer', count: 21 }
];

export const stats = [
  { label: 'Total Views', value: '14.2k', icon: Eye, color: 'primary' },
  { label: 'New Interests', value: '128', icon: Zap, color: 'emerald' },
  { label: 'Conversion Rate', value: '4.8%', icon: TrendingUp, color: 'amber' }
];
