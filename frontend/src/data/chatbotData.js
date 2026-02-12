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
  { id: 'country', question: "Where are you based?", placeholder: "e.g., San Francisco, CA" },
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
  { id: 'experience_desc', question: "Tell me a bit about your journey.", placeholder: "e.g., Ex-Google PM, built 2 SaaS products..." },
  { 
    id: 'role', 
    question: "What role best describes you?", 
    options: [
      { id: 'founder', label: 'Founder', icon: Rocket, desc: 'Building the vision' },
      { id: 'developer', label: 'Developer', icon: Code2, desc: 'Building the product' },
      { id: 'designer', label: 'Designer', icon: Sparkles, desc: 'Crafting experiences' },
      { id: 'educator', label: 'Educator', icon: Users, desc: 'Sharing knowledge' },
      { id: 'investor', label: 'Investor', icon: DollarSign, desc: 'Providing capital' },
      { id: 'other', label: 'Other', icon: MoreHorizontal, desc: 'Mentor / Advisor' }
    ]
  },
  { id: 'achievements', question: "What are you most proud of achieving?", placeholder: "e.g., Scaled app to 10k users in 3 months" },
  { id: 'partnership', question: "What type of partnership are you looking for?", placeholder: "e.g., Co-founder, Mentor, Networking" },
  { id: 'motto', question: "What's your personal motto?", placeholder: "e.g., Move fast and break things" },
  { id: 'time', question: "How much time can you dedicate per week?", placeholder: "e.g., 20 hours, Full-time" },
  { 
    id: 'skills', 
    question: "What are your superpowers? (Type & Hit Enter)", 
    subtext: "Add as many skills as you like, e.g., React, Marketing, Python",
    isSkillInput: true 
  },
  { id: 'skills_experience', question: "Elaborate on your top skills.", placeholder: "e.g., 5 years in React, 2 years leading teams..." },
  { id: 'profile_picture', question: "Upload a profile picture to finish.", file: true },
  { id: 'complete', question: "You're all set! Here's your profile:", summary: true }
];
