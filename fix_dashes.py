"""Fix remaining mojibake: corrupted dashes (â€" -> –) across all files."""
import os

BASE = r'c:\Users\omaac\OneDrive\Desktop\AGENCE\BATI ENERGY\bati-energy\src'

# Common mojibake for dashes and quotes
REPLACEMENTS = {
    '\u00e2\u20ac\u201c': '\u2013',  # en dash â€" -> –
    '\u00e2\u20ac\u201d': '\u2014',  # em dash â€" -> —  
    '\u00e2\u20ac\u2122': '\u2019',  # right single quote â€™ -> '
    '\u00e2\u20ac\u0153': '\u201c',  # left double quote â€œ -> "
    '\u00e2\u20ac\u009d': '\u201d',  # right double quote
    '\u00c3\u0178': '\u00df',        # ß
}

files_fixed = 0
for root, dirs, files in os.walk(BASE):
    # Skip node_modules
    if 'node_modules' in root:
        continue
    for fname in files:
        if not fname.endswith(('.jsx', '.js')):
            continue
        fpath = os.path.join(root, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        for bad, good in REPLACEMENTS.items():
            content = content.replace(bad, good)
        
        if content != original:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed: {fname}")
            files_fixed += 1

print(f"\nFixed {files_fixed} files")
