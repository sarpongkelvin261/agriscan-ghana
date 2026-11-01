# AgriScan Ghana: AI-Based Crop Disease Detection Mobile Application (Final Year Project)

> **Offline-First On-Device Crop Disease Diagnosis & Treatment Advisory System for Smallholder Farmers in Ghana**  
> Target Crops: **Maize (*Zea mays*)**, **Cassava (*Manihot esculenta*)**, and **Tomato (*Solanum lycopersicum*)**

---

## 1. Project Overview & Research Context

Smallholder farmers in Ghana face substantial harvest losses (30% to 80%) resulting from foliar diseases such as Northern Corn Leaf Blight, Cassava Mosaic Disease (CMD), Cassava Bacterial Blight (CBB), and Tomato Early/Late Blight. Rural agricultural extension agent ratios in Ghana often exceed 1:1,500, and erratic cellular connectivity renders cloud-dependent AI systems inoperable in remote farming clusters.

**AgriScan Ghana** solves this by implementing an entirely **offline, on-device mobile AI system**. Using an ImageNet-pretrained **MobileNetV2** model compressed via post-training **8-bit integer quantization (INT8)**, the system performs sub-50ms neural inference on low-cost Android hardware (e.g. Tecno, Infinix) without sending any data over the internet. Diagnosis results are paired with Ghana Ministry of Food and Agriculture (MoFA) approved chemical and cultural treatments and localized audio readouts in English, Twi (Akan), and Ga.

---

## 2. System Architecture

```
[Camera Sensor / Gallery]
           │
           ▼
[224x224 RGB Frame Normalization & Quantization Mapping]
           │
           ▼
[TFLite Interpreter: MobileNetV2 INT8 (2.84 MB, ~42ms)]
           │
           ▼
[Softmax Probabilities & Top-3 Diagnostic Ranking]
           │
           ▼
[Local SQLite Agronomy Database (MoFA Registered Treatments)]
           │
           ▼
[Accessible Flutter UI + Localized Voice Readout (Twi / Ga / English)]
```

---

## 3. Directory Structure

```
agriscan_ghana/
├── assets/
│   ├── models/
│   │   └── crop_disease_int8.tflite   # 8-bit quantized winning model (2.84 MB)
│   ├── labels.txt                    # 14 disease & healthy classification labels
│   └── treatments.json               # Seed catalog of MoFA cultural & chemical remedies
├── lib/
│   ├── models/
│   │   └── treatment.dart            # Data models for agronomic recommendations
│   ├── screens/
│   │   ├── home_screen.dart          # High-contrast accessible dashboard
│   │   ├── diagnosis_screen.dart     # Camera viewfinder & image picker
│   │   ├── result_screen.dart        # Diagnostic findings, dosages & TTS voice
│   │   └── history_screen.dart       # Offline local SQLite scan history & CSV export
│   ├── services/
│   │   ├── tflite_service.dart       # tflite_flutter runtime wrapper
│   │   └── db_service.dart           # SQLite (sqflite) relational database manager
│   └── main.dart                     # App entry point & model warmup
├── ml_pipeline/
│   ├── dataset_prep.py               # Merges PlantVillage & CCMT Ghana, 70/15/15 split
│   ├── train_models.py               # MobileNetV2, EfficientNet-B0, Custom CNN training
│   ├── evaluate.py                   # Classification reports, confusion matrix & latency
│   ├── export_tflite.py              # Full INT8 post-training quantization calibration
│   └── requirements.txt              # Pinned Python ML dependencies
├── test/
│   ├── widget_test.dart              # Flutter UI navigation integration tests
│   └── treatment_test.dart           # SQLite treatment lookup unit tests
├── pubspec.yaml                      # Flutter dependencies (tflite_flutter, sqflite, etc.)
└── README.md
```

---

## 4. How to Retrain the Machine Learning Model (Python)

### Step 4.1: Environment Setup
Ensure Python 3.10 or 3.11 is installed:
```bash
cd ml_pipeline
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 4.2: Prepare Data Splits
Place raw datasets in `raw_data/PlantVillage` and `raw_data/CCMT_Ghana`:
```bash
python dataset_prep.py
```
This generates stratified 70% Train, 15% Validation, and 15% Test splits in `dataset_processed/`.

### Step 4.3: Train the Comparative Architectures
```bash
python train_models.py
```
Trains MobileNetV2, EfficientNet-B0, and Custom 4-Block CNN with categorical cross-entropy, Adam optimizer, early stopping, and model checkpointing to `saved_models/`.

### Step 4.4: Evaluate and Benchmark
```bash
python evaluate.py
```
Outputs classification reports, macro F1 metrics, CPU inference latencies, and saves `confusion_matrix.png`.

### Step 4.5: Convert to TensorFlow Lite with Full INT8 Quantization
```bash
python export_tflite.py
```
Executes post-training calibration with 250 Ghanaian field leaf samples, outputting:
- `exported_tflite/crop_disease_int8.tflite` (2.84 MB)
- `exported_tflite/labels.txt`

Copy these artifacts into the Flutter `assets/` folder.

---

## 5. How to Rebuild the Mobile Application (Flutter)

### Prerequisites
- Flutter SDK (>= 3.2.0)
- Android SDK (API level 21 minimum, 34 recommended)

### Step 5.1: Install Dependencies
```bash
flutter pub get
```

### Step 5.2: Run in Debug Mode
```bash
flutter run
```

### Step 5.3: Compile Release Android APK
For examination presentation:
```bash
flutter build apk --debug
# Outputs: build/app/outputs/flutter-apk/app-debug.apk
```

For production signed build:
```bash
flutter build apk --split-per-abi --release
# Outputs: app-arm64-v8a-release.apk
```

---

## 6. How to Run the Test Suite

### Python ML Unit Tests
```bash
pytest test_preprocessing.py test_inference.py
```

### Flutter App Unit & Integration Tests
```bash
flutter test
```

---

## 7. Model Performance Summary (Test Set N=3,627)

| Metric | MobileNetV2 (Winner) | EfficientNet-B0 | Custom CNN Baseline |
|---|---|---|---|
| **Parameters** | 2,425,614 | 4,124,974 | 1,845,134 |
| **FP32 Size** | 14.12 MB | 21.65 MB | 11.20 MB |
| **INT8 Size** | **2.84 MB** (-79.9%) | 5.48 MB | 2.35 MB |
| **Test Accuracy** | **95.8%** | 96.1% | 83.9% |
| **INT8 Accuracy** | **94.6%** (-1.2%) | 94.8% | 81.5% |
| **Macro F1-Score** | **0.956** | 0.960 | 0.833 |
| **Mobile CPU Latency** | **42 ms** | 118 ms | 38 ms |
| **Peak RAM Footprint** | **28 MB** | 62 MB | 22 MB |

---

## 8. Assumptions, Known Limitations & Out-of-Scope Items

1. **Crop Scope**: Restricted strictly to Maize, Cassava, and Tomato. Staple root crops such as Yam, Cocoyam, and Plantain are out of scope for this project phase.
2. **Co-Infection**: The model classifies the single dominant visual pathology. Co-infections (e.g. leaf blight plus caterpillar chewing on the same blade) default to the dominant symptom.
3. **Severe Lighting Glare**: Direct equatorial midday sun can saturate camera sensors; farmers are instructed to shade leaves with their body when capturing images.
4. **Offline Limitation**: Because the app makes zero outbound calls, disease reports cannot be automatically relayed to MoFA unless exported manually via CSV.
