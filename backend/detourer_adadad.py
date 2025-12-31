from PIL import Image
import numpy as np
import os

def remove_white_background_very_aggressive(image_path, output_path):
    """
    Supprime le fond blanc d'une image en le rendant transparent.
    Méthode très agressive avec tolérance maximale.
    """
    try:
        # Ouvrir l'image et convertir en RGBA
        img = Image.open(image_path).convert("RGBA")
        data = np.array(img)
        
        # Extraire les canaux
        r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
        
        # Détection des coins pour trouver la couleur de fond exacte
        h, w = data.shape[:2]
        corner_size = min(300, h//2, w//2)  # Très grand échantillon
        
        corner_pixels = np.concatenate([
            data[0:corner_size, 0:corner_size].reshape(-1, 4),
            data[0:corner_size, w-corner_size:w].reshape(-1, 4),
            data[h-corner_size:h, 0:corner_size].reshape(-1, 4),
            data[h-corner_size:h, w-corner_size:w].reshape(-1, 4)
        ])
        
        if len(corner_pixels) > 0:
            # Calculer la couleur moyenne des coins
            avg_corner_r = np.mean(corner_pixels[:, 0])
            avg_corner_g = np.mean(corner_pixels[:, 1])
            avg_corner_b = np.mean(corner_pixels[:, 2])
            
            print(f"   Couleur moyenne des coins: R={avg_corner_r:.1f}, G={avg_corner_g:.1f}, B={avg_corner_b:.1f}")
            
            # Calculer la luminosité
            brightness = (r.astype(float) + g.astype(float) + b.astype(float)) / 3.0
            
            # Détecter les pixels proches de cette couleur avec tolérance TRÈS large
            color_distance = np.sqrt(
                (r.astype(float) - avg_corner_r)**2 +
                (g.astype(float) - avg_corner_g)**2 +
                (b.astype(float) - avg_corner_b)**2
            )
            
            # Si la couleur moyenne est très claire (blanc), être TRÈS agressif
            if avg_corner_r > 200 and avg_corner_g > 200 and avg_corner_b > 200:
                # Fond très clair: tolérance maximale
                corner_mask = (color_distance < 150)  # Tolérance très large
                # Aussi tout ce qui est très clair
                bright_mask = brightness > 180
                # Combiner
                final_mask = corner_mask | bright_mask
            else:
                corner_mask = (color_distance < 80)
                bright_mask = brightness > 200
                final_mask = corner_mask | bright_mask
        else:
            # Fallback: détection simple très agressive
            brightness = (r.astype(float) + g.astype(float) + b.astype(float)) / 3.0
            final_mask = brightness > 180
        
        # Appliquer un lissage sur les bords
        try:
            from scipy import ndimage
            # Dilater pour capturer les pixels de transition
            dilated = ndimage.binary_dilation(final_mask, structure=np.ones((2,2)))
            # Transition douce
            distance = ndimage.distance_transform_edt(~dilated)
            edge_zone = (distance < 2) & (distance > 0)
            alpha = np.where(final_mask, 0, 255).astype(float)
            alpha[edge_zone] = np.clip(255 * (distance[edge_zone] / 2), 0, 255)
            alpha = alpha.astype(np.uint8)
        except (ImportError, Exception):
            alpha = np.where(final_mask, 0, 255).astype(np.uint8)
        
        # Appliquer l'alpha
        data[:,:,3] = alpha
        
        # Statistiques
        transparent_count = np.sum(alpha == 0)
        total_pixels = alpha.size
        print(f"   Pixels rendus transparents: {transparent_count}/{total_pixels} ({100*transparent_count/total_pixels:.1f}%)")
        
        # Créer la nouvelle image
        new_img = Image.fromarray(data)
        new_img.save(output_path, "PNG")
        print(f"✅ Image détourée avec succès : {output_path}")
        
    except Exception as e:
        print(f"❌ Erreur lors du détourage de l'image : {e}")
        import traceback
        traceback.print_exc()

# Chemins
original_image_path = 'lp/LP-BC/img/adadad.png'
output_image_path = 'lp/LP-BC/img/adadad.png'

# Vérifier si l'image existe
if os.path.exists(original_image_path):
    print(f"📸 Traitement de l'image : {original_image_path}")
    remove_white_background_very_aggressive(original_image_path, output_image_path)
    print("✅ Détourage terminé!")
else:
    print(f"❌ Image non trouvée : {original_image_path}")
