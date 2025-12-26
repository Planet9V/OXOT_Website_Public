import re
import base64
from PIL import Image
from io import BytesIO

files = [
    "/home/jim/AEON Cyber Digital Twin Website/Site-OXOT_v2/public/OXOT2_Full_Dark.svg"
]

def check_svg_transparency(filepath):
    print(f"Checking {filepath}...")
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        match = re.search(r'data:image/png;base64,([A-Za-z0-9+/=]+)', content)
        if match:
            bg_data = base64.b64decode(match.group(1))
            img = Image.open(BytesIO(bg_data))
            print(f"  Embedded Image Format: {img.format}")
            print(f"  Embedded Image Mode: {img.mode}")
            
            if img.mode == 'RGBA':
                extrema = img.getextrema()
                print(f"  Alpha Range: {extrema[3]}") 
            else:
                print("  No Alpha Channel")
        else:
            print("  No embedded base64 PNG found (might be vector!).")
            
    except Exception as e:
        print(f"  Error: {e}")

for f in files:
    check_svg_transparency(f)
