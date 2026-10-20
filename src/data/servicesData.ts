import { ClinicAssets } from '../assets/images';
import { ServiceDetail } from '../components/ServiceModal';

export const CLINIC_SERVICES: ServiceDetail[] = [
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry & Smile Makeovers',
    category: 'Aesthetic Dentistry',
    tagline: 'Custom Porcelain Veneers, Bonding & Professional Whitening',
    image: ClinicAssets.cosmeticSmile,
    overview:
      'Our cosmetic smile designs blend precise facial aesthetics with ethical, minimally invasive dentistry. Led by Dr. Amy L. Iglesias, DMD (certified by the American Academy of Facial Esthetics), we harmonize tooth proportions, shade, and gingival architecture so your smile looks naturally breathtaking rather than artificial.',
    benefits: [
      'Individually handcrafted porcelain veneers with life-like translucency',
      'Minimally-invasive preparations that preserve maximal natural enamel',
      'Digital Smile Design (DSD) preview before any tooth is touched',
      'Certified in facial esthetics, Botox® & dermal fillers for complete smile harmony',
    ],
    protocol: [
      { step: '1', title: 'Aesthetic Discovery & 3D Imaging', desc: 'Comprehensive facial photography, digital tooth scanning, and smile goal assessment.' },
      { step: '2', title: 'Diagnostic Wax-up & Mock-up', desc: 'Test-drive your prospective smile with a temporary mock-up right in the operatory chair.' },
      { step: '3', title: 'Artisan Porcelain Delivery', desc: 'Master dental lab technicians hand-layer each veneer; precision bonding ensures decades of strength.' },
    ],
    technologies: ['iTero 3D Digital Scanner', 'Digital Smile Design', 'Feldspathic & E.max Porcelain', 'Facial Esthetics Integration'],
    faqs: [
      { q: 'How long do porcelain veneers typically last?', a: 'With routine dental hygiene and regular checkups at Tampa Dentistry, high-grade porcelain veneers routinely last 15 to 20+ years.' },
      { q: 'Is the veneer process painful?', a: 'Not at all. We utilize gentle local numbing and offer conscious sedation for patients with sensitivity or dental anxiety.' },
    ],
  },
  {
    id: 'invisalign',
    title: 'Invisalign® Clear Aligners',
    category: 'Orthodontics',
    tagline: 'Virtually Invisible Teeth Straightening for Adults & Teens',
    image: ClinicAssets.clearAlignerTech,
    overview:
      'Transform crowded, gapped, or misaligned teeth without metal wires or brackets. Our digital clear aligner therapy uses ultra-precise 3D scans to map out millimeter-by-millimeter movements from week one to completion.',
    benefits: [
      'Removable aligners for effortless brushing, flossing, and eating your favorite foods',
      'Smooth SmartTrack® medical-grade polymer with zero sharp brackets or poke wires',
      'Average treatment timelines between 6 and 14 months',
      'Digital 3D outcome preview showing your finished smile before you even begin',
    ],
    protocol: [
      { step: '1', title: '3D Optical Scan', desc: 'A quick 3-minute intraoral scan captures 6,000 images per second, eliminating messy silicone putty impressions.' },
      { step: '2', title: 'Custom ClinCheck® Roadmap', desc: 'Dr. Iglesias designs your exact tooth trajectories and delivers your series of custom trays.' },
      { step: '3', title: 'Active Wear & Retainers', desc: 'Wear aligners 20–22 hours daily, switching trays weekly, followed by custom Vivera retainers.' },
    ],
    technologies: ['iTero Element Scanner', 'SmartTrack Material', 'SmartForce Attachments', 'Digital Movement Simulation'],
    faqs: [
      { q: 'Can Invisalign fix severe crowding or bite issues?', a: 'Yes. Modern Invisalign technology combined with clinical attachments can treat complex crowding, spacing, deep bites, and open bites.' },
      { q: 'How often do I need to visit the office during treatment?', a: 'Typically every 6 to 8 weeks for a brief 15-minute progress check and to receive your next sets of aligners.' },
    ],
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants & Tooth Replacement',
    category: 'Restorative Care',
    tagline: 'Permanent, Bio-Integrated Solutions for Missing Teeth',
    image: ClinicAssets.dentalImplantPrecision,
    overview:
      'Dental implants represent the gold standard in tooth replacement. By replacing both the root and the crown, an implant preserves jawbone density, restores 100% of chewing power, and looks indistinguishable from a natural tooth.',
    benefits: [
      'Permanent foundation preventing facial sagging and bone deterioration',
      'No need to grind down or compromise adjacent healthy teeth',
      'Unmatched stability for single crowns, multi-tooth bridges, or full-arch dentures',
      'High long-term success rate exceeding 98% with proper hygiene',
    ],
    protocol: [
      { step: '1', title: '3D CBCT Bone Assessment', desc: 'We evaluate bone density, nerve paths, and sinus proximity with ultra-low radiation 3D cone beam CT.' },
      { step: '2', title: 'Computer-Guided Placement', desc: 'Medical-grade titanium implant fixture is gently positioned into the jaw with surgical guides.' },
      { step: '3', title: 'Osseointegration & Crown', desc: 'Following bone integration, a custom-shaded ceramic or zirconia crown is securely anchored.' },
    ],
    technologies: ['3D CBCT Imaging', 'Computer-Guided Surgery', 'Grade-5 Medical Titanium', 'Custom Monolithic Zirconia'],
    faqs: [
      { q: 'Am I a candidate for dental implants?', a: 'Most adults in good general health with sufficient bone density are excellent candidates. Even with bone loss, modern bone grafting makes implants possible.' },
      { q: 'Does implant placement hurt?', a: 'Patients are consistently surprised by how comfortable the procedure is. Local anesthesia and optional conscious sedation ensure zero discomfort during surgery.' },
    ],
  },
  {
    id: 'periodontics',
    title: 'Advanced Periodontics & Gum Wellness',
    category: 'Periodontics',
    tagline: 'Scaling, Root Planing, Bone Grafting & Gum Therapy',
    image: ClinicAssets.heroDentalStudio,
    overview:
      'Healthy gums form the essential foundation of your overall systemic health. Our periodontal therapies arrest gum inflammation, eliminate deep bacterial pockets, and regenerate supportive tissue and bone structure.',
    benefits: [
      'Gentle ultrasonic scaling and localized antimicrobial therapy',
      'Halts active periodontal bone degradation and tooth mobility',
      'Improves cardiovascular and systemic health linked to gum inflammation',
      'Comfortable treatment utilizing localized numbing and gentle techniques',
    ],
    protocol: [
      { step: '1', title: 'Comprehensive Periodontal Charting', desc: 'Measurement of pocket depths around every tooth and digital x-ray bone assessment.' },
      { step: '2', title: 'Deep Cleaning (Scaling & Root Planing)', desc: 'Removal of hardened calculus and bacteria beneath the gum line under comfortable local anesthesia.' },
      { step: '3', title: 'Maintenance & Tissue Monitoring', desc: 'Personalized 3 to 4 month maintenance schedule to keep bacterial counts low and tissues firm.' },
    ],
    technologies: ['Ultrasonic Piezo Scaling', 'Localized Antimicrobials', 'Digital Pocket Charting', 'Regenerative Bone Grafting'],
    faqs: [
      { q: 'What are early signs of gum disease?', a: 'Bleeding gums when brushing or flossing, persistent bad breath, redness, and gum recession are classic early indicators.' },
      { q: 'Is gum disease curable?', a: 'Early gingivitis is fully reversible. Advanced periodontitis can be effectively managed, halted, and stabilized with prompt professional care.' },
    ],
  },
  {
    id: 'sedation-dentistry',
    title: 'Conscious Sedation Dentistry',
    category: 'Comfort & Anxiety Care',
    tagline: 'Oral Sedation, IV Sedation & Nitrous Oxide for Peaceful Visits',
    image: ClinicAssets.clinicLounge,
    overview:
      'If dental anxiety, a strong gag reflex, or past traumatic dental experiences have kept you from the dentist, conscious sedation is your bridge to worry-free care. Relax peacefully while our clinical team completes your treatments comfortably.',
    benefits: [
      'Complete physical and mental relaxation with zero anxiety or fear',
      'Ability to complete multiple treatments or extensive procedures in a single appointment',
      'Gentle amnesic effect—most patients have minimal memory of the procedure',
      'Continuous vital sign monitoring by trained clinical staff for complete safety',
    ],
    protocol: [
      { step: '1', title: 'Medical History Consultation', desc: 'Review of current medications, health history, and personalized sedation selection.' },
      { step: '2', title: 'Administration & Monitoring', desc: 'Medication administered; patient is monitored continuously with pulse oximetry and blood pressure cuffs.' },
      { step: '3', title: 'Recovery & Companion Escort', desc: 'Rest comfortably in our tranquil recovery suite until fully alert, then driven home by a companion.' },
    ],
    technologies: ['Continuous Pulse Oximetry', 'Digital Vital Monitoring', 'Nitrous Oxide Delivery', 'IV Infusion Systems'],
    faqs: [
      { q: 'Will I be completely unconscious?', a: 'With conscious sedation, you remain responsive and breathing on your own, yet in a deeply serene, dream-like state of relaxation.' },
      { q: 'Do I need someone to drive me home?', a: 'Yes, for both oral sedation and IV dental sedation, an adult companion must drive you home and supervise you for a few hours.' },
    ],
  },
  {
    id: 'preventative-dentistry',
    title: 'Preventative Care & Oral Diagnostics',
    category: 'General Dentistry',
    tagline: 'Comprehensive Exams, Ultrasonic Cleanings, Sealants & Nightguards',
    image: ClinicAssets.drAmyIglesias,
    overview:
      'Proactive prevention is the bedrock of lifelong oral health. We combine gentle hygiene appointments with low-radiation digital radiography, oral cancer screenings, and custom nightguards to protect against bruxism and wear.',
    benefits: [
      'Comprehensive head, neck, and soft tissue oral cancer screenings at every checkup',
      'Gentle ultrasonic plaque and stain removal for fresh breath and polished enamel',
      'Custom athletic mouthguards and nightguards to prevent cracked teeth and TMJ pain',
      'Fluoride varnishes and dental sealants for cavity prevention',
    ],
    protocol: [
      { step: '1', title: 'Diagnostic Radiography & Screening', desc: 'Ultra-low radiation digital x-rays, intraoral photos, and gum health evaluation.' },
      { step: '2', title: 'Gentle Dental Hygiene', desc: 'Thorough cleaning, ultrasonic calculus removal, flossing, and enamel polishing.' },
      { step: '3', title: 'Personalized Doctor Consultation', desc: 'Dr. Iglesias reviews all findings with you on high-definition chairside screens.' },
    ],
    technologies: ['Digital Low-Dose Radiography', 'Intraoral HD Cameras', 'Piezo Ultrasonic Polishers', 'Oral Cancer Screening Lights'],
    faqs: [
      { q: 'How often should I have my teeth cleaned?', a: 'For most patients, twice annually (every 6 months) is ideal. Patients managing periodontal conditions benefit from 3–4 month maintenance.' },
    ],
  },
  {
    id: 'emergency-dentistry',
    title: 'Same-Day Emergency Dental Care',
    category: 'Urgent Care',
    tagline: 'Rapid Pain Relief, Cracked Tooth Repair & Oral Trauma Care',
    image: ClinicAssets.heroDentalStudio,
    overview:
      'Dental emergencies cannot wait. When severe toothache, a broken tooth, lost filling, or accidental trauma strikes, Tampa Dentistry reserves emergency slots daily to relieve your pain and preserve your natural teeth.',
    benefits: [
      'Same-day priority evaluation for acute toothaches and oral trauma',
      'Immediate diagnostic imaging to pinpoint infection source or fractures',
      'Gentle tooth-saving therapies including root canals and emergency stabilization',
      'Convenient central location at 1311 W Busch Blvd in Tampa',
    ],
    protocol: [
      { step: '1', title: 'Immediate Call Triage', desc: 'Call (813) 333-0633; our team provides immediate instructions and prepares the operatory.' },
      { step: '2', title: 'Rapid Diagnosis & Pain Control', desc: 'Targeted digital x-rays identify the pathology and immediate gentle anesthetic is delivered.' },
      { step: '3', title: 'Definitive Treatment', desc: 'We restore the tooth, relieve nerve pressure, or stabilize trauma to safeguard your smile.' },
    ],
    technologies: ['Immediate Digital Imaging', 'Painless Anesthesia Delivery', 'Rotary Endodontics', 'Emergency Composite Splinting'],
    faqs: [
      { q: 'What should I do if a permanent tooth gets knocked out?', a: 'Handle it only by the crown, do not scrub the root, place it in cold milk or inside your cheek, and reach our office immediately.' },
      { q: 'Does Tampa Dentistry accept emergency walk-ins?', a: 'We strongly recommend calling (813) 333-0633 ahead so our clinical team can prepare your room the moment you arrive.' },
    ],
  },
];
