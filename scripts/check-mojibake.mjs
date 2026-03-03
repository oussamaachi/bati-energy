import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const ROOT = process.cwd();
const TARGETS = [resolve(ROOT, 'src'), resolve(ROOT, 'index.html')];
const EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.html']);
const PATTERN = /Ã|âœ|ðŸ|ï¸|â/;

const findings = [];

const walk = (currentPath) => {
  const stats = statSync(currentPath);

  if (stats.isDirectory()) {
    for (const entry of readdirSync(currentPath)) {
      walk(join(currentPath, entry));
    }
    return;
  }

  if (!EXTENSIONS.has(extname(currentPath))) return;

  const content = readFileSync(currentPath, 'utf8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (PATTERN.test(line)) {
      findings.push({
        file: currentPath.replace(`${ROOT}\\`, ''),
        line: index + 1,
        text: line.trim(),
      });
    }
  });
};

for (const target of TARGETS) {
  walk(target);
}

if (findings.length) {
  console.error('Mojibake patterns detected:');
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line}`);
    console.error(`  ${finding.text}`);
  }
  process.exit(1);
}

console.log('No mojibake patterns detected.');
