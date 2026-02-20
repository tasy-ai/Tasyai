import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Availability = ({ content }) => {
  if (!content) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Clock className="size-5 text-green-500 transition-transform group-hover:animate-pulse" />
        </div>
        <h4 className="font-bold text-white text-lg">Availability</h4>
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
        <p className="text-slate-200 font-medium">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

export default Availability;
