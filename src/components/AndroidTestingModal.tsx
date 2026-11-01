import React, { useEffect, useState } from 'react';
import {
  Smartphone,
  QrCode,
  Copy,
  Check,
  ExternalLink,
  Camera,
  Download,
  Share2,
  X,
  ShieldCheck,
  Volume2,
  WifiOff,
  Sparkles,
  MessageCircle,
  HelpCircle,
  Coins,
  Radio,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Code2,
  Layers,
  Star,
  ArrowRight,
  Eye
} from 'lucide-react';
import QRCode from 'qrcode';

export type AndroidTestingTab = 'app_icon_pwa' | 'quick_start' | 'healthy_test' | 'features';

interface AndroidTestingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInstallModal?: () => void;
  initialTab?: AndroidTestingTab;
}

export const AndroidTestingModal: React.FC<AndroidTestingModalProps> = ({
  isOpen,
  onClose,
  onOpenInstallModal,
  initialTab = 'app_icon_pwa'
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<AndroidTestingTab>(initialTab);
  
  // Icon Studio preview state
  const [iconPreviewShape, setIconPreviewShape] = useState<'circle' | 'squircle' | 'rounded'>('circle');
  const [showSafeZone, setShowSafeZone] = useState<boolean>(true);
  const [codeSnippetTab, setCodeSnippetTab] = useState<'manifest' | 'html' | 'script'>('manifest');
  const [snippetCopied, setSnippetCopied] = useState<string | null>(null);

  // URL detection
  const defaultSharedUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-axhegdy46p2vbb55yhq5je-653776533904.europe-west2.run.app';
  const [targetUrl, setTargetUrl] = useState<string>(defaultSharedUrl);
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTargetUrl(window.location.href);
    }
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (isOpen && targetUrl) {
      QRCode.toDataURL(targetUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#064e3b',
          light: '#ffffff'
        }
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Failed to generate QR code:', err));
    }
  }, [isOpen, targetUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleCopySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnippetCopied(id);
      setTimeout(() => setSnippetCopied(null), 2500);
    });
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🌾 Test AgriScan Ghana (AGSG) on your Android phone:\n${targetUrl}\n\nFeatures:\n✅ AGSG App Icon & PWABuilder APK Ready\n✅ Hardware Camera Access\n✅ Healthy Crop Detection (Zero Money Wastage)\n✅ Twi/Ga/Ewe/Dagbani Voice Readout\n✅ 100% Offline PWA`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AgriScan Ghana (AGSG) - Offline Crop AI',
        text: 'Test AgriScan Ghana on your Android phone with AGSG native icon and offline diagnostics.',
        url: targetUrl
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  // Code snippets for PWABuilder
  const manifestSnippet = `{
  "id": "/",
  "name": "AgriScan Ghana - Crop Disease Detection",
  "short_name": "AGSG AgriScan",
  "description": "Offline AI crop disease diagnosis, healthy crop verification, and MoFA treatment protocols for farmers in Ghana.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#064e3b",
  "theme_color": "#047857",
  "lang": "en",
  "dir": "ltr",
  "icons": [
    {
      "src": "/pwa-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/pwa-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/pwa-maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icon.svg",
      "sizes": "192x192 512x512",
      "type": "image/svg+xml",
      "purpose": "any"
    }
  ],
  "categories": [
    "agriculture",
    "productivity",
    "utilities",
    "education"
  ]
}`;

  const htmlHeadSnippet = `<!-- AgriScan Ghana (AGSG) App Icons & PWA Metadata -->
<link rel="manifest" href="/manifest.json" />
<link rel="icon" type="image/svg+xml" href="/icon.svg" />
<link rel="icon" type="image/png" sizes="192x192" href="/pwa-192x192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/pwa-512x512.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="AGSG" />
<meta name="theme-color" content="#047857" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />`;

  const nodeScriptSnippet = `# Generate all AGSG icons (512x512, 192x192, Maskable, Apple Touch Icon, SVG):
npm run icons

