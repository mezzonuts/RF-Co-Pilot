import logging
import sys
from pathlib import Path

def setup_logging(level=logging.INFO):
    """
    Setup logging for the Python sidecar.
    Logs to both a file in the logs/ directory and stderr.
    """
    # Find project root logs directory
    # Structure: src-tauri/python/telecom_agent/logging_config.py
    # Target: logs/sidecar.log
    project_root = Path(__file__).parent.parent.parent.parent.parent
    log_dir = project_root / "logs"
    log_dir.mkdir(exist_ok=True)
    
    log_file = log_dir / "sidecar.log"
    
    # Configure logging
    logging.basicConfig(
        level=level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler(sys.stderr),
        ]
    )
    
    logger = logging.getLogger("telecom_agent")
    logger.info(f"Logging initialized. File: {log_file}")
    
    return logger
