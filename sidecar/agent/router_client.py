"""
sidecar/agent/router_client.py — 9Router OpenAI-compatible client (:20128)

Extracted from http_server.py _get_9router_key + _forward_to_9router
Supaya bisa dipakai baik oleh http_server maupun agent pipeline v0.4.
"""
from __future__ import annotations
import json
import time
import sqlite3
from pathlib import Path
import urllib.request
import urllib.error


def get_9router_key() -> str | None:
    """Baca API key dari DB tanpa expose di frontend."""
    try:
        db = Path.home() / "AppData/Roaming/9router/db/data.sqlite"
        if not db.exists():
            db = Path("C:/Users/PC/AppData/Roaming/9router/db/data.sqlite")
        con = sqlite3.connect(str(db))
        cur = con.cursor()
        cur.execute("SELECT hex(key) FROM apiKeys LIMIT 1")
        row = cur.fetchone()
        con.close()
        if row and row[0]:
            return bytes.fromhex(row[0]).decode()
    except Exception as e:
        print(f"get_9router_key err: {e}")
    return None


def forward_to_9router(payload: dict, api_key: str | None = None):
    """Forward chat payload ke 9Router dengan fallback model.

    Returns: (response_json | None, error_str | None)
    """
    key = api_key or get_9router_key()
    if not key:
        return None, "9Router API key tidak ditemukan di db/data.sqlite"
    requested = payload.get("model") or "cx/gpt-5.5"
    fallbacks = [requested, "cx/gpt-5.4-mini", "cx/gpt-5.5", "cx/gpt-5.6-terra", "cx/gpt-5.6-luna"]
    seen: set[str] = set()
    fbs: list[str] = []
    for m in fallbacks:
        if m not in seen:
            seen.add(m)
            fbs.append(m)
    last_err = None
    for mdl in fbs:
        body = dict(payload)
        body["model"] = mdl
        if "stream" not in body:
            body["stream"] = False
        data = json.dumps(body).encode()
        req = urllib.request.Request(
            "http://localhost:20128/v1/chat/completions",
            data=data,
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"},
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                j = json.loads(r.read().decode())
                msg = (j.get("choices") or [{}])[0].get("message", {}).get("content", "") or ""
                if not msg.strip() and mdl != fbs[-1]:
                    last_err = f"empty response from {mdl}"
                    continue
                return j, None
        except urllib.error.HTTPError as e:
            try:
                b = e.read().decode()
            except Exception:
                b = str(e)
            last_err = b[:800]
            if e.code in (402, 403, 429, 500, 502, 503) and mdl != fbs[-1]:
                time.sleep(0.6)
                continue
            return None, last_err
        except Exception as e:
            last_err = str(e)[:800]
            if mdl != fbs[-1]:
                time.sleep(0.6)
                continue
            return None, last_err
    return None, last_err or "unknown error"
