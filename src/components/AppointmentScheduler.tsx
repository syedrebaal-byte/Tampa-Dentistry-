import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Phone, ShieldCheck, User, Mail, Sparkles, AlertCircle } from 'lucide-react';

interface AppointmentSchedulerProps {
  initialService?: string;
  onClose?: () => void;
}

export const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ initialService, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [service, setService] = useState<string>(initialService || 'New Patient Comprehensive Exam & Cleaning');
  const [doctor, setDoctor] = useState<string>('Dr. Amy L. Iglesias, DMD');
  const [preferredDay, setPreferredDay] = useState<string>('Tuesday');
  const [preferredTime, setPreferredTime] = useState<string>('Morning (8:00 AM – 12:00 PM)');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [insurance, setInsurance] = useState<string>('Dental PPO Insurance');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [referenceCode, setReferenceCode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const services = [
    { id: 'exam', name: 'New Patient Comprehensive Exam & Cleaning', note: 'Includes 3D digital imaging & oral cancer screening' },
    { id: 'cosmetic', name: 'Cosmetic Smile Consultation (Veneers & Whitening)', note: 'Custom shade preview & digital smile design' },
    { id: 'invisalign', name: 'Invisalign® Clear Aligner Consultation', note: 'Complimentary 3D iTero digital simulation' },
    { id: 'implant', name: 'Dental Implant Consultation', note: 'Restoration evaluation & 3D bone scan review' },
    { id: 'sedation', name: 'Conscious Sedation Care (Dental Anxiety)', note: 'IV or Oral conscious sedation for gentle visits' },
    { id: 'emergency', name: 'Urgent / Emergency Dental Care', note: 'Same-day relief for cracked tooth, pain, or trauma' },
  ];

  const days = [
    { day: 'Tuesday', hours: '8:00 AM – 5:00 PM' },
    { day: 'Wednesday', hours: '8:00 AM – 5:00 PM' },
    { day: 'Thursday', hours: '8:00 AM – 5:00 PM' },
    { day: 'Friday', hours: '8:00 AM – 4:00 PM' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please complete all required contact fields.');
      return;
    }
    // Basic phone validation
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrorMsg('Please enter a valid 10-digit telephone number.');
      return;
    }

    // Generate reference code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `TD-${randomNum}`;
    setReferenceCode(code);
    setSubmitted(true);
    setErrorMsg('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="appointment">
      {/* Header */}
      <div className="bg-emerald-950 text-white p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-emerald-300 font-semibold mb-1">
              Direct Clinical Scheduling
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
              Request Your Visit at Tampa Dentistry
            </h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-emerald-300 hover:text-white text-sm font-semibold p-2"
              aria-label="Close scheduler"
            >
              ✕
            </button>
          )}
        </div>
        <p className="mt-2 text-xs md:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
          1311 W Busch Blvd, Tampa, FL 33612 · Accepting new patients and urgent cases. Our clinical team confirms your appointment window directly.
        </p>

        {/* Progress steps (if not submitted) */}
        {!submitted && (
          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={() => setStep(1)}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold text-center transition-all ${
                step >= 1 ? 'bg-emerald-800 text-white' : 'bg-emerald-950/50 text-emerald-400'
              }`}
            >
              1. Treatment
            </button>
            <span className="text-emerald-700">›</span>
            <button
              onClick={() => setStep(2)}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold text-center transition-all ${
                step >= 2 ? 'bg-emerald-800 text-white' : 'bg-emerald-900/40 text-emerald-400'
              }`}
            >
              2. Timing & Doctor
            </button>
            <span className="text-emerald-700">›</span>
            <button
              onClick={() => setStep(3)}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold text-center transition-all ${
                step === 3 ? 'bg-emerald-800 text-white' : 'bg-emerald-900/40 text-emerald-400'
              }`}
            >
              3. Contact & Confirm
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 md:p-8">
        {submitted ? (
          <div className="py-8 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Appointment Request Received
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Thank you, <strong className="text-slate-900">{fullName}</strong>. Your consultation request for{' '}
              <strong className="text-slate-900">{service}</strong> with <strong className="text-slate-900">{doctor}</strong> has been prioritized.
            </p>

            <div className="mt-6 p-4 bg-[#FAF9F6] rounded-xl border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Confirmation Reference:</span>
                <span className="font-mono font-bold text-emerald-900">{referenceCode}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Requested Day:</span>
                <span className="font-semibold text-slate-900">{preferredDay} · {preferredTime}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Practice Address:</span>
                <span className="font-semibold text-slate-900">1311 W Busch Blvd, Tampa, FL 33612</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Insurance / Payment:</span>
                <span className="font-semibold text-slate-900">{insurance}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900 text-left">
              <p className="font-semibold mb-1">What Happens Next?</p>
              <p>
                Our patient coordinator will contact you by telephone at <strong>{phone}</strong> to confirm your specific chair time and provide pre-visit guidelines.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:8133330633"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-900 text-white rounded-xl text-xs font-semibold hover:bg-emerald-950 transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call Clinic Now: (813) 333-0633</span>
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="w-full sm:w-auto px-5 py-3 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Schedule Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">Select Reason for Visit</h3>
                  <span className="text-xs text-slate-500">Step 1 of 3</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setService(item.name)}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        service === item.name
                          ? 'border-emerald-800 bg-emerald-50/70 ring-1 ring-emerald-800'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{item.note}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-emerald-900 text-white rounded-xl text-xs font-semibold hover:bg-emerald-950 transition-colors"
                  >
                    Continue to Timing & Doctor →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Timing & Doctor Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">Select Doctor & Preferred Timing</h3>
                  <span className="text-xs text-slate-500">Step 2 of 3</span>
                </div>

                {/* Doctor Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-2">Preferred Clinician</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { name: 'Dr. Amy L. Iglesias, DMD', sub: 'Lead Dentist & Tufts Alumna' },
                      { name: 'Dr. Adriana C. Carrion Marquez, DMD', sub: 'Comprehensive & Cosmetic' },
                      { name: 'First Available Clinician', sub: 'Fastest appointment opening' },
                    ].map((doc) => (
                      <button
                        key={doc.name}
                        type="button"
                        onClick={() => setDoctor(doc.name)}
                        className={`p-3.5 rounded-xl text-left border transition-all ${
                          doctor === doc.name
                            ? 'border-emerald-800 bg-emerald-50/70 ring-1 ring-emerald-800'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">{doc.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{doc.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Day (Tue-Fri clinic operating hours) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-2">Preferred Day (Office Hours)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {days.map((d) => (
                      <button
                        key={d.day}
                        type="button"
                        onClick={() => setPreferredDay(d.day)}
                        className={`p-3 rounded-xl text-center border transition-all ${
                          preferredDay === d.day
                            ? 'border-emerald-800 bg-emerald-50/70 ring-1 ring-emerald-800 font-bold'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="text-xs text-slate-900">{d.day}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{d.hours}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time of Day */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-2">Preferred Window</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Morning (8:00 AM – 12:00 PM)', icon: Clock },
                      { label: 'Afternoon (12:00 PM – 5:00 PM)', icon: Clock },
                    ].map((w) => (
                      <button
                        key={w.label}
                        type="button"
                        onClick={() => setPreferredTime(w.label)}
                        className={`p-3 rounded-xl text-left border flex items-center gap-2.5 transition-all ${
                          preferredTime === w.label
                            ? 'border-emerald-800 bg-emerald-50/70 ring-1 ring-emerald-800 font-bold'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <w.icon className="w-4 h-4 text-emerald-800" />
                        <span className="text-xs text-slate-900">{w.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    ← Back to Treatments
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-emerald-900 text-white rounded-xl text-xs font-semibold hover:bg-emerald-950 transition-colors"
                  >
                    Continue to Patient Information →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Submit */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">Patient & Insurance Information</h3>
                  <span className="text-xs text-slate-500">Step 3 of 3</span>
                </div>

                {/* Summary bar */}
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-slate-200 text-xs flex flex-wrap gap-x-4 gap-y-1 text-slate-700">
                  <span><strong>Service:</strong> {service}</span>
                  <span><strong>Doctor:</strong> {doctor}</span>
                  <span><strong>Slot:</strong> {preferredDay} ({preferredTime})</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Direct Telephone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(813) 000-0000"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="eleanor@example.com"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Insurance / Payment Plan
                    </label>
                    <select
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none bg-white"
                    >
                      <option value="Dental PPO Insurance (Delta, MetLife, Cigna, Aetna, etc.)">Dental PPO Insurance (In-Network)</option>
                      <option value="Medicare Advantage Plan">Medicare Advantage Plan</option>
                      <option value="In-House Dental Wellness Plan (No Insurance)">In-House Dental Wellness Plan (No Insurance)</option>
                      <option value="CareCredit / Sunbit Patient Financing">CareCredit / Sunbit Patient Financing</option>
                      <option value="Private Pay / HSA / FSA">Private Pay / HSA / FSA</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Notes or Dental Anxiety Accommodations (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us if you experience dental anxiety, have had recent tooth pain, or require sedation..."
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    ← Back to Timing
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-emerald-900 text-white rounded-xl text-xs font-semibold hover:bg-emerald-950 transition-colors shadow-xs"
                  >
                    Submit Appointment Request →
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
