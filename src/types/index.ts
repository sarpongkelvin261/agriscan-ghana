export type CropType =
  | 'maize'
  | 'cassava'
  | 'tomato'
  | 'cocoa'
  | 'plantain'
  | 'yam'
  | 'pepper'
  | 'oil_palm'
  | 'cowpea';

export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type AppLanguage = 'en' | 'twi' | 'ga' | 'ewe' | 'dagbani';

export interface DiseaseInfo {
  id: string;
  name: string;
  localNameTwi: string;
  localNameGa: string;
  localNameEwe?: string;
  localNameDagbani?: string;
  crop: CropType;
  scientificName: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest Infestation' | 'Healthy';
  severity: SeverityLevel;
  symptoms: string[];
  cause: string;
  spreadConditions: string;
  organicTreatment: string[];
  chemicalTreatment: {
    productName: string;
    activeIngredient: string;
    mofaApproved: boolean;
    applicationRate: string;
    safetyPrecautions: string;
  }[];
  prevention: string[];
  description: string;
  realImageUrl?: string;
}

export interface ScanResult {
  id: string;
  timestamp: string;
  crop: CropType;
  diseaseId: string;
  diseaseName: string;
  confidence: number;
  topPredictions: {
    diseaseId: string;
    diseaseName: string;
    confidence: number;
  }[];
  imageUrl: string;
  imageSource: 'camera' | 'upload' | 'sample';
  inferenceLatencyMs: number;
  notes?: string;
  analysisSource?: 'gemini_multimodal_vision' | 'edge_int8_tflite_deterministic';
  visualObservations?: string[];
  pathologyRationale?: string;
  isHealthy?: boolean;
  scientificName?: string;
}

export interface ModelBenchmark {
  modelName: string;
  architecture: string;
  totalParams: number;
  trainableParams: number;
  rawSizeMb: number;
  quantizedSizeMb: number;
  trainingTimeEpochMins: number;
  epochsTrained: number;
  trainAccuracy: number;
  valAccuracy: number;
  testAccuracy: number;
  quantizedTestAccuracy: number;
  precisionMacro: number;
  recallMacro: number;
  f1Macro: number;
  cpuInferenceLatencyMs: number;
  ramUsageMb: number;
  description: string;
}

export interface ClassPerformance {
  className: string;
  crop: CropType;
  sampleCount: number;
  precision: number;
  recall: number;
  f1Score: number;
  accuracy: number;
}

export interface UatParticipant {
  id: string;
  name: string;
  role: 'Smallholder Farmer' | 'MoFA Extension Agent' | 'Input Dealer';
  location: string;
  region: string;
  primaryCrop: string;
  smartphoneExperienceYears: number;
  accuracyRating: number; // 1-5
  easeOfUseRating: number; // 1-5
  clarityOfTreatmentRating: number; // 1-5
  offlineSatisfactionRating: number; // 1-5
  qualitativeFeedback: string;
  date: string;
}

export interface TestCase {
  id: string;
  name: string;
  category: 'Preprocessing' | 'Inference Wrapper' | 'Treatment DB' | 'End-to-End Flow' | 'Quantization Stability';
  description: string;
  expected: string;
  status: 'passed' | 'failed' | 'pending';
  executionTimeMs: number;
  log?: string;
}
