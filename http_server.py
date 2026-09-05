"""http_server.py — Development server untuk Knowledge Vault (browser, bukan Tauri window).

Jalankan:
  python http_server.py
  
Buka: http://localhost:8000
"""

import os
import sys
import json
import mimetypes
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# Add Python path untuk imports backend
sys.path.insert(0, str(Path(__file__).parent / "src-tauri" / "python"))

from telecom_agent.vault_api import build_tree, get_file_content, build_knowledge_graph, search_vault
from telecom_agent.vault_ingest import get_vault_engine

VAULT_ROOT = Path("C:/Users/PC/Documents/Obsidian/Dika/wiki")
DIST_DIR = Path(__file__).parent / "dist"


class VaultAPIHandler(SimpleHTTPRequestHandler):
    """HTTP handler untuk frontend + API backend."""

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        # API routes
        if path == "/api/vault/tree":
            self.send_json({"tree": build_tree(VAULT_ROOT)})

        elif path == "/api/vault/file":
            file_path = query.get("path", [""])[0]
            if not file_path:
                return self.send_error(400, "Missing path parameter")
            content = get_file_content(file_path)
            if not content:
                return self.send_error(404, "File not found")
            self.send_json(content)

        elif path == "/api/vault/graph":
            self.send_json(build_knowledge_graph())

        elif path == "/api/vault/search":
            q = query.get("q", [""])[0]
            limit = int(query.get("limit", [20])[0])
            if not q:
                return self.send_error(400, "Missing q parameter")
            results = search_vault(q, limit)
            self.send_json(results)

        elif path == "/api/vault/ingest":
            return self.send_error(405, "Use POST for ingest")

        # Serve static files from dist/
        elif path == "/" or path.endswith(".html") or path.endswith(".js") or path.endswith(".css"):
            self.serve_static(path)
        else:
            self.send_error(404, "Not found")

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/vault/ingest":
            try:
                content_length = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(content_length)
                data = json.loads(body)

                file_name = data.get("fileName", "unknown")
                file_content = data.get("content", "")

                engine = get_vault_engine()
                result = engine.ingest_content(file_name, file_content)

                self.send_json(result)
            except Exception as e:
                self.send_error(400, f"Ingest failed: {str(e)}")
        else:
            self.send_error(404, "Not found")

    def serve_static(self, path: str):
        """Serve static files from dist/ directory."""
        if path == "/":
            path = "/index.html"

        file_path = DIST_DIR / path.lstrip("/")

        # prevent directory traversal
        try:
            file_path = file_path.resolve()
            if not str(file_path).startswith(str(DIST_DIR.resolve())):
                return self.send_error(403, "Access denied")
        except:
            return self.send_error(403, "Access denied")

        if not file_path.exists():
            return self.send_error(404, f"File not found: {path}")

        if file_path.is_dir():
            return self.send_error(403, "Directory access denied")

        mime_type, _ = mimetypes.guess_type(str(file_path))
        if not mime_type:
            mime_type = "application/octet-stream"

        try:
            with open(file_path, "rb") as f:
                content = f.read()

            self.send_response(200)
            self.send_header("Content-Type", mime_type)
            self.send_header("Content-Length", len(content))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error(500, f"Error reading file: {str(e)}")

    def send_json(self, data):
        """Send JSON response."""
        response = json.dumps(data, default=str)
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(response))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(response.encode())

    def send_error(self, code, message=""):
        """Send error response as JSON."""
        response = json.dumps({"error": message or f"HTTP {code}"})
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(response))
        self.end_headers()
        self.wfile.write(response.encode())

    def log_message(self, format, *args):
        """Log request."""
        print(f"[{self.log_date_time_string()}] {format % args}")


if __name__ == "__main__":
    if not DIST_DIR.exists():
        print(f"Error: {DIST_DIR} not found. Run `npm run build` first.")
        sys.exit(1)

    PORT = 8000
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, VaultAPIHandler)

    print(f"🚀 Knowledge Vault server started on http://localhost:{PORT}")
    print(f"   Frontend: http://localhost:{PORT}")
    print(f"   API: http://localhost:{PORT}/api/vault/*")
    print(f"   Vault root: {VAULT_ROOT}")
    print(f"\nPress Ctrl+C to stop.")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✓ Server stopped.")
        sys.exit(0)
