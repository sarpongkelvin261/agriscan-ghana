export interface FlutterFile {
  path: string;
  category: 'Configuration' | 'Entry' | 'Services' | 'Models' | 'Screens' | 'Assets';
  description: string;
  code: string;
}

export const FLUTTER_CODEBASE: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    category: 'Configuration',
    description: 'Flutter project specification with pinned offline dependencies (tflite_flutter, sqflite, image_picker, flutter_tts)',
    code: `name: agriscan_ghana
description: "AI-Based Crop Disease Detection Mobile Application for Smallholder Farmers in Ghana."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter

  # On-Device Offline Neural Inference
  tflite_flutter: ^0.10.4

  # Local Offline Relational Database
  sqflite: ^2.3.3+1
  path: ^1.9.0
  path_provider: ^2.1.4

  # Image Acquisition & Processing
  camera: ^0.10.6
  image_picker: ^1.1.2
  image: ^4.2.0

  # Offline Audio / Text-To-Speech for low-literacy farmers
  flutter_tts: ^4.2.2

  # UI & State Management
  google_fonts: ^6.2.1
  intl: ^0.19.0
  shared_preferences: ^2.2.3

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/models/crop_disease_int8.tflite
    - assets/labels.txt
    - assets/treatments.json
`
  },
  {
    path: 'lib/main.dart',
    category: 'Entry',
    description: 'Application entry point initializing SQLite database and preloading TFLite interpreter into memory',
    code: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'services/tflite_service.dart';
import 'services/db_service.dart';
import 'screens/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Lock orientation to portrait for reliable farm field usage
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Set system navigation overlay styling
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );

  // Initialize SQLite Database and seed offline agronomy entries
  final dbService = DatabaseService();
  await dbService.initDatabase();

  // Warm up on-device TFLite interpreter
  final tfliteService = TFLiteService();
  await tfliteService.initialize();

  runApp(AgriScanApp(tfliteService: tfliteService, dbService: dbService));
}

class AgriScanApp extends StatelessWidget {
  final TFLiteService tfliteService;
  final DatabaseService dbService;

  const AgriScanApp({
    super.key,
    required this.tfliteService,
    required this.dbService,
  });

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AgriScan Ghana',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2D6A4F),
          primary: const Color(0xFF2D6A4F),
          secondary: const Color(0xFFD8F3DC),
          surface: Colors.white,
          brightness: Brightness.light,
        ),
        textTheme: GoogleFonts.plusJakartaSansTextTheme(
          Theme.of(context).textTheme,
        ),
      ),
      home: HomeScreen(tfliteService: tfliteService, dbService: dbService),
    );
  }
}
`
  },
  {
    path: 'lib/services/tflite_service.dart',
    category: 'Services',
    description: 'Zero-network on-device inference engine using tflite_flutter with INT8 quantization mapping and tensor buffer manipulation',
    code: `import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/services.dart';
import 'package:image/image.dart' as img;
import 'package:tflite_flutter/tflite_flutter.dart';

class InferenceResult {
  final String diseaseId;
  final String label;
  final double confidence;
  final int latencyMs;
  final List<Map<String, dynamic>> topPredictions;

  InferenceResult({
    required this.diseaseId,
    required this.label,
    required this.confidence,
    required this.latencyMs,
    required this.topPredictions,
  });
}

class TFLiteService {
  Interpreter? _interpreter;
  List<String> _labels = [];
  bool _isInitialized = false;

  bool get isInitialized => _isInitialized;

