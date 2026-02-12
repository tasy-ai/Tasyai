import { 
  MapPin, 
  Coins, 
  Clock, 
  Brain, 
  Leaf, 
  Share2, 
  Sun, 
  Cloud, 
  HeartPulse, 
  Bot, 
  Shield 
} from 'lucide-react';

export const filters = [
  { name: 'All Roles', icon: null },
  { name: 'Remote', icon: MapPin },
  { name: 'Equity', icon: Coins },
  { name: 'Full-time', icon: Clock },
  { name: 'AI/ML', icon: Brain },
  { name: 'Sustainability', icon: Leaf },
];

export const companies = [
  {
    id: 1,
    name: 'Aura AI',
    description: 'Building the next generation of generative AI agents for enterprise automation and creative workflows.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=200',
    color: 'primary',
    roles: ['Lead Dev', 'UX Designer'],
    saved: false
  },
  {
    id: 2,
    name: 'Lumina',
    description: 'Sustainable energy solutions for modern cities through smart grid integration and storage.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200',
    color: 'orange',
    roles: ['Frontend Eng', 'Product Manager'],
    saved: false
  },
  {
    id: 3,
    name: 'Nebula Systems',
    description: 'Decentralized cloud infrastructure optimized for Web3 applications and high-security distributed data storage.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=200',
    color: 'emerald',
    roles: ['Backend Eng', 'DevOps'],
    saved: true
  },
  {
    id: 4,
    name: 'Pulse Tech',
    description: 'Real-time health monitoring and predictive analytics for personalized healthcare and athlete performance.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200',
    color: 'rose',
    roles: ['Data Scientist', 'ML Eng'],
    saved: false
  },
  {
    id: 5,
    name: 'Vertex Labs',
    description: 'Next-gen robotics for automated logistics, specialized in last-mile delivery and warehouse efficiency.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200',
    color: 'cyan',
    roles: ['Hardware Eng', 'Product Designer'],
    saved: false
  },
  {
    id: 6,
    name: 'Cipher Stream',
    description: 'Privacy-first data streaming and encryption services for high-compliance industries like Finance and Defense.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200',
    color: 'purple',
    roles: ['Security Lead', 'Fullstack Dev'],
    saved: false
  }
];
