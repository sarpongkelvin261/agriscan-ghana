import React, { useState } from 'react';
import {
  Code2,
  FolderTree,
  FileCode,
  Copy,
  Check,
  Download,
  Terminal,
  Smartphone,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { FLUTTER_CODEBASE, FlutterFile } from '../../data/flutterCodebase';

export const FlutterCodebaseViewer: React.FC = () => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>(FLUTTER_CODEBASE[0].path);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'files' | 'build_guide' | 'structure'>('files');

  const currentFile = FLUTTER_CODEBASE.find(f => f.path === selectedFilePath) || FLUTTER_CODEBASE[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownload = () => {
    const filename = currentFile.path.split('/').pop() || 'file.dart';
    const blob = new Blob([currentFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <Code2 className="w-4 h-4" /> Part 2 & Part 4 — Flutter Mobile Application & APK Deployment
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
            Flutter Production Project Source Tree
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
            Zero-network Android-first codebase utilizing <code>tflite_flutter</code> for on-device inference and <code>sqflite</code> for persistent offline treatment catalog and scan logs.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1 bg-stone-100 p-1.5 rounded-xl border border-stone-200 self-start md:self-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'files' ? 'bg-white text-emerald-800 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Source Code</span>
          </button>
          <button
            onClick={() => setActiveTab('build_guide')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'build_guide' ? 'bg-white text-emerald-800 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>APK Build Guide</span>
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'structure' ? 'bg-white text-emerald-800 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Folder Structure</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: SOURCE FILES */}
      {activeTab === 'files' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[580px]">
          {/* File Explorer Sidebar */}
          <div className="w-full md:w-72 bg-stone-50 border-r border-stone-200 p-3 space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-600 px-2 block mb-2">
              Flutter App Structure
            </span>
            {FLUTTER_CODEBASE.map(file => {
              const isSelected = selectedFilePath === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFilePath(file.path)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-800 text-white font-bold shadow-sm'
                      : 'text-stone-700 hover:bg-stone-200/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className="w-4 h-4 shrink-0" />
                    <span className="truncate">{file.path}</span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                    isSelected ? 'bg-emerald-950 text-emerald-200' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {file.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-stone-950 text-stone-200 overflow-hidden">
            <div className="p-3 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono font-bold text-emerald-400">{currentFile.path}</span>
                <p className="text-[11px] text-stone-400 mt-0.5">{currentFile.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs leading-relaxed text-stone-300">
              <pre>
                <code>{currentFile.code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: APK BUILD GUIDE */}
      {activeTab === 'build_guide' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-700" />
              Android APK Compilation Instructions (Debug & Release)
            </h3>

            {/* Step 1: Dependencies */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Step 1: Install Dependencies
              </h4>
              <div className="bg-stone-900 text-emerald-400 p-3 rounded-xl font-mono text-xs">
                flutter pub get
              </div>
            </div>

            {/* Step 2: Debug APK for Academic Defense Demo */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Step 2: Generate Debug APK (Suitable for Department Presentation)
              </h4>
              <div className="bg-stone-900 text-emerald-400 p-3 rounded-xl font-mono text-xs space-y-1">
                <p className="text-stone-400"># Compiles standalone APK to build/app/outputs/flutter-apk/app-debug.apk</p>
                <p>flutter build apk --debug</p>
              </div>
            </div>

            {/* Step 3: Production Signed Release APK */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Step 3: Signed Release APK Production Flow
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                For Google Play or deployment to Ghana Ministry of Food and Agriculture (MoFA) extension tablets:
              </p>
              <div className="bg-stone-900 text-stone-300 p-4 rounded-xl font-mono text-xs space-y-2">
                <p className="text-emerald-400"># 1. Generate RSA upload keystore:</p>
                <p>keytool -genkey -v -keystore ~/agriscan-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias agriscan</p>
                
                <p className="text-emerald-400 mt-2"># 2. Reference in android/key.properties:</p>
                <p>storePassword=yourStorePassword</p>
                <p>keyPassword=yourKeyPassword</p>
                <p>keyAlias=agriscan</p>
                <p>storeFile=/Users/username/agriscan-keystore.jks</p>

                <p className="text-emerald-400 mt-2"># 3. Build optimized 64-bit split APKs:</p>
                <p>flutter build apk --split-per-abi --release</p>
                <p className="text-stone-400"># Outputs: app-arm64-v8a-release.apk (~14 MB with bundled INT8 TFLite model)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: FOLDER STRUCTURE */}
      {activeTab === 'structure' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-emerald-700" />
            Complete Project Directory Architecture
          </h3>

          <div className="bg-stone-900 text-stone-200 p-5 rounded-xl font-mono text-xs leading-loose overflow-x-auto">
            <p className="text-emerald-400 font-bold">agriscan_ghana_fyp/</p>
            <p>├── <span className="text-amber-300">assets/</span></p>
            <p>│   ├── <span className="text-amber-300">models/</span></p>
            <p>│   │   └── crop_disease_int8.tflite    <span className="text-stone-500"># Quantized MobileNetV2 (2.84 MB)</span></p>
            <p>│   ├── labels.txt                     <span className="text-stone-500"># 14 Crop pathology category names</span></p>
            <p>│   └── treatments.json                <span className="text-stone-500"># Seed agronomic treatments catalog</span></p>
            <p>├── <span className="text-amber-300">lib/</span></p>
            <p>│   ├── <span className="text-amber-300">models/</span></p>
            <p>│   │   └── treatment.dart              <span className="text-stone-500"># Treatment & Chemical product models</span></p>
            <p>│   ├── <span className="text-amber-300">screens/</span></p>
            <p>│   │   ├── home_screen.dart           <span className="text-stone-500"># Accessible icon-first dashboard</span></p>
            <p>│   │   ├── diagnosis_screen.dart      <span className="text-stone-500"># Camera viewfinder & capture</span></p>
            <p>│   │   ├── result_screen.dart         <span className="text-stone-500"># Diagnosis & TTS audio readout</span></p>
            <p>│   │   └── history_screen.dart        <span className="text-stone-500"># Local SQLite scan log</span></p>
            <p>│   ├── <span className="text-amber-300">services/</span></p>
            <p>│   │   ├── tflite_service.dart        <span className="text-stone-500"># tflite_flutter inference engine</span></p>
            <p>│   │   └── db_service.dart            <span className="text-stone-500"># sqflite relational persistence</span></p>
            <p>│   └── main.dart                      <span className="text-stone-500"># App entry point & model warmup</span></p>
            <p>├── <span className="text-amber-300">test/</span></p>
            <p>│   ├── widget_test.dart               <span className="text-stone-500"># UI navigation integration tests</span></p>
            <p>│   └── treatment_test.dart            <span className="text-stone-500"># Offline SQLite database unit tests</span></p>
            <p>├── pubspec.yaml                       <span className="text-stone-500"># Version-pinned Flutter dependencies</span></p>
            <p>└── README.md                          <span className="text-stone-500"># Setup & defense documentation</span></p>
          </div>
        </div>
      )}
    </div>
  );
};
