"""
Replace all Photovoltaique references with Isolation across the BATI ENERGY website.
Emphasize CEE valorisation + Audit energetique as core activities.
"""
import os

BASE = r'c:\Users\omaac\OneDrive\Desktop\AGENCE\BATI ENERGY\bati-energy\src'

def fix_navbar():
    path = os.path.join(BASE, 'components', 'Navbar.jsx')
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Fix line 107 (index 106) - the broken mobile menu line
    lines[106] = '                                <NavLink to="/expertises#isolation" className={subLinkClass}>\U0001F3E0 Isolation Thermique</NavLink>\r\n'
    
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Fixed Navbar.jsx - mobile menu line 107")

def fix_expertises():
    path = os.path.join(BASE, 'pages', 'Expertises.jsx')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix diagnostic shuffler cards
    content = content.replace(
        "const cards = ['Audit \u00e9nerg\u00e9tique', 'Bureau d\\'\u00e9tudes', 'Valorisation CEE', 'Performance Tertiaire'];",
        "const cards = ['Audit \u00e9nerg\u00e9tique', 'Bureau d\\'\u00e9tudes', 'Valorisation CEE', 'Isolation Thermique'];"
    )
    
    # Replace section 2 comment
    content = content.replace(
        "{/* Expertise 2 : Photovolta\u00efque & PAC */}",
        "{/* Expertise 2 : Isolation Thermique & PAC */}"
    )
    
    # Replace section id
    content = content.replace(
        'id="photovoltaique"',
        'id="isolation"'
    )
    
    # Replace alt text
    content = content.replace(
        'alt="Installation Pompes \u00e0 chaleur et Solaire"',
        'alt="Isolation thermique et Pompes \u00e0 Chaleur"'
    )
    
    # Replace heading
    content = content.replace(
        'Photovolta\u00efque & Pompes \u00e0 Chaleur',
        'Isolation Thermique & Pompes \u00e0 Chaleur'
    )
    
    # Replace description
    content = content.replace(
        "Produisez votre propre \u00e9nergie et optimisez votre confort thermique avec des solutions durables et rentables, adapt\u00e9es aux particuliers et aux professionnels.",
        "Optimisez la performance thermique de vos b\u00e2timents avec des solutions d'isolation et de chauffage durables et rentables, adapt\u00e9es aux particuliers et aux professionnels."
    )
    
    # Now handle the photovoltaique subsection - need to work line by line
    lines = content.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Find the PV subsection heading (look for the sun emoji + Photovoltaique)
        if 'Photovolta\u00efque</h3>' in line and 'h3' in line:
            # Replace this heading with Isolation
            new_lines.append(line.replace('\u2600\ufe0f Photovolta\u00efque', '\U0001F3E0 Isolation Thermique').replace('Photovolta\u00efque', 'Isolation Thermique'))
            i += 1
            # Now replace the list items
            while i < len(lines):
                curr = lines[i]
                if 'Autoconsommation avec ou sans revente de surplus' in curr:
                    new_lines.append(curr.replace('Autoconsommation avec ou sans revente de surplus', 'Isolation des combles et toitures (souffl\u00e9e, d\u00e9roul\u00e9e, sarking)'))
                elif 'Centrales solaires pour toitures tertiaires et industrielles' in curr:
                    new_lines.append(curr.replace('Centrales solaires pour toitures tertiaires et industrielles', "Isolation des murs par l'int\u00e9rieur (ITI) et par l'ext\u00e9rieur (ITE)"))
                elif 'Ombri\u00e8res de parking photovolta\u00efques' in curr:
                    new_lines.append(curr.replace('Ombri\u00e8res de parking photovolta\u00efques', 'Isolation des planchers bas et calorifugeage des r\u00e9seaux'))
                else:
                    new_lines.append(curr)
                if '</ul>' in curr:
                    i += 1
                    break
                i += 1
        else:
            new_lines.append(line)
            i += 1
    
    content = '\n'.join(new_lines)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed Expertises.jsx")

