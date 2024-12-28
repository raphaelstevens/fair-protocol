import requests
import os
from pathlib import Path

# Configuration
LUCIDE_BASE_URL = "https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/"
ICONS_OUTPUT_DIR = "static/icons/"

# Liste des icônes
ICONS = [
    "thermometer",
    "chart-column-stacked",
    "between-vertical-start",
    "clock"
]

def download_svg_icon(icon_name: str, output_dir: str) -> bool:
    """Télécharge une icône SVG depuis Lucide Icons"""
    url = f"{LUCIDE_BASE_URL}{icon_name}.svg"
    output_path = Path(output_dir) / f"{icon_name}.svg"
    
    try:
        os.makedirs(output_dir, exist_ok=True)
        response = requests.get(url)
        response.raise_for_status()
        
        # Garder le SVG simple avec currentColor
        svg_content = response.text
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
            
        print(f"✓ {icon_name}.svg téléchargé")
        return True
        
    except Exception as e:
        print(f"✗ Erreur pour {icon_name}: {e}")
        return False

def main():
    print(f"Téléchargement des icônes dans {ICONS_OUTPUT_DIR}...")
    success_count = sum(download_svg_icon(icon, ICONS_OUTPUT_DIR) for icon in ICONS)
    print(f"\nTerminé! {success_count}/{len(ICONS)} icônes téléchargées.")

if __name__ == "__main__":
    main()