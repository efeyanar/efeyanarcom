import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  status?: string;
  statusText?: string;
  indexNumber: number;
}

export default function ProjectCard({ 
  title, 
  description, 
  tags, 
  status, 
  statusText, 
  indexNumber 
}: ProjectCardProps) {
  const isProcessing = status === "processing";
  const chipStyles = isProcessing 
    ? "bg-orange-500/10 text-orange-400 border-orange-500/20" 
    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    
  const dotStyles = isProcessing ? "bg-orange-500" : "bg-emerald-500";

  return (
    <div className="bg-bg-card p-10 rounded-[2.5rem] flex flex-col justify-between h-full border border-text-card/5 w-full">
      
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          {statusText && status && (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-black rounded-full border animate-pulse tracking-widest uppercase ${chipStyles}`}>
              <span className={`w-1 h-1 rounded-full ${dotStyles}`}></span>
              {statusText}
            </span>
          )}
          
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] font-black text-text-card/30 uppercase tracking-widest border border-text-card/10 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-4xl font-black text-text-card uppercase tracking-tighter leading-none">
          {title}
        </h3>
        
        <p className="text-text-card/50 font-medium uppercase text-xs leading-relaxed tracking-wide">
          {description}
        </p>
      </div>
      
      <div className="pt-12 text-[10px] font-black text-text-card/20 tracking-[0.5em] uppercase">
        P. {indexNumber}
      </div>

    </div>
  );
}