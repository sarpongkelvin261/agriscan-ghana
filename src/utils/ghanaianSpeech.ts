/**
 * Ghanaian Speech & Audio Engine for AgriScan Ghana
 * Delivers clear, authentic Ghanaian spoken voice for English, Twi, Ga, Ewe, and Dagbani.
 * Uses high-fidelity Ghanaian pre-recorded voice files whenever available,
 * and an advanced Ghanaian-accented SpeechSynthesis engine with native phonetic transliteration.
 */

let activeAudioElement: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;

// Asynchronously resolve browser voices (handles asynchronous loading in Chrome & Android WebViews)
export function getAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }
    const initial = window.speechSynthesis.getVoices();
    if (initial && initial.length > 0) {
      resolve(initial);
      return;
    }

    const onVoices = () => {
      const v = window.speechSynthesis.getVoices();
      window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
      resolve(v || []);
    };

    window.speechSynthesis.addEventListener('voiceschanged', onVoices);

    // Safety timeout in case voiceschanged already fired
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices() || []);
    }, 350);
  });
}

// Select the most authentic Ghanaian or West African voice available on the handset
export function selectGhanaianVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // 1. Official Google / Android Ghanaian English voice (en-GH)
  const ghanaVoice = voices.find(
    (v) =>
      v.lang === 'en-GH' ||
      v.lang.toLowerCase() === 'en_gh' ||
      v.name.toLowerCase().includes('ghana') ||
      /\bgh\b/i.test(v.name)
  );
  if (ghanaVoice) return ghanaVoice;

  // 2. West African voice (en-NG) - shares identical West African melodic cadence and vowel phonemes
  const westAfricanVoice = voices.find(
    (v) =>
      v.lang === 'en-NG' ||
      v.lang.toLowerCase() === 'en_ng' ||
      v.name.toLowerCase().includes('nigeria')
  );
  if (westAfricanVoice) return westAfricanVoice;

  // 3. African English voice (en-ZA / African)
  const africanVoice = voices.find(
    (v) =>
      v.lang === 'en-ZA' ||
      v.name.toLowerCase().includes('african') ||
      v.name.toLowerCase().includes('africa')
  );
  if (africanVoice) return africanVoice;

  // 4. Commonwealth / British English (closest non-rhotic rhythm and vowel duration to Ghanaian English)
  const commonwealthVoice = voices.find(
    (v) =>
      v.lang.startsWith('en-GB') ||
      v.name.toLowerCase().includes('united kingdom') ||
      v.name.toLowerCase().includes('british')
  );
  if (commonwealthVoice) return commonwealthVoice;

  return voices[0] || null;
}

// Phonetic transliterator for Ghanaian Twi (Asante Twi)
export function transliterateTwiForSpeech(text: string): string {
  return text
    // Replace Twi open vowels with natural phonetics
    .replace(/ɛ/g, 'eh')
    .replace(/Ɛ/g, 'Eh')
    .replace(/ɔ/g, 'aw')
    .replace(/Ɔ/g, 'Aw')
    .replace(/ky/gi, 'ch')
    .replace(/dw/gi, 'jw')
    .replace(/hw/gi, 'shw')
    .replace(/ny/gi, 'ny')
    // Common Ghanaian agricultural phrases tuned for native Asante Twi pronunciation
    .replace(/\bnhwehwɛmu\b/gi, 'n-hweh-hweh-moo')
    .replace(/\bahaban\b/gi, 'ah-hah-bahn')
    .replace(/\bnhaban\b/gi, 'n-hah-bahn')
    .replace(/\byareɛ\b/gi, 'yah-ree-eh')
    .replace(/\baburo\b/gi, 'ah-boo-roh')
    .replace(/\bbankye\b/gi, 'bahn-chee')
    .replace(/\bbɔdeɛ\b/gi, 'baw-dee-eh')
    .replace(/\bkookoo\b/gi, 'koh-koh')
    .replace(/\bntoosi\b/gi, 'n-toh-see')
    .replace(/\bmako\b/gi, 'mah-koh')
    .replace(/\bbayerɛ\b/gi, 'bah-yeh-reh')
    .replace(/\baseɛ\b/gi, 'ah-see-eh')
    .replace(/\bpɛpɛɛpɛ\b/gi, 'peh-peh-peh')
    .replace(/\baduru\b/gi, 'ah-doo-roo')
    .replace(/\bmmoawa\b/gi, 'm-mwah-wah')
    .replace(/\bahoɔdenfoɔ\b/gi, 'ah-haw-den-faw')
    .replace(/\bkora wo sika so\b/gi, 'koh-rah woh see-kah saw')
    .replace(/\bakwaaba\b/gi, 'ah-kwah-bah')
    .replace(/\bknapsack\b/gi, 'nap-sack')
    .replace(/\bfungicide\b/gi, 'fun-ji-side');
}

