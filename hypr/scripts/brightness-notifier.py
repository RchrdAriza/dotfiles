 #!/usr/bin/env python3
import subprocess
import re

ID=6666

BRIGHTNESS_LEVEL = subprocess.check_output(
    ['brightnessctl'],
    text=True
)

match = re.search(r"Current brightness:.*\((\d+)%\)", BRIGHTNESS_LEVEL)

if match:
    percent=int(match.group(1))

subprocess.run([
    'notify-send',
    '-r', str(ID),
    '-h', f'int:value:{percent}'
    "Brillo",
    str(percent)
])