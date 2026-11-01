const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// 1. Regular App Icon SVG (with squircle background for browser / desktop display)
const anySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#065f46"/>
      <stop offset="50%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#022c22"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Background Base with rounded corners -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>
  
  <!-- Subtle circular radar rings in background -->
  <circle cx="256" cy="235" r="190" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="6,6" opacity="0.25"/>
  <circle cx="256" cy="235" r="140" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.3"/>
  
  <!-- Outer Gold Tech Accent Ring -->
  <rect x="22" y="22" width="468" height="468" rx="98" fill="none" stroke="url(#goldGrad)" stroke-width="4" opacity="0.5"/>

  <!-- AI Scanner Reticles (AgriScan Tech motif) -->
  <path d="M 68 120 L 68 68 L 120 68" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 444 120 L 444 68 L 392 68" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 68 392 L 68 444 L 120 444" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 444 392 L 444 444 L 392 444" stroke="url(#goldGrad)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- Central Stylized Diagnostic Leaf Shield -->
  <g filter="url(#shadow)">
    <path d="M 256 85 C 180 130 155 205 178 275 C 196 330 240 370 256 380 C 272 370 316 330 334 275 C 357 205 332 130 256 85 Z" 
          fill="url(#leafGrad)" opacity="0.95"/>
    <path d="M 256 120 L 256 355" stroke="#064e3b" stroke-width="6" stroke-linecap="round" opacity="0.75"/>
    <path d="M 256 175 Q 220 155 195 180" stroke="#064e3b" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    <path d="M 256 195 Q 292 175 317 200" stroke="#064e3b" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    <path d="M 256 245 Q 215 230 190 260" stroke="#064e3b" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    <path d="M 256 265 Q 297 250 322 280" stroke="#064e3b" stroke-width="4.5" stroke-linecap="round" fill="none" opacity="0.7"/>
  </g>

  <!-- Glowing Emblem Badge behind initials -->
  <rect x="76" y="215" width="360" height="96" rx="24" fill="#022c22" fill-opacity="0.92" stroke="url(#goldGrad)" stroke-width="3.5" filter="url(#shadow)"/>

  <!-- AGSG Initials Typography -->
  <text x="256" y="286" 
        text-anchor="middle" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="68" 
        font-weight="900" 
        letter-spacing="5" 
        fill="#ffffff">
    AGSG
  </text>

  <!-- Ghana Gold Star -->
  <polygon points="256,214 260,223 270,223 262,229 265,239 256,233 247,239 250,229 242,223 252,223" fill="url(#goldGrad)" filter="url(#shadow)"/>

  <!-- Subtitle Tag: AGRISCAN GHANA -->
  <g filter="url(#shadow)">
    <rect x="136" y="335" width="240" height="30" rx="8" fill="#f59e0b"/>
    <text x="256" y="355" 
          text-anchor="middle" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-size="13" 
          font-weight="800" 
          letter-spacing="3" 
          fill="#064e3b">
      AGRISCAN GHANA
    </text>
  </g>
  
  <!-- Offline AI / Crop Diagnostic Micro Badge -->
  <text x="256" y="412" 
        text-anchor="middle" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="11" 
        font-weight="600" 
        letter-spacing="1.5" 
        fill="#6ee7b7" 
        opacity="0.9">
    CROP DISEASE AI • GHANA
  </text>
</svg>
`;

// 2. Maskable Icon SVG (Full bleed, safe-zone padded)
const maskableSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#065f46"/>
      <stop offset="50%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#022c22"/>
    </linearGradient>
    <linearGradient id="goldGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="leafGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="shadowMask" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Full Bleed Background (NO border radius - required for maskable) -->
  <rect width="512" height="512" fill="url(#bgGradMask)"/>
  
  <!-- Subtle decorative rings inside the safe zone (r=175 <= 204 safe zone) -->
  <circle cx="256" cy="245" r="175" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="6,6" opacity="0.3"/>
  <circle cx="256" cy="245" r="130" fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.35"/>

  <!-- Scanner corners located strictly inside safe zone -->
  <path d="M 100 140 L 100 100 L 140 100" stroke="url(#goldGradMask)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 412 140 L 412 100 L 372 100" stroke="url(#goldGradMask)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 100 350 L 100 390 L 140 390" stroke="url(#goldGradMask)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 412 350 L 412 390 L 372 390" stroke="url(#goldGradMask)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- Central Stylized Leaf (strictly within safe zone) -->
  <g filter="url(#shadowMask)">
    <path d="M 256 115 C 195 152 175 215 194 272 C 209 318 244 350 256 360 C 268 350 303 318 318 272 C 337 215 317 152 256 115 Z" 
          fill="url(#leafGradMask)" opacity="0.95"/>
    <path d="M 256 145 L 256 340" stroke="#064e3b" stroke-width="5" stroke-linecap="round" opacity="0.75"/>
    <path d="M 256 190 Q 225 175 205 195" stroke="#064e3b" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.7"/>
    <path d="M 256 205 Q 287 190 307 210" stroke="#064e3b" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.7"/>
    <path d="M 256 245 Q 222 230 202 255" stroke="#064e3b" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.7"/>
    <path d="M 256 260 Q 290 245 310 270" stroke="#064e3b" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.7"/>
  </g>

  <!-- Emblem Badge for Initials -->
  <rect x="106" y="215" width="300" height="84" rx="20" fill="#022c22" fill-opacity="0.92" stroke="url(#goldGradMask)" stroke-width="3" filter="url(#shadowMask)"/>

  <!-- AGSG Initials Typography -->
  <text x="256" y="276" 
        text-anchor="middle" 
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="58" 
        font-weight="900" 
        letter-spacing="4" 
        fill="#ffffff">
    AGSG
  </text>

  <!-- Ghana Gold Star -->
  <polygon points="256,212 259,219 267,219 261,224 263,232 256,227 249,232 251,224 245,219 253,219" fill="url(#goldGradMask)" filter="url(#shadowMask)"/>

  <!-- Subtitle Tag: AGRISCAN GHANA -->
  <g filter="url(#shadowMask)">
    <rect x="156" y="318" width="200" height="26" rx="6" fill="#f59e0b"/>
    <text x="256" y="335" 
          text-anchor="middle" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-size="11" 
          font-weight="800" 
          letter-spacing="2.5" 
          fill="#064e3b">
      AGRISCAN GHANA
    </text>
  </g>
</svg>
`;

async function main() {
  console.log('Generating AGSG App Icons into ' + publicDir);

  // 1. Write SVGs
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), anySvg.trim());
  fs.writeFileSync(path.join(publicDir, 'icon-maskable.svg'), maskableSvg.trim());
  console.log('✓ Wrote icon.svg and icon-maskable.svg');

  // 2. Render 512x512 any
  await sharp(Buffer.from(anySvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✓ Rendered pwa-512x512.png');

  // 3. Render 192x192 any
  await sharp(Buffer.from(anySvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✓ Rendered pwa-192x192.png');

  // 4. Render 512x512 maskable (strictly within 80% safe zone)
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('✓ Rendered pwa-maskable-512x512.png');

  // 5. Render Apple Touch Icon (180x180)
  await sharp(Buffer.from(anySvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Rendered apple-touch-icon.png');

  console.log('All icons generated successfully!');
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
