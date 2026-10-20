import React, { useState } from 'react';
import {
  Phone,
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Heart,
  Smile,
  ArrowRight,
  Menu,
  X,
  Award,
  Layers,
  Activity,
  Check,
} from 'lucide-react';
import { ClinicAssets } from './assets/images';
import { CLINIC_SERVICES } from './data/servicesData';
import { ServiceDetail, ServiceModal } from './components/ServiceModal';
import { InteractiveTooth3D } from './components/InteractiveTooth3D';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { AppointmentScheduler } from './components/AppointmentScheduler';
import { InsuranceChecker } from './components/InsuranceChecker';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'cosmetic' | 'restorative' | 'wellness'>('all');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string>('');

  const openBookingFor = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPrefilledService(serviceTitle);
    }
    // Scroll smoothly to appointment scheduler
    const el = document.getElementById('appointment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setAppointmentModalOpen(true);
    }
  };

  const filteredServices = CLINIC_SERVICES.filter((svc) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'cosmetic') return svc.id.includes('cosmetic') || svc.id.includes('invisalign');
    if (activeTab === 'restorative') return svc.id.includes('implants') || svc.id.includes('periodontics') || svc.id.includes('emergency');
    if (activeTab === 'wellness') return svc.id.includes('preventative') || svc.id.includes('sedation');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 flex flex-col antialiased">
      {/* Top Clinical Announcement Bar (Single line, discreet) */}
      <div className="bg-[#0E1F1A] text-white py-2 px-4 text-xs border-b border-emerald-950/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-emerald-300">1311 W Busch Blvd, Tampa, FL</span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-slate-300 hidden sm:inline">Accepting New Patients & Emergency Appointments</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300 hidden md:inline">Tue–Thu 8am–5pm · Fri 8am–4pm</span>
            <a
              href="tel:8133330633"
              className="text-emerald-300 hover:text-white font-semibold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(813) 333-0633</span>
            </a>
          </div>
        </div>
      </div>

      {/* TOP BAR CONTRACT: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="/"
            className="text-xl md:text-2xl font-serif font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs">
              T
            </div>
            <span>Tampa Dentistry</span>
          </a>

          {/* Zone 2: 4-5 single-line clean text links with subtle hover states */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <a href="#services" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
              Treatments
            </a>
            <a href="#technology-3d" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
              3D Clinical Tech
            </a>
            <a href="#transformations" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
              Smile Gallery
            </a>
            <a href="#about-team" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
              Meet Dr. Iglesias
            </a>
            <a href="#insurance" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
              Insurance & Pricing
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#appointment-section"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-900 text-white text-xs font-semibold rounded-xl hover:bg-emerald-950 transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3 text-sm font-medium text-slate-800">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-emerald-900"
              >
                Dental Treatments & Services
              </a>
              <a
                href="#technology-3d"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-emerald-900"
              >
                3D Interactive Anatomy
              </a>
              <a
                href="#transformations"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-emerald-900"
              >
                Before & After Smile Transformations
              </a>
              <a
                href="#about-team"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-emerald-900"
              >
                Meet Dr. Amy L. Iglesias & Team
              </a>
              <a
                href="#insurance"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-emerald-900"
              >
                Accepted Insurance & In-House Plan
              </a>
              <a
                href="#patient-experience"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-emerald-900"
              >
                Patient Comfort & Sedation
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="tel:8133330633"
                className="w-full py-2.5 text-center bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-800" />
                <span>Call (813) 333-0633</span>
              </a>
              <a
                href="#appointment-section"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Appointment Online</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Value Proposition & Story (col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed Metadata (Zero-Pill Discipline) */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <span className="text-emerald-900 font-semibold uppercase tracking-wider">Dr. Amy L. Iglesias, DMD</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Tufts University Alumna</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>4.9 / 5.0 (999+ Google Reviews)</span>
                </span>
              </div>

              {/* Master Headline (clamp, no orphan single word) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
                Elevated Dentistry. Ethical Care. Transformative Smiles in Tampa.
              </h1>

              {/* Supporting Copy grounded in verified clinic details */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Experience compassionate, modern dentistry at 1311 W Busch Blvd. Combining artistic porcelain smile design, gentle Invisalign®, biocompatible dental implants, and conscious sedation in a serene, architectural setting.
              </p>

              {/* Primary & Secondary Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#appointment-section"
                  className="px-7 py-3.5 bg-emerald-900 text-white text-xs font-semibold tracking-wide uppercase rounded-xl hover:bg-emerald-950 transition-all shadow-md flex items-center justify-center gap-2 text-center"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Consultation</span>
                </a>
                <a
                  href="tel:8133330633"
                  className="px-6 py-3.5 bg-white text-slate-800 border border-slate-300 text-xs font-semibold tracking-wide uppercase rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-4 h-4 text-emerald-800" />
                  <span>(813) 333-0633</span>
                </a>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Accepting Most PPO & Medicare Advantage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Same-Day Emergency Relief</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Gentle Sedation for Anxious Patients</span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Photography Focal Anchor (col-span-5) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] lg:aspect-[5/4] group">
                <img
                  src={ClinicAssets.heroDentalStudio}
                  alt="Tampa Dentistry Modern Treatment Room"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Micro-Card Over Hero */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200/80 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={ClinicAssets.drAmyIglesias}
                      alt="Dr. Amy L. Iglesias, DMD"
                      className="w-10 h-10 rounded-full object-cover border border-emerald-800"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Dr. Amy L. Iglesias, DMD</div>
                      <div className="text-[11px] text-slate-500">Practice Director · AAFE Certified</div>
                    </div>
                  </div>
                  <a
                    href="#about-team"
                    className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5"
                  >
                    <span>Bio</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 4-COLUMN CLAIM-TO-PROOF STRIP (Full-width row below hero split) */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-slate-200 pt-8">
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-2xl font-serif font-bold text-slate-900 tabular-nums">4.9 ★</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">999+ Google Reviews</div>
              <div className="text-[11px] text-slate-500 mt-1">94% of patients give 5 stars for gentle care</div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-2xl font-serif font-bold text-slate-900">Tufts & Montefiore</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">Elite Clinical Pedigree</div>
              <div className="text-[11px] text-slate-500 mt-1">Residency-trained in complex dentistry</div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-2xl font-serif font-bold text-slate-900">1311 W Busch</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">Central Tampa Location</div>
              <div className="text-[11px] text-slate-500 mt-1">Accessible parking & private treatment suites</div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-2xl font-serif font-bold text-slate-900">100% Honest</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">Ethical Treatment Philosophy</div>
              <div className="text-[11px] text-slate-500 mt-1">Conservative care that preserves natural teeth</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 3D INTERACTIVE ANATOMICAL MODEL */}
      <section id="technology-3d" className="py-16 md:py-20 bg-[#FAF9F6] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column (col-span-5) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
                Interactive Patient Education
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
                Inspect Dental Anatomy & Treatment Mechanics in Real-Time 3D
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                At Tampa Dentistry, we believe an informed patient is an empowered patient. Explore how natural enamel translucency compares to hand-layered porcelain veneers, or inspect how medical-grade titanium integrates into bone.
              </p>

              <div className="space-y-3 text-xs text-slate-700 pt-1">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Natural Enamel Preservation:</strong> Biomimetic adhesive dentistry that keeps as much of your healthy tooth intact as possible.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Micro-Thin Porcelain Veneers:</strong> Customized optical properties engineered to reflect light just like pristine youthful teeth.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Titanium Osseointegration:</strong> Computer-guided implant positioning for lifelong stability and restored chewing function.
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 hover:text-emerald-950 underline underline-offset-4"
                >
                  <span>Explore all dental treatments below</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Three.js 3D Viewport (col-span-7) */}
            <div className="lg:col-span-7">
              <InteractiveTooth3D />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SIGNATURE CLINICAL SERVICES */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
                Comprehensive Dental Care
              </div>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                Personalized Care Solutions for a Healthy Smile
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                From proactive preventative hygiene and Invisalign® alignment to complex restorative implants and facial esthetics, every treatment is delivered with ethical precision.
              </p>
            </div>

            {/* Interactive Filter Tabs (Functional buttons with click handlers) */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0 self-start md:self-end">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Care
              </button>
              <button
                onClick={() => setActiveTab('cosmetic')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'cosmetic' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cosmetic & Invisalign
              </button>
              <button
                onClick={() => setActiveTab('restorative')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'restorative' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Implants & Periodontics
              </button>
              <button
                onClick={() => setActiveTab('wellness')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === 'wellness' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sedation & Prevention
              </button>
            </div>
          </div>

          {/* Asymmetric Bento-Grid Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`group bg-[#FAF9F6] rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:border-emerald-800/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Card Media Banner */}
                  <div className={`relative overflow-hidden ${index === 0 ? 'h-64 sm:h-72' : 'h-48'}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                      {service.category}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-[11px] text-emerald-300 font-semibold">{service.tagline}</div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {service.overview}
                    </p>

                    {/* Key Highlight Badges (Text with clean bullet, zero pill sandwich) */}
                    <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1 text-xs text-slate-700">
                      {service.benefits.slice(0, 2).map((b, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span className="truncate">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="px-6 pb-5 pt-2 flex items-center justify-between text-xs font-semibold text-emerald-900">
                  <span>View Clinical Protocol & FAQs</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: INTERACTIVE BEFORE & AFTER SMILE TRANSFORMATIONS */}
      <section id="transformations" className="py-16 md:py-24 bg-[#FAF8F5] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
              Documented Clinical Excellence
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
              Real Patient Smile Transformations
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">
              Drag the interactive comparison handle to view real clinical cases from Dr. Amy L. Iglesias and Dr. Adriana C. Carrion Marquez.
            </p>
          </div>

          {/* Interactive Slider */}
          <BeforeAfterSlider />
        </div>
      </section>

      {/* SECTION: MEET THE CLINICAL TEAM */}
      <section id="about-team" className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Doctor Portrait (col-span-5) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[3/4] max-w-md mx-auto">
                <img
                  src={ClinicAssets.drAmyIglesias}
                  alt="Dr. Amy L. Iglesias, DMD"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xl font-serif font-bold">Dr. Amy L. Iglesias, DMD</div>
                  <div className="text-xs text-emerald-300">Lead Dentist & Practice Director</div>
                  <div className="text-[11px] text-slate-300 mt-1">Tufts University School of Dental Medicine</div>
                </div>
              </div>
            </div>

            {/* Doctor Biography & Clinical Philosophy (col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
                  Meet Your Tampa Dentist
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  "Ethical, Gentle Dentistry that Enhances Health and Restores Total Confidence."
                </h2>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
                <p>
                  Dr. Amy L. Iglesias earned her Doctor of Dental Medicine (DMD) from the prestigious{' '}
                  <strong className="text-slate-900">Tufts University School of Dental Medicine</strong> in Boston, Massachusetts. She subsequently completed an intensive General Practice Residency at{' '}
                  <strong className="text-slate-900">Montefiore Medical Center</strong> in Bronx, New York, where she honed advanced clinical capabilities in surgical extractions, complex restorative procedures, and medical-model patient care.
                </p>

                <p>
                  Committed to whole-face aesthetics, Dr. Iglesias is certified in Botox® and facial dermal fillers by the{' '}
                  <strong className="text-slate-900">American Academy of Facial Esthetics (AAFE)</strong> and remains an active member of the{' '}
                  <strong className="text-slate-900">American Dental Association (ADA)</strong>. Her practice philosophy centers on radical empathy, conservative enamel preservation, and empowering patients with unhurried, transparent clinical guidance.
                </p>
              </div>

              {/* Verified Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-[#FAF9F6]">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <Award className="w-4 h-4 text-emerald-800" />
                    <span>Tufts University DMD</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Graduated from one of the nation's premier dental institutions in Boston, MA.</div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-[#FAF9F6]">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-800" />
                    <span>Montefiore Medical Residency</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Hospital-grade residency training in complex oral pathology and surgical care.</div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-[#FAF9F6]">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <Sparkles className="w-4 h-4 text-emerald-800" />
                    <span>AAFE Facial Esthetics</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Certified for therapeutic and aesthetic Botox® & dermal filler smile framing.</div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-[#FAF9F6]">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                    <span>Dr. Adriana C. Carrion Marquez</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Experienced associate clinician offering comprehensive restorative excellence.</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#appointment-section"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-900 text-white text-xs font-semibold rounded-xl hover:bg-emerald-950 transition-colors shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation with Dr. Iglesias</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: BOUTIQUE PATIENT EXPERIENCE & RELAXATION */}
      <section id="patient-experience" className="py-16 md:py-24 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (col-span-6) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
                A Calming Healthcare Environment
              </div>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
                Designed from the Ground Up to Dissolve Dental Anxiety
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                We understand that visiting the dentist can feel intimidating. Every square foot of our 1311 W Busch Blvd practice was curated to provide a quiet, tranquil experience reminiscent of a boutique wellness spa rather than a clinical hospital.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-0.5">Conscious Sedation</div>
                  <div className="text-slate-500 text-[11px]">IV and oral conscious sedation options for complete peace of mind.</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-0.5">Digital Impressions Only</div>
                  <div className="text-slate-500 text-[11px]">No goopy trays or gagging. 3D intraoral lasers map teeth comfortably.</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-0.5">Comfort Menu Amenities</div>
                  <div className="text-slate-500 text-[11px]">Noise-canceling headphones, weighted neck wraps, and streaming entertainment.</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-0.5">Unhurried Appointments</div>
                  <div className="text-slate-500 text-[11px]">Ample time for discussion with zero double-booking or rush.</div>
                </div>
              </div>
            </div>

            {/* Right Lounge Media (col-span-6) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/10]">
                <img
                  src={ClinicAssets.clinicLounge}
                  alt="Tampa Dentistry Patient Relaxation Suite"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold">Tranquil Patient Lounge & Reception · 1311 W Busch Blvd</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: INSURANCE, MEDICARE & IN-HOUSE MEMBERSHIP */}
      <section id="insurance" className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InsuranceChecker />
        </div>
      </section>

      {/* SECTION: VERIFIED GOOGLE REVIEWS (4.9 ★ with 999+ Reviews) */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
              4.9 Stars Across 999+ Verified Patient Reviews
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-2">
              Read how Tampa families experience ethical care and transformative smiles at our Busch Blvd clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "I have had severe dental anxiety for over a decade. Dr. Amy Iglesias and her entire staff treated me with such patience and dignity. The sedation option made my implant procedure completely painless and stress-free."
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Marcus T.</div>
                  <div className="text-[11px] text-slate-400">Verified Google Patient · Tampa, FL</div>
                </div>
                <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Dental Implant</span>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "Dr. Iglesias designed 6 porcelain veneers for my front teeth and the outcome completely exceeded my expectations. They look completely natural and my smile looks so bright. Cannot recommend Tampa Dentistry enough!"
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">Sofia R.</div>
                  <div className="text-[11px] text-slate-400">Verified Google Patient · Carrollwood</div>
                </div>
                <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Porcelain Veneers</span>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "Transparent pricing, incredible hygienic cleanliness, and the staff actually took the time to verify my Medicare Advantage benefits before I even stepped foot in the chair. Dr. Carrion and Dr. Iglesias are phenomenal."
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">David G.</div>
                  <div className="text-[11px] text-slate-400">Verified Google Patient · Temple Terrace</div>
                </div>
                <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold">Hygiene & Restoration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: INTERACTIVE APPOINTMENT SCHEDULER */}
      <section id="appointment-section" className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AppointmentScheduler initialService={prefilledService} />
        </div>
      </section>

      {/* SECTION: CLINIC LOCATION & HOURS (Map + Verified Contact) */}
      <section className="py-16 bg-[#FAF9F6] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Location Card (col-span-5) */}
            <div className="lg:col-span-5 space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
                  Visit Our Practice
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900">
                  Tampa Dentistry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Dr. Amy L. Iglesias, DMD & Associates</p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Address:</strong>
                    <span>1311 W Busch Blvd, Tampa, FL 33612</span>
                    <div className="text-[11px] text-slate-500 mt-0.5">Centrally located on West Busch Blvd with complimentary parking.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Telephone:</strong>
                    <a href="tel:8133330633" className="text-emerald-900 font-semibold hover:underline">
                      (813) 333-0633
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Office Hours:</strong>
                    <div className="mt-1 space-y-0.5 text-[11px] text-slate-600">
                      <div className="flex justify-between gap-4">
                        <span>Tuesday – Thursday:</span>
                        <span className="font-semibold text-slate-900">8:00 AM – 5:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span>Friday:</span>
                        <span className="font-semibold text-slate-900">8:00 AM – 4:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4 text-slate-400">
                        <span>Mon, Sat, Sun:</span>
                        <span>Closed (Emergency on-call)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href="https://maps.google.com/?q=1311+W+Busch+Blvd,+Tampa,+FL+33612"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-900 text-white rounded-xl text-xs font-semibold hover:bg-emerald-950 transition-colors text-center shadow-xs"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Right Architectural Preview / Street Guidance (col-span-7) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 p-1">
                <iframe
                  title="Tampa Dentistry Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.8490529557434!2d-82.46552992386927!3d28.033486975996683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c65a0b77b73b%3A0x6bcfd35b90f4e3c9!2s1311%20W%20Busch%20Blvd%2C%20Tampa%2C%20FL%2033612!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="340"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIET FOOTER (Brand Wordmark, Verified Details, Legal Notice) */}
      <footer className="bg-[#0E1F1A] text-slate-400 py-12 border-t border-emerald-950/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Wordmark & Philosophy */}
            <div className="space-y-3">
              <span className="text-lg font-serif font-bold text-white block">
                Tampa Dentistry
              </span>
              <p className="text-slate-400 text-xs leading-relaxed">
                Led by Dr. Amy L. Iglesias, DMD. Premier cosmetic, restorative, and family dental practice in Tampa, FL. Ethical, gentle, and patient-first care.
              </p>
              <div className="text-[11px] text-emerald-400 font-medium">
                1311 W Busch Blvd, Tampa, FL 33612
              </div>
            </div>

            {/* Col 2: Clinical Services */}
            <div className="space-y-2">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                Clinical Treatments
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="#services" className="hover:text-emerald-300">Cosmetic Porcelain Veneers</a></li>
                <li><a href="#services" className="hover:text-emerald-300">Invisalign® Clear Aligners</a></li>
                <li><a href="#services" className="hover:text-emerald-300">Dental Implants & Restorations</a></li>
                <li><a href="#services" className="hover:text-emerald-300">Periodontics & Gum Disease</a></li>
                <li><a href="#services" className="hover:text-emerald-300">Conscious Sedation Dentistry</a></li>
                <li><a href="#services" className="hover:text-emerald-300">Emergency Dental Care</a></li>
              </ul>
            </div>

            {/* Col 3: Hours & Contact */}
            <div className="space-y-2">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                Contact & Scheduling
              </span>
              <p className="text-slate-400">
                Direct Line:{' '}
                <a href="tel:8133330633" className="text-white hover:text-emerald-300 font-semibold">
                  (813) 333-0633
                </a>
              </p>
              <p className="text-slate-400">
                Online Portal: mytampadentistry.com
              </p>
              <p className="text-slate-400">
                Hours: Tue–Thu 8am–5pm · Fri 8am–4pm
              </p>
            </div>

            {/* Col 4: Emergency Notice */}
            <div className="space-y-2">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                Urgent Dental Care
              </span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Experiencing acute tooth pain, trauma, or a broken tooth? We prioritize same-day emergency appointments. Call our office immediately.
              </p>
              <a
                href="tel:8133330633"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-900 font-semibold text-[11px] hover:bg-emerald-900 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Call Emergency Triage</span>
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-emerald-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} Tampa Dentistry. All rights reserved. Dr. Amy L. Iglesias, DMD.
            </div>
            <div className="flex items-center gap-4">
              <span>HIPAA Compliant Practice</span>
              <span>·</span>
              <span>ADA Member</span>
              <span>·</span>
              <span>Florida Dental Association</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CALL / APPOINTMENT BAR (Strictly ≤15% mobile viewport cap) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center gap-2 shadow-lg">
        <a
          href="tel:8133330633"
          className="flex-1 py-2.5 px-3 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-800" />
          <span>(813) 333-0633</span>
        </a>
        <a
          href="#appointment-section"
          className="flex-1 py-2.5 px-3 bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </a>
      </div>

      {/* SERVICE DETAIL MODAL */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onBook={(title) => openBookingFor(title)}
        />
      )}
    </div>
  );
}
