import { Service, Project, Testimonial, ServiceArea } from "./types";

export const services: Service[] = [
  {
    id: "renovations",
    title: "Full & Partial Renovations",
    description: "Complete home transformation services. From design consultation to finish carpentry, we handle structural improvements, space optimization, and modern upgrades.",
    benefits: [
      "Custom design tailored to your lifestyle",
      "Phased schedules to minimize household disruption",
      "Permits & code adherence handled for Chicago & suburbs",
      "Premium materials with durable artisan craftsmanship"
    ],
    iconName: "Home"
  },
  {
    id: "remodels",
    title: "Bathroom & Kitchen Remodels",
    description: "Elevate your daily living with highly detailed bathroom and kitchen updates. Custom tile work, fixture installations, cabinet assembly, and elegant countertop fittings.",
    benefits: [
      "Custom tile alignment & luxury walk-in showers",
      "Cabinetry, pantry systems, and premium hardware",
      "Splash-backs, task lighting, and plumbing integration",
      "Boosts home value significantly"
    ],
    iconName: "Hammer"
  },
  {
    id: "drywall-paint",
    title: "Drywall, Flooring & Painting",
    description: "Flawless wall finishes and durable wood/tile/LVP flooring options. Professional paint application for smooth satin or matte finishes that endure Chicago's seasonal changes.",
    benefits: [
      "Dust-controlled drywall sanding & crack repairs",
      "Precision floor leveling & carpet-to-wood upgrades",
      "Flawless double-coat crisp paint finishes",
      "Stain-resistant topcoats for heavy-traffic areas"
    ],
    iconName: "Paintbrush"
  },
  {
    id: "handyman",
    title: "Handyman Services",
    description: "Prompt, insured repairs for those tricky tasks. Mounting TV screens, repairing deck boards, replacing locks, changing faucets, and routine property maintenance.",
    benefits: [
      "Safety-certified wall anchor & mirror mounting",
      "No job too small — faucet swaps, loose hinges, gate fixes",
      "Quick response timers & transparent flat-rate options",
      "Fully loaded mobil-van with specialized trade tools"
    ],
    iconName: "Wrench"
  },
  {
    id: "junk-removal",
    title: "Junk Removal & Clean-outs",
    description: "Reclaim your garage, basement, or attic space. Quick, clean, and environmentally sensible disposal of old appliances, furniture, and renovation debris.",
    benefits: [
      "Eco-responsible sorting (recycle, donate, bypass landfill)",
      "Broom-swept post-clean conditions guaranteed",
      "Debris removal from remodeling phases",
      "Respectful, swift estate & basement cleanouts"
    ],
    iconName: "Trash2"
  }
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Lincoln Park Kitchen Remodel",
    description: "Complete overhaul of a vintage Chicago apartment kitchen, featuring bright quartz surfaces, deep navy custom shaker cabinets, and gold hardwares.",
    category: "Kitchen",
    beforeImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop",
    location: "Lincoln Park, Chicago",
    scope: [
      "Removed non-loadbearing partitioning walls",
      "Upgraded plumbing to copper fixtures",
      "Fitted soft-closing tall navy blue cabinetry",
      "Installed continuous white-marble quartz counters"
    ]
  },
  {
    id: "proj-2",
    title: "Oak Park Deluxe Bathroom Suite",
    description: "Converted an outdated tub layout into an open-plan luxury custom-tile steam shower with custom floating vanity.",
    category: "Bathroom",
    beforeImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1620626011161-997c51447094?q=80&w=600&auto=format&fit=crop",
    location: "Oak Park, IL",
    scope: [
      "Complete gut strip down to framing",
      "Custom anti-fracture membrane sub-tile installation",
      "Herringbone marble tiling accent wall",
      "LED backlight double floating vanity"
    ]
  },
  {
    id: "proj-3",
    title: "Schaumburg Structural Basement Playroom",
    description: "Turned a damp, unfinished crawl space/basement into a bright, waterproof family recreational room with integrated drywall partitions.",
    category: "Full Renovation",
    beforeImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    location: "Schaumburg, IL",
    scope: [
      "Rigid foam heat insulation and waterproofing barrier",
      "Drywall installation with premium sound-proofing padding",
      "Luxury Vinyl Plank (LVP) wood-finish flooring",
      "Recessed LED smart ceiling light systems"
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Marcus G.",
    location: "Chicago (Wicker Park)",
    score: 5,
    text: "Reno and his crew did an amazing job with our bathroom remodel. Honest pricing, they cleaned up every single day before leaving, and the custom tile work is flawless. Highly recommend them!",
    date: "April 12, 2026",
    serviceType: "Bathroom Remodel"
  },
  {
    id: "t-2",
    name: "Sarah L.",
    location: "Naperville, IL",
    score: 5,
    text: "I hired Reno9 Construction for drywall patching and painting my entire main floor, plus several handyman repairs. They were prompt, friendly, and did phenomenal work in just two days. Extremely trustworthy!",
    date: "May 2, 2026",
    serviceType: "Drywall & Painting"
  },
  {
    id: "t-3",
    name: "David K.",
    location: "Evanston, IL",
    score: 5,
    text: "Reno Flores is hands down the best contractor I've worked with in Chicagoland. He actually returns calls, gave us a clear itemized quote, and finished our clean-out and floor installation on budget. A+ service.",
    date: "May 18, 2026",
    serviceType: "Flooring & Clean-outs"
  }
];

export const serviceAreas: ServiceArea[] = [
  { city: "Chicago", isPrimary: true, notes: "All neighborhoods including Loop, Lincoln Park, Wicker Park, Lakeview, Logan Sq." },
  { city: "Schaumburg", isPrimary: true, notes: "and Northwest suburbs" },
  { city: "Naperville", isPrimary: true, notes: "and West suburbs" },
  { city: "Oak Park", isPrimary: true, notes: "and Near West suburbs" },
  { city: "Evanston", isPrimary: true, notes: "and North Shore suburbs" },
  { city: "Arlington Heights", isPrimary: false },
  { city: "Des Plaines", isPrimary: false },
  { city: "Skokie", isPrimary: false },
  { city: "Park Ridge", isPrimary: false },
  { city: "Downers Grove", isPrimary: false }
];

export const faqs = [
  {
    question: "Do you offer free estimates?",
    answer: "Yes, absolutely! We provide free, detailed, and itemized estimates for all construction, renovation, painting, and handyman work. Call or fill out our online form to schedule."
  },
  {
    question: "What areas do you serve?",
    answer: "We proudly serve the city of Chicago and major surrounding suburbs including Schaumburg, Naperville, Oak Park, Evanston, Park Ridge, Skokie, and surrounding Chicagoland areas."
  },
  {
    question: "Is Reno9 Construction fully licensed and insured?",
    answer: "Yes. Reno9 Construction operates with comprehensive contractor liability insurance. Owner Reno Flores ensures all craftsmanship adheres tightly to local building codes for your complete peace of mind."
  },
  {
    question: "How long will my remodel take?",
    answer: "Project schedules depend entirely on the scope of work. Typical bathroom or kitchen remodels take 1 to 3 weeks. Minor handyman repairs or drywall patches can often be completed in a single afternoon. We discuss precise timelines during your estimate."
  }
];
