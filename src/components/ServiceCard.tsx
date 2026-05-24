import React from "react";
import { Home, Hammer, Paintbrush, Wrench, Trash2, CheckCircle2, ArrowRight } from "lucide-react";
import { Service } from "../types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: Home,
  Hammer: Hammer,
  Paintbrush: Paintbrush,
  Wrench: Wrench,
  Trash2: Trash2
};

interface ServiceCardProps {
  key?: string;
  service: Service;
  isSelected?: boolean;
  onSelect?: () => void;
  onSelectForEstimate?: (serviceTitle: string) => void;
}

export default function ServiceCard({ service, isSelected = false, onSelect, onSelectForEstimate }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || Hammer;

  return (
    <div 
      onClick={onSelect}
      className={`group rounded-2xl p-6 transition-all duration-300 border text-left cursor-pointer ${
        isSelected 
          ? "bg-navy-900 border-navy-900 shadow-xl scale-[1.02]" 
          : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl transition-colors ${
          isSelected ? "bg-white/10 text-orange-500" : "bg-orange-500/10 text-orange-500"
        }`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <span className={`text-[10px] uppercase tracking-widest font-bold font-display px-2.5 py-0.5 rounded-full ${
          isSelected ? "bg-white/10 text-white" : "bg-slate-100 text-slate-500"
        }`}>
          Reno9 Certified
        </span>
      </div>

      <h4 className={`text-xl font-bold font-display mb-2 transition-colors ${
        isSelected ? "text-white" : "text-navy-900"
      }`}>
        {service.title}
      </h4>

      <p className={`text-sm leading-relaxed mb-6 transition-colors ${
        isSelected ? "text-slate-350" : "text-gray-600"
      }`}>
        {service.description}
      </p>

      {/* Benefits checklist */}
      <div className="space-y-3 mb-6">
        <h5 className={`text-[11px] font-bold font-display uppercase tracking-wider ${
          isSelected ? "text-orange-500" : "text-navy-900"
        }`}>
          What We Deliver:
        </h5>
        <ul className="space-y-2">
          {service.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs">
              <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${
                isSelected ? "text-orange-500" : "text-orange-500"
              }`} />
              <span className={isSelected ? "text-slate-200" : "text-gray-700"}>
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Select CTA */}
      {onSelectForEstimate && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectForEstimate(service.title);
          }}
          className={`w-full py-2.5 px-4 rounded-xl font-bold font-display text-xs transition-colors flex items-center justify-center gap-1.5 ${
            isSelected 
              ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md" 
              : "bg-navy-900 text-white hover:bg-navy-800"
          }`}
        >
          Select for Free Estimate
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
