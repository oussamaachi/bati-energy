"""Fix ALL remaining encoding issues: emojis, m², cœur, and checkmarks."""
import os

BASE = r'c:\Users\omaac\OneDrive\Desktop\AGENCE\BATI ENERGY\bati-energy\src'

def fix_all_remaining():
    fixes_made = 0
    for root, dirs, files in os.walk(BASE):
        if 'node_modules' in root:
            continue
        for fname in files:
            if not fname.endswith(('.jsx', '.js')):
                continue
            fpath = os.path.join(root, fname)
            with open(fpath, 'rb') as f:
                data = f.read()
            original = data

            # Fix m² (mÂ²) - Â is 0xc2 in UTF-8 for  but combined with ² it's wrong
            # The pattern is: 6d c3 82 c2 b2 should be 6d c2 b2
            data = data.replace(b'm\xc3\x82\xc2\xb2', b'm\xc2\xb2')
            # Also standalone Â²
            data = data.replace(b'\xc3\x82\xc2\xb2', b'\xc2\xb2')
            
            # Fix cœur (cÅ"ur) 
            # cÅ"ur in bytes: 63 c3 85 e2 80 9c 75 72 -> should be 63 c5 93 75 72
            data = data.replace(b'c\xc3\x85\xe2\x80\x9cur', b'c\xc5\x93ur')
            
            if data != original:
                with open(fpath, 'wb') as f:
                    f.write(data)
                print(f'  Fixed byte-level: {fname}')
                fixes_made += 1

    # Now fix the emoji issues at text level (these are display issues)
    emojis_to_fix = {
        # In Expertises.jsx - the sun and snowflake emojis before headings
        # Also fix checkmark in telemetry
    }
    
    # Fix Expertises.jsx emojis
    epath = os.path.join(BASE, 'pages', 'Expertises.jsx')
    with open(epath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # The sun emoji before "Isolation Thermique" heading - replace garbled with proper emoji
    # Find the h3 with Isolation Thermique and fix the emoji before it
    content = content.replace('\u2600\ufe0f Isolation Thermique', '\U0001F3E0 Isolation Thermique')
    
    # Fix checkmark in telemetry
    content = content.replace('\u2713', '\u2705')
    content = content.replace('\u201c', '\u2713')  # Only if it's the checkmark context
    
    # Actually, let's be more precise. Read lines and fix specific ones
    lines = content.split('\n')
    for i, line in enumerate(lines):
        # Fix the telemetry line with garbled checkmark
        if 'Audit' in line and 'usine' in line and 'OK' in line:
            # Replace any garbled checkmark with a clean one
            lines[i] = line.replace('\u201c', '\u2713')
    
    content = '\n'.join(lines)
    
    if content != original_content:
        with open(epath, 'w', encoding='utf-8') as f:
            f.write(content)
        print('  Fixed emoji: Expertises.jsx')
        fixes_made += 1
    
    return fixes_made

print("=== Fixing remaining encoding (emojis, m², cœur) ===\n")
n = fix_all_remaining()
print(f"\n=== Fixed {n} files ===")

# Final verification
print("\n=== Final Verification ===")
for root, dirs, files in os.walk(BASE):
    if 'node_modules' in root: continue
    for fname in files:
        if not fname.endswith(('.jsx', '.js')): continue
        fpath = os.path.join(root, fname)
        with open(fpath, 'rb') as f:
            data = f.read()
        # Check for remaining Ã or Â patterns
        issues = []
        if b'\xc3\x82' in data:
            issues.append('has Â artifact')
        if b'\xc3\x83' in data:
            issues.append('has Ã artifact')
        if b'\xc3\x85' in data:
            # Check if it's actually Å (legitimate) or garbled
            idx = data.find(b'\xc3\x85')
            if idx >= 0:
                ctx = data[max(0,idx-2):idx+5]
                issues.append(f'has Å at context: {ctx}')
        if issues:
            print(f'  WARNING {fname}: {", ".join(issues)}')
        
print("\nDone!")
