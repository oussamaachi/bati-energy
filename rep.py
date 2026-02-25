import os

src_dir = os.path.join(os.getcwd(), 'src')

replacements = {
  'https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=2675&auto=format&fit=crop': '/images/projet_solaire.png',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop': '/images/projet_territoire.png',
  'https://images.unsplash.com/photo-1483825366482-127926c59dbe?q=80&w=2647&auto=format&fit=crop': '/images/projet_eolien.png',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop': '/images/projet_audit.png',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop': '/images/formation.png',
  'https://images.unsplash.com/photo-1542614486-bd761b0c0a96?q=80&w=2670&auto=format&fit=crop': '/images/projet_territoire.png',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop': '/images/hero_texture.png',
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2672&auto=format&fit=crop': '/images/projet_solaire.png',
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2670&auto=format&fit=crop': '/images/projet_audit.png',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop': '/images/bureau.png',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop': '/images/formation.png',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop': '/images/bureau.png',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop': '/images/projet_territoire.png',
  'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2670&auto=format&fit=crop': '/images/bureau.png',
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2574&auto=format&fit=crop': '/images/projet_eolien.png',
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop': '/images/hero_texture.png',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop': '/images/hero_texture.png',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop': '/images/camille.png',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop': '/images/thomas.png',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop': '/images/sarah.png'
}

for root, dirs, files in os.walk(src_dir):
    for filename in files:
        if filename.endswith(".jsx"):
            filepath = os.path.join(root, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            changed = False
            for old_img, new_img in replacements.items():
                if old_img in content:
                    content = content.replace(old_img, new_img)
                    changed = True
            
            if True: # Always write
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Processed {filename}")

print("Done")
