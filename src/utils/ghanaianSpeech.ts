/**
 * Ghanaian Speech & Audio Engine for AgriScan Ghana
 * Delivers authentic Ghanaian Twi (Asante Twi) spoken audio with a native Ghanaian voice.
 */

let activeAudioElement: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;

// Phonetic transliterator for fallback TTS engines to pronounce Twi phonemes naturally
export function transliterateTwiForSpeech(text: string): string {
  return text
    // Replace Twi special vowels with standard phonetic equivalents
    .replace(/ɛ/g, 'eh')
    .replace(/Ɛ/g, 'Eh')
    .replace(/ɔ/g, 'aw')
    .replace(/Ɔ/g, 'Aw')
    // Common Twi phrases and terms phonetic clarity
    .replace(/\bnhwehwɛmu\b/gi, 'n-hweh-hweh-moo')
    .replace(/\bahaban\b/gi, 'ah-hah-bahn')
    .replace(/\bnhaban\b/gi, 'n-hah-bahn')
    .replace(/\byareɛ\b/gi, 'yah-ree-eh')
    .replace(/\baburo\b/gi, 'ah-boo-ro')
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

  const handleFailed = (error: any) => {
    activeAudioElement = null;
    // Fallback to browser TTS with phonetic transliteration
    fallbackBrowserSpeech(text, lang, onStart, onEnd, onError);
  };

  // 1. If diseaseId provided and static audio is known to exist
  if (diseaseId) {
    const audioSrc = `/audio/${lang}/${diseaseId}.wav`;
    const audio = new Audio();
    audio.src = audioSrc;
    audio.preload = 'auto';

    audio.oncanplaythrough = () => {
      // ready
    };

    audio.onended = handleEnded;

    audio.onerror = async () => {
      // Try fetching from server /api/tts endpoint
      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, lang, diseaseId }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.audioUrl || data.audioBase64) {
            const dynamicAudio = new Audio();
            dynamicAudio.src = data.audioUrl || `data:audio/wav;base64,${data.audioBase64}`;
            dynamicAudio.onended = handleEnded;
            dynamicAudio.onerror = (e) => handleFailed(e);
            activeAudioElement = dynamicAudio;
            if (onStart) onStart();
            await dynamicAudio.play();
            return;
          }
        }
      } catch (e) {
        console.warn('Dynamic TTS fetch failed:', e);
      }

      handleFailed(new Error('Static audio file not found and dynamic fallback failed'));
    };

    try {
      activeAudioElement = audio;
      if (onStart) onStart();
      await audio.play();
      return;
    } catch (playErr) {
      console.warn('Direct audio play error:', playErr);
      // Wait a moment and try server endpoint or browser speech
      handleFailed(playErr);
      return;
    }
  }

  // 2. No diseaseId: call /api/tts endpoint for dynamic Ghanaian speech
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audioUrl || data.audioBase64) {
        const dynamicAudio = new Audio();
        dynamicAudio.src = data.audioUrl || `data:audio/wav;base64,${data.audioBase64}`;
        dynamicAudio.onended = handleEnded;
        dynamicAudio.onerror = (e) => handleFailed(e);
        activeAudioElement = dynamicAudio;
        if (onStart) onStart();
        await dynamicAudio.play();
        return;
      }
    }
  } catch (apiErr) {
    console.warn('TTS API call error:', apiErr);
  }

  // 3. Fallback
  fallbackBrowserSpeech(text, lang, onStart, onEnd, onError);
}

function fallbackBrowserSpeech(
  text: string,
  lang: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError(new Error('Speech synthesis unsupported'));
    return;
  }

  const speechText = lang === 'twi' ? transliterateTwiForSpeech(text) : text;
  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.rate = 0.85;
  utterance.pitch = 0.95;

  // Try to pick an African or British voice if available
  const voices = window.speechSynthesis.getVoices();
  const africanVoice = voices.find(
    (v) =>
      v.lang.includes('GH') ||
      v.lang.includes('NG') ||
      v.lang.includes('ZA') ||
      v.name.toLowerCase().includes('african') ||
      v.lang.startsWith('en-GB')
  );

  if (africanVoice) {
    utterance.voice = africanVoice;
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
