import { DiseaseInfo, CropType } from '../types';

export const DISEASES_DATABASE: Record<string, DiseaseInfo> = {
  'maize_blight': {
    id: 'maize_blight',
    name: 'Northern Corn Leaf Blight',
    localNameTwi: 'Aburo Ahaban Yareɛ (Blight)',
    localNameGa: 'Ablɛ Ba Yɛlɛ',
    crop: 'maize',
    scientificName: 'Exserohilum turcicum (syn. Helminthosporium turcicum)',
    pathogenType: 'Fungal',
    severity: 'High',
    description: 'A devastating fungal disease prevalent in high humidity zones of Ghana (e.g. Ashanti, Eastern, Brong-Ahafo regions). Causes elongated grayish-green to tan cigar-shaped lesions on leaves, reducing photosynthetic area by up to 60%.',
    symptoms: [
      'Long, elliptical, grayish-green or tan lesions (cigar-shaped) 2.5 to 15 cm long',
      'Lesions typically start on lower leaves and progress upward towards the tassel',
      'Under moist humid conditions, dark fungal spore masses develop within lesion centers',
      'Leaves eventually become withered, dry, and brittle prematurely'
    ],
    cause: 'Fungus survives in crop debris and spores are dispersed by wind and splashing rain during humid, warm (18°C–27°C) weather.',
    spreadConditions: 'Prolonged dew, moderate temperatures (18°C–27°C), overhead rainfall splash, and continuous maize monoculture.',
    organicTreatment: [
      'Immediately rogue and incinerate severely infected lower leaves before spores disperse to upper canopy.',
      'Spray neem leaf extract or seed oil emulsion (50ml neem oil + 10ml liquid detergent per 15L knapsack) every 7–10 days.',
      'Intercrop with legumes like cowpea or groundnut to enhance air circulation and soil fertility.'
    ],
    chemicalTreatment: [
      {
        productName: 'Mancozeb 80% WP (e.g., Ivory 80 WP / Dithane M-45)',
        activeIngredient: 'Mancozeb 800 g/kg',
        mofaApproved: true,
        applicationRate: '50g - 60g per 15L knapsack sprayer (approx. 2kg/ha)',
        safetyPrecautions: 'Wear PPE (gloves, mask). Observe 14-day pre-harvest interval (PHI). Do not spray within 6 hours of expected rain.'
      },
      {
        productName: 'Azoxystrobin + Difenoconazole (e.g., Amistar Top)',
        activeIngredient: 'Azoxystrobin 200 g/L + Difenoconazole 125 g/L',
        mofaApproved: true,
        applicationRate: '15ml - 20ml per 15L knapsack sprayer (approx. 0.5L/ha)',
        safetyPrecautions: 'Apply at early symptom detection. Do not exceed 2 sprays per cropping season to prevent resistance.'
      }
    ],
    prevention: [
      'Plant MoFA / CSIR-CRI certified resistant maize hybrid varieties (e.g. Omankwa, Abontem, or Wang-Dataa).',
      'Practice minimum 2-year crop rotation with non-host crops (cassava, cowpea, or soybean).',
      'Deep plow maize stubble immediately following harvest to bury fungal inocula at least 15cm.'
    ]
  },

  'maize_rust': {
    id: 'maize_rust',
    name: 'Common Maize Rust',
    localNameTwi: 'Aburo Nkokorɔ Yareɛ (Rust)',
    localNameGa: 'Ablɛ Tsuru Yɛlɛ',
    crop: 'maize',
    scientificName: 'Puccinia sorghi',
    pathogenType: 'Fungal',
    severity: 'Medium',
    description: 'Common fungal infection recognized by small, golden-brown to cinnamon-brown powdery pustules scattered across both the upper and lower leaf surfaces.',
    symptoms: [
      'Small, circular to elongated powdery pustules (uredinia) on both leaf surfaces',
      'Pustules erupt through the leaf epidermis, releasing reddish-brown airborne spores',
      'Chlorotic halos surrounding older pustules; heavily infected leaves turn yellow and scorch',
      'Stunted cob development and reduced grain filling if infection occurs before silking'
    ],
    cause: 'Airborne fungal spores (urediniospores) carried over long distances by prevailing monsoon winds across West Africa.',
    spreadConditions: 'High relative humidity (>90%) with cool to moderate temperatures (16°C–24°C) common during the major raining season in southern Ghana.',
    organicTreatment: [
      'Dust with sifted wood ash early in the morning when leaves are dewy to create an alkaline surface hostile to fungal spores.',
      'Apply diluted fermented cow urine or garlic-ginger spray (1:10 ratio with water) as an organic antifungal preventative.',
      'Ensure adequate plant spacing (75cm x 40cm with 2 plants per hill) to lower canopy micro-humidity.'
    ],
    chemicalTreatment: [
      {
        productName: 'Mancozeb 80% WP (Ivory / Suncozeb)',
        activeIngredient: 'Mancozeb 800 g/kg',
        mofaApproved: true,
        applicationRate: '50g per 15L knapsack sprayer',
        safetyPrecautions: 'Apply at first sign of rust pustules. Repeat after 10-14 days if cool humid weather persists.'
      },
      {
        productName: 'Tebuconazole 250 EC (e.g., Folicur)',
        activeIngredient: 'Tebuconazole 250 g/L',
        mofaApproved: true,
        applicationRate: '20ml per 15L knapsack sprayer',
        safetyPrecautions: 'Wear full protective gear. Wash hands and face with soap after application. Keep animals away for 48 hours.'
      }
    ],
    prevention: [
      'Plant certified rust-tolerant maize cultivars recommended by local MoFA Agriculture Extension Agents (AEAs).',
      'Avoid late planting; plant with the first reliable rains of the season.',
      'Maintain balanced soil fertility—avoid excessive nitrogen fertilization which creates lush susceptible foliage.'
    ]
  },

  'maize_armyworm': {
    id: 'maize_armyworm',
    name: 'Fall Armyworm Feeding Damage',
    localNameTwi: 'Aburo Mmoawa Bɔne (Armyworm)',
    localNameGa: 'Ablɛ Kɔkɔdabi',
    crop: 'maize',
    scientificName: 'Spodoptera frugiperda',
    pathogenType: 'Pest Infestation',
    severity: 'Critical',
    description: 'Invasive caterpillar pest across Ghana that attacks the whorl, tassels, and developing ears of maize. Can wipe out entire fields within 72 hours if left unmanaged.',
    symptoms: [
      'Extensive window-pane chewing on tender whorl leaves giving a ragged, shotgun appearance',
      'Large clumps of moist yellowish-brown sawdust-like frass (caterpillar excrement) deep inside the whorl',
      'Central growing point cut or destroyed, resulting in deadheart syndrome',
      'Larva with inverted "Y" shape on the head capsule and 4 distinct square-patterned spots on the 8th abdominal segment'
    ],
    cause: 'Larvae of the nocturnal moth Spodoptera frugiperda feed aggressively on young corn tissue.',
    spreadConditions: 'Dry spells following early rains promote rapid adult moth migration and egg deposition; warm temperatures accelerate caterpillar growth cycles.',
    organicTreatment: [
      'Hand-drop a pinch of dry fine river sand or wood ash mixed with ground hot pepper directly into the maize whorl to desiccate young caterpillars.',
      'Manual crushing of egg masses and early-instar larvae during routine scouting.',
      'Spray Bacillus thuringiensis (Bt) microbial suspension or Neem Seed Kernel Extract (5% w/v) early in the morning or late afternoon.'
    ],
    chemicalTreatment: [
      {
        productName: 'Emamectin Benzoate 5% SG (e.g., Bypel / Attack / Proclaim)',
        activeIngredient: 'Emamectin benzoate 50 g/kg',
        mofaApproved: true,
        applicationRate: '10g - 15g per 15L knapsack sprayer (deliver spray nozzle straight into whorl)',
        safetyPrecautions: 'MoFA government campaign approved. Use hollow cone nozzle directed down into whorl. Spray late in afternoon when larvae feed.'
      },
      {
        productName: 'Chlorantraniliprole 200 SC (e.g., Coragen)',
        activeIngredient: 'Chlorantraniliprole 200 g/L',
        mofaApproved: true,
        applicationRate: '6ml per 15L knapsack sprayer',
        safetyPrecautions: 'Highly effective with low mammalian toxicity. Rotate with Emamectin Benzoate to avoid pesticide resistance.'
      }
    ],
    prevention: [
      'Scout 20 plants across 5 spots in a W-pattern weekly starting 1 week after germination.',
      'Push-pull intercropping system: intercrop maize with Desmodium (repellent) and surround with Napier grass (trap crop).',
      'Synchronized planting within farming communities to avoid staggered food sources for moths.'
    ]
  },

  'maize_healthy': {
    id: 'maize_healthy',
    name: 'Healthy Maize Leaf',
    localNameTwi: 'Aburo Ahaban Bɔkɔɔ (Ahaban Pa)',
    localNameGa: 'Ablɛ Ba Kpakpa',
    crop: 'maize',
    scientificName: 'Zea mays',
    pathogenType: 'Healthy',
    severity: 'Low',
    description: 'Vigorous, rich green leaf with smooth margins, clear linear venation, and zero signs of chlorosis, necrosis, or pest gnawing.',
    symptoms: [
      'Uniform emerald or deep green coloration across the entire leaf blade',
      'Firm leaf tissue with intact margins and healthy midrib',
      'No lesions, discoloration, rust pustules, or insect frass present',
      'Normal upright leaf angle maximizing solar interception'
    ],
    cause: 'Optimal nutrient balance, adequate soil moisture, and robust defense genetics.',
    spreadConditions: 'N/A - Healthy plant.',
    organicTreatment: [
      'Continue regular weeding and mulching around plant bases to conserve moisture.',
      'Apply composted manure or liquid fish amino fertilizer at vegetative stage to sustain vigor.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Maintain split fertilizer application: NPK 15-15-15 at planting followed by Urea / Sulfate of Ammonia at 4-6 weeks.',
      'Monitor fields twice weekly to detect any emergent pest or disease early.'
    ]
  },

  // CASSAVA DISEASES
  'cassava_cmd': {
    id: 'cassava_cmd',
    name: 'Cassava Mosaic Disease (CMD)',
    localNameTwi: 'Bankye Ahaban Nyane Yareɛ (Mosaic)',
    localNameGa: 'Agbelie Ba Yɛlɛ',
    crop: 'cassava',
    scientificName: 'African cassava mosaic virus (ACMV) / East African cassava mosaic virus (EACMV)',
    pathogenType: 'Viral',
    severity: 'High',
    description: 'The most widespread cassava viral disease in Ghana, causing leaf distortion, chlorotic mottling, and severe root yield loss up to 80%. Transmitted by the whitefly vector and infected stem cuttings.',
    symptoms: [
      'Characteristic mosaic pattern of bright yellow or pale green patches contrasting with normal green',
      'Severe distortion, curling, crumpling, and narrowing of leaf lobes',
      'Marked stunting of the entire cassava plant with shortened internodes',
      'Underdeveloped, woody, and severely reduced storage root yield at harvest'
    ],
    cause: 'Cassava mosaic geminiviruses transmitted persistently by Bemisia tabaci (whitefly) and propagated via vegetatively infected stem cuttings.',
    spreadConditions: 'High whitefly populations during dry warm spells; farmers planting uncertified stem cuttings taken from infected stands.',
    organicTreatment: [
      'Promptly uproot (rogue) and burn diseased plants younger than 3 months to prevent whitefly vector spreading virus to neighbors.',
      'Spray neem leaf water extract or sticky yellow insect traps around borders to reduce whitefly vector density.',
      'Never prune diseased leaves thinking it cures the plant—the virus is systemic throughout the sap.'
    ],
    chemicalTreatment: [
      {
        productName: 'Acetamiprid 20% SP (e.g., Goldcel / Acetastar)',
        activeIngredient: 'Acetamiprid 200 g/kg',
        mofaApproved: true,
        applicationRate: '10g - 15g per 15L knapsack sprayer',
        safetyPrecautions: 'Target whitefly vectors on the undersides of young apical leaves. Do not spray during peak bee foraging.'
      },
      {
        productName: 'Imidacloprid 200 SL (e.g., Confidor / Predator)',
        activeIngredient: 'Imidacloprid 200 g/L',
        mofaApproved: true,
        applicationRate: '15ml per 15L knapsack sprayer',
        safetyPrecautions: 'Systemic insecticide. Wear chemical-resistant gloves and face shield.'
      }
    ],
    prevention: [
      'Plant only CSIR-CRI improved virus-resistant cassava varieties (e.g., Bankyehemaa, Ampong, Sika Bankye, Otuhia, Doku Duwaso).',
      'Obtain clean, virus-free certified stem planting material from certified MoFA/seed nurseries.',
      'Maintain strict farm hygiene: rogue any plant showing mosaic symptoms within the first 60 days of sprouting.'
    ]
  },

  'cassava_cbb': {
    id: 'cassava_cbb',
    name: 'Cassava Bacterial Blight (CBB)',
    localNameTwi: 'Bankye Nsuo-Bacterial Blight',
    localNameGa: 'Agbelie Nsu Yɛlɛ',
    crop: 'cassava',
    scientificName: 'Xanthomonas axonopodis pv. manihotis',
    pathogenType: 'Bacterial',
    severity: 'Critical',
    description: 'Destructive bacterial vascular infection common in wet rainforest and transition zones of Ghana, causing angular leaf spots, gum exudation on stems, systemic wilting, and tip dieback.',
    symptoms: [
      'Angular, water-soaked spots on the underside of leaves that enlarge and turn brown with yellow halo',
      'Leaves wilt rapidly, turn brown, dry out and cling to stems instead of dropping cleanly',
      'Amber-colored gum droplets oozing from leaf petioles and infected green stems',
      'Extensive dieback of stem shoots ("candle-stick" appearance of leafless dead stems)'
    ],
    cause: 'Bacterium penetrates via stomata or wounds made by insects and farm implements; dispersed rapidly by wind-driven rain.',
    spreadConditions: 'Warm temperatures (25°C–30°C) combined with heavy rainfall, high humidity, and poor farm tool sanitation.',
    organicTreatment: [
      'Prune and burn infected shoots with clean, sterilized cutlasses (sterilize cutlass blade with 70% alcohol or flame between cuts).',
      'Dust copper-rich wood ash or spray dilute Bordeaux mixture as an organic bactericide barrier.',
      'Avoid entering the field when foliage is wet to prevent spreading bacteria on clothes and machetes.'
    ],
    chemicalTreatment: [
      {
        productName: 'Copper Hydroxide 77% WP (e.g., Kocide 2000 / Champ DP)',
        activeIngredient: 'Copper hydroxide 538 g/kg',
        mofaApproved: true,
        applicationRate: '40g - 50g per 15L knapsack sprayer',
        safetyPrecautions: 'Bactericidal protective spray. Apply early morning. Do not inhale dust while mixing. Highly toxic to fish—keep away from streams.'
      }
    ],
    prevention: [
      'Use certified disease-free stem cuttings taken only from the middle third of healthy mature plants.',
      'Sterilize all cutting tools (cutlasses, knives) with diluted bleach (1:10) before and during stem preparation.',
      'Practice crop rotation and fallow fields with velvet bean (Mucuna) for at least one season.'
    ]
  },

  'cassava_cbsd': {
    id: 'cassava_cbsd',
    name: 'Cassava Brown Streak Disease (CBSD)',
    localNameTwi: 'Bankye Kɔkɔɔ Yareɛ (Brown Streak)',
    localNameGa: 'Agbelie Tsuru Yɛlɛ',
    crop: 'cassava',
    scientificName: 'Cassava brown streak virus (CBSV) / Ugandan cassava brown streak virus (UCBSV)',
    pathogenType: 'Viral',
    severity: 'Critical',
    description: 'An insidious virus termed the "thief in the field" because foliage symptoms can be subtle while the underground tubers suffer dry brown corky necrosis, rendering them totally inedible and unmarketable.',
    symptoms: [
      'Yellow chlorosis along secondary vein margins creating a feathery yellow pattern on mature leaves',
      'Brown, elongated necrotic lesions and streaks on green stems and leaf petioles',
      'Dieback of terminal buds and young shoot branches',
      'Severe dry, brown, corky rot inside the storage root flesh discovered only upon harvesting'
    ],
    cause: 'Ipomovirus transmitted by whiteflies and transported via infected vegetative stem cuttings.',
    spreadConditions: 'Sub-Saharan whitefly super-abundances, transport of uninspected cassava stems across regional borders.',
    organicTreatment: [
      'Zero cure exists once a plant is infected—uproot and incinerate infected stands immediately.',
      'Establish clean nursery plots far away from older cassava plantations.',
      'Harvest early if CBSD symptoms appear to salvage unaffected roots before root necrosis intensifies.'
    ],
    chemicalTreatment: [
      {
        productName: 'Lambda-Cyhalothrin + Thiamethoxam (e.g., Karate Zeon / Engeo)',
        activeIngredient: 'Thiamethoxam 141 g/L + Lambda-cyhalothrin 106 g/L',
        mofaApproved: true,
        applicationRate: '15ml per 15L knapsack sprayer',
        safetyPrecautions: 'Vector control only. Apply to border plants to deter incoming whitefly vectors.'
      }
    ],
    prevention: [
      'Plant dual CMD/CBSD resistant varieties released by CSIR-Crops Research Institute Fumesua.',
      'Quarantine and inspect all stem bundles entering the farming community.',
      'Educate community farmers to identify early feathery chlorosis.'
    ]
  },

  'cassava_healthy': {
    id: 'cassava_healthy',
    name: 'Healthy Cassava Leaf',
    localNameTwi: 'Bankye Ahaban Bɔkɔɔ (Ahaban Pa)',
    localNameGa: 'Agbelie Ba Kpakpa',
    crop: 'cassava',
    scientificName: 'Manihot esculenta',
    pathogenType: 'Healthy',
    severity: 'Low',
    description: 'Vigorous palmate compound leaf with symmetrical 5 to 9 deep green lobes, erect petioles, and robust tuber development.',
    symptoms: [
      'Uniform green coloration with smooth, flat, unwrinkled lobes',
      'Clean red, green, or purple petiole with no necrotic streaks',
      'Underside of leaves free of whiteflies, mealybugs, and honeydew mold',
      'Normal leaf expansion and natural canopy architecture'
    ],
    cause: 'Clean planting material, fertile loamy soil, adequate rainfall, and low pest pressure.',
    spreadConditions: 'N/A - Healthy crop.',
    organicTreatment: [
      'Continue standard field weed management during the critical first 3-4 months until canopy closes.',
      'Apply organic mulch to retain soil moisture during the dry harmattan season.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Continue selecting planting material exclusively from these healthy stands for the next season.'
    ]
  },

  // TOMATO DISEASES
  'tomato_early_blight': {
    id: 'tomato_early_blight',
    name: 'Tomato Early Blight',
    localNameTwi: 'Ntoosi Ahaban Blight (Early Blight)',
    localNameGa: 'Amɛŋmɛ Ba Yɛlɛ',
    crop: 'tomato',
    scientificName: 'Alternaria solani',
    pathogenType: 'Fungal',
    severity: 'Medium',
    description: 'A major foliar disease in Ghanaian tomato hubs (Derma, Tuobodom, Akomadan, Ada). Known by distinctive dark concentric rings forming a "bullseye" or target-board pattern on leaves.',
    symptoms: [
      'Circular brown to black spots with concentric rings resembling a target or bullseye',
      'Yellow chlorotic halo surrounding individual leaf spots',
      'Lesions enlarge up to 1.5 cm and cause the entire lower leaf to turn yellow, brown, and drop',
      'Sunken, leathery dark lesions on the stem end of fruits and seedlings collar rot'
    ],
    cause: 'Fungus survives in soil debris and solanaceous weeds (e.g., black nightshade); spores splash onto lower foliage.',
    spreadConditions: 'Alternating wet and dry periods, warm temperatures (24°C–29°C), and high humidity.',
    organicTreatment: [
      'Prune all lower leaves touching or within 20cm of the soil to eliminate splash contamination.',
      'Apply dry straw or plastic mulch beneath plants to block soil-to-leaf rain splash.',
      'Spray baking soda solution (1 tablespoon baking soda + 1 teaspoon soap per 4L water) or neem seed oil.'
    ],
    chemicalTreatment: [
      {
        productName: 'Mancozeb 80% WP (e.g., Ivory 80 WP / Dithane)',
        activeIngredient: 'Mancozeb 800 g/kg',
        mofaApproved: true,
        applicationRate: '40g - 50g per 15L knapsack sprayer',
        safetyPrecautions: 'Preventative contact fungicide. Spray every 7 days during rainy spells. 7-day PHI.'
      },
      {
        productName: 'Difenoconazole 250 EC (e.g., Score 250 EC)',
        activeIngredient: 'Difenoconazole 250 g/L',
        mofaApproved: true,
        applicationRate: '10ml - 15ml per 15L knapsack sprayer',
        safetyPrecautions: 'Systemic curative action. Apply when target spots first appear on lower canopy.'
      }
    ],
    prevention: [
      'Stake tomato plants to elevate foliage and promote rapid wind drying after rain.',
      'Practice 3-year crop rotation away from peppers, eggplants, and potatoes.',
      'Avoid overhead watering; use furrow or drip irrigation early in the morning.'
    ]
  },

  'tomato_late_blight': {
    id: 'tomato_late_blight',
    name: 'Tomato Late Blight',
    localNameTwi: 'Ntoosi Yareɛ Kɛseɛ (Late Blight)',
    localNameGa: 'Amɛŋmɛ Yɛlɛ Kpoo',
    crop: 'tomato',
    scientificName: 'Phytophthora infestans',
    pathogenType: 'Fungal',
    severity: 'Critical',
    description: 'Catastrophic water-mold infection capable of destroying an entire 5-acre tomato field within 7 to 10 days during cool, cloudy, persistently wet weather.',
    symptoms: [
      'Large, irregular water-soaked pale green lesions on leaves that rapidly turn dark brown or purplish-black',
      'Delicate white fuzzy fungal mildew visible on the undersides of lesions during moist mornings',
      'Dark greasy-looking lesions girdling stems and fruit petioles',
      'Large, firm, bumpy golden-brown to dark rot across green and ripening tomato fruits'
    ],
    cause: 'Oomycete pathogen producing millions of sporangia dispersed rapidly by wind and driving rain.',
    spreadConditions: 'Cool, wet, cloudy weather with temperatures between 15°C–22°C and relative humidity above 90%.',
    organicTreatment: [
      'Immediately remove and deeply bury or burn all infected plants; do not put in compost heap.',
      'Spray copper octanoate or copper sulphate soap solution immediately at onset.',
      'Maximize row spacing (80cm x 60cm) to ensure rapid sun drying of wet leaf surfaces.'
    ],
    chemicalTreatment: [
      {
        productName: 'Metalaxyl-M + Mancozeb (e.g., Ridomil Gold 66 WP)',
        activeIngredient: 'Metalaxyl-M 40 g/kg + Mancozeb 640 g/kg',
        mofaApproved: true,
        applicationRate: '50g per 15L knapsack sprayer (approx. 2.5kg/ha)',
        safetyPrecautions: 'Gold-standard curative and protective treatment. Spray immediately upon visual alert. Wear chemical respirator and boots.'
      },
      {
        productName: 'Dimethomorph + Mancozeb (e.g., Acrobat MZ)',
        activeIngredient: 'Dimethomorph 90 g/kg + Mancozeb 600 g/kg',
        mofaApproved: true,
        applicationRate: '40g per 15L knapsack sprayer',
        safetyPrecautions: 'Excellent antisporulant. Observe strict 7-day pre-harvest interval.'
      }
    ],
    prevention: [
      'Plant certified tolerant varieties (e.g., Cobra 26, Jaguar, or Tropimech).',
      'Avoid planting tomato downstream from potato plots.',
      'Apply preventative Mancozeb spray prior to prolonged anticipated rainy spells.'
    ]
  },

  'tomato_tylcv': {
    id: 'tomato_tylcv',
    name: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    localNameTwi: 'Ntoosi Nyane Yareɛ (Curl Virus)',
    localNameGa: 'Amɛŋmɛ Ba Kpakpaa',
    crop: 'tomato',
    scientificName: 'Tomato yellow leaf curl virus (TYLCV)',
    pathogenType: 'Viral',
    severity: 'High',
    description: 'Widespread viral infection transmitted by silverleaf whitefly (Bemisia tabaci). Infected young plants become severely stunted and produce zero marketable fruit.',
    symptoms: [
      'Dramatic upward curling and cupping of leaflets margins',
      'Severe chlorosis with pale yellowing of leaflet margins and interveinal areas',
      'Marked reduction in leaflet size, taking on a crinkled bushy rosette appearance',
      'Heavy flower abortion; plants infected early produce zero fruit'
    ],
    cause: 'Begomovirus transmitted exclusively by the whitefly vector Bemisia tabaci.',
    spreadConditions: 'Prolonged hot, dry weather favoring explosive whitefly reproduction; presence of volunteer solanaceous weeds.',
    organicTreatment: [
      'Place yellow sticky card traps (1 trap per 10m²) above tomato canopy to trap adult whiteflies.',
      'Erect fine insect-proof nylon netting over nursery seedbeds (40-50 mesh) for the first 30 days before field transplanting.',
      'Spray insecticidal soap or neem oil emulsified with mild soap every 5 days.'
    ],
    chemicalTreatment: [
      {
        productName: 'Thiamethoxam + Lambda-Cyhalothrin (e.g., Engeo 247 SC)',
        activeIngredient: 'Thiamethoxam 141 g/L + Lambda-cyhalothrin 106 g/L',
        mofaApproved: true,
        applicationRate: '15ml per 15L knapsack sprayer',
        safetyPrecautions: 'Target whitefly nymphs and adults on the underside of young leaves. Rotate chemicals.'
      },
      {
        productName: 'Spirotetramat (e.g., Movento 150 OD)',
        activeIngredient: 'Spirotetramat 150 g/L',
        mofaApproved: true,
        applicationRate: '10ml per 15L knapsack sprayer',
        safetyPrecautions: 'Systemic 2-way xylem and phloem transport. Controls juvenile whitefly scales effectively.'
      }
    ],
    prevention: [
      'Plant TYLCV-resistant tomato hybrids (e.g., Pectomech, Anahu, TY-20, or Nadira).',
      'Establish barrier rows of maize or sorghum 2 weeks prior to planting tomato to trap whiteflies.',
      'Eradicate all broadleaf weeds around the plot boundary.'
    ]
  },

  'tomato_bacterial_spot': {
    id: 'tomato_bacterial_spot',
    name: 'Tomato Bacterial Spot',
    localNameTwi: 'Ntoosi Bacterial Nsɔnsɔneɛ',
    localNameGa: 'Amɛŋmɛ Toji Yɛlɛ',
    crop: 'tomato',
    scientificName: 'Xanthomonas perforans / Xanthomonas euvesicatoria',
    pathogenType: 'Bacterial',
    severity: 'Medium',
    description: 'Bacterial pathogen causing small, dark water-soaked spots on leaves and scabby corky lesions on fruit, significantly reducing market grade.',
    symptoms: [
      'Small, circular to irregular water-soaked spots (1-3mm) turning black and greasy',
      'Lesion centers often drop out, leaving a perforated shot-hole look',
      'Extensive blighting of leaflets when multiple spots coalesce',
      'Raised, black, blister-like scabs on green tomato fruit with white halos'
    ],
    cause: 'Seed-borne bacteria or overwintering on crop residues; splashed onto foliage by rain.',
    spreadConditions: 'Warm temperatures (24°C–30°C) with frequent driving rains and overhead irrigation.',
    organicTreatment: [
      'Hot water seed treatment: soak tomato seeds in 50°C water for 25 minutes prior to nursing.',
      'Remove and bury severely infected lower branches during dry sunny midday periods.',
      'Spray dilute biological bactericides like Bacillus subtilis formulations.'
    ],
    chemicalTreatment: [
      {
        productName: 'Copper Oxychloride 85% WP (e.g., Cobox / Nordox)',
        activeIngredient: 'Copper oxychloride 850 g/kg',
        mofaApproved: true,
        applicationRate: '50g per 15L knapsack sprayer',
        safetyPrecautions: 'Mix tank with Mancozeb to enhance copper bactericidal synergy. Avoid spraying under hot burning midday sun.'
      }
    ],
    prevention: [
      'Purchase only certified pathogen-indexed seeds in original sealed cans.',
      'Do not work in fields when leaves are wet from morning dew or rain.',
      'Maintain rigorous 2-year crop rotation.'
    ]
  },

  'tomato_septoria': {
    id: 'tomato_septoria',
    name: 'Tomato Septoria Leaf Spot',
    localNameTwi: 'Ntoosi Septoria Ahaban Yareɛ',
    localNameGa: 'Amɛŋmɛ Septoria Yɛlɛ',
    crop: 'tomato',
    scientificName: 'Septoria lycopersici',
    pathogenType: 'Fungal',
    severity: 'Medium',
    description: 'Foliar fungal disease characterized by hundreds of small circular spots with grayish-white centers and dark brown margins, causing severe defoliation.',
    symptoms: [
      'Numerous small (1.5–3mm) circular spots with grayish-white centers and distinct dark brown borders',
      'Tiny black specks (pycnidia fruiting bodies) visible in the center of mature spots under a hand lens',
      'Infection starts on the oldest lower leaves right after fruit set',
      'Heavily infected leaves turn yellow, shrivel, and drop, exposing fruits to sunscald'
    ],
    cause: 'Fungus overwinters on solanaceous weed hosts and tomato debris; spores splash upward.',
    spreadConditions: 'High relative humidity (>75%), prolonged leaf wetness, and moderate temperatures (20°C–25°C).',
    organicTreatment: [
      'Mulch heavily around tomato base with clean grass straw to inhibit splash dispersal.',
      'Strip off the lowest leaves as soon as first clusters of fruit begin sizing.',
      'Spray copper soap or botanical horsetail extract.'
    ],
    chemicalTreatment: [
      {
        productName: 'Chlorothalonil 720 SC (e.g., Bravo / Daconil)',
        activeIngredient: 'Chlorothalonil 720 g/L',
        mofaApproved: true,
        applicationRate: '30ml per 15L knapsack sprayer',
        safetyPrecautions: 'Broad-spectrum protective fungicide. Do not allow spray drift to ponds or livestock pens.'
      }
    ],
    prevention: [
      'Stake and prune indeterminate tomato vines to maintain open airflow.',
      'Water only with drip irrigation or at root base.',
      'Bury all crop residue immediately after final harvest.'
    ]
  },

  'tomato_healthy': {
    id: 'tomato_healthy',
    name: 'Healthy Tomato Leaf',
    localNameTwi: 'Ntoosi Ahaban Bɔkɔɔ (Ahaban Pa)',
    localNameGa: 'Amɛŋmɛ Ba Kpakpa',
    crop: 'tomato',
    scientificName: 'Solanum lycopersicum',
    pathogenType: 'Healthy',
    severity: 'Low',
    description: 'Crisp, aromatic deep green pinnate leaves free of spots, mildew, curling, or chlorosis, supporting vigorous flowering and fruit set.',
    symptoms: [
      'Vibrant deep green coloration across all leaflets',
      'Slight glandular pubescence (fine hairs) along stems and petioles',
      'Erect, symmetrical branching habit with strong turgor',
      'Abundant healthy blossom clusters with zero flower drop'
    ],
    cause: 'Proper nursery hardening, balanced NPK + Calcium nutrition, and rigorous scouting.',
    spreadConditions: 'N/A - Healthy crop.',
    organicTreatment: [
      'Side-dress with well-cured compost or poultry manure at flowering and first fruit set.',
      'Apply calcium nitrate spray to prevent blossom end rot.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Maintain weekly preventative scouting across the tomato field.'
    ]
  },

  // COCOA (Theobroma cacao) - Ghana's primary cash crop
  'cocoa_black_pod': {
    id: 'cocoa_black_pod',
    name: 'Cocoa Black Pod Disease',
    localNameTwi: 'Kookoo Kokoo / Black Pod Yareɛ',
    localNameGa: 'Kookoo Tsuru Yɛlɛ',
    crop: 'cocoa',
    scientificName: 'Phytophthora megakarya / Phytophthora palmivora',
    pathogenType: 'Fungal',
    severity: 'Critical',
    description: 'The most economically destructive cocoa disease in Ghana, causing catastrophic pod rot and rapid leaf petiole necrosis across the Western, Ashanti, and Eastern cocoa belts.',
    symptoms: [
      'Rapidly enlarging dark brown to charcoal-black lesions on pods and leaf cushions',
      'White powdery fungal bloom developing over lesions in wet early mornings',
      'Wilting, browning, and dieback of chupons and young flush leaves',
      'Complete internal beans mummification within 14 days of infection'
    ],
    cause: 'Oomycete pathogen persisting in soil cushions, dispersed by rain splash, insects (ants), and contaminated pruning knives.',
    spreadConditions: 'High humidity (>85%), dense shade canopy, continuous rain, and temperatures between 20°C and 28°C.',
    organicTreatment: [
      'Bi-weekly sanitary harvesting: harvest, bag, and bury all diseased black pods at least 30cm deep.',
      'Prune excessive shade trees and chupons to allow morning sunlight to dry cocoa pod canopy.',
      'Apply wood ash or copper-rich botanical slurry around tree base.'
    ],
    chemicalTreatment: [
      {
        productName: 'Ridomil Gold Plus 66 WP (COCOBOD Approved)',
        activeIngredient: 'Mefenoxam 60 g/kg + Cuprous Oxide 600 g/kg',
        mofaApproved: true,
        applicationRate: '50g per 15L knapsack sprayer (applied at 21-day intervals during peak rains)',
        safetyPrecautions: 'Wear protective coverall, rubber boots, and chemical goggles. Observe 14-day pre-harvest interval.'
      },
      {
        productName: 'Nordox 75 WG / Champ DP',
        activeIngredient: 'Cuprous Oxide (75% metallic copper)',
        mofaApproved: true,
        applicationRate: '75g - 100g per 15L knapsack sprayer',
        safetyPrecautions: 'Do not spray during full bloom to avoid harming cocoa pollinators (Forcipomyia midges).'
      }
    ],
    prevention: [
      'Maintain farm shade between 30% and 40% as certified by CRIG (Cocoa Research Institute of Ghana).',
      'Ensure proper drainage ditches are dug to prevent waterlogging on low-lying cocoa farms.'
    ]
  },

  'cocoa_swollen_shoot': {
    id: 'cocoa_swollen_shoot',
    name: 'Cocoa Swollen Shoot Virus (CSSVD)',
    localNameTwi: 'Kookoo Akyerɛmaduro (Swollen Shoot)',
    localNameGa: 'Kookoo Ba Yɛlɛ',
    crop: 'cocoa',
    scientificName: 'Cocoa swollen shoot badnavirus (CSSV)',
    pathogenType: 'Viral',
    severity: 'Critical',
    description: 'Major endemic viral disease in Ghana leading to tree dieback within 2 to 3 years. Characterized by vein clearing and swollen stems, transmitted by mealybug vectors.',
    symptoms: [
      'Red vein-banding and yellow chevron mosaic on young flush leaves',
      'Distinct spindle-shaped swellings along chupons, stems, and roots',
      'Small, rounded, mottled cocoa pods with reduced bean weight',
      'Severe progressive tree defoliation and canopy dieback'
    ],
    cause: 'Badnavirus transmitted semi-persistently by mealybugs (Pseudococcus njalensis) and movement of infected vegetative buds.',
    spreadConditions: 'Unshaded canopy allowing mealybug wind dispersal, presence of wild alternative forest tree hosts (Ceiba, Cola).',
    organicTreatment: [
      'Tag infected trees and contact MoFA / COCOBOD Swollen Shoot Eradication Unit immediately.',
      'Cut out and burn infected trees along with a surrounding barrier ring of asymptomatic trees.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Replant cut-out farms with CRIG CSSVD-tolerant hybrid seed garden materials.',
      'Establish a 10-meter barrier zone with citrus, plantain, or oil palm around the cocoa block.'
    ]
  },

  'cocoa_mirid': {
    id: 'cocoa_mirid',
    name: 'Cocoa Mirid / Capsid Bug Damage',
    localNameTwi: 'Kookoo Akate Yareɛ (Capsid)',
    localNameGa: 'Kookoo Akate Yɛlɛ',
    crop: 'cocoa',
    scientificName: 'Sahlbergella singularis / Distantiella theobroma',
    pathogenType: 'Pest Infestation',
    severity: 'High',
    description: 'Sap-sucking mirid bugs puncture young stems, shoots, and green pods, injecting toxic saliva that triggers blast necrosis and secondary fungal entry.',
    symptoms: [
      'Dark sunken necrotic lesions (cankers) on young stems and pod surfaces',
      'Drying and premature drop of young cherelles (cherelle wilt)',
      'Severe stag-headed canopy dieback known locally as capsid blast'
    ],
    cause: 'Sucking insects feeding predominantly during the dusk and early morning hours.',
    spreadConditions: 'Canopy breaks ("capsid pockets") with direct sun exposure; peak infestation between August and December.',
    organicTreatment: [
      'Apply 5% neem seed kernel extract emulsion to young flush shoots and cherelles.',
      'Maintain shade cover to prevent sunny capsid pockets from opening up in the farm.'
    ],
    chemicalTreatment: [
      {
        productName: 'Akate Master / Confidor 200 SL',
        activeIngredient: 'Bifenthrin 25 g/L / Imidacloprid 200 g/L',
        mofaApproved: true,
        applicationRate: '20ml - 30ml per 15L knapsack sprayer (August - December calendar spray)',
        safetyPrecautions: 'Do not spray during strong winds. Wear MoFA-recommended respirator mask.'
      }
    ],
    prevention: [
      'Fill up canopy gaps quickly by planting shade trees like Terminalia superba or plantains.'
    ]
  },

  'cocoa_healthy': {
    id: 'cocoa_healthy',
    name: 'Healthy Cocoa Foliage',
    localNameTwi: 'Kookoo Ahaban Pa (Bɔkɔɔ)',
    localNameGa: 'Kookoo Ba Kpakpa',
    crop: 'cocoa',
    scientificName: 'Theobroma cacao',
    pathogenType: 'Healthy',
    severity: 'Low',
    description: 'Leathery, deep green glossy leaves with distinct lateral pinnate venation, vigorous flush leaves, and prolific clean flower cushions.',
    symptoms: [
      'Smooth, intact leaf blade with uniform dark green chlorophyll',
      'Normal reddish-bronze young flushes free of leaf curling or vein clearing',
      'Stems free of cankers, galls, or mealybug wax colonies'
    ],
    cause: 'Balanced organic mulch, routine farm weeding, and proper agroforestry shade regulation.',
    spreadConditions: 'N/A - Healthy crop.',
    organicTreatment: [
      'Mulch the base of trees with dry plantain leaves and composted cocoa pod husks.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Maintain regular monthly farm hygiene and weed management.'
    ]
  },

  // PLANTAIN (Musa paradisiaca) - Core Ghanaian staple
  'plantain_sigatoka': {
    id: 'plantain_sigatoka',
    name: 'Black Sigatoka Leaf Spot',
    localNameTwi: 'Borɔdeɛ Ahaban Yareɛ (Sigatoka)',
    localNameGa: 'Amadaa Ba Yɛlɛ',
    crop: 'plantain',
    scientificName: 'Mycosphaerella fijiensis',
    pathogenType: 'Fungal',
    severity: 'High',
    description: 'The most damaging fungal foliar disease of plantains and bananas in Ghana, reducing functional leaf area and causing premature fruit ripening.',
    symptoms: [
      'Tiny reddish-brown specks visible on the underside of the 3rd or 4th leaf',
      'Specks elongate into dark brown to black streaks running parallel to leaf veins',
      'Streaks expand into large elliptical necrotic blotches with pale grey centers and bright yellow chlorotic halos',
      'Leaves dry up, collapse, and hang down along the pseudostem prematurely'
    ],
    cause: 'Airborne ascospores produced inside leaf lesions, dispersed by wind currents and water splashes during wet tropical seasons.',
    spreadConditions: 'Prolonged leaf wetness, relative humidity above 90%, and temperatures between 25°C and 28°C.',
    organicTreatment: [
      'Systematic de-leafing: surgically cut off diseased leaf portions at early streak stage and place face down on soil to desiccate spores.',
      'Apply wood ash or diluted compost tea on younger leaves to inhibit fungal germination.'
    ],
    chemicalTreatment: [
      {
        productName: 'Tilt 250 EC / Siganex',
        activeIngredient: 'Propiconazole 250 g/L',
        mofaApproved: true,
        applicationRate: '15ml - 20ml per 15L knapsack sprayer with mineral oil adjuvant',
        safetyPrecautions: 'Rotate with copper fungicides to prevent resistance development.'
      }
    ],
    prevention: [
      'Plant CSIR-CRI certified Black Sigatoka resistant plantain hybrids (e.g., Apantu Pa, FHIA-21).',
      'Maintain wide planting distances (3m x 2m) and prune suckers to allow airflow.'
    ]
  },

  'plantain_bacterial_wilt': {
    id: 'plantain_bacterial_wilt',
    name: 'Bacterial Xanthomonas Wilt (BXW)',
    localNameTwi: 'Borɔdeɛ Wither Yareɛ (Bacterial Wilt)',
    localNameGa: 'Amadaa Kpatua Yɛlɛ',
    crop: 'plantain',
    scientificName: 'Xanthomonas vasicola pv. musacearum',
    pathogenType: 'Bacterial',
    severity: 'Critical',
    description: 'Devastating bacterial disease causing rapid vascular blockage, leaf yellowing, and rotting of both the plantain bunch and corm.',
    symptoms: [
      'Progressive yellowing and drooping of leaves starting from the innermost youngest leaf',
      'Petioles snap easily and show yellowish-brown bacterial ooze when sliced',
      'Male flower bud turns black, withers, and shrivels prematurely',
      'Fruit pulp develops uneven dark brown or rusty internal discoloration'
    ],
    cause: 'Bacterium spread mechanically by contaminated farm cutlasses, bees/insects visiting male buds, and infected planting suckers.',
    spreadConditions: 'Continuous cutting with unsterilized tools and presence of vector insects.',
    organicTreatment: [
      'Single Diseased Plant Removal (SDPR): chop down the affected plant at ground level and sterilize machetes in open flame.',
      'De-bud male floral buds using a forked wooden stick as soon as the last fruit cluster forms.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Flame-sterilize cutlasses after working on each plantain mat.',
      'Source clean suckers only from MoFA certified pathogen-free mother blocks.'
    ]
  },

  'plantain_healthy': {
    id: 'plantain_healthy',
    name: 'Healthy Plantain Foliage',
    localNameTwi: 'Borɔdeɛ Ahaban Bɔkɔɔ (Ahaban Pa)',
    localNameGa: 'Amadaa Ba Kpakpa',
    crop: 'plantain',
    scientificName: 'Musa paradisiaca',
    pathogenType: 'Healthy',
    severity: 'Low',
    description: 'Expansive, glossy deep-green fronds with strong erect petioles, supporting rapid pseudostem development and heavy bunch emergence.',
    symptoms: [
      'Broad, undamaged green leaf lamina with straight transverse venation',
      'Minimum of 8 to 10 active green leaves present during flowering and bunch filling',
      'Pseudostem firm and free of bacterial oozing or corm borer tunnels'
    ],
    cause: 'Good sucker selection, heavy organic mulching, and routine desuckering.',
    spreadConditions: 'N/A - Healthy crop.',
    organicTreatment: [
      'Apply poultry manure or cured kitchen compost around the base (50cm away from corm).'
    ],
    chemicalTreatment: [],
    prevention: [
      'Maintain 3 to 4 stems per mat (mother, daughter, granddaughter).'
    ]
  },

  // YAM (Dioscorea spp.) - Essential food security crop
  'yam_anthracnose': {
    id: 'yam_anthracnose',
    name: 'Yam Anthracnose / Dieback',
    localNameTwi: 'Bayerɛ Ahaban Yareɛ / Anthracnose',
    localNameGa: 'Yele Ba Yɛlɛ',
    crop: 'yam',
    scientificName: 'Colletotrichum gloeosporioides',
    pathogenType: 'Fungal',
    severity: 'High',
    description: 'The most widespread foliar constraint in Ghanaian yam production, causing extensive leaf scorch and early vine dieback in Atebubu, Kintampo, and Salaga districts.',
    symptoms: [
      'Tiny black or dark brown pinhead spots surrounded by prominent chlorotic yellow rings',
      'Lesions coalesce into large necrotic blights, causing premature scorching of the entire vine',
      'Black cankers forming on petioles and climbing vines, leading to top-down dieback'
    ],
    cause: 'Airborne and rain-splashed conidia surviving in soil vine debris and infected yam setts.',
    spreadConditions: 'Warm temperatures (26°C - 32°C) combined with high rainfall and prolonged dew.',
    organicTreatment: [
      'Remove and burn blackened vine residues immediately to reduce fungal inoculum.',
      'Spray extracts of pawpaw or neem leaves as botanical protective fungistats.'
    ],
    chemicalTreatment: [
      {
        productName: 'Mancozeb 80 WP / Ivory 80 WP',
        activeIngredient: 'Mancozeb 800 g/kg',
        mofaApproved: true,
        applicationRate: '50g - 60g per 15L knapsack sprayer',
        safetyPrecautions: 'Apply at first sign of pinhead spots before full vine blighting occurs.'
      }
    ],
    prevention: [
      'Plant CSIR-CRI improved tolerant water yam and white yam cultivars.',
      'Treat seed yam setts with fungicide-insecticide dip before planting.'
    ]
  },

  'yam_mosaic': {
    id: 'yam_mosaic',
    name: 'Yam Mosaic Virus (YMV)',
    localNameTwi: 'Bayerɛ Mosaic Yareɛ',
    localNameGa: 'Yele Mosaic Yɛlɛ',
    crop: 'yam',
    scientificName: 'Yam mosaic potyvirus (YMV)',
    pathogenType: 'Viral',
    severity: 'Medium',
    description: 'Aphid-transmitted viral disease causing pronounced leaf mottling, shoe-stringing, and up to 50% tuber yield reduction.',
    symptoms: [
      'Light green and dark green mosaic or mottled patches across leaf surface',
      'Leaf strapping, puckering, and curling along main veins',
      'Stunted climbing vines with short internodes and smaller tubers'
    ],
    cause: 'Potyvirus transmitted by cotton aphids (Aphis gossypii) and infected vegetative yam tubers.',
    spreadConditions: 'Aphid population spikes during onset of dry spells and continuous planting of infected seed tubers.',
    organicTreatment: [
      'Rogue out severely stunted infected vines during early vegetative growth.',
      'Spray neem oil or soap solution to control aphid vector populations.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Use certified disease-free microsett or vine cutting planting materials from certified seed producers.'
    ]
  },

  'yam_healthy': {
    id: 'yam_healthy',
    name: 'Healthy Yam Foliage',
    localNameTwi: 'Bayerɛ Ahaban Pa (Bɔkɔɔ)',
    localNameGa: 'Yele Ba Kpakpa',
    crop: 'yam',
    scientificName: 'Dioscorea rotundata',
    pathogenType: 'Healthy',
    severity: 'Low',
    description: 'Lush heart-shaped (cordate) deep green leaves climbing vigorously up stakes, ensuring maximum tuber photosynthate storage.',
    symptoms: [
      'Smooth cordate leaf blades free of spots, puckering, or yellow halos',
      'Vigorous, twining vine growth with dense foliar canopy on stakes',
      'Clean stems without dark cankers or mealybug scale colonies'
    ],
    cause: 'Proper mounding, sturdy staking, sett chemical dip, and balanced fertilization.',
    spreadConditions: 'N/A - Healthy crop.',
    organicTreatment: [
      'Maintain thick grass mulch over mounds to conserve soil moisture.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Stake vines early to keep leaves away from damp soil splash.'
    ]
  },

  // PEPPER (Capsicum annuum / frutescens) - Vital condiment across Ghana
  'pepper_anthracnose': {
    id: 'pepper_anthracnose',
    name: 'Pepper Anthracnose & Leaf Blight',
    localNameTwi: 'Mako Ahaban Yareɛ (Anthracnose)',
    localNameGa: 'Kpakpo Shito Ba Yɛlɛ',
    crop: 'pepper',
    scientificName: 'Colletotrichum capsici / Colletotrichum gloeosporioides',
    pathogenType: 'Fungal',
    severity: 'High',
    description: 'Major foliar and fruit disease attacking Scotch Bonnet, Legon 18, and Shito chili pepper varieties, causing extensive leaf drop and sunken fruit rot.',
    symptoms: [
      'Circular or irregular necrotic lesions on leaves with dark concentric rings',
      'Premature chlorosis and heavy leaf dropping (defoliation)',
      'Sunken, circular, water-soaked black spots on green and ripe pepper fruits'
    ],
    cause: 'Fungus surviving on infected seed coats and pepper crop residue, spread by splashing rain.',
    spreadConditions: 'Hot, humid weather (27°C - 32°C) with frequent showers during fruit set.',
    organicTreatment: [
      'Remove and destroy infected fruits and blighted lower leaves immediately.',
      'Treat pepper seeds before nursery sowing in hot water (50°C for 25 minutes).'
    ],
    chemicalTreatment: [
      {
        productName: 'Kocide 2000 / Nordox',
        activeIngredient: 'Copper Hydroxide 53.8%',
        mofaApproved: true,
        applicationRate: '30g - 40g per 15L knapsack sprayer',
        safetyPrecautions: 'Do not spray when plants are stressed from extreme midday heat.'
      }
    ],
    prevention: [
      'Rotate with non-solanaceous crops (maize, cassava, cowpea).',
      'Avoid overhead watering; use furrow or drip irrigation.'
    ]
  },

  'pepper_bacterial_spot': {
    id: 'pepper_bacterial_spot',
    name: 'Pepper Bacterial Leaf Spot',
    localNameTwi: 'Mako Ntokontoko Yareɛ (Bacterial Spot)',
    localNameGa: 'Mako Ba Yɛlɛ',
    crop: 'pepper',
    scientificName: 'Xanthomonas campestris pv. vesicatoria',
    pathogenType: 'Bacterial',
    severity: 'High',
    description: 'Bacterial pathogen causing small scab-like foliar lesions and severe defoliation during rainy seasons in Ghana.',
    symptoms: [
      'Small, water-soaked angular spots turning dark brown to black on leaf undersides',
      'Leaves yellow around spots and drop rapidly, leaving bare pepper branches',
      'Small raised blister-like scabs on pepper fruit skin'
    ],
    cause: 'Seed-borne bacterium spread by wind-driven rain and handling wet foliage.',
    spreadConditions: 'Warm, rainy periods with high relative humidity.',
    organicTreatment: [
      'Spray copper hydroxide mixed with garlic botanical extract at first symptom onset.',
      'Prune lower pepper branches (first 15cm) to prevent soil splash contact.'
    ],
    chemicalTreatment: [
      {
        productName: 'Champion WP / Funguran-OH',
        activeIngredient: 'Copper Hydroxide 77% WP',
        mofaApproved: true,
        applicationRate: '40g per 15L knapsack sprayer',
        safetyPrecautions: 'Apply preventatively before rain fronts.'
      }
    ],
    prevention: [
      'Source certified disease-free pepper seeds from MoFA-approved input dealers.'
    ]
  },

  'pepper_healthy': {
    id: 'pepper_healthy',
    name: 'Healthy Pepper Foliage',
    localNameTwi: 'Mako Ahaban Pa (Bɔkɔɔ)',
    localNameGa: 'Kpakpo Shito Ba Kpakpa',
    crop: 'pepper',
    scientificName: 'Capsicum annuum',
    pathogenType: 'Healthy',
    severity: 'Low',
    description: 'Vibrant, dark green ovate leaves with smooth margins, strong branching, and heavy flower retention for pepper pod formation.',
    symptoms: [
      'Uniform green foliage free of chlorotic spots, blistering, or curling',
      'Robust bushy canopy with sturdy central stem',
      'Heavy bloom of white flowers setting pods without blossom drop'
    ],
    cause: 'Hardy nursery seedlings, organic poultry manure, and balanced calcium nutrition.',
    spreadConditions: 'N/A - Healthy crop.',
    organicTreatment: [
      'Top-dress with well-rotted poultry manure at first flowering.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Scout weekly for thrips and spider mites on the underside of young leaves.'
    ]
  },

  // OIL PALM (Elaeis guineensis) - Ghana's premier tree crop
  'oilpalm_anthracnose': {
    id: 'oilpalm_anthracnose',
    name: 'Oil Palm Frond Anthracnose',
    localNameTwi: 'Abɛ Ahaban Yareɛ (Anthracnose)',
    localNameGa: 'Ŋmɛ Ba Yɛlɛ',
    crop: 'oil_palm',
    scientificName: 'Melanconium elaeidis / Glomerella cingulata',
    pathogenType: 'Fungal',
    severity: 'Medium',
    description: 'Common foliar disease affecting nursery seedlings and young field palms across oil palm plantations in Kwaebibirem and Mpohor districts.',
    symptoms: [
      'Small, water-soaked brown spots between the pinnae veins',
      'Spots enlarge into elongated dark-brown necrotic blotches with yellow halos',
      'Leaflet tips scorch, dry up, and curl downwards'
    ],
    cause: 'Fungus spread by rain splash and overhead nursery sprinkler systems.',
    spreadConditions: 'Overcrowded nursery polybags, high humidity, and excessive shade.',
    organicTreatment: [
      'Space polybags 60cm apart to allow rapid drying of palm fronds.',
      'Surgically prune severely infected lower fronds and incinerate them.'
    ],
    chemicalTreatment: [
      {
        productName: 'Dithane M-45 / Ivory 80 WP',
        activeIngredient: 'Mancozeb 800 g/kg',
        mofaApproved: true,
        applicationRate: '40g - 50g per 15L knapsack sprayer',
        safetyPrecautions: 'Spray early in the morning before tropical sunshine intensifies.'
      }
    ],
    prevention: [
      'Irrigate at soil bag level rather than overhead sprinkling on fronds.',
      'Provide balanced potassium (MOP) and magnesium fertilizer.'
    ]
  },

  'oilpalm_healthy': {
    id: 'oilpalm_healthy',
    name: 'Healthy Oil Palm Frond',
    localNameTwi: 'Abɛ Ahaban Bɔkɔɔ (Ahaban Pa)',
    localNameGa: 'Ŋmɛ Ba Kpakpa',
    crop: 'oil_palm',
    scientificName: 'Elaeis guineensis',
    pathogenType: 'Healthy',
    severity: 'Low',
    description: 'Deep glossy green pinnate fronds radiating from the palm crown, supporting optimal photosynthetic capacity and fruit bunch development.',
    symptoms: [
      'Lush dark-green leaflets without spotting, yellowing, or frond fracture',
      'Strong central rachis with uniform pinnae spacing',
      'Spear leaf healthy, upright, and unblemished'
    ],
    cause: 'OPRI (Oil Palm Research Institute) Tenera hybrid planting and balanced NPKMg nutrition.',
    spreadConditions: 'N/A - Healthy crop.',
    organicTreatment: [
      'Mulch palm circle with empty fruit bunches (EFB) to conserve moisture.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Perform regular ring-weeding and prune only senescent dry lower fronds.'
    ]
  },

  'oil_palm_healthy': {
    id: 'oil_palm_healthy',
    name: 'Healthy Oil Palm Frond',
    localNameTwi: 'Abɛ Ahaban Bɔkɔɔ (Ahaban Pa)',
    localNameGa: 'Ŋmɛ Ba Kpakpa',
    crop: 'oil_palm',
    scientificName: 'Elaeis guineensis',
    pathogenType: 'Healthy',
    severity: 'Low',
    description: 'Deep glossy green pinnate fronds radiating from the palm crown, supporting optimal photosynthetic capacity and fruit bunch development.',
    symptoms: [
      'Lush dark-green leaflets without spotting, yellowing, or frond fracture',
      'Strong central rachis with uniform pinnae spacing',
      'Spear leaf healthy, upright, and unblemished'
    ],
    cause: 'OPRI (Oil Palm Research Institute) Tenera hybrid planting and balanced NPKMg nutrition.',
    spreadConditions: 'N/A - Healthy crop.',
    organicTreatment: [
      'Mulch palm circle with empty fruit bunches (EFB) to conserve moisture.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Perform regular ring-weeding and prune only senescent dry lower fronds.'
    ]
  },

  // COWPEA (Vigna unguiculata) - Key indigenous legume
  'cowpea_cercospora': {
    id: 'cowpea_cercospora',
    name: 'Cowpea Cercospora Leaf Spot',
    localNameTwi: 'Aseɛ Ntokontoko Yareɛ (Cercospora)',
    localNameGa: 'Yoo Ba Yɛlɛ',
    crop: 'cowpea',
    scientificName: 'Cercospora cruenta / Cercospora canescens',
    pathogenType: 'Fungal',
    severity: 'Medium',
    description: 'Prevalent foliar fungal disease across northern Ghana (Northern, Upper East, Upper West regions) causing circular to angular leaf spots and defoliation.',
    symptoms: [
      'Circular to angular reddish-brown to dark purple spots on upper leaf surfaces',
      'Lesion centers turn grayish-white as fungal spores mature',
      'Extensive yellowing and premature leaf dropping during pod filling stage'
    ],
    cause: 'Fungus surviving on infected crop residue and seed coats, spread by rain splash and wind.',
    spreadConditions: 'Intermittent rains, high humidity, and dense legume canopies.',
    organicTreatment: [
      'Spray neem kernel water extract at flower bud initiation and 14 days later.',
      'Bury or feed crop stubble to livestock post-harvest.'
    ],
    chemicalTreatment: [
      {
        productName: 'Carbendazim 50% WP / Ivory 80 WP',
        activeIngredient: 'Carbendazim 500 g/kg',
        mofaApproved: true,
        applicationRate: '20g - 30g per 15L knapsack sprayer',
        safetyPrecautions: 'Apply once at first flowering if lesions appear.'
      }
    ],
    prevention: [
      'Plant SARI / MoFA certified resistant cowpea varieties (e.g., Songotra, Padi-Tuya, Apagbaala).',
      'Practice crop rotation with cereal crops like maize or sorghum.'
    ]
  },

  'cowpea_mosaic': {
    id: 'cowpea_mosaic',
    name: 'Cowpea Aphid-Borne Mosaic Virus',
    localNameTwi: 'Aseɛ Mosaic Yareɛ',
    localNameGa: 'Yoo Mosaic Yɛlɛ',
    crop: 'cowpea',
    scientificName: 'Cowpea aphid-borne mosaic virus (CABMV)',
    pathogenType: 'Viral',
    severity: 'High',
    description: 'Widespread potyvirus transmitted by cowpea aphids (Aphis craccivora), causing leaf deformation and severe pod yield reduction.',
    symptoms: [
      'Irregular green mosaic mottle and vein banding on trifoliate leaves',
      'Blistering, distortion, and downward cupping of leaflets',
      'Stunting of plant canopy and formation of small, twisted seed pods'
    ],
    cause: 'Virus transmitted non-persistently by aphids and infected seed lots.',
    spreadConditions: 'Dry spells encouraging heavy aphid colonies on young shoots.',
    organicTreatment: [
      'Spray neem oil or soap-garlic emulsion to eliminate aphid colonies.',
      'Uproot and bury infected plants exhibiting severe distortion.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Plant only certified pathogen-free seeds treated with apron star.',
      'Avoid planting downwind from older infected legume fields.'
    ]
  },

  'cowpea_healthy': {
    id: 'cowpea_healthy',
    name: 'Healthy Cowpea Foliage',
    localNameTwi: 'Aseɛ Ahaban Pa (Bɔkɔɔ)',
    localNameGa: 'Yoo Ba Kpakpa',
    crop: 'cowpea',
    scientificName: 'Vigna unguiculata',
    pathogenType: 'Healthy',
    severity: 'Low',
    description: 'Vigorous, trifoliate deep green leaflets with smooth margins, active nitrogen-fixing root nodules, and prolific flower bud initiation.',
    symptoms: [
      'Broad trifoliate leaflets with uniform green pigmentation',
      'Erect or semi-spreading bushy architecture free of viral mottle',
      'Abundant healthy blossom clusters setting straight, filled pods'
    ],
    cause: 'Inoculated seed sowing, phosphate fertilization, and timely aphid management.',
    spreadConditions: 'N/A - Healthy crop.',
    organicTreatment: [
      'Mulch soil around legumes to conserve moisture and suppress weeds.'
    ],
    chemicalTreatment: [],
    prevention: [
      'Inspect flower buds weekly for thrips and pod borers.'
    ]
  }
};

