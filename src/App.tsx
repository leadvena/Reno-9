import React, { useState, useEffect, useRef } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Star, 
  Menu, 
  X, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Hammer, 
  Home as HomeIcon, 
  Paintbrush, 
  Wrench, 
  Trash2, 
  User, 
  Sparkles, 
  ThumbsUp, 
  Map
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { services, projects, testimonials, serviceAreas, faqs } from "./data";
import { Service, Project, QuoteEstimateRequest } from "./types";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ServiceCard from "./components/ServiceCard";
import EstimateWizard from "./components/EstimateWizard";
import FAQAccordion from "./components/FAQAccordion";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string>("renovations");
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  
  // Contact Form Fields
  const [formData, setFormData] = useState<QuoteEstimateRequest>({
    name: "",
    phone: "",
    email: "",
    serviceType: "Full & Partial Renovations",
    message: "",
    location: "",
    urgency: "ASAP"
  });

  // Form states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formFeedbackMsg, setFormFeedbackMsg] = useState<string>("");
  const [formHighlight, setFormHighlight] = useState<boolean>(false);

  // Focus reference for form highlight
  const contactFormRef = useRef<HTMLDivElement>(null);

  // Handle smooth scroll & active section tracking
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Pre-fill fields from the Estimator Wizard
  const handleEstimatorPreFill = (serviceType: string, calculatedScopeSummary: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: serviceType,
      message: `Estimator requested:\n- ${calculatedScopeSummary}\n\nHi Reno, please contact me to schedule a final in-person free inspection.`
    }));

    // Scroll to contact form
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Flash highlights
    setFormHighlight(true);
    setTimeout(() => {
      setFormHighlight(false);
    }, 2500);
  };

  // Form Submission Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill in your Name, Phone Number, and Email Address so Reno can contact you directly.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API broadcast
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const randomTicket = Math.floor(1000 + Math.random() * 9000);
      setFormFeedbackMsg(`R9-${randomTicket}`);
    }, 1200);
  };

  // Toggle active service selection
  const handleServiceSelect = (id: string) => {
    setSelectedService(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 antialiased selection:bg-orange-500 selection:text-white pb-16 sm:pb-0">
      
      {/* Upper header promo ribbon */}
      <div className="bg-[#0B1F3A] text-white py-2 px-4 text-xs font-semibold border-b border-white/5 relative z-40 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              Serving Chicago & All Surrounding Suburbs
            </span>
            <span className="h-3 w-[1px] bg-white/20" />
            <span className="flex items-center gap-1.5 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              Mon - Sat: 7:00 AM - 6:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-orange-400 font-bold">★ Licensed & Fully Insured</span>
            <span className="h-3 w-[1px] bg-white/20" />
            <a href="tel:7737827768" className="hover:text-orange-400 transition-colors font-bold text-sm tracking-wide flex items-center gap-1">
              📞 Call Reno: 773-782-7768
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-[#0B1F3A] text-white shadow-xl border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo element branding */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-white font-display shadow-lg border border-white/10">
              R9
            </div>
            <div>
              <div className="font-extrabold font-display text-xl leading-none tracking-tight">
                Reno9
              </div>
              <div className="text-[10px] uppercase font-bold text-orange-400 tracking-widest leading-none mt-1">
                Construction
              </div>
            </div>
          </div>

          {/* Nav list - Desktop view */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { id: "home", label: "Home" },
              { id: "services", label: "Services" },
              { id: "gallery", label: "Gallery / Projects" },
              { id: "about", label: "Meet Reno" },
              { id: "contact", label: "Free Estimate" }
            ].map((navItem) => {
              const isCurrent = activeTab === navItem.id;
              return (
                <button
                  key={navItem.id}
                  onClick={() => scrollToSection(navItem.id)}
                  className={`text-sm font-semibold transition-all relative py-1.5 hover:text-orange-400 cursor-pointer ${
                    isCurrent ? "text-orange-500 font-bold" : "text-gray-250"
                  }`}
                >
                  {navItem.label}
                  {isCurrent && (
                    <motion.span 
                      layoutId="activeHeaderDot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-500 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Contact buttons - Desktop view */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:7737827768"
              className="px-4 py-2 border border-white/20 hover:border-orange-500 hover:text-orange-500 text-sm font-semibold rounded-xl text-white transition-all flex items-center gap-2 bg-white/5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              773-782-7768
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-extrabold tracking-wide py-2.5 px-5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Get Free Estimate
            </button>
          </div>

          {/* Mobile drawer toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a 
              href="tel:7737827768" 
              className="p-2.5 bg-orange-500 text-white rounded-xl shadow-md cursor-pointer"
              title="Call Contractor"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-xl border border-white/10 bg-white/5 cursor-pointer"
              aria-label="Navigation drawer menu toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile slide-out overlay drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/10 bg-[#0B1F3A]/98 backdrop-blur-xl"
            >
              <div className="px-5 py-6 space-y-4">
                {[
                  { id: "home", label: "Home" },
                  { id: "services", label: "Services Provided" },
                  { id: "gallery", label: "Project Gallery" },
                  { id: "about", label: "Meet Reno Flores" },
                  { id: "contact", label: "Contact & Free Estimate" }
                ].map((navItem) => (
                  <button
                    key={navItem.id}
                    onClick={() => scrollToSection(navItem.id)}
                    className="block w-full text-left py-2.5 text-base font-medium text-gray-200 hover:text-orange-400 border-b border-white/5"
                  >
                    {navItem.label}
                  </button>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                    <p className="text-xs text-orange-400 font-semibold mb-1">Owner Reno Flores Core Phone</p>
                    <a href="tel:7737827768" className="text-xl font-bold text-white tracking-wider flex items-center justify-center gap-2">
                      📞 773-782-7768
                    </a>
                  </div>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-orange-500 text-white font-extrabold text-center py-3 rounded-xl shadow-lg hover:bg-orange-600 block transition-all"
                  >
                    Request Free Estimate
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* LANDING VIEW SECTION 1: HERO */}
      <section id="home" className="relative min-h-[520px] md:min-h-[640px] flex items-center overflow-hidden bg-[#0B1F3A] text-white">
        {/* Immersive high resolution background grid overlay with parallax styled mask */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop" 
            alt="Chicago Custom Home Renovation Framing" 
            className="w-full h-full object-cover select-none pointer-events-none filter brightness-50 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/85 to-transparent" />
        </div>

        {/* Brand visual shape accent */}
        <div className="absolute right-0 bottom-0 w-1/3 h-2/3 bg-orange-500/10 rounded-tl-[300px] pointer-events-none select-none filter blur-2xl block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Headlines block */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-500/25 text-orange-400 px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest border border-orange-500/30">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Licensed & Insured Chicagoland Contractor
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.1]">
                Chicago's Trusted <span className="text-orange-500">Renovation</span> & Handyman Experts
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                Fast. Honest. Quality Work — Free Estimates Available. From complete home gut renovations to swift handyman repairs, we treat your space with elite care.
              </p>

              {/* USP mini indicators list */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-4 pt-2">
                {[
                  "Bathroom & Kitchens",
                  "Drywall & Flooring",
                  "Handyman Repairs",
                  "Fast Free Estimating",
                  "Honest Upfront Rates",
                  "Satisfaction Guaranteed"
                ].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              {/* Call to Actions buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-orange-500 hover:bg-orange-600 active:scale-98 text-white text-base font-extrabold tracking-wide py-4 px-8 rounded-xl transition-all shadow-xl hover:shadow-orange-500/20 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  Get Your Free Estimate
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="tel:7737827768"
                  className="bg-white/10 hover:bg-white/15 text-white py-4 px-8 rounded-xl font-bold font-display text-base transition-all text-center border border-white/15 flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>Call 773-782-7768</span>
                </a>
              </div>

              {/* Core trust numbers display */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 max-w-md">
                <div>
                  <div className="text-2xl font-black font-display text-orange-500">100%</div>
                  <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-display text-white">Chicagoland</div>
                  <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Service Coverage</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-display text-orange-500">Fast</div>
                  <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Response Times</div>
                </div>
              </div>

            </div>

            {/* Visual preview widget (Hero CTA assistant card) */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-base">
                    👤
                  </div>
                  <div>
                    <h4 className="font-extrabold font-display text-white">Meet Reno Flores</h4>
                    <p className="text-xs text-orange-400 font-semibold font-display">Owner & Head Contractor</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2 text-sm text-slate-300 italic">
                  "Our mission is simple: honest, high-quality contracting at a price that respects your wallet. If you are in Cook, DuPage, or Lake County, give me a call today."
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs font-bold font-display tracking-wider text-gray-400 uppercase">
                    Select Your Next Service Request:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Bathroom Remodel",
                      "Kitchen Upgrade",
                      "Drywall & Paint",
                      "Handyman Service",
                      "Junk Cleanouts",
                      "Flooring Install"
                    ].map((title, i) => (
                      <button 
                        key={i} 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, serviceType: title }));
                          scrollToSection("contact");
                        }}
                        className="text-left text-xs bg-white/5 py-2 px-3 rounded-lg hover:bg-orange-500/10 hover:text-orange-400 transition-all font-semibold select-none border border-white/5 inline-block"
                      >
                        ⚡ {title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* LANDING VIEW SECTION 2: USP TRUST STRIP */}
      <section className="bg-orange-500 text-white font-semibold relative z-10 py-5 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { text: "Fast & Reliable", desc: "No delays, prompt work" },
              { text: "Honest Pricing", desc: "Itemized estimates, no secrets" },
              { text: "Quality Workmanship", desc: "Crafted to high Chicago codes" },
              { text: "Free Estimates", desc: "Call for direct quotes" }
            ].map((usp, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center justify-center gap-3 group">
                <div className="w-10 h-10 bg-[#0B1F3A] text-orange-500 rounded-full flex items-center justify-center font-bold text-lg shadow-md shrink-0 border border-white/10">
                  ✓
                </div>
                <div className="text-left">
                  <span className="font-display font-black text-sm sm:text-base md:text-lg block tracking-tight">
                    {usp.text}
                  </span>
                  <span className="text-[11px] text-white/80 font-semibold block uppercase tracking-wider">
                    {usp.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* LANDING VIEW SECTION 3: SERVICES */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto mb-16">
            <span className="bg-[#0B1F3A]/10 text-[#0B1F3A] text-xs font-black font-display uppercase tracking-widest px-3 py-1 rounded-md mb-3 inline-block">
              Residential & Light Commercial
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0B1F3A] tracking-tight">
              Our Professional Services
            </h2>
            <div className="w-16 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
              We provide full-spectrum repair, remodeling, and clutter removal solutions for residential homeowners, realtors, landlords, and businesses across the Chicago suburban areas.
            </p>
          </div>

          {/* Interactive grid layout cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv) => (
              <ServiceCard
                key={srv.id}
                service={srv}
                isSelected={selectedService === srv.id}
                onSelect={() => handleServiceSelect(srv.id)}
                onSelectForEstimate={(title) => {
                  setFormData(prev => ({ ...prev, serviceType: title }));
                  scrollToSection("contact");
                }}
              />
            ))}

            {/* Mini Contact CTA Card inside grid */}
            <div className="rounded-2xl p-8 bg-[#0B1F3A] text-white border border-[#0B1F3A] flex flex-col justify-between items-start text-left hover:shadow-xl transition-all hover:-translate-y-1">
              <div>
                <span className="text-orange-500 font-bold font-display uppercase text-[10px] tracking-widest block mb-1">
                  Custom Projects
                </span>
                <h4 className="text-2xl font-bold font-display tracking-tight leading-snug mb-3 text-white">
                  Have a custom or unlisted Repair request?
                </h4>
                <p className="text-xs text-slate-350 leading-relaxed mb-6">
                  Owner Reno Flores specializes in many bespoke custom requests: porch repairs, door custom alignment, deck restain, light demolition, and structural woodwork. Call us directly to speak about your exact specifications!
                </p>
              </div>

              <div className="w-full">
                <a 
                  href="tel:7737827768"
                  className="w-full bg-orange-500 hover:bg-orange-600 font-extrabold text-[#0B1F3A] rounded-xl py-3 px-4 text-center block text-sm transition-all text-white font-display mb-3 shadow-md"
                >
                  📞 Call Reno Flores Now
                </a>
                <span className="text-[10px] text-gray-400 block text-center font-semibold uppercase">
                  Direct Line: 773-782-7768
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* LANDING VIEW SECTION 4: GALLERY BEFORE/AFTER COMPARES */}
      <section id="gallery" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-16 col-span-12">
            <span className="bg-orange-400/20 text-orange-400 text-xs font-extrabold font-display uppercase tracking-widest px-3 py-1 rounded-md mb-3 inline-block">
              Proven Results
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              Before & After Gallery
            </h2>
            <div className="w-16 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
              We believe in total work honesty. Toggle our actual client project states below and drag the comparison vertical slider to see our real drywall, kitchen, bathroom, and basement finishes in Chicago.
            </p>
          </div>

          {/* Project toggle select tab row */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-lg mx-auto bg-white/5 p-1.5 rounded-2xl border border-white/10">
            {projects.map((proj, idx) => {
              const isActive = activeProjectIdx === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`flex-1 py-2.5 px-4 text-xs font-bold font-display tracking-wide rounded-xl transition-all cursor-pointer truncate ${
                    isActive 
                      ? "bg-orange-500 text-white shadow-md font-semibold" 
                      : "text-slate-350 hover:text-white"
                  }`}
                >
                  {proj.category}
                </button>
              );
            })}
          </div>

          {/* Slider render container */}
          <div className="max-w-5xl mx-auto">
            <BeforeAfterSlider project={projects[activeProjectIdx]} />
          </div>

        </div>
      </section>


      {/* LANDING VIEW SECTION 5: ESTIMATOR WIZARD INSTANT CALCULATOR */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EstimateWizard onPreFill={handleEstimatorPreFill} />
        </div>
      </section>


      {/* LANDING VIEW SECTION 6: ABOUT OWNER RENO FLORES */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Portrait illustration using real Unsplash design */}
            <div className="lg:col-span- così lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50 relative z-10 bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop" 
                  alt="Reno Flores Chicago Contractor Handyman Owner" 
                  className="w-full h-full object-cover select-none pointer-events-none filter contrast-[1.01]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating highlight badge */}
                <div className="absolute right-6 bottom-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 space-y-1.5 z-20">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 font-display leading-none">Chicagoland Rated</p>
                  <p className="text-xs font-extrabold text-[#0B1F3A] font-display">5.0 Star Average</p>
                </div>
              </div>

              {/* Decorative behind blocks */}
              <div className="absolute -left-6 -bottom-6 w-1/2 h-1/2 bg-orange-500 rounded-3xl z-0 pointer-events-none select-none block" />
              <div className="absolute -right-6 -top-6 w-1/3 h-1/3 bg-[#0B1F3A] rounded-full z-0 pointer-events-none select-none block opacity-10" />
            </div>

            {/* About content block */}
            <div className="lg:col-span-7 space-y-6">
              <span className="bg-orange-500/10 text-orange-500 text-xs font-black font-display uppercase tracking-widest px-3 py-1 rounded-md mb-2 inline-block">
                Owner Operator
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0B1F3A] tracking-tight">
                Meet Reno Flores
              </h2>
              <p className="text-lg font-bold font-display text-[#0B1F3A] leading-relaxed">
                Chicago local contractor, family-first craftsman, and advocate for honest, high-quality residential construction.
              </p>

              <div className="space-y-4 text-sm sm:text-base text-gray-655 leading-relaxed">
                <p>
                  Hello Chicagoland area neighbors! I am Reno Flores, the owner and operator of <strong>Reno9 Construction</strong>. Having served people around the Chicago area, I created this business based on a very simple and powerful idea: <strong>that local homeowners should expect direct communication, stellar craftsmanship, and transparent pricing without playing guessing games.</strong>
                </p>
                <p>
                  We are not a massive out-of-state franchise that pushes salesman tactics or inflated baseline hidden fees onto our clients. When you request an estimate, I speak with you personally, I inspect the site personally, and I inspect the framing, tile lines, and drywall patches myself. 
                </p>
                <p>
                  Our services cater to families, realtors prepping units for listing, elderly couples needing light safety handyman mounts, and residential spaces needing clean remodels that endure Chicago's tough winters. Whether you reside in the Wicker Park Loop area, Schaumburg, Evanston, or Oak Park, we look forward to earning your trust.
                </p>
              </div>

              {/* Bio signature quotes */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-gray-150 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-700">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B1F3A] font-display">Fast. Honest. Quality Work Guaranteed</h4>
                  <p className="text-xs text-slate-450 mt-0.5">Every drywall cut, tile seal, and debris pick-up is held to my personal high standard.</p>
                </div>
              </div>

              {/* Direct signature */}
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-extrabold font-display text-lg text-[#0B1F3A]">Reno Flores</div>
                  <div className="text-xs text-gray-400 font-semibold font-display">Owner & Licensed Contractor, Cook County IL</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* LANDING VIEW SECTION 7: TESTIMONIALS */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-2xl mx-auto mb-16">
            <span className="bg-[#0B1F3A]/10 text-[#0B1F3A] text-xs font-black font-display uppercase tracking-widest px-3 py-1 rounded-md mb-2 inline-block">
              Client Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0B1F3A] tracking-tight">
              Chicagoland Word of Mouth
            </h2>
            <div className="w-16 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full" />
            <p className="text-sm text-gray-600 mt-4">
              Join dozens of Chicago residents who trust Reno9 for honest pricing and stellar remodels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div 
                key={test.id}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col justify-between items-start text-left hover:shadow-lg transition-all hover:-translate-y-1 block"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-3 text-orange-500">
                    {[...Array(test.score)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                    ))}
                  </div>

                  <p className="text-sm text-gray-650 italic leading-relaxed mb-6 font-medium">
                    "{test.text}"
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#0B1F3A] font-display block">
                      {test.name}
                    </span>
                    <span className="text-gray-400 block mt-0.5">
                      📍 {test.location}
                    </span>
                  </div>
                  <span className="bg-orange-500/10 text-orange-500 font-bold px-2.5 py-1 rounded-md text-[10px] font-display uppercase">
                    {test.serviceType}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white rounded-2xl max-w-2xl mx-auto border border-gray-100 text-sm font-semibold flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-slate-600">Want to check out recent project reports in your area?</span>
            </div>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-orange-500 hover:text-orange-600 font-extrabold transition-colors flex items-center gap-1 cursor-pointer"
            >
              Get Free Estimate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>


      {/* LANDING VIEW SECTION 8: CONTACT FORM & MAPS EMBED */}
      <section id="contact" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact details and Google Maps visual (Left) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="bg-orange-500/10 text-orange-500 text-xs font-black font-display uppercase tracking-widest px-3 py-1 rounded-md mb-2 inline-block">
                  No Obligation
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0B1F3A] tracking-tight">
                  Contact Us & Get A Free Estimate
                </h2>
                <div className="w-16 h-1.5 bg-orange-500 mt-4 rounded-full" />
                <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                  Call owner Reno Flores directly or send your service requirements using the estimate request wizard. We respond to emails within 24 hours.
                </p>
              </div>

              {/* Direct details box */}
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-gray-150">
                <a 
                  href="tel:7737827768" 
                  className="flex items-center gap-4 group p-2 hover:bg-orange-500/5 rounded-xl transition-all"
                >
                  <div className="w-11 h-11 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-md grow-0 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider font-display leading-none mb-1">Owner Telephone</span>
                    <span className="text-lg font-black font-display text-[#0B1F3A] tracking-wide group-hover:text-orange-500 transition-colors">773-782-7768</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-2">
                  <div className="w-11 h-11 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-md shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider font-display leading-none mb-1">Contractor Email</span>
                    <span className="text-base font-extrabold font-display text-[#0B1F3A] truncate">floresconstruction@reno9.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-2">
                  <div className="w-11 h-11 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-md shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider font-display leading-none mb-1">Primary Base Office</span>
                    <span className="text-sm font-semibold text-gray-700">Chicago, IL and Surrounding Areas</span>
                  </div>
                </div>
              </div>

              {/* Real Google Maps embed for Chicago, IL Area */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold font-display uppercase tracking-widest text-[#0B1F3A] flex items-center gap-1.5 matches-map">
                  <Map className="w-4 h-4 text-orange-500" />
                  Our Chicago Service Coverage Map:
                </h4>
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md border border-gray-150 h-56 relative bg-slate-100">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190025.2647184284!2d-87.87205167574345!3d41.833647895058765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL!5e0!3m2!1sen!2sus!4v1716500000000!5m2!1sen!2sus"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Chicago Illinois Reno9 Area Map"
                  ></iframe>
                </div>
              </div>

            </div>

            {/* Estimate request Form (Right) */}
            <div 
              ref={contactFormRef}
              className={`lg:col-span-7 bg-slate-50 rounded-3xl p-6 md:p-8 border transition-all duration-300 ${
                formHighlight 
                  ? "border-orange-500 shadow-2xl ring-4 ring-orange-500/10 scale-[1.01]" 
                  : "border-gray-150 shadow-xl"
              }`}
            >
              
              <div className="mb-6 font-display border-b border-gray-200 pb-4">
                <h3 className="text-xl md:text-2xl font-black text-[#0B1F3A]">
                  Free Estimate Request Form
                </h3>
                <p className="text-xs text-gray-550 mt-1">
                  Submit detailed goals and get direct dispatch estimates from Reno. No booking obligations.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-10 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-3xl mx-auto shadow-md">
                    ✓
                  </div>
                  <h4 className="text-2xl font-extrabold font-display text-[#0B1F3A]">
                    Thank You, {formData.name}!
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
                    Your free estimate ticket number is <strong className="font-mono text-orange-500 bg-orange-50 px-2 py-0.5 rounded">{formFeedbackMsg}</strong>. 
                    Owner Reno Flores has received your request regarding <strong>{formData.serviceType}</strong> and will reach out to you directly at <strong className="text-[#0B1F3A]">{formData.phone}</strong> or <strong className="text-[#0B1F3A]">{formData.email}</strong> within 1 business day.
                  </p>
                  <p className="text-xs text-orange-500 font-bold font-display uppercase tracking-wider block pt-2">
                    ⚡ Fast. Honest. Quality Guaranteed.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        serviceType: "Full & Partial Renovations",
                        message: "",
                        location: "",
                        urgency: "ASAP"
                      });
                    }}
                    className="mt-4 bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white font-bold font-display px-6 py-2 rounded-xl text-xs transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold font-display uppercase text-gray-500 tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-hidden py-3 px-4 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold font-display uppercase text-gray-500 tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="773-XXX-XXXX"
                        className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-hidden py-3 px-4 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold font-display uppercase text-gray-500 tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="johndoe@gmail.com"
                        className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-hidden py-3 px-4 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold font-display uppercase text-gray-500 tracking-wider mb-1.5">
                        Select Service Type
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-hidden py-3 px-4 rounded-xl text-sm"
                      >
                        <option>Full & Partial Renovations</option>
                        <option>Bathroom Remodeling</option>
                        <option>Kitchen Remodeling</option>
                        <option>Drywall, Flooring & Painting</option>
                        <option>Handyman Services</option>
                        <option>Junk Removal & Clean-outs</option>
                        <option>Other Custom Construction</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold font-display uppercase text-gray-500 tracking-wider mb-1.5">
                        Chicago Neighborhood / Suburb
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Lincoln Park, Schaumburg"
                        className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-hidden py-3 px-4 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold font-display uppercase text-gray-500 tracking-wider mb-1.5">
                        Urgency level
                      </label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-hidden py-3 px-4 rounded-xl text-sm"
                      >
                        <option>Emergency (ASAP repair)</option>
                        <option>Next 30 Days</option>
                        <option>Planning Phase (next 60-90 days)</option>
                        <option>Flexible / Looking for quotes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-display uppercase text-gray-500 tracking-wider mb-1.5">
                      Tell Reno about your Project Details
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe what rooms are involved, specific repairs needed, framing requirements, or size details. Reno uses this to prepare your review."
                      className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-hidden py-3 px-4 rounded-xl text-sm leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="rounded-xl bg-orange-500/10 p-4 border border-orange-500/20 text-xs text-orange-400 font-semibold leading-relaxed flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span>
                      Reno9 respects your inbox privacy. We will NEVER share, sell, or rent your phone numbers or contact details to third-party list brokers. We strictly use them for project estimates and callbacks.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0B1F3A] text-white hover:bg-orange-500 active:scale-98 font-black font-display tracking-wide py-4 px-6 rounded-xl transition-all shadow-md group flex items-center justify-center gap-2 text-sm uppercase cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        Generating Fast Estimate...
                      </span>
                    ) : (
                      <>
                        Submit Estimating Request
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>


      {/* LANDING VIEW SECTION 9: FAQs ACCORDION */}
      <section className="py-20 bg-slate-50 border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="bg-[#0B1F3A]/10 text-[#0B1F3A] text-xs font-black font-display uppercase tracking-widest px-3 py-1 rounded-md mb-2 inline-block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-[#0B1F3A] tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full" />
            <p className="text-sm text-gray-500 mt-4">
              Get immediate clarity on licenses, suburbs served, insurance, and the free estimation process.
            </p>
          </div>

          <FAQAccordion items={faqs} />

        </div>
      </section>


      {/* FOOTER AREA */}
      <footer className="bg-[#0B1F3A] text-white pt-16 pb-12 relative overflow-hidden">
        {/* Subtle decorative visual elements */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-500/5 rounded-full pointer-events-none filter blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12">
            
            {/* Business info column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white font-display">
                  R9
                </div>
                <div>
                  <div className="font-extrabold font-display text-lg tracking-tight leading-none text-white">
                    Reno9
                  </div>
                  <div className="text-[9px] uppercase font-bold text-orange-400 tracking-wider leading-none mt-1">
                    Construction
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Chicago's premier residential partner for kitchen gut remodels, modern tiles, flawless drywall patches, painting, gate setups, and responsive handyman fixups.
              </p>
              <div className="pt-2">
                <p className="text-xs text-orange-400 font-bold font-display uppercase tracking-widest leading-none">Registered Chicago Address</p>
                <p className="text-sm font-semibold text-slate-300 mt-1">Chicago, Illinois, USA</p>
              </div>
            </div>

            {/* Service Areas column */}
            <div className="md:col-span-5 space-y-4">
              <h4 className="text-xs font-bold font-display uppercase tracking-widest text-orange-400">
                Lical Suburbs & Service Areas List:
              </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <div className="space-y-1.5">
                  <span className="block text-xs font-extrabold text-[#ffffff] font-display">🏙️ Chicago (Primary)</span>
                  <span className="block text-[11px] text-gray-400">Loop, Wicker Park, Lincoln Park, Lakeview, Logan Square</span>
                </div>
                <div className="space-y-1.5">
                  <span className="block text-xs font-extrabold text-[#ffffff] font-display">🏡 Schaumburg Suburb</span>
                  <span className="block text-[11px] text-gray-400">Hoffman Estates, Roselle, Palatine</span>
                </div>
                <div className="space-y-1.5">
                  <span className="block text-xs font-extrabold text-[#ffffff] font-display">🚗 Naperville Suburb</span>
                  <span className="block text-[11px] text-gray-400">Aurora, Lisle, Warrenville</span>
                </div>
                <div className="space-y-1.5">
                  <span className="block text-xs font-extrabold text-[#ffffff] font-display">🌳 Oak Park Suburb</span>
                  <span className="block text-[11px] text-gray-400">River Forest, Cicero, Berwyn</span>
                </div>
                <div className="space-y-1.5 col-span-2">
                  <span className="block text-xs font-extrabold text-[#ffffff] font-display">🌊 Evanston & North Shore Suburb</span>
                  <span className="block text-[11px] text-gray-400">Skokie, Wilmette, Glenview, Park Ridge, and surrounding suburbs</span>
                </div>
              </div>
            </div>

            {/* Business hours & direct contact */}
            <div className="md:col-span-3 space-y-4 text-xs">
              <h4 className="text-xs font-bold font-display uppercase tracking-widest text-orange-400">
                Operating Schedule
              </h4>
              <div className="space-y-2 text-slate-350">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-white font-semibold">7:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-white font-semibold">8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-orange-400 font-bold font-display">Closed (Rest)</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 space-y-2">
                <p className="text-slate-400">Need emergency repairs?</p>
                <a href="tel:7737827768" className="bg-orange-500 hover:bg-orange-600 font-bold block py-2.5 px-4 text-center rounded-lg text-white font-display text-xs transition-colors shadow-md">
                   Call 773-782-7768
                </a>
              </div>
            </div>

          </div>

          {/* Under footer */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-mono">
            <div>
              © {new Date().getFullYear()} Reno9 Construction. All Rights Reserved.
            </div>
            <div className="flex gap-4">
              <span>Licensed Contractor</span>
              <span>•</span>
              <span>Fully Insured 2026</span>
              <span>•</span>
              <span>Website Code: React SPA</span>
            </div>
          </div>

        </div>
      </footer>


      {/* CLICK-TO-CALL FIXED MOBILE RECONSTRUCTION BANNER */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B1F3A] border-t border-white/10 p-3.5 flex sm:hidden justify-between items-center z-45 shadow-2xl animate-fade-in gap-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-orange-500 rounded-full animate-ping shrink-0" />
          <div className="text-left">
            <span className="block text-[10px] text-orange-400 uppercase font-black uppercase tracking-wider leading-none mb-1">Talk to Reno Flores</span>
            <span className="text-xs text-white leading-none font-bold">Fast Estimates Dispatch Room</span>
          </div>
        </div>
        <a 
          href="tel:7737827768"
          className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold font-display text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" />
          773-782-7768
        </a>
      </div>

    </div>
  );
}
