from PIL import Image
import sys

try:
    img = Image.open("/home/jim/AEON Cyber Digital Twin Website/Site-OXOT_v2/public/oxot_logo_web.png")
    print(f"Format: {img.format}")
    print(f"Mode: {img.mode}")
    
    # Check top-left pixel
    pixel = img.getpixel((0, 0))
    print(f"Top-left pixel: {pixel}")
    
    # Check a few more
    print(f"Pixel (10,10): {img.getpixel((10, 10))}")
    
    if img.mode == 'RGBA':
        # Check if there are ANY transparent pixels
        extrema = img.getextrema()
        print(f"Alpha channel range: {extrema[3]}")
    else:
        print("No alpha channel")

except Exception as e:
    print(f"Error: {e}")
