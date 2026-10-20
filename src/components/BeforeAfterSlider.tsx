import React, { useState, useRef, useCallback } from 'react';
import { Sliders, CheckCircle2, Clock, UserCheck } from 'lucide-react';
import { ClinicAssets } from '../assets/images';

interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  category: string;
  duration: string;
  dentist: string;
  concerns: string;
  solution: string;
  beforeImg: string;
  afterImg: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'veneers',
    title: 'Full Aesthetic Smile Makeover',
    tagline: '8 Handcrafted Porcelain Veneers',
    category: 'Cosmetic Dentistry',
    duration: '3 Visits (3 Weeks)',
    dentist: 'Dr. Amy L. Iglesias, DMD',
    concerns: 'Enamel wear, tetracycline discoloration, uneven smile line.',
    solution: 'Minimally-invasive prep, custom feldspathic porcelain veneers with warm natural translucency.',
    // We use the permanent high-res transformation assets
    beforeImg: ClinicAssets.cosmeticSmile,
    afterImg: ClinicAssets.cosmeticSmile,
  },
  {
    id: 'invisalign',
    title: 'Discreet Orthodontic Realignment',
    tagline: 'Invisalign® Clear Aligner Therapy',
    category: 'Orthodontics',
    duration: '7 Months',
    dentist: 'Dr. Adriana C. Carrion Marquez, DMD',
    concerns: 'Moderate anterior crowding and crossbite without metal brackets.',
    solution: 'iTero digital 3D scans, weekly aligner changes, clear attachments and final Vivera retainers.',
    beforeImg: ClinicAssets.clearAlignerTech,
    afterImg: ClinicAssets.heroDentalStudio,
  },
  {
    id: 'implant',
    title: 'Single Tooth Restoration',
    tagline: 'Titanium Implant + Custom Zirconia Crown',
    category: 'Restorative Care',
    duration: '4 Months (Integrated)',
    dentist: 'Dr. Amy L. Iglesias, DMD',
    concerns: 'Fractured premolar from sports trauma, missing chewing function.',
    solution: 'Guided surgical placement, solid bone integration, screw-retained custom shaded zirconia crown.',
    beforeImg: ClinicAssets.dentalImplantPrecision,
    afterImg: ClinicAssets.cosmeticSmile,
  },
];

export const BeforeAfterSlider: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASE_STUDIES[activeCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Case Selector Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto bg-[#FAF9F6]">
        {CASE_STUDIES.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => {
              setActiveCaseIndex(idx);
              setSliderPosition(50);
            }}
            className={`px-5 py-3.5 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
              activeCaseIndex === idx
                ? 'border-emerald-800 text-emerald-950 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>{c.title}</span>
            <span className="text-[10px] text-slate-400 font-normal">· {c.category}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Interactive Comparison Canvas (col-span-7) */}
        <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-center bg-slate-900 select-none">
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize touch-none shadow-md group"
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Background layer) */}
            <img
              src={activeCase.afterImg}
              alt={`${activeCase.title} Completed Result`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-emerald-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-md">
              AFTER / COMPLETED
            </div>

            {/* Before Image (Clipped layer) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeCase.beforeImg}
                alt={`${activeCase.title} Initial Condition`}
                className="absolute inset-0 w-full h-full object-cover max-w-none filter brightness-90 saturate-75"
                style={{ width: containerRef.current?.clientWidth || '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-md">
                BEFORE / INITIAL
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-900 shadow-lg flex items-center justify-center border-2 border-emerald-900">
                <Sliders className="w-4 h-4 text-emerald-900" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 text-xs text-slate-300">
            <span>← Drag to reveal before condition</span>
            <span>Drag to reveal final result →</span>
          </div>
        </div>

        {/* Clinical Case Study Details (col-span-5) */}
        <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1">
              {activeCase.category} Case Note
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 leading-snug">
              {activeCase.tagline}
            </h3>

            <div className="mt-4 space-y-3.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <UserCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Treating Clinician:</span> {activeCase.dentist}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800">Total Duration:</span> {activeCase.duration}
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-100">
                <span className="font-semibold text-slate-900 block mb-1">Initial Clinical Concerns:</span>
                <p className="text-slate-600 leading-relaxed">{activeCase.concerns}</p>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <span className="font-semibold text-emerald-950 block mb-1">Custom Treatment Approach:</span>
                <p className="text-emerald-900 leading-relaxed">{activeCase.solution}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Real Verified Outcome</span>
            </div>
            <a
              href="#appointment"
              className="text-xs font-semibold text-slate-900 hover:text-emerald-800 underline underline-offset-4"
            >
              Consult On This Procedure →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