export const CROP_LABELS: Record<
  CropType,
  {
    label: string;
    icon: string;
    count: number;
    scientific: string;
    category: 'Staples' | 'Cash Crops' | 'Vegetables & Legumes';
    realImageUrl: string;
    localNames: {
      twi: string;
      ga: string;
      ewe: string;
      dagbani: string;
    };
  }
> = {
  maize: {
    label: 'Maize (Corn)',
    icon: '🌽',
    count: 4,
    scientific: 'Zea mays',
    category: 'Staples',
    realImageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
    localNames: {
      twi: 'Aburo',
      ga: 'Ablɛ',
      ewe: 'Bli',
      dagbani: 'Kariwana'
    }
  },
  cassava: {
    label: 'Cassava',
    icon: '🌿',
    count: 4,
    scientific: 'Manihot esculenta',
    category: 'Staples',
    realImageUrl: '/crops/cassava.jpg',
    localNames: {
      twi: 'Bankye',
      ga: 'Duade',
      ewe: 'Agbeli',
      dagbani: 'Bankye'
    }
  },
  plantain: {
    label: 'Plantain',
    icon: '🍌',
    count: 3,
    scientific: 'Musa paradisiaca',
    category: 'Staples',
    realImageUrl: '/crops/plantain.jpg',
    localNames: {
      twi: 'Bɔdeɛ',
      ga: 'Amadaa',
      ewe: 'Ablagan',
      dagbani: 'Plantain'
    }
  },
  yam: {
    label: 'Yam',
    icon: '🍠',
    count: 3,
    scientific: 'Dioscorea rotundata',
    category: 'Staples',
    realImageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
    localNames: {
      twi: 'Bayerɛ',
      ga: 'Yele',
      ewe: 'Te',
      dagbani: 'Nyuɣu'
    }
  },
  cocoa: {
    label: 'Cocoa',
    icon: '🍫',
    count: 4,
    scientific: 'Theobroma cacao',
    category: 'Cash Crops',
    realImageUrl: '/crops/cocoa.jpg',
    localNames: {
      twi: 'Kookoo',
      ga: 'Kookoo',
      ewe: 'Koko',
      dagbani: 'Kookoo'
    }
  },
  oil_palm: {
    label: 'Oil Palm',
    icon: '🌴',
    count: 2,
    scientific: 'Elaeis guineensis',
    category: 'Cash Crops',
    realImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    localNames: {
      twi: 'Abɛ',
      ga: 'Ŋmɛtso',
      ewe: 'Deyiti',
      dagbani: 'Kpa-tihi'
    }
  },
  tomato: {
    label: 'Tomato',
    icon: '🍅',
    count: 6,
    scientific: 'Solanum lycopersicum',
    category: 'Vegetables & Legumes',
    realImageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80',
    localNames: {
      twi: 'Ntoosi',
      ga: 'Amɛdromi',
      ewe: 'Timati',
      dagbani: 'Kamantoonsi'
    }
  },
  pepper: {
    label: 'Pepper',
    icon: '🌶️',
    count: 3,
    scientific: 'Capsicum annuum',
    category: 'Vegetables & Legumes',
    realImageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80',
    localNames: {
      twi: 'Mako',
      ga: 'Sabiloo',
      ewe: 'Atadi',
      dagbani: 'Nanzua'
    }
  },
  cowpea: {
    label: 'Cowpea (Beans)',
    icon: '🫘',
    count: 3,
    scientific: 'Vigna unguiculata',
    category: 'Vegetables & Legumes',
    realImageUrl: '/crops/cowpea.jpg',
    localNames: {
      twi: 'Aseɛ',
      ga: 'Yoo',
      ewe: 'Ayiyi',
      dagbani: 'Tua'
    }
  }
};
