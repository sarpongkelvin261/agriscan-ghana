import React, { useState } from 'react';
import {
  Radio,
  AlertTriangle,
  ShieldAlert,
  MapPin,
  Flame,
  Send,
  CheckCircle2,
  Filter,
  Users,
  Building2,
  Calendar,
  Phone,
  PhoneCall
} from 'lucide-react';
import {
  GHANA_REGIONAL_OUTBREAKS,
  GhanaOutbreakCluster,
  MOFA_PRIMARY_HOTLINE
} from '../../data/ghanaAgroData';
import { MofaSupportModal } from './MofaSupportModal';

interface OutbreakRadarProps {
  onBack?: () => void;
}

export const OutbreakRadar: React.FC<OutbreakRadarProps> = ({ onBack }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);
  const [showMofaHotlineModal, setShowMofaHotlineModal] = useState<boolean>(false);

  // Form states for reporting an outbreak
  const [reportDistrict, setReportDistrict] = useState<string>('Ejura-Sekyedumase');
  const [reportCrop, setReportCrop] = useState<string>('Maize');
  const [reportDisease, setReportDisease] = useState<string>('Northern Corn Leaf Blight');
  const [reportNotes, setReportNotes] = useState<string>('');

  const filteredOutbreaks = GHANA_REGIONAL_OUTBREAKS.filter((cluster) =>
    selectedRegion === 'all' ? true : cluster.region.toLowerCase().includes(selectedRegion.toLowerCase())
  );

  const getAlertBadge = (level: GhanaOutbreakCluster['alertLevel']) => {
    switch (level) {
      case 'Critical Outbreak':
        return {
          bg: 'bg-red-600 text-white',
          border: 'border-red-600',
          badgeBg: 'bg-red-50 text-red-950 border-red-200',
          icon: <Flame className="w-3.5 h-3.5 text-red-600" />
        };
      case 'Severe Warning':
        return {
          bg: 'bg-amber-600 text-white',
          border: 'border-amber-600',
          badgeBg: 'bg-amber-50 text-amber-950 border-amber-200',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
        };
      case 'Active Monitoring':
        return {
          bg: 'bg-blue-600 text-white',
          border: 'border-blue-600',
          badgeBg: 'bg-blue-50 text-blue-950 border-blue-200',
          icon: <Radio className="w-3.5 h-3.5 text-blue-600" />
        };
      case 'Controlled':
        return {
          bg: 'bg-emerald-600 text-white',
          border: 'border-emerald-600',
          badgeBg: 'bg-emerald-50 text-emerald-950 border-emerald-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        };
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setShowReportModal(false);
      setReportNotes('');
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white p-4 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider font-bold bg-red-900/80 text-red-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-red-700/60 animate-pulse">
            <Radio className="w-3 h-3 text-red-400" /> Live Surveillance Feed
          </span>
          {onBack && (
            <button
              onClick={onBack}
              className="text-[11px] font-semibold text-stone-300 hover:text-white underline"
            >
              ← Back
            </button>
          )}
        </div>
        <h3 className="text-base font-black text-white mt-1.5">
          Ghana Outbreak Radar & District Surveillance
        </h3>
        <p className="text-[11px] text-stone-300 mt-0.5 leading-snug">
          Real-time epidemiological biosecurity radar tracking localized crop pathology clusters across Ghana's 16 regions.
        </p>
      </div>

      {/* MoFA Emergency Hotlines Call Banner */}
      <div className="bg-red-950 text-white p-3.5 rounded-2xl border border-red-800 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-wider text-red-200">
              MoFA Ghana Emergency Hotlines
            </span>
          </div>
          <button
            onClick={() => setShowMofaHotlineModal(true)}
            className="text-[10px] font-bold text-amber-300 hover:text-white underline"
          >
            All Directorates Directory →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {/* Fall Armyworm Emergency */}
          <div className="bg-red-900/70 p-2.5 rounded-xl border border-red-700/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-red-200 font-bold block">Pest & Armyworm Emergency:</span>
              <span className="text-xs font-mono font-black text-white">026 127 4671 / 024 495 1912</span>
            </div>
            <a
              href="tel:+233261274671"
              className="py-1 px-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 shrink-0 ml-2"
            >
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>

          {/* MoFA Farmer Hotline */}
          <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-emerald-300 font-bold block">MoFA Farmer Support Hotline:</span>
              <span className="text-xs font-mono font-black text-white">{MOFA_PRIMARY_HOTLINE.displayLocal}</span>
            </div>
            <a
              href={MOFA_PRIMARY_HOTLINE.telUri}
              className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 shrink-0 ml-2"
            >
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>

      {/* Region Filter Bar & Report Action */}
      <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-800 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-emerald-700" />
            Filter by Ghana Region:
          </span>
          <button
            onClick={() => setShowReportModal(!showReportModal)}
            className="text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg transition-all"
          >
            + Report Field Cluster
          </button>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          {[
            { id: 'all', label: 'All Ghana (5)' },
            { id: 'ashanti', label: 'Ashanti (2)' },
            { id: 'bono', label: 'Bono East (1)' },
            { id: 'eastern', label: 'Eastern (1)' },
            { id: 'northern', label: 'Northern (1)' }
          ].map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all ${
                selectedRegion === region.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      {/* Extension Field Report Submission Modal */}
      {showReportModal && (
        <form onSubmit={handleReportSubmit} className="bg-white rounded-2xl p-4 border-2 border-emerald-600 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
              <Send className="w-3.5 h-3.5 text-emerald-700" />
              <span>Submit MoFA Field Outbreak Alert</span>
            </div>
            <button
              type="button"
              onClick={() => setShowReportModal(false)}
              className="text-xs text-stone-400 hover:text-stone-600 font-bold"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] font-bold text-stone-700 block">District:</label>
              <input
                type="text"
                value={reportDistrict}
                onChange={(e) => setReportDistrict(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-1.5 text-xs font-semibold"
                required
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-stone-700 block">Host Crop:</label>
              <select
                value={reportCrop}
                onChange={(e) => setReportCrop(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-1.5 text-xs font-semibold"
              >
                <option value="Maize">Maize</option>
                <option value="Cassava">Cassava</option>
                <option value="Tomato">Tomato</option>
                <option value="Pepper">Pepper</option>
                <option value="Cocoa">Cocoa</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="text-[10px] font-bold text-stone-700 block">Identified Pathogen / Pest:</label>
            <input
              type="text"
              value={reportDisease}
              onChange={(e) => setReportDisease(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-1.5 text-xs font-semibold"
              required
            />
          </div>

          <div className="text-xs">
            <label className="text-[10px] font-bold text-stone-700 block">Field Observations & Farm Radius:</label>
            <textarea
              rows={2}
              value={reportNotes}
              onChange={(e) => setReportNotes(e.target.value)}
              placeholder="e.g. Approximately 4 acres infected along Offinso North irrigation canal..."
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-1.5 text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={reportSubmitted}
            className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
          >
            {reportSubmitted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>Transmitted to MoFA Biosecurity Network!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Anonymous Alert</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Outbreak Hotspots Feed */}
      <div className="space-y-3">
        {filteredOutbreaks.map((cluster) => {
          const badge = getAlertBadge(cluster.alertLevel);
          return (
            <div
              key={cluster.id}
              className={`bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3 relative overflow-hidden`}
            >
              {/* Top Meta */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${badge.badgeBg} border`}>
                      {badge.icon}
                      {cluster.alertLevel}
                    </span>
                    <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                      {cluster.crop.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-stone-900 mt-1">
                    {cluster.diseaseName}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-stone-600 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span><strong>{cluster.district}</strong> • {cluster.region}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-black text-stone-900 font-mono block">
                    {cluster.confirmedCases}
                  </span>
                  <span className="text-[9px] text-stone-500 uppercase font-bold">
                    Scanned Cases
                  </span>
                </div>
              </div>

              {/* Advisory Text */}
              <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                {cluster.advisoryText}
              </p>

              {/* Quarantine & Containment Directive */}
              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-amber-700" />
                    MoFA / PPRSD Containment Directive:
                  </span>
                  <a
                    href="tel:+233261274671"
                    className="text-[10px] font-bold text-red-700 hover:text-red-900 bg-red-100 hover:bg-red-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    <span>Call Hotline</span>
                  </a>
                </div>
                <p className="text-[11px] text-amber-900 font-medium leading-snug">
                  {cluster.quarantineProtocol}
                </p>
              </div>

              {/* Bottom Footer Details */}
              <div className="flex items-center justify-between text-[10px] text-stone-500 border-t border-stone-100 pt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Flagged: {cluster.reportedDate}
                </span>
                <span className="text-stone-400">
                  Updated {cluster.lastUpdated}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MoFA Support Directory Modal */}
      <MofaSupportModal
        isOpen={showMofaHotlineModal}
        onClose={() => setShowMofaHotlineModal(false)}
        initialFilter="pest_emergency"
        highlightEmergency={true}
      />
    </div>
  );
};
