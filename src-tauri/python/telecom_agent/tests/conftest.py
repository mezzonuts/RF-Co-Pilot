import sys
import os
from pathlib import Path

# Add the sidecar parent directory to PYTHONPATH for imports
sidecar_path = Path(__file__).parent.parent.parent
if str(sidecar_path) not in sys.path:
    sys.path.insert(0, str(sidecar_path))
