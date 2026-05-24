import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Project } from "../types";

interface SliderProps {
  project: Project;
}

export default function BeforeAfterSlider({ project }: SliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row h-full">
      {/* Slider Interactive Area */}
      <div className="w-full md:w-3/5 relative aspect-video md:h-[420px] bg-slate-100 select-none overflow-hidden">
        <div 
          ref={containerRef}
          className="w-full h-full relative cursor-ew-resize overflow-hidden"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            if (e.touches && e.touches[0]) {
              handleMove(e.touches[0].clientX);
            }
          }}
        >
          {/* Base: After Image (fully loaded behind) */}
          <img 
            src={project.afterImage} 
            alt="After Renovation" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute right-4 top-4 bg-navy-900/95 text-white text-xs font-bold font-display uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-xs border border-white/20">
            After
          </div>

          {/* Overlay: Before Image (clipped on right) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` 
            }}
          >
            <img 
              src={project.beforeImage} 
              alt="Before Renovation" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute left-4 top-4 bg-orange-500/95 text-white text-xs font-bold font-display uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10 border border-white/10">
            Before
          </div>

          {/* Interactive Bar Divider */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-25 shadow-lg group"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 active:scale-95 border-2 border-white cursor-ew-resize">
              <ChevronLeft className="w-4 h-4 -mr-0.5 shrink-0" />
              <ChevronRight className="w-4 h-4 -ml-0.5 shrink-0" />
            </div>
          </div>

          {/* Drag instruction overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[10px] md:text-xs font-medium px-4 py-1.5 rounded-full pointer-events-none flex items-center gap-1.5 backdrop-blur-xs shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            Drag or slide to compare quality
          </div>
        </div>
      </div>

      {/* Description Info Area */}
      <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-slate-50 border-t md:border-t-0 md:border-l border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-navy-900/10 text-navy-900 text-[10px] uppercase font-bold font-display tracking-widest px-2.5 py-0.5 rounded-md">
              {project.category}
            </span>
            <span className="text-gray-400 text-xs font-medium">
              • {project.location}
            </span>
          </div>
          <h4 className="text-xl md:text-2xl font-bold font-display text-navy-900 leading-tight mb-3">
            {project.title}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="space-y-3">
            <h5 className="text-xs font-bold font-display uppercase text-gray-450 tracking-wider">
              Project Work Scope:
            </h5>
            <ul className="space-y-2">
              {project.scope.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
          <span>Contractor: Reno Flores</span>
          <span className="font-semibold text-navy-900">Reno9 Guaranteed</span>
        </div>
      </div>
    </div>
  );
}