// Phonetic transliterator for Ghanaian Ga
export function transliterateGaForSpeech(text: string): string {
  return text
    .replace(/ŋ/g, 'ng')
    .replace(/Ŋ/g, 'Ng')
    .replace(/ɛ/g, 'eh')
    .replace(/Ɛ/g, 'Eh')
    .replace(/ɔ/g, 'aw')
    .replace(/Ɔ/g, 'Aw')
    .replace(/ts/gi, 'ch')
    .replace(/gb/gi, 'g-b')
    .replace(/kp/gi, 'k-p')
    .replace(/\bshikpɔŋ\b/gi, 'shee-kpawng')
    .replace(/\bokwaafo\b/gi, 'oh-kwah-foh');
}

// Phonetic transliterator for Ghanaian Ewe
export function transliterateEweForSpeech(text: string): string {
  return text
    .replace(/ɖ/g, 'd')
    .replace(/Ɖ/g, 'D')
    .replace(/ƒ/g, 'f')
    .replace(/Ƒ/g, 'F')
    .replace(/ɣ/g, 'gh')
    .replace(/Ɣ/g, 'Gh')
    .replace(/ŋ/g, 'ng')
    .replace(/Ŋ/g, 'Ng')
    .replace(/ʋ/g, 'v')
    .replace(/Ʋ/g, 'V')
    .replace(/dz/gi, 'j')
    .replace(/ts/gi, 'ch');
}

// Phonetic transliterator for Ghanaian Dagbani
export function transliterateDagbaniForSpeech(text: string): string {
  return text
    .replace(/ɣ/g, 'gh')
    .replace(/Ɣ/g, 'Gh')
    .replace(/ʒ/g, 'zh')
    .replace(/Ʒ/g, 'Zh')
    .replace(/ŋ/g, 'ng')
    .replace(/Ŋ/g, 'Ng')
    .replace(/gb/gi, 'g-b')
    .replace(/kp/gi, 'k-p');
}

// Phonetic Ghanaian English Cadence Enhancer
// Tunes English speech to sound like a clear, distinguished Ghanaian Agricultural Extension Agent (AEA)
export function tuneEnglishForGhanaianCadence(text: string): string {
  return text
    // Replace abbreviations with natural spoken Ghanaian extension terms
    .replace(/\bMoFA\b/g, 'M-O-F-A, Ministry of Food and Agriculture,')
    .replace(/\bCSIR-CRI\b/g, 'C-S-I-R Crops Research Institute')
    .replace(/\bEPA\b/g, 'Ghana E-P-A')
    .replace(/\bPHI\b/g, 'Pre-harvest interval')
    .replace(/\bTYLCV\b/g, 'Tomato Yellow Leaf Curl Virus')
    .replace(/\bCMD\b/g, 'Cassava Mosaic Disease')
    .replace(/\bCBSD\b/g, 'Cassava Brown Streak Disease')
    .replace(/\bFAW\b/g, 'Fall Armyworm')
    // Clear Ghanaian pronunciation for chemical and agricultural terms
    .replace(/\bknapsack\b/gi, 'knap-sack')
    .replace(/\bMancozeb\b/gi, 'Man-co-zeb')
    .replace(/\bRidomil\b/gi, 'Ree-do-mil Gold')
    .replace(/\bAzoxystrobin\b/gi, 'A-zox-y-stro-bin')
    .replace(/\bDifenoconazole\b/gi, 'Di-feno-conazole')
    .replace(/\bha\b/g, 'hectare')
    .replace(/\bkg\b/g, 'kilograms')
    .replace(/\bml\b/g, 'millilitres')
    // Natural pacing with commas for Ghanaian speech cadence
    .replace(/:\s*/g, ': ')
    .replace(/\.\s+/g, '. ... ')
    .replace(/,\s*/g, ', ');
}

