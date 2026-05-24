import React, { useState, useEffect } from "react";
import { Calculator, Hammer, ArrowRight, ShieldCheck, HelpCircle, CheckCircle } from "lucide-react";

interface EstimateWizardProps {
  onPreFill: (serviceType: string, calculatedScopeSummary: string) => void;
}

export default function EstimateWizard({ onPreFill }: EstimateWizardProps) {
  const [category, setCategory] = useState<"remodels" | "drywall-paint" | "handyman" | "junk">("remodels");
  
  // Specific inputs
  const [remodelType, setRemodelType] = useState<"bathroom" | "kitchen">("bathroom");
  const [remodelSpec, setRemodelSpec] = useState<"standard" | "luxury">("standard");
  const [remodelSize, setRemodelSize] = useState<"small" | "medium" | "large">("medium");

  const [drywallRooms, setDrywallRooms] = useState<number>(3);
  const [drywallComplexity, setDrywallComplexity] = useState<"walls" | "ceilings-and-walls">("walls");

  const [handymanHours, setHandymanHours] = useState<number>(3);

  const [junkVolume, setJunkVolume] = useState<"appliance" | "quarter" | "half" | "full">("quarter");

  // Calculated estimates
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    let min = 0;
    let max = 0;
    let desc = "";

    if (category === "remodels") {
      const isKitchen = remodelType === "kitchen";
      const base = isKitchen ? 8000 : 4500;
      const specMult = remodelSpec === "luxury" ? 1.8 : 1.0;
      const sizeMult = remodelSize === "small" ? 0.7 : remodelSize === "medium" ? 1.0 : 1.5;
      
      min = Math.round(base * specMult * sizeMult);
      max = Math.round(base * 1.25 * specMult * sizeMult);
      desc = `${remodelSpec === "luxury" ? "Luxury Gut" : "Standard"} ${remodelType === "bathroom" ? "Bathroom" : "Kitchen"} Upgrade (${remodelSize} size)`;
    } else if (category === "drywall-paint") {
      const basePerRoom = drywallComplexity === "ceilings-and-walls" ? 450 : 250;
      min = drywallRooms * basePerRoom;
      max = Math.round(drywallRooms * basePerRoom * 1.25);
      desc = `Drywall & Painting/Priming for ${drywallRooms} rooms (${drywallComplexity === "walls" ? "walls only" : "walls & ceilings"})`;
    } else if (category === "handyman") {
      // average Chicago handyman rate is $80-$120/hour
      min = handymanHours * 85;
      max = handymanHours * 115;
      desc = `General Handyman repair service for estimate of ${handymanHours} hours`;
    } else if (category === "junk") {
      const volumeMap = {
        appliance: { min: 95, max: 145, text: "Single Appliance/Large Item Clean-out" },
        quarter: { min: 145, max: 220, text: "1/4 Truckload clean-out" },
        half: { min: 250, max: 375, text: "1/2 Truckload clean-out" },
        full: { min: 450, max: 620, text: "Full Truckload clean-out" }
      };
      min = volumeMap[junkVolume].min;
      max = volumeMap[junkVolume].max;
      desc = volumeMap[junkVolume].text;
    }

    setMinPrice(min);
    setMaxPrice(max);
    setDescription(desc);
  }, [category, remodelType, remodelSpec, remodelSize, drywallRooms, drywallComplexity, handymanHours, junkVolume]);

  const handlePreFillClick = () => {
    const serviceMap = {
      remodels: remodelType === "kitchen" ? "Kitchen Remodeling" : "Bathroom Remodeling",
      "drywall-paint": "Drywall, Flooring & Painting",
      handyman: "Handyman Services",
      junk: "Junk Removal & Clean-outs"
    };

    const serviceTitle = serviceMap[category];
    const summary = `Estimated Cost Range: $${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()} for ${description}. Please contact me to schedule a final free in-person quote.`;
    
    onPreFill(serviceTitle, summary);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="bg-orange-500/10 text-orange-500 text-xs font-bold font-display uppercase tracking-widest px-3 py-1 rounded-md mb-2 inline-block">
            Honest Chicago Estimates
          </span>
          <h3 className="text-2xl md:text-3xl font-bold font-display text-navy-900 flex items-center gap-2">
            <Calculator className="w-7 h-7 text-orange-500 shrink-0" />
            Instant Project Estimator
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Get an instant, honest baseline range before booking. No obligation or credit card required.
          </p>
        </div>
      </div>

      {/* Grid: Inputs (Left) and Live Price Estimate Board (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Step inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Service Category Buttons */}
          <div>
            <label className="block text-xs font-bold font-display uppercase text-gray-500 tracking-wider mb-2.5">
              1. Select Project Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "remodels", label: "Remodeling", icon: Hammer },
                { id: "drywall-paint", label: "Drywall & Paint", icon: Calculator },
                { id: "handyman", label: "Handyman", icon: Calculator },
                { id: "junk", label: "Junk Removal", icon: Calculator },
              ].map((cat) => {
                const isCurrent = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isCurrent 
                        ? "bg-navy-900 border-navy-900 text-white shadow-md font-semibold" 
                        : "bg-slate-50 border-gray-100 text-gray-600 hover:bg-white hover:border-gray-200"
                    }`}
                  >
                    <span className="block text-xs font-semibold font-display truncate">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-gray-150" />

          {/* Conditional Input Details */}
          <div>
            <label className="block text-xs font-bold font-display uppercase text-gray-500 tracking-wider mb-4">
              2. Customize Project Size & Standard
            </label>

            {category === "remodels" && (
              <div className="space-y-4">
                {/* Remodel Sub-Type */}
                <div>
                  <span className="text-xs font-semibold text-gray-600 mb-2 block">Room Type:</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setRemodelType("bathroom")}
                      className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold border ${
                        remodelType === "bathroom"
                          ? "bg-orange-500 text-white border-orange-500 shadow-xs"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-slate-50"
                      }`}
                    >
                      🛁 Bathroom Suite
                    </button>
                    <button
                      onClick={() => setRemodelType("kitchen")}
                      className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold border ${
                        remodelType === "kitchen"
                          ? "bg-orange-500 text-white border-orange-500 shadow-xs"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-slate-50"
                      }`}
                    >
                      🍳 Chef Kitchen
                    </button>
                  </div>
                </div>

                {/* Remodel Spec Level */}
                <div>
                  <span className="text-xs font-semibold text-gray-600 mb-2 block">Crafstmanship level:</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setRemodelSpec("standard")}
                      className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold border ${
                        remodelSpec === "standard"
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-slate-50"
                      }`}
                    >
                      Standard Update (Value-focus)
                    </button>
                    <button
                      onClick={() => setRemodelSpec("luxury")}
                      className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold border ${
                        remodelSpec === "luxury"
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-slate-50"
                      }`}
                    >
                      Premium Custom (Luxury fixtures)
                    </button>
                  </div>
                </div>

                {/* Remodel Sizes */}
                <div>
                  <span className="text-xs font-semibold text-gray-600 mb-2 block">Estimated size:</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "small", desc: "Small (under 60sqft)" },
                      { id: "medium", desc: "Medium (60-120sqft)" },
                      { id: "large", desc: "Large (over 120sqft)" },
                    ].map((sz) => (
                      <button
                        key={sz.id}
                        onClick={() => setRemodelSize(sz.id as any)}
                        className={`py-2 px-2.5 rounded-lg text-[11px] font-semibold border ${
                          remodelSize === sz.id
                            ? "bg-navy-900 text-white border-navy-900"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-slate-50"
                        }`}
                      >
                        {sz.desc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {category === "drywall-paint" && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-gray-600 mb-2 block">
                    Number of Rooms to complete: <strong className="text-orange-500">{drywallRooms} rooms</strong>
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={drywallRooms}
                    onChange={(e) => setDrywallRooms(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-semibold">
                    <span>1 Room</span>
                    <span>5 Rooms</span>
                    <span>10 Rooms</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-gray-600 mb-2 block">Surface Coverage:</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDrywallComplexity("walls")}
                      className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold border ${
                        drywallComplexity === "walls"
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-700 border-gray-200"
                      }`}
                    >
                      Walls Only
                    </button>
                    <button
                      onClick={() => setDrywallComplexity("ceilings-and-walls")}
                      className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold border ${
                        drywallComplexity === "ceilings-and-walls"
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-700 border-gray-200"
                      }`}
                    >
                      Walls + Ceilings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {category === "handyman" && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-gray-600 mb-2 block">
                    Estimated Task Duration (In billable hours): <strong className="text-orange-500">{handymanHours} hours</strong>
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={12}
                    step={1}
                    value={handymanHours}
                    onChange={(e) => setHandymanHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-semibold">
                    <span>1 Hour (Minor repair)</span>
                    <span>6 Hours (Half day)</span>
                    <span>12 Hours (Full day)</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
                    💡 Handyman services include Mounting, Smart Lock installs, hardware assembly, faucet replacements, door setups, etc.
                  </p>
                </div>
              </div>
            )}

            {category === "junk" && (
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-gray-600 mb-2 block">Debris & Junk Volume:</span>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "appliance", desc: "Single Appliance" },
                      { id: "quarter", desc: "1/4 Truckload" },
                      { id: "half", desc: "1/2 Truckload" },
                      { id: "full", desc: "Full Truckload" },
                    ].map((vol) => (
                      <button
                        key={vol.id}
                        onClick={() => setJunkVolume(vol.id as any)}
                        className={`py-2 px-4 rounded-lg text-xs font-semibold border ${
                          junkVolume === vol.id
                            ? "bg-orange-500 text-white border-orange-500"
                            : "bg-white text-gray-700 border-gray-205 hover:bg-slate-50"
                        }`}
                      >
                        📦 {vol.desc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Cost Board Reciept */}
        <div className="lg:col-span-5 bg-navy-900 rounded-2xl p-6 text-white border border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between h-full min-h-[380px]">
          {/* Subtle logo bg */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.03] scale-150 rotate-12 font-black font-display pointer-events-none select-none text-[200px]">
            R9
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] uppercase font-bold text-orange-500 tracking-widest font-display">
                Estimator Receipt
              </span>
              <ShieldCheck className="w-5 h-5 text-orange-500" />
            </div>

            <div className="space-y-4 font-mono text-xs text-slate-350">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>PROJECT TYPE:</span>
                <span className="text-white font-semibold">
                  {category.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2 gap-2">
                <span>SPECIFICATIONS:</span>
                <span className="text-white font-semibold truncate text-right">
                  {description}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>LOCATION TAX/FEE:</span>
                <span className="text-green-400 font-semibold">$0.00 (CHICAGO PROMO)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>ESTIMATE SOURCE:</span>
                <span className="text-white font-semibold">RENO9 ALGORITHM</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="my-8 text-center bg-white/5 p-5 rounded-xl border border-white/5">
              <span className="text-[11px] uppercase tracking-widest font-bold text-orange-400 font-display block mb-1">
                Estimated Price Range
              </span>
              <span className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">
                ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 block mt-2 font-semibold">
                *Subject to final in-person confirmation
              </span>
            </div>
          </div>

          <div className="relative z-10 space-y-3">
            <button
              onClick={handlePreFillClick}
              className="w-full bg-orange-500 text-white font-bold font-display py-3 px-4 rounded-xl hover:bg-orange-600 transition-all shadow-md group flex items-center justify-center gap-2 text-sm"
            >
              Apply to Free Estimate Form
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              <span>We back our estimates with honest local pricing guarantees!</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
