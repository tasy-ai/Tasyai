import React from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const Achievements = ({ content }) => {
  if (!content) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-amber-500/20 rounded-lg">
          <Trophy className="size-5 text-amber-500 transition-transform group-hover:scale-110" />
        </div>
        <h4 className="font-bold text-white text-lg">Achievements</h4>
      </div>
      <p className="text-slate-300 leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
};

export default Achievements;
