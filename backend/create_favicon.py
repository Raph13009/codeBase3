from PIL import Image, ImageDraw, ImageFont
import os

def create_favicon():
    """
    Crée un favicon carré avec les initiales "BA" dans le style BoostAI.
    """
    # Dimensions pour favicon (standard: 32x32, 64x64, 128x128, 256x256)
    sizes = [32, 64, 128, 256, 512]
    
    for size in sizes:
        # Créer une image avec fond transparent
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Couleurs du gradient
        color1 = (61, 47, 87)  # #3D2F57
        color2 = (90, 74, 111)  # #5a4a6f
        
        # Essayer de charger une police bold
        try:
            # Pour macOS
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", int(size * 0.5))
        except:
            try:
                # Pour Linux
                font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", int(size * 0.5))
            except:
                # Police par défaut
                font = ImageFont.load_default()
        
        # Texte "BA"
        text = "BA"
        
        # Calculer la position pour centrer
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - int(size * 0.05)  # Légèrement décalé vers le haut
        
        # Dessiner le texte avec la couleur du gradient (on utilise color1 comme base)
        # Pour un meilleur effet, on pourrait faire un vrai gradient, mais pour un favicon simple, on utilise la couleur principale
        draw.text((x, y), text, fill=color1, font=font)
        
        # Optionnel: ajouter un contour subtil pour plus de visibilité
        # draw.text((x-1, y-1), text, fill=(0, 0, 0, 50), font=font)
        
        # Sauvegarder
        output_path = f'lp/LP-BC/img/favicon-{size}x{size}.png'
        img.save(output_path, 'PNG')
        print(f"✅ Favicon créé : {output_path} ({size}x{size}px)")
    
    # Créer aussi un favicon.ico (format ICO)
    # Pour cela, on prend la version 32x32 et 16x16
    try:
        # Créer les versions 16x16 et 32x32 pour l'ICO
        sizes_ico = [16, 32]
        ico_images = []
        
        for size in sizes_ico:
            img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
            draw = ImageDraw.Draw(img)
            
            color1 = (61, 47, 87)
            
            try:
                font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", int(size * 0.5))
            except:
                try:
                    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", int(size * 0.5))
                except:
                    font = ImageFont.load_default()
            
            text = "BA"
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            x = (size - text_width) // 2
            y = (size - text_height) // 2 - int(size * 0.05)
            
            draw.text((x, y), text, fill=color1, font=font)
            ico_images.append(img)
        
        # Sauvegarder en ICO (PIL ne supporte pas directement ICO, on sauvegarde en PNG)
        # Pour un vrai .ico, il faudrait utiliser une bibliothèque spécialisée
        output_ico = 'lp/LP-BC/img/favicon.png'
        ico_images[-1].save(output_ico, 'PNG')  # Sauvegarder la version 32x32 comme favicon.png
        print(f"✅ Favicon principal créé : {output_ico} (32x32px)")
        
    except Exception as e:
        print(f"⚠️  Erreur lors de la création de l'ICO : {e}")

if __name__ == "__main__":
    create_favicon()
    print("\n✅ Tous les favicons ont été créés !")
    print("   Vous pouvez utiliser favicon-256x256.png ou favicon-512x512.png pour votre site.")

