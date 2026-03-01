"""
Fix remaining mojibake encoding issues - working at byte level.
"""

import os

BASE = r'c:\Users\omaac\OneDrive\Desktop\AGENCE\BATI ENERGY\bati-energy\src'
FILES = [
    os.path.join(BASE, 'pages', 'Expertises.jsx'),
    os.path.join(BASE, 'pages', 'Contact.jsx'),
    os.path.join(BASE, 'pages', 'APropos.jsx'),
    os.path.join(BASE, 'components', 'Navbar.jsx'),
]

# byte-level replacements for remaining issues
BYTE_REPLACEMENTS = [
    # PÃ"LE -> PÔLE (the Ô is triple-encoded as c3 83 e2 80 9d)
    (b'\xc3\x83\xe2\x80\x9d', 'Ô'.encode('utf-8')),
    # Any other remaining double-encoded sequences
    (b'\xc3\x83\xc2\xa9', 'é'.encode('utf-8')),
    (b'\xc3\x83\xc2\xa8', 'è'.encode('utf-8')),
    (b'\xc3\x83\xc2\xa0', 'à'.encode('utf-8')),
    (b'\xc3\x83\xc2\xaf', 'ï'.encode('utf-8')),
    (b'\xc3\x83\xc2\xa7', 'ç'.encode('utf-8')),
    (b'\xc3\x83\xc2\xaa', 'ê'.encode('utf-8')),
    (b'\xc3\x83\xc2\xb4', 'ô'.encode('utf-8')),
    (b'\xc3\x83\xc2\xae', 'î'.encode('utf-8')),
    (b'\xc3\x83\xc2\xb9', 'ù'.encode('utf-8')),
    (b'\xc3\x83\xc2\xbb', 'û'.encode('utf-8')),
    (b'\xc3\x83\xc2\xa2', 'â'.encode('utf-8')),
]

print("=== Fixing remaining byte-level encoding issues ===\n")

for filepath in FILES:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'rb') as f:
        data = f.read()
    
    original = data
    for bad_bytes, good_bytes in BYTE_REPLACEMENTS:
        count = data.count(bad_bytes)
        if count > 0:
            print(f"  {os.path.basename(filepath)}: replacing {bad_bytes} -> {good_bytes.decode('utf-8')} ({count} times)")
            data = data.replace(bad_bytes, good_bytes)
    
    if data != original:
        with open(filepath, 'wb') as f:
            f.write(data)
        print(f"  -> SAVED: {os.path.basename(filepath)}")
    else:
        print(f"  OK: {os.path.basename(filepath)}")

print("\n=== Verification ===")
# Verify no more bad patterns
for filepath in FILES:
    with open(filepath, 'rb') as f:
        data = f.read()
    # Check for any remaining Ã sequences (0xc3 0x83 = double-encoded Ã)
    count = data.count(b'\xc3\x83')
    if count > 0:
        print(f"  WARNING: {os.path.basename(filepath)} still has {count} potential issues")
        # Show context
        idx = 0
        while True:
            idx = data.find(b'\xc3\x83', idx)
            if idx == -1:
                break
            context = data[max(0,idx-10):idx+20]
            print(f"    at byte {idx}: {context}")
            idx += 1
    else:
        print(f"  CLEAN: {os.path.basename(filepath)}")

print("\n=== Done! ===")
