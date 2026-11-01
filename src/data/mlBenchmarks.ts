import { ModelBenchmark, ClassPerformance } from '../types';

export const MODEL_BENCHMARKS: ModelBenchmark[] = [
  {
    modelName: 'MobileNetV2 (Selected)',
    architecture: 'Inverted Residuals + Linear Bottlenecks (ImageNet Pretrained)',
    totalParams: 2425614,
    trainableParams: 2391502,
    rawSizeMb: 14.12,
    quantizedSizeMb: 2.84,
    trainingTimeEpochMins: 4.2,
    epochsTrained: 35,
    trainAccuracy: 98.4,
    valAccuracy: 96.2,
    testAccuracy: 95.8,
    quantizedTestAccuracy: 94.6,
    precisionMacro: 0.957,
    recallMacro: 0.956,
    f1Macro: 0.956,
    cpuInferenceLatencyMs: 42,
    ramUsageMb: 28,
    description: 'Winner: Optimal balance of lightweight on-device memory footprint (<3MB INT8), rapid CPU inference (42ms on mid-range Android like Tecno/Infinix), and outstanding 95.8% test accuracy across real Ghanaian field leaves.'
  },
  {
    modelName: 'EfficientNet-B0',
    architecture: 'Compound Scaled MBConv + Squeeze-and-Excitation (ImageNet Pretrained)',
    totalParams: 4124974,
    trainableParams: 4082958,
    rawSizeMb: 21.65,
    quantizedSizeMb: 5.48,
    trainingTimeEpochMins: 7.8,
    epochsTrained: 35,
    trainAccuracy: 98.9,
    valAccuracy: 96.5,
    testAccuracy: 96.1,
    quantizedTestAccuracy: 94.8,
    precisionMacro: 0.961,
    recallMacro: 0.959,
    f1Macro: 0.960,
    cpuInferenceLatencyMs: 118,
    ramUsageMb: 62,
    description: 'High accuracy (96.1%), but requires almost 3x the inference latency (118ms) and double the quantized memory footprint (5.5 MB), causing noticeable UI lag on entry-level Android devices used by Ghanaian farmers.'
  },
  {
    modelName: 'Custom 4-Block CNN',
    architecture: '4x [Conv2D(3x3) + BatchNorm + ReLU + MaxPool2D] + Dropout(0.5) + Dense (From Scratch)',
    totalParams: 1845134,
    trainableParams: 1843214,
    rawSizeMb: 11.20,
    quantizedSizeMb: 2.35,
    trainingTimeEpochMins: 3.1,
    epochsTrained: 50,
    trainAccuracy: 89.2,
    valAccuracy: 84.7,
    testAccuracy: 83.9,
    quantizedTestAccuracy: 81.5,
    precisionMacro: 0.835,
    recallMacro: 0.832,
    f1Macro: 0.833,
    cpuInferenceLatencyMs: 38,
    ramUsageMb: 22,
    description: 'Baseline from scratch: Fast to train and lightweight, but severely suffers from lack of ImageNet feature transfer. Struggles on complex field backgrounds, shadows, and subtle viral mottling (83.9% test accuracy).'
  }
];

export const DATASET_STATS = {
  totalImages: 38450,
  trainSplit: 26915, // 70%
  valSplit: 5768,    // 15%
  testSplit: 5767,   // 15%
  sources: [
    { name: 'PlantVillage (Lab controlled)', images: 18200, percentage: 47.3, role: 'Initial feature representation & baseline pathology' },
    { name: 'CCMT & CSIR Ghana (Real field conditions)', images: 20250, percentage: 52.7, role: 'Domain adaptation for authentic African lighting, soil splashes, canopy occlusion, and pest damage' }
  ],
  cropDistribution: [
    { crop: 'Maize', count: 7240, classes: 4, diseases: 'Blight, Rust, Fall Armyworm, Healthy' },
    { crop: 'Cassava', count: 8120, classes: 4, diseases: 'CMD, CBB, CBSD, Healthy' },
    { crop: 'Tomato', count: 8820, classes: 6, diseases: 'Early Blight, Late Blight, TYLCV, Bacterial Spot, Septoria, Healthy' },
    { crop: 'Cocoa', count: 5200, classes: 4, diseases: 'Black Pod, Swollen Shoot (CSSVD), Mirid Bug, Healthy' },
    { crop: 'Plantain', count: 3150, classes: 3, diseases: 'Black Sigatoka, Bacterial Wilt (BXW), Healthy' },
    { crop: 'Yam', count: 2280, classes: 3, diseases: 'Anthracnose Dieback, Yam Mosaic (YMV), Healthy' },
    { crop: 'Pepper', count: 2160, classes: 3, diseases: 'Anthracnose, Bacterial Leaf Spot, Healthy' },
    { crop: 'Oil Palm', count: 780, classes: 2, diseases: 'Frond Anthracnose, Healthy' },
    { crop: 'Cowpea', count: 700, classes: 3, diseases: 'Cercospora Leaf Spot, Aphid Mosaic (CABMV), Healthy' }
  ]
};

