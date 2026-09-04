import { useState, useCallback } from 'react'
import { invoke } from '@tauri-apps/api/core'

// ── DB ──
export function useDbCommands() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const insertCell = useCallback(async (cellData: Record<string, unknown>) => {
    setPending(true); setError(null)
    try { return await invoke('db_insert_cell', { cellData }) }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  const queryByBand = useCallback(async (band: string) => {
    setPending(true); setError(null)
    try { return await invoke('db_query_cells_by_band', { band }) as { cells: unknown[] } }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  const insertDtLogs = useCallback(async (logs: Record<string, unknown>[]) => {
    setPending(true); setError(null)
    try { return await invoke('db_insert_dt_logs', { logs }) as { count: number } }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  return { pending, error, insertCell, queryByBand, insertDtLogs }
}

// ── Qdrant ──
export function useQdrantSearch() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchSimilarKpi = useCallback(async (kpiSample: Record<string, unknown>, limit = 5) => {
    setPending(true); setError(null)
    try { return await invoke('qdrant_search_similar_kpi', { kpiSample, limit }) as { results: unknown[] } }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  return { pending, error, searchSimilarKpi }
}

// ── Reporting ──
export function useReporting() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportReport = useCallback(async (outputPath: string, format: 'pdf' | 'excel', kpiSummary?: Record<string, unknown>) => {
    setPending(true); setError(null)
    try { return await invoke('export_report', { outputPath, format, kpiSummary }) as { path: string } }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  return { pending, error, exportReport }
}

// ── QGIS ──
export function useQgisExport() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportQgis = useCallback(async (csvPath: string, qgsPath: string) => {
    setPending(true); setError(null)
    try { return await invoke('export_qgis_project', { csvPath, qgsPath }) }
    catch (e) { const m = String(e); setError(m); throw e }
    finally { setPending(false) }
  }, [])

  return { pending, error, exportQgis }
}
