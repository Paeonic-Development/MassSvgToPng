const fs = require('fs');
const path = require('path');
const svgexport = require('svgexport');

const inputDir = './input';
const outputDir = './output';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.svg') {
      const svgPath = path.join(inputDir, file);
      const pngPath = path.join(outputDir, `${path.basename(file, '.svg')}.png`);

      svgexport.render({
        input: [svgPath, '100%'],
        output: [pngPath, '200%:200%', 'pad'],
        options: { background: 'transparent' }
      }, (err) => {
        if (err) {
          console.error('Error converting', file, 'to PNG:', err);
        } else {
          console.log('Converted', file, 'to PNG:', pngPath);
        }
      });
    }
  });
});
