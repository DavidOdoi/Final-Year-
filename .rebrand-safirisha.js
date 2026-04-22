const fs = require('fs');
const path = require('path');
const root = process.cwd();
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.md', '.html', '.json', '.css']);
function walk(dir) {
    for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, name.name);
        if (name.isDirectory()) {
            if (name.name === 'node_modules' || name.name === '.git') continue;
            walk(p);
        } else if (name.isFile() && exts.has(path.extname(name.name))) {
            let content = fs.readFileSync(p, 'utf8');
            let updated = content.replace(/ELOGISTICA/g, 'ELOGISTICA');
            updated = updated.replace(/info@ELOGISTICA\.com/g, 'info@elogistica.com');
            if (updated !== content) fs.writeFileSync(p, updated, 'utf8');
        }
    }
}
walk(root);
console.log('done');

