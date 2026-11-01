import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Droplets,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Package,
  Layers,
  ChevronDown
} from 'lucide-react';
import {
  KNAPSACK_SPRAYERS,
  LAND_CONVERSIONS,
  GHANA_EPA_CHEMICAL_REGISTRY,
  GhanaLandUnit,
  GhanaChemicalProduct
} from '../../data/ghanaAgroData';

interface KnapsackDosageCalculatorProps {
  initialChemicalId?: string;
  initialDiseaseName?: string;
  initialCrop?: string;
  onBack?: () => void;
}

export const KnapsackDosageCalculator: React.FC<KnapsackDosageCalculatorProps> = ({
  initialChemicalId,
  initialDiseaseName,
  initialCrop,
  onBack
}) => {
  // Selected chemical
  const [selectedChemicalId, setSelectedChemicalId] = useState<string>(
    initialChemicalId || GHANA_EPA_CHEMICAL_REGISTRY[0].id
  );

  // Selected Sprayer
  const [selectedSprayerId, setSelectedSprayerId] = useState<string>('solo_15');

  // Land measurements
  const [landAreaValue, setLandAreaValue] = useState<number>(2); // e.g. 2 poles or 1 acre
  const [landUnit, setLandUnit] = useState<GhanaLandUnit>('pole');

  // Update selected chemical if initial chemical ID changes
  useEffect(() => {
    if (initialChemicalId) {
      setSelectedChemicalId(initialChemicalId);
    }
  }, [initialChemicalId]);

  const chemical = GHANA_EPA_CHEMICAL_REGISTRY.find(c => c.id === selectedChemicalId) || GHANA_EPA_CHEMICAL_REGISTRY[0];
  const sprayer = KNAPSACK_SPRAYERS.find(s => s.id === selectedSprayerId) || KNAPSACK_SPRAYERS[0];

  // Mathematical Calculations:
  // Convert chosen land unit to Acres
  const totalAcres = landAreaValue * LAND_CONVERSIONS[landUnit].toAcres;

  // Base tanks per acre calibrated for 15L tank
  const baseTanksPerAcre = chemical.tanksPerAcre || 5;

  // Capacity adjustment factor (if 16L or 20L sprayer, fewer tanks needed)
  const capacityFactor = 15 / sprayer.tankCapacityLiters;

  // Total knapsack refills needed for this land parcel
  const rawTanksNeeded = totalAcres * baseTanksPerAcre * capacityFactor;
  const tanksNeeded = Math.max(1, Math.round(rawTanksNeeded * 10) / 10);
  const fullTanksCount = Math.ceil(tanksNeeded);

  // Dosage per single knapsack tank (scaled by tank capacity)
  const doseRatio = sprayer.tankCapacityLiters / 15;
  const dosePerTank = Math.round(chemical.ratePer15LTank.numericValue * doseRatio * 10) / 10;
  const doseUnit = chemical.ratePer15LTank.unit;

  // Total product needed for whole parcel
  const totalProductNeeded = Math.round(dosePerTank * tanksNeeded);

  // Total water volume
  const totalWaterLiters = Math.round(tanksNeeded * sprayer.tankCapacityLiters);

  // Estimated Cost in GH₵
  const packagesNeeded = chemical.averagePriceGHS.priceCedis > 0
    ? Math.max(1, Math.ceil(totalProductNeeded / (chemical.ratePer15LTank.numericValue * 5)))
    : 0;
  const estimatedCostCedis = packagesNeeded * chemical.averagePriceGHS.priceCedis;

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white p-4 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Calculator className="w-3 h-3" /> Ghana Knapsack Sprayer Mix Calculator
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
            Calibrated Tank Mix & Sprayer Dosage
          </h3>
          <p className="text-[11px] text-emerald-200 mt-0.5 leading-snug">
            Eliminates chemical waste, crop burn, and underdosing. Calibrated for Ghanaian smallholder knapsacks and customary land units.
          </p>
        </div>
      </div>

      {initialDiseaseName && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-stone-700">
              Calibrated for: <strong className="text-stone-900">{initialDiseaseName}</strong> ({initialCrop?.toUpperCase()})
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
            MoFA Protocol
          </span>
        </div>
      )}

      {/* Input Parameters Card */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3.5">
        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
          <Droplets className="w-3.5 h-3.5 text-emerald-700" />
          1. Select Farm Size & Sprayer Model
        </h4>

        {/* Agrochemical Product Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-stone-700 block">
            Target Agrochemical / Organic Formula:
          </label>
          <div className="relative">
            <select
              value={selectedChemicalId}
              onChange={(e) => setSelectedChemicalId(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs font-semibold text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden appearance-none"
            >
              {GHANA_EPA_CHEMICAL_REGISTRY.filter(c => !c.isBannedOrRestricted).map((chem) => (
                <option key={chem.id} value={chem.id}>
                  {chem.tradeName} ({chem.chemicalClass}) • {chem.activeIngredient.split('+')[0].trim()}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>
          <p className="text-[10px] text-stone-500">
            EPA Reg: <strong className="text-stone-700 font-mono">{chemical.epaRegistrationNo}</strong> • Stockist: {chemical.distributorInGhana}
          </p>
        </div>

        {/* Sprayer Type Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-stone-700 block">
            Knapsack Sprayer Tank Model:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {KNAPSACK_SPRAYERS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSprayerId(s.id)}
                className={`p-2 rounded-xl border text-center transition-all ${
                  selectedSprayerId === s.id
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 text-[11px]'
                }`}
              >
                <div className="text-xs font-black">{s.tankCapacityLiters} Liters</div>
                <div className="text-[9px] opacity-80 truncate">{s.popularBrand.split('/')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Farm Land Area & Customary Unit */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-stone-700 block">
            Farm Land Parcel Size:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.25"
              max="100"
              step="0.25"
              value={landAreaValue}
              onChange={(e) => setLandAreaValue(Math.max(0.1, parseFloat(e.target.value) || 1))}
              className="w-24 bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs font-bold text-stone-900 focus:ring-2 focus:ring-emerald-600 text-center"
            />
            <div className="flex-1 grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-[11px]">
              {(['pole', 'acre', 'hectare'] as GhanaLandUnit[]).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setLandUnit(unit)}
                  className={`py-1 rounded-lg text-center font-bold capitalize transition-all ${
                    landUnit === unit
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {unit === 'pole' ? 'Pole (1/4 Ac)' : unit}
                </button>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-stone-500 italic">
            {LAND_CONVERSIONS[landUnit].description} (= {totalAcres} total acres)
          </p>
        </div>
      </div>

      {/* Calculated Results Card */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <span className="text-xs font-black text-stone-900 uppercase tracking-wide">
            2. Field Mixing & Application Instructions
          </span>
          <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
            {landAreaValue} {landUnit.toUpperCase()} ({totalAcres} Ac)
          </span>
        </div>

        {/* Primary Metric Highlights */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-center">
            <span className="text-[10px] font-bold text-emerald-900 uppercase block">
              Knapsack Tanks Needed
            </span>
            <span className="text-2xl font-black text-emerald-950 font-mono">
              {tanksNeeded}
            </span>
            <span className="text-[10px] text-emerald-800 block mt-0.5">
              Refills ({sprayer.tankCapacityLiters}L each)
            </span>
          </div>

          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-center">
            <span className="text-[10px] font-bold text-amber-900 uppercase block">
              Dosage Per 1 Tank
            </span>
            <span className="text-xl font-black text-amber-950 font-mono">
              {dosePerTank} {doseUnit}
            </span>
            <span className="text-[10px] text-amber-800 font-bold block mt-0.5 truncate">
              {chemical.ratePer15LTank.ghanaLocalMeasure}
            </span>
          </div>
        </div>

        {/* Ghanaian Practical Measurement Scoop */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Practical Ghanaian Smallholder Measurement:</span>
          </div>
          <p className="text-xs text-stone-700 leading-snug">
            👉 For each <strong className="text-stone-900">{sprayer.tankCapacityLiters}L tank</strong>, measure exactly:{' '}
            <strong className="text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
              {chemical.ratePer15LTank.ghanaLocalMeasure}
            </strong>
          </p>
          <div className="text-[10px] text-stone-500 pt-1 border-t border-stone-200/80 flex items-center justify-between">
            <span>Total Water Needed: <strong>{totalWaterLiters} Liters</strong></span>
            <span>Total Chemical: <strong>{totalProductNeeded} {doseUnit}</strong></span>
          </div>
        </div>

        {/* Estimated Input Budget (Cedis) */}
        {chemical.averagePriceGHS.priceCedis > 0 && (
          <div className="flex items-center justify-between bg-stone-100/80 p-2.5 rounded-xl text-xs">
            <div>
              <span className="text-[10px] font-bold text-stone-600 uppercase block">
                Estimated Chemical Cost (Ghana Cedis):
              </span>
              <span className="font-bold text-stone-900">
                ~ GH₵ {estimatedCostCedis.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-500 block">
                ({packagesNeeded} x {chemical.averagePriceGHS.packageSize} @ ~GH₵ {chemical.averagePriceGHS.priceCedis})
              </span>
            </div>
            <span className="text-[10px] font-medium text-emerald-800 bg-white px-2 py-1 rounded border border-stone-200">
              Techiman / Kumasi Retail Index
            </span>
          </div>
        )}

        {/* Step-by-Step MoFA Mixing Protocol */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs space-y-1.5">
          <span className="text-[10px] font-bold uppercase text-stone-600 block">
            MoFA Certified Knapsack Tank Mix Order:
          </span>
          <ol className="text-[11px] text-stone-700 space-y-1 list-decimal pl-4 leading-relaxed">
            <li>Fill knapsack tank halfway with <strong>clean, mud-free water</strong> ({Math.round(sprayer.tankCapacityLiters / 2)}L).</li>
            <li>In a separate plastic bucket, pre-dissolve the measured chemical ({dosePerTank}{doseUnit}) with 2L water.</li>
            <li>Pour pre-mixed slurry through the tank filter basket, then top up water to full mark.</li>
            <li>Invert sprayer gently twice to ensure uniform suspension before pumping.</li>
          </ol>
        </div>

        {/* Safety & Harvest Interval Pill */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="bg-stone-100 p-2 rounded-lg border border-stone-200">
            <span className="text-stone-500 font-bold block">Re-Entry Interval:</span>
            <span className="font-bold text-stone-800">{chemical.reEntryIntervalHours} Hours</span>
          </div>
          <div className="bg-stone-100 p-2 rounded-lg border border-stone-200">
            <span className="text-stone-500 font-bold block">Pre-Harvest Interval (PHI):</span>
            <span className="font-bold text-stone-800">{chemical.preHarvestIntervalDays} Days Before Harvest</span>
          </div>
        </div>
      </div>
    </div>
  );
};
