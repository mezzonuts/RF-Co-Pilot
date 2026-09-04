# rf-copilot — TelecomAgent

Tauri + React desktop app untuk engineering telekomunikasi mobile.

## Features
- Agent Workspace (chat-based workflow)
- Knowledge Vault (Obsidian-style)
- 6 Skills (module-based tools)
- LLM manual config (Hermes-style)

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build binary
cargo tauri build
```

## Project Structure

```
rf-copilot/
├── src-tauri/          ← Rust backend
├── logs/               ← Coding logs (debugging)
└── docs/               ← Documentation
```

## Development

See `docs/dev-guide.md` for setup instructions.
