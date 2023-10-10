const fs = require('fs');
const path = require('path');

function renameFilesInDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      renameFilesInDir(filePath);
    } else if (path.extname(file) === '.tsx') {
      fs.renameSync(filePath, path.join(dir, path.basename(file, '.tsx') + '.js'));
    }
  });
}

renameFilesInDir('./workspace')