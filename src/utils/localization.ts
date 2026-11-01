import { AppLanguage, CropType, DiseaseInfo, ScanResult } from '../types';

export interface LanguageInfo {
  code: AppLanguage;
  name: string;
  nativeName: string;
  flag: string;
  regionsSpoken: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English (Ghana)',
    flag: '🇬🇧',
    regionsSpoken: 'National Official / Extension Service'
  },
  {
    code: 'twi',
    name: 'Asante Twi',
    nativeName: 'Asante Twi (Akan)',
    flag: '🇬🇭',
    regionsSpoken: 'Ashanti, Eastern, Bono, Western, Central'
  },
  {
    code: 'ga',
    name: 'Ga',
    nativeName: 'Gã (Ga-Dangme)',
    flag: '🇬🇭',
    regionsSpoken: 'Greater Accra, Coastal Plains'
  },
  {
    code: 'ewe',
    name: 'Ewe',
    nativeName: 'Èʋegbe (Ewe)',
    flag: '🇬🇭',
    regionsSpoken: 'Volta & Oti Regions'
  },
  {
    code: 'dagbani',
    name: 'Dagbani',
    nativeName: 'Dagbanli',
    flag: '🇬🇭',
    regionsSpoken: 'Northern, Savannah & North East Regions'
  }
];

