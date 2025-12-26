import re
import base64
from PIL import Image
from io import BytesIO
import os

files = [
    "/home/jim/AEON Cyber Digital Twin Website/Site-OXOT_v2/public/OXOTOptimized.svg",
    "/home/jim/AEON Cyber Digital Twin Website/Site-OXOT_v2/public/OXOTOPoptimized.png"
]

def check_file(filepath):
    print(f"Checking {filepath}...")
    if not os.path.exists(filepath):
        print(f"  File not found: {filepath}")
        return

    if filepath.endswith('.png'):
        try:
            img = Image.open(filepath)
            print(f"  Format: {img.format}")
            print(f"  Mode: {img.mode}")
            if img.mode == 'RGBA':
                 print(f"  Alpha Range: {img.getextrema()[3]}")
                 print(f"  Top-Left Pixel: {img.getpixel((0,0))}")
            else:
                 print("  No Alpha Channel")
        except Exception as e:
            print(f"  Error reading PNG: {e}")
            
    elif filepath.endswith('.svg'):
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
                     print(f"  Alpha Range: {img.getextrema()[3]}")
                else:
                     print("  No Alpha Channel")
            else:
                print("  No embedded base64 PNG found (likely vector).")
        except Exception as e:
            print(f"  Error reading SVG: {e}")

for f in files:
    check_file(f)