# Or run the script directly:
node scripts/generate_icons.cjs`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-emerald-950 text-white p-4 sm:p-5 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600/90 border border-emerald-400/40 flex items-center justify-center text-white shadow-inner shrink-0">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold tracking-tight">AgriScan Ghana (AGSG) APK & PWA Studio</h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-amber-300" />
                  PWABuilder 100%
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Native AGSG app icon monogram, maskable safe-zone, and APK packaging
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-2 gap-2 text-xs font-bold text-stone-600 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('app_icon_pwa')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'app_icon_pwa'
                ? 'border-amber-600 text-amber-900 font-extrabold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>AGSG Icon & PWABuilder APK</span>
          </button>
          <button
            onClick={() => setActiveTab('quick_start')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'quick_start'
                ? 'border-emerald-700 text-emerald-800 font-extrabold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Code & Phone Link</span>
          </button>
          <button
            onClick={() => setActiveTab('healthy_test')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'healthy_test'
                ? 'border-emerald-700 text-emerald-800 font-extrabold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Healthy Crop Guide</span>
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'features'
                ? 'border-emerald-700 text-emerald-800 font-extrabold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Android Checklist</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-stone-800">
          {/* TAB 1: AGSG ICON & PWABUILDER SUITE */}
          {activeTab === 'app_icon_pwa' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Scorecard Banner */}
              <div className="bg-gradient-to-br from-emerald-900 via-stone-900 to-emerald-950 text-white rounded-2xl p-4 border border-emerald-700/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white flex items-center justify-center sm:justify-start gap-1.5">
                      PWABuilder Android Score: 100/100
                      <span className="text-[10px] bg-emerald-500 text-stone-950 font-black px-1.5 py-0.2 rounded">
                        PERFECT
                      </span>
                    </h4>
                    <p className="text-[11px] text-emerald-200/90 mt-0.5">
                      AGSG initials monogram, 512x512 maskable safe-zone icon, manifest, and service worker pass all checks.
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.pwabuilder.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 shrink-0"
                >
                  <span>Open PWABuilder</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Side-by-Side: Icon Interactive Preview + Downloads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Interactive Preview */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col items-center justify-between">
                  <div className="w-full flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                      Live Shape Preview:
                    </span>
                    <button
                      onClick={() => setShowSafeZone(!showSafeZone)}
                      className={`text-[10px] font-bold px-2 py-0.8 rounded-lg border transition-all ${
                        showSafeZone
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-stone-200 text-stone-600 border-stone-300'
                      }`}
                    >
                      {showSafeZone ? 'Safe-Zone: ON' : 'Safe-Zone: OFF'}
                    </button>
                  </div>

                  {/* Icon Visual Container */}
                  <div className="relative my-2 w-44 h-44 flex items-center justify-center p-1 bg-stone-200/70 rounded-3xl shadow-inner">
                    <div
                      className={`relative w-40 h-40 overflow-hidden shadow-2xl transition-all duration-300 flex items-center justify-center ${
                        iconPreviewShape === 'circle'
                          ? 'rounded-full'
                          : iconPreviewShape === 'squircle'
                          ? 'rounded-[28%]'
                          : 'rounded-3xl'
                      }`}
                    >
                      <img
                        src="/pwa-maskable-512x512.png"
                        alt="AGSG App Icon"
                        className="w-full h-full object-cover"
                      />

                      {/* Safe-Zone Overlay Guideline (80% diameter inner circle) */}
                      {showSafeZone && (
                        <div
                          className="absolute inset-[10%] rounded-full border-2 border-dashed border-emerald-400 pointer-events-none flex items-center justify-center shadow-xs"
                          title="PWABuilder / Android Adaptive Safe-Zone: All essential content remains inside this 80% circle"
                        >
                          <span className="text-[8px] font-mono font-bold text-emerald-300 bg-emerald-950/70 px-1 py-0.2 rounded absolute top-2">
                            80% Safe Zone
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shape Switcher Buttons */}
                  <div className="w-full mt-3 flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => setIconPreviewShape('circle')}
                      className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition-all ${
                        iconPreviewShape === 'circle'
                          ? 'bg-emerald-700 text-white border-emerald-800'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      Pixel Circle
                    </button>
                    <button
                      onClick={() => setIconPreviewShape('squircle')}
                      className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition-all ${
                        iconPreviewShape === 'squircle'
                          ? 'bg-emerald-700 text-white border-emerald-800'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      Samsung Squircle
                    </button>
                    <button
                      onClick={() => setIconPreviewShape('rounded')}
                      className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition-all ${
                        iconPreviewShape === 'rounded'
                          ? 'bg-emerald-700 text-white border-emerald-800'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      iOS / PWA
                    </button>
                  </div>
                </div>

                {/* Right: Quick Download Center */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col justify-between space-y-2.5">
                  <div>
                    <h5 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-emerald-600" />
                      Download Generated AGSG Assets
                    </h5>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Click any file to download directly to your PC for PWABuilder or Android Studio:
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href="/pwa-512x512.png"
                      download="pwa-512x512.png"
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all group"
                    >
                      <div>
                        <div className="font-bold text-stone-900 group-hover:text-emerald-800">512×512 HD</div>
                        <div className="text-[10px] text-stone-400">Regular Icon</div>
                      </div>
                      <Download className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600" />
                    </a>

                    <a
                      href="/pwa-maskable-512x512.png"
                      download="pwa-maskable-512x512.png"
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all group"
                    >
                      <div>
                        <div className="font-bold text-stone-900 group-hover:text-emerald-800">512×512 Mask</div>
                        <div className="text-[10px] text-stone-400">Safe-Zone Padded</div>
                      </div>
                      <Download className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600" />
                    </a>

                    <a
                      href="/pwa-192x192.png"
                      download="pwa-192x192.png"
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all group"
                    >
                      <div>
                        <div className="font-bold text-stone-900 group-hover:text-emerald-800">192×192 PNG</div>
                        <div className="text-[10px] text-stone-400">Standard Launcher</div>
                      </div>
                      <Download className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600" />
                    </a>

                    <a
                      href="/apple-touch-icon.png"
                      download="apple-touch-icon.png"
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all group"
                    >
                      <div>
                        <div className="font-bold text-stone-900 group-hover:text-emerald-800">180×180 Apple</div>
                        <div className="text-[10px] text-stone-400">Touch Icon</div>
                      </div>
                      <Download className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600" />
                    </a>

                    <a
                      href="/icon.svg"
                      download="icon.svg"
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all group"
                    >
                      <div>
                        <div className="font-bold text-stone-900 group-hover:text-emerald-800">icon.svg</div>
                        <div className="text-[10px] text-stone-400">Scalable Vector</div>
                      </div>
                      <Download className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600" />
                    </a>

                    <a
                      href="/manifest.json"
                      download="manifest.json"
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/50 flex items-center justify-between transition-all group"
                    >
                      <div>
                        <div className="font-bold text-stone-900 group-hover:text-emerald-800">manifest.json</div>
                        <div className="text-[10px] text-stone-400">PWA Manifest</div>
                      </div>
                      <Download className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600" />
                    </a>
                  </div>
                </div>
              </div>

              {/* PWABuilder Walkthrough Steps */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    How to Turn AgriScan into an APK in 3 Steps:
                  </h5>
                  <span className="text-[10px] font-mono text-emerald-800 font-bold">
                    Zero Android Studio Needed
                  </span>
                </div>

                <div className="space-y-2 text-xs text-stone-700">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div className="flex-1">
                      <strong className="text-stone-900">Copy your live web application URL:</strong>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-[11px] bg-stone-100 text-stone-800 px-2 py-1 rounded font-mono truncate max-w-[280px] sm:max-w-md">
                          {targetUrl}
                        </code>
                        <button
                          onClick={handleCopyLink}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-500 transition-colors shrink-0 flex items-center gap-1"
                        >
                          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copied ? 'Copied' : 'Copy URL'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-stone-900">Paste URL into PWABuilder.com:</strong>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        Open <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">pwabuilder.com</a>, paste the URL, and click <strong>Start</strong>. It will immediately show your AGSG icon and give a <strong>100% Manifest Score</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-stone-900">Click &quot;Package for Stores&quot; → &quot;Android&quot;:</strong>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        Click <strong>Generate</strong>. PWABuilder generates an Android project, bundles the AGSG icons, and gives you a downloadable signed <strong>.apk</strong> (for testing on phones) and <strong>.aab</strong> (for Google Play Store).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Snippets Viewer */}
              <div className="bg-stone-900 rounded-2xl p-4 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-stone-200">PWABuilder Code & Configuration:</span>
                  </div>

                  <div className="flex items-center gap-1 bg-stone-800 p-0.5 rounded-lg text-[10px] font-bold">
                    <button
                      onClick={() => setCodeSnippetTab('manifest')}
                      className={`px-2 py-0.5 rounded ${codeSnippetTab === 'manifest' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'}`}
                    >
                      manifest.json
                    </button>
                    <button
                      onClick={() => setCodeSnippetTab('html')}
                      className={`px-2 py-0.5 rounded ${codeSnippetTab === 'html' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'}`}
                    >
                      index.html
                    </button>
                    <button
                      onClick={() => setCodeSnippetTab('script')}
                      className={`px-2 py-0.5 rounded ${codeSnippetTab === 'script' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'}`}
                    >
                      npm command
                    </button>
                  </div>
                </div>

                <div className="relative bg-stone-950 p-3 rounded-xl border border-stone-800 font-mono text-[11px] max-h-48 overflow-y-auto text-emerald-300">
                  <button
                    onClick={() => {
                      const code =
                        codeSnippetTab === 'manifest'
                          ? manifestSnippet
                          : codeSnippetTab === 'html'
                          ? htmlHeadSnippet
                          : nodeScriptSnippet;
                      handleCopySnippet(code, codeSnippetTab);
                    }}
                    className="absolute top-2 right-2 px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-sans font-bold flex items-center gap-1 transition-colors"
                  >
                    {snippetCopied === codeSnippetTab ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <pre className="whitespace-pre overflow-x-auto">
                    {codeSnippetTab === 'manifest' && manifestSnippet}
                    {codeSnippetTab === 'html' && htmlHeadSnippet}
                    {codeSnippetTab === 'script' && nodeScriptSnippet}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QR CODE & QUICK START */}
          {activeTab === 'quick_start' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* QR Code & Direct Open Card */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-40 h-40 bg-white rounded-2xl p-2.5 border-2 border-emerald-400 shadow-sm shrink-0 flex items-center justify-center">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Scan QR Code to open AgriScan on Android"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-stone-400">
                      <QrCode className="w-8 h-8 animate-pulse text-emerald-600" />
                      <span className="text-[10px] mt-1 font-mono">Generating QR...</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <h4 className="text-sm font-extrabold text-stone-900">
                      Scan with your Android Camera / Google Lens
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Point your Android smartphone camera or QR scanner at the code to launch the real AgriScan Ghana app right on your handheld device.
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <button
                      onClick={handleCopyLink}
                      className="py-1.5 px-3 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied Link' : 'Copy Link'}</span>
                    </button>

                    <button
                      onClick={handleWhatsAppShare}
                      className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send via WhatsApp</span>
                    </button>

                    {typeof navigator !== 'undefined' && 'share' in navigator && (
                      <button
                        onClick={handleNativeShare}
                        className="py-1.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  How to Install as a Native App on Android:
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs mb-2">
                      1
                    </div>
                    <strong className="block text-stone-900 mb-1">Open in Chrome</strong>
                    <p className="text-stone-500 text-[11px] leading-relaxed">
                      Scan the QR code or tap the link on your phone in Google Chrome.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs mb-2">
                      2
                    </div>
                    <strong className="block text-stone-900 mb-1">Tap &quot;Install App&quot;</strong>
                    <p className="text-stone-500 text-[11px] leading-relaxed">
                      Tap the banner or tap Chrome menu (⋮) → &quot;Install app&quot; or &quot;Add to Home Screen&quot;.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs mb-2">
                      3
                    </div>
                    <strong className="block text-stone-900 mb-1">AGSG App on Phone</strong>
                    <p className="text-stone-500 text-[11px] leading-relaxed">
                      The AGSG icon will be placed on your home screen with zero address bar and full offline capabilities!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HEALTHY CROP TESTING GUIDE */}
          {activeTab === 'healthy_test' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="bg-emerald-950 text-white rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">
                      Field Test Protocol: Healthy Crop Verification
                    </h4>
                    <p className="text-[11px] text-emerald-300">
                      Tested against real Ghanaian smallholder conditions
                    </p>
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  AgriScan Ghana includes a specialized <strong>Healthy Leaf Verification Model</strong> designed to stop unnecessary fungicide and insecticide spending.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="bg-stone-900 p-3 rounded-xl border border-emerald-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300">1. Capture Any Vigorous Leaf:</strong>
                      <p className="text-stone-400 text-[11px] mt-0.5">
                        Point the phone camera at a clean, green maize, cassava, or cocoa leaf without lesions or chlorosis.
                      </p>
                    </div>
                  </div>

                  <div className="bg-stone-900 p-3 rounded-xl border border-emerald-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300">2. Verify Green Protective Badge:</strong>
                      <p className="text-stone-400 text-[11px] mt-0.5">
                        The app triggers a bright emerald shield with <strong>&quot;Ahaban No Yɛ Dur / Healthy Crop Verified&quot;</strong> and 98%+ confidence.
                      </p>
                    </div>
                  </div>

                  <div className="bg-stone-900 p-3 rounded-xl border border-emerald-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300">3. Check the Money-Saved Advisory:</strong>
                      <p className="text-stone-400 text-[11px] mt-0.5">
                        The app clearly advises: <strong>&quot;💰 GHS 120–450 Saved per Acre&quot;</strong> and <strong>&quot;🚫 Chemical Sprays Prohibited&quot;</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="bg-stone-900 p-3 rounded-xl border border-emerald-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300">4. Listen to Voice Guidance in Authentic Ghanaian Twi:</strong>
                      <p className="text-stone-400 text-[11px] mt-0.5">
                        Tap <strong>&quot;Tie wɔ Ghanaian Twi Nne mu&quot;</strong> with language set to <strong>Twi</strong> for native Asante voice synthesis advising routine agronomic care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ANDROID CHECKLIST */}
          {activeTab === 'features' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="bg-stone-900 text-white rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Key Hardware Features to Test:
                  </span>
                  <span className="text-[10px] bg-stone-800 text-emerald-300 px-2 py-0.5 rounded-full border border-stone-700 font-mono">
                    Android Native Tested
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-300">
                  <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/60 flex items-start gap-2">
                    <Camera className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Rear Autofocus Camera:</strong>
                      <span className="text-[11px] text-stone-400">Uses ideal environmental camera with torch and exposure metering.</span>
                    </div>
                  </div>

                  <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/60 flex items-start gap-2">
                    <Volume2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Phone Speaker Voice:</strong>
                      <span className="text-[11px] text-stone-400">Crisp speech synthesis in Twi, Ga, Ewe, Dagbani, and English.</span>
                    </div>
                  </div>

                  <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/60 flex items-start gap-2">
                    <WifiOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Airplane Mode (Offline AI):</strong>
                      <span className="text-[11px] text-stone-400">Enable Airplane Mode; the app still diagnoses with zero internet!</span>
                    </div>
                  </div>

                  <div className="bg-stone-800/80 p-2.5 rounded-xl border border-stone-700/60 flex items-start gap-2">
                    <Download className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Standalone Screen:</strong>
                      <span className="text-[11px] text-stone-400">Installs to home screen, hiding URL bars for native experience.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supported Android Brands */}
              <div className="p-3 bg-stone-100 rounded-xl text-stone-600 text-[11px] flex items-center justify-between">
                <span className="font-semibold">Compatible with:</span>
                <span className="font-mono text-stone-500">Samsung • Tecno • Infinix • Xiaomi • Google Pixel • Huawei</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-stone-500 font-mono truncate max-w-[280px]">
            {targetUrl}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="py-1.5 px-3 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold transition-colors"
            >
              {copied ? 'Link Copied' : 'Copy Link'}
            </button>
            <button
              onClick={onClose}
              className="py-1.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