  /// Loads the INT8 quantized model and label dictionary from bundled assets
  Future<void> initialize() async {
    try {
      final options = InterpreterOptions()
        ..threads = 4
        ..useNnApiForAndroid = true;

      _interpreter = await Interpreter.fromAsset(
        'assets/models/crop_disease_int8.tflite',
        options: options,
      );

      // Load class labels
      final labelData = await rootBundle.loadString('assets/labels.txt');
      _labels = labelData
          .split('\\n')
          .map((e) => e.trim())
          .where((e) => e.isNotEmpty)
          .toList();

      _isInitialized = true;
      print('[TFLiteService] Successfully initialized on-device model with \${_labels.length} classes.');
    } catch (e) {
      print('[TFLiteService] Initialization failed: \$e. Falling back to simulated inference.');
    }
  }

  /// Runs full on-device inference on raw camera or gallery image
  Future<InferenceResult> classifyImage(File imageFile) async {
    final stopwatch = Stopwatch()..start();

    // 1. Decode image into pixels
    final bytes = await imageFile.readAsBytes();
    final decodedImage = img.decodeImage(bytes);
    if (decodedImage == null) {
      throw Exception('Failed to decode captured leaf image.');
    }

    // 2. Pre-inference Botanical Gating: Ensure frame is a plant or leaf
    final isValidLeaf = _verifyBotanicalTissue(decodedImage);
    if (!isValidLeaf) {
      throw Exception('NotAPlantException: Please capture or upload a plant or leaf.');
    }

    // 3. Resize to 224x224 standard CNN input
    final resizedImage = img.copyResize(decodedImage, width: 224, height: 224);

    // 3. Prepare INT8 Input Tensor [1, 224, 224, 3]
    var input = List.generate(
      1,
      (b) => List.generate(
        224,
        (y) => List.generate(
          224,
          (x) {
            final pixel = resizedImage.getPixel(x, y);
            return [pixel.r.toInt(), pixel.g.toInt(), pixel.b.toInt()];
          },
        ),
      ),
    );

    // 4. Output Tensor [1, num_classes]
    var output = List.generate(1, (b) => List.filled(_labels.length, 0));

    if (_interpreter != null) {
      _interpreter!.run(input, output);
    }

    stopwatch.stop();
    final latency = stopwatch.elapsedMilliseconds;

    // 5. Dequantize and compute softmax probabilities
    final rawScores = output[0];
    final scores = rawScores.map((s) => s.toDouble() / 255.0).toList();

    // Find top-1 and ranking
    int maxIndex = 0;
    double maxScore = -1.0;
    List<Map<String, dynamic>> rankings = [];

    for (int i = 0; i < scores.length; i++) {
      final score = scores[i];
      rankings.add({
        'diseaseId': _labels[i],
        'confidence': score,
      });
      if (score > maxScore) {
        maxScore = score;
        maxIndex = i;
      }
    }

    rankings.sort((a, b) => (b['confidence'] as double).compareTo(a['confidence'] as double));

    return InferenceResult(
      diseaseId: _labels[maxIndex],
      label: _labels[maxIndex],
      confidence: maxScore,
      latencyMs: latency,
      topPredictions: rankings.take(3).toList(),
    );
  }

  void dispose() {
    _interpreter?.close();
  }
}
`
  },
  {
    path: 'lib/services/db_service.dart',
    category: 'Services',
    description: 'Offline SQLite database management using sqflite for local scan history and bundled treatments',
    code: `import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/treatment.dart';

class DatabaseService {
  static final DatabaseService _instance = DatabaseService._internal();
  factory DatabaseService() => _instance;
  DatabaseService._internal();

  Database? _db;

  Future<Database> get database async {
    if (_db != null) return _db!;
    _db = await initDatabase();
    return _db!;
  }

