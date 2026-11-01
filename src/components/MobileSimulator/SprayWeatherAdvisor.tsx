import React, { useState } from 'react';
import {
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldAlert,
  Info,
  ChevronDown
} from 'lucide-react';
import { GHANA_WEATHER_DISTRICTS, GhanaWeatherDistrict } from '../../data/ghanaAgroData';

interface SprayWeatherAdvisorProps {
  onBack?: () => void;
}

export const SprayWeatherAdvisor: React.FC<SprayWeatherAdvisorProps> = ({ onBack }) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('ejura');

  const district: GhanaWeatherDistrict =
    GHANA_WEATHER_DISTRICTS.find(d => d.id === selectedDistrictId) || GHANA_WEATHER_DISTRICTS[0];

  const getStatusBadge = (condition: GhanaWeatherDistrict['sprayCondition']) => {
    switch (condition) {
      case 'Optimal':
        return {
          bg: 'bg-emerald-500 text-white',
          border: 'border-emerald-600',
          boxBg: 'bg-emerald-50',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          titleColor: 'text-emerald-950',
          label: 'Optimal Spray Window'
        };
      case 'Caution / Marginal':
        return {
          bg: 'bg-amber-500 text-white',
          border: 'border-amber-600',
          boxBg: 'bg-amber-50',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          titleColor: 'text-amber-950',
          label: 'Caution / Use Sticker'
        };
      case 'Unsafe - Do Not Spray':
        return {
          bg: 'bg-red-600 text-white',
          border: 'border-red-700',
          boxBg: 'bg-red-50',
          icon: <ShieldAlert className="w-5 h-5 text-red-600" />,
          titleColor: 'text-red-950',
          label: 'High Wash-Off Risk - DO NOT SPRAY'
        };
    }
  };

  const statusStyle = getStatusBadge(district.sprayCondition);

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white p-4 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider font-bold bg-stone-800 text-emerald-300 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
            <CloudRain className="w-3 h-3" /> Ghana Agro-Meteorological Advisor
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
          Rain-Fastness & Spray Window Radar
        </h3>
        <p className="text-[11px] text-stone-300 mt-0.5 leading-snug">
          Evaluates tropical precipitation wash-off risks, wind drift, and canopy dew to prevent agrochemical financial loss.
        </p>
      </div>

      {/* District Selector Card */}
      <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-2">
        <label className="text-[11px] font-bold text-stone-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            Farming District / Agro-Ecological Zone:
          </span>
          <span className="text-[10px] text-stone-500 font-normal">
            {district.zoneType}
          </span>
        </label>
        <div className="relative">
          <select
            value={selectedDistrictId}
            onChange={(e) => setSelectedDistrictId(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs font-bold text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden appearance-none"
          >
            {GHANA_WEATHER_DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                📍 {d.districtName} ({d.region} Region) • {d.sprayCondition}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Primary Decision Banner Card */}
      <div className={`${statusStyle.boxBg} border-2 ${statusStyle.border} rounded-2xl p-4 space-y-3 shadow-xs`}>
        <div className="flex items-start gap-3">
          <div className="shrink-0 p-2 bg-white rounded-xl shadow-xs border border-stone-200">
            {statusStyle.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${statusStyle.bg}`}>
                {district.sprayCondition}
              </span>
              <span className="text-[10px] text-stone-500 font-mono">
                Updated live
              </span>
            </div>
            <h4 className={`text-sm font-black mt-1 ${statusStyle.titleColor}`}>
              {statusStyle.label}
            </h4>
            <p className="text-xs text-stone-700 mt-1 leading-relaxed">
              {district.sprayStatusSummary}
            </p>
          </div>
        </div>

        {/* Rain-Fastness Safety Gauge */}
        <div className="bg-white/80 rounded-xl p-3 border border-stone-200/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              Rain-Free Safety Window:
            </span>
            <span className="font-mono font-black text-stone-900">
              {district.rainfastSafetyWindowHrs} Hours
            </span>
          </div>
          <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                district.rainfastSafetyWindowHrs >= 4
                  ? 'bg-emerald-600'
                  : district.rainfastSafetyWindowHrs >= 2.5
                  ? 'bg-amber-500'
                  : 'bg-red-600'
              }`}
              style={{ width: `${Math.min(100, (district.rainfastSafetyWindowHrs / 6) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-stone-500 font-mono">
            <span>Critical (&lt;2h wash risk)</span>
            <span>Standard (3h)</span>
            <span>Optimal (&gt;4h)</span>
          </div>
        </div>
      </div>

      {/* Atmospheric Micro-Climate Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-[10px]">
            <span className="flex items-center gap-1">
              <CloudRain className="w-3 h-3 text-blue-600" /> Rain Probability (3h)
            </span>
          </div>
          <div className="text-lg font-black text-stone-900 font-mono">
            {district.rainProbabilityNext3Hours}%
          </div>
          <span className="text-[10px] text-stone-500 block">
            6h forecast: {district.rainProbabilityNext6Hours}%
          </span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-[10px]">
            <span className="flex items-center gap-1">
              <Wind className="w-3 h-3 text-cyan-600" /> Wind Speed (Drift)
            </span>
          </div>
          <div className="text-lg font-black text-stone-900 font-mono">
            {district.windSpeedKmh} km/h
          </div>
          <span className="text-[10px] text-stone-500 block">
            {district.windSpeedKmh > 15 ? '⚠️ High drift risk' : '✅ Calm air (<15 km/h)'}
          </span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-[10px]">
            <span className="flex items-center gap-1">
              <Sun className="w-3 h-3 text-amber-500" /> Temperature & RH
            </span>
          </div>
          <div className="text-lg font-black text-stone-900 font-mono">
            {district.currentTempC}°C
          </div>
          <span className="text-[10px] text-stone-500 block">
            Humidity: {district.humidityPercent}%
          </span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500 text-[10px]">
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-emerald-600" /> Leaf Dew Status
            </span>
          </div>
          <div className="text-xs font-black text-stone-900 truncate">
            {district.dewStatus}
          </div>
          <span className="text-[10px] text-stone-500 block">
            {district.dewStatus === 'Dry Foliage' ? '✅ Max chemical adherence' : '⚠️ Wait for dew to dry'}
          </span>
        </div>
      </div>

      {/* Best Spray Time Today Card */}
      <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
          <Clock className="w-4 h-4 text-emerald-700" />
          <span>Recommended Application Timing Today:</span>
        </div>
        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs">
          <p className="font-bold text-emerald-950">
            🕒 {district.bestSprayTimeToday}
          </p>
          <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
            Avoid spraying between <strong>11:30 AM and 3:30 PM</strong>: intense equatorial Ghanaian sunshine causes rapid chemical droplet evaporation, while thermal updrafts waste up to 40% of spray into the atmosphere.
          </p>
        </div>
      </div>

      {/* Smallholder Rain-Fastness Rules */}
      <div className="bg-amber-50/70 rounded-2xl p-3 border border-amber-200 text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-amber-950 text-[11px]">
          <Info className="w-3.5 h-3.5 text-amber-700" />
          <span>MoFA Golden Rules for Spraying in Ghana:</span>
        </div>
        <ul className="space-y-1 text-[10px] text-amber-900 pl-4 list-disc leading-relaxed">
          <li><strong>Systemic Fungicides (e.g. Amistar Top):</strong> Require <strong>1.5 to 2 hours</strong> rain-free to absorb into leaf tissue.</li>
          <li><strong>Contact Fungicides (e.g. Mancozeb WP):</strong> Require <strong>3 to 4 hours</strong> without rain; add an adjuvant sticker in rainy season.</li>
          <li>Never spray during rain or on water-dripping leaves (causes immediate chemical run-off and toxic ground contamination).</li>
        </ul>
      </div>
    </div>
  );
};
