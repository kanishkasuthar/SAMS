const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const imgPath = '/Users/kanishkasuthar/.gemini/antigravity/brain/21407133-30a5-4faa-85ce-42c9d788e6b8/media__1784030012117.png';
const outDir = path.join(__dirname, 'public', 'avatars');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

Jimp.read(imgPath).then(img => {
  const width = img.bitmap.width;
  const height = img.bitmap.height;
  
  const cols = 6;
  const rows = 4;
  
  const cellW = width / cols;
  const cellH = height / rows;
  
  let avatarPaths = [];
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Find the center of the cell
      const cx = c * cellW + cellW / 2;
      const cy = r * cellH + cellH / 2;
      
      // Calculate a square crop based on the smaller dimension to prevent wide/tall cells
      const side = Math.min(cellW, cellH) * 0.95; // 95% of cell size to crop out some grey background
      
      const x = Math.floor(cx - side / 2);
      const y = Math.floor(cy - side / 2);
      const w = Math.floor(side);
      const h = Math.floor(side);
      
      const avatarImg = img.clone().crop({ x, y, w, h });
      
      const fileName = `avatar-${r}-${c}.png`;
      const outPath = path.join(outDir, fileName);
      avatarImg.write(outPath);
      avatarPaths.push(`/avatars/${fileName}`);
    }
  }
  
  const jsContent = `export const CUTE_AVATARS = ${JSON.stringify(avatarPaths, null, 2)};\n`;
  fs.writeFileSync(path.join(__dirname, 'src', 'utils', 'avatarGenerator.js'), jsContent);
  console.log('Done generating avatars!');
}).catch(err => {
  console.error(err);
});