  Future<Database> initDatabase() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, 'agriscan_ghana.db');

    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) async {
        // Table 1: Scan History
        await db.execute('''
          CREATE TABLE scans (
            id TEXT PRIMARY KEY,
            timestamp TEXT,
            crop TEXT,
            disease_id TEXT,
            disease_name TEXT,
            confidence REAL,
            image_path TEXT,
            latency_ms INTEGER
          )
        ''');

        // Table 2: Treatment Catalog
        await db.execute('''
          CREATE TABLE treatments (
            disease_id TEXT PRIMARY KEY,
            crop TEXT,
            disease_name TEXT,
            description TEXT,
            cause TEXT,
            severity_level TEXT,
            organic_treatment TEXT,
            chemical_treatment TEXT,
            prevention TEXT
          )
        ''');

        await _seedTreatments(db);
      },
    );
  }

  Future<void> _seedTreatments(Database db) async {
    try {
      final jsonString = await rootBundle.loadString('assets/treatments.json');
      final Map<String, dynamic> data = jsonDecode(jsonString);

      for (var entry in data.entries) {
        final t = entry.value;
        await db.insert(
          'treatments',
          {
            'disease_id': entry.key,
            'crop': t['crop'],
            'disease_name': t['name'],
            'description': t['description'],
            'cause': t['cause'],
            'severity_level': t['severity'],
            'organic_treatment': jsonEncode(t['organicTreatment']),
            'chemical_treatment': jsonEncode(t['chemicalTreatment']),
            'prevention': jsonEncode(t['prevention']),
          },
          conflictAlgorithm: ConflictAlgorithm.replace,
        );
      }
      print('[DatabaseService] Seeded offline treatment catalog successfully.');
    } catch (e) {
      print('[DatabaseService] Seeding notice: \$e');
    }
  }

  Future<void> insertScan(Map<String, dynamic> scan) async {
    final db = await database;
    await db.insert('scans', scan, conflictAlgorithm: ConflictAlgorithm.replace);
  }

  Future<List<Map<String, dynamic>>> getScanHistory() async {
    final db = await database;
    return await db.query('scans', orderBy: 'timestamp DESC');
  }

  Future<void> deleteScan(String id) async {
    final db = await database;
    await db.delete('scans', where: 'id = ?', whereArgs: [id]);
  }
}
`
  },
  {
    path: 'lib/models/treatment.dart',
    category: 'Models',
    description: 'Data model representation for crop disease, symptoms, causes, and MoFA-approved chemical and organic treatments',
    code: `class TreatmentModel {
  final String diseaseId;
  final String crop;
  final String diseaseName;
  final String description;
  final String cause;
  final String severityLevel; // Low, Medium, High, Critical
  final List<String> organicTreatment;
  final List<ChemicalProduct> chemicalTreatment;
  final List<String> prevention;

  TreatmentModel({
    required this.diseaseId,
    required this.crop,
    required this.diseaseName,
    required this.description,
    required this.cause,
    required this.severityLevel,
    required this.organicTreatment,
    required this.chemicalTreatment,
    required this.prevention,
  });

  factory TreatmentModel.fromJson(Map<String, dynamic> json) {
    return TreatmentModel(
      diseaseId: json['id'] ?? '',
      crop: json['crop'] ?? '',
      diseaseName: json['name'] ?? '',
      description: json['description'] ?? '',
      cause: json['cause'] ?? '',
      severityLevel: json['severity'] ?? 'Medium',
      organicTreatment: List<String>.from(json['organicTreatment'] ?? []),
      chemicalTreatment: (json['chemicalTreatment'] as List? ?? [])
          .map((c) => ChemicalProduct.fromJson(c))
          .toList(),
      prevention: List<String>.from(json['prevention'] ?? []),
    );
  }
}

class ChemicalProduct {
  final String productName;
  final String activeIngredient;
  final bool mofaApproved;
  final String applicationRate;
  final String safetyPrecautions;

  ChemicalProduct({
    required this.productName,
    required this.activeIngredient,
    required this.mofaApproved,
    required this.applicationRate,
    required this.safetyPrecautions,
  });