export const UI_TRANSLATIONS: Record<AppLanguage, Record<string, string>> = {
  en: {
    appName: 'AgriScan Ghana',
    tagline: 'On-Device Mobile AI for Farmers',
    offlineStatus: '100% OFFLINE AI',
    batteryLabel: '100%',
    timeSample: '09:41',
    navHome: 'Home',
    navScan: 'Scan Crop',
    navSprayer: 'Knapsack',
    navWeather: 'Spray Weather',
    navHistory: 'History',
    navSettings: 'Settings',
    navEPA: 'EPA Shield',
    navOutbreak: 'Outbreak Radar',
    fieldToolkitTitle: 'Ghana Smallholder Field Upgrades',
    fieldToolkitDesc: 'Agro-actionability engineered specifically for Ghanaian smallholder conditions:',
    knapsackTitle: 'Knapsack Calculator',
    knapsackSubtitle: 'Poles/Acres & tank counts',
    sprayWeatherTitle: 'Spray Weather Radar',
    sprayWeatherSubtitle: 'Ghana rain-fastness hours',
    epaTitle: 'EPA Authenticator',
    epaSubtitle: 'Anti-fake scratch code check',
    outbreakTitle: 'Outbreak Radar',
    outbreakSubtitle: 'Live MoFA biosecurity alerts',
    selectCropTitle: 'Select Target Crop (Ghana)',
    resetToAll: 'Reset to All',
    totalPathologies: '30 Pathologies',
    testSamplesTitle: 'Field Diagnostics Test Samples',
    tabClearLeaves: '🌿 Clear Leaf Photos',
    tabUnclearLeaves: '🌫️ Degraded / Glare',
    tabNonPlant: '🚫 Non-Plant Objects',
    btnTakePhoto: 'Take Field Photo',
    btnUpload: 'Upload Photo',
    btnRetake: 'Retake Photo',
    btnScanAnother: 'Scan Another Leaf',
    confidenceLabel: 'Diagnostic Confidence',
    latencyLabel: 'Edge Inference Time',
    severityLabel: 'Disease Severity',
    symptomsTitle: 'Field Symptoms Observed',
    causeTitle: 'Biological Cause & Pathogen',
    organicTitle: 'Cultural & Organic Treatment (Ghana)',
    chemicalTitle: 'EPA Ghana Approved Chemical Treatment',
    preventionTitle: 'Preventative Field Management',
    voiceListen: 'Listen to Voice Guidance',
    voicePlaying: 'Reading Diagnosis...',
    actionMixTank: 'Calculate Knapsack Mix',
    actionCheckRain: 'Check Rain-Fastness Window',
    actionVerifyChemical: 'Verify EPA Registration',
    actionShareAEA: 'Share with MoFA AEA Agent',
    historyTitle: 'Diagnostic Scan History',
    noHistory: 'No crop scans saved yet. Tap "Scan Crop" to begin.',
    clearHistory: 'Clear History',
    exportCsv: 'Export CSV for Extension',
    languageLabel: 'Farmer Language',
    confidenceThresholdLabel: 'Minimum Diagnostic Confidence Threshold',
    lowConfidenceWarning: 'Optical clarity is below threshold. Retaking photo is recommended before spraying.',
    nonPlantDetected: 'Non-crop object detected. Please point camera at a crop leaf.'
  },
  twi: {
    appName: 'AgriScan Ghana',
    tagline: 'Mfum Yareɛ Nhwehwɛmu a Ɛho Nnhia Intanɛte',
    offlineStatus: 'INTANƐTE NNHIA',
    batteryLabel: '100%',
    timeSample: '09:41',
    navHome: 'Fie',
    navScan: 'Hwehwɛ Mu',
    navSprayer: 'Knapsack',
    navWeather: 'Ewiem Tebea',
    navHistory: 'Abakɔsɛm',
    navSettings: 'Nhyehyɛeɛ',
    navEPA: 'EPA Aduru',
    navOutbreak: 'Yareɛ Trɛw',
    fieldToolkitTitle: 'Akuafo Mmoa Nnoɔma a Wɔahyehyɛ ama Ghana',
    fieldToolkitDesc: 'Mfididwuma a wɔahyehyɛ pɔtee ama Ghana akuafo asase ne nsaase:',
    knapsackTitle: 'Knapsack Nsusuho',
    knapsackSubtitle: 'Poles/Acre ne kuruwa dodoɔ',
    sprayWeatherTitle: 'Nsuotɔ ne Ewiem Hwɛ',
    sprayWeatherSubtitle: 'Mmere a aduru no nsuo renhohoro',
    epaTitle: 'EPA Aduru Nokware',
    epaSubtitle: 'Hwɛ sɛ aduru no nyɛ nkontompo',
    outbreakTitle: 'Yareɛ a Atrɛ Radar',
    outbreakSubtitle: 'MoFA kɔkɔbɔ nkratoɔ a ɛrekɔ so',
    selectCropTitle: 'Fa Wo Afifideɛ To So (Ghana)',
    resetToAll: 'Hwɛ Ne Nyinaa',
    totalPathologies: 'Yareɛ 30 Na Ɛwɔ Mu',
    testSamplesTitle: 'Afifideɛ Ahaban a Yɛde Sɔ Hwɛ',
    tabClearLeaves: '🌿 Ahaban a Ɛda Hɔ Faŋŋ',
    tabUnclearLeaves: '🌫️ Ahaban a Ɛsum wom',
    tabNonPlant: '🚫 Ɛnyɛ Afifideɛ Ahaban',
    btnTakePhoto: 'Twa Mfonin Foforɔ',
    btnUpload: 'Fa Mfonin Firi Telefon So',
    btnRetake: 'Twa Foforɔ Bio',
    btnScanAnother: 'Hwehwɛ Ahaban Foforɔ Mu',
    confidenceLabel: 'Ahotosoɔ Pɛpɛɛpɛ',
    latencyLabel: 'Mmere a Ɛde Yɛeɛ (ms)',
    severityLabel: 'Yareɛ no Kɛseɛ',
    symptomsTitle: 'Yareɛ no Nsɛnkyerɛnne a Ɛda Adi',
    causeTitle: 'Nea Ɛde Yareɛ no Ba',
    organicTitle: 'Abɔdeɛ mu Ayaresa (Neem, Nso)',
    chemicalTitle: 'EPA Ghana Aduru a Yɛgye Tom a Yɛpete',
    preventionTitle: 'Akwan a Yɛbɛfa so Asi Yareɛ no Ano Kwan',
    voiceListen: 'Tie Kasa Nkyerɛkyerɛmu',
    voicePlaying: 'Rekasa Kyerɛ Wo...',
    actionMixTank: 'Bu Knapsack Nsuo ne Aduru no',
    actionCheckRain: 'Hwɛ Nsuotɔ ne Aduru Mmere',
    actionVerifyChemical: 'Hwɛ sɛ Aduru no Firi EPA Ghana',
    actionShareAEA: 'Fa Kɔma MoFA Kuayɛ Panin (AEA)',
    historyTitle: 'Afifideɛ a Woahwehwɛ Mu Abakɔsɛm',
    noHistory: 'Wonsɔɔ afifideɛ biara nhwɛeɛ. Mia "Hwehwɛ Mu" so.',
    clearHistory: 'Pepa Ne Nyinaa',
    exportCsv: 'Yi Kyerɛwtohɔ Kɔ Kompiuta So',
    languageLabel: 'Kuafo Kasa',
    confidenceThresholdLabel: 'Ahotosoɔ a Ɛwɔ Sɛ Ɛkɔ So Pɛpɛɛpɛ',
    lowConfidenceWarning: 'Mfonin no nna hɔ yie. Yɛsrɛ wo, twa foforɔ ansa na woapete aduru.',
    nonPlantDetected: 'Ɛnyɛ afifideɛ ahaban na woatwa. Twa dua anaa ahaban ankasa.'
  },
  ga: {
    appName: 'AgriScan Ghana',
    tagline: 'Ŋmɔ Yɛlɛ Kaa Tsɔne ni Intanɛte Ko Bɛ Mli',
    offlineStatus: 'INTANƐTE BƐ MLI',
    batteryLabel: '100%',
    timeSample: '09:41',
    navHome: 'Shia',
    navScan: 'Kwɛmɔ Mli',
    navSprayer: 'Knapsack',
    navWeather: 'Jen Gbɛjianɔ',
    navHistory: 'Blema Sane',
    navSettings: 'Gbɛjianɔtooi',
    navEPA: 'EPA Tsofa',
    navOutbreak: 'Hela Gbɛɛmɔ',
    fieldToolkitTitle: 'Ghana Okwaafoi Ahe Nitsumɔ Nibii',
    fieldToolkitDesc: 'Nitsumɔ nibii ni ato kɛha Ghana shikpɔŋ nɔ okwaayeli hegbɛi:',
    knapsackTitle: 'Knapsack Akɔnta',
    knapsackSubtitle: 'Poles/Acre kɛ tsofa dodoɔ',
    sprayWeatherTitle: 'Nushinɔ kɛ Jen He Kaa',
    sprayWeatherSubtitle: 'Be ni nushinɔ efɔŋ tsofa lɛ',
    epaTitle: 'EPA Tsofa Anɔkwale',
    epaSubtitle: 'Kwɛmɔ kɛji tsofa lɛ jeee amale',
    outbreakTitle: 'Hela ni Egbɛ Eshwã',
    outbreakSubtitle: 'MoFA kɔkɔbɔɔ nkratooi kpakpai',
    selectCropTitle: 'Hala Onibii Ni Okpãa (Ghana)',
    resetToAll: 'Kwɛ Fɛɛ',
    totalPathologies: 'Hela 30 Yɔɔ Mli',
    testSamplesTitle: 'Baai Ni Akɛ Kaa Kɛha Kaa Kpakpa',
    tabClearLeaves: '🌿 Baai ni Yɔɔ Faŋŋ',
    tabUnclearLeaves: '🌫️ Baai ni Ye Duŋ',
    tabNonPlant: '🚫 Jeee Tso Baa',
    btnTakePhoto: 'Tswa Mfoniri He',
    btnUpload: 'Kɛ Mfoniri Jɛ Tsɔne Mli Ba',
    btnRetake: 'Tswa Ekroŋŋ',
    btnScanAnother: 'Kwɛ Baa Kroko Mli',
    confidenceLabel: 'Hemɔkɛyeli Kpakpa',
    latencyLabel: 'Be ni Akɛtsu Nii (ms)',
    severityLabel: 'Hela lɛ Nyagba Kɛseɛ',
    symptomsTitle: 'Hela lɛ Kadidii ni Awieɔ he',
    causeTitle: 'Nɔ ni Kɛ Hela lɛ Ba',
    organicTitle: 'Shikpɔŋ Nɔ Tsabaa (Neem, Sɔ̃)',
    chemicalTitle: 'EPA Ghana Tsofa Ni Akpɛlɔ Nɔ',
    preventionTitle: 'Gbɛjianɔtooi ni Akɛtsĩɔ Hela lɛ Naa',
    voiceListen: 'Bo Gbee Toi',
    voicePlaying: 'Emiigba Bo Nii...',
    actionMixTank: 'Bu Knapsack tsofa lɛ akɔnta',
    actionCheckRain: 'Kwɛ Nushinɔ kɛ tsofa be',
    actionVerifyChemical: 'Kwɛ kɛji tsofa lɛ jɛ EPA',
    actionShareAEA: 'Kɛtsɔɔ MoFA Okwafo Onukpa (AEA)',
    historyTitle: 'Nibii ni Okwɛ Mli Tsutsu',
    noHistory: 'Okwɛko baa ko mli kɛbashi amrɔ nɛɛ.',
    clearHistory: 'Tsumɔ Fɛɛ',
    exportCsv: 'Kɛhe Wolo (CSV)',
    languageLabel: 'Okwaafo Gbee',
    confidenceThresholdLabel: 'Hemɔkɛyeli Damɔnɔ ni Kweɔ Nɔ',
    lowConfidenceWarning: 'Mfoniri lɛ jeee faŋŋ. Tswa eko kroko kɛji obaawo tsofa.',
    nonPlantDetected: 'Jeee tso baa nɛ. Mfoniri nɛɛ jeee tso nɔ baa kpakpa.'
  },
  ewe: {
    appName: 'AgriScan Ghana',
    tagline: 'Agbledede Ƒe Dɔléle Kpɔmɔ Si Mehiã Intanɛti O',
    offlineStatus: 'INTANƐTI MEHIÃ O',
    batteryLabel: '100%',
    timeSample: '09:41',
    navHome: 'Aƒeme',
    navScan: 'Dzesi Dɔlele',
    navSprayer: 'Knapsack',
    navWeather: 'Yame Nɔnɔme',
    navHistory: 'Nusiwo Va Yi',
    navSettings: 'Ðoɖowo',
    navEPA: 'EPA Atike',
    navOutbreak: 'Dɔvɔ̃ Kaka',
    fieldToolkitTitle: 'Ghana Agbledelawo Ƒe Dɔwɔnu Kpekpeɖeŋutɔwo',
    fieldToolkitDesc: 'Dɔwɔnu siwo wowɔ ɖe Ghana ƒe anyigba kple agbledede nɔnɔmewo ta:',
    knapsackTitle: 'Knapsack Akɔntabubu',
    knapsackSubtitle: 'Poles/Acre kple atiketowo agbɔsɔsɔ',
    sprayWeatherTitle: 'Tsidzadza Kple Yame Nɔnɔme',
    sprayWeatherSubtitle: 'Ɣeyiɣi si tsi manɔ tsile atikea me o',
    epaTitle: 'EPA Atike Nyateƒe Kpɔɖeŋu',
    epaSubtitle: 'Kpɔ egbɔ be atikea menye daatike o',
    outbreakTitle: 'Dɔvɔ̃ Kaka Radar',
    outbreakSubtitle: 'MoFA agbledede ŋuti nuxlɔ̃amewo',
    selectCropTitle: 'Tia Wò Agbledenu (Ghana)',
    resetToAll: 'Kpɔ Wo Katã',
    totalPathologies: 'Dɔlele 30 Le Eme',
    testSamplesTitle: 'Aŋba Dodokpɔ Ƒe Kpɔɖeŋuwo',
    tabClearLeaves: '🌿 Aŋba Kɔkɔewo',
    tabUnclearLeaves: '🌫️ Aŋba Siwo Me Kɔ O',
    tabNonPlant: '🚫 Menye Agbledenu Aŋba O',
    btnTakePhoto: 'Ðe Foto Yeye',
    btnUpload: 'Kɔ Foto Tso Mɔ̃a Me',
    btnRetake: 'Gbugbɔ Ðe Foto',
    btnScanAnother: 'Do Aŋba Bubu Kpɔ',
    confidenceLabel: 'Kakaɖedzi Le Dodokpɔ Me',
    latencyLabel: 'Ɣeyiɣi Si Wòxɔ (ms)',
    severityLabel: 'Dɔlélea Ƒe Sesẽme',
    symptomsTitle: 'Dɔlélea Ƒe Dzesiwo Le Agble Me',
    causeTitle: 'Nu Si He Dɔlélea Vɛ',
    organicTitle: 'Dzɔdzɔme Dɔyɔnuwo (Neem, Dzofi)',
    chemicalTitle: 'EPA Ghana Agbletike Si Dzi Woɖe Mɔ Ðo',
    preventionTitle: 'Mɔ Siwo Dzi Woato Axe Mɔ Nɛ',
    voiceListen: 'Se Egbe Ƒe Mɔfianyawo',
    voicePlaying: 'Ele Nyawo Gblɔm...',
    actionMixTank: 'Bu Knapsack atike tsatsa ƒe akɔnta',
    actionCheckRain: 'Kpɔ tsidzadza ƒe ɣeyiɣiwo',
    actionVerifyChemical: 'Kpɔ egbɔ be atikea tso EPA Ghana',
    actionShareAEA: 'Tsɔe Na MoFA Agbledede Nunɔla (AEA)',
    historyTitle: 'Dodokpɔ Siwo Nèwɔ Va Yi',
    noHistory: 'Mèdo aŋba aɖeke kpɔ haɖe o. Tia "Dzesi Dɔlele" ne nàdze egɔme.',
    clearHistory: 'Tutu Wo Katã Ða',
    exportCsv: 'Kɔ Agbalẽvi (CSV) Ða',
    languageLabel: 'Agbledela Ƒe Gbegbɔgblɔ',
    confidenceThresholdLabel: 'Kakaɖedzi ƒe Didime Si Hiã',
    lowConfidenceWarning: 'Fotomɔa me kɔ nyuie o. Gbugbɔ ɖe foto bubu hafi nàwɔ atiketotɔ.',
    nonPlantDetected: 'Fotomɔ sia menye agbledenu aŋba o. Ðe agbledenu aŋba ŋutɔŋutɔ.'
  },
  dagbani: {
    appName: 'AgriScan Ghana',
    tagline: 'Kparilim Dori Zahimbu din bi bɔri Intanɛti',
    offlineStatus: 'INTANƐTI KA DI PUUNI',
    batteryLabel: '100%',
    timeSample: '09:41',
    navHome: 'Yili',
    navScan: 'Zahim Dori',
    navSprayer: 'Knapsack',
    navWeather: 'Sagbaŋ Teei',
    navHistory: 'Din Gari',
    navSettings: 'Zalisi',
    navEPA: 'EPA Tima',
    navOutbreak: 'Doro Yɛligu',
    fieldToolkitTitle: 'Ghana Pukpariba Tuma Neen-yara',
    fieldToolkitDesc: 'Neen-yara din mali tabata ni Ghana tiŋgbani kparilim yɛlimuɣisira:',
    knapsackTitle: 'Knapsack Kurugu Akawunta',
    knapsackSubtitle: 'Poles/Acre mini tima fihibu galisim',
    sprayWeatherTitle: 'Saa Mibu mini Sagbaŋ Kpambaligu',
    sprayWeatherSubtitle: 'Saha din ku chɛ ka saa paɣi tima maa',
    epaTitle: 'EPA Tima Chiikaa',
    epaSubtitle: 'Zahim nya a tima maa shiri yila EPA',
    outbreakTitle: 'Doro Yɛligu Radar',
    outbreakSubtitle: 'MoFA pukparilim lahibali tibli',
    selectCropTitle: 'Piigi A Pukparilim Bindirigu (Ghana)',
    resetToAll: 'Lihi Zaasa',
    totalPathologies: 'Doriti 30 N-be Di Puuni',
    testSamplesTitle: 'Vari Din Zahindi Doriti',
    tabClearLeaves: '🌿 Vari Din Ne Vɛnyelinga',
    tabUnclearLeaves: '🌫️ Vari Din Zimsa',
    tabNonPlant: '🚫 Pala Pukparilim Vabili',
    btnTakePhoto: 'Gbaagi Anfooni Palli',
    btnUpload: 'Zaŋ Anfooni din be fooni kpɛhi',
    btnRetake: 'Labisi Gbaagi Anfooni',
    btnScanAnother: 'Zahim Vabili Shɛli Palli',
    confidenceLabel: 'Yɛlimaŋli Zaŋkpa Zahimbu',
    latencyLabel: 'Saha din Di (ms)',
    severityLabel: 'Doro maa Kpɛŋ',
    symptomsTitle: 'Doro maa Dahi Puu Puuni',
    causeTitle: 'Din Tahi Doro Maa Na',
    organicTitle: 'Tihi Tima (Neem, Tampie)',
    chemicalTitle: 'EPA Ghana Pukparilim Tima Saɣisigu',
    preventionTitle: 'Soya Din Taɣiri Doro Maa',
    voiceListen: 'Wum Kumsi Wuhibu',
    voicePlaying: 'Di kɔli lahibali wuhira...',
    actionMixTank: 'Karim Knapsack tima fihibu',
    actionCheckRain: 'Lihi saa mibu saha zaŋti tima',
    actionVerifyChemical: 'Dihi tabili ni tima maa yila EPA',
    actionShareAEA: 'Zaŋ wuhi MoFA Kparilim Kpambaliga (AEA)',
    historyTitle: 'Doriti Din Pun Zahim',
    noHistory: 'A na bi zahim bindirigu vabili shɛli. Dihim "Zahim Dori" n-piili.',
    clearHistory: 'Nyɛhi Zaasa',
    exportCsv: 'Kpihim Gbaŋ (CSV)',
    languageLabel: 'Pukpara Balli',
    confidenceThresholdLabel: 'Yɛlimaŋli din gbaai zahimbu',
    lowConfidenceWarning: 'Anfooni maa bi ne vɛnyelinga. Labisi gbaagi palli pɔi ka a naayi fihim tima.',
    nonPlantDetected: 'Anfooni ŋɔ pala bindirigu vabili. Zaŋ gbaagi a pukparilim vabili.'
  }
};

