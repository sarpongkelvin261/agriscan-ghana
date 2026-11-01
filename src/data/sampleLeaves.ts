import { CropType } from '../types';

export interface SampleLeaf {
  id: string;
  name: string;
  crop: CropType;
  diseaseId: string;
  tag: string;
  description: string;
  svgDataUri: string;
  realImageUrl?: string;
  simulatedConfidence?: number;
  clarityQuality?: 'clear' | 'low_clarity_ambiguous';
  clarityDescription?: string;
}

// Generate self-contained SVG Data URIs representing typical field symptoms on leaves
function createLeafSvg(
  bgColor: string,
  leafColor: string,
  veinColor: string,
  spots: { cx: number; cy: number; rx: number; ry: number; fill: string; stroke?: string; halo?: string }[],
  leafType: CropType,
  options?: { isBlurry?: boolean; glareOverlay?: boolean }
): string {
  let path = '';
  if (leafType === 'maize') {
    // Long elongated grass-like blade
    path = `<path d="M100,20 Q145,100 135,260 Q100,340 100,380 Q100,340 65,260 Q55,100 100,20 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="2"/>
    <path d="M100,20 L100,380" stroke="${veinColor}" stroke-width="3" stroke-linecap="round"/>
    <path d="M100,90 Q120,120 130,170" stroke="${veinColor}" stroke-width="1.5" fill="none"/>
    <path d="M100,90 Q80,120 70,170" stroke="${veinColor}" stroke-width="1.5" fill="none"/>
    <path d="M100,180 Q125,210 132,250" stroke="${veinColor}" stroke-width="1.5" fill="none"/>
    <path d="M100,180 Q75,210 68,250" stroke="${veinColor}" stroke-width="1.5" fill="none"/>`;
  } else if (leafType === 'cassava') {
    // 5-lobed palmate cassava leaf
    path = `
    <!-- Petiole -->
    <path d="M100,330 Q100,380 95,400" stroke="#8b4513" stroke-width="4" fill="none"/>
    <!-- Center lobe -->
    <path d="M100,210 Q115,110 100,30 Q85,110 100,210 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="1.5"/>
    <path d="M100,210 L100,30" stroke="${veinColor}" stroke-width="2"/>
    <!-- Left lobe -->
    <path d="M100,210 Q60,140 25,90 Q60,175 100,210 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="1.5"/>
    <path d="M100,210 L25,90" stroke="${veinColor}" stroke-width="2"/>
    <!-- Right lobe -->
    <path d="M100,210 Q140,140 175,90 Q140,175 100,210 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="1.5"/>
    <path d="M100,210 L175,90" stroke="${veinColor}" stroke-width="2"/>
    <!-- Bottom left lobe -->
    <path d="M100,210 Q50,210 20,200 Q65,245 100,210 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="1.5"/>
    <!-- Bottom right lobe -->
    <path d="M100,210 Q150,210 180,200 Q135,245 100,210 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="1.5"/>`;
  } else if (leafType === 'tomato') {
    // Compound tomato serrated leaflet
    path = `
    <!-- Stem -->
    <path d="M100,300 L100,380" stroke="#2d6a4f" stroke-width="3"/>
    <!-- Main leaf blade with serrations -->
    <path d="M100,40 C140,90 170,140 150,190 C165,210 145,240 130,260 C115,280 100,300 100,300 C100,300 85,280 70,260 C55,240 35,210 50,190 C30,140 60,90 100,40 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="2"/>
    <path d="M100,40 L100,300" stroke="${veinColor}" stroke-width="2.5"/>
    <path d="M100,100 L140,130 M100,100 L60,130" stroke="${veinColor}" stroke-width="1.5"/>
    <path d="M100,160 L145,190 M100,160 L55,190" stroke="${veinColor}" stroke-width="1.5"/>
    <path d="M100,220 L130,250 M100,220 L70,250" stroke="${veinColor}" stroke-width="1.5"/>`;
  } else if (leafType === 'cocoa') {
    // Broad elliptical leathery cocoa leaf
    path = `
    <!-- Petiole -->
    <path d="M100,320 L100,380" stroke="#5c4033" stroke-width="4" stroke-linecap="round"/>
    <!-- Elliptical blade with tapered tip -->
    <path d="M100,35 C155,80 165,180 150,260 C135,305 110,320 100,320 C90,320 65,305 50,260 C35,180 45,80 100,35 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="2"/>
    <!-- Strong midrib -->
    <path d="M100,35 L100,320" stroke="${veinColor}" stroke-width="3"/>
    <!-- Prominent pinnate lateral veins -->
    <path d="M100,80 Q130,95 152,120 M100,80 Q70,95 48,120" stroke="${veinColor}" stroke-width="2" fill="none"/>
    <path d="M100,135 Q135,150 158,180 M100,135 Q65,150 42,180" stroke="${veinColor}" stroke-width="2" fill="none"/>
    <path d="M100,195 Q135,210 152,245 M100,195 Q65,210 48,245" stroke="${veinColor}" stroke-width="2" fill="none"/>
    <path d="M100,255 Q125,270 140,290 M100,255 Q75,270 60,290" stroke="${veinColor}" stroke-width="1.5" fill="none"/>`;
  } else if (leafType === 'plantain') {
    // Wide paddle-like plantain frond with horizontal parallel lateral veins
    path = `
    <!-- Central sturdy midrib / rachis -->
    <path d="M100,25 L100,380" stroke="${veinColor}" stroke-width="4" stroke-linecap="round"/>
    <!-- Left and right broad blade halves -->
    <path d="M100,30 C160,50 175,120 170,240 C165,310 130,340 100,350 C70,340 35,310 30,240 C25,120 40,50 100,30 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="2"/>
    <path d="M100,30 L100,380" stroke="${veinColor}" stroke-width="4"/>
    <!-- Dense parallel transverse veins -->
    <path d="M100,70 L160,80 M100,70 L40,80" stroke="${veinColor}" stroke-width="1.5"/>
    <path d="M100,110 L168,125 M100,110 L32,125" stroke="${veinColor}" stroke-width="1.5"/>
    <path d="M100,150 L170,165 M100,150 L30,165" stroke="${veinColor}" stroke-width="1.5"/>
    <path d="M100,190 L168,208 M100,190 L32,208" stroke="${veinColor}" stroke-width="1.5"/>
    <path d="M100,230 L165,250 M100,230 L35,250" stroke="${veinColor}" stroke-width="1.5"/>
    <path d="M100,270 L155,290 M100,270 L45,290" stroke="${veinColor}" stroke-width="1.5"/>
    <path d="M100,310 L140,330 M100,310 L60,330" stroke="${veinColor}" stroke-width="1.5"/>`;
  } else if (leafType === 'yam') {
    // Cordate (heart-shaped) climbing yam leaf with palmate veins
    path = `
    <!-- Petiole -->
    <path d="M100,330 Q105,370 120,390" stroke="#5c4033" stroke-width="3" fill="none"/>
    <!-- Cordate blade with deep basal sinus -->
    <path d="M100,35 C140,90 170,160 160,240 C155,290 125,330 100,290 C75,330 45,290 40,240 C30,160 60,90 100,35 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="2"/>
    <!-- Palmate veins radiating from petiole insertion -->
    <path d="M100,290 L100,35" stroke="${veinColor}" stroke-width="2.5"/>
    <path d="M100,290 Q145,210 155,160" stroke="${veinColor}" stroke-width="1.8" fill="none"/>
    <path d="M100,290 Q55,210 45,160" stroke="${veinColor}" stroke-width="1.8" fill="none"/>
    <path d="M100,290 Q150,260 148,245" stroke="${veinColor}" stroke-width="1.5" fill="none"/>
    <path d="M100,290 Q50,260 52,245" stroke="${veinColor}" stroke-width="1.5" fill="none"/>`;
  } else if (leafType === 'pepper') {
    // Smooth, ovate-lanceolate pepper leaf with pointed tip
    path = `
    <!-- Stem -->
    <path d="M100,310 L100,375" stroke="#2d6a4f" stroke-width="3"/>
    <!-- Ovate blade -->
    <path d="M100,40 C140,110 155,190 140,250 C128,290 110,310 100,310 C90,310 72,290 60,250 C45,190 60,110 100,40 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="2"/>
    <path d="M100,40 L100,310" stroke="${veinColor}" stroke-width="2"/>
    <!-- Subtle lateral veins -->
    <path d="M100,100 Q125,120 138,140 M100,100 Q75,120 62,140" stroke="${veinColor}" stroke-width="1.5" fill="none"/>
    <path d="M100,160 Q130,185 142,210 M100,160 Q70,185 58,210" stroke="${veinColor}" stroke-width="1.5" fill="none"/>
    <path d="M100,220 Q125,245 132,270 M100,220 Q75,245 68,270" stroke="${veinColor}" stroke-width="1.5" fill="none"/>`;
  } else if (leafType === 'oil_palm') {
    // Narrow pinnate oil palm frond leaflet
    path = `
    <!-- Central rigid rachis / midrib -->
    <path d="M100,15 L100,385" stroke="${veinColor}" stroke-width="3"/>
    <!-- Linear leaflet blade -->
    <path d="M100,20 Q128,140 120,280 Q112,340 100,370 Q88,340 80,280 Q72,140 100,20 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="1.8"/>
    <path d="M100,20 L100,370" stroke="${veinColor}" stroke-width="2.5"/>
    <path d="M100,70 L115,90 M100,70 L85,90" stroke="${veinColor}" stroke-width="1"/>
    <path d="M100,140 L118,160 M100,140 L82,160" stroke="${veinColor}" stroke-width="1"/>
    <path d="M100,210 L116,230 M100,210 L84,230" stroke="${veinColor}" stroke-width="1"/>
    <path d="M100,280 L112,300 M100,280 L88,300" stroke="${veinColor}" stroke-width="1"/>`;
  } else {
    // Cowpea trifoliate broad rounded legume leaflet
    path = `
    <!-- Petiole -->
    <path d="M100,300 Q95,340 90,380" stroke="#2d6a4f" stroke-width="3.5" fill="none"/>
    <!-- Broad rounded leaflet -->
    <path d="M100,45 C150,90 165,180 148,250 C135,290 110,300 100,300 C90,300 65,290 52,250 C35,180 50,90 100,45 Z" fill="${leafColor}" stroke="#1b4332" stroke-width="2"/>
    <path d="M100,45 L100,300" stroke="${veinColor}" stroke-width="2.5"/>
    <path d="M100,95 Q130,115 145,140 M100,95 Q70,115 55,140" stroke="${veinColor}" stroke-width="1.5" fill="none"/>
    <path d="M100,155 Q135,180 148,210 M100,155 Q65,180 52,210" stroke="${veinColor}" stroke-width="1.5" fill="none"/>
    <path d="M100,215 Q128,240 138,265 M100,215 Q72,240 62,265" stroke="${veinColor}" stroke-width="1.5" fill="none"/>`;
  }

  let spotsMarkup = spots.map(s => {
    let extra = '';
    if (s.halo) {
      extra += `<ellipse cx="${s.cx}" cy="${s.cy}" rx="${s.rx + 5}" ry="${s.ry + 5}" fill="${s.halo}" opacity="0.6"/>`;
    }
    extra += `<ellipse cx="${s.cx}" cy="${s.cy}" rx="${s.rx}" ry="${s.ry}" fill="${s.fill}" ${s.stroke ? `stroke="${s.stroke}" stroke-width="1.5"` : ''}/>`;
    return extra;
  }).join('');

  const filterDefs = options?.isBlurry ? `
    <defs>
      <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3.8"/>
      </filter>
    </defs>
  ` : '';

  const glareMarkup = options?.glareOverlay ? `
    <ellipse cx="105" cy="180" rx="70" ry="110" fill="#ffffff" opacity="0.45" filter="url(#blurFilter)"/>
    <ellipse cx="120" cy="150" rx="40" ry="60" fill="#ffffff" opacity="0.6"/>
  ` : '';

  const contentGroup = options?.isBlurry
    ? `<g filter="url(#blurFilter)">${path}${spotsMarkup}</g>${glareMarkup}`
    : `${path}${spotsMarkup}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="100%" height="100%">
    ${filterDefs}
    <rect width="200" height="400" fill="${bgColor}"/>
    ${contentGroup}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_LEAVES: SampleLeaf[] = [
  // MAIZE
  {
    id: 'sample-m-1',
    name: 'Maize: Northern Leaf Blight',
    crop: 'maize',
    diseaseId: 'maize_blight',
    tag: 'Elongated Cigar Lesions',
    description: 'Long grayish-tan necrotic lesions typical of Helminthosporium infection on middle canopy maize in Ejura, Ashanti.',
    realImageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#eef4ee', '#40916c', '#74c69d',
      [
        { cx: 95, cy: 120, rx: 12, ry: 40, fill: '#8d6e63', halo: '#d7ccc8', stroke: '#5d4037' },
        { cx: 110, cy: 220, rx: 14, ry: 50, fill: '#795548', halo: '#efebe9', stroke: '#4e342e' },
        { cx: 80, cy: 270, rx: 10, ry: 35, fill: '#a1887f', halo: '#e0e0e0', stroke: '#5d4037' }
      ],
      'maize'
    )
  },
  {
    id: 'sample-m-2',
    name: 'Maize: Common Rust',
    crop: 'maize',
    diseaseId: 'maize_rust',
    tag: 'Golden Cinnamon Pustules',
    description: 'Abundant erupting powdery cinnamon-red pustules across both leaf blades, common during damp rainy season in Kwahu.',
    realImageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#fbf8ee', '#52b788', '#95d5b2',
      [
        { cx: 95, cy: 90, rx: 4, ry: 6, fill: '#b23a22', stroke: '#8c2612' },
        { cx: 108, cy: 110, rx: 5, ry: 7, fill: '#b23a22', stroke: '#8c2612' },
        { cx: 85, cy: 140, rx: 4, ry: 5, fill: '#c85a17', stroke: '#8c2612' },
        { cx: 112, cy: 160, rx: 5, ry: 8, fill: '#b23a22', stroke: '#8c2612' },
        { cx: 92, cy: 195, rx: 5, ry: 6, fill: '#c85a17', stroke: '#8c2612' },
        { cx: 104, cy: 230, rx: 4, ry: 7, fill: '#b23a22', stroke: '#8c2612' },
        { cx: 88, cy: 265, rx: 5, ry: 7, fill: '#c85a17', stroke: '#8c2612' },
        { cx: 115, cy: 290, rx: 4, ry: 6, fill: '#b23a22', stroke: '#8c2612' }
      ],
      'maize'
    )
  },
  {
    id: 'sample-m-3',
    name: 'Maize: Fall Armyworm Damage',
    crop: 'maize',
    diseaseId: 'maize_armyworm',
    tag: 'Ragged Windowpaning & Chewing',
    description: 'Severe caterpillar feeding with ragged perforations, skeletonized margins, and typical deadheart whorl destruction.',
    realImageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#f5efe6', '#52b788', '#74c69d',
      [
        { cx: 85, cy: 130, rx: 18, ry: 25, fill: '#f5efe6', stroke: '#795548' },
        { cx: 120, cy: 180, rx: 22, ry: 30, fill: '#f5efe6', stroke: '#795548' },
        { cx: 90, cy: 240, rx: 16, ry: 20, fill: '#f5efe6', stroke: '#795548' },
        { cx: 100, cy: 145, rx: 6, ry: 6, fill: '#5c4033' },
        { cx: 108, cy: 155, rx: 5, ry: 5, fill: '#4a3525' }
      ],
      'maize'
    )
  },
  {
    id: 'sample-m-4',
    name: 'Maize: Vigorous Healthy Leaf',
    crop: 'maize',
    diseaseId: 'maize_healthy',
    tag: 'Normal Deep Green',
    description: 'Clean uniform emerald blade without chlorosis, spots, or pest damage. MoFA Omankwa certified seed stock.',
    realImageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#eef7ee', '#2d6a4f', '#52b788', [], 'maize'
    )
  },

  // CASSAVA
  {
    id: 'sample-c-1',
    name: 'Cassava: Mosaic Disease (CMD)',
    crop: 'cassava',
    diseaseId: 'cassava_cmd',
    tag: 'Distorted Leaf with Yellow Mottling',
    description: 'Severely crinkled, distorted lobes with characteristic bright yellow and pale green mosaic patchwork. Somanya, Eastern Region.',
    realImageUrl: '/crops/cassava.jpg',
    svgDataUri: createLeafSvg(
      '#fefbe9', '#74c69d', '#b7e4c7',
      [
        { cx: 100, cy: 90, rx: 20, ry: 35, fill: '#ffe066', halo: '#fff3bf' },
        { cx: 55, cy: 140, rx: 15, ry: 25, fill: '#ffe066', halo: '#fff3bf' },
        { cx: 145, cy: 140, rx: 18, ry: 28, fill: '#ffe066', halo: '#fff3bf' },
        { cx: 95, cy: 170, rx: 12, ry: 18, fill: '#ffd43b' }
      ],
      'cassava'
    )
  },
  {
    id: 'sample-c-2',
    name: 'Cassava: Bacterial Blight (CBB)',
    crop: 'cassava',
    diseaseId: 'cassava_cbb',
    tag: 'Angular Water-Soaked Spots & Wilt',
    description: 'Angular brown lesions bounded by leaf veins with yellow borders and gum droplets on petioles. Kasoa transition zone.',
    realImageUrl: '/crops/cassava.jpg',
    svgDataUri: createLeafSvg(
      '#f7f4ef', '#52b788', '#95d5b2',
      [
        { cx: 95, cy: 100, rx: 8, ry: 12, fill: '#5d4037', halo: '#ffee58', stroke: '#3e2723' },
        { cx: 105, cy: 140, rx: 10, ry: 14, fill: '#6d4c41', halo: '#ffee58', stroke: '#3e2723' },
        { cx: 60, cy: 155, rx: 7, ry: 9, fill: '#5d4037', halo: '#ffee58', stroke: '#3e2723' },
        { cx: 140, cy: 135, rx: 9, ry: 12, fill: '#6d4c41', halo: '#ffee58', stroke: '#3e2723' }
      ],
      'cassava'
    )
  },
  {
    id: 'sample-c-3',
    name: 'Cassava: Brown Streak (CBSD)',
    crop: 'cassava',
    diseaseId: 'cassava_cbsd',
    tag: 'Feathery Yellowing along Veins',
    description: 'Interveinal feathery chlorosis spreading out from secondary veins while main primary veins stay green. Volta Basin sample.',
    realImageUrl: '/crops/cassava.jpg',
    svgDataUri: createLeafSvg(
      '#faf7eb', '#40916c', '#d8f3dc',
      [
        { cx: 100, cy: 80, rx: 14, ry: 25, fill: '#fcc419', halo: '#fff9db' },
        { cx: 65, cy: 130, rx: 12, ry: 20, fill: '#fab005', halo: '#fff9db' },
        { cx: 135, cy: 130, rx: 14, ry: 22, fill: '#fab005', halo: '#fff9db' }
      ],
      'cassava'
    )
  },
  {
    id: 'sample-c-4',
    name: 'Cassava: Healthy Sika Bankye',
    crop: 'cassava',
    diseaseId: 'cassava_healthy',
    tag: 'Vigorous Clean Palmate',
    description: 'Symmetrical healthy 7-lobed leaf from CSIR-CRI Sika Bankye improved high-yielding root stock.',
    realImageUrl: '/crops/cassava.jpg',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#1b4332', '#40916c', [], 'cassava'
    )
  },

  // TOMATO
  {
    id: 'sample-t-1',
    name: 'Tomato: Early Blight (Target Spots)',
    crop: 'tomato',
    diseaseId: 'tomato_early_blight',
    tag: 'Concentric Bullseye Rings',
    description: 'Dark brown concentric ring lesions with chlorotic yellow halo on mature tomato leaflet from Akomadan, Ashanti.',
    realImageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#faf5ef', '#40916c', '#74c69d',
      [
        { cx: 90, cy: 120, rx: 16, ry: 16, fill: '#4e342e', halo: '#fff59d', stroke: '#271c19' },
        { cx: 90, cy: 120, rx: 10, ry: 10, fill: '#6d4c41' },
        { cx: 120, cy: 190, rx: 20, ry: 18, fill: '#4e342e', halo: '#fff59d', stroke: '#271c19' },
        { cx: 120, cy: 190, rx: 12, ry: 11, fill: '#6d4c41' },
        { cx: 75, cy: 230, rx: 14, ry: 14, fill: '#5d4037', halo: '#fff59d' }
      ],
      'tomato'
    )
  },
  {
    id: 'sample-t-2',
    name: 'Tomato: Late Blight (Water-Soaked)',
    crop: 'tomato',
    diseaseId: 'tomato_late_blight',
    tag: 'Rapid Purplish-Brown Blighting',
    description: 'Large irregular greasy water-soaked lesions with white mold on underside, collected during cool August mist in Tuobodom.',
    realImageUrl: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#f4f1ea', '#52b788', '#95d5b2',
      [
        { cx: 110, cy: 110, rx: 28, ry: 35, fill: '#37474f', halo: '#cfd8dc' },
        { cx: 75, cy: 200, rx: 25, ry: 30, fill: '#263238', halo: '#b0bec5' },
        { cx: 125, cy: 250, rx: 22, ry: 25, fill: '#37474f', halo: '#cfd8dc' }
      ],
      'tomato'
    )
  },
  {
    id: 'sample-t-3',
    name: 'Tomato: Yellow Leaf Curl (TYLCV)',
    crop: 'tomato',
    diseaseId: 'tomato_tylcv',
    tag: 'Upward Cupping & Bright Chlorosis',
    description: 'Severe leaf margin curling and bright yellow interveinal chlorosis caused by Bemisia whiteflies in Ada irrigation zone.',
    realImageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#fffbeb', '#95d5b2', '#b7e4c7',
      [
        { cx: 100, cy: 80, rx: 35, ry: 40, fill: '#fcc419', halo: '#fff9db' },
        { cx: 80, cy: 160, rx: 30, ry: 35, fill: '#fcc419', halo: '#fff9db' },
        { cx: 120, cy: 220, rx: 28, ry: 32, fill: '#fab005', halo: '#fff9db' }
      ],
      'tomato'
    )
  },
  {
    id: 'sample-t-4',
    name: 'Tomato: Healthy Certified Plant',
    crop: 'tomato',
    diseaseId: 'tomato_healthy',
    tag: 'Vibrant Crisp Foliage',
    description: 'Certified healthy tomato leaflet with rich foliage, distinct serration, and zero fungal or viral markings.',
    realImageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#1b4332', '#40916c', [], 'tomato'
    )
  },

  // COCOA
  {
    id: 'sample-c-1',
    name: 'Cocoa: Black Pod Necrosis',
    crop: 'cocoa',
    diseaseId: 'cocoa_black_pod',
    tag: 'Spreading Charcoal Blight',
    description: 'Rapidly spreading dark water-soaked lesion turning black with white sporulation edges, from Sefwi Wiawso cocoa farm.',
    realImageUrl: '/crops/cocoa.jpg',
    svgDataUri: createLeafSvg(
      '#f5f5f4', '#2d6a4f', '#52b788',
      [
        { cx: 100, cy: 150, rx: 32, ry: 48, fill: '#262626', halo: '#78716c', stroke: '#171717' },
        { cx: 120, cy: 230, rx: 22, ry: 30, fill: '#44403c', halo: '#a8a29e', stroke: '#292524' }
      ],
      'cocoa'
    )
  },
  {
    id: 'sample-c-2',
    name: 'Cocoa: Swollen Shoot (CSSVD)',
    crop: 'cocoa',
    diseaseId: 'cocoa_swollen_shoot',
    tag: 'Red Vein Clearing & Banding',
    description: 'Distinctive fern-like red vein banding and interveinal yellow mosaic on young flush leaves collected in Suhum, Eastern Region.',
    realImageUrl: '/crops/cocoa.jpg',
    svgDataUri: createLeafSvg(
      '#fefce8', '#74c69d', '#95d5b2',
      [
        { cx: 100, cy: 110, rx: 18, ry: 25, fill: '#dc2626', halo: '#fef08a' },
        { cx: 75, cy: 180, rx: 14, ry: 20, fill: '#dc2626', halo: '#fde047' },
        { cx: 125, cy: 180, rx: 15, ry: 22, fill: '#dc2626', halo: '#fde047' },
        { cx: 100, cy: 250, rx: 16, ry: 24, fill: '#eab308', halo: '#fef08a' }
      ],
      'cocoa'
    )
  },
  {
    id: 'sample-c-3',
    name: 'Cocoa: Healthy Leathery Foliage',
    crop: 'cocoa',
    diseaseId: 'cocoa_healthy',
    tag: 'Pristine Flush Leaves',
    description: 'Deep lustrous green cocoa leaf with prominent healthy lateral veins and zero viral or fungal blemishes.',
    realImageUrl: '/crops/cocoa.jpg',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#1b4332', '#40916c', [], 'cocoa'
    )
  },

  // PLANTAIN
  {
    id: 'sample-p-1',
    name: 'Plantain: Black Sigatoka',
    crop: 'plantain',
    diseaseId: 'plantain_sigatoka',
    tag: 'Dark Elliptical Vein Streaks',
    description: 'Elongated dark reddish-black necrotic streaks with grey centers and yellow halos, common across Asante Akim South.',
    realImageUrl: '/crops/plantain.jpg',
    svgDataUri: createLeafSvg(
      '#fafaf9', '#40916c', '#74c69d',
      [
        { cx: 70, cy: 130, rx: 16, ry: 8, fill: '#3e2723', halo: '#fde047', stroke: '#1b0000' },
        { cx: 135, cy: 180, rx: 20, ry: 9, fill: '#271202', halo: '#fef08a', stroke: '#000000' },
        { cx: 65, cy: 240, rx: 18, ry: 7, fill: '#3e2723', halo: '#fde047', stroke: '#1b0000' },
        { cx: 130, cy: 290, rx: 22, ry: 10, fill: '#271202', halo: '#fef08a', stroke: '#000000' }
      ],
      'plantain'
    )
  },
  {
    id: 'sample-p-2',
    name: 'Plantain: Healthy Broad Frond',
    crop: 'plantain',
    diseaseId: 'plantain_healthy',
    tag: 'Vigorous Clean Canopy',
    description: 'Expansive, vibrant green plantain leaf frond with intact transverse veins and clean pseudostem support.',
    realImageUrl: '/crops/plantain.jpg',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#1b4332', '#52b788', [], 'plantain'
    )
  },

  // YAM
  {
    id: 'sample-y-1',
    name: 'Yam: Anthracnose Dieback',
    crop: 'yam',
    diseaseId: 'yam_anthracnose',
    tag: 'Black Pinpoint Spots & Halos',
    description: 'Severe foliar anthracnose with coalescing dark brown spots surrounded by bright yellow rings, causing vine scorching.',
    realImageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#fffbeb', '#52b788', '#95d5b2',
      [
        { cx: 80, cy: 120, rx: 10, ry: 12, fill: '#451a03', halo: '#fef08a', stroke: '#1c1917' },
        { cx: 120, cy: 150, rx: 12, ry: 14, fill: '#451a03', halo: '#fef08a', stroke: '#1c1917' },
        { cx: 70, cy: 200, rx: 14, ry: 16, fill: '#78350f', halo: '#fde047', stroke: '#292524' },
        { cx: 115, cy: 240, rx: 11, ry: 13, fill: '#451a03', halo: '#fef08a', stroke: '#1c1917' }
      ],
      'yam'
    )
  },
  {
    id: 'sample-y-2',
    name: 'Yam: Healthy Cordate Leaf',
    crop: 'yam',
    diseaseId: 'yam_healthy',
    tag: 'Lush Heart-Shaped Vine',
    description: 'Healthy deep green climbing yam leaf with distinct palmate veins and robust photosynthesis.',
    realImageUrl: 'https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#2d6a4f', '#74c69d', [], 'yam'
    )
  },

  // PEPPER
  {
    id: 'sample-pe-1',
    name: 'Pepper: Anthracnose Blight',
    crop: 'pepper',
    diseaseId: 'pepper_anthracnose',
    tag: 'Concentric Ring Lesions',
    description: 'Target-like circular necrotic lesions with dark rings and chlorotic yellowing on Scotch Bonnet pepper leaf.',
    realImageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#fefce8', '#52b788', '#95d5b2',
      [
        { cx: 90, cy: 140, rx: 14, ry: 15, fill: '#451a03', halo: '#fde047', stroke: '#1c1917' },
        { cx: 115, cy: 210, rx: 16, ry: 18, fill: '#312e81', halo: '#fef08a', stroke: '#1e1b4b' }
      ],
      'pepper'
    )
  },
  {
    id: 'sample-pe-2',
    name: 'Pepper: Healthy Certified Foliage',
    crop: 'pepper',
    diseaseId: 'pepper_healthy',
    tag: 'Smooth Vigorous Canopy',
    description: 'Glossy dark green ovate pepper leaf free of blemishes, supporting heavy blossom retention.',
    realImageUrl: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#1b4332', '#40916c', [], 'pepper'
    )
  },

  // OIL PALM
  {
    id: 'sample-op-1',
    name: 'Oil Palm: Frond Anthracnose',
    crop: 'oil_palm',
    diseaseId: 'oilpalm_anthracnose',
    tag: 'Marginal Scorch & Spotting',
    description: 'Dark brown elongated lesions with chlorotic halos along the leaflet edges of a young nursery Tenera palm.',
    realImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#fafaf9', '#52b788', '#95d5b2',
      [
        { cx: 105, cy: 120, rx: 10, ry: 25, fill: '#451a03', halo: '#fde047', stroke: '#1c1917' },
        { cx: 95, cy: 220, rx: 12, ry: 30, fill: '#78350f', halo: '#fef08a', stroke: '#292524' }
      ],
      'oil_palm'
    )
  },
  {
    id: 'sample-op-2',
    name: 'Oil Palm: Healthy Frond Pinnae',
    crop: 'oil_palm',
    diseaseId: 'oilpalm_healthy',
    tag: 'Clean Upright Frond',
    description: 'Vibrant, deep green linear leaflet with a strong midrib, unblemished by fungal spot or nutrient deficiency.',
    realImageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#1b4332', '#40916c', [], 'oil_palm'
    )
  },

  // COWPEA
  {
    id: 'sample-cp-1',
    name: 'Cowpea: Cercospora Leaf Spot',
    crop: 'cowpea',
    diseaseId: 'cowpea_cercospora',
    tag: 'Reddish-Purple Angular Spots',
    description: 'Abundant angular reddish-brown spots with grayish centers on trifoliate cowpea foliage from Tamale.',
    realImageUrl: '/crops/cowpea.jpg',
    svgDataUri: createLeafSvg(
      '#fefce8', '#52b788', '#95d5b2',
      [
        { cx: 85, cy: 120, rx: 7, ry: 7, fill: '#701a75', halo: '#fde047' },
        { cx: 120, cy: 150, rx: 8, ry: 8, fill: '#701a75', halo: '#fef08a' },
        { cx: 75, cy: 190, rx: 9, ry: 9, fill: '#581c87', halo: '#fde047' },
        { cx: 110, cy: 230, rx: 8, ry: 8, fill: '#701a75', halo: '#fef08a' }
      ],
      'cowpea'
    )
  },
  {
    id: 'sample-cp-2',
    name: 'Cowpea: Healthy Trifoliate Leaf',
    crop: 'cowpea',
    diseaseId: 'cowpea_healthy',
    tag: 'Vigorous Clean Foliage',
    description: 'Certified clean cowpea leaflet with healthy nitrogen-rich green pigmentation and upright growth.',
    realImageUrl: '/crops/cowpea.jpg',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#1b4332', '#40916c', [], 'cowpea'
    )
  }
];

export interface NonPlantSample {
  id: string;
  name: string;
  category: string;
  description: string;
  svgDataUri: string;
}

// Self-contained SVGs representing non-botanical objects for testing input validation
export const NON_PLANT_SAMPLES: NonPlantSample[] = [
  {
    id: 'sample-non-plant-phone',
    name: 'Office Desk & Smartphone',
    category: 'Electronics',
    description: 'Black smartphone lying on an office desk next to a pen. Lacks any chlorophyll or botanical structures.',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="100%" height="100%">
        <!-- Desk Surface -->
        <rect width="200" height="400" fill="#e2e8f0"/>
        <!-- Desk wood grain lines -->
        <path d="M0,80 L200,90 M0,210 L200,220 M0,320 L200,310" stroke="#cbd5e1" stroke-width="1.5"/>
        <!-- Smartphone Body -->
        <rect x="45" y="70" width="110" height="220" rx="16" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>
        <!-- Screen Glass -->
        <rect x="52" y="85" width="96" height="180" rx="8" fill="#38bdf8"/>
        <!-- Screen glare / reflection -->
        <path d="M60,95 L140,240 L120,240 L55,120 Z" fill="#ffffff" opacity="0.3"/>
        <!-- Home bar -->
        <rect x="85" y="252" width="30" height="3" rx="1.5" fill="#ffffff" opacity="0.8"/>
        <!-- Speaker / camera notch -->
        <ellipse cx="100" cy="78" rx="4" ry="2" fill="#334155"/>
        <!-- Ballpoint Pen beside phone -->
        <rect x="165" y="110" width="8" height="160" rx="4" fill="#dc2626"/>
        <path d="M165,110 L169,95 L173,110 Z" fill="#94a3b8"/>
      </svg>
    `)}`
  },
  {
    id: 'sample-non-plant-portrait',
    name: 'Human Face / Selfie',
    category: 'Portrait',
    description: 'Photo of a person wearing a blue shirt against a pale wall. Contains skin tones, hair, and clothing with no plant matter.',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="100%" height="100%">
        <!-- Indoor Wall -->
        <rect width="200" height="400" fill="#f1f5f9"/>
        <!-- Shirt / Shoulders -->
        <path d="M10,380 C10,300 50,260 100,260 C150,260 190,300 190,380 Z" fill="#2563eb"/>
        <!-- Collar -->
        <path d="M75,260 L100,300 L125,260 Z" fill="#1d4ed8"/>
        <!-- Neck -->
        <rect x="85" y="220" width="30" height="50" fill="#d97706"/>
        <!-- Head / Face -->
        <ellipse cx="100" cy="160" rx="45" ry="55" fill="#d97706"/>
        <!-- Hair -->
        <path d="M55,150 C55,100 80,90 100,90 C120,90 145,100 145,150 C135,115 115,105 100,105 C85,105 65,115 55,150 Z" fill="#1e1b4b"/>
        <!-- Eyes & Smile -->
        <ellipse cx="85" cy="155" rx="4" ry="2.5" fill="#1e1b4b"/>
        <ellipse cx="115" cy="155" rx="4" ry="2.5" fill="#1e1b4b"/>
        <path d="M88,185 Q100,195 112,185" stroke="#78350f" stroke-width="2" fill="none" stroke-linecap="round"/>
      </svg>
    `)}`
  },
  {
    id: 'sample-non-plant-vehicle',
    name: 'Farm Tractor / Machinery',
    category: 'Machinery',
    description: 'Agricultural tractor vehicle on gravel ground with metal framing and rubber tires.',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="100%" height="100%">
        <!-- Sky & Ground -->
        <rect width="200" height="230" fill="#bae6fd"/>
        <rect y="230" width="200" height="170" fill="#a8a29e"/>
        <!-- Tractor Body (Red Metal) -->
        <rect x="40" y="160" width="120" height="60" rx="6" fill="#dc2626"/>
        <!-- Cabin -->
        <rect x="95" y="110" width="60" height="55" rx="4" fill="#ef4444"/>
        <!-- Window Glass -->
        <rect x="105" y="118" width="42" height="35" rx="2" fill="#f8fafc"/>
        <!-- Exhaust Pipe -->
        <rect x="60" y="90" width="8" height="70" fill="#334155"/>
        <ellipse cx="64" cy="90" rx="4" ry="2" fill="#64748b"/>
        <!-- Large Rear Tire -->
        <circle cx="135" cy="225" r="35" fill="#18181b"/>
        <circle cx="135" cy="225" r="18" fill="#e2e8f0"/>
        <!-- Front Tire -->
        <circle cx="65" cy="235" r="22" fill="#18181b"/>
        <circle cx="65" cy="235" r="10" fill="#e2e8f0"/>
      </svg>
    `)}`
  }
];

export const UNCLEAR_SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'sample-unclear-maize-1',
    name: 'Maize: Blurry Foliage & Sun Glare',
    crop: 'maize',
    diseaseId: 'maize_blight',
    tag: 'Blurry & Glare (64% Conf)',
    description: 'Out-of-focus leaf blade with severe midday sun glare. Expected model confidence (~64%) falls below the 75% threshold, prompting to try a clearer image.',
    simulatedConfidence: 0.642,
    clarityQuality: 'low_clarity_ambiguous',
    svgDataUri: createLeafSvg(
      '#eef4ee', '#40916c', '#74c69d',
      [
        { cx: 95, cy: 120, rx: 12, ry: 40, fill: '#8d6e63', halo: '#d7ccc8', stroke: '#5d4037' },
        { cx: 110, cy: 220, rx: 14, ry: 50, fill: '#795548', halo: '#efebe9', stroke: '#4e342e' }
      ],
      'maize',
      { isBlurry: true, glareOverlay: true }
    )
  },
  {
    id: 'sample-unclear-tomato-1',
    name: 'Tomato: Ambiguous Faint Chlorosis',
    crop: 'tomato',
    diseaseId: 'tomato_blight',
    tag: 'Indistinct Lesions (68% Conf)',
    description: 'Faint yellowish foliar mottling without distinct necrotic halos or clear borders. Falls below the 75% threshold gate.',
    simulatedConfidence: 0.684,
    clarityQuality: 'low_clarity_ambiguous',
    svgDataUri: createLeafSvg(
      '#fbfefb', '#52b788', '#95d5b2',
      [
        { cx: 100, cy: 150, rx: 25, ry: 20, fill: '#6d4c41', halo: '#fff59d' }
      ],
      'tomato',
      { isBlurry: true, glareOverlay: false }
    )
  },
  {
    id: 'sample-unclear-cassava-1',
    name: 'Cassava: Motion-Blurred Frond',
    crop: 'cassava',
    diseaseId: 'cassava_cmd',
    tag: 'Motion Blur (61% Conf)',
    description: 'Hand-motion blurred cassava leaf where leaflet lobes and veins are streaked. Triggers the quality threshold safety prompt.',
    simulatedConfidence: 0.615,
    clarityQuality: 'low_clarity_ambiguous',
    svgDataUri: createLeafSvg(
      '#fefce8', '#74c69d', '#b7e4c7',
      [
        { cx: 100, cy: 110, rx: 14, ry: 30, fill: '#facc15' },
        { cx: 60, cy: 140, rx: 16, ry: 25, fill: '#eab308' },
        { cx: 140, cy: 140, rx: 16, ry: 25, fill: '#facc15' }
      ],
      'cassava',
      { isBlurry: true, glareOverlay: true }
    )
  }
];

export interface UnsupportedCropSample {
  id: string;
  name: string;
  botanicalName: string;
  cropCategory: string;
  description: string;
  svgDataUri: string;
  realImageUrl?: string;
}

export const UNSUPPORTED_CROP_SAMPLES: UnsupportedCropSample[] = [
  {
    id: 'sample-unsupported-apple',
    name: 'Apple Leaf (Malus domestica)',
    botanicalName: 'Malus domestica',
    cropCategory: 'Temperate Fruit',
    description: 'Fine-toothed ovate apple foliage. Authentic botanical leaf, but outside AgriScan Ghana\'s 9 supported crops.',
    realImageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#15803d', '#4ade80',
      [
        { cx: 100, cy: 120, rx: 14, ry: 18, fill: '#166534', halo: '#bbf7d0' },
        { cx: 90, cy: 210, rx: 12, ry: 16, fill: '#166534', halo: '#bbf7d0' }
      ],
      'tomato'
    )
  },
  {
    id: 'sample-unsupported-cabbage',
    name: 'Cabbage Leaf (Brassica oleracea)',
    botanicalName: 'Brassica oleracea',
    cropCategory: 'Cruciferous Leaf',
    description: 'Large waxy cabbage leaf blade with thick white veins. Genuine agricultural plant, but not part of Ghana\'s 9 target crops.',
    realImageUrl: 'https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#047857', '#6ee7b7',
      [
        { cx: 100, cy: 150, rx: 20, ry: 25, fill: '#065f46', halo: '#a7f3d0' }
      ],
      'yam'
    )
  },
  {
    id: 'sample-unsupported-rose',
    name: 'Rose Bush Foliage (Rosa spp.)',
    botanicalName: 'Rosa spp.',
    cropCategory: 'Ornamental Shrub',
    description: 'Pinnately compound serrated rose foliage. Genuine botanical plant, but ornamental flower outside agricultural pathology.',
    realImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    svgDataUri: createLeafSvg(
      '#f0fdf4', '#15803d', '#86efac',
      [
        { cx: 100, cy: 140, rx: 10, ry: 15, fill: '#14532d', halo: '#dcfce7' }
      ],
      'pepper'
    )
  }
];


