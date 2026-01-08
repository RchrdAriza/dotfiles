#!/usr/bin/env python3

import subprocess
import time


subprocess.run([
    "paplay",
    "/usr/share/sounds/freedesktop/stereo/bell.oga"
])

time.sleep(1)
