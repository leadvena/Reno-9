export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  location: string;
  scope: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  score: number;
  text: string;
  date: string;
  serviceType: string;
}

export interface ServiceArea {
  city: string;
  isPrimary: boolean;
  notes?: string;
}

export interface QuoteEstimateRequest {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message: string;
  location: string;
  urgency: string;
}
