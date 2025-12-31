from PIL import Image, ImageDraw, ImageFont
import os

def create_boostai_logo():
    """
    Crée une image PNG du logo BoostAI avec le style du header.
    Le A de AI est tourné à 180 degrés.
    """
    # Dimensions
    width = 600
    height = 240
    
    # Créer une image avec fond transparent
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Couleurs
    color1 = (61, 47, 87)  # #3D2F57
    color2 = (90, 74, 111)  # #5a4a6f
    consulting_color = (255, 255, 255, 204)  # white with 80% opacity
    
    # Essayer de charger une police, sinon utiliser la police par défaut
    try:
        # Pour macOS
        font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 144)
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
    except:
        try:
            # Pour Linux
            font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 144)
            font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 16)
        except:
            # Police par défaut
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
    
    # Dessiner "Boost" 
    text_boost = "Boost"
    bbox_boost = draw.textbbox((0, 0), text_boost, font=font_large)
    text_width_boost = bbox_boost[2] - bbox_boost[0]
    text_height = bbox_boost[3] - bbox_boost[1]
    
    x_boost = (width - text_width_boost) // 2 - 80  # Position pour "Boost"
    y = 40
    
    draw.text((x_boost, y), text_boost, fill=color1, font=font_large)
    
    # Dessiner "A" tourné à 180 degrés
    text_a = "A"
    bbox_a = draw.textbbox((0, 0), text_a, font=font_large)
    text_width_a = bbox_a[2] - bbox_a[0]
    text_height_a = bbox_a[3] - bbox_a[1]
    
    # Position du centre du A
    x_a_center = (width - text_width_boost) // 2 + 20
    y_a_center = y + text_height // 2
    
    # Créer une image temporaire pour le A
    temp_img = Image.new('RGBA', (text_width_a + 20, text_height_a + 20), (0, 0, 0, 0))
    temp_draw = ImageDraw.Draw(temp_img)
    temp_draw.text((10, 10), text_a, fill=color1, font=font_large)
    
    # Tourner l'image de 180 degrés
    rotated_a = temp_img.rotate(180, expand=False)
    
    # Coller le A tourné sur l'image principale
    paste_x = x_a_center - (text_width_a + 20) // 2
    paste_y = y_a_center - (text_height_a + 20) // 2
    img.paste(rotated_a, (paste_x, paste_y), rotated_a)
    
    # Dessiner "I"
    text_i = "I"
    bbox_i = draw.textbbox((0, 0), text_i, font=font_large)
    text_width_i = bbox_i[2] - bbox_i[0]
    
    x_i = x_a_center + text_width_a // 2 + 20
    draw.text((x_i, y), text_i, fill=color1, font=font_large)
    
    # Dessiner "CONSULTING" en dessous
    consulting_text = "CONSULTING"
    bbox_small = draw.textbbox((0, 0), consulting_text, font=font_small)
    text_width_small = bbox_small[2] - bbox_small[0]
    
    x_small = (width - text_width_small) // 2
    y_small = y + text_height + 20
    
    draw.text((x_small, y_small), consulting_text, fill=consulting_color, font=font_small)
    
    # Sauvegarder
    output_path = 'lp/LP-BC/img/boostai-logo.png'
    img.save(output_path, 'PNG')
    print(f"✅ Logo créé : {output_path}")
    print(f"   Dimensions : {width}x{height}px")
    print(f"   Le A est tourné à 180 degrés")

if __name__ == "__main__":
    create_boostai_logo()
