import { 
  Sparkles, 
  Briefcase, 
  Target, 
  CheckCircle2, 
  Rocket, 
  Code2, 
  Users, 
  DollarSign, 
  MoreHorizontal 
} from 'lucide-react';

export const steps = [
  { id: 'name', question: "What's your full name?", placeholder: "e.g., Alex Morgan" },
  { id: 'country', question: "What city and country do you work from?", placeholder: "e.g., San Francisco, USA" },
  { 
    id: 'experience', 
    question: "How many years of startup experience do you have?", 
    options: [
      { id: '0-2', label: '0-2 years', icon: Sparkles, desc: 'Just getting started' },
      { id: '3-5', label: '3-5 years', icon: Briefcase, desc: 'Building momentum' },
      { id: '6-10', label: '6-10 years', icon: Target, desc: 'Seasoned professional' },
      { id: '10+', label: '10+ years', icon: CheckCircle2, desc: 'Veteran expert' }
    ]
  },
  { 
    id: 'role', 
    question: "What role best describes you?", 
    options: [
      { id: 'founder', label: 'Founder', icon: Rocket, desc: 'Building the vision' },
      { id: 'co-founder', label: 'Co-founder', icon: Users, desc: 'Building together' },
      { id: 'investor', label: 'Investor', icon: DollarSign, desc: 'Providing capital' },
      { id: 'talent', label: 'Talent', icon: Code2, desc: 'Bringing skills' }
    ]
  },
  { 
    id: 'skills', 
    question: "What are your top skills? (Type & Hit Enter)", 
    subtext: "Add as many as you like, e.g., React, Marketing, Python",
    isSkillInput: true 
  },
  { id: 'achievements', question: "What's your most notable achievement?", placeholder: "e.g., Scaled app to 10k users in 3 months" },
  { id: 'partnership', question: "What are you looking to connect for?", placeholder: "e.g., Find a co-founder, Fundraising, Mentorship, Collaboration" },
  { id: 'motto', question: "What's your personal motto?", placeholder: "e.g., Move fast and break things" },
  { id: 'time', question: "How much time can you dedicate per week?", placeholder: "e.g., 20 hours, Full-time" },
  { id: 'linkedin', question: "What's your LinkedIn profile URL?", placeholder: "e.g., https://linkedin.com/in/username" },
  { id: 'github', question: "What's your GitHub profile URL?", placeholder: "e.g., https://github.com/username" },
  { id: 'portfolio', question: "Do you have a personal portfolio or website?", placeholder: "e.g., https://my-portfolio.com" },
  { id: 'profile_picture', question: "Upload a profile picture to finish.", file: true },
  { id: 'complete', question: "You're all set! Here's your profile:", summary: true }
];