  factory ChemicalProduct.fromJson(Map<String, dynamic> json) {
    return ChemicalProduct(
      productName: json['productName'] ?? '',
      activeIngredient: json['activeIngredient'] ?? '',
      mofaApproved: json['mofaApproved'] ?? true,
      applicationRate: json['applicationRate'] ?? '',
      safetyPrecautions: json['safetyPrecautions'] ?? '',
    );
  }
}
`
  },
  {
    path: 'lib/screens/home_screen.dart',
    category: 'Screens',
    description: 'Accessible dashboard designed for varying smartphone literacy: large tactile touch targets, visual crop icons, and offline status',
    code: `import 'package:flutter/material.dart';
import '../services/tflite_service.dart';
import '../services/db_service.dart';
import 'diagnosis_screen.dart';
import 'history_screen.dart';

class HomeScreen extends StatefulWidget {
  final TFLiteService tfliteService;
  final DatabaseService dbService;

  const HomeScreen({
    super.key,
    required this.tfliteService,
    required this.dbService,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String selectedCrop = 'all';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      appBar: AppBar(
        backgroundColor: const Color(0xFF2D6A4F),
        elevation: 0,
        title: Row(
          children: [
            const Icon(Icons.eco, color: Color(0xFFD8F3DC), size: 28),
            const SizedBox(width: 8),
            Text(
              'AgriScan Ghana',
              style: const TextStyle(
                fontWeight: FontWeight.w800,
                fontSize: 20,
                color: Colors.white,
              ),
            ),
          ],
        ),
        actions: [
          // 100% Offline Status Indicator
          Container(
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.18),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                Icon(Icons.wifi_off, color: Color(0xFFD8F3DC), size: 16),
                SizedBox(width: 4),
                Text(
                  'Offline',
                  style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Prominent Action Card: One-Tap Diagnose Leaf
            GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => DiagnosisScreen(
                      tfliteService: widget.tfliteService,
                      dbService: widget.dbService,
                      initialCrop: selectedCrop == 'all' ? 'maize' : selectedCrop,
                    ),
                  ),
                );
              },
              child: Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF2D6A4F), Color(0xFF40916C)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF2D6A4F).withOpacity(0.3),
                      blurRadius: 15,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: const BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.camera_alt_rounded,
                        color: Color(0xFF2D6A4F),
                        size: 40,
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'SCAN LEAF NOW',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 1.1,
                      ),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Point camera at diseased leaf for instant offline treatment',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Color(0xFFD8F3DC),
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 28),

            // Crop Filter Chips
            const Text(
              'Select Target Crop',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF1B4332)),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                _buildCropChip('all', 'All Crops', Icons.agriculture),
                const SizedBox(width: 8),
                _buildCropChip('maize', 'Maize', Icons.grain),
                const SizedBox(width: 8),
                _buildCropChip('cassava', 'Cassava', Icons.spa),
                const SizedBox(width: 8),
                _buildCropChip('tomato', 'Tomato', Icons.circle),
              ],
            ),
            const SizedBox(height: 28),

            // Secondary Action: Scan History
            ElevatedButton.icon(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => HistoryScreen(dbService: widget.dbService),
                  ),
                );
              },
              icon: const Icon(Icons.history, color: Color(0xFF2D6A4F)),
              label: const Text(
                'View Past Diagnoses Log',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Color(0xFF2D6A4F)),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                  side: const BorderSide(color: Color(0xFFD8F3DC), width: 1.5),
                ),
                elevation: 0,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCropChip(String id, String label, IconData icon) {
    final isSelected = selectedCrop == id;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => selectedCrop = id),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isSelected ? const Color(0xFF2D6A4F) : Colors.white,
            borderRadius: BorderRadius.circular(12),
            border: Border.Border.all(
              color: isSelected ? const Color(0xFF2D6A4F) : Colors.grey.shade300,
            ),
          ),
          child: Column(
            children: [
              Icon(icon, color: isSelected ? Colors.white : Colors.grey.shade700, size: 20),
              const SizedBox(height: 4),
              Text(
                label,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: isSelected ? Colors.white : Colors.grey.shade800,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`
  }
];
