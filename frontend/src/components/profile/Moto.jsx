import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Moto = ({ content }) => {
  if (!content) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Quote className="size-5 text-purple-500 transition-transform group-hover:rotate-12" />
        </div>
        <h4 className="font-bold text-white text-lg">Moto</h4>
      </div>
      <blockquote className="text-slate-300 italic leading-relaxed border-l-2 border-purple-500/30 pl-4 py-1">
        "{content}"
      </blockquote>
    </motion.div>
  );
};

export default Moto;
