from PIL import Image, ImageDraw, ImageFont
import os

def create_modern_favicon():
    """
    Crée un favicon moderne avec "BA", le A avec une barre et une découpe stylisée.
    """
    sizes = [32, 64, 128, 256, 512]
    
    for size in sizes:
        # Créer une image avec fond transparent
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Couleurs du gradient
        color1 = (61, 47, 87)  # #3D2F57
        color2 = (90, 74, 111)  # #5a4a6f
        
        # Dessiner un fond arrondi avec gradient
        corner_radius = int(size * 0.15)  # Coins arrondis
        
        # Fond avec gradient (on simule avec un dégradé simple)
        # Pour un vrai gradient, on devrait utiliser ImageDraw.linear_gradient mais PIL ne le supporte pas directement
        # On utilise color1 comme base
        draw.rounded_rectangle([(0, 0), (size, size)], corner_radius, fill=color1)
        
        # Essayer de charger une police bold
        try:
            # Pour macOS
            font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", int(size * 0.5))
            font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", int(size * 0.08))
        except:
            try:
                # Pour Linux
                font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", int(size * 0.5))
                font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", int(size * 0.08))
            except:
                # Police par défaut
                font_large = ImageFont.load_default()
                font_small = ImageFont.load_default()
        
        # Texte "B"
        text_b = "B"
        bbox_b = draw.textbbox((0, 0), text_b, font=font_large)
        text_width_b = bbox_b[2] - bbox_b[0]
        text_height_b = bbox_b[3] - bbox_b[1]
        
        x_b = int(size * 0.25) - text_width_b // 2
        y_b = int(size * 0.35) - text_height_b // 2
        
        draw.text((x_b, y_b), text_b, fill=(255, 255, 255, 255), font=font_large)
        
        # Texte "A"
        text_a = "A"
        bbox_a = draw.textbbox((0, 0), text_a, font=font_large)
        text_width_a = bbox_a[2] - bbox_a[0]
        text_height_a = bbox_a[3] - bbox_a[1]
        
        x_a = int(size * 0.75) - text_width_a // 2
        y_a = int(size * 0.35) - text_height_a // 2
        
        draw.text((x_a, y_a), text_a, fill=(255, 255, 255, 255), font=font_large)
        
        # Barre horizontale dans le A
        barre_y = int(size * 0.4)
        barre_x1 = int(size * 0.65)
        barre_x2 = int(size * 0.85)
        barre_width = max(2, int(size * 0.04))
        draw.rectangle([(barre_x1, barre_y), (barre_x2, barre_y + barre_width)], fill=color1)
        
        # Découpe en haut à droite du A (petit triangle/carré)
        cut_size = int(size * 0.08)
        cut_x = int(size * 0.82)
        cut_y = int(size * 0.25)
        # Dessiner un rectangle qui "coupe" le A
        draw.rectangle([(cut_x, cut_y), (cut_x + cut_size, cut_y + cut_size)], fill=color1)
        
        # Texte "CONSULTING" en petit (seulement pour les grandes tailles)
        if size >= 128:
            consulting_text = "CONSULTING"
            bbox_consulting = draw.textbbox((0, 0), consulting_text, font=font_small)
            text_width_consulting = bbox_consulting[2] - bbox_consulting[0]
            
            x_consulting = (size - text_width_consulting) // 2
            y_consulting = int(size * 0.75)
            
            draw.text((x_consulting, y_consulting), consulting_text, fill=(255, 255, 255, 230), font=font_small)
        
        # Sauvegarder
        output_path = f'lp/LP-BC/img/favicon-modern-{size}x{size}.png'
        img.save(output_path, 'PNG')
        print(f"✅ Favicon moderne créé : {output_path} ({size}x{size}px)")
    
    # Créer le favicon principal (32x32)
    img_main = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
    draw_main = ImageDraw.Draw(img_main)
    
    color1 = (61, 47, 87)
    corner_radius = 5
    
    draw_main.rounded_rectangle([(0, 0), (32, 32)], corner_radius, fill=color1)
    
    try:
        font_main = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
    except:
        try:
            font_main = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 16)
        except:
            font_main = ImageFont.load_default()
    
    # B
    text_b = "B"
    bbox_b = draw_main.textbbox((0, 0), text_b, font=font_main)
    text_width_b = bbox_b[2] - bbox_b[0]
    x_b = 8 - text_width_b // 2
    y_b = 8
    draw_main.text((x_b, y_b), text_b, fill=(255, 255, 255, 255), font=font_main)
    
    # A
    text_a = "A"
    bbox_a = draw_main.textbbox((0, 0), text_a, font=font_main)
    text_width_a = bbox_a[2] - bbox_a[0]
    x_a = 24 - text_width_a // 2
    y_a = 8
    draw_main.text((x_a, y_a), text_a, fill=(255, 255, 255, 255), font=font_main)
    
    # Barre dans le A
    draw_main.rectangle([(20, 14), (26, 15)], fill=color1)
    
    # Découpe en haut à droite
    draw_main.rectangle([(25, 6), (28, 9)], fill=color1)
    
    output_main = 'lp/LP-BC/img/favicon-modern.png'
    img_main.save(output_main, 'PNG')
    print(f"✅ Favicon moderne principal créé : {output_main} (32x32px)")

if __name__ == "__main__":
    create_modern_favicon()
    print("\n✅ Tous les favicons modernes ont été créés !")