// Localized Disease Translation Registry (Twi, Ga, Ewe, Dagbani)
export interface LocalizedDiseaseInfo {
  localName: string;
  localSymptoms: string[];
  localCause: string;
  localOrganicTreatment: string[];
  localChemicalTreatment: string;
  localPrevention: string[];
  speechSummary: string;
}

export const DISEASE_LOCALIZATIONS: Record<string, Record<AppLanguage, LocalizedDiseaseInfo>> = {
  maize_blight: {
    en: {
      localName: 'Northern Corn Leaf Blight',
      localSymptoms: ['Long elliptical grayish lesions on leaves', 'Leaves dry up prematurely from bottom up'],
      localCause: 'Exserohilum turcicum fungus spread by wind and humid dew.',
      localOrganicTreatment: ['Prune and burn lower infected leaves immediately.', 'Spray neem oil emulsion (50ml neem oil per 15L knapsack).'],
      localChemicalTreatment: 'Apply Mancozeb 80% WP (Ivory 80 WP) at 50g-60g per 15L knapsack sprayer.',
      localPrevention: ['Plant MoFA certified resistant maize hybrid varieties (Omankwa, Abontem).', 'Rotate crops with legumes.'],
      speechSummary: 'AgriScan diagnosis for Maize: Northern Corn Leaf Blight detected. Remove lower infected leaves and spray neem oil or Mancozeb fungicide before heavy rains.'
    },
    twi: {
      localName: 'Aburo Ahaban Yareɛ (Blight)',
      localSymptoms: ['Nsunsunsoo mfuturo kɔkɔɔ tenten gu ahaban no so', 'Ahaban no guan wuo firi fam rekɔ soro'],
      localCause: 'Mmoawa a wɔfiri mframa ne ewiem nsuo a ɛtɔ ahaban so mu.',
      localOrganicTreatment: ['Twa ahaban a ayare no hyew wɔ gya mu.', 'Fa neem ahaban nsuo anaa neem ngo pete ahaban no so nnanson biara.'],
      localChemicalTreatment: 'Fa Mancozeb 80 WP (Ivory 80) matchbox scoops mmienu ne fa (50g) gu knapsack lita 15 mu.',
      localPrevention: ['Dua aburo aba pa a MoFA gye tom te sɛ Omankwa anaa Abontem.', 'Sesa nnoɔma a wodua wɔ mfuw no mu.'],
      speechSummary: 'AgriScan nhwehwɛmu wɔ Aburo so: Yareɛ a ɛwɔ wo ahaban so ne Aburo Ahaban Yareɛ. Twitwa ahaban a ayare no na hyew wɔ gya mu. Fa neem ngo anaa Ivory aduru pete so pɛpɛɛpɛ.'
    },
    ga: {
      localName: 'Ablɛ Ba Yɛlɛ (Blight)',
      localSymptoms: ['Kadidii kɔkɔji kɛ kɛji gbɛɛ baai lɛ anɔ', 'Baai lɛ gbiɔ kɛjɛɔ shishi kɛyaa ŋwɛi'],
      localCause: 'Mɔɔmɔɔ hela ni kɔɔyɔɔ kɛ nudaa lɛ kɛbaa.',
      localOrganicTreatment: ['Folɔ baai ni ehiii lɛ kɛya la mli amrɔ nɔŋŋ.', 'Fĩ neem nu anɔ baai lɛ anɔ daa otsi.'],
      localChemicalTreatment: 'Kɛ Mancozeb 80 WP tsofa sɔmɔɔ 50g wo knapsack lita 15 mli.',
      localPrevention: ['Dua abele kpakpa ni MoFA eŋmɛ gbɛ tamɔ Omankwa kɛ Abontem.', 'Tsake nibii ni oduɔ yɛ ŋmɔ lɛ mli.'],
      speechSummary: 'AgriScan helemɔ kɛha Ablɛ: Ablɛ Ba Yɛlɛ nɛ. Folɔ baai ni bɔhela lɛ kɛya la mli. Kɛ neem nu aloo Mancozeb tsofa awo mli amrɔ.'
    },
    ewe: {
      localName: 'Bli Gbe Dɔléle (Leaf Blight)',
      localSymptoms: ['Dzesi dzĩ kple zɔzɔwo dze bli aŋbawo dzi', 'Aŋbawo tsina kple kuku tso gɔme yi etame'],
      localCause: 'Fungus dɔléle tso yaƒoƒo kple tsidzadza me.',
      localOrganicTreatment: ['Lã aŋba siwo ŋu dɔlele le eye nàtɔ dzo wo.', 'Si neem ami ɖe aŋbawo dzi kwasiɖa sia kwasiɖa.'],
      localChemicalTreatment: 'Zã Mancozeb 80 WP atike (Ivory 80 WP) gram 50 ɖe knapsack lita 15 me.',
      localPrevention: ['Ðo bli ku nyuiwo si MoFA da asi ɖe edzi abe Omankwa alo Abontem ene.', 'Trɔ agbledenuwo le ƒe sia ƒe me.'],
      speechSummary: 'AgriScan dodokpɔ na Bli: Bli Gbe Dɔléle le bli aŋbaa ŋu. Ðe aŋba gbegblẽawo da eye nàsi neem ami alo Mancozeb agbletike ɖe edzi kaba.'
    },
    dagbani: {
      localName: 'Kariwana Vari Doro (Blight)',
      localSymptoms: ['Dahi din waɣa ka ʒie n-guui vari maa zuɣu', 'Vari maa kpiiri n-yiri gbinni n-doli zuɣusaa'],
      localCause: 'Doro din yiri pɔhim mini saa mibu ni.',
      localOrganicTreatment: ['Ʋu vari din gbaagi doro maa ka ŋme di buɣum.', 'Fihim neem kpam n-niŋ vari maa zuɣu bakoi kam.'],
      localChemicalTreatment: 'Zaŋ Mancozeb 80 WP tima (Ivory 80) giram 50 n-niŋ knapsack lita 15 kurugu puuni.',
      localPrevention: ['Bɔmi kariwana bimbila kashi shɛli MoFA ni saɣi ti kamani Omankwa.', 'Taɣimi bindira din bori a puu puuni.'],
      speechSummary: 'AgriScan zahimbu zaŋti Kariwana: Kariwana Vari Doro n-gbaagi a kariwana. Ʋu vari din gbaagi doro maa n-nyɔ buɣum. Zaŋ neem kpam bee Mancozeb tima n-fihim di zuɣu.'
    }
  },

  maize_rust: {
    en: {
      localName: 'Common Maize Rust',
      localSymptoms: ['Golden-brown to cinnamon powdery pustules on both leaf surfaces', 'Leaves turn yellow and dry up'],
      localCause: 'Puccinia sorghi fungus spread by continental wind currents in humid conditions.',
      localOrganicTreatment: ['Dust sifted wood ash early in the morning on dewy leaves.', 'Spray diluted garlic-ginger extract.'],
      localChemicalTreatment: 'Spray Mancozeb 80 WP or Tebuconazole 250 EC at 50g or 20ml per 15L knapsack tank.',
      localPrevention: ['Plant early with the first reliable rains.', 'Ensure adequate plant spacing for aeration.'],
      speechSummary: 'AgriScan diagnosis for Maize: Common Rust detected. Dust wood ash on wet morning leaves or apply approved Mancozeb fungicide.'
    },
    twi: {
      localName: 'Aburo Nkokorɔ Yareɛ (Rust)',
      localSymptoms: ['Mfuturo kɔkɔɔ te sɛ dade nna gu ahaban no so pii', 'Ahaban no dan akokɔsradeɛ na awuo'],
      localCause: 'Mmoawa a wɔnam mframa so ba wɔ berɛ a awɔsereɛ pii wɔ ewiem.',
      localOrganicTreatment: ['Petenso mapa gu ahaban a anɔpa bosuo wɔ so no so.', 'Fa gyene ne akakaduro a woanyam pete so.'],
      localChemicalTreatment: 'Fa Mancozeb 80 WP 50g gu knapsack nsuo lita 15 mu pete so ntɛm.',
      localPrevention: ['Dua ntɛm berɛ a nsuo no firi aseɛ tɔ.', 'Gyae mfuw no kwan na mframa ntumi mmɔ mu yie.'],
      speechSummary: 'AgriScan nhwehwɛmu wɔ Aburo so: Aburo Nkokorɔ Yareɛ na ɛwɔ so. Gu nso mapa gu anɔpa bosuo ahaban so anaa fa Mancozeb aduru pete so.'
    },
    ga: {
      localName: 'Ablɛ Tsuru Yɛlɛ (Rust)',
      localSymptoms: ['Mfuturo tsuru tamɔ tɛ tsɛmɔ yɛ baai lɛ anɔ', 'Baai lɛ tsɔɔ yɛlɔ kɛ gbiɔ'],
      localCause: 'Mɔɔmɔɔ ni jɛɔ kɔɔyɔɔ mli kɛbaa.',
      localOrganicTreatment: ['Kɛ sɔ̃ fĩ baai ni yɔɔ nushinɔ leeleekpa lɛ anɔ.', 'Kɛ sabola kɛ kakadurulo nu wo nɔ.'],
      localChemicalTreatment: 'Kɛ Mancozeb 80 WP gram 50 wo knapsack lita 15 mli.',
      localPrevention: ['Dua amrɔ nɔŋŋ ni nugbɔ lɛ dze shishi.', 'Hã tsei lɛ agbɛ fã bɔni kɔɔyɔɔ baanya mli.'],
      speechSummary: 'AgriScan helemɔ kɛha Ablɛ: Ablɛ Tsuru Yɛlɛ nɛ. Kɛ sɔ̃ fĩ nɔ leeleekpa aloo kɛ Mancozeb tsofa awo mli.'
    },
    ewe: {
      localName: 'Bli Dzĩ Dɔléle (Common Rust)',
      localSymptoms: ['Ʋuʋudedi dzĩ le aŋbaa ŋu abe gayibɔ ƒe ʋuʋu ene', 'Aŋbawo trɔna dzĩ hekuna'],
      localCause: 'Fungus dɔléle tso yaƒoƒo kple yame ƒe fafe me.',
      localOrganicTreatment: ['Kɔ dzofi sesĩe ɖe aŋba siwo dzi zãdzo le ŋdi kanya.', 'Zã ahotike kple ayitike atsɔ awo dɔyɔna.'],
      localChemicalTreatment: 'Zã Mancozeb 80 WP gram 50 ɖe knapsack lita 15 me.',
      localPrevention: ['Ðo bli kabakaba le tsidzadza gbãtɔ me.', 'Na vovo nanɔ agbledenuwo dome nyuie.'],
      speechSummary: 'AgriScan dodokpɔ na Bli: Bli Dzĩ Dɔléle dze wò bli aŋbaa dzi. Kɔ dzofi ɖe aŋbawo dzi ŋdi alo zã Mancozeb agbletike.'
    },
    dagbani: {
      localName: 'Kariwana Ʒie Doro (Rust)',
      localSymptoms: ['Tampuli ʒee n-be vari maa zuɣu kamani kurugu nyɔɣu', 'Vari maa kɔŋdi vɛlima ka kpiiri'],
      localCause: 'Doro din yiri kɔɔyɔɔ pɔhim din tiri masim ni.',
      localOrganicTreatment: ['Fihim tampie n-niŋ vari din mali asiba masim zuɣu.', 'Zaŋ alubasa mini yoman-niɣi tima fihim di zuɣu.'],
      localChemicalTreatment: 'Zaŋ Mancozeb 80 WP giram 50 n-niŋ knapsack lita 15 puuni.',
      localPrevention: ['Kurimi kariwana yomyom saa piliibu saha.', 'Chɛli luɣili kariwana sunsuuni ka pɔhim kpɛra.'],
      speechSummary: 'AgriScan zahimbu zaŋti Kariwana: Kariwana Ʒie Doro n-gbaagi li. Fihim tampie asiba masim zuɣu bee n-zaŋ Mancozeb tima fihim di zuɣu.'
    }
  },

  cassava_mosaic: {
    en: {
      localName: 'Cassava Mosaic Disease (CMD)',
      localSymptoms: ['Severe yellow and green mosaic mottling on leaves', 'Distorted, crinkled, and stunted leaves reducing tuber yield'],
      localCause: 'African Cassava Mosaic Geminivirus transmitted by whiteflies (Bemisia tabaci) and infected stem cuttings.',
      localOrganicTreatment: ['Uproot and burn infected plants immediately (rouging).', 'Control whiteflies using neem seed extract spray.'],
      localChemicalTreatment: 'No chemical cures viral infections. Control insect vectors with Acetamiprid (20g/15L knapsack).',
      localPrevention: ['Use only MoFA CSIR-CRI certified mosaic-resistant cuttings (Ampong, Broni Bankye, Sika Bankye).', 'Never propagate from deformed stems.'],
      speechSummary: 'AgriScan diagnosis for Cassava: Cassava Mosaic Virus detected. Uproot and burn infected plants completely. Only plant certified resistant varieties like Ampong or Sika Bankye.'
    },
    twi: {
      localName: 'Bankye Ahaban Nwono (Mosaic)',
      localSymptoms: ['Ahaban no ayɛ nkonsonkonson kɔkɔɔ ne bruu', 'Ahaban no abubu akyinkyim na bankye no nyɛ kɛseɛ'],
      localCause: 'Virus yareɛ a ntontom fitaa (whitefly) ne bankye dua a ayare de ba.',
      localOrganicTreatment: ['Tutu bankye a ayare no nyinaa firi fam hyew no ntɛm ara.', 'Fa neem nsuo pete ntontom fitaa no so na wɔmmɛsɛe nnoɔma.'],
      localChemicalTreatment: 'Aduru biara nni hɔ a ɛtumi sa saa virus yareɛ yi. Pete Acetamiprid de kunkum mmoawa no.',
      localPrevention: ['Dua bankye a MoFA agye atom te sɛ Ampong, Broni Bankye, anaa Sika Bankye.', 'Mfa bankye dua a ayare nnyina bio.'],
      speechSummary: 'AgriScan nhwehwɛmu wɔ Bankye so: Bankye Ahaban Nwono yareɛ na ɛwɔ so. Tutu bankye a ayare no nyinaa hyew. Dua bankye papa te sɛ Ampong anaa Sika Bankye nko ara.'
    },
    ga: {
      localName: 'Duade Ba Hela (Mosaic)',
      localSymptoms: ['Baai lɛ etsɔ kɔkɔɔ kɛ yɛlɔ mli', 'Baai lɛ ekuu eku kaŋŋ ni duade lɛ woko'],
      localCause: 'Virus hela ni lɔŋlɔŋ yɛji (whiteflies) kɛ duade tso ni bɔ hela lɛ kɛbaa.',
      localOrganicTreatment: ['Shia duade ni ehiii lɛ fɛɛ kɛya la mli amrɔ nɔŋŋ.', 'Kɛ neem tso nu fĩ lɔŋlɔŋ yɛji lɛ anɔ.'],
      localChemicalTreatment: 'Tsofa ko bɛ ni tsaa virus nɛɛ. Kɛ Acetamiprid awo mli kɛ gbe lɔŋlɔŋ yɛji lɛ.',
      localPrevention: ['Dua duade tsei kpakpai tamɔ Ampong kɛ Sika Bankye.', 'Kaadua duade tso ni bɔ hela ekoŋŋ.'],
      speechSummary: 'AgriScan helemɔ kɛha Duade: Duade Ba Hela nɛ. Shia duade ni ehe hela lɛ fɛɛ kɛya la mli. Dua tsei kpakpai tamɔ Ampong pɛ.'
    },
    ewe: {
      localName: 'Agbeli Aŋba Dɔléle (Mosaic Virus)',
      localSymptoms: ['Aŋbawo trɔ zu aŋɔ kple yibɔ tɔtɔtɔ', 'Aŋbawo xatana heblona eye agbelia meɖana o'],
      localCause: 'Virus dɔléle tso tagbatsu ɣiwo kple agbeliti siwo ŋu dɔlele le me.',
      localOrganicTreatment: ['Ho agbeli dɔlélatɔawo katã kaba eye nàtɔ dzo wo.', 'Zã neem ami atsɔ anya tagbatsu ɣiwo da.'],
      localChemicalTreatment: 'Atike aɖeke meli si daa virus dɔléle o. Zã Acetamiprid atsɔ awu nudzodzoeawo.',
      localPrevention: ['Ðo agbeliti nyui siwo ŋu dɔlélea mete ŋu gena o abe Ampong alo Sika Bankye ene.', 'Mègazã agbeliti gbegblẽ o.'],
      speechSummary: 'AgriScan dodokpɔ na Agbeli: Agbeli Aŋba Dɔléle nɛ. Ho agbeli dɔlélatɔawo katã tɔ dzo wo. Ðo agbeliti kpakpawo abe Ampong ene ko.'
    },
    dagbani: {
      localName: 'Bankye Vari Doro (Mosaic Virus)',
      localSymptoms: ['Vari maa zɔligira n-lee dozim mini vɛkpiɛlim tɔŋtɔŋ', 'Vari maa kpiɛrila gbaŋgbam ka bankye maa bi nyɛra'],
      localCause: 'Doro din yiri kpatinariga zaɣi piɛlli mini bankye daŋ din gbaagi doro puuni.',
      localOrganicTreatment: ['Ʋu bankye din gbaagi doro maa zaasa n-nyɔ buɣum amrɔ.', 'Fihim neem kpam n-kari kpatinariga piɛla maa.'],
      localChemicalTreatment: 'Tima kani tibiri doro ŋɔ zaa. Zaŋ Acetamiprid n-kpaŋsi binnɛma maa kuku.',
      localPrevention: ['Dali bankye dandaŋ kashi shɛŋa MoFA ni saɣi ti kamani Ampong mini Sika Bankye.', 'Miri ka a zaŋ dandaŋ shɛli din doro be n-kpa.'],
      speechSummary: 'AgriScan zahimbu zaŋti Bankye: Bankye Vari Doro n-gbaagi li. Ʋu bankye dɔlélatɔawo zaasa nyɔ buɣum. Kpami bankye dandaŋ shɛŋa din kpaŋ kamani Ampong bee Sika Bankye.'
    }
  },

  tomato_early_blight: {
    en: {
      localName: 'Tomato Early Blight',
      localSymptoms: ['Concentric dark brown rings (target-board lesions) on older leaves', 'Yellow halos around spots, leaves wither and drop'],
      localCause: 'Alternaria solani fungus surviving in soil and crop debris, favored by warm, humid rainy seasons.',
      localOrganicTreatment: ['Mulch base of tomato plants with clean dry straw to stop rain splashing spores.', 'Apply baking soda spray or copper soap solution.'],
      localChemicalTreatment: 'Spray Mancozeb 80 WP (50g/15L knapsack) or Chlorothalonil 720 SC (30ml/15L knapsack) on 7-10 day cycle.',
      localPrevention: ['Staking tomato plants off the ground for better aeration.', '3-year rotation away from pepper and eggplant.'],
      speechSummary: 'AgriScan diagnosis for Tomato: Early Blight detected. Mulch soil to prevent rain splash, prune infected bottom leaves, and apply Mancozeb fungicide.'
    },
    twi: {
      localName: 'Ntoosi Ahaban Akokɔsradeɛ (Early Blight)',
      localSymptoms: ['Akontobuo mfuturo tuntum gu ntoosi ahaban dedaw so', 'Ahaban no dan akokɔsradeɛ na atɔ fam'],
      localCause: 'Mmoawa a wɔte dɔteɛ mu a nsuo tɔ a ɛhuru gu ahaban no so.',
      localOrganicTreatment: ['Fa srɛ wura fitaa gu ntoosi no ase na nsuo antumi ampopro fam dɔteɛ amfom ahaban no.', 'Twa ahaban a ayare no gu.'],
      localChemicalTreatment: 'Fa Mancozeb 80 WP (Ivory 80 WP) 50g gu knapsack nsuo lita 15 mu pete so nnanwɔtwe biara.',
      localPrevention: ['Kyekyere ntoosi no fam dua so na anyin kɔ soro.', 'Sesa kuayɛ na mfa mako anaa ntoosi nsi faako pɔtee afe mmiɛnsa.'],
      speechSummary: 'AgriScan nhwehwɛmu wɔ Ntoosi so: Ntoosi Ahaban Akokɔsradeɛ yareɛ na ɛwɔ so. Kata aseɛ no so na twa ahaban a ayare no gu. Fa Mancozeb aduru pete so nnanson nnanson.'
    },
    ga: {
      localName: 'Amɛdromi Ba Yɛlɛ (Early Blight)',
      localSymptoms: ['Kadidii yiiyiii bibii yɛ amɛdromi baai momoi lɛ anɔ', 'Baai lɛ feɔ yɛlɔ ni amɛgbiɔ'],
      localCause: 'Mɔɔmɔɔ hela ni yɔɔ zɔŋ zɔŋ ni nugbɔ hoholɔ tswa kɛba baai lɛ anɔ.',
      localOrganicTreatment: ['Kɛ ŋmɔtsa kã amɛdromi shishi koni nugbɔ kaatswa zɔŋ zɔŋ efĩ nɔ.', 'Folɔ baai ni ehiii lɛ kɛje mli.'],
      localChemicalTreatment: 'Kɛ Mancozeb 80 WP gram 50 wo knapsack lita 15 mli.',
      localPrevention: ['Fĩ amɛdromi lɛ kɛ tsei kɛya ŋwɛi bɔni kɔɔyɔɔ baatsɔ mli.', 'Kaadua sabiloo kɛ amɛdromi he kome daa afe.'],
      speechSummary: 'AgriScan helemɔ kɛha Amɛdromi: Amɛdromi Ba Yɛlɛ nɛ. Folɔ baai ni ehiii lɛ kɛya la mli. Kɛ Mancozeb tsofa awo mli otsi fɛɛ otsi.'
    },
    ewe: {
      localName: 'Timati Aŋba Dɔléle (Early Blight)',
      localSymptoms: ['Dzesi tɔtɔtɔ yibɔwo le timati aŋba xoxoawo dzi', 'Aŋbawo trɔna dzĩ hetsina duna nyigba'],
      localCause: 'Fungus dɔléle tso anyigba kple tsidzadza me.',
      localOrganicTreatment: ['Tsɔ gbe ƒuƒuwo ka ɖe timatia gɔme bene tsi magba anyigba ɖe aŋbawo dzi o.', 'Lã aŋba siwo ŋu dɔlele le da.'],
      localChemicalTreatment: 'Zã Mancozeb 80 WP gram 50 ɖe knapsack lita 15 me kwasiɖa sia kwasiɖa.',
      localPrevention: ['Bla timatiawo ɖe atiwo ŋu bene ya nanɔ ƒoƒom nyuie.', 'Trɔ agblea ƒe nukuwo le ƒe etɔ̃ me.'],
      speechSummary: 'AgriScan dodokpɔ na Timati: Timati Aŋba Dɔléle le aŋbaa ŋu. Bla timatia ɖe ati ŋu eye nàzã Mancozeb agbletike kwasiɖa sia kwasiɖa.'
    },
    dagbani: {
      localName: 'Kamantoonsi Vari Doro (Early Blight)',
      localSymptoms: ['Dahi din liri m-gindi kamantoonsi vari kurili zuɣu', 'Vari maa kɔŋdi vɛlima ka kpiiri n-lu tiŋgbani'],
      localCause: 'Doro din yiri tiŋgbani tampuɣili ni saa mibu saha.',
      localOrganicTreatment: ['Zaŋ mɔkuɣu n-liri kamantoonsi maa gbinni ka saa ku chɛ ka tiŋgbani nyɛɣisi li.', 'Ʋu vari din gbaagi doro maa.'],
      localChemicalTreatment: 'Zaŋ Mancozeb 80 WP giram 50 n-niŋ knapsack lita 15 puuni bakoi kam.',
      localPrevention: ['Lobilimi kamantoonsi maa tihi zuɣu ka pɔhim nyɛ soli kpɛra.', 'Taɣimi bindira a puu puuni yuuni kam.'],
      speechSummary: 'AgriScan zahimbu zaŋti Kamantoonsi: Kamantoonsi Vari Doro n-gbaagi li. Lirimi di gbinni ka fihim Mancozeb tima di zuɣu bakoi kam.'
    }
  },

  cocoa_black_pod: {
    en: {
      localName: 'Cocoa Black Pod Disease',
      localSymptoms: ['Rapidly spreading dark brown to black rot on cocoa pods', 'Foul odor, white fungal mycelia on pods during rainy spells'],
      localCause: 'Phytophthora megakarya and P. palmivora oomycetes spread by rain splash and ants.',
      localOrganicTreatment: ['Harvest ripe and diseased pods every 5-7 days (sanitary harvesting).', 'Prune canopy and chupons for sunlight penetration.'],
      localChemicalTreatment: 'Spray Copper Hydroxide (Kocide 2000) or Metalaxyl + Cuprous oxide (Ridomil Gold) at 50g/15L knapsack.',
      localPrevention: ['Maintain clean plantation drainage to eliminate standing puddles.', 'Shade management to reduce humidity.'],
      speechSummary: 'AgriScan diagnosis for Cocoa: Black Pod Disease detected. Harvest and bury infected pods immediately, open shade canopy, and apply Ridomil Gold fungicide.'
    },
    twi: {
      localName: 'Kookoo Pɔpɔ (Black Pod Disease)',
      localSymptoms: ['Kookoo kɔba no dan tuntum pasaa ntɛm ara na apɔre', 'Kookoo no mu bɔn bɔne wɔ berɛ a nsuo tɔ pii no'],
      localCause: 'Mmoawa a nsuotɔ kɛseɛ ne sum a ɛda kookoo mfuw mu de ba.',
      localOrganicTreatment: ['Tete kookoo a ayare no nyinaa daa nnanson na sie no fam akyirikyiri.', 'Twitwa mman mfifideɛ a ɛmma owia mmɔ mfuw no mu.'],
      localChemicalTreatment: 'Fa Ridomil Gold anaa Kocide 50g gu knapsack nsuo lita 15 mu pete kookoo kɔba no so pɛpɛɛpɛ.',
      localPrevention: ['Hwɛ ma nsuo ammu gu kookoo no ase.', 'Te mfikyiridua ase ma owia mpue nhyɛ mu.'],
      speechSummary: 'AgriScan nhwehwɛmu wɔ Kookoo so: Kookoo Pɔpɔ yareɛ na ɛwɔ so. Tetew kookoo a apɔre no sie fam, twitwa mman mfifideɛ ma owia mmɔ mu na fa Ridomil Gold pete so.'
    },
    ga: {
      localName: 'Kookoo Din Hela (Black Pod)',
      localSymptoms: ['Kookoo tsei lɛ anɔ nibii lɛ tsɔɔ diŋŋ kɛ fiteɔ amrɔ nɔŋŋ', 'Nibii lɛ jeɔ fu kɛji nugbɔ enɛ'],
      localCause: 'Mɔɔmɔɔ ni nushinɔ kɛ duŋŋ yɛ kookoo ŋmɔ mli lɛ kɛbaa.',
      localOrganicTreatment: ['Tsi kookoo nibii ni efite lɛ kɛje tso lɛ nɔ daa otsi.', 'Folɔ tsei anijii lɛ bɔni hulu baashɛ mli.'],
      localChemicalTreatment: 'Kɛ Ridomil Gold gram 50 wo knapsack lita 15 mli kɛwo nibii lɛ anɔ.',
      localPrevention: ['Ha nushinɔ agbɛ afã kɛje kookoo shishi.', 'Tsumɔ ŋmɔ lɛ mli bɔni hulu aaatso kpakpa.'],
      speechSummary: 'AgriScan helemɔ kɛha Kookoo: Kookoo Din Hela nɛ. Folɔ kookoo ni efite lɛ sie shikpɔŋ mli. Folɔ tsei koni hulu ashɛ mli ni okɛ Ridomil Gold awo nɔ.'
    },
    ewe: {
      localName: 'Koko Aŋɔ Dzĩ Dɔléle (Black Pod)',
      localSymptoms: ['Koko kutsetsewo trɔna yibɔ henya kaba', 'Kutsetsewo ʋena le tsidzadza ɣeyiɣiwo me'],
      localCause: 'Phytophthora fungus tso tsidzadza kple vɔvɔli geɖe me.',
      localOrganicTreatment: ['Lã koko kutsetse dɔlélatɔawo ɖa kwasiɖa sia kwasiɖa eye nàɖi wo ɖe anyigba.', 'Lã alɔgɔtiwo bene ɣetoɖoƒe nanɔ agblea me.'],
      localChemicalTreatment: 'Zã Ridomil Gold alo Kocide gram 50 ɖe knapsack lita 15 me.',
      localPrevention: ['Ðɔ tsisinawo ɖo bene tsi manɔ tsitre ɖe agblea me o.', 'Ðe vɔvɔliawo dzi kpɔtɔ.'],
      speechSummary: 'AgriScan dodokpɔ na Koko: Koko Black Pod dɔléle dze koko kutsetsea dzi. Ði kutsetse gbegblẽawo ɖe anyigba, lã alɔgɔtiwo bene ɣe naƒo agblea me eye nàzã Ridomil Gold agbletike.'
    },
    dagbani: {
      localName: 'Kookoo Sabinli Doro (Black Pod)',
      localSymptoms: ['Kookoo yila n-lee sabinli n-saɣim yomyom', 'Di nyɛrila nyoodi saa mibu saha'],
      localCause: 'Doro din yiri saa mibu kpam mini masim kpɛŋ puuni.',
      localOrganicTreatment: ['Ʋu kookoo din saɣiim maa zaasa bakoi kam n-sim tiŋgbani puuni.', 'Ʋu tihi wula ka wuntaŋ nyɛ soli n-gbaa puu maa.'],
      localChemicalTreatment: 'Zaŋ Ridomil Gold giram 50 n-niŋ knapsack lita 15 puuni n-fihim di zuɣu.',
      localPrevention: ['Mali soli ka saa koom ku beni kookoo maa gbinni.', 'Baligimi masim puu puuni.'],
      speechSummary: 'AgriScan zahimbu zaŋti Kookoo: Kookoo Sabinli Doro n-gbaagi a kookoo yila. Simi din saɣiim maa tiŋgbani ni, baligimi masim ka wuntaŋ kpɛ puu maa, ka fihim Ridomil Gold tima di zuɣu.'
    }
  }
};

