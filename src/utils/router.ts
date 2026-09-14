/**
 * Router utility for deciding whether a question should be processed by the Live LLM
 * or by the lightweight fallback engine.
 */
export type Mode = 'live' | 'fallback';

const MUST_LIVE_KEYWORDS = [
  'MCC', 'MNC', 'EARFCN', 'NR‑ARFCN', 'PCI', 'RRC', 'SIB', 'TDD', 'FDD',
  'band', 'frequency', 'dl', 'ul', 'kpi', 'throughput', 'latency', 'mos'
];

/**
 * Simple rule‑based router.
 * Returns "live" for questions that contain any of the MUST_LIVE_KEYWORDS
 * or are longer than 120 characters (assumed to be more complex).
 */
export function decideMode(prompt: string): Mode {
  const up = prompt.toUpperCase();
  if (MUST_LIVE_KEYWORDS.some(k => up.includes(k))) return 'live';
  if (prompt.length > 120) return 'live';
  return 'fallback';
}