export interface PlayGhanaianAudioOptions {
  diseaseId?: string;
  lang: string;
  text: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export function stopGhanaianAudio(): void {
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    } catch {
      // ignore
    }
    activeAudioElement = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

export async function playGhanaianAudio({
  diseaseId,
  lang,
  text,
  onStart,
  onEnd,
  onError,
}: PlayGhanaianAudioOptions): Promise<void> {
  // Always stop existing audio first
  stopGhanaianAudio();

  const handleEnded = () => {
    activeAudioElement = null;
    if (onEnd) onEnd();
  };

  const handleFailed = () => {
    activeAudioElement = null;
    fallbackBrowserSpeech(text, lang, onStart, onEnd, onError);
  };

  // 1. If Twi language and diseaseId provided, play authentic studio-recorded Ghanaian voice file
  if (lang === 'twi' && diseaseId) {
    // Normalise ID aliases
    let normalizedId = diseaseId;
    if (diseaseId === 'cassava_cbb') normalizedId = 'cassava_mosaic';
    if (diseaseId === 'oil_palm_healthy') normalizedId = 'oilpalm_healthy';

    const audioSrc = `/audio/twi/${normalizedId}.wav`;
    const audio = new Audio();
    audio.src = audioSrc;
    audio.preload = 'auto';

    audio.onended = handleEnded;
    audio.onerror = () => {
      // If language file is not pre-recorded (e.g. English or Ga), use the Ghanaian-tuned speech engine
      handleFailed();
    };

    try {
      activeAudioElement = audio;
      if (onStart) onStart();
      await audio.play();
      return;
    } catch {
      handleFailed();
      return;
    }
  }

  // 2. Play via Ghanaian-accented speech engine
  fallbackBrowserSpeech(text, lang, onStart, onEnd, onError);
}

async function fallbackBrowserSpeech(
  text: string,
  lang: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError(new Error('Speech synthesis unsupported on this browser'));
    return;
  }

  // Asynchronously retrieve voices to avoid Android/Chrome empty-voice race condition
  const voices = await getAvailableVoices();
  const selectedVoice = selectGhanaianVoice(voices);

  // Apply Ghanaian phonetic tuning per language
  let speechText = text;
  if (lang === 'twi') {
    speechText = transliterateTwiForSpeech(text);
  } else if (lang === 'ga') {
    speechText = transliterateGaForSpeech(text);
  } else if (lang === 'ewe') {
    speechText = transliterateEweForSpeech(text);
  } else if (lang === 'dagbani') {
    speechText = transliterateDagbaniForSpeech(text);
  } else {
    // English: apply authentic Ghanaian agricultural extension cadence
    speechText = tuneEnglishForGhanaianCadence(text);
  }

  const utterance = new SpeechSynthesisUtterance(speechText);

  // Ghanaian Speech Cadence: Slightly measured, articulate, and warm
  utterance.rate = 0.88; // Deliberate Ghanaian broadcast pacing
  utterance.pitch = 1.0;  // Natural warm pitch

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    // Set appropriate BCP-47 language tag
    if (lang === 'twi') {
      utterance.lang = 'ak-GH';
    } else if (lang === 'ga') {
      utterance.lang = 'gaa-GH';
    } else if (lang === 'ewe') {
      utterance.lang = 'ee-GH';
    } else {
      utterance.lang = selectedVoice.lang || 'en-GH';
    }
  } else {
    utterance.lang = 'en-GH';
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    activeUtterance = null;
    if (onEnd) onEnd();
    if (onError) onError(e);
  };

  activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}
