"""
Fix mojibake (double-encoded UTF-8) in source files.
The files were saved as Latin-1/CP1252 but contain UTF-8 byte sequences,
resulting in characters like Ã© instead of é.
"""

import os

# Mapping of common mojibake patterns to correct UTF-8 characters
REPLACEMENTS = {
    'Ã©': 'é',
    'Ã¨': 'è',
    'Ãª': 'ê',
    'Ã ': 'à',
    'Ã¢': 'â',
    'Ã´': 'ô',
    'Ã¯': 'ï',
    'Ã®': 'î',
    'Ã¹': 'ù',
    'Ã»': 'û',
    'Ã§': 'ç',
    'Ã‰': 'É',
    'Ãˆ': 'È',
    'Ã€': 'À',
    'Ã"': 'Ô',
    'Ã"': 'Ó',
    'â€"': '–',  # en dash
    'â€"': '—',  # em dash (if different encoding)
    'â€™': "'",   # right single quote
    'â€˜': "'",   # left single quote  
    'â€œ': '"',   # left double quote
    'â€\x9d': '"',   # right double quote
    'â€¦': '…',   # ellipsis
    'Â ': ' ',    # non-breaking space artifact
    'Â«': '«',    # left guillemet
    'Â»': '»',    # right guillemet
    'Â°': '°',    # degree sign
    'â‚¬': '€',   # euro sign
    'Ã¼': 'ü',
    'Ã¶': 'ö',
    'Ã¤': 'ä',
    'Ã«': 'ë',
    'Ã¬': 'ì',
    'Ã£': 'ã',
    'Ã±': 'ñ',
    'Ãœ': 'Ü',
    'â„': '℗',
    'âœ"': '✔',
    # Special fix for PÔLE which shows as PÃ"LE  
}

# Files to fix
BASE = r'c:\Users\omaac\OneDrive\Desktop\AGENCE\BATI ENERGY\bati-energy\src'
FILES = [
    os.path.join(BASE, 'pages', 'Expertises.jsx'),
    os.path.join(BASE, 'pages', 'Contact.jsx'),
    os.path.join(BASE, 'pages', 'APropos.jsx'),
    os.path.join(BASE, 'components', 'Navbar.jsx'),
    os.path.join(BASE, 'components', 'Footer.jsx'),
    os.path.join(BASE, 'components', 'CookieConsent.jsx'),
    os.path.join(BASE, 'pages', 'Accueil.jsx'),
    os.path.join(BASE, 'pages', 'FormationAudit.jsx'),
    os.path.join(BASE, 'pages', 'Projets.jsx'),
    os.path.join(BASE, 'pages', 'PolitiqueConfidentialite.jsx'),
    os.path.join(BASE, 'pages', 'Blog.jsx'),
    os.path.join(BASE, 'pages', 'BlogPost.jsx'),
    os.path.join(BASE, 'data', 'blogData.js'),
]

def fix_file(filepath):
    if not os.path.exists(filepath):
        print(f"  SKIP (not found): {filepath}")
        return False
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        # Try reading as latin-1 first
        with open(filepath, 'r', encoding='latin-1') as f:
            content = f.read()
    
    original = content
    
    for bad, good in REPLACEMENTS.items():
        content = content.replace(bad, good)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count = sum(1 for bad in REPLACEMENTS if bad in original)
        print(f"  FIXED: {os.path.basename(filepath)} ({count} pattern types replaced)")
        return True
    else:
        print(f"  OK (no changes): {os.path.basename(filepath)}")
        return False

print("=== Fixing mojibake encoding ===\n")
fixed_count = 0
for f in FILES:
    result = fix_file(f)
    if result:
        fixed_count += 1

print(f"\n=== Done! Fixed {fixed_count} files ===")
