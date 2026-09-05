#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const cmd = process.argv[2];

function help() {
  console.log(`
rf-copilot — TelecomAgent (Tauri + React)

Usage:
  npx rf-copilot dev        # dev server  -> http://localhost:5173
  npx rf-copilot build      # build prod  -> dist/
  npx rf-copilot preview    # preview build

  npm run dev / build / preview  — juga tetap bisa

Tanpa Rust/Docker — cukup Node + NPM.
Butuh PostGIS/Qdrant? lihat logs/coding/07 - Production Setup Guide.md
`);
}

if (!cmd || ['--help','-h','help'].includes(cmd)) { help(); process.exit(0); }

const isWin = process.platform === 'win32';
function run(bin, args) {
  const p = spawn(isWin ? `${bin}.cmd` : bin, args, { stdio: 'inherit', cwd: root });
  p.on('exit', c => process.exit(c ?? 0));
}

if (cmd === 'dev') run('npx', ['vite']);
else if (cmd === 'preview') run('npx', ['vite', 'preview']);
else if (cmd === 'build') run(isWin ? 'npm' : 'npm', ['run', 'build']);
else { console.error(`Unknown command: ${cmd}`); help(); process.exit(1); }
