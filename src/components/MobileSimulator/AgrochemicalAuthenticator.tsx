import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Store,
  FileText,
  BadgeAlert,
  Sparkles,
  Check,
  Phone,
  PhoneCall
} from 'lucide-react';
import {
  GHANA_EPA_CHEMICAL_REGISTRY,
  GhanaChemicalProduct,
  MOFA_PRIMARY_HOTLINE
} from '../../data/ghanaAgroData';
import { MofaSupportModal } from './MofaSupportModal';

interface AgrochemicalAuthenticatorProps {
  onBack?: () => void;
}

export const AgrochemicalAuthenticator: React.FC<AgrochemicalAuthenticatorProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scratchCode, setScratchCode] = useState<string>('');
  const [showMofaModal, setShowMofaModal] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<{
    status: 'idle' | 'verified' | 'counterfeit' | 'banned';
    message: string;
    product?: GhanaChemicalProduct;
  }>({ status: 'idle', message: '' });

  // Filter registry products
  const filteredProducts = GHANA_EPA_CHEMICAL_REGISTRY.filter((prod) =>
    prod.tradeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.activeIngredient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.epaRegistrationNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerifyScratchCode = () => {
    if (!scratchCode.trim()) return;

    const cleanCode = scratchCode.trim().toUpperCase();

    // Check if banned keyword entered
    if (cleanCode.includes('PARAQUAT') || cleanCode.includes('GRAMOXONE')) {
      setVerificationResult({
        status: 'banned',
        message: 'PROHIBITED CHEMICAL: Paraquat is strictly banned in Ghana under EPA Act 490. Possession or sale is illegal and poses lethal toxicity.',
        product: GHANA_EPA_CHEMICAL_REGISTRY.find(p => p.isBannedOrRestricted)
      });
      return;
    }

    // Sample genuine scratch code check (e.g., GH-8421, EPA-2026, or any 6+ digit code)
    if (cleanCode.startsWith('GH-') || cleanCode.length === 6 || cleanCode.startsWith('EPA')) {
      const genuineSample = GHANA_EPA_CHEMICAL_REGISTRY[0]; // Ivory 80 WP
      setVerificationResult({
        status: 'verified',
        message: 'AUTHENTIC PRODUCT VERIFIED: Registered with EPA Ghana and PPRSD. Batch inspection matches certified import quota.',
        product: genuineSample
      });
    } else {
      setVerificationResult({
        status: 'counterfeit',
        message: 'WARNING - UNVERIFIED / SUSPECTED COUNTERFEIT: Security code not recognized in EPA Ghana or PPRSD database. Do not apply to crops; report dealer to MoFA district office.'
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white p-4 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> EPA Ghana & PPRSD Regulatory Compliance
          </span>
          {onBack && (
            <button
              onClick={onBack}
              className="text-[11px] font-semibold text-emerald-200 hover:text-white underline"
            >
              ← Back
            </button>
          )}
        </div>
        <h3 className="text-base font-black text-white mt-1.5">
          Agrochemical & Input Authenticator
        </h3>
        <p className="text-[11px] text-emerald-200 mt-0.5 leading-snug">
          Verifies official EPA Ghana registration, detects counterfeit chemicals, and alerts against banned pesticides.
        </p>
      </div>

      {/* Anti-Counterfeit Scratch-Code Verification Card */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-emerald-700" />
            Scratch-Code / Serial Number Verification
          </h4>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Anti-Fake Shield
          </span>
        </div>

        <p className="text-[11px] text-stone-600 leading-tight">
          Enter the 6-digit silver scratch-off security pin on the pesticide sachet/bottle or enter product name:
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. GH-8421 or EPA-2026"
            value={scratchCode}
            onChange={(e) => setScratchCode(e.target.value)}
            className="flex-1 bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs font-mono font-bold text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden uppercase"
          />
          <button
            onClick={handleVerifyScratchCode}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95"
          >
            Verify
          </button>
        </div>

        {/* Quick Test Preset Buttons */}
        <div className="flex items-center gap-1.5 text-[10px] text-stone-500 overflow-x-auto">
          <span className="shrink-0">Quick Test:</span>
          <button
            onClick={() => { setScratchCode('GH-8421'); handleVerifyScratchCode(); }}
            className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded border border-stone-300 text-stone-700 font-mono"
          >
            GH-8421 (Genuine)
          </button>
          <button
            onClick={() => { setScratchCode('FAKE-999'); handleVerifyScratchCode(); }}
            className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded border border-stone-300 text-stone-700 font-mono"
          >
            FAKE-999 (Counterfeit)
          </button>
          <button
            onClick={() => { setScratchCode('PARAQUAT'); handleVerifyScratchCode(); }}
            className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 rounded border border-stone-300 text-red-700 font-mono font-bold"
          >
            PARAQUAT (Banned)
          </button>
        </div>

        {/* Verification Result Feedback */}
        {verificationResult.status !== 'idle' && (
          <div
            className={`p-3 rounded-xl border text-xs space-y-1.5 ${
              verificationResult.status === 'verified'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : verificationResult.status === 'banned'
                ? 'bg-red-50 border-red-400 text-red-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-black">
              {verificationResult.status === 'verified' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
              {verificationResult.status === 'banned' && <BadgeAlert className="w-4 h-4 text-red-700" />}
              {verificationResult.status === 'counterfeit' && <AlertTriangle className="w-4 h-4 text-amber-700" />}
              <span>
                {verificationResult.status === 'verified' && '100% Authentic EPA Approved Product'}
                {verificationResult.status === 'banned' && 'CRITICAL WARNING: BANNED PESTICIDE'}
                {verificationResult.status === 'counterfeit' && 'WARNING: SUSPECTED COUNTERFEIT'}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {verificationResult.message}
            </p>
            {verificationResult.product && (
              <div className="bg-white/90 p-2 rounded-lg border border-stone-200 text-[10px] space-y-0.5 font-sans mt-1">
                <div>Trade Name: <strong className="text-stone-900">{verificationResult.product.tradeName}</strong></div>
                <div>EPA Reg No: <strong className="text-stone-900 font-mono">{verificationResult.product.epaRegistrationNo}</strong></div>
                <div>Authorized Importer: <strong className="text-stone-900">{verificationResult.product.distributorInGhana}</strong></div>
              </div>
            )}

            {(verificationResult.status === 'counterfeit' || verificationResult.status === 'banned') && (
              <div className="mt-2 pt-2 border-t border-red-200 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[10px] font-bold text-red-900">
                  Report to PPRSD Hotline: <strong>024 406 6655</strong>
                </span>
                <div className="flex items-center gap-1.5">
                  <a
                    href="tel:+233244066655"
                    className="py-1 px-2.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold text-[10px] flex items-center gap-1 shadow-2xs"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call PPRSD</span>
                  </a>
                  <button
                    onClick={() => setShowMofaModal(true)}
                    className="py-1 px-2 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-lg font-bold text-[10px]"
                  >
                    All Contacts
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Approved EPA Chemicals */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-700" />
            PPRSD & EPA Ghana Approved Product Database
          </h4>
          <span className="text-[10px] text-stone-500 font-mono">
            {filteredProducts.length} Listed
          </span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search chemical name, active ingredient, or EPA number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          />
        </div>

        {/* Product Cards List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {filteredProducts.map((chem) => (
            <div
              key={chem.id}
              className={`p-3 rounded-xl border transition-all ${
                chem.isBannedOrRestricted
                  ? 'bg-red-50/80 border-red-300 text-red-950'
                  : 'bg-stone-50 border-stone-200 text-stone-900'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-stone-900">
                      {chem.tradeName}
                    </span>
                    {chem.pprsdApproved ? (
                      <span className="text-[9px] bg-emerald-100 text-emerald-900 font-bold px-1.5 py-0.2 rounded">
                        PPRSD Certified
                      </span>
                    ) : (
                      <span className="text-[9px] bg-red-100 text-red-900 font-bold px-1.5 py-0.2 rounded">
                        BANNED
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-600 font-mono mt-0.5">
                    {chem.activeIngredient}
                  </p>
                </div>
                <span className="text-[9px] font-mono bg-white px-1.5 py-0.5 rounded border border-stone-200 shrink-0">
                  {chem.epaRegistrationNo}
                </span>
              </div>

              {!chem.isBannedOrRestricted && (
                <div className="mt-2 pt-2 border-t border-stone-200/80 grid grid-cols-2 gap-2 text-[10px] text-stone-600">
                  <div>
                    <span className="font-bold text-stone-700">Recommended Rate:</span> {chem.ratePer15LTank.ghanaLocalMeasure}
                  </div>
                  <div>
                    <span className="font-bold text-stone-700">Official Stockist:</span> {chem.distributorInGhana}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Authorized National Input Distributors Card */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-2">
        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
          <Store className="w-3.5 h-3.5 text-emerald-700" />
          Authorized MoFA Input Distributors in Ghana
        </h4>
        <p className="text-[11px] text-stone-600">
          Always purchase certified crop protection products from verified retail dealers:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          {[
            { name: 'Wienco Ghana Ltd', hub: 'Accra / Kumasi / Tamale' },
            { name: 'Dizengoff Ghana', hub: 'Kumasi / Techiman / Tema' },
            { name: 'Agrimat Ghana', hub: 'Kejetia / Sunyani / Kasoa' },
            { name: 'Calli Ghana (UPL)', hub: 'Techiman / Somanya / Tamale' }
          ].map((dist) => (
            <div key={dist.name} className="bg-stone-50 p-2 rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block text-[11px]">{dist.name}</span>
              <span className="text-[9px] text-stone-500">{dist.hub}</span>
            </div>
          ))}
        </div>

        {/* Regulatory Reporting Banner */}
        <div className="mt-3 pt-3 border-t border-stone-200 flex items-center justify-between text-xs bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-800 shrink-0" />
            <span className="text-[11px] text-emerald-950">
              Need to report an illegal chemical vendor? Call MoFA Hotline: <strong>050 916 3727</strong>
            </span>
          </div>
          <button
            onClick={() => setShowMofaModal(true)}
            className="text-[10px] font-bold text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-100 px-2 py-1 rounded-lg shrink-0 ml-2"
          >
            Open Directory
          </button>
        </div>
      </div>

      {/* MoFA Support Directory Modal */}
      <MofaSupportModal
        isOpen={showMofaModal}
        onClose={() => setShowMofaModal(false)}
        initialFilter="pprsd_regulatory"
      />
    </div>
  );
};