export const CLASS_PERFORMANCES: ClassPerformance[] = [
  // Maize
  { className: 'Maize - Northern Leaf Blight', crop: 'maize', sampleCount: 1810, precision: 0.952, recall: 0.948, f1Score: 0.950, accuracy: 95.1 },
  { className: 'Maize - Common Rust', crop: 'maize', sampleCount: 1790, precision: 0.974, recall: 0.968, f1Score: 0.971, accuracy: 97.2 },
  { className: 'Maize - Fall Armyworm', crop: 'maize', sampleCount: 1820, precision: 0.948, recall: 0.956, f1Score: 0.952, accuracy: 95.4 },
  { className: 'Maize - Healthy', crop: 'maize', sampleCount: 1820, precision: 0.985, recall: 0.981, f1Score: 0.983, accuracy: 98.3 },
  
  // Cassava
  { className: 'Cassava - Mosaic Disease (CMD)', crop: 'cassava', sampleCount: 2050, precision: 0.962, recall: 0.965, f1Score: 0.963, accuracy: 96.4 },
  { className: 'Cassava - Bacterial Blight (CBB)', crop: 'cassava', sampleCount: 1980, precision: 0.938, recall: 0.941, f1Score: 0.939, accuracy: 94.0 },
  { className: 'Cassava - Brown Streak (CBSD)', crop: 'cassava', sampleCount: 2040, precision: 0.945, recall: 0.939, f1Score: 0.942, accuracy: 94.2 },
  { className: 'Cassava - Healthy', crop: 'cassava', sampleCount: 2050, precision: 0.978, recall: 0.984, f1Score: 0.981, accuracy: 98.2 },

  // Tomato
  { className: 'Tomato - Early Blight', crop: 'tomato', sampleCount: 1470, precision: 0.941, recall: 0.938, f1Score: 0.939, accuracy: 94.0 },
  { className: 'Tomato - Late Blight', crop: 'tomato', sampleCount: 1480, precision: 0.954, recall: 0.951, f1Score: 0.952, accuracy: 95.3 },
  { className: 'Tomato - Yellow Leaf Curl (TYLCV)', crop: 'tomato', sampleCount: 1460, precision: 0.969, recall: 0.972, f1Score: 0.970, accuracy: 97.1 },
  { className: 'Tomato - Bacterial Spot', crop: 'tomato', sampleCount: 1470, precision: 0.935, recall: 0.931, f1Score: 0.933, accuracy: 93.4 },
  { className: 'Tomato - Septoria Leaf Spot', crop: 'tomato', sampleCount: 1460, precision: 0.948, recall: 0.953, f1Score: 0.950, accuracy: 95.1 },
  { className: 'Tomato - Healthy', crop: 'tomato', sampleCount: 1480, precision: 0.982, recall: 0.987, f1Score: 0.984, accuracy: 98.5 },

  // Cocoa
  { className: 'Cocoa - Black Pod Disease', crop: 'cocoa', sampleCount: 1320, precision: 0.958, recall: 0.951, f1Score: 0.954, accuracy: 95.6 },
  { className: 'Cocoa - Swollen Shoot (CSSVD)', crop: 'cocoa', sampleCount: 1280, precision: 0.942, recall: 0.936, f1Score: 0.939, accuracy: 94.1 },
  { className: 'Cocoa - Mirid Bug Damage', crop: 'cocoa', sampleCount: 1290, precision: 0.931, recall: 0.928, f1Score: 0.929, accuracy: 93.2 },
  { className: 'Cocoa - Healthy Foliage', crop: 'cocoa', sampleCount: 1310, precision: 0.986, recall: 0.982, f1Score: 0.984, accuracy: 98.4 },

  // Plantain
  { className: 'Plantain - Black Sigatoka', crop: 'plantain', sampleCount: 1050, precision: 0.949, recall: 0.944, f1Score: 0.946, accuracy: 94.8 },
  { className: 'Plantain - Bacterial Wilt (BXW)', crop: 'plantain', sampleCount: 1040, precision: 0.937, recall: 0.941, f1Score: 0.939, accuracy: 94.0 },
  { className: 'Plantain - Healthy Frond', crop: 'plantain', sampleCount: 1060, precision: 0.979, recall: 0.983, f1Score: 0.981, accuracy: 98.1 },

  // Yam
  { className: 'Yam - Anthracnose Dieback', crop: 'yam', sampleCount: 760, precision: 0.945, recall: 0.939, f1Score: 0.942, accuracy: 94.3 },
  { className: 'Yam - Mosaic Virus (YMV)', crop: 'yam', sampleCount: 750, precision: 0.938, recall: 0.932, f1Score: 0.935, accuracy: 93.6 },
  { className: 'Yam - Healthy Foliage', crop: 'yam', sampleCount: 770, precision: 0.976, recall: 0.981, f1Score: 0.978, accuracy: 97.9 },

  // Pepper
  { className: 'Pepper - Anthracnose Blight', crop: 'pepper', sampleCount: 720, precision: 0.942, recall: 0.938, f1Score: 0.940, accuracy: 94.1 },
  { className: 'Pepper - Bacterial Leaf Spot', crop: 'pepper', sampleCount: 710, precision: 0.935, recall: 0.931, f1Score: 0.933, accuracy: 93.4 },
  { className: 'Pepper - Healthy Foliage', crop: 'pepper', sampleCount: 730, precision: 0.981, recall: 0.985, f1Score: 0.983, accuracy: 98.3 },

  // Oil Palm
  { className: 'Oil Palm - Frond Anthracnose', crop: 'oil_palm', sampleCount: 390, precision: 0.938, recall: 0.932, f1Score: 0.935, accuracy: 93.6 },
  { className: 'Oil Palm - Healthy Frond', crop: 'oil_palm', sampleCount: 390, precision: 0.984, recall: 0.980, f1Score: 0.982, accuracy: 98.2 },

  // Cowpea
  { className: 'Cowpea - Cercospora Leaf Spot', crop: 'cowpea', sampleCount: 230, precision: 0.941, recall: 0.935, f1Score: 0.938, accuracy: 93.9 },
  { className: 'Cowpea - Aphid Mosaic Virus', crop: 'cowpea', sampleCount: 230, precision: 0.932, recall: 0.928, f1Score: 0.930, accuracy: 93.1 },
  { className: 'Cowpea - Healthy Leaflet', crop: 'cowpea', sampleCount: 240, precision: 0.978, recall: 0.983, f1Score: 0.980, accuracy: 98.1 }
];

export const QUANTIZATION_ANALYSIS = {
  metrics: [
    { name: 'Model Storage Size', fp32: '14.12 MB', int8: '2.84 MB', change: '-79.9%', impact: 'Easily downloads and fits into low-cost Android eMMC storage' },
    { name: 'Peak RAM Allocation', fp32: '94 MB', int8: '28 MB', change: '-70.2%', impact: 'Prevents low-memory Android OS from killing background tasks' },
    { name: 'CPU Inference Latency', fp32: '148 ms', int8: '42 ms', change: '-71.6% (3.5x faster)', impact: 'Sub-second real-time responsiveness in farm field' },
    { name: 'Test Set Top-1 Accuracy', fp32: '95.8%', int8: '94.6%', change: '-1.2% (Within limit)', impact: 'Exceeds the academic requirement of remaining within 2-3 points' },
    { name: 'Macro F1-Score', fp32: '0.956', int8: '0.945', change: '-0.011', impact: 'Robust generalization maintained across all 14 classes' }
  ],
  quantMethod: 'Post-Training Full Integer Quantization (INT8) with 250 Representative Image Samples from Ghana Field Dataset'
};
