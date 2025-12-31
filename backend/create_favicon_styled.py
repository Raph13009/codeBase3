from PIL import Image, ImageDraw, ImageFont
import os

def create_styled_favicon():
    """
    Crée un favicon carré stylé avec les initiales "BA" et un fond arrondi avec gradient.
    """
    sizes = [32, 64, 128, 256, 512]
    
    for size in sizes:
        # Créer une image avec fond transparent
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Couleurs du gradient
        color1 = (61, 47, 87)  # #3D2F57
        color2 = (90, 74, 111)  # #5a4a6f
        
        # Dessiner un fond arrondi avec gradient (simulation avec color1)
        corner_radius = int(size * 0.2)  # 20% du size pour les coins arrondis
        
        # Créer un masque pour les coins arrondis
        mask = Image.new('L', (size, size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([(0, 0), (size, size)], corner_radius, fill=255)
        
        # Fond avec gradient (on simule avec color1, mais on pourrait faire mieux)
        draw.rounded_rectangle([(0, 0), (size, size)], corner_radius, fill=color1)
        
        # Essayer de charger une police bold
        try:
            # Pour macOS
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", int(size * 0.55))
        except:
            try:
                # Pour Linux
                font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", int(size * 0.55))
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
        y = (size - text_height) // 2 - int(size * 0.02)  # Légèrement décalé vers le haut
        
        # Dessiner le texte en blanc pour contraster avec le fond violet
        draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
        
        # Sauvegarder
        output_path = f'lp/LP-BC/img/favicon-styled-{size}x{size}.png'
        img.save(output_path, 'PNG')
        print(f"✅ Favicon stylé créé : {output_path} ({size}x{size}px)")
    
    # Créer le favicon principal
    img_main = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
    draw_main = ImageDraw.Draw(img_main)
    
    color1 = (61, 47, 87)
    corner_radius = 6
    
    draw_main.rounded_rectangle([(0, 0), (32, 32)], corner_radius, fill=color1)
    
    try:
        font_main = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 18)
    except:
        try:
            font_main = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18)
        except:
            font_main = ImageFont.load_default()
    
    text = "BA"
    bbox = draw_main.textbbox((0, 0), text, font=font_main)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (32 - text_width) // 2
    y = (32 - text_height) // 2 - 1
    
    draw_main.text((x, y), text, fill=(255, 255, 255, 255), font=font_main)
    
    output_main = 'lp/LP-BC/img/favicon-styled.png'
    img_main.save(output_main, 'PNG')
    print(f"✅ Favicon principal stylé créé : {output_main} (32x32px)")

if __name__ == "__main__":
    create_styled_favicon()
    print("\n✅ Tous les favicons stylés ont été créés !")

