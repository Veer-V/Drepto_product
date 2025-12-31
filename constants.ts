import {
  Medicine,
  FAQItem,
  Testimonial,
  LabTestDetail,
  LabPackageDetail,
  LabReview,
  City,
} from './types';

export const MEDICINES: Medicine[] = [];

export const PHARMACY_FAQS: FAQItem[] = [];

export const PHARMACY_TESTIMONIALS: Testimonial[] = [];

// --- Lab Data ---

export const CITIES: City[] = [
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'delhi', name: 'Delhi' },
  { id: 'bengaluru', name: 'Bengaluru' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'pune', name: 'Pune' },
  { id: 'kolkata', name: 'Kolkata' },
  { id: 'ahmedabad', name: 'Ahmedabad' },
  { id: 'chennai', name: 'Chennai' },
  { id: 'jaipur', name: 'Jaipur' },
  { id: 'nagpur', name: 'Nagpur' },
];

export const LAB_TESTS_DATA: LabTestDetail[] = [];

export const LAB_PACKAGES_DATA: LabPackageDetail[] = [];

export const LAB_REVIEWS: LabReview[] = [];
