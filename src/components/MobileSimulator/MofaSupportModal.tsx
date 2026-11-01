import React, { useState } from 'react';
import {
  Phone,
  PhoneCall,
  ShieldAlert,
  Building2,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  X,
  Search,
  CheckCircle2,
  MapPin,
  Clock,
  Radio,
  FileCheck
} from 'lucide-react';
import {
  MOFA_PRIMARY_HOTLINE,
  MOFA_GHANA_HOTLINES,
  MofaContact
} from '../../data/ghanaAgroData';

interface MofaSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilter?: 'all' | 'farmer_support' | 'pest_emergency' | 'pprsd_regulatory' | 'regional_directorate';
  highlightEmergency?: boolean;
}

export const MofaSupportModal: React.FC<MofaSupportModalProps> = ({
  isOpen,
  onClose,
  initialFilter = 'all',
  highlightEmergency = false
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, number: string) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const filteredHotlines = MOFA_GHANA_HOTLINES.filter((contact) => {
    const matchesFilter = activeFilter === 'all' || contact.category === activeFilter;
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.displayNumber.includes(searchQuery) ||
      (contact.location && contact.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      contact.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white p-4 sm:p-5 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600/90 border border-emerald-400/40 flex items-center justify-center text-white shadow-inner shrink-0">
              <PhoneCall className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  🇬🇭 Official Ghana Government
                </span>
                <span className="text-[10px] font-bold text-amber-300">
                  mofa.gov.gh
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-1">
                MoFA Ghana Support & Hotlines
              </h3>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Official Ministry of Food & Agriculture extension, emergency & regulatory lines
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Quick-Call Hero Banner (Official Main Hotline: 050 916 3727) */}
        <div className="bg-emerald-950 text-white p-3.5 sm:p-4 border-b border-emerald-900/60 shrink-0">
          <div className="bg-emerald-900/80 rounded-2xl p-3 border border-emerald-600/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 uppercase tracking-wide">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Primary MoFA Extension Hotline
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white flex items-center gap-2">
                <span>{MOFA_PRIMARY_HOTLINE.displayLocal}</span>
                <span className="text-xs font-normal text-emerald-300">({MOFA_PRIMARY_HOTLINE.nationalSupport})</span>
              </div>
              <p className="text-[11px] text-emerald-200/90">
                Direct AEA extension support, subsidized inputs, and crop disease guidance.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={MOFA_PRIMARY_HOTLINE.telUri}
                className="flex-1 sm:flex-initial py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-emerald-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <button
                onClick={() => handleCopy('primary', MOFA_PRIMARY_HOTLINE.nationalSupport)}
                className="p-2.5 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-emerald-200 hover:text-white rounded-xl border border-emerald-600/80 transition-all text-xs flex items-center gap-1"
                title="Copy phone number"
              >
                {copiedId === 'primary' ? (
                  <Check className="w-4 h-4 text-emerald-300" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-3 bg-stone-50 border-b border-stone-200 space-y-2 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by hotline, department, region (e.g. Ashanti, Armyworm)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
            {[
              { id: 'all', label: 'All Hotlines' },
              { id: 'farmer_support', label: 'Farmer Support' },
              { id: 'pest_emergency', label: '🚨 Pest Emergency' },
              { id: 'pprsd_regulatory', label: 'PPRSD Plant Health' },
              { id: 'regional_directorate', label: 'Regional RADUs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
          {highlightEmergency && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-300 text-red-950 flex items-start gap-2.5 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-red-900 font-bold">Urgent Pest Outbreak Detected?</strong>
                <p className="text-[11px] text-red-800 mt-0.5">
                  Call the National Fall Armyworm Taskforce directly below for rapid government spraying assistance.
                </p>
              </div>
            </div>
          )}

          {filteredHotlines.map((contact) => (
            <div
              key={contact.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                contact.isEmergency
                  ? 'bg-red-50/70 border-red-300 hover:border-red-400'
                  : 'bg-white border-stone-200 hover:border-emerald-400 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {contact.isEmergency ? (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5" /> Emergency Hotline
                      </span>
                    ) : (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FileCheck className="w-2.5 h-2.5" /> Verified MoFA
                      </span>
                    )}

                    {contact.location && (
                      <span className="text-[10px] text-stone-500 font-semibold flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {contact.location}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs sm:text-sm font-black text-stone-900 mt-1">
                    {contact.name}
                  </h4>
                  <p className="text-[11px] text-stone-600 font-medium">
                    {contact.department}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-black font-mono text-emerald-950 block">
                    {contact.displayNumber}
                  </span>
                  <div className="text-[9px] text-stone-400 flex items-center justify-end gap-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{contact.operatingHours}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 mt-2 bg-stone-50 p-2 rounded-xl border border-stone-100 leading-relaxed">
                {contact.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-stone-100">
                <a
                  href={contact.telUri}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                    contact.isEmergency
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {contact.displayNumber}</span>
                </a>

                <button
                  onClick={() => handleCopy(contact.id, contact.hotlineNumber)}
                  className="py-2 px-3 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-700 rounded-xl font-semibold text-xs flex items-center gap-1 transition-all border border-stone-200"
                  title="Copy number"
                >
                  {copiedId === contact.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

          {filteredHotlines.length === 0 && (
            <div className="text-center py-8 text-stone-400">
              <PhoneCall className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p className="text-xs font-bold text-stone-600">No hotline found for "{searchQuery}"</p>
              <p className="text-[11px] text-stone-400 mt-1">
                You can always dial the main MoFA hotline directly at <strong>050 916 3727</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer with Verification Note */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 shrink-0 flex items-center justify-between text-[11px] text-stone-600">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-800" />
            <span>Ministry of Food and Agriculture (Republic of Ghana)</span>
          </div>

          <a
            href="https://mofa.gov.gh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 hover:underline"
          >
            <span>mofa.gov.gh</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