// Fallback generic localized dictionary for other diseases in database
export function getLocalizedDiseaseContent(
  disease: DiseaseInfo,
  lang: AppLanguage
): LocalizedDiseaseInfo {
  const specific = DISEASE_LOCALIZATIONS[disease.id]?.[lang];
  if (specific) {
    return specific;
  }

  const isHealthy = disease.pathogenType === 'Healthy' || disease.id.includes('healthy');

  // HEALTHY CROP LOCALIZATIONS (Specialized celebratory and money-saving guidance)
  if (isHealthy) {
    if (lang === 'twi') {
      return {
        localName: disease.localNameTwi || `${disease.crop} Ahaban Bɔkɔɔ (Ahaban Pa)`,
        localSymptoms: [
          'Ahaban mono fɛfɛɛfɛ a yareɛ anaa nkekae biara nni so',
          'Ntini mu denhyɛ a mmoawa bɔne biara nsaa mu',
          'Nsɛnkyerɛnne bɔne anaa nsɔrebɔ biara nni ahaban no ho'
        ],
        localCause: 'Asase pa, aduane pa, nsuo a ɛfata, ne awia pɛpɛɛpɛ a afifideɛ no anya.',
        localOrganicTreatment: [
          'Kɔ so dɔ w’afifideɛ ho na kata asase so kora nsuo mu.',
          'Gu compost anaa aboa bin a anyini yie de ahyɛ afifideɛ no den.'
        ],
        localChemicalTreatment: 'ADURU BIARA ENHIA (KORA WO SIKA SO): Afifideɛ yi yɛ ahoɔdenfoɔ koraa. Ɛnsɛ koraa sɛ wotɔ fungicide anaa aduru foforɔ gu so. Sika a wobɛsɛe no de atɔ aduru gu so no yɛ sika sɛeɛ hunu.',
        localPrevention: [
          'Kɔ so hwɛ afifideɛ no so daa na fa fertilizer gu aseɛ pɛpɛɛpɛ.',
          'Sɔre ntɛm yi nwura fi ho na ma mframa ntu mfa mu yie.'
        ],
        speechSummary: `AgriScan nhwehwɛmu pa: Asɛmpa! Wo ${disease.crop} ahaban no yɛ ahoɔdenfoɔ koraa a yareɛ biara nni so. Ɛnhia sɛ wotɔ aduru biara anaa wopete aduru gu so. Kora wo sika so na kɔ so hwɛ wo kuayɛ so yie.`
      };
    }

    if (lang === 'ga') {
      return {
        localName: disease.localNameGa || `${disease.crop} Ba Kpakpa`,
        localSymptoms: [
          'Baa lɛ yɛ kpakpa ni baai lɛ amli tsurɔɔ jogbaŋŋ',
          'Tsofa nɛɛ bɛ yɛlɛ kooraa ni bɔɔ mli lelemɔ ko bɛ he',
          'Mmoawa helemɔ ko bɛ he ni baa lɛ efiteee'
        ],
        localCause: 'Shikpɔŋ kpakpa, nu babaoo, kɛ hulu mli ŋwɛi.',
        localOrganicTreatment: [
          'Ya nɔ okwɛ shikpɔŋ lɛ nɔ jogbaŋŋ ni ofĩ shĩashĩe kɛha nu.',
          'Kɛ kooloo gbonyo nilee wo shikpɔŋ lɛ mli.'
        ],
        localChemicalTreatment: 'TSOFA KOORAA EHIAAA (TO OSHIKA HE): Baa nɛɛ yɛ alaafee kpakpa. Kaahé tsofa ko kɛfĩ nɔ ejaakɛ ebaaye oshika efɔŋ.',
        localPrevention: [
          'Ya nɔ okwɛ obaai lɛ anɔ daa ni ogbe gbikɛ.'
        ],
        speechSummary: `AgriScan helemɔ kpakpa: Sane kpakpa! O-baa lɛ yɛ kpakpa kooraa ni yɛlɛ ko bɛ nɔ. E-he ehiaaa ni ohe tsofa ko kɛfĩ nɔ. To oshika he gbɛ kɛya nɔ okwɛ obaai lɛ anɔ jogbaŋŋ.`
      };
    }

    if (lang === 'ewe') {
      return {
        localName: disease.localNameEwe || `${disease.crop} Aŋba Nyui (Lãmesẽ)`,
        localSymptoms: [
          'Aŋba la le amamu nyuie eye dɔléle aɖeke mele eŋu o',
          'Kakaɖedzi le veviwo ŋu kple aŋbawo ƒe sesẽ',
          'Veviwo kple aŋbawo mebɔbɔ o'
        ],
        localCause: 'Anyigba nyui, tsi nyui, kple ŋdɔkutsu si sɔ.',
        localOrganicTreatment: [
          'Yi edzi nànɔ gbe sia gbem gblẽm eye nàtsɔ gbe gblolo aɖo kee dzi.',
          'Zã agblekɔkɔe alo lãkpa hena agbledede nyui.'
        ],
        localChemicalTreatment: 'ATIKETI AÐEKE MEHIÃ O (DZRA WÒ GA ÐO): Agbletide sia le lãmesẽ me. Mègatsɔ ga aɖe aƒle atike kuku aɖeke o; ga ƒe gbegblẽ wòanye.',
        localPrevention: [
          'Kpɔ aŋbawo dzi edziedzi be nàkpɔ tɔtrɔ aɖeke kaba.'
        ],
        speechSummary: `AgriScan dodokpɔ nyui: Nya nyui! Wò agbletide ƒe aŋbaa le lãmesẽ me kura, dɔléle aɖeke mele eŋu o. Mehiã be nàƒle atike aɖeke aɖe edzi o. Dzra wò ga ɖo eye nàyi agblekplɔkplɔ nyui dzi.`
      };
    }

    if (lang === 'dagbani') {
      return {
        localName: disease.localNameDagbani || `${disease.crop} Vari Suŋ (Alaafee)`,
        localSymptoms: [
          'Vari maa nyɛla din yuli viɛnyɛla ka doro bi gbaagi li',
          'Vabili maa kpaŋsirila viɛnyɛla ka kpaŋmaŋ be di polo',
          'Doro shɛli kani di zuɣu'
        ],
        localCause: 'Tiŋgbani suŋ, kom din saɣi, mini wuntaŋ suŋ.',
        localOrganicTreatment: [
          'Kparimi ka kpaŋsi mɔri kɔbu puu maa puuni.',
          'Zaŋmi binkɔbiri bina n-kpaŋsi tiŋgbani maa.'
        ],
        localChemicalTreatment: 'TIMA SHƐLI BI BƆRA (KPAŊSI A LAƔIFU): Vari ŋɔ mali alaafee. Di da tima shɛli n-fihim di zuɣu dama di nyɛla laɣi-yoli bahibu.',
        localPrevention: [
          'Yulimi puu maa daa kam ka gu doro kam naabu.'
        ],
        speechSummary: `AgriScan vihigu suŋ: Lahabali suŋ! A bimbiɛlima vari maa mali alaafee pam ka doro kani. Di bi tu ni a da tima n-fihim di zuɣu. Zaŋmi a laɣifu n-kpaŋsi ku bu suŋ.`
      };
    }

    // English healthy default
    return {
      localName: disease.name,
      localSymptoms: [
        'Vibrant uniform green chlorophyll pigmentation across leaf blade',
        'Intact leaf margin and sturdy vascular veining structure',
        'Zero fungal pustules, necrotic spots, chlorotic halos, or pest damage'
      ],
      localCause: 'Optimal crop nutrition, adequate soil moisture, and robust genetic plant defense.',
      localOrganicTreatment: [
        'Maintain routine farm weeding and mulch crop bases to conserve moisture.',
        'Apply cured compost or seasoned manure to sustain vegetative vigor.'
      ],
      localChemicalTreatment: 'NO CHEMICALS REQUIRED (PREVENT MONEY WASTAGE): This crop foliage is completely healthy. Do NOT purchase or spray fungicides, insecticides, or copper sprays. Spraying chemicals on healthy crops wastes money (GHS 120-450/acre) and harms beneficial soil organisms.',
      localPrevention: [
        'Continue regular twice-weekly crop scouting to catch emergent threats early.',
        'Maintain balanced NPK fertilization and proper plant spacing for air circulation.'
      ],
      speechSummary: `AgriScan Diagnostic Report: Great news! Your ${disease.crop} leaf is completely healthy with vibrant green foliage and zero signs of disease. No chemical sprays or fungicides are needed. Save your money and continue normal good farming practices.`
    };
  }

  // Fallback programmatic translation based on language
  if (lang === 'twi') {
    return {
      localName: disease.localNameTwi || disease.name,
      localSymptoms: disease.symptoms.map(s => `Nsɛnkyerɛnne: ${s}`),
      localCause: `Nea ɛde ba: ${disease.cause}`,
      localOrganicTreatment: disease.organicTreatment.length > 0
        ? disease.organicTreatment
        : ['Pete neem ngo anaa nso kɔkɔɔ gu so ntɛm ara.'],
      localChemicalTreatment: disease.chemicalTreatment[0]
        ? `Fa ${disease.chemicalTreatment[0].productName} (${disease.chemicalTreatment[0].applicationRate}) gu knapsack mu pete so.`
        : 'Kɔhwehwɛ MoFA kuayɛ panin (AEA) hɔ afotu ntɛm.',
      localPrevention: disease.prevention,
      speechSummary: `AgriScan nhwehwɛmu: Yareɛ a ɛwɔ wo ahaban so ne ${disease.localNameTwi || disease.name}. Ne kɛseɛ yɛ ${disease.severity}. Fa neem ngo anaa ${disease.chemicalTreatment[0]?.productName || 'MoFA aduru'} pete so pɛpɛɛpɛ.`
    };
  }

  if (lang === 'ga') {
    return {
      localName: disease.localNameGa || disease.name,
      localSymptoms: disease.symptoms.map(s => `Kadidii: ${s}`),
      localCause: `Nɔ ni kɛba: ${disease.cause}`,
      localOrganicTreatment: disease.organicTreatment.length > 0
        ? disease.organicTreatment
        : ['Kɛ neem nu fĩ baai lɛ anɔ amrɔ nɔŋŋ.'],
      localChemicalTreatment: disease.chemicalTreatment[0]
        ? `Kɛ ${disease.chemicalTreatment[0].productName} wo knapsack tsɔne mli kɛwo nɔ.`
        : 'Bi MoFA okwaafo onukpa (AEA) ŋaawo amrɔ.',
      localPrevention: disease.prevention,
      speechSummary: `AgriScan helemɔ: Yɛlɛ ni yɔɔ baa lɛ nɔ ji ${disease.localNameGa || disease.name}. Kɛ neem nu aloo ${disease.chemicalTreatment[0]?.productName || 'MoFA tsofa'} awo mli.`
    };
  }

  if (lang === 'ewe') {
    const eweName = disease.localNameEwe || `${disease.crop.toUpperCase()} Dɔléle (${disease.name})`;
    return {
      localName: eweName,
      localSymptoms: disease.symptoms.map(s => `Dzesi: ${s}`),
      localCause: `Nu si he vɛ: ${disease.cause}`,
      localOrganicTreatment: disease.organicTreatment.length > 0
        ? disease.organicTreatment
        : ['Si neem ami alo dzofi sesĩe ɖe aŋbawo dzi kaba.'],
      localChemicalTreatment: disease.chemicalTreatment[0]
        ? `Zã ${disease.chemicalTreatment[0].productName} (${disease.chemicalTreatment[0].applicationRate}) ɖe knapsack me.`
        : 'Bia MoFA agbledede nunɔla (AEA) ƒe aɖaŋuɖoɖo.',
      localPrevention: disease.prevention,
      speechSummary: `AgriScan dodokpɔ: Dɔléle si le aŋbaa ŋu nye ${eweName}. Zã neem ami alo ${disease.chemicalTreatment[0]?.productName || 'MoFA agbletike'} ɖe edzi kaba.`
    };
  }

  if (lang === 'dagbani') {
    const dagName = disease.localNameDagbani || `${disease.crop.toUpperCase()} Doro (${disease.name})`;
    return {
      localName: dagName,
      localSymptoms: disease.symptoms.map(s => `Dahi: ${s}`),
      localCause: `Din tahi na: ${disease.cause}`,
      localOrganicTreatment: disease.organicTreatment.length > 0
        ? disease.organicTreatment
        : ['Fihim neem kpam bee tampie n-niŋ vari maa zuɣu amrɔ.'],
      localChemicalTreatment: disease.chemicalTreatment[0]
        ? `Zaŋ ${disease.chemicalTreatment[0].productName} (${disease.chemicalTreatment[0].applicationRate}) n-niŋ knapsack puuni.`
        : 'Bɔmi MoFA kparilim kpambaliga (AEA) saɣisigu.',
      localPrevention: disease.prevention,
      speechSummary: `AgriScan zahimbu: Doro din gbaagi vabili maa nyɛla ${dagName}. Zaŋ neem kpam bee ${disease.chemicalTreatment[0]?.productName || 'MoFA tima'} fihim di zuɣu amrɔ.`
    };
  }

  // Default English
  return {
    localName: disease.name,
    localSymptoms: disease.symptoms,
    localCause: disease.cause,
    localOrganicTreatment: disease.organicTreatment,
    localChemicalTreatment: disease.chemicalTreatment[0]
      ? `${disease.chemicalTreatment[0].productName} (${disease.chemicalTreatment[0].applicationRate})`
      : 'Consult local MoFA Extension Agent for approved formulation.',
    localPrevention: disease.prevention,
    speechSummary: `AgriScan diagnosis for ${disease.crop}: ${disease.name} detected with ${disease.severity} severity. Apply ${disease.organicTreatment[0] || 'recommended cultural controls'} or approved chemical treatments.`
  };
}

// UI string helper
export function t(key: string, lang: AppLanguage): string {
  return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS.en[key] || key;
}
