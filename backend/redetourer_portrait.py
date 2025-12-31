#!/usr/bin/env python3
"""
Script pour redétourer proprement l'image portrait.png
Utilise remove.bg API ou traitement d'image local
"""

from PIL import Image
import numpy as np
import os
import sys

def remove_background_pil(input_path, output_path):
    """
    Redétoure l'image en utilisant PIL et numpy
    Méthode basique : détection des bords et suppression du fond
    """
    try:
        # Ouvrir l'image
        img = Image.open(input_path)
        
        # Convertir en RGBA si nécessaire
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Convertir en numpy array
        data = np.array(img)
        
        # Créer un masque pour le fond (blanc/transparent)
        # On détecte les pixels qui sont proches du blanc ou très clairs
        r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
        
        # Détection du fond : pixels très clairs ou avec alpha faible
        # Ajuster ces seuils selon votre image
        background_mask = (
            (r > 240) & (g > 240) & (b > 240) |  # Fond blanc/clair
            (a < 50)  # Déjà transparent
        )
        
        # Appliquer le masque : rendre le fond transparent
        data[background_mask] = [0, 0, 0, 0]
        
        # Optionnel : améliorer les bords avec un flou
        # Créer une nouvelle image
        result = Image.fromarray(data)
        
        # Sauvegarder
        result.save(output_path, 'PNG', optimize=True)
        print(f"✅ Image redétourée sauvegardée : {output_path}")
        return True
        
    except Exception as e:
        print(f"❌ Erreur avec PIL : {e}")
        return False

def remove_background_advanced(input_path, output_path):
    """
    Méthode avancée avec détection de bordure améliorée
    """
    try:
        from PIL import Image, ImageFilter, ImageEnhance
        
        img = Image.open(input_path).convert('RGBA')
        data = np.array(img)
        
        # Détection plus sophistiquée du fond
        # On cherche les zones uniformes en bordure
        height, width = data.shape[:2]
        
        # Analyser les bords pour déterminer la couleur du fond
        border_pixels = np.concatenate([
            data[0, :].reshape(-1, 4),  # Top
            data[-1, :].reshape(-1, 4),  # Bottom
            data[:, 0].reshape(-1, 4),  # Left
            data[:, -1].reshape(-1, 4)  # Right
        ])
        
        # Moyenne des couleurs des bords
        avg_bg = np.mean(border_pixels, axis=0)
        
        # Seuil de tolérance
        threshold = 30
        
        # Créer le masque
        diff = np.abs(data.astype(float) - avg_bg)
        background_mask = np.sum(diff[:,:,:3], axis=2) < threshold * 3
        
        # Appliquer le masque
        data[background_mask] = [0, 0, 0, 0]
        
        # Améliorer les bords avec un léger flou
        result = Image.fromarray(data)
        
        # Optionnel : appliquer un filtre pour lisser les bords
        # result = result.filter(ImageFilter.SMOOTH_MORE)
        
        result.save(output_path, 'PNG', optimize=True)
        print(f"✅ Image redétourée (méthode avancée) : {output_path}")
        return True
        
    except Exception as e:
        print(f"❌ Erreur méthode avancée : {e}")
        return False

def main():
    # Chemins
    input_path = 'lp/LP-BC/img/portrait.png'
    output_path = 'lp/LP-BC/img/portrait.png'  # Écraser l'original
    
    # Vérifier que l'image existe
    if not os.path.exists(input_path):
        print(f"❌ Image non trouvée : {input_path}")
        sys.exit(1)
    
    print(f"📸 Traitement de l'image : {input_path}")
    
    # Essayer la méthode avancée d'abord
    if remove_background_advanced(input_path, output_path):
        print("✅ Redétourage terminé avec succès!")
    elif remove_background_pil(input_path, output_path):
        print("✅ Redétourage terminé avec succès (méthode basique)!")
    else:
        print("❌ Échec du redétourage. Essayez avec un outil externe comme remove.bg")
        sys.exit(1)

if __name__ == '__main__':
    main()

