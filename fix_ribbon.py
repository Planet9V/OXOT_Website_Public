import re
import base64
from PIL import Image
from io import BytesIO

source_svg = "/home/jim/AEON Cyber Digital Twin Website/Site-OXOT_v2/public/OXOT_Gold_Ribbon.svg"
output_png = "/home/jim/AEON Cyber Digital Twin Website/Site-OXOT_v2/public/oxot_ribbon_clean.png"

try:
    with open(source_svg, 'r') as f:
        content = f.read()
    
    match = re.search(r'data:image/png;base64,([A-Za-z0-9+/=]+)', content)
    if match:
        bg_data = base64.b64decode(match.group(1))
        img = Image.open(BytesIO(bg_data))
        img = img.convert("RGBA")
        
        datas = img.getdata()
        new_data = []
        
        for item in datas:
            # Change all white (also shades of whites) to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        img.save(output_png, "PNG")
        print(f"Saved transparent ribbon to {output_png}")
        
    else:
        print("No embedded base64 PNG found.")
        
except Exception as e:
    print(f"Error: {e}")
