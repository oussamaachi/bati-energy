import sys
try:
    from PIL import Image
    import os

    # Configuration
    input_path = "public/logo.png"
    output_path = "public/logo.webp"

    # Vérifiez si le fichier existe
    if not os.path.exists(input_path):
        print(f"Erreur : Le fichier {input_path} n'existe pas.")
        sys.exit(1)

    # Ouvrir l'image
    img = Image.open(input_path)
    
    # Redimensionnement (optionnel, pour vraiment optimiser)
    # L'image fait 7.3 MB, on va la limiter à 1024px de large max en conservant le ratio
    max_width = 1024
    if img.width > max_width:
        ratio = max_width / img.width
        new_height = int(img.height * ratio)
        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
    
    # Enregistrer en WebP optimisé
    img.save(output_path, "WEBP", quality=85, method=6)
    
    original_size = os.path.getsize(input_path) / (1024 * 1024)
    new_size = os.path.getsize(output_path) / (1024 * 1024)
    
    print(f"Compression réussie !")
    print(f"Taille originale : {original_size:.2f} MB")
    print(f"Nouvelle taille (WebP) : {new_size:.4f} MB")

except ImportError:
    print("Erreur : La librairie 'Pillow' n'est pas installée.")
    print("Veuillez installer avec : pip install Pillow")
except Exception as e:
    print(f"Une erreur est survenue : {e}")
