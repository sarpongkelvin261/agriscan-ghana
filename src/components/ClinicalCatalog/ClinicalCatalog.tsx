import React, { useState } from 'react';
import { CropType, AppLanguage, DiseaseInfo } from '../../types';
import { CROP_LABELS, DISEASES_DATABASE } from '../../data/diseases';
import { SAMPLE_LEAVES, SampleLeaf } from '../../data/sampleLeaves';
import {
  Droplets,
  Leaf,
  ExternalLink,
  Search,
  CheckCircle2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, getLocalizedDiseaseContent } from '../../utils/localization';
import { playGhanaianAudio, stopGhanaianAudio } from '../../utils/ghanaianSpeech';

interface ClinicalCatalogProps {
  onSelectSampleForTest?: (sampleId: string) => void;
}

export const ClinicalCatalog: React.FC<ClinicalCatalogProps> = ({ onSelectSampleForTest }) => {
  const [selectedCrop, setSelectedCrop] = useState<CropType>('maize');
  const [activeLang, setActiveLang] = useState<AppLanguage>('twi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingDiseaseId, setPlayingDiseaseId] = useState<string | null>(null);

  const cropKeys: CropType[] = [
    'maize',
    'cassava',
    'plantain',
    'yam',
    'cocoa',
    'oil_palm',
    'tomato',
    'pepper',
    'cowpea'
  ];

  const currentCropInfo = CROP_LABELS[selectedCrop];

  // Filter diseases for the selected crop
  const diseasesForCrop = (Object.values(DISEASES_DATABASE) as DiseaseInfo[]).filter((d) => {
    const matchesCrop = d.crop === selectedCrop;
    const matchesQuery = searchQuery === '' || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.localNameTwi && d.localNameTwi.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCrop && matchesQuery;
  });

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <Leaf className="w-4 h-4" /> Agronomic Clinical Index • CSIR-CRI & MoFA Protocols
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            9 Ghanaian Crops & 30 Pathologies Reference
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
            Standardized pathology profiles, vernacular symptom descriptions, and verified Ghana EPA chemical treatments with exact dosages for smallholder knapsack sprayers.
          </p>
        </div>

        {/* Vernacular Language Switcher */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 self-start md:self-auto text-xs">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setActiveLang(lang.code)}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                activeLang === lang.code
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 9 Crops Navigation Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
        {cropKeys.map((crop) => {
          const info = CROP_LABELS[crop];
          const isSelected = selectedCrop === crop;
          const langKey = activeLang === 'en' ? 'twi' : activeLang;
          const vernacularName = info?.localNames?.[langKey as 'twi' | 'ga' | 'ewe' | 'dagbani'] || info?.label.split(' ')[0];
          return (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`p-2 rounded-2xl border text-center transition-all group overflow-hidden ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300 hover:bg-stone-50'
              }`}
            >
              <div className="w-full h-14 rounded-xl overflow-hidden mb-1.5 bg-stone-100 border border-stone-200 relative">
                <img
                  src={info.realImageUrl}
                  alt={info.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <span className="absolute bottom-1 right-1 text-[11px] bg-black/60 backdrop-blur-xs rounded px-1 text-white">
                  {info.icon}
                </span>
              </div>
              <span className="text-xs font-bold block truncate text-stone-900">
                {info.label.split(' ')[0]}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block truncate">
                {vernacularName}
              </span>
              <span className="text-[9px] text-stone-400 block mt-0.5">
                {info.count} Diseases
              </span>
            </button>
          );
        })}
      </div>

      {/* Diseases List for Active Crop */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <span>{currentCropInfo?.label}</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {diseasesForCrop.length} Catalogued Conditions
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Showing clinical profiles and localized treatment guidelines in {SUPPORTED_LANGUAGES.find(l => l.code === activeLang)?.name}
            </p>
          </div>

          {/* Search filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search symptom, name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-emerald-500 shadow-2xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diseasesForCrop.map((disease) => {
            const localized = getLocalizedDiseaseContent(disease, activeLang);
            const sampleLeaf = SAMPLE_LEAVES.find((s: SampleLeaf) => s.diseaseId === disease.id);
            const isHealthy = disease.pathogenType === 'Healthy';

            return (
              <div
                key={disease.id}
                className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-14 h-16 rounded-xl bg-stone-100 overflow-hidden border border-stone-200 shrink-0 flex items-center justify-center relative">
                      <img
                        src={sampleLeaf?.realImageUrl || sampleLeaf?.svgDataUri || currentCropInfo?.realImageUrl}
                        alt={disease.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                            isHealthy
                              ? 'bg-emerald-100 text-emerald-800'
                              : disease.pathogenType === 'Fungal'
                              ? 'bg-amber-100 text-amber-800'
                              : disease.pathogenType === 'Bacterial'
                              ? 'bg-red-100 text-red-800'
                              : disease.pathogenType === 'Viral'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {disease.pathogenType}
                        </span>
                        <span className="text-[9px] text-stone-500 font-mono">
                          {disease.severity} Severity
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900 mt-1 leading-snug truncate">
                        {disease.name}
                      </h4>
                      <p className="text-[11px] font-medium text-emerald-800 truncate">
                        {localized.localName}
                      </p>
                      <p className="text-[10px] text-stone-400 italic truncate font-mono">
                        {disease.scientificName}
                      </p>
                    </div>
                  </div>

                  {/* Localized Symptoms Box */}
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-700 mb-3 space-y-1">
                    <span className="font-bold text-[10px] uppercase text-stone-500 block">
                      Field Symptoms ({SUPPORTED_LANGUAGES.find(l => l.code === activeLang)?.name}):
                    </span>
                    <p className="line-clamp-2 leading-relaxed text-[11px]">
                      {localized.localSymptoms || disease.symptoms[0]}
                    </p>
                  </div>

                  {/* Treatments Accordion */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Organic Cultural Action:
                      </span>
                      <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">
                        {localized.localOrganicTreatment[0] || disease.organicTreatment[0]}
                      </p>
                    </div>

                    {!isHealthy && disease.chemicalTreatment.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-amber-800 uppercase flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-amber-600" />
                          EPA Registered Product:
                        </span>
                        <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5 font-medium">
                          {disease.chemicalTreatment[0]?.productName} ({disease.chemicalTreatment[0]?.applicationRate})
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      if (playingDiseaseId === disease.id) {
                        stopGhanaianAudio();
                        setPlayingDiseaseId(null);
                      } else {
                        stopGhanaianAudio();
                        setPlayingDiseaseId(disease.id);
                        playGhanaianAudio({
                          diseaseId: disease.id,
                          lang: activeLang,
                          text: localized.speechSummary,
                          onStart: () => setPlayingDiseaseId(disease.id),
                          onEnd: () => setPlayingDiseaseId(null),
                          onError: () => setPlayingDiseaseId(null),
                        });
                      }
                    }}
                    className={`px-2.5 py-1 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 ${
                      playingDiseaseId === disease.id
                        ? 'bg-amber-500 text-stone-950 animate-pulse'
                        : activeLang === 'twi'
                        ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                    title={activeLang === 'twi' ? 'Listen in Ghanaian Asante Twi Voice' : 'Listen aloud'}
                  >
                    {playingDiseaseId === disease.id ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-stone-950" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{activeLang === 'twi' ? '🇬🇭 Tie Twi' : 'Listen'}</span>
                      </>
                    )}
                  </button>
                  {sampleLeaf && onSelectSampleForTest && (
                    <button
                      onClick={() => onSelectSampleForTest(sampleLeaf.id)}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Test in App</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
