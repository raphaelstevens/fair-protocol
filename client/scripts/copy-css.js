import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory with ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Remonter d'un niveau pour atteindre la racine du projet
const projectRoot = path.join(__dirname, '..', '..');

// Get absolute paths, en partant de la racine du projet
const sourceDir = path.join(projectRoot, 'assets', 'css');
const targetDir = path.join(projectRoot, 'static', 'css');

// Pour le debug
console.log('Source directory:', sourceDir);
console.log('Target directory:', targetDir);

// Ensure target directory exists
fs.ensureDirSync(targetDir);

// Copy files
try {
    fs.copySync(sourceDir, targetDir, {
        filter: (src) => {
            return path.extname(src) === '.css';
        }
    });
    console.log('CSS files copied successfully!');
} catch (err) {
    console.error('Error copying files:', err);
}