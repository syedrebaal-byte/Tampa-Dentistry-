import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, CreditCard, Search, ArrowRight, HeartPulse } from 'lucide-react';

export const InsuranceChecker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const plans = [
    { name: 'Delta Dental PPO / Premier', category: 'Commercial PPO', status: 'Accepted & In-Network Claims' },
    { name: 'Cigna Dental PPO', category: 'Commercial PPO', status: 'Accepted & In-Network Claims' },
    { name: 'MetLife PDP Plus', category: 'Commercial PPO', status: 'Accepted & In-Network Claims' },
    { name: 'Aetna Dental PPO', category: 'Commercial PPO', status: 'Accepted & In-Network Claims' },
    { name: 'Guardian DentalGuard', category: 'Commercial PPO', status: 'Accepted & In-Network Claims' },
    { name: 'Humana Dental PPO', category: 'Commercial PPO', status: 'Accepted & In-Network Claims' },
    { name: 'UnitedHealthcare Dental', category: 'Commercial PPO', status: 'Accepted & In-Network Claims' },
    { name: 'Medicare Advantage Plans', category: 'Medicare Advantage', status: 'Accepted (Comprehensive Benefits)' },
    { name: 'Principal Financial Group', category: 'Commercial PPO', status: 'Accepted & In-Network Claims' },
    { name: 'Ameritas Dental Network', category: 'Commercial PPO', status: 'Accepted & In-Network Claims' },
  ];

  const filteredPlans = plans.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Insurance Verification & Search (col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
              Transparent Coverage
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900">
              Insurance, Medicare Advantage & In-Network Claims
            </h3>
            <p className="mt-2 text-xs md:text-sm text-slate-600 leading-relaxed">
              We believe quality healthcare should be transparent and stress-free. Our billing specialists handle pre-authorizations, file all insurance claims directly on your behalf, and provide transparent treatment estimates before any care begins.
            </p>
          </div>

          {/* Quick Carrier Search */}
          <div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search your insurance (e.g. Delta, Aetna, Cigna, Medicare)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none bg-[#FAF9F6]"
              />
            </div>

            <div className="mt-3 max-h-48 overflow-y-auto space-y-2 pr-1">
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-slate-100 bg-white flex items-center justify-between text-xs hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="font-semibold text-slate-900">{plan.name}</span>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {plan.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-xs text-slate-500 text-center bg-slate-50 rounded-lg">
                  Don't see your specific plan listed? Call <strong>(813) 333-0633</strong> — we accept most PPO plans and will happily verify your coverage complimentary!
                </div>
              )}
            </div>
          </div>

          {/* Flexible Financing Badges */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-800 block mb-2">
              Flexible 0% APR Patient Financing Available:
            </span>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-medium">
                CareCredit® Health Financing
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-medium">
                Sunbit Monthly Payments
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-medium">
                HSA & FSA Flexible Accounts
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: In-House Dental Wellness Plan (col-span-5) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 to-slate-900 text-white rounded-xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 block mb-1">
              No Insurance? No Problem.
            </span>
            <h4 className="text-xl font-serif font-bold text-white leading-tight">
              Tampa Dental Wellness Membership
            </h4>
            <p className="mt-2 text-xs text-emerald-100/80 leading-relaxed">
              Comprehensive preventive coverage designed specifically for individuals and families without dental benefits. No waiting periods, no deductibles, and no maximum limits.
            </p>

            <div className="mt-4 space-y-2 text-xs text-emerald-50">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>2 Comprehensive Cleanings & Exams annually</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>All routine diagnostic digital x-rays included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>1 Emergency exam with x-ray per year</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>15% off all fillings, crowns, and periodontal care</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>$500 off complete Invisalign® orthodontic therapy</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-300 block">Annual Membership</span>
                <span className="text-lg font-bold font-serif text-white">$299 / year</span>
              </div>
              <a
                href="#appointment"
                className="px-4 py-2 bg-white text-emerald-950 font-bold text-xs rounded-lg hover:bg-emerald-50 transition-colors shadow-xs inline-flex items-center gap-1"
              >
                <span>Enroll Today</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
