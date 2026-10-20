import React from 'react';
import { X, CheckCircle2, ShieldCheck, HelpCircle, Calendar, Sparkles } from 'lucide-react';

export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  overview: string;
  benefits: string[];
  protocol: { step: string; title: string; desc: string }[];
  technologies: string[];
  faqs: { q: string; a: string }[];
}

interface ServiceModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onBook: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onBook }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="relative h-48 md:h-64 w-full bg-slate-900 overflow-hidden shrink-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover filter brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
              {service.category} · Tampa Dentistry
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
              {service.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-200 mt-1">{service.tagline}</p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Clinical Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{service.overview}</p>
          </div>

          {/* Benefits Grid */}
          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Patient Benefits & Standards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Protocol */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              What to Expect: Treatment Steps
            </h3>
            <div className="space-y-3">
              {service.protocol.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-white">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Advanced Clinical Technology
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-medium border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2.5">
              {service.faqs.map((faq, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex items-start gap-2 text-xs font-bold text-slate-900">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 pl-5.5 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Accepting new patients at 1311 W Busch Blvd, Tampa FL
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(service.title);
              }}
              className="px-6 py-2.5 bg-emerald-900 text-white text-xs font-semibold rounded-xl hover:bg-emerald-950 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule This Treatment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