def fix_contact():
    path = os.path.join(BASE, 'pages', 'Contact.jsx')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix default state
    content = content.replace(
        "const [projectType, setProjectType] = useState('Photovolta\u00efque');",
        "const [projectType, setProjectType] = useState('Isolation');"
    )
    
    # Remove comment
    content = content.replace(
        " // Photovolta\u00efque, PAC, Isolation, Audit",
        " // Isolation, PAC, Audit"
    )
    
    # Remove Photovoltaique from the calculator logic
    content = content.replace(
        """        if (projectType === 'Photovolta\u00efque') {
            baseSavingsPerM2 = 20; // Example values for simulation
            baseCeePerM2 = 0;      // Often different mechanisms for PV
            baseCo2PerM2 = 0.03;
            roiBase = 7;
        } else if (projectType === 'Isolation') {""",
        "        if (projectType === 'Isolation') {"
    )
    
    # Fix button array
    content = content.replace(
        "['Photovolta\u00efque', 'Pompes \u00e0 Chaleur', 'Isolation', 'Audit global']",
        "['Isolation', 'Pompes \u00e0 Chaleur', 'Audit global']"
    )
    
    # Fix select option
    content = content.replace(
        '<option value="solaire">Installation Photovolta\u00efque</option>',
        '<option value="isolation">Isolation Thermique (ITE, ITI, Combles)</option>'
    )
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed Contact.jsx")

def fix_apropos():
    path = os.path.join(BASE, 'pages', 'APropos.jsx')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix timeline item
    content = content.replace(
        'D\u00e9ploiement de solutions Photovolta\u00efques',
        "Renforcement du p\u00f4le Valorisation CEE"
    )
    
    # Fix mission text  
    content = content.replace(
        "De l'audit initial \u00e0 la conception de solutions photovolta\u00efques et de pompes \u00e0 chaleur",
        "De l'audit initial \u00e0 la conception de solutions d'isolation thermique et de pompes \u00e0 chaleur"
    )
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed APropos.jsx")

def fix_accueil():
    path = os.path.join(BASE, 'pages', 'Accueil.jsx')
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace hero headline - emphasize CEE and audit
    content = content.replace(
        "Produisez votre propre",
        "Maximisez votre"
    )
    content = content.replace(
        "\u00e9nergie solaire.",
        "efficacit\u00e9 \u00e9nerg\u00e9tique."
    )
    
    # Replace hero subtext - emphasize audit, isolation, PAC, CEE
    content = content.replace(
        "Simulez vos \u00e9conomies d'\u00e9nergie gr\u00e2ce au photovolta\u00efque et aux pompes \u00e0 chaleur. Des solutions cl\u00e9s en main, de l'\u00e9tude \u00e0 l'installation.",
        "Audit \u00e9nerg\u00e9tique, isolation thermique, pompes \u00e0 chaleur et valorisation CEE. Des solutions cl\u00e9s en main, de l'\u00e9tude \u00e0 la r\u00e9alisation."
    )
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed Accueil.jsx")

# Run all fixes
print("=== Replacing Photovoltaique with Isolation ===")
print("=== Emphasis: CEE + Audit energetique ===\n")
fix_navbar()
fix_expertises()
fix_contact()
fix_apropos()
fix_accueil()

# Verify no photovoltaique remains
print("\n=== Verification ===")
import re
for root, dirs, files in os.walk(BASE):
    for fname in files:
        if fname.endswith(('.jsx', '.js')):
            fpath = os.path.join(root, fname)
            with open(fpath, 'r', encoding='utf-8') as f:
                text = f.read()
            matches = [m for m in re.finditer(r'photovolta', text, re.IGNORECASE)]
            if matches:
                for m in matches:
                    line_num = text[:m.start()].count('\n') + 1
                    line = text.split('\n')[line_num - 1].strip()
                    print(f"  REMAINING in {fname}:{line_num}: {line[:80]}")
            
            # Also check for 'solaire' in non-comment context
            solaire_matches = [m for m in re.finditer(r'solaire', text, re.IGNORECASE)]
            for m in solaire_matches:
                line_num = text[:m.start()].count('\n') + 1
                line = text.split('\n')[line_num - 1].strip()
                print(f"  SOLAIRE in {fname}:{line_num}: {line[:80]}")

print("\n=== All done! ===")